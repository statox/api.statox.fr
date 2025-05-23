import request from 'supertest';
import sinon from 'sinon';
import { app } from '../../src/app.js';
import {
    fakeCheckRequiredPermissionsHandler,
    fakeValidateAccessToken
} from '../helpers/auth/index.js';
import { th } from '../helpers/index.js';

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
            th.slog.checkLog('auth', 'authIOT rejected', {
                livemode: true,
                error: {
                    statusCode: 401,
                    status: 401,
                    code: 'unauthorized'
                }
            });
        });

        it('should reject malformed Authorization header', async () => {
            await request(app)
                .get('/apiiotAuthenticatedGetRoute')
                .set('Authorization', 'InvalidScheme foobar')
                .expect(401);

            th.slog.checkLog('auth', 'authIOT rejected', {
                livemode: true,
                error: {
                    statusCode: 401,
                    status: 401,
                    code: 'unauthorized'
                }
            });
        });

        it('should reject unknown API key', async () => {
            await request(app)
                .get('/apiiotAuthenticatedGetRoute')
                .set('Authorization', 'Bearer unknownkey')
                .expect(403);

            th.slog.checkLog('auth', 'authIOT rejected', {
                livemode: true,
                error: {
                    statusCode: 403,
                    status: 403,
                    code: 'forbidden'
                }
            });
        });

        it('should accept valid api key', async () => {
            await request(app)
                .get('/apiiotAuthenticatedGetRoute')
                .set('Authorization', 'Bearer fakeaccesskeyfortests')
                .expect(200);
        });
    });
});
