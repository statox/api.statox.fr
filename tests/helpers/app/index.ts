import sinon from 'sinon';
import { Request, Response } from 'express';
import * as routes from '../../../src/routes/index.js';
import { GetRoute, PostRoute } from '../../../src/routes/types.js';
import { initApp } from '../../../src/app.js';

const getRoute: GetRoute = {
    method: 'get',
    path: '/getroute',
    handler: (_req: Request, res: Response) => res.end()
};

const protectedGetRoute: GetRoute = {
    method: 'get',
    protected: true,
    path: '/protectedGetRoute',
    handler: (_req: Request, res: Response) => res.end()
};

const postRoute: PostRoute = {
    method: 'post',
    path: '/postroute',
    inputSchema: {
        type: 'object',
        required: ['param1'],
        additionalProperties: false,
        properties: {
            param1: {
                type: 'string'
            }
        }
    },
    handler: (_req: Request, res: Response) => res.end()
};

const testRoutes = [getRoute, postRoute, protectedGetRoute];

let routesStub: sinon.SinonStub;

export const setupAppStub = () => {
    routesStub = sinon.stub(routes, 'routes').value(testRoutes);
    initApp();
};

export const restoreAppStub = () => {
    routesStub.restore();
};
