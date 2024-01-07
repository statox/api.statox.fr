import type { NextFunction, Request, Response } from 'express';
import { GetRoute } from '../types';
import { getEntriesForStaticView } from '../../services/clipboard';

const handler = async (_req: Request, res: Response, next: NextFunction) => {
    getEntriesForStaticView((err, entries) => {
        if (err) {
            return next(err);
        }
        res.render('clipboard', { entries });
    });
};

export const route: GetRoute = {
    method: 'get',
    path: '/clipboard/view',
    handler
};
