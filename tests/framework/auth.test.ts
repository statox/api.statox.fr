import sinon from 'sinon';
import request from 'supertest';
import { app } from '../../src/app';
import { fakeCheckRequiredPermissionsHandler, fakeValidateAccessToken } from '../helpers/auth';

describe('authentication middlewares', () => {
    describe('auth none', () => {
        it('should not call authentication functions', async () => {
            await request(app).get('/getRoute');
            sinon.assert.notCalled(fakeValidateAccessToken);
            sinon.assert.notCalled(fakeCheckRequiredPermissionsHandler);
        });
    });
    describe('auth user', () => {
        it('should call the auth0 authentication functions', async () => {
            await request(app).get('/userAuthenticatedGetRoute');
            sinon.assert.calledOnce(fakeValidateAccessToken);
            sinon.assert.calledOnce(fakeCheckRequiredPermissionsHandler);
        });
    });
    describe('auth apikey for iot', () => {
        it('should reject missing Authorization header', async () => {
            await request(app).get('/apiiotAuthenticatedGetRoute').expect(401);
        });

        it('should reject malformed Authorization header', async () => {
            await request(app)
                .get('/apiiotAuthenticatedGetRoute')
                .set('Authorization', 'InvalidScheme foobar')
                .expect(401);
        });

        it('should accept valid api key', async () => {
            await request(app)
                .get('/apiiotAuthenticatedGetRoute')
                .set('Authorization', 'Bearer fakeaccesskeyfortests')
                .expect(200);
        });
    });
});