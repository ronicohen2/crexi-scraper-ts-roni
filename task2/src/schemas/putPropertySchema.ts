import { MontoPropertySchema } from '../types';

export const updatePropertyParamsSchema = {
    type: "object",
    properties: {
        id: { type: "string", minLength: 1 }
    },
    required: ["id"],
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
