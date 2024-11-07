import { NextFunction, Request, Response } from 'express';
import { isProd } from '../config/env';
import { Route } from '../routes/types';
import { isAjvError, validateAgainstJsonSchema } from '../modules/ajv';
import { slog } from '../modules/logging';

export class OutputValidationError extends Error {
    constructor() {
        super('OUTPUT_VALIDATION_FAILED');
    }
}

export const routeHandler = (route: Route) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const routeResult = await route.handler(req);

            // TODO Once outputSchema is required in type Route, remove condition
            // Only do output validation if we are not in prod
            if (!isProd && route.outputSchema) {
                validateAgainstJsonSchema(routeResult, route.outputSchema);
            }

            // TODO Find a better way to handle these specific cases
            if (route.path === '/clipboard/view') {
                return res.render('clipboard', { entries: routeResult });
            }
            if (route.path === '/r/:linkId') {
                return res.redirect(routeResult as string);
            }
            res.send(routeResult || {});
        } catch (error) {
            if (isAjvError(error)) {
                // @ts-expect-error This won't happen in prod
                slog.log('middleware', 'Failed output validation', { error });
                return next(new OutputValidationError());
            }
            next(error);
        }
    };
};
