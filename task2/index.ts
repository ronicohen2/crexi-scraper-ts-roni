
import Fastify from 'fastify';
import fastifyMongoDb from '@fastify/mongodb';
import { DEFAULT_PORT, MONGODB_URI } from './src/constants';

const fastify = Fastify({
    logger: true
});

fastify.register(fastifyMongoDb, {
    url: MONGODB_URI
});

fastify.get('/', async (request, reply) => {
    return { data: "Hello World" };
});

fastify.get('/properties', async (request, reply) => {
    if (!fastify.mongo.db) {
        return reply.code(500).send();
    }
    const { count } = request.query as { count: string };

    const properties = await fastify.mongo.db.collection('properties')
        .find()
        .limit(Number(count))
        .toArray();

    return {
        data: properties
    };
});

fastify.listen({ port: DEFAULT_PORT, host: 'localhost' }).then(() => {
    fastify.log.info(`Server is running on http://localhost:${DEFAULT_PORT}`);
});

