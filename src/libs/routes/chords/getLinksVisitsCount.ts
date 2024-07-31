import type { NextFunction, Request, Response } from 'express';
import { GetRoute } from '../types';
import { getLinksVisitsCount } from '../../modules/chords';

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
    handler,
    authentication: 'none'
};
