import express from 'express';
import { AllowedSchema } from 'express-json-validator-middleware';

export type RouteHandler = ((req: express.Request) => Promise<unknown>) | (() => Promise<unknown>);

type BaseRoute = {
    path: string;
    handler: RouteHandler;
    authentication: 'none' | 'user' | 'apikey-iot';
    outputSchema: AllowedSchema;
};

export type GetRoute = BaseRoute & {
    method: 'get';
};

export type PostRoute = BaseRoute & {
    method: 'post';
    inputSchema: AllowedSchema;
};

export type Route = GetRoute | PostRoute;
