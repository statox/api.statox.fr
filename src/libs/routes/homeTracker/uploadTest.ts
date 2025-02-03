import { FromSchema } from 'json-schema-to-ts';
import { ApiJsonSchema, EmptyOutput, PostRoute, RouteHandler } from '../types.js';
import { pushNotifier } from '../../modules/notifier/index.js';

/*
 * TODO: Delete this endpoint /!\
 * This endpoint is meant to be temporary, it is not tested
 */
const handler: RouteHandler<Input> = async (params) => {
    params.loggableContext.addData('sensorName', params.input.sensorName);
    params.loggableContext.addData('dataStr', JSON.stringify(params.input));

    pushNotifier.notify({
        title: 'Test sensor sleep',
        message: 'Got call from sensor' + params.input.sensorName
    });

    const instructSleepSec = Math.floor(1 + Math.random() * 10);
    params.loggableContext.addData('instructSleepSec', instructSleepSec);

    return { instructSleepSec };
};

export const sensorRawDataInputSchema = {
    type: 'object',
    required: ['sensorName'],
    additionalProperties: false,
    properties: {
        sensorName: {
            description: 'Name of the sensor',
            type: 'string'
        },
        programmedSleepTimeSec: {
            description: 'How long the sensor should sleep before the next call',
            type: 'number'
        }
    }
} as const satisfies ApiJsonSchema;

type Input = FromSchema<typeof sensorRawDataInputSchema>;

export const route: PostRoute<Input, EmptyOutput> = {
    method: 'post',
    path: '/homeTracker/uploadTest',
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
