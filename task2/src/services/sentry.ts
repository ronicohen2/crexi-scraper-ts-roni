import * as Sentry from '@sentry/node';

import pkg from '../../package.json';
import { createHash } from 'crypto';
import { MissingHeaderError } from './customErrors';
import { getUserAgent } from './getUserAgent';
import { FastifyInstance } from 'fastify';
const { name, version } = pkg;

export function initSentry() {
    Sentry.init({
        dsn: process.env.SENTRY_DSN,
        environment: process.env.NODE_ENV || 'development',
        sendDefaultPii: true,
    });
}

// Set tags for application name, version, and environment
Sentry.setTag('name', name);
Sentry.setTag('version', version);
Sentry.setTag('environment', process.env.NODE_ENV || 'development');

export function SetErrorHandler(fastify) {
    fastify.setErrorHandler((error, request, reply) => { // Custom error handler for Fastify
        Sentry.withScope(scope => { // Set a temporary scope for the request
            // Set user information in the Sentry scope
            scope.setUser({ ip_address: request.ip });
            // Set tags and extra data in the Sentry scope to filter and provide context for the request
            scope.setTag('route', request.url);
            scope.setTag('method', request.method);
            scope.setExtra('headers', request.headers);
            scope.setExtra('query', request.query);
            // If the error has validation information, set it in the scope
            if ((error as any).validation) {
                scope.setTag('type', 'validation');
                scope.setExtra('validation', (error as any).validation);
            }
            // Capture the exception with Sentry
            Sentry.captureException(error);
        });
        // Send the error response back to the client
        reply.send(error);
    });
}

export function setupHeaderCheck(server: FastifyInstance) {
    // Hook to validate user-agent header
    server.addHook('onRequest', async (request, _reply) => { //active when the request is received
        const userAgent = getUserAgent(request);

        // Generate a hash of the user-agent and IP address
        const ip = request.ip;
        const hash = createHash('md5').update(userAgent + ip).digest('hex'); // Create a hash using MD5 for the user identifier, user ID anonymously to sentry
        // Set the Sentry scope for the request
        Sentry.withScope(scope => { //temporarily set a scope for the request
            // Set user information in the Sentry scope
            scope.setUser({
                id: hash, // Use the hash as a unique identifier for the user- this is an anonymous identifier
                ip: ip, // Set the IP address for Sentry
            });
            // Set tags and extra data in the Sentry scope to filter and provide context for the request
            scope.setTag('http-method', request.method); // Set the HTTP method as a tag
            scope.setTag('url-path', request.url); // Set the URL as extra data
            scope.setExtra('query', request.query); // Set the query parameters as extra data
            scope.setExtra('body', request.body); // Set the request body as extra data
            scope.setExtra('headers', request.headers); // Set the request headers as extra data
        });
    });
}

export { Sentry };

