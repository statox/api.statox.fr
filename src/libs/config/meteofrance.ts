import { isProd } from './env.js';
import { ConfigError } from './errors.js';

// Token is generated from this page
// https://portail-api.meteofrance.fr/web/fr/api/DonneesPubliquesObservation
//
// Subscribed for free
// Token type: API key
// Validity seconds: 3600*24*30*365 = 63072000
// TODO use proper OAuth Token
//
// For now the API is quite shitty I have to retry all calls several times until
// one of them works. Maybe OAuth auth would fix stuff?
//
// Tests setup: The connector's method is stubbed
// Local setup: Get the API key from the prod config

export const METEO_FRANCE_API_KEY = isProd ? process.env.METEO_FRANCE_API_KEY : 'CHANGEME';

if (!METEO_FRANCE_API_KEY) {
    throw new ConfigError('MeteoFrance API key');
}
