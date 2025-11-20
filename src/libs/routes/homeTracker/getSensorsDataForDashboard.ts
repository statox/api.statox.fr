import { EmptyInput, GetRoute } from '../types.js';
import { getSensorsDashboardData } from '../../modules/homeTracker/index.js';
import { FromSchema } from 'json-schema-to-ts';

const handler = async () => {
    return getSensorsDashboardData();
};

const logDataSchema = {
    type: 'object',
    properties: {
        timestamp: { type: 'number' },
        sensorName: { type: 'string' },
        batteryCharge: { type: 'number' },
        batteryPercent: { type: 'number' },
        detectedForcedReset: { type: 'boolean' },
        detectedInternalSensorFailure: { type: 'boolean' },
        detectedLowBattery: { type: 'boolean' },
        detectedSensorFailure: { type: 'boolean' },
        humidity: { type: 'number' },
        internalHumidity: { type: 'number' },
        internalTempCelsius: { type: 'number' },
        pressurehPa: { type: 'number' },
        tempCelsius: { type: 'number' },
        timeToSendMs: { type: 'number' }
    },
    required: ['sensorName', 'timestamp'],
    additionalProperties: false
} as const;

const outputSchema = {
    type: 'object',
    properties: {
        sensors: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    sensorName: { type: 'string' },
                    lastAlertDateUnix: { type: ['number', 'null'] },
                    lastSyncDateUnix: { type: 'number' },
                    hexColor: {
                        type: 'string',
                        description: 'RGB color in hex format. Example: #AA33CC',
                        pattern: '^#[A-F0-9]{6}$'
                    },
                    lastLogData: logDataSchema,
                    oneHourAgoLogData: logDataSchema,
                    oneDayAgoLogData: logDataSchema,
                    sleepTimeSec: { type: 'number' },
                    tempOffset: { type: 'number' }
                },
                required: [
                    'sensorName',
                    'tempOffset',
                    'sleepTimeSec',
                    'hexColor',
                    'lastSyncDateUnix',
                    'lastAlertDateUnix',
                    'lastLogData',
                    'oneHourAgoLogData',
                    'oneDayAgoLogData'
                ],
                additionalProperties: false
            }
        }
    },
    required: ['sensors'],
    additionalProperties: false
} as const;

export const route: GetRoute<EmptyInput, FromSchema<typeof outputSchema>> = {
    method: 'get',
    path: '/homeTracker/getSensorsDataForDashboard',
    handler,
    authentication: 'none',
    outputSchema
};
