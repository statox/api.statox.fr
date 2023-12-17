import express from 'express';

export type Route = {
    method?: 'get' | 'post';
    path: string;
    handler: (req: express.Request, res: express.Response, next?: express.NextFunction) => void;
};
