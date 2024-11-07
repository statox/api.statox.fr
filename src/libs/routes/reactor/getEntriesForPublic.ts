import type { NextFunction, Request, Response } from 'express';
import { GetRoute } from '../types';
import { getEntriesForPublic } from '../../modules/reactor';

const handler = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getEntriesForPublic();
        res.send(result);
    } catch (error) {
        next(error);
    }
};

export const route: GetRoute = {
    method: 'get',
    path: '/reactor/getEntriesForPublic',
    handler,
    authentication: 'none'
};
