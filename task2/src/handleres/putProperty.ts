import { FastifyReply, FastifyRequest } from 'fastify';
import { MontoProperty } from '../types';
import { ObjectId } from 'mongodb';
import { dataloaderIntegration } from '@sentry/node';

export async function putPropertiesHandler(fastify, request: FastifyRequest, reply: FastifyReply) {
    if (!fastify.mongo.db) {
        return reply.code(500).send({ error: 'Database not available' });
    }

    // Validate MongoDB ObjectId format
    const { id } = request.params as { id: string };
    if (!ObjectId.isValid(id)) {
        return reply.code(400).send({ error: 'Invalid ObjectId format' });
    }
    const objectId = new ObjectId(id);

    // Validate update data
    const updateData = request.body as Partial<MontoProperty>;
    if (!updateData) {
        return reply.code(400).send({ error: 'No data provided for update' });
    }

    // Update the property and verify it exists
    const result = await fastify.mongo.db.collection('properties').updateOne(
        { _id: objectId },
        { $set: updateData },
    );

    const updated = await fastify.mongo.db.collection('properties').findOne({ _id: objectId });

    if (updated && updated._id && updated._id.toHexString) {
        updated._id = updated._id.toHexString();
    }

    if (result.matchedCount === 0) {
        return reply.code(404).send({ error: 'Property not found' });
    }

    if (result.modifiedCount === 0) {
        return reply.code(200).send({ message: 'No changes made — already up to date' });
    }

    return reply.code(200).send({ message: 'Property updated successfully', data: updated});
};
