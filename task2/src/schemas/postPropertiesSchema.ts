export const postPropertySchema = {
    body: {
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        price: { type: "number", minimum: 0 },
        types: { type: "array", items: { type: "string" } },
        location: { type: "string" },
        stateCode: { type: "string" },
        status: { type: "string" },
        imageUrl: { type: "string" },
        createdAt: { type: "string", format: "date-time" }
      },
      required: [
        "name", "price", "types", "location", "stateCode",
        "status", "imageUrl"
      ],
      additionalProperties: false
    }
  };

  
  
  
  
  