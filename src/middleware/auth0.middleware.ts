import { NextFunction, Request, Response } from 'express';
import { auth, claimCheck, InsufficientScopeError } from 'express-oauth2-jwt-bearer';
import { isProd } from '../services/env-helpers/env';
import { slog } from '../services/logging';

const localAuth0 = {
    auth0Audience: 'http://localhost:3000',
    auth0Domain: 'statox.eu.auth0.com'
};

const prodAuth0 = {
    auth0Audience: 'https://api.statox.fr',
    auth0Domain: 'statox.eu.auth0.com'
};

const config = isProd ? prodAuth0 : localAuth0;

export const validateAccessToken = auth({
    issuerBaseURL: `https://${config.auth0Domain}`,
    audience: config.auth0Audience
});

export const checkRequiredPermissions = (requiredPermissions: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const permissionCheck = claimCheck((payload) => {
            const permissions = payload.permissions as string[];

            const hasPermissions = requiredPermissions.every((requiredPermission) =>
                permissions.includes(requiredPermission)
            );

            if (!hasPermissions) {
                slog.log({ message: 'Failed authentication' });
                throw new InsufficientScopeError();
            }

            return hasPermissions;
        });

        permissionCheck(req, res, next);
    };
};
