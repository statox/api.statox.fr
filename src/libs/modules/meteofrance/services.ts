import { setTimeout } from 'timers/promises';
import { DateTime } from 'luxon';
import { slog } from '../logging/index.js';
import { meteoFranceConnector } from './connector.js';
import { getStations } from './config.js';
import { MeteoFranceLogData, Station } from './types.js';
import { isProd } from '../../config/env.js';

const previousTimestamps: { [stationId: string]: number } = {};

const handleStationObservation = async (station: Station) => {
    const previousTimestamp = previousTimestamps[station.id] || 0;

    const lastObs = await meteoFranceConnector.getLatestObservationForHourlyStation(station.id);

    if (!lastObs) {
        throw new Error('Meteo france API did not respond');
    }

    // ELK expect a timestamp in milliseconds
    let obsDate = Date.now();
    if (lastObs?.validity_time) {
        // The returned date is in UTC, in kibana we store dates in paris zone
        obsDate = DateTime.fromISO(lastObs.validity_time, { zone: 'europe/paris' }).toMillis();
    }

    const transformedObservation: MeteoFranceLogData = {
        humidity: lastObs.u ?? undefined,
        insertTime: lastObs.insert_time ?? undefined,
        meanWindDirectionDegrees: lastObs.dd ?? undefined,
        meanWindSpeedMS: lastObs.ff ?? undefined,
        precipitationMM: lastObs.rr1 ?? undefined,
        pressurehPa: lastObs.pres ? lastObs.pres / 100 : undefined,
        pressureSeaLevelhPa: lastObs.pmer ? lastObs.pmer / 100 : undefined,
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
        const failureTimeoutMs = isProd ? 5000 : 1;
        await setTimeout(failureTimeoutMs);
    }

    slog.log('meteo-france', 'Stop retrying calls', {
        stationId: station.id,
        stationName: station.nom
    });
};

export const doMeteoFrance = async () => {
    for (const station of getStations()) {
        await doSingleStationCheck(station);
    }
};
