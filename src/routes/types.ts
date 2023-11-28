import express from 'express';

export type Route = {
    path: string;
    handler: (req: express.Request, res: express.Response, next?: express.NextFunction) => void;
};
