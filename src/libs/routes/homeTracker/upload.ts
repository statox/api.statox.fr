import { FromSchema } from 'json-schema-to-ts';
import { EmptyOutput, PostRoute, RouteHandler } from '../types.js';
import { ingestSensorData, sensorRawDataInputSchema } from '../../modules/homeTracker/index.js';

const handler: RouteHandler<Input> = async (params) => {
    params.loggableContext.addData('sensorName', params.input.sensorName);
    params.loggableContext.addData('dataStr', JSON.stringify(params.input));

    // Don't await for data ingestion to avoid keeping the sensor up for too long
    // I think it should make tests flaky but it doesn't seem to be the case. Not sure why.
    ingestSensorData(params.input);

    // For now sensors always sleep for 10 minutes between two uploads
    // The -4 is to try to reduce drift due to sensors restarting
    // TODO: Implement variable sleep time based on time of the day
    // const instructSleepSec = 10 * 60 - 4;
    const instructSleepSec = 30;
    params.loggableContext.addData('instructSleepSec', instructSleepSec);
    return { instructSleepSec };
};

type Input = FromSchema<typeof sensorRawDataInputSchema>;

export const route: PostRoute<Input, EmptyOutput> = {
    method: 'post',
    path: '/homeTracker/upload',
    inputSchema: sensorRawDataInputSchema,
    handler,
    authentication: 'apikey-iot',
    outputSchema: {
        type: 'object',
        required: ['instructSleepSec'],
        additionalProperties: false,
        properties: {
            instructSleepSec: {
                description: 'The recommended sleeping time of the sensor in seconds',
                type: 'number'
            }
        }
    }
};
