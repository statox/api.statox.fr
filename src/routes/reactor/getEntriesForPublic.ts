import type { NextFunction, Request, Response } from 'express';
import { GetRoute } from '../types.js';
import { getEntriesForPublic } from '../../services/reactor/index.js';

const handler = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getEntriesForPublic();
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const route: GetRoute = {
    method: 'get',
    path: '/reactor/getEntriesForPublic',
    handler
};
