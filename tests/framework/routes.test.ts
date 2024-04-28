import sinon from 'sinon';
import request from 'supertest';
import { app } from '../../src/app';
import { fakeCheckRequiredPermissionsHandler, fakeValidateAccessToken } from '../helpers/auth';

describe('routes', () => {
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
