import type { Request, Response } from 'express';
import { GetRoute } from '../types';
import { listSensors } from '../../modules/homeTracker/services/listSensors';

const handler = async (req: Request, res: Response) => {
    const data = await listSensors();
    res.send(data);
};

export const route: GetRoute = {
    method: 'get',
    path: '/homeTracker/sensors',
    handler,
    authentication: 'none'
};
