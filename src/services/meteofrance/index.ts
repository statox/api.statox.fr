import { setTimeout } from 'timers/promises';
import { DateTime } from 'luxon';
import { slog } from '../logging';
import { getLatestObservationForHourlyStation } from './connector';
import { failureTimeoutMs, getStations } from './config';
import { Station } from './types';

const previousTimestamps: { [stationId: string]: number } = {};

const handleStationObservation = async (station: Station) => {
    const previousTimestamp = previousTimestamps[station.id] || 0;

    slog.log('meteo-france', 'Attempting to get an observation', {
        previousTimestamp,
        stationId: station.id,
        stationName: station.nom
    });

    const lastObs = await getLatestObservationForHourlyStation(station.id);

    if (!lastObs) {
        throw new Error('Meteo france API did not respond');
    }

    let obsDate = Date.now();
    if (lastObs?.reference_time) {
        // The returned date is in UTC, in kibana we store dates in paris zone
        obsDate = DateTime.fromISO(lastObs.reference_time, { zone: 'europe/paris' }).toSeconds();
    }

    const transformedObservation = {
        station: station.nom,
        timestamp: obsDate,
        tempCelsius: (lastObs.t ?? 0) - 273.15,
        humidity: lastObs.u ?? 0,
        referenceTime: lastObs.reference_time,
        insertTime: lastObs.insert_time,
        validityTime: lastObs.validity_time
    };

    if (transformedObservation.timestamp === previousTimestamp) {
        slog.log('meteo-france', 'Observation timestamp did not change', {
            previousTimestamp,
            stationId: station.id,
            stationName: station.nom
        });
        return;
    }

    previousTimestamps[station.id] = transformedObservation.timestamp;
    slog.log('meteo-france', 'New observation', { ...transformedObservation });
};

// exported for tests
export const doSingleStationCheck = async (station: Station) => {
    let failedCalls = 0;

    while (failedCalls < 5) {
        try {
            return await handleStationObservation(station);
        } catch (error) {
            slog.log('meteo-france', 'Failed call', {
                error: error as Error,
                failedCalls,
                stationId: station.id,
                stationName: station.nom
            });
        }
        failedCalls++;
        await setTimeout(failureTimeoutMs());
    }

    slog.log('meteo-france', 'Stop retrying calls', {
        stationId: station.id,
        stationName: station.nom
    });
};

export const doMeteoFrance = async () => {
    slog.log('meteo-france', 'Start doMeteoFrance');
    for (const station of getStations()) {
        await doSingleStationCheck(station);
    }
    slog.log('meteo-france', 'Done doMeteoFrance');
};
