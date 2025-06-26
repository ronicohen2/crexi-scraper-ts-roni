// Import required dependencies
import Fastify from 'fastify';
import fastifyMongoDb from '@fastify/mongodb';
import { DEFAULT_PORT, MONGODB_URI } from './src/constants';
import { ObjectId } from 'mongodb';
import { getPropertiesHandler } from './src/handleres/getProperties';
import { getPropertiesSchema } from './src/schemas/getPropertiesSchema'; 
import { postPropertiesHandler } from './src/handleres/postProperty';
import { postPropertySchema } from './src/schemas/postPropertiesSchema'; 
import { putPropertiesHandler } from './src/handleres/putProperty';
import { putPropertySchema } from './src/schemas/putPropertySchema';
import { deletePropertyHandler } from './src/handleres/deleteProperty';
import { deletePropertySchema } from './src/schemas/deletePropertySchema';

// Initialize Fastify server with logging enabled
const fastify = Fastify({
    logger: true
});

// Register MongoDB plugin with connection URL
fastify.register(fastifyMongoDb, {
    url: MONGODB_URI
});

// GET /properties endpoint - Retrieve properties with filtering, sorting, and pagination
fastify.get('/properties', {
    handler: (request, reply) => getPropertiesHandler(fastify, request, reply),
    schema: getPropertiesSchema
});

// POST /properties endpoint - Create a new property
fastify.post('/properties', {
    handler: (request, reply) => postPropertiesHandler(fastify, request, reply),
    schema: postPropertySchema
});

// PUT /properties/:id endpoint - Update an existing property
fastify.put('/properties/:id', {
    handler: (request, reply) => putPropertiesHandler(fastify, request, reply),
    schema: putPropertySchema
});

//DELETE /properties/:id endpoint - Delete an existing property
fastify.delete('/properties/:id', {
  handler: (req, res) => deletePropertyHandler(fastify, req, res),
  schema: deletePropertySchema
});

// Start the server
fastify.listen({ port: DEFAULT_PORT, host: 'localhost' }).then(() => {
    fastify.log.info(`Server is running on http://localhost:${DEFAULT_PORT}`);
});

