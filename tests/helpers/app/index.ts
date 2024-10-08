import sinon from 'sinon';
import { TestHelper } from '../TestHelper';
import { Request, Response } from 'express';
import * as routes from '../../../src/libs/routes';
import { GetRoute, PostRoute } from '../../../src/libs/routes/types';
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

const apiiotAuthenticatedGetRoute: GetRoute = {
    method: 'get',
    authentication: 'apikey-iot',
    path: '/apiiotAuthenticatedGetRoute',
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

const testRoutes = [getRoute, postRoute, userAuthenticatedGetRoute, apiiotAuthenticatedGetRoute];

let routesStub: sinon.SinonStub;

const setupAppStub = async () => {
    routesStub = sinon.stub(routes, 'routes').value(testRoutes);
    initApp();
};

const restoreAppStub = async () => {
    routesStub.restore();
};

export const testHelper_App = new TestHelper({
    name: 'App',
    hooks: {
        beforeAll: setupAppStub,
        afterAll: restoreAppStub
    }
});
