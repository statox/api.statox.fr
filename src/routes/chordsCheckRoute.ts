import type { Request, Response } from 'express';
import { checkChordsUrl } from '../chordsUrlsChecker';

const chordsCheckRoute = async (_req: Request, res: Response) => {
    const checkResults = await checkChordsUrl();
    res.send(checkResults);
};

export const route = {
    path: '/checkChordsUrl',
    handler: chordsCheckRoute
};
