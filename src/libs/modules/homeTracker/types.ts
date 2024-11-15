import { ApiJsonSchema } from '../../routes/types.js';

export interface SensorRawData {
    sensorName: string;

    batteryCharge?: number;
    batteryPercent?: number;
    detectedForcedReset?: boolean;
    detectedInternalSensorFailure?: boolean;
    detectedLowBattery?: boolean;
    detectedSensorFailure?: boolean;
    humidity?: number;
    internalHumidity?: number;
    internalTempCelsius?: number;
    pressurePa?: number;
    tempCelsius?: number;
    timeToSendMs?: number;
}

export interface SensorLogData {
    sensorName: string;

    batteryCharge?: number;
    batteryPercent?: number;
    detectedForcedReset?: boolean;
    detectedInternalSensorFailure?: boolean;
    detectedLowBattery?: boolean;
    detectedSensorFailure?: boolean;
    humidity?: number;
    internalHumidity?: number;
    internalTempCelsius?: number;
    pressurehPa?: number;
    tempCelsius?: number;
    timeToSendMs?: number;
}

export const sensorRawDataInputSchema = {
    type: 'object',
    required: ['sensorName'],
    additionalProperties: false,
    properties: {
        sensorName: {
            description: 'Name of the sensor',
            type: 'string'
        },
        tempCelsius: {
            description: 'The current room temperature in celsius',
            type: 'number'
        },
        humidity: {
            description: 'The current room humidity in percent',
            type: 'number'
        },
        pressurePa: {
            description: 'The current room pressure in Pascal',
            type: 'number'
        },
        internalTempCelsius: {
            description: 'The current room temperature in celsius',
            type: 'number'
        },
        internalHumidity: {
            description: 'The current room humidity in percent',
            type: 'number'
        },
        batteryCharge: {
            description: 'Computed charge of the battery in Volts',
            type: 'number'
        },
        batteryPercent: {
            description: 'Computed percentage battery',
            type: 'number'
        },
        timeToSendMs: {
            description: 'Computed interval between the start of the loop and the HTTP call',
            type: 'number'
        },
        detectedLowBattery: {
            description: 'True if board detected a battery voltage low enough to trigger shutdown',
            type: 'boolean'
        },
        detectedForcedReset: {
            description: 'True if board detected it restarted after an interrupt forced a restart',
            type: 'boolean'
        },
        detectedInternalSensorFailure: {
            description:
                'True if board detected it could not succcessfully read from the internal sensor',
            type: 'boolean'
        },
        detectedSensorFailure: {
            description:
                'True if board detected it could not succcessfully read from the main sensor',
            type: 'boolean'
        }
    }
} as const satisfies ApiJsonSchema;
