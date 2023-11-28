import type { Request, Response } from 'express';

const getRemoteTime = (_req: Request, res: Response) => {
    const o = { time: Date.now() };
    res.send(o);
};

export const route = {
    path: '/',
    handler: getRemoteTime
};
