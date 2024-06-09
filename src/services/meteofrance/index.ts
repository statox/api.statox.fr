import { DateTime } from 'luxon';
import { slog } from '../logging';
import { getLatestObservationForHourlyStation } from './connector';

const stations = [
    {
        id: '75116008',
        nom: 'LONGCHAMP'
    },
    {
        id: '75104001',
        nom: 'TOUR ST-JACQUES'
    },
    {
        id: '75106001',
        nom: 'LUXEMBOURG'
    },
    {
        id: '75107005',
        nom: 'TOUR EIFFEL'
    },
    {
        id: '75110001',
        nom: 'LARIBOISIERE'
    },
    {
        id: '75114001',
        nom: 'PARIS-MONTSOURIS'
    },
    {
        id: '75114002',
        nom: 'OBSERVATOIRE'
    },
    {
        id: '75114007',
        nom: 'PARIS-MONTSOURIS-DOUBLE'
    },
    {
        id: '75120006',
        nom: 'BELLEVILLE PARC'
    }
];

const handleStationObservation = async (stationId: string) => {
    slog.log('meteo-france', 'Attempting to get an observation', {
        previousTimestamp
    });

    const station = stations.find((s) => s.id == stationId);
    const lastObs = await getLatestObservationForHourlyStation(stationId);

    let obsDate = Date.now();
    if (lastObs?.reference_time) {
        // The returned date is in UTC, in kibana we store dates in paris zone
        obsDate = DateTime.fromISO(lastObs.reference_time, { zone: 'europe/paris' }).toSeconds();
    }

    const transformedObservation = {
        station: station?.nom || 'unknown',
        timestamp: obsDate,
        tempCelsius: (lastObs.t ?? 0) - 273.15,
        humidity: lastObs.u ?? 0,
        referenceTime: lastObs.reference_time,
        insertTime: lastObs.insert_time,
        validityTime: lastObs.validity_time
    };

    if (transformedObservation.timestamp === previousTimestamp) {
        slog.log('meteo-france', 'Observation timestamp did not change', { previousTimestamp });
        return;
    }

    previousTimestamp = transformedObservation.timestamp;
    slog.log('meteo-france', 'New observation', { ...transformedObservation });
};

let failedCalls = 0;
let previousTimestamp = 0;
export const periodicMeteoFranceCheck = async () => {
    try {
        const station = stations[0];
        await handleStationObservation(station.id);
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
