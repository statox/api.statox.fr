import type { NextFunction, Request, Response } from 'express';
import { GetRoute } from '../types';
import { getLinksVisitsCount } from '../../services/chords';

const handler = async (_req: Request, res: Response, next: NextFunction) => {
    getLinksVisitsCount((error, result) => {
        if (error) {
            return next(error);
        }

        res.json(result);
    });
};

export const route: GetRoute = {
    method: 'get',
    path: '/chords/getLinksVisitsCount',
    handler
};
