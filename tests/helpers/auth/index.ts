import sinon from 'sinon';
import { NextFunction, Request, Response } from 'express';
import * as auth from '../../../src/middleware/auth0.middleware';

let fakeValidateAccessToken: sinon.SinonStub;
let fakeCheckRequiredPermissions: sinon.SinonStub;

export const setupFakeAuth = () => {
    fakeValidateAccessToken = sinon
        .stub(auth, 'validateAccessToken')
        .value((_req: Request, _res: Response, next: NextFunction) => {
            next();
        });

    fakeCheckRequiredPermissions = sinon
        .stub(auth, 'checkRequiredPermissions')
        .returns((_req: Request, _res: Response, next: NextFunction) => {
            next();
        });
};

export const restoreFakeAuth = () => {
    fakeValidateAccessToken.restore();
    fakeCheckRequiredPermissions.restore();
};
