export const deletePropertySchema = {
    params: {
        type: 'object',
        properties: {
            id: { type: 'string', pattern: '^[a-fA-F0-9]{24}$' }
        },
        required: ['id'],
        additionalProperties: false
    }
};
