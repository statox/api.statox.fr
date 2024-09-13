import { elk } from '../../../databases/elk';
import { SensorLogData } from '../types';

interface SensorRecord {
    '@timestamp': number;
    document: SensorLogData;
}

interface HomeTrackerTimeData {
    tempCelsius?: {
        [sensorName: string]: number;
    };
    internalTempCelsius?: {
        [sensorName: string]: number;
    };
    batteryCharge?: {
        [sensorName: string]: number;
    };
    humidity?: {
        [sensorName: string]: number;
    };
    internalHumidity?: {
        [sensorName: string]: number;
    };
    pressurehPa?: {
        [sensorName: string]: number;
    };
}

interface HomeTrackerHistogramData {
    [timestamp: number]: HomeTrackerTimeData;
}

export const getLatestData = async (window: '3h' | '12h' | '1d' | '3d' | '7d') => {
    let earliestTS: number;
    let nbBuckets: number;

    const oneHour = 60 * 60 * 1000;
    const oneDay = 24 * oneHour;

    if (window === '3h') {
        earliestTS = Date.now() - 3 * oneHour;
        nbBuckets = 18;
    } else if (window === '12h') {
        earliestTS = Date.now() - 12 * oneHour;
        nbBuckets = 72;
    } else if (window === '1d') {
        earliestTS = Date.now() - 24 * oneHour;
        nbBuckets = 48;
    } else if (window === '3d') {
        earliestTS = Date.now() - 3 * oneDay;
        nbBuckets = 72;
    } else if (window === '7d') {
        earliestTS = Date.now() - 7 * oneDay;
        nbBuckets = 200;
    } else {
        // should use some kind of assert.never() instead of default value
        earliestTS = Date.now() - oneDay;
        nbBuckets = 48;
    }

    const result = await elk.search<SensorRecord>({
        index: 'data-home-tracker',
        // We don't need results in hits as the results we want are in the aggregation, hence size 0
        size: 0,
        query: {
            range: {
                '@timestamp': {
                    gte: earliestTS
                }
            }
        },
        aggregations: {
            // We have to aggregate by date first to get the same buckets for all sensors
            byDate: {
                // TODO might need to add some boundaries param like "extended_bounds" in case data is missing
                auto_date_histogram: {
                    field: '@timestamp',
                    buckets: nbBuckets // TODO might want to make the number of buckets parametrized
                },
                aggregations: {
                    bySensor: {
                        terms: {
                            field: 'document.sensorName.keyword'
                        },
                        aggregations: {
                            tempCelsius: {
                                avg: { field: 'document.tempCelsius' }
                            },
                            internalTempCelsius: {
                                avg: { field: 'document.internalTempCelsius' }
                            },
                            humidity: {
                                avg: { field: 'document.humidity' }
                            },
                            internalHumidity: {
                                avg: { field: 'document.internalHumidity' }
                            },
                            pressurehPa: {
                                avg: { field: 'document.pressurehPa' }
                            },
                            batteryCharge: {
                                avg: { field: 'document.batteryCharge' }
                            }
                        }
                    }
                }
            }
        }
    });

    // @ts-expect-error Not sure why the `.buckets` member is not in the typing
    const timeBuckets = result.aggregations?.byDate.buckets || [];

    const sensorNames: Set<string> = new Set();
    const histogramData: HomeTrackerHistogramData = {};

    for (const timeBucket of timeBuckets) {
        const timeRecord: HomeTrackerTimeData = {};

        for (const sensorBucket of timeBucket.bySensor.buckets) {
            const sensorName = sensorBucket.key;

            sensorNames.add(sensorName);

            const tempCelsius = sensorBucket.tempCelsius.value;
            if (tempCelsius) {
                if (!timeRecord.tempCelsius) {
                    timeRecord.tempCelsius = {};
                }
                timeRecord.tempCelsius[sensorName] = tempCelsius;
            }
            const internalTempCelsius = sensorBucket.internalTempCelsius.value;
            if (internalTempCelsius) {
                if (!timeRecord.internalTempCelsius) {
                    timeRecord.internalTempCelsius = {};
                }
                timeRecord.internalTempCelsius[sensorName] = internalTempCelsius;
            }
            const batteryCharge = sensorBucket.batteryCharge.value;
            if (batteryCharge) {
                if (!timeRecord.batteryCharge) {
                    timeRecord.batteryCharge = {};
                }
                timeRecord.batteryCharge[sensorName] = batteryCharge;
            }
            const humidity = sensorBucket.humidity.value;
            if (humidity) {
                if (!timeRecord.humidity) {
                    timeRecord.humidity = {};
                }
                timeRecord.humidity[sensorName] = humidity;
            }
            const internalHumidity = sensorBucket.internalHumidity.value;
            if (internalHumidity) {
                if (!timeRecord.internalHumidity) {
                    timeRecord.internalHumidity = {};
                }
                timeRecord.internalHumidity[sensorName] = internalHumidity;
            }
            const pressurehPa = sensorBucket.pressurehPa.value;
            if (pressurehPa) {
                if (!timeRecord.pressurehPa) {
                    timeRecord.pressurehPa = {};
                }
                timeRecord.pressurehPa[sensorName] = pressurehPa;
            }
        }

        const ts = Math.floor(timeBucket.key / 1000);
        histogramData[ts] = timeRecord;
    }

    return { histogramData, sensorNames: [...sensorNames] };
};
