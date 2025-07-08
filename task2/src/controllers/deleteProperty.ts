import { FastifyReply, FastifyRequest } from 'fastify';
import { ObjectId } from 'mongodb';


export async function deletePropertyHandler(fastify, request: FastifyRequest, reply: FastifyReply) {
    if (!fastify.mongo.db) {
        return reply.code(500).send({ error: 'Database not available' });
    }

    // Validate MongoDB ObjectId format
    const { id } = request.params as { id: string };
    if (!ObjectId.isValid(id)) {
        return reply.code(400).send({ error: 'Invalid ObjectId format' });
    }
    const objectId = new ObjectId(id);    

    // Delete the property and verify it existed
    const result = await fastify.mongo.db.collection('properties').deleteOne({ _id: objectId });

    if (result.deletedCount == 0) {
        return reply.code(404).send({ error: 'Property not found' })
    }

    return reply.code(200).send({ message: 'Property deleted successfully' });

}
