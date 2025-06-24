export const getPropertiesSchema = {
    querystring: {
      type: 'object',
      properties: {
        count: { type: 'number', minimum: 1, maximum: 100, default: 10 },
        offset: { type: 'number', minimum: 0, default: 0 },
        sortBy: { type: 'string', enum: ['createdAt', 'price'] },
        sortOrder: { type: 'string', enum: ['asc', 'desc'], default: 'asc' },
  
        stateCode: { type: 'string' },
  
        // Advanced filtering for price
        'price.eq': { type: 'number' },
        'price.ne': { type: 'number' },
        'price.gt': { type: 'number' },
        'price.gte': { type: 'number' },
        'price.lt': { type: 'number' },
        'price.lte': { type: 'number' },
  
        // createdAt filtering
        'createdAt.eq': { type: 'string', format: 'date-time' },
        'createdAt.ne': { type: 'string', format: 'date-time' },
        'createdAt.gt': { type: 'string', format: 'date-time' },
        'createdAt.gte': { type: 'string', format: 'date-time' },
        'createdAt.lt': { type: 'string', format: 'date-time' },
        'createdAt.lte': { type: 'string', format: 'date-time' },
  
        // type filtering (single or multiple types)
        types: {
          anyOf: [
            { type: 'string' },
            { type: 'array', items: { type: 'string' } }
          ]
        }
      },
      additionalProperties: false
    }
  };
  