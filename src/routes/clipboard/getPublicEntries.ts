import type { NextFunction, Request, Response } from 'express';
import { GetRoute } from '../types.js';
import { getPublicEntries } from '../../services/clipboard/index.js';

const handler = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getPublicEntries();
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const route: GetRoute = {
    method: 'get',
    path: '/clipboard/getPublicEntries',
    handler
};
