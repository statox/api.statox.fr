import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'express-json-validator-middleware';
import {
    InvalidTokenError,
    UnauthorizedError,
    InsufficientScopeError
} from 'express-oauth2-jwt-bearer';
import { logErrorToSlack } from '../services/logging/slack';

export const errorHandler = async (
    error: unknown,
    _request: Request,
    response: Response,
    next: NextFunction
) => {
    await logErrorToSlack(error as Error);

    if (error instanceof InsufficientScopeError) {
        const message = 'Permission denied';
        response.status(error.status).json({ message });
        return next();
    }

    if (error instanceof InvalidTokenError) {
        const message = 'Bad credentials';
        response.status(error.status).json({ message });
        return next();
    }

    if (error instanceof UnauthorizedError) {
        const message = 'Requires authentication';
        response.status(error.status).json({ message });
        return next();
    }

    if (error instanceof ValidationError) {
        console.log(JSON.stringify(error));
        response.status(400).send(error.validationErrors);
        return next();
    }

    console.log(error);
    const status = 500;
    const message = 'Internal Server Error';
    response.status(status).json({ message });
    next();
};
