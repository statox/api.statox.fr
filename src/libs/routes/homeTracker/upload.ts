import { FromSchema } from 'json-schema-to-ts';
import { EmptyOutput, PostRoute, RouteHandler } from '../types';
import { emptyObjectSchema } from '../helpers';
import { ingestSensorData, sensorRawDataInputSchema } from '../../modules/homeTracker';

const handler: RouteHandler<Input> = async (params) => {
    params.loggableContext.addData('sensorName', params.input.sensorName);
    params.loggableContext.addData('dataStr', JSON.stringify(params.input));

    ingestSensorData(params.input);
};

type Input = FromSchema<typeof sensorRawDataInputSchema>;

export const route: PostRoute<Input, EmptyOutput> = {
    method: 'post',
    path: '/homeTracker/upload',
    inputSchema: sensorRawDataInputSchema,
    handler,
    authentication: 'apikey-iot',
    outputSchema: emptyObjectSchema
};
