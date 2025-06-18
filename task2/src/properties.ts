import { FastifyInstance } from 'fastify';

export async function propertiesRoutes(fastify: FastifyInstance) {
    fastify.get('/properties', async (request, reply) => {
        return { message: 'Route works!' };
      });
}