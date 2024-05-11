import type { Request, Response } from 'express';
import { checkChordsUrl } from '../../services/chords/index.js';
import { GetRoute } from '../types.js';

const handler = async (_req: Request, res: Response) => {
    const checkResults = await checkChordsUrl();
    res.json(checkResults);
};

export const route: GetRoute = {
    method: 'get',
    path: '/chords/checkLinks',
    handler
};
