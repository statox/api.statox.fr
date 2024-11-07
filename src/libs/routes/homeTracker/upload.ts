import type { Request } from 'express';
import { PostRoute } from '../types';
import { ingestSensorData, sensorRawDataInputSchema } from '../../modules/homeTracker';

const handler = async (req: Request) => {
    ingestSensorData(req.body);
};

export const route: PostRoute = {
    method: 'post',
    path: '/homeTracker/upload',
    inputSchema: sensorRawDataInputSchema,
    handler,
    authentication: 'apikey-iot'
};
