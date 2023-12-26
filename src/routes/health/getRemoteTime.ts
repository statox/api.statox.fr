import type { Request, Response } from 'express';
import { GetRoute } from '../types';

const handler = (_req: Request, res: Response) => {
    const o = { time: Date.now() };
    res.send(o);
};

export const route: GetRoute = {
    method: 'get',
    path: '/health/getRemoteTime',
    handler
};
