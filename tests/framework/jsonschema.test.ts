import request from 'supertest';
import sinon from 'sinon';
import { ValidationError } from 'express-json-validator-middleware';
import { app } from '../../src/app';
import { th } from '../helpers';

describe('JSON schema validation middleware', () => {
    it('should accept a correct input', async () => {
        await request(app).post('/postRoute').send({ param1: 'pouet' }).expect(200);
    });

    it('should reject an incorrect type', async () => {
        await request(app).post('/postRoute').send({ param1: 1 }).expect(400);
        th.slog.checkLog('middleware', 'Caught error', {
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

    it('should reject a missing parameter - 1', async () => {
        await request(app).post('/postRoute').send({ foo: 'pouet' }).expect(400);
        th.slog.checkLog('middleware', 'Caught error', {
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

    it('should reject a missing parameter - 2', async () => {
        await request(app).post('/postRoute').send().expect(400);
        th.slog.checkLog('middleware', 'Caught error', {
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
