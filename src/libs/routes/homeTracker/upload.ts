import type { Request, Response } from 'express';
import { PostRoute } from '../types';
import { ingestSensorData, sensorRawDataInputSchema } from '../../modules/homeTracker';

const handler = async (req: Request, res: Response) => {
    ingestSensorData(req.body);
    res.send({});
};

export const route: PostRoute = {
    // TODO add API key authentication
    method: 'post',
    path: '/homeTracker/upload',
    inputSchema: sensorRawDataInputSchema,
    handler,
    authentication: 'apikey-iot'
};
