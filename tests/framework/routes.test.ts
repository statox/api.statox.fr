import sinon from 'sinon';
import request from 'supertest';
import { app } from '../../src/app.js';
import {
    fakeCheckRequiredPermissionsHandler,
    fakeValidateAccessToken
} from '../helpers/auth/index.js';
import { slogCheckLog } from '../helpers/slog/index.js';
import { ValidationError } from 'express-json-validator-middleware';
import { assert } from 'chai';

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
            slogCheckLog({
                error: sinon.match((error) => {
                    // Cant use assert in a matcher because it is called for several logs even ones without the error
                    const isValidationError = error instanceof ValidationError;
                    const bodyError = error?.validationErrors?.body[0];
                    const isCorrectMessage = bodyError?.message === 'must be string';
                    const isCorrectPath = bodyError?.instancePath === '/param1';

                    return isValidationError && isCorrectMessage && isCorrectPath;
                }),
                logToSlack: true
            });
        });
        it('should find missing params - 1', async () => {
            await request(app).post('/postRoute').send({ foo: 'pouet' }).expect(400);
            slogCheckLog({
                error: sinon.match((error) => {
                    // Cant use assert in a matcher because it is called for several logs even ones without the error
                    const isValidationError = error instanceof ValidationError;
                    const bodyError = error?.validationErrors?.body[0];
                    const isCorrectMessage =
                        bodyError?.message === "must have required property 'param1'";

                    return isValidationError && isCorrectMessage;
                }),
                logToSlack: true
            });
        });
        it('should find missing params - 2', async () => {
            await request(app).post('/postRoute').send().expect(400);
            slogCheckLog({
                error: sinon.match((error) => {
                    // Cant use assert in a matcher because it is called for several logs even ones without the error
                    const isValidationError = error instanceof ValidationError;
                    const bodyError = error?.validationErrors?.body[0];
                    const isCorrectMessage =
                        bodyError?.message === "must have required property 'param1'";

                    return isValidationError && isCorrectMessage;
                }),
                logToSlack: true
            });
        });
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
