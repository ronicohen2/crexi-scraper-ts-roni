import { MontoPropertySchema } from '../types';

export const updatePropertyParamsSchema = {
    type: "object",
    properties: {
        id: { type: "string", pattern: "^[a-fA-F0-9]{24}$" }
    },
    required: [],
    additionalProperties: false
};

export const updatePropertyBodySchema = {
    type: "object",
    properties: MontoPropertySchema.properties,
    additionalProperties: false,
    required: []
};

export const putPropertySchema = {
    params: updatePropertyParamsSchema,
    body: updatePropertyBodySchema
};
