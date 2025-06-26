import { FastifyReply, FastifyRequest } from 'fastify';
import { MontoProperty } from '../types';
import { ObjectId } from 'mongodb';

export async function postPropertiesHandler(fastify, request: FastifyRequest, reply: FastifyReply) {
    if (!fastify.mongo.db) {
        return reply.code(500).send({ error: 'Database not available' });
    }
    const body = request.body as Omit<MontoProperty, 'createdAt' | '_id'>;

    const mongoId = new ObjectId();

    const newProperty: MontoProperty & { _id: string } = {
        _id: mongoId.toHexString(),
        name: body.name,
        price: body.price,
        types: body.types,
        location: body.location,
        stateCode: body.stateCode,
        status: body.status,
        imageUrl: body.imageUrl,
        createdAt: new Date()
    };

    await fastify.mongo.db.collection('properties').insertOne(newProperty);
    return reply.code(201).send({ data: newProperty, id: mongoId });

};
