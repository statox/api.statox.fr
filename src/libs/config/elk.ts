import { isProd } from './env';
import { ConfigError } from './errors';

export const ELK_DOMAIN_ENDPOINT = isProd ? process.env.ELK_DOMAIN_ENDPOINT : 'https://127.0.0.1';
const LOGGER_USER = isProd ? process.env.LOGGER_USER : 'test';
const LOGGER_PASSWORD = isProd ? process.env.LOGGER_PASSWORD : 'test';

export const ELK_TOKEN = Buffer.from(LOGGER_USER + ':' + LOGGER_PASSWORD).toString('base64');

export const ELK_API_ENDPOINT = isProd ? process.env.ELK_API_ENDPOINT : 'http://127.0.0.1:29200';
export const ELK_API_KEY = isProd ? process.env.ELK_API_KEY : 'not_used_locally';

if (!ELK_DOMAIN_ENDPOINT || !LOGGER_USER || !LOGGER_PASSWORD) {
    throw new ConfigError('ELK logger');
}

if (!ELK_DOMAIN_ENDPOINT || !ELK_API_KEY) {
    throw new ConfigError('ELK api');
}
