import NodeCache from "node-cache";
import { CACHE_TTL } from "./constants";

const cache = new NodeCache ( { stdTTL: CACHE_TTL } );

export function getFromCache(key: string): any | null {
    const data = cache.get( key);
    return data ?? null;
}

export function setCache(key: string, data: any): void {
    cache.set(key, data);
}