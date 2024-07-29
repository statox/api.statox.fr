import sinon from 'sinon';
import { NextFunction, Request, Response } from 'express';
import * as auth from '../../../src/libs/middleware/auth0.middleware';
import { mysqlFixture } from '../mysql';

// exported for framework tests
export let fakeValidateAccessToken: sinon.SinonStub;
export let fakeCheckRequiredPermissionsHandler: sinon.SinonStub;
let fakeCheckRequiredPermissions: sinon.SinonStub;

export const setupFakeAuth = () => {
    fakeValidateAccessToken = sinon
        .stub(auth, 'validateAccessToken')
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
        .stub(auth, 'checkRequiredPermissions')
        .returns(fakeCheckRequiredPermissionsHandler);
};

export const restoreFakeAuth = () => {
    fakeValidateAccessToken.restore();
    fakeCheckRequiredPermissions.restore();
};

export const createApiKeys = async () => {
    await mysqlFixture({
        ApiKeys: [
            {
                id: 1,
                accessKey: 'fakeaccesskeyfortests',
                description: 'A fake access key, for tests'
            }
        ]
    });
};
