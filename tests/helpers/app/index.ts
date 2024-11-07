import sinon from 'sinon';
import { TestHelper } from '../TestHelper';
import * as routes from '../../../src/libs/routes';
import { GetRoute, PostRoute } from '../../../src/libs/routes/types';
import { initApp } from '../../../src/app';

const getRoute: GetRoute = {
    method: 'get',
    authentication: 'none',
    path: '/getroute',
    handler: async () => {}
};

const getRouteWithResult: GetRoute = {
    method: 'get',
    authentication: 'none',
    path: '/getroutewithresult',
    handler: async () => {
        return { foo: 1 };
    }
};

const getRouteThatThrows: GetRoute = {
    method: 'get',
    authentication: 'none',
    path: '/getroutethatthrows',
    handler: async () => {
        throw new Error('The route threw');
    }
};

const userAuthenticatedGetRoute: GetRoute = {
    method: 'get',
    authentication: 'user',
    path: '/userAuthenticatedGetRoute',
    handler: async () => {}
};

const apiiotAuthenticatedGetRoute: GetRoute = {
    method: 'get',
    authentication: 'apikey-iot',
    path: '/apiiotAuthenticatedGetRoute',
    handler: async () => {}
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
    handler: async () => {}
};

const testRoutes = [
    getRoute,
    getRouteWithResult,
    getRouteThatThrows,
    postRoute,
    userAuthenticatedGetRoute,
    apiiotAuthenticatedGetRoute
];

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
