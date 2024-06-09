import { isProd } from './env';

export const METEO_FRANCE_API_KEY = isProd ? process.env.METEO_FRANCE_API_KEY : '';
