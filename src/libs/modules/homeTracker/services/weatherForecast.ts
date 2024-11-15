/* Zambretti weather forecast algorithm
 *
 * See these ressources for implementation details
 * https://github.com/sassoftware/iot-zambretti-weather-forcasting?tab=readme-ov-file
 * https://en.wikipedia.org/wiki/Zambretti_Forecaster
 * https://integritext.net/DrKFS/zambretti.htm
 */

import { elk } from '../../../databases/elk.js';
import { slog } from '../../logging/index.js';

// TODO Have a single source of forecast and reuse them in the different lookup tables
type LookupTable = Map<number, string>;
const fallingLookupTable: LookupTable = new Map<number, string>();
fallingLookupTable.set(1, 'Settled Fine');
fallingLookupTable.set(2, 'Fine Weather');
fallingLookupTable.set(3, 'Fine, Becoming Less Settled');
fallingLookupTable.set(4, 'Fairly Fine, Showery Later');
fallingLookupTable.set(5, 'Showery, Becoming More Unsettled');
fallingLookupTable.set(6, 'Unsettled, Rain Later');
fallingLookupTable.set(7, 'Rain at Times, Worse Later');
fallingLookupTable.set(8, 'Rain at Times, Becoming Very Unsettled');
fallingLookupTable.set(9, 'Very Unsettled, Rain');

const steadyLookupTable: LookupTable = new Map<number, string>();
steadyLookupTable.set(10, 'Settled Fine');
steadyLookupTable.set(11, 'Fine Weather');
steadyLookupTable.set(12, 'Fine, Possibly Showers');
steadyLookupTable.set(13, 'Fairly Fine, Showers Likely');
steadyLookupTable.set(14, 'Showery, Bright Intervals');
steadyLookupTable.set(15, 'Changeable, Some Rain');
steadyLookupTable.set(16, 'Unsettled, Rain at Times');
steadyLookupTable.set(17, 'Rain at Frequent Intervals');
steadyLookupTable.set(18, 'Very Unsettled, Rain');
steadyLookupTable.set(19, 'Stormy, Much Rain');

const risingLookupTable: LookupTable = new Map<number, string>();
risingLookupTable.set(20, 'Settled Fine');
risingLookupTable.set(21, 'Fine Weather');
risingLookupTable.set(22, 'Becoming Fine');
risingLookupTable.set(23, 'Fairly Fine, Improving');
risingLookupTable.set(24, 'Fairly Fine, Possibly Showers Early');
risingLookupTable.set(25, 'Showery Early, Improving');
risingLookupTable.set(26, 'Changeable, Mending');
risingLookupTable.set(27, 'Rather Unsettled, Clearing Later');
risingLookupTable.set(28, 'Unsettled, Probably Improving');
risingLookupTable.set(29, 'Unsettled, Short Fine Intervals');
risingLookupTable.set(30, 'Very Unsettled, Finer at Times');
risingLookupTable.set(31, 'Stormy, Possibly Improving');
risingLookupTable.set(32, 'Stormy, Much Rain');

const trendParams: Record<Trend, { constant: number; coef: number; table: LookupTable }> = {
    rising: { constant: 185, coef: 0.16, table: risingLookupTable },
    steady: { constant: 144, coef: 0.13, table: steadyLookupTable },
    falling: { constant: 127, coef: 0.12, table: fallingLookupTable }
};

interface PressureRecord {
    timestampMs: number;
    pressurehPa: number;
}

const get3hoursOfPressure = async () => {
    const oldestQuery = await elk.search<{
        '@timestamp': number;
        document: {
            pressurehPa: number;
        };
    }>({
        size: 1,
        sort: [
            {
                '@timestamp': {
                    order: 'asc'
                }
            }
        ],
        query: {
            bool: {
                should: [],
                must: [
                    {
                        exists: {
                            field: 'document.pressurehPa'
                        }
                    },
                    {
                        range: {
                            '@timestamp': {
                                gte: 'now-180m/m'
                            }
                        }
                    }
                ]
            }
        },
        _source: ['@timestamp', 'document.pressurehPa']
    });

    const latestQuery = await elk.search<{
        '@timestamp': number;
        document: {
            pressurehPa: number;
        };
    }>({
        size: 1,
        sort: [
            {
                '@timestamp': {
                    order: 'desc'
                }
            }
        ],
        query: {
            bool: {
                should: [],
                must: [
                    {
                        exists: {
                            field: 'document.pressurehPa'
                        }
                    },
                    {
                        range: {
                            '@timestamp': {
                                gte: 'now-20m/m'
                            }
                        }
                    }
                ]
            }
        },
        _source: ['@timestamp', 'document.pressurehPa']
    });

    if (!oldestQuery.hits.hits.length || oldestQuery.hits.hits.length !== 1) {
        throw new Error('MISSING_HISTORIC_DATA');
    }
    if (!latestQuery.hits.hits.length || latestQuery.hits.hits.length !== 1) {
        throw new Error('MISSING_RECENT_DATA');
    }

    const oldest = oldestQuery.hits.hits[0]._source;
    const latest = latestQuery.hits.hits[0]._source;

    if (!oldest || !latest) {
        throw new Error('INVALID_DATA');
    }
    if (oldest['@timestamp'] === latest['@timestamp']) {
        throw new Error('NOT_ENOUGH_DATA');
    }

    return {
        latest: {
            timestampMs: latest['@timestamp'],
            pressurehPa: latest.document.pressurehPa
        },
        oldest: {
            timestampMs: oldest['@timestamp'],
            pressurehPa: oldest.document.pressurehPa
        }
    };
};

/*
 * TODO Add guard against out of bounds pressures
 *
 * Trend   | Pressure at Sea Level Range    | Trend Requirement
 * --------|--------------------------------|---------------------------------------
 * Falling | Between 985 hPa and 1050 hPa | Drop of 1.6 hPa in 3 hours
 * Steady  | Between 960 hPa and 1033 hPa | No drop or rise of 1.6 hPa in 3 hours
 * Rising  | Between 947 hPa and 1030 hPa | Rise of 1.6 hPa in 3 hours
 */
type Trend = 'falling' | 'rising' | 'steady';
const computeTrend = (params: { latest: PressureRecord; oldest: PressureRecord }): Trend => {
    // The Github repo sassoftware/iot-zambretti-weather-forcasting describes the trend detection
    // by using several event of interests and detecting if one it greater than 1.6 or not and whatnot
    //
    // For now I'll do something dumb and only check the difference between the pressure 3 hours ago
    // and the pressure now, we'll see if it's useful to have something smarter later
    const { latest, oldest } = params;

    const diff = Math.abs(oldest.pressurehPa - latest.pressurehPa);

    if (diff < 1.6) {
        return 'steady';
    }
    if (oldest.pressurehPa > latest.pressurehPa) {
        return 'falling';
    }
    return 'rising';
};

// The point at which we are doing our readings is pretty close to the sea level
// so we consider we don't need to adjust the pressure
const lookupForecast = (params: { pressurehPa: number; trend: Trend }) => {
    const { pressurehPa, trend } = params;

    const { constant, coef, table } = trendParams[trend];
    const Z = Math.floor(constant - coef * pressurehPa);

    if (!table.has(Z)) {
        slog.log('weather-forecast', 'zambrettiForecaster - Error - out of range value', {
            pressurehPa,
            trend,
            zValue: Z
        });
        throw new Error('OUT_OF_RANGE_Z_VALUE');
    }

    return table.get(Z)!;
};

export const zambrettiForecaster = async () => {
    try {
        const pressureStats = await get3hoursOfPressure();
        const trend = computeTrend(pressureStats);
        const forecast = lookupForecast({ pressurehPa: pressureStats.latest.pressurehPa, trend });

        slog.log('weather-forecast', 'zambrettiForecaster - got forecast', {
            forecast,
            pressureLatest: pressureStats.latest.pressurehPa,
            timestampLatest: pressureStats.latest.timestampMs,
            pressureOldest: pressureStats.oldest.pressurehPa,
            timestampOldest: pressureStats.oldest.timestampMs,
            trend
        });
        // Including dataPoints for debugging purposes
        // TODO Remove dataPoints when I'm convinced everything works well
        return { pressureTrend: trend, forecast, dataPoints: pressureStats };
    } catch (error) {
        slog.log(
            'weather-forecast',
            'zambrettiForecaster - Got an error while computing forecast',
            {
                error: error as Error
            }
        );

        // TODO Better error handling with specific error messages to client
        return { pressureTrend: 'unknown', forecast: 'ERROR - couldnt determine forecast' };
    }
};
