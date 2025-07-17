import { FromSchema } from 'json-schema-to-ts';
import { EmptyOutput, PostRoute, RouteHandler } from '../types.js';
import { updateSensorMetadata } from '../../modules/homeTracker/index.js';
import { emptyObjectSchema } from '../helpers.js';

const handler: RouteHandler<Input> = async (params) => {
    params.loggableContext.addData('sensorName', params.input.sensorName);
    params.loggableContext.addData('dataStr', JSON.stringify(params.input));

    await updateSensorMetadata(params.input);
    return;
};

const inputSchema = {
    type: 'object',
    required: ['sensorName', 'hexColor', 'tempOffset', 'sleepTimeSec'],
    additionalProperties: false,
    properties: {
        sensorName: { type: 'string' },
        hexColor: { type: 'string' },
        tempOffset: { type: 'number' },
        sleepTimeSec: { type: 'number', minimum: 0 }
    }
} as const;
type Input = FromSchema<typeof inputSchema>;

export const route: PostRoute<Input, EmptyOutput> = {
    method: 'post',
    path: '/homeTracker/updateSensorMetadata',
    inputSchema: inputSchema,
    handler,
    authentication: 'user',
    outputSchema: emptyObjectSchema
};
