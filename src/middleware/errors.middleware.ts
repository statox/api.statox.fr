import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'express-json-validator-middleware';
import {
    InvalidTokenError,
    UnauthorizedError,
    InsufficientScopeError
} from 'express-oauth2-jwt-bearer';
import { slog } from '../services/logging';
import { notifySlack } from '../services/notifier/slack';
import { EntryAlreadyExistsError } from '../services/webWatcher';

export const errorHandler = async (
    error: Error,
    _request: Request,
    response: Response,
    next: NextFunction
) => {
    slog.log('app', 'Caught error', { error });
    notifySlack({ error, directMention: true });

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
        response.status(400).send(error.validationErrors);
        return next();
    }

    if (error instanceof EntryAlreadyExistsError) {
        response.status(400).json({ message: error.message });
        return next();
    }

    const status = 500;
    const message = 'Internal Server Error';
    response.status(status).json({ message });
    next();
};
