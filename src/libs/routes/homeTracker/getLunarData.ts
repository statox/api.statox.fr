import type { Request, Response } from 'express';
import { GetRoute } from '../types';
import { getCurrentLunarState } from '../../modules/ephemerides';

const handler = async (_req: Request, res: Response) => {
    const currentLunarState = await getCurrentLunarState();
    res.send({ currentLunarState });
};

export const route: GetRoute = {
    method: 'get',
    path: '/homeTracker/getLunarData',
    handler,
    authentication: 'none'
};
