import type { NextFunction, Request, Response } from 'express';
import { GetRoute } from '../types.js';
import { getLinksVisitsCount } from '../../services/chords/index.js';

const handler = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getLinksVisitsCount();
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const route: GetRoute = {
    method: 'get',
    path: '/chords/getLinksVisitsCount',
    handler
};
