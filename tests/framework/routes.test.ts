import sinon from 'sinon';
import { Request, Response } from 'express';
import request from 'supertest';
import { app, initApp } from '../../src/app';
import { GetRoute, PostRoute } from '../../src/routes/types';
import * as routes from '../../src/routes';
import { fakeCheckRequiredPermissionsHandler, fakeValidateAccessToken } from '../helpers/auth';

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

describe('routes', () => {
    let routesStub: sinon.SinonStub;

    before(() => {
        routesStub = sinon.stub(routes, 'routes').value(testRoutes);
        initApp();
    });

    after(() => {
        routesStub.restore();
    });

    it('should use the correct verbs', async () => {
        await request(app).get('/getRoute').expect(200);
        await request(app).post('/getRoute').expect(404);
        await request(app).get('/postRoute').expect(404);
    });

    it('Should return 404 when route doesnt exist', async () => {
        await request(app).get('/doesNotExists').expect(404);
    });

    it('should validate schema on post routes', async () => {
        await request(app).post('/postRoute').send({ param1: 'pouet' }).expect(200);
        await request(app).post('/postRoute').send({ param1: 1 }).expect(400);
        await request(app).post('/postRoute').send({ foo: 'pouet' }).expect(400);
        await request(app).post('/postRoute').send().expect(400);
    });

    it('should call the auth functions only on protected routes', async () => {
        await request(app).get('/getRoute');
        sinon.assert.notCalled(fakeValidateAccessToken);
        sinon.assert.notCalled(fakeCheckRequiredPermissionsHandler);
        await request(app).get('/protectedGetRoute');
        sinon.assert.calledOnce(fakeValidateAccessToken);
        sinon.assert.calledOnce(fakeCheckRequiredPermissionsHandler);
    });
});
