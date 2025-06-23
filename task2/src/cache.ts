import {CACHE_TTL} from './constants'

/**
 * Represents a single cache entry with its data and timestamp
 * Used to implement TTL (Time To Live) functionality
 */
type CacheEntry = {
    data: any;
    timestamp: number;
};
  
// In-memory cache storage using Map
const cache = new Map<string, CacheEntry>();
  
/**
 * Retrieves data from cache if it exists and hasn't expired
 * @param key - The cache key to look up
 * @returns The cached data if valid, null otherwise
 */
export function getFromCache(key: string): any {
    const entry = cache.get(key);
    if (!entry) return null;

    // Check if entry has expired based on CACHE_TTL
    const now = Date.now();
    if (now - entry.timestamp > CACHE_TTL) {
        cache.delete(key);
        return null;
    }

    return entry.data;
}

/**
 * Stores data in cache with current timestamp
 * @param key - The cache key to store the data under
 * @param data - The data to cache
 */
export function setCache(key: string, data: any): void {
    const entry: CacheEntry = {
        data,
        timestamp: Date.now()
    };
    
    cache.set(key, entry);
}