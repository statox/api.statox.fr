import { slog } from '../modules/logging';
import { isProd } from './env';
import { ConfigError } from './errors';

export const R2_ACCESS_KEY_ID = isProd ? process.env.R2_ACCESS_KEY_ID : 'test';
export const R2_SECRET_KEY = isProd ? process.env.R2_SECRET_KEY : 'test';
export const R2_ENDPOINT = isProd ? process.env.R2_ENDPOINT : 'http://127.0.0.1:24566';

if (!R2_ENDPOINT || !R2_SECRET_KEY || !R2_ACCESS_KEY_ID) {
    const configError = new ConfigError('R2');
    slog.log('env-helpers', 'Cant start app', { error: configError });
    throw configError;
}
