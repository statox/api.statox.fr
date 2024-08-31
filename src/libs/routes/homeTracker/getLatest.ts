import type { Request, Response } from 'express';
import { GetRoute } from '../types';
import { getLatestData } from '../../modules/homeTracker';

const handler = async (_req: Request, res: Response) => {
    const data = await getLatestData();
    res.send(data);
};

export const route: GetRoute = {
    method: 'get',
    path: '/homeTracker/getLatest',
    handler,
    authentication: 'apikey-iot'
};
