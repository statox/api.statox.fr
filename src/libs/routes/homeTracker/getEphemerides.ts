import type { Request, Response } from 'express';
import { GetRoute } from '../types';
import { getTodayEphemerides } from '../../modules/ephemerides';

const handler = async (_req: Request, res: Response) => {
    const ephemerides = getTodayEphemerides();
    res.send({ ephemerides });
};

export const route: GetRoute = {
    method: 'get',
    path: '/homeTracker/getEphemerides',
    handler,
    authentication: 'none'
};
