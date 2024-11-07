import type { NextFunction, Request, Response } from 'express';
import { GetRoute } from '../types';
import { getPublicEntries } from '../../modules/clipboard';

const handler = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getPublicEntries();
        res.send(result);
    } catch (error) {
        next(error);
    }
};

export const route: GetRoute = {
    method: 'get',
    path: '/clipboard/getPublicEntries',
    handler,
    authentication: 'none'
};
