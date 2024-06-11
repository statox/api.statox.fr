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

    // ELK expect a timestamp in milliseconds
    let obsDate = Date.now();
    if (lastObs?.validity_time) {
        // The returned date is in UTC, in kibana we store dates in paris zone
        obsDate = DateTime.fromISO(lastObs.validity_time, { zone: 'europe/paris' }).toMillis();
    }

    const transformedObservation = {
        humidity: lastObs.u ?? undefined,
        insertTime: lastObs.insert_time ?? undefined,
        meanWindDirectionDegrees: lastObs.dd ?? undefined,
        meanWindSpeedMS: lastObs.ff ?? undefined,
        precipitationMM: lastObs.rr1 ?? undefined,
        pressurePa: lastObs.pres ?? undefined,
        pressureSeaLevelPa: lastObs.pmer ?? undefined,
        referenceTime: lastObs.reference_time ?? undefined,
        station: station.nom,
        tempCelsius: lastObs.t ? lastObs.t - 273.15 : undefined,
        observationTimestamp: obsDate,
        validityTime: lastObs.validity_time ?? undefined
    };

    if (transformedObservation.observationTimestamp === previousTimestamp) {
        slog.log('meteo-france', 'Observation timestamp did not change', {
            previousTimestamp,
            stationId: station.id,
            stationName: station.nom
        });
        return;
    }

    previousTimestamps[station.id] = transformedObservation.observationTimestamp;
    slog.log('meteo-france', 'Got result', { ...transformedObservation });
    slog.log('meteo-france', 'New observation', { ...transformedObservation });
};

// exported for tests
export const doSingleStationCheck = async (station: Station) => {
    let failedCalls = 0;

    while (failedCalls < 5) {
        try {
            return await handleStationObservation(station);
        } catch (error) {
            console.log('Caught error while handleStationObservation');
            console.log(error);
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
