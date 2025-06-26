import { Ajv } from 'ajv';
const ajv = new Ajv();

export type MontoProperty = { //not chacking anything when the code run
    _id?: string;
    name: string;
    price: number;
    types: string[];
    location: string;
    stateCode: string;
    status: string;
    imageUrl: string;
    createdAt: Date;
};

export const MontoPropertySchema = { //json schema to validate
    type: "object",
    properties: {
        name: { type: "string" },
        price: { type: "number" },
        types: { type: "array", items: { type: "string" } },
        location: { type: "string" },
        stateCode: { type: "string" },
        status: { type: "string" },
        imageUrl: { type: "string" },
        createdAt: { type: "string", format: "date-time" }
    },
    required: ["name","price","types", "location","stateCode", "status","imageUrl","createdAt"],
    additionalProperties: false
};

export type getPropertiesQuery = {
    count?: number;                // Number of properties to return (pagination)
    offset?: number;               // Number of properties to skip (pagination)
    sortBy?: keyof MontoProperty;  // Field to sort by (should match MontoProperty keys)
    sortOrder?: 'asc' | 'desc';    // Sort order
    id?: string;
    name?: string;
    price?: number | { gt?: number; gte?: number; lt?: number; lte?: number; eq?: number; ne?: number};
    types?: string | string[];     // Allow filtering by one or more types
    location?: string;
    stateCode?: string;
    status?: string;
    imageUrl?: string;
    createdAt?: string | Date | { gt?: string | Date; gte?: string | Date; lt?: string | Date; lte?: string | Date; eq?: string | Date };
    [key: string]: any;            // Allow additional filters if needed
};

