import sinon from 'sinon';
import request from 'supertest';
import { app } from '../../src/app';
import { fakeCheckRequiredPermissionsHandler, fakeValidateAccessToken } from '../helpers/auth';
import { slogCheckLog } from '../helpers/slog';
import { ValidationError } from 'express-json-validator-middleware';

describe('routes', () => {
    it('should use the correct verbs', async () => {
        await request(app).get('/getRoute').expect(200);
        await request(app).post('/getRoute').expect(404);
        await request(app).get('/postRoute').expect(404);
    });

    it('Should return 404 when route doesnt exist', async () => {
        await request(app).get('/doesNotExists').expect(404);
    });

    describe('should validate schema on post routes', async () => {
        it('should not throw error for correct input', async () => {
            await request(app).post('/postRoute').send({ param1: 'pouet' }).expect(200);
        });
        it('should find incorrect type', async () => {
            await request(app).post('/postRoute').send({ param1: 1 }).expect(400);
            slogCheckLog('app', 'Caught error', {
                error: sinon.match((error) => {
                    // Cant use assert in a matcher because it is called for several logs even ones without the error
                    const isValidationError = error instanceof ValidationError;
                    const bodyError = error?.validationErrors?.body[0];
                    const isCorrectMessage = bodyError?.message === 'must be string';
                    const isCorrectPath = bodyError?.instancePath === '/param1';

                    return isValidationError && isCorrectMessage && isCorrectPath;
                })
            });
        });
        it('should find missing params - 1', async () => {
            await request(app).post('/postRoute').send({ foo: 'pouet' }).expect(400);
            slogCheckLog('app', 'Caught error', {
                error: sinon.match((error) => {
                    // Cant use assert in a matcher because it is called for several logs even ones without the error
                    const isValidationError = error instanceof ValidationError;
                    const bodyError = error?.validationErrors?.body[0];
                    const isCorrectMessage =
                        bodyError?.message === "must have required property 'param1'";

                    return isValidationError && isCorrectMessage;
                })
            });
        });
        it('should find missing params - 2', async () => {
            await request(app).post('/postRoute').send().expect(400);
            slogCheckLog('app', 'Caught error', {
                error: sinon.match((error) => {
                    // Cant use assert in a matcher because it is called for several logs even ones without the error
                    const isValidationError = error instanceof ValidationError;
                    const bodyError = error?.validationErrors?.body[0];
                    const isCorrectMessage =
                        bodyError?.message === "must have required property 'param1'";

                    return isValidationError && isCorrectMessage;
                })
            });
        });
    });

    describe('should enforce the authentication specified in the route configuration', async () => {
        it('- authentication none', async () => {
            await request(app).get('/getRoute');
            sinon.assert.notCalled(fakeValidateAccessToken);
            sinon.assert.notCalled(fakeCheckRequiredPermissionsHandler);
        });
        it('- authentication user', async () => {
            await request(app).get('/userAuthenticatedGetRoute');
            sinon.assert.calledOnce(fakeValidateAccessToken);
            sinon.assert.calledOnce(fakeCheckRequiredPermissionsHandler);
        });
    });
});
