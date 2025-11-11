import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'express-json-validator-middleware';
import { slackNotifier } from '../modules/notifier/slack.js';
import { EntryAlreadyExistsError } from '../modules/webWatcher/index.js';
import { ApiKeyError } from './authIOT.middleware.js';
import {
    FileOrContentRequiredError,
    ItemAlreadyExistsError,
    ItemNotFoundError
} from '../routes/errors.js';
import { OutputValidationError } from './apiPipeline.middleware.js';
import { DuplicateIngredientError, RecipeNotFoundError } from '../modules/cookbook/index.js';
import { SensorDoesNotExistError } from '../modules/homeTracker/services/sensorMetaData.js';
import {
    Auth_ForbiddenForUserError,
    Auth_InvalidScopeError,
    Auth_UnauthorizedError
} from '../modules/auth/index.js';

export const errorHandler = async (
    error: Error,
    _request: Request,
    response: Response,
    next: NextFunction
) => {
    response.locals.loggableContext?.addData('error', error);
    slackNotifier.notifySlack({ error, directMention: true });

    if (error instanceof OutputValidationError) {
        response.status(500).json({ message: 'Failed output validation' });
        return next();
    }

    if (
        error instanceof ItemAlreadyExistsError ||
        error instanceof FileOrContentRequiredError ||
        error instanceof EntryAlreadyExistsError ||
        error instanceof ItemNotFoundError ||
        error instanceof DuplicateIngredientError ||
        error instanceof RecipeNotFoundError ||
        error instanceof SensorDoesNotExistError
    ) {
        response.status(400).json({ message: error.message });
        return next();
    }

    if (
        error instanceof Auth_UnauthorizedError ||
        error instanceof Auth_ForbiddenForUserError ||
        error instanceof Auth_InvalidScopeError
    ) {
        response.status(401).json({ message: error.message });
        return next();
    }

    if (error instanceof ApiKeyError) {
        response.status(error.status).json({ message: error.message });
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
