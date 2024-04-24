import { isProd } from './env';

export const ELK_DOMAIN_ENDPOINT = isProd ? process.env.ELK_DOMAIN_ENDPOINT : 'https://127.0.0.1';
const LOGGER_USER = isProd ? process.env.LOGGER_USER : 'test';
const LOGGER_PASSWORD = isProd ? process.env.LOGGER_PASSWORD : 'test';

export const ELK_TOKEN = Buffer.from(LOGGER_USER + ':' + LOGGER_PASSWORD).toString('base64');
