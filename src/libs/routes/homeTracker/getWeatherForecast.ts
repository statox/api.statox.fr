import { FromSchema } from 'json-schema-to-ts';
import { EmptyInput, GetRoute } from '../types.js';
import { zambrettiForecaster } from '../../modules/homeTracker/index.js';
import { get24hoursOfPressure } from '../../modules/homeTracker/services/getPressureHistory.js';

const handler = async () => {
    const [forecast, pressureHistory] = await Promise.all([
        zambrettiForecaster(),
        get24hoursOfPressure()
    ]);
    return { forecast, pressureHistory };
};

const outputSchema = {
    type: 'object',
    properties: {
        forecast: {
            type: 'object',
            properties: {
                pressureTrend: { type: 'string', enum: ['falling', 'rising', 'steady', 'unknown'] },
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
} as const;

export const route: GetRoute<EmptyInput, FromSchema<typeof outputSchema>> = {
    method: 'get',
    path: '/homeTracker/getWeatherForecast',
    handler,
    authentication: 'none',
    outputSchema
};
