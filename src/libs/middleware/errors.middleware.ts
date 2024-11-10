import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'express-json-validator-middleware';
import {
    InvalidTokenError,
    UnauthorizedError,
    InsufficientScopeError
} from 'express-oauth2-jwt-bearer';
import { slog } from '../modules/logging';
import { notifySlack } from '../modules/notifier/slack';
import { EntryAlreadyExistsError } from '../modules/webWatcher';
import { ApiKeyError } from './authIOT.middleware';
import {
    FileOrContentRequiredError,
    ItemAlreadyExistsError,
    ItemNotFoundError
} from '../routes/errors';
import { OutputValidationError } from './apiPipeline.middleware';

export const errorHandler = async (
    error: Error,
    _request: Request,
    response: Response,
    next: NextFunction
) => {
    slog.log('middleware', 'Caught error', { error });
    notifySlack({ error, directMention: true });

    if (error instanceof OutputValidationError) {
        response.status(500).json({ message: 'Failed output validation' });
        return next();
    }

    if (
        error instanceof ItemAlreadyExistsError ||
        error instanceof FileOrContentRequiredError ||
        error instanceof EntryAlreadyExistsError ||
        error instanceof ItemNotFoundError
    ) {
        response.status(400).json({ message: error.message });
        return next();
    }

    if (error instanceof ApiKeyError) {
        response.status(error.status).json({ message: error.message });
        return next();
    }

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

    const status = 500;
    const message = 'Internal Server Error';
    response.status(status).json({ message });
    next();
};
