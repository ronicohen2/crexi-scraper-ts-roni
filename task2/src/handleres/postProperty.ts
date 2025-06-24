import { FastifyReply, FastifyRequest } from 'fastify';
import { MontoProperty } from '../types';

export async function postPropertiesHandler(fastify, request: FastifyRequest, reply: FastifyReply) {
    if (!fastify.mongo.db) {
        return reply.code(500).send({ error: 'Database not available' });
    }
    const body = request.body as MontoProperty;

    const requiredFields = ['id', 'name', 'price', 'types', 'location', 'stateCode', 'status', 'imageUrl'];
    for (const field of requiredFields) {
        if (!body[field]) {
            return reply.code(400).send({ error: `Missing field: ${field}` });
        }
    }

    const newProperty: MontoProperty = {
        id: body.id,
        name: body.name,
        price: body.price,
        types: body.types,
        location: body.location,
        stateCode: body.stateCode,
        status: body.status,
        imageUrl: body.imageUrl,
        createdAt: new Date()
    };

    // Validate required fields
    if (!newProperty.name || !newProperty.price) {
        return reply.code(400).send({ error: 'Missing required fields' });
    }

    await fastify.mongo.db.collection('properties').insertOne(newProperty);

    return reply.code(201).send({ data: newProperty });
};
