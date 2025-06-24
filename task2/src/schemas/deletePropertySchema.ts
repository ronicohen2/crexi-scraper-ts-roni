export const deletePropertySchema = {
    params: {
        type: 'object',
        properties: {
            id: { type: 'string', minLength: 1, maxLength: 24 }
        },
        required: ['id'],
        additionalProperties: false
    }
};
