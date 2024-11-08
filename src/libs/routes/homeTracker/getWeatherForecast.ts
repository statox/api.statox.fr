import { GetRoute } from '../types';
import { zambrettiForecaster } from '../../modules/homeTracker';
import { get24hoursOfPressure } from '../../modules/homeTracker/services/getPressureHistory';

const handler = async () => {
    const [forecast, pressureHistory] = await Promise.all([
        zambrettiForecaster(),
        get24hoursOfPressure()
    ]);
    return { forecast, pressureHistory };
};

export const route: GetRoute = {
    method: 'get',
    path: '/homeTracker/getWeatherForecast',
    handler,
    authentication: 'none',
    outputSchema: {
        type: 'object',
        properties: {
            forecast: {
                type: 'object',
                properties: {
                    pressureTrend: { type: 'string' },
                    forecast: { type: 'string' },
                    dataPoints: {
                        type: 'object',
                        properties: {
                            latest: {
                                type: 'object',
                                properties: {
                                    pressurehPa: { type: 'number' },
                                    timestampMs: { type: 'number' }
                                },
                                required: ['pressurehPa', 'timestampMs'],
                                additionalProperties: false
                            },
                            oldest: {
                                type: 'object',
                                properties: {
                                    pressurehPa: { type: 'number' },
                                    timestampMs: { type: 'number' }
                                },
                                required: ['pressurehPa', 'timestampMs'],
                                additionalProperties: false
                            }
                        },
                        required: ['latest', 'oldest'],
                        additionalProperties: false
                    }
                },
                required: ['pressureTrend', 'forecast'],
                additionalProperties: false
            },
            pressureHistory: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        timestamp: { type: 'string' },
                        averagePressurehPa: { type: 'number' }
                    },
                    required: ['timestamp', 'averagePressurehPa'],
                    additionalProperties: false
                }
            }
        },
        required: ['forecast', 'pressureHistory'],
        additionalProperties: false
    }
};
