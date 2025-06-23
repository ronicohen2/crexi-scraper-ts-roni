// Import required dependencies
import Fastify from 'fastify';
import fastifyMongoDb from '@fastify/mongodb';
import { DEFAULT_PORT, MONGODB_URI } from './src/constants';
import { mongoFilter } from './src/mongoFilter';
import { mongoSort } from './src/mongoSort';
import { MontoProperty } from './src/types';
import { ObjectId } from 'mongodb';
import { getFromCache, setCache } from './src/cache';


// Initialize Fastify server with logging enabled
const fastify = Fastify({
    logger: true
});

// Register MongoDB plugin with connection URL
fastify.register(fastifyMongoDb, {
    url: 'mongodb://localhost:27017/Test'
});

import { getPropertiesHandler } from './src/controllers/getProperties';

const getSchema = { //json schema to validate
    querystring: {
        type: "object",
        properties: { //just safe types
            count: { type: "number", minimum: 1, maximum: 100 },
            offset: { type: "number", minimum: 0 },
            sortBy: { type: "string" },
            sortOrder: { type: "string", enum: ["asc", "desc"] },
            stateCode: { type: "string" },
            price: { type: "number" }
        },
        required: [],
        additionalProperties: false
    }
};

// GET /properties endpoint - Retrieve properties with filtering, sorting, and pagination
fastify.get('/properties', {
    handler: (request, reply) => getPropertiesHandler(fastify, request, reply),
    schema: getSchema
});

import { postPropertiesHandler } from './src/controllers/postProperty';

const postSchema = { //json schema to validate
    body: {
        type: "object",
        properties: { //just safe types
            name: {
                type: "string",
            },
            price: {
                type: "number",
                minimum: 0
            }
        },
        required: ["name", "price"],
        additionalProperties: false
    }
};

// POST /properties endpoint - Create a new property
fastify.post('/properties', {
    handler: (request, reply) => postPropertiesHandler(fastify, request, reply),
    schema: postSchema
});

import { putPropertiesHandler } from './src/controllers/putProperty';

const putSchema = { //json schema to validate
    body: {
        type: "object",
        properties: { //just safe types
            name: {
                type: "string",
            },
            price: {
                type: "number",
                minimum: 0
            }
        },
        required: ["name", "price"],
        additionalProperties: false
    }
};

// PUT /properties/:id endpoint - Update an existing property
fastify.put('/properties/:id', {
    handler: (request, reply) => putPropertiesHandler(fastify, request, reply),
    schema: putSchema
});

fastify.delete('/properties/:id', async (request, reply) => {
    if (!fastify.mongo.db) {
        return reply.code(500).send({ error: 'Database not available' });
    }

    // Validate MongoDB ObjectId format
    const { id } = request.params as { id: string };
    if (!ObjectId.isValid(id)) {
        return reply.code(400).send({ error: 'Invalid ID format' });
    }

    const _id = new ObjectId(id);

    // Delete the property and verify it existed
    const result = await fastify.mongo.db.collection('properties').deleteOne({ _id });

    if (result.deletedCount == 0) {
        return reply.code(404).send({ error: 'Property not found' })
    }

    return reply.code(200).send({ message: 'Property deleted successfully' });
});
// Start the server
fastify.listen({ port: DEFAULT_PORT, host: 'localhost' }).then(() => {
    fastify.log.info(`Server is running on http://localhost:${DEFAULT_PORT}`);
});

