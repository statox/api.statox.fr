import express from 'express';
import { AllowedSchema } from 'express-json-validator-middleware';

type BaseRoute = {
    path: string;
    handler: (req: express.Request, res: express.Response, next?: express.NextFunction) => void;
    protected?: true;
};

export type GetRoute = BaseRoute & {
    method: 'get';
};

export type PostRoute = BaseRoute & {
    method: 'post';
    inputSchema: AllowedSchema;
};

export type Route = GetRoute | PostRoute;
