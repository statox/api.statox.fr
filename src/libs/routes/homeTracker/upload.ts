import { FromSchema } from 'json-schema-to-ts';
import { PostRoute, RouteHandler } from '../types';
import { ingestSensorData, sensorRawDataInputSchema } from '../../modules/homeTracker';

const handler: RouteHandler<Input> = async (params) => {
    ingestSensorData(params.input);
};

type Input = FromSchema<typeof sensorRawDataInputSchema>;

export const route: PostRoute<Input> = {
    method: 'post',
    path: '/homeTracker/upload',
    inputSchema: sensorRawDataInputSchema,
    handler,
    authentication: 'apikey-iot',
    outputSchema: {
        type: 'object',
        additionalProperties: false
    }
};
