import dotenv from 'dotenv';
dotenv.config();

// Import required dependencies
import Fastify, { fastify } from 'fastify';
import fastifyMongoDb from '@fastify/mongodb';
import { DEFAULT_PORT, MONGODB_URI } from './src/constants';
import { getPropertiesHandler } from './src/controllers/getProperties';
import { getPropertiesSchema } from './src/schemas/getPropertiesSchema';
import { postPropertiesHandler } from './src/controllers/postProperty';
import { postPropertySchema } from './src/schemas/postPropertiesSchema';
import { putPropertiesHandler } from './src/controllers/putProperty';
import { putPropertySchema } from './src/schemas/putPropertySchema';
import { deletePropertyHandler } from './src/controllers/deleteProperty';
import { deletePropertySchema } from './src/schemas/deletePropertySchema';
import { validateEnv } from './src/services/validateEnv';

// Import Sentry for error tracking
import * as Sentry from '@sentry/node';
import { initSentry, SetErrorHandler, setupHeaderCheck } from './src/services/sentry';

(async () => {
    initSentry();
    // Initialize Fastify server with logging enabled
    const fastify = Fastify({
        logger: true
    });

    let NODE_ENV: string;
    try {
        NODE_ENV = validateEnv();
    } catch (err) {
        Sentry.captureException(err);
        await Sentry.flush(2000); // Ensure Sentry has time to send the error
        console.error(err);
        process.exit(1);
    }

    // Register MongoDB plugin with connection URL
    try {
        await fastify.register(fastifyMongoDb, {
            url: MONGODB_URI
        });
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
        Sentry.captureException(err);
        await Sentry.flush(2000); // Ensure Sentry has time to send the error
        console.error(err);
        process.exit(1);
    }

    SetErrorHandler(fastify);

    // Register Sentry for error tracking
    setupHeaderCheck(fastify);

    // GET /properties endpoint - Retrieve properties with filtering, sorting, and pagination
    fastify.get('/properties', {
        handler: (request, reply) => getPropertiesHandler(fastify, request, reply),
        schema: getPropertiesSchema
    });

    // POST /properties endpoint - Create a new property
    fastify.post('/properties', {
        handler: (request, reply) => postPropertiesHandler(fastify, request, reply),
        schema: postPropertySchema
    });

    // PUT /properties/:id endpoint - Update an existing property
    fastify.put('/properties/:id', {
        handler: (request, reply) => putPropertiesHandler(fastify, request, reply),
        schema: putPropertySchema
    });

    //DELETE /properties/:id endpoint - Delete an existing property
    fastify.delete('/properties/:id', {
        handler: (req, res) => deletePropertyHandler(fastify, req, res),
        schema: deletePropertySchema
    });

    fastify.get('/error', (req, reply) => {
        throw new Error('Test Sentry error');
    });

    // Start the server
    fastify.listen({ port: DEFAULT_PORT, host: 'localhost' }).then(() =>
        fastify.log.info(`Server is running on http://localhost:${DEFAULT_PORT}`)
    ).catch(err => {
        fastify.log.error(err);
        process.exit(1);
    });

})();

export { fastify }; // Export the Fastify instance for testing or further use

