import { setTimeout } from 'timers/promises';
import { DateTime } from 'luxon';
import { slog } from '../logging';
import { getLatestObservationForHourlyStation } from './connector';
import { failureTimeoutMs, getStations } from './config';

const handleStationObservation = async (stationId: string) => {
    slog.log('meteo-france', 'Attempting to get an observation', {
        previousTimestamp
    });

    const station = getStations().find((s) => s.id == stationId);
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

let previousTimestamp = 0;
export const periodicMeteoFranceCheck = async () => {
    let failedCalls = 0;

    while (failedCalls < 5) {
        try {
            const station = getStations()[0];
            await handleStationObservation(station.id);
            return;
        } catch (error) {
            slog.log('meteo-france', 'Failed call', {
                error: error as Error,
                failedCalls
            });
        }
        failedCalls++;
        await setTimeout(failureTimeoutMs());
    }

    slog.log('meteo-france', 'Stop retrying calls', {});
};
