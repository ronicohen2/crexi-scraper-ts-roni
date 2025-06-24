import { FastifyReply, FastifyRequest } from 'fastify';
import { MontoProperty } from '../types';
import { ObjectId } from '@fastify/mongodb';

export async function putPropertiesHandler(fastify, request: FastifyRequest, reply: FastifyReply) {
    if (!fastify.mongo.db) {
        return reply.code(500).send({ error: 'Database not available' });
    }

    // Validate MongoDB ObjectId format
    const { id } = request.params as { id: string };
    if (!ObjectId.isValid(id)) {
        return reply.code(400).send({ error: 'Invalid ID format' });
    }

    const _id = new ObjectId(id);

    // Validate update data
    const updateData = request.body as Partial<MontoProperty>;
    if (!updateData) {
        return reply.code(400).send({ error: 'No data provided for update' });
    }

    // Validate data types for price and name
    if ('price' in updateData && typeof updateData.price !== 'number') {
        return reply.code(400).send({ error: 'Invalid price format' });
    }
    if ('name' in updateData && typeof updateData.name !== 'string') {
        return reply.code(400).send({ error: 'Invalid name format' });
    }

    // Update the property and verify it exists
    const result = await fastify.mongo.db.collection('properties').updateOne(
        { _id },
        { $set: updateData }
    );

    if (result.matchedCount == 0) {
        return reply.code(404).send({ error: 'Property not found' })
    }

    // Fetch and return the updated property
    const updateProperty = await fastify.mongo.db.collection('properties').findOne({ _id });

    return reply.code(200).send({ data: updateProperty });
};
