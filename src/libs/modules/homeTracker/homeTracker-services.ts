import { slog } from '../logging';
import { SensorLogData, SensorRawData } from './types';
import { elk } from '../../databases/elk';
import { notifySlack } from '../notifier/slack';

export const ingestSensorData = (sensorRawData: SensorRawData) => {
    const {
        batteryCharge,
        batteryPercent,
        detectedForcedReset,
        detectedInternalSensorFailure,
        detectedLowBattery,
        detectedSensorFailure,
        humidity,
        internalHumidity,
        internalTempCelsius,
        pressurePa,
        sensorName,
        tempCelsius,
        timeToSendMs
    } = sensorRawData;

    const loggedData: SensorLogData = {
        sensorName
    };

    if (tempCelsius === undefined) {
        slog.log('home-tracker', 'data error', {
            sensorName,
            invalidField: 'tempCelsius',
            invalidValueStr: 'is undefined'
        });
    } else if (tempCelsius < -10 || tempCelsius > 50 || (tempCelsius > 0 && tempCelsius < 0.01)) {
        slog.log('home-tracker', 'data error', {
            sensorName,
            invalidField: 'tempCelsius',
            invalidValueStr: tempCelsius.toString()
        });
    } else {
        loggedData.tempCelsius = tempCelsius;
    }

    if (humidity === undefined) {
        slog.log('home-tracker', 'data error', {
            sensorName,
            invalidField: 'humidity',
            invalidValueStr: 'is undefined'
        });
    } else if (humidity < 0 || humidity > 100 || (humidity > 0 && humidity < 0.01)) {
        slog.log('home-tracker', 'data error', {
            sensorName,
            invalidField: 'humidity',
            invalidValueStr: humidity.toString()
        });
    } else {
        loggedData.humidity = humidity;
    }

    if (pressurePa !== undefined) {
        // https://en.wikipedia.org/wiki/Atmospheric_pressure#Records
        if (pressurePa < 80000 || pressurePa > 110000) {
            slog.log('home-tracker', 'data error', {
                sensorName,
                invalidField: 'pressurePa',
                invalidValueStr: pressurePa.toString()
            });
        } else {
            const pressurehPa = pressurePa ? pressurePa / 100 : undefined;
            loggedData.pressurehPa = pressurehPa;
        }
    }

    if (internalTempCelsius !== undefined) {
        if (
            internalTempCelsius < -10 ||
            internalTempCelsius > 100 ||
            (internalTempCelsius > 0 && internalTempCelsius < 0.01)
        ) {
            slog.log('home-tracker', 'data error', {
                sensorName,
                invalidField: 'internalTempCelsius',
                invalidValueStr: internalTempCelsius.toString()
            });
        } else {
            loggedData.internalTempCelsius = internalTempCelsius;
        }
    }

    if (internalHumidity !== undefined) {
        if (
            internalHumidity < -10 ||
            internalHumidity > 100 ||
            (internalHumidity > 0 && internalHumidity < 0.01)
        ) {
            slog.log('home-tracker', 'data error', {
                sensorName,
                invalidField: 'internalHumidity',
                invalidValueStr: internalHumidity.toString()
            });
        } else {
            loggedData.internalHumidity = internalHumidity;
        }
    }

    if (batteryCharge === undefined) {
        slog.log('home-tracker', 'data error', {
            sensorName,
            invalidField: 'batteryCharge',
            invalidValueStr: 'is undefined'
        });
    } else if (batteryCharge < 0 || batteryCharge > 5) {
        // LiPo should not go above 4.2 while in charge
        slog.log('home-tracker', 'data error', {
            sensorName,
            invalidField: 'batteryCharge',
            invalidValueStr: batteryCharge.toString()
        });
    } else {
        loggedData.batteryCharge = batteryCharge;
    }

    if (batteryPercent === undefined) {
        slog.log('home-tracker', 'data error', {
            sensorName,
            invalidField: 'batteryPercent',
            invalidValueStr: 'is undefined'
        });
    } else if (batteryPercent < 0 || batteryPercent > 120) {
        slog.log('home-tracker', 'data error', {
            sensorName,
            invalidField: 'batteryPercent',
            invalidValueStr: batteryPercent.toString()
        });
    } else {
        loggedData.batteryPercent = batteryPercent;
    }

    if (timeToSendMs !== undefined) {
        loggedData.timeToSendMs = timeToSendMs;
    }
    if (detectedLowBattery !== undefined) {
        loggedData.detectedLowBattery = detectedLowBattery;
    }
    if (detectedForcedReset !== undefined) {
        loggedData.detectedForcedReset = detectedForcedReset;
    }
    if (detectedSensorFailure !== undefined) {
        loggedData.detectedSensorFailure = detectedSensorFailure;
    }
    if (detectedInternalSensorFailure !== undefined) {
        loggedData.detectedInternalSensorFailure = detectedInternalSensorFailure;
    }

    slog.log('home-tracker', 'Home tracking event', loggedData);
};

const missingSensorLogs_alertedSensors = new Set();
export const doHomeTrackerMonitoring = async () => {
    try {
        await _doHomeTrackerMonitoring();
    } catch (error) {
        slog.log('periodic-tasks', 'error in doHomeTrackerMonitoring', { error: error as Error });
        notifySlack({
            message: 'error in doHomeTrackerMonitoring',
            error: error as Error
        });
    }
};

export const _doHomeTrackerMonitoring = async () => {
    const monitoredSensorNames = ['salon', 'jardiniere'];

    for (const sensorName of monitoredSensorNames) {
        const result = await elk.search<{ sensorName: string }>({
            index: 'logs-home-tracker-default',
            query: {
                // TODO check the type issue here
                // @ts-expect-error: Not sure why the typing is not happy here but the query works
                bool: {
                    must: [
                        {
                            term: {
                                'document.sensorName': {
                                    value: sensorName
                                }
                            }
                        },
                        {
                            range: {
                                '@timestamp': {
                                    gte: 'now-30m'
                                }
                            }
                        }
                    ]
                }
            }
        });

        // TODO I should be using result.hits.total but for a reason
        // I don't understand the typing is broken
        const nbLogs = result.hits.hits.length;

        if (nbLogs < 2) {
            if (!missingSensorLogs_alertedSensors.has(sensorName)) {
                await notifySlack({
                    message: 'Missing home tracker data for sensor ' + sensorName,
                    directMention: true
                });
                missingSensorLogs_alertedSensors.add(sensorName);
            }
        } else {
            missingSensorLogs_alertedSensors.delete(sensorName);
        }
    }
};
