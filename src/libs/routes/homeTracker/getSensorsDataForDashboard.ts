import { EmptyInput, GetRoute } from '../types.js';
import { getSensorsDashboardData } from '../../modules/homeTracker/index.js';
import { FromSchema } from 'json-schema-to-ts';

const handler = async () => {
    return getSensorsDashboardData();
};

const outputSchema = {
    type: 'object',
    properties: {
        sensors: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    sensorName: { type: 'string' },
                    lastLogTimestamp: { type: 'number' },
                    hexcolor: {
                        type: 'string',
                        description: 'RGB color in hex format. Example: #AA33CC',
                        pattern: '^#[A-F0-9]{6}$'
                    },
                    lastLogData: {
                        type: 'object',
                        properties: {
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
                        required: ['sensorName'],
                        additionalProperties: false
                    }
                }
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
