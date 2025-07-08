import { FastifyRequest } from "fastify";
import { MissingHeaderError } from "./customErrors";

export function getUserAgent(request: FastifyRequest): string {
    // Extract the user-agent header from the request
    const userAgent = request.headers['user-agent'];

    // If the user-agent is not present, throw an error
    if (!userAgent) {
        throw new MissingHeaderError('User-Agent');
    }

    // Return the user-agent string
    return userAgent;
}