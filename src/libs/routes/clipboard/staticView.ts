import type { NextFunction, Request, Response } from 'express';
import { GetRoute } from '../types';
import { getEntriesForStaticView } from '../../modules/clipboard';

const handler = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const entries = await getEntriesForStaticView();
        res.render('clipboard', { entries });
    } catch (error) {
        next(error);
    }
};

export const route: GetRoute = {
    method: 'get',
    path: '/clipboard/view',
    handler,
    authentication: 'none'
};
