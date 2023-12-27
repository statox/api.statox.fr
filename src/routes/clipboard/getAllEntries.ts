import type { NextFunction, Request, Response } from 'express';
import { GetRoute } from '../types';
import { getAllEntries } from '../../services/clipboard';

const handler = async (_req: Request, res: Response, next: NextFunction) => {
    getAllEntries((error, entries) => {
        if (error) {
            return next(error);
        }
        res.json(entries);
    });
};

export const route: GetRoute = {
    method: 'get',
    path: '/clipboard/getAllEntries',
    handler,
    protected: true
};
