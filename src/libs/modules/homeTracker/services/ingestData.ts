import { slog } from '../../logging/index.js';
import { SensorLogData, SensorRawData } from '../types.js';
import { elk } from '../../../databases/elk.js';
import { slackNotifier } from '../../notifier/slack.js';

export const ingestSensorData = async (sensorRawData: SensorRawData) => {
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

    const newDocument = {
        '@timestamp': Date.now(),
        document: {
            ...loggedData
        }
    };

    try {
        await elk.index({
            index: 'data-home-tracker',
            document: newDocument
        });
    } catch (error) {
        // TODO Add tests for this behavior
        slackNotifier.notifySlack({
            message: 'error ingesting home tracker data',
            error: error as Error
        });
        slackNotifier.notifySlack({
            message: `missing data: ${JSON.stringify(newDocument)}`
        });
    }
};
