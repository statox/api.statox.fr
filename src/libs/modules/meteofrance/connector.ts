import { METEO_FRANCE_API_KEY } from '../../../packages/config/index.js';
import { slog } from '../logging/index.js';
import { MeteoFranceStationObservation } from './types.js';

const BASE_URL = 'https://public-api.meteofrance.fr/public/DPObs/v1';

const getLatestObservationForHourlyStation = async (stationId: string) => {
    // Observation API
    // https://portail-api.meteofrance.fr/web/fr/api/test/8aab9bc4-6de1-48ee-a2b0-42007b632d5e/cbc94ef9-5147-468c-b87f-5ba02234f834
    //
    // Climatologie API
    // https://portail-api.meteofrance.fr/web/fr/api/test/a5935def-80ae-4e7e-83bc-3ef622f0438d/cbc94ef9-5147-468c-b87f-5ba02234f834

    const API_PATH = '/station/horaire';

    const url = BASE_URL + API_PATH + '?id_station=' + stationId + '&format=json';

    const observationsResponse = await fetch(url, {
        method: 'GET',
        headers: {
            apikey: `${METEO_FRANCE_API_KEY}`,
            accept: 'application/json'
        }
    });

    if (observationsResponse.status !== 200) {
        const error = new Error(observationsResponse.statusText);
        slog.log('meteo-france', 'Error while fetching API', {
            status: observationsResponse.status.toString(),
            error
        });
        throw error;
    }

    const observations = await observationsResponse.json();
    return observations[0] as MeteoFranceStationObservation;
};

export const meteoFranceConnector = {
    getLatestObservationForHourlyStation
};
