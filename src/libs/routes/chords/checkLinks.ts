import type { NextFunction, Request, Response } from 'express';
import { checkChordsUrl } from '../../modules/chords';
import { GetRoute } from '../types';

const handler = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const checkResults = await checkChordsUrl();
        res.send(checkResults);
    } catch (error) {
        next(error);
    }
};

export const route: GetRoute = {
    method: 'get',
    path: '/chords/checkLinks',
    handler,
    authentication: 'none'
};
