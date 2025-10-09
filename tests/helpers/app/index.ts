import { FromSchema } from 'json-schema-to-ts';
import sinon from 'sinon';
import { TestHelper } from '../TestHelper.js';
import { routes, routesWS } from '../../../src/libs/routes/index.js';
import {
    EmptyInput,
    EmptyOutput,
    GetRoute,
    PostRoute,
    RouteWS
} from '../../../src/libs/routes/types.js';
import { initApp } from '../../../src/app.js';
import { emptyObjectSchema } from '../../../src/libs/routes/helpers.js';

const getRoute: GetRoute<EmptyInput, EmptyOutput> = {
    method: 'get',
    authentication: 'none',
    path: '/getroute',
    handler: async () => {},
    outputSchema: emptyObjectSchema
};

const getRouteWithResultOutputSchema = {
    type: 'object',
    properties: { foo: { type: 'number' } },
    required: ['foo'],
    additionalProperties: false
} as const;

const getRouteWithResult: GetRoute<
    EmptyInput,
    FromSchema<typeof getRouteWithResultOutputSchema>
> = {
    method: 'get',
    authentication: 'none',
    path: '/getroutewithresult',
    handler: async () => {
        return { foo: 1 };
    },
    outputSchema: getRouteWithResultOutputSchema
};

const getRouteWithLoggedContext: GetRoute<EmptyInput, EmptyOutput> = {
    method: 'get',
    authentication: 'none',
    path: '/getroutewithloggedcontext',
    handler: async (params) => {
        params.loggableContext.addData('livemode', true);
        params.loggableContext.addData('status', 'some data');
    },
    outputSchema: emptyObjectSchema
};

const getRouteWithCustomOutputHandler: GetRoute<EmptyInput, EmptyOutput> = {
    method: 'get',
    authentication: 'none',
    path: '/getroutewithcustomoutputhandler',
    handler: async () => {},
    outputSchema: emptyObjectSchema,
    customResponseHandler: (_: EmptyOutput, res) => {
        res.set('Foo', 'bar');
        res.sendStatus(599);
    }
};

const getRouteThatThrows: GetRoute<EmptyInput, EmptyOutput> = {
    method: 'get',
    authentication: 'none',
    path: '/getroutethatthrows',
    handler: async () => {
        throw new Error('The route threw');
    },
    outputSchema: emptyObjectSchema
};

const getRouteWithInvalidOutputOutputSchema = {
    type: 'object',
    properties: {
        bar: {
            type: 'string'
        }
    },
    additionalProperties: false
} as const;
const getRouteWithInvalidOutput: GetRoute<
    EmptyInput,
    FromSchema<typeof getRouteWithInvalidOutputOutputSchema>
> = {
    method: 'get',
    authentication: 'none',
    path: '/getroutewithinvalidoutput',
    handler: async () => {
        return { foo: 1 };
    },
    outputSchema: getRouteWithInvalidOutputOutputSchema
};

const userAuthenticatedGetRoute: GetRoute<EmptyInput, EmptyOutput> = {
    method: 'get',
    authentication: 'user',
    path: '/userAuthenticatedGetRoute',
    handler: async () => {},
    outputSchema: emptyObjectSchema
};

const apiiotAuthenticatedGetRoute: GetRoute<EmptyInput, EmptyOutput> = {
    method: 'get',
    authentication: 'apikey-iot',
    path: '/apiiotAuthenticatedGetRoute',
    handler: async () => {},
    outputSchema: emptyObjectSchema
};

const postRouteInputSchema = {
    type: 'object',
    required: ['param1'],
    additionalProperties: false,
    properties: {
        param1: {
            type: 'string'
        }
    }
} as const;

const postRoute: PostRoute<FromSchema<typeof postRouteInputSchema>, EmptyOutput> = {
    method: 'post',
    authentication: 'none',
    path: '/postroute',
    inputSchema: postRouteInputSchema,
    handler: async () => {},
    outputSchema: emptyObjectSchema
};

const testRoutes = [
    getRoute,
    getRouteWithResult,
    getRouteWithCustomOutputHandler,
    getRouteWithLoggedContext,
    getRouteThatThrows,
    getRouteWithInvalidOutput,
    postRoute,
    userAuthenticatedGetRoute,
    apiiotAuthenticatedGetRoute
];

let routesStub: sinon.SinonStub;

const validRouteWS: RouteWS = {
    path: '/valid',
    onConnection(ws) {
        ws.send('connected');
        ws.on('message', (message: string) => {
            ws.send('Received ' + message);
        });
    }
};
const testRoutesWS = [validRouteWS];

let routesWSStub: sinon.SinonStub;

const setupAppStub = async () => {
    routesStub = sinon.stub(routes, 'list').value(testRoutes);
    routesWSStub = sinon.stub(routesWS, 'list').value(testRoutesWS);
    initApp();
};

const restoreAppStub = async () => {
    routesStub.restore();
    routesWSStub.restore();
};

export const testHelper_App = new TestHelper({
    name: 'App',
    hooks: {
        beforeAll: setupAppStub,
        afterAll: restoreAppStub
    }
});
