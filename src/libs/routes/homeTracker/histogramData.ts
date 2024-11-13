import { FromSchema } from 'json-schema-to-ts';
import { PostRoute, RouteHandler } from '../types';
import { getHistogramData } from '../../modules/homeTracker';

const handler: RouteHandler<Input> = async (params) => {
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

type Input = FromSchema<typeof inputSchema>;

export const route: PostRoute<Input> = {
    method: 'post',
    path: '/homeTracker/histogramData',
    inputSchema,
    handler,
    authentication: 'user',
    outputSchema: {
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
    }
};
