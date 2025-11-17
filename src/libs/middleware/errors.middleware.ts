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
import { slog } from '../modules/logging/slog.js';

export const errorHandler = async (
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    response.locals.loggableContext?.addData('error', error);
    // This slog shouldn't be needed since we are adding error to the loggable context
    // but it doesn't seem to work properly
    slog.log('app', 'Error caught by middleware', { error, url: request.url });
    slackNotifier.notifySlack({
        error,
        message: `Error on url ${request.url}`
    });

    let status = 500;
    let message = 'Internal Server Error';

    if (error instanceof OutputValidationError) {
        response.status(500).json({ message: 'Failed output validation' });
        status = 500;
        message = 'Failed output validation';
    } else if (
        error instanceof ItemAlreadyExistsError ||
        error instanceof FileOrContentRequiredError ||
        error instanceof EntryAlreadyExistsError ||
        error instanceof ItemNotFoundError ||
        error instanceof DuplicateIngredientError ||
        error instanceof RecipeNotFoundError ||
        error instanceof SensorDoesNotExistError
    ) {
        status = 400;
        message = error.message;
    } else if (
        error instanceof Auth_UnauthorizedError ||
        error instanceof Auth_ForbiddenForUserError ||
        error instanceof Auth_InvalidScopeError
    ) {
        status = 401;
        message = error.message;
    } else if (error instanceof ApiKeyError) {
        status = error.status;
        message = error.message;
    } else if (error instanceof ValidationError) {
        status = 400;
        message = JSON.stringify(error.validationErrors);
    }

    response.status(status).json({ message });
    next();
};
