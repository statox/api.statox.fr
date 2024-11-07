import type { NextFunction, Request, Response } from 'express';
import { GetRoute } from '../types';
import { getWatchedContent } from '../../modules/webWatcher';

const handler = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await getWatchedContent());
    } catch (error) {
        next(error);
    }
};

export const route: GetRoute = {
    method: 'get',
    path: '/webWatcher/getAllWatchers',
    handler,
    authentication: 'none'
};
