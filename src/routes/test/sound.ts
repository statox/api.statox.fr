import type { Request, Response } from 'express';
import { GetRoute } from '../types';

const handler = async (_req: Request, res: Response) => {
    const ts = Date.now();
    res.render('sound', { ts });
};

export const route: GetRoute = {
    method: 'get',
    path: '/test/sound',
    handler
};
