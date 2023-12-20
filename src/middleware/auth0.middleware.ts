import { NextFunction, Request, Response } from 'express';
import { auth, claimCheck, InsufficientScopeError } from 'express-oauth2-jwt-bearer';

const auth0Audience = 'http://localhost:3000';
const auth0Domain = 'statox.eu.auth0.com';

export const validateAccessToken = auth({
    issuerBaseURL: `https://${auth0Domain}`,
    audience: auth0Audience
});

export const checkRequiredPermissions = (requiredPermissions: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const permissionCheck = claimCheck((payload) => {
            const permissions = payload.permissions as string[];

            console.log({ permissions });
            const hasPermissions = requiredPermissions.every((requiredPermission) =>
                permissions.includes(requiredPermission)
            );

            if (!hasPermissions) {
                throw new InsufficientScopeError();
            }

            return hasPermissions;
        });

        permissionCheck(req, res, next);
    };
};
