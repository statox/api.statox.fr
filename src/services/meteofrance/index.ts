import { METEO_FRANCE_API_KEY } from '../env-helpers/meteofrance';
import { slog } from '../logging';
import { MeteoFranceStationObservation } from './types';

const BASE_URL = 'https://public-api.meteofrance.fr/public/DPObs/v1';
const API_PATH = '/station/horaire';

const stations = [
    {
        id: '75116008',
        nom: 'LONGCHAMP',
        posteOuvert: true,
        typePoste: 1,
        lon: 2.233667,
        lat: 48.854833,
        alt: 27,
        postePublic: true
    },
    {
        id: '75104001',
        nom: 'TOUR ST-JACQUES',
        posteOuvert: false,
        typePoste: 4,
        lon: 2.348333,
        lat: 48.858333,
        alt: 38,
        postePublic: true
    },
    {
        id: '75106001',
        nom: 'LUXEMBOURG',
        posteOuvert: true,
        typePoste: 2,
        lon: 2.333833,
        lat: 48.844667,
        alt: 46,
        postePublic: true
    },
    {
        id: '75107005',
        nom: 'TOUR EIFFEL',
        posteOuvert: true,
        typePoste: 2,
        lon: 2.2945,
        lat: 48.858333,
        alt: 330,
        postePublic: true
    },
    {
        id: '75110001',
        nom: 'LARIBOISIERE',
        posteOuvert: true,
        typePoste: 2,
        lon: 2.352,
        lat: 48.882833,
        alt: 55,
        postePublic: true
    },
    {
        id: '75114001',
        nom: 'PARIS-MONTSOURIS',
        posteOuvert: true,
        typePoste: 0,
        lon: 2.337833,
        lat: 48.821667,
        alt: 75,
        postePublic: true
    },
    {
        id: '75114002',
        nom: 'OBSERVATOIRE',
        posteOuvert: false,
        typePoste: 4,
        lon: 2.336667,
        lat: 48.836667,
        alt: 62,
        postePublic: true
    },
    {
        id: '75114007',
        nom: 'PARIS-MONTSOURIS-DOUBLE',
        posteOuvert: true,
        typePoste: 2,
        lon: 2.337833,
        lat: 48.821667,
        alt: 75,
        postePublic: true
    },
    {
        id: '75120006',
        nom: 'BELLEVILLE PARC',
        posteOuvert: false,
        typePoste: 2,
        lon: 2.384667,
        lat: 48.871333,
        alt: 80,
        postePublic: true
    }
];

const getLatestObservationForHourlyStation = async (stationId: string) => {
    // Observation API
    // https://portail-api.meteofrance.fr/web/fr/api/test/8aab9bc4-6de1-48ee-a2b0-42007b632d5e/cbc94ef9-5147-468c-b87f-5ba02234f834
    //
    // Climatologie API
    // https://portail-api.meteofrance.fr/web/fr/api/test/a5935def-80ae-4e7e-83bc-3ef622f0438d/cbc94ef9-5147-468c-b87f-5ba02234f834

    const url = BASE_URL + API_PATH + '?id_station=' + stationId + '&format=json';

    const observationsResponse = await fetch(url, {
        method: 'GET',
        headers: {
            apikey: `${METEO_FRANCE_API_KEY}`,
            accept: 'application/json'
        }
    });

    const observations = await observationsResponse.json();
    const lastObs = observations[0] as MeteoFranceStationObservation;

    const station = stations.find((s) => s.id == stationId);

    const obsDate = new Date(lastObs?.reference_time || Date.now());
    const obsTs = obsDate.valueOf() / 1000;

    const transformedObservation = {
        station: station?.nom || 'unknown',
        timestamp: obsTs,
        tempCelsius: (lastObs.t ?? 0) - 273.15,
        humidity: lastObs.u ?? 0
    };

    return transformedObservation;
};

let failedCalls = 0;
let previousTimestamp = 0;
export const periodicMeteoFranceCheck = async () => {
    try {
        slog.log('meteo-france', 'Attempting to get an observation', {
            previousTimestamp
        });
        const station = stations[0];
        const observation = await getLatestObservationForHourlyStation(station.id);

        if (observation.timestamp === previousTimestamp) {
            slog.log('meteo-france', 'Observation timestamp did not change', { previousTimestamp });
            return;
        }

        previousTimestamp = observation.timestamp;
        slog.log('meteo-france', 'New observation', observation);
        failedCalls = 0;
    } catch (error) {
        slog.log('meteo-france', 'Failed call', {
            error: error as Error,
            failedCalls
        });
        failedCalls++;
        if (failedCalls < 5) {
            setTimeout(periodicMeteoFranceCheck, 5000);
        } else {
            slog.log('meteo-france', 'Stop retrying calls');
        }
    }
};
