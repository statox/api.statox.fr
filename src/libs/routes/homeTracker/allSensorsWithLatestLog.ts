import type { Request, Response } from 'express';
import { GetRoute } from '../types';
import { getAllSensorsWithLatestLog } from '../../modules/homeTracker';

const handler = async (_req: Request, res: Response) => {
    const data = await getAllSensorsWithLatestLog();
    res.send(data);
};

export const route: GetRoute = {
    method: 'get',
    path: '/homeTracker/allSensorsWithLatestLog',
    handler,
    authentication: 'none'
};
