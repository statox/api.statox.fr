import type { NextFunction, Request, Response } from 'express';
import { GetRoute } from '../types';
import { getAllEntries } from '../../services/clipboard';

const handler = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getAllEntries();
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const route: GetRoute = {
    method: 'get',
    path: '/clipboard/getAllEntries',
    handler,
    authentication: 'user'
};
