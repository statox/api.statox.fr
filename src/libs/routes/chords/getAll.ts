import type { NextFunction, Request, Response } from 'express';
import { getAllChords } from '../../modules/chords';
import { GetRoute } from '../types';

const handler = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const chords = await getAllChords();
        res.json(chords);
    } catch (error) {
        next(error);
    }
};

export const route: GetRoute = {
    method: 'get',
    path: '/chords/getAll',
    handler,
    authentication: 'none'
};
