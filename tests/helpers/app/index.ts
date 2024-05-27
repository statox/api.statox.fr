import sinon from 'sinon';
import { Request, Response } from 'express';
import * as routes from '../../../src/routes';
import { GetRoute, PostRoute } from '../../../src/routes/types';
import { initApp } from '../../../src/app';

const getRoute: GetRoute = {
    method: 'get',
    authentication: 'none',
    path: '/getroute',
    handler: (_req: Request, res: Response) => res.end()
};

const userAuthenticatedGetRoute: GetRoute = {
    method: 'get',
    authentication: 'user',
    path: '/userAuthenticatedGetRoute',
    handler: (_req: Request, res: Response) => res.end()
};

const postRoute: PostRoute = {
    method: 'post',
    authentication: 'none',
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

const testRoutes = [getRoute, postRoute, userAuthenticatedGetRoute];

let routesStub: sinon.SinonStub;

export const setupAppStub = () => {
    routesStub = sinon.stub(routes, 'routes').value(testRoutes);
    initApp();
};

export const restoreAppStub = () => {
    routesStub.restore();
};
