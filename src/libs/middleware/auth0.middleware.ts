import { NextFunction, Request, Response } from 'express';
import { auth, claimCheck, InsufficientScopeError } from 'express-oauth2-jwt-bearer';
import { config } from '../../packages/config/index.js';
import { slog } from '../modules/logging/index.js';

const localAuth0 = {
    auth0Audience: 'http://localhost:3000',
    auth0Domain: 'statox.eu.auth0.com'
};

const prodAuth0 = {
    auth0Audience: 'https://api.statox.fr',
    auth0Domain: 'statox.eu.auth0.com'
};

const auth0config = config.env.isProd ? prodAuth0 : localAuth0;

const validateAccessToken = auth({
    issuerBaseURL: `https://${auth0config.auth0Domain}`,
    audience: auth0config.auth0Audience
});

const checkRequiredPermissions = (requiredPermissions: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const permissionCheck = claimCheck((payload) => {
            const permissions = payload.permissions as string[];

            const hasPermissions = requiredPermissions.every((requiredPermission) =>
                permissions.includes(requiredPermission)
            );

            if (!hasPermissions) {
                const error = new InsufficientScopeError();
                slog.log('middleware', 'Failed authentication', { error });
                throw error;
            }

            return hasPermissions;
        });

        permissionCheck(req, res, next);
    };
};

export const auth0middleware = {
    validateAccessToken,
    checkRequiredPermissions
};
