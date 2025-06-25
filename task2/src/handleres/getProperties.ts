import { FastifyReply, FastifyRequest } from 'fastify';
import { getFromCache, setCache } from '../cache';
import { mongoFilter } from '../mongoFilter';
import { mongoSort } from '../mongoSort';

export async function getPropertiesHandler(fastify, request: FastifyRequest, reply: FastifyReply) {
    if (!fastify.mongo.db) {
        return reply.code(500).send({ error: 'Database not available' });
    }

    // Check cache first using request URL as key
    const cacheKey = request.url;
    const cachedResult = getFromCache(cacheKey);
    if (cachedResult) {
        return reply.send(cachedResult);
    }

    // Extract and set default values for pagination parameters
    const { count = '10', offset = '0' } = request.query as {
        count?: string;
        offset?: string;
    };

    // Apply filters and sorting based on query parameters
    const filter = mongoFilter(request.query);
    const sort = mongoSort(request.query);

    // Get total count of matching documents for pagination info
    const total = await fastify.mongo.db.collection('properties').countDocuments(filter);

    // Fetch properties with pagination, filtering, and sorting
    const properties = await fastify.mongo.db.collection('properties')
        .find(filter)
        .sort(sort)
        .skip(Number(offset))
        .limit(Number(count))
        .toArray();

    // Cache the response data
    const responseData = { data: properties, total };
    setCache(cacheKey, responseData);

    console.log('Filter:', filter);
    console.log('Total found:', total);
    console.log('Properties:', properties);


    return reply.send(responseData);
};
