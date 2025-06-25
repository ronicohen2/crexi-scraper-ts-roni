import { FastifyReply, FastifyRequest } from 'fastify';

export async function deletePropertyHandler(fastify, request: FastifyRequest, reply: FastifyReply) {
    if (!fastify.mongo.db) {
        return reply.code(500).send({ error: 'Database not available' });
    }

    // Validate MongoDB ObjectId format
    const { id } = request.params as { id: string };

    // Delete the property and verify it existed
    const result = await fastify.mongo.db.collection('properties').deleteOne({ id });

    if (result.deletedCount == 0) {
        return reply.code(404).send({ error: 'Property not found' })
    }

    return reply.code(200).send({ message: 'Property deleted successfully' });

}
