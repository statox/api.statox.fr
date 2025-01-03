import sinon from 'sinon';
import { NextFunction, Request, Response } from 'express';
import { auth0middleware } from '../../../src/libs/middleware/auth0.middleware.js';
import { TestHelper } from '../TestHelper.js';
import { th } from '../index.js';

// exported for framework tests
export let fakeValidateAccessToken: sinon.SinonStub;
export let fakeCheckRequiredPermissionsHandler: sinon.SinonStub;
let fakeCheckRequiredPermissions: sinon.SinonStub;

const setupFakeAuth = async () => {
    fakeValidateAccessToken = sinon
        .stub(auth0middleware, 'validateAccessToken')
        .callsFake((_req: Request, _res: Response, next: NextFunction) => {
            // TODO: Find a way to actually check the token
            next();
        });

    fakeCheckRequiredPermissionsHandler = sinon
        .stub()
        .callsFake((_req: Request, _res: Response, next: NextFunction) => {
            // TODO: Find a way to actually check the token's permissions
            next();
        });

    fakeCheckRequiredPermissions = sinon
        .stub(auth0middleware, 'checkRequiredPermissions')
        .returns(fakeCheckRequiredPermissionsHandler);
};

const restoreFakeAuth = async () => {
    fakeValidateAccessToken.restore();
    fakeCheckRequiredPermissions.restore();
};

const createApiKeys = async () => {
    await th.mysql.fixture({
        ApiKeys: [
            {
                id: 1,
                accessKey: 'fakeaccesskeyfortests',
                description: 'A fake access key, for tests'
            }
        ]
    });
};

export const testHelper_Auth = new TestHelper({
    name: 'Auth',
    hooks: {
        beforeAll: setupFakeAuth,
        beforeEach: createApiKeys,
        afterAll: restoreFakeAuth
    }
});
