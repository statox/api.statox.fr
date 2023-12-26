import type { Request, Response } from 'express';
import { checkChordsUrl } from '../../services/chordsUrlsChecker';
import { GetRoute } from '../types';

const handler = async (_req: Request, res: Response) => {
    const checkResults = await checkChordsUrl();
    res.send(checkResults);
};

export const route: GetRoute = {
    method: 'get',
    path: '/chords/checkLinks',
    handler
};
