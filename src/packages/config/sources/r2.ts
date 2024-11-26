import { isProd } from './env.js';

export const R2_ACCESS_KEY_ID = isProd ? process.env.R2_ACCESS_KEY_ID! : 'test';
export const R2_SECRET_KEY = isProd ? process.env.R2_SECRET_KEY! : 'test';
export const R2_ENDPOINT = isProd ? process.env.R2_ENDPOINT! : 'http://127.0.0.1:24566';
