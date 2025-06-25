import { getPropertiesQuery } from "./types";
import { FastifyRequest, FastifyReply } from "fastify";

export function mongoFilter(query: getPropertiesQuery): Record<string, any> {
    const filter: Record<string, any> = {};

    // Exact match for stateCode
    if (query.stateCode) {
        filter.stateCode = query.stateCode;
    }

    // Price filter (supports price_gte, price_lte, price_eq, price_ne)
    const priceOps: Record<string, number> = {};
    if (query['price.eq']) priceOps.$eq = Number(query['price.eq']);
    if (query['price.ne']) priceOps.$ne = Number(query['price.ne']);
    if (query['price.gt']) priceOps.$gt = Number(query['price.gt']);
    if (query['price.gte']) priceOps.$gte = Number(query['price.gte']);
    if (query['price.lt']) priceOps.$lt = Number(query['price.lt']);
    if (query['price.lte']) priceOps.$lte = Number(query['price.lte']);
    if (Object.keys(priceOps).length > 0) {
        filter.price = priceOps;
    }

    // createdAt filter (ISO string)
    const dateOps: Record<string, Date> = {};
    if (query['createdAt.eq']) dateOps.$eq = new Date(query['createdAt.eq']);
    if (query['createdAt.ne']) dateOps.$ne = new Date(query['createdAt.ne']);
    if (query['createdAt.gt']) dateOps.$gt = new Date(query['createdAt.gt']);
    if (query['createdAt.gte']) dateOps.$gte = new Date(query['createdAt.gte']);
    if (query['createdAt.lt']) dateOps.$lt = new Date(query['createdAt.lt']);
    if (query['createdAt.lte']) dateOps.$lte = new Date(query['createdAt.lte']);
    if (Object.keys(dateOps).length > 0) {
        filter.createdAt = dateOps;
    }

    return filter;
}  