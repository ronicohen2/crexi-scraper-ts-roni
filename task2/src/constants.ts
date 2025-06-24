import dotenv from 'dotenv';
dotenv.config();

export const DEFAULT_PORT = 3000; 
export const MONGODB_URI = process.env.MONGODB_URI;
export const CACHE_TTL = 5 * 60 * 1000; //5 Minutes in milliseconds