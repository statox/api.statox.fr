import { GetRoute } from '../types';
import { getAllSensorsWithLatestLog } from '../../modules/homeTracker';

const handler = async () => {
    return getAllSensorsWithLatestLog();
};

export const route: GetRoute = {
    method: 'get',
    path: '/homeTracker/allSensorsWithLatestLog',
    handler,
    authentication: 'none',
    outputSchema: {
        type: 'object',
        properties: {
            sensors: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        sensorName: { type: 'string' },
                        lastLogTimestamp: { type: 'number' },
                        rgbColor: {
                            type: 'object',
                            properties: {
                                r: { type: 'number' },
                                g: { type: 'number' },
                                b: { type: 'number' }
                            },
                            required: ['r', 'g', 'b'],
                            additionalProperties: false
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
                                pressurePa: { type: 'number' },
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
    }
};
