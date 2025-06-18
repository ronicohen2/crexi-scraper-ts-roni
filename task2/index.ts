import Fastify from 'fastify';
import fastifyMongoDb from '@fastify/mongodb';
import { DEFAULT_PORT, MONGODB_URI } from './src/constants';
import { mongoFilter } from './src/mongoFilter';
import { mongoSort } from './src/mongoSort';

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
    const { count = '10', offset = '0' } = request.query as {
        count?: string;
        offset?: string;
    };

    const filter = mongoFilter(request.query);
    const sort = mongoSort(request.query);

    const total = await fastify.mongo.db.collection('properties').countDocuments(filter);
    
    const properties = await fastify.mongo.db.collection('properties')
        .find(filter)
        .sort(sort)
        .skip(Number(offset))
        .limit(Number(count))
        .toArray();

    return {
        data: properties,
        total
    };
});

fastify.listen({ port: DEFAULT_PORT, host: 'localhost' }).then(() => {
    fastify.log.info(`Server is running on http://localhost:${DEFAULT_PORT}`);
});

