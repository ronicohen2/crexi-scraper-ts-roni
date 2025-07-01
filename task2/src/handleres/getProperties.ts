import { FastifyReply, FastifyRequest } from 'fastify';
import { getFromCache, setCache } from '../cache';
import { mongoFilter } from '../mongoFilter';
import { mongoSort } from '../mongoSort';
import type { WithId } from 'mongodb';

export async function getPropertiesHandler(
    fastify: any,
    request: FastifyRequest,
    reply: FastifyReply
) {
    if (!fastify.mongo?.db) {
        return reply.code(500).send({ error: 'Database not available' });
    }

    // Check cache first using request URL as key
    const cacheKey = request.url;
    const cachedResult = getFromCache(cacheKey);
    if (cachedResult) {
        return reply.send(cachedResult);
    }

    const { count, offset } = request.query as any;

    // Apply filters and sorting based on query parameters
    const filter = mongoFilter(request.query);
    const sort = mongoSort(request.query);

    // Get total count of matching documents for pagination info
    // Fetch properties with pagination, filtering, and sorting
    const [total, properties] = await Promise.all([
        fastify.mongo.db.collection('properties').countDocuments(filter),
        fastify.mongo.db.collection('properties')
            .find(filter)
            .sort(sort)
            .skip(Number(offset))
            .limit(Number(count))
            .toArray()
    ]);

    // Convert _id: ObjectId to _id: string for each property
    const propertiesWithStringId = properties.map((property: any) => ({
        ...property,
        id: property._id.toString(),
        _id: undefined
    }));

    // Cache the response data
    const responseData = { data: propertiesWithStringId, total };
    setCache(cacheKey, responseData);

    console.log('Filter:', filter);
    console.log('Total found:', total);
    console.log('Properties:', propertiesWithStringId);

    return reply.send(responseData);
};
