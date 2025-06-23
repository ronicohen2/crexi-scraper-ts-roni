import { Ajv } from 'ajv';
const ajv = new Ajv();

export type MontoProperty = { //not chacking anything when the code run
    id: string;
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
    properties: { //just safe types
        id:{
            type: "string"
        },
        name: {
            type: "string"
        },
        price: {
            type: "number"
        }
    },
    required: [
        "id",
        "name"
    ],
    additionalProperties: false
};

export type GetPropertiesQuery = {
    count?: number;
    offset?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    stateCode?: string;
    price?: number;
};

const data = {
    id: "ABC123",
    name: "Seattle Prop",
    price: 100000
}

ajv.validate(MontoPropertySchema, data);
const errors = ajv.errors;
console.log(errors)