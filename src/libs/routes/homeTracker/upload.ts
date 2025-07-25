import { FromSchema } from 'json-schema-to-ts';
import { EmptyOutput, PostRoute, RouteHandler } from '../types.js';
import {
    getSensorSleepTimeSec,
    ingestSensorData,
    sensorRawDataInputSchema,
    updateSensorLastSyncDate
} from '../../modules/homeTracker/index.js';
import { slog } from '../../modules/logging/index.js';

const handler: RouteHandler<Input> = async (params) => {
    slog.log('debug', 'Starting hometracker upload', { sensorName: params.input.sensorName });
    params.loggableContext.addData('sensorName', params.input.sensorName);
    params.loggableContext.addData('dataStr', JSON.stringify(params.input));

    await updateSensorLastSyncDate({ sensorName: params.input.sensorName });
    slog.log('debug', 'After updateSensorLastSyncDate', { sensorName: params.input.sensorName });
    // Don't await for data ingestion to avoid keeping the sensor up for too long
    // I think it should make tests flaky but it doesn't seem to be the case. Not sure why.
    ingestSensorData(params.input);
    slog.log('debug', 'After ingestSensorData', { sensorName: params.input.sensorName });

    const instructSleepSec = await getSensorSleepTimeSec({ sensorName: params.input.sensorName });
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
