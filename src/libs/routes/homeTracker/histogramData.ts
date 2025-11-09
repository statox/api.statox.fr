import { FromSchema } from 'json-schema-to-ts';
import { PostRoute, RouteHandler } from '../types.js';
import { getHistogramData } from '../../modules/homeTracker/index.js';

const handler: RouteHandler<Input> = async (params) => {
    params.loggableContext.addData('timewindow', params.input.timeWindow);
    return getHistogramData(params.input.timeWindow);
};

const inputSchema = {
    type: 'object',
    required: ['timeWindow'],
    additionalProperties: false,
    properties: {
        timeWindow: {
            type: 'string',
            enum: ['30m', '3h', '12h', '1d', '3d', '7d', '2w', '1M', '2M', '6M', 'alltime']
        }
    }
} as const;

const outputSchema = {
    type: 'object',
    properties: {
        sensorNames: {
            type: 'array',
            items: { type: 'string' }
        },
        histogramData: {
            type: 'object',
            additionalProperties: {
                type: 'object',
                properties: {
                    tempCelsius: { type: 'object', additionalProperties: { type: 'number' } },
                    internalTempCelsius: {
                        type: 'object',
                        additionalProperties: { type: 'number' }
                    },
                    batteryCharge: { type: 'object', additionalProperties: { type: 'number' } },
                    humidity: { type: 'object', additionalProperties: { type: 'number' } },
                    internalHumidity: {
                        type: 'object',
                        additionalProperties: { type: 'number' }
                    },
                    pressurehPa: { type: 'object', additionalProperties: { type: 'number' } }
                },
                additionalProperties: false
            }
        }
    },
    required: ['sensorNames', 'histogramData'],
    additionalProperties: false
} as const;

type Input = FromSchema<typeof inputSchema>;

export const route: PostRoute<Input, FromSchema<typeof outputSchema>> = {
    method: 'post',
    path: '/homeTracker/histogramData',
    inputSchema,
    scope: 'homeTracker',
    handler,
    authentication: 'user2',
    outputSchema
};
