import { FastifyReply, FastifyRequest } from 'fastify';
import { MontoProperty } from '../types';

export async function postPropertiesHandler(fastify, request: FastifyRequest, reply: FastifyReply) {
    if (!fastify.mongo.db) {
        return reply.code(500).send({ error: 'Database not available' });
    }
    const body = request.body as { name: string; price: number };
    const newProperty = {
        name: body.name,
        price: body.price,
        createdAt: new Date()
    };

    // Validate required fields
    if (!newProperty.name || !newProperty.price) {
        return reply.code(400).send({ error: 'Missing required fields' });
    }

    await fastify.mongo.db.collection('properties').insertOne(newProperty);

    return reply.code(201).send({ data: newProperty });
};
