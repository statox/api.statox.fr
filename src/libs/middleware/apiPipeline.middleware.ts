import { NextFunction, Request, Response } from 'express';
import { isDebug, isProd } from '../config/env.js';
import { Route } from '../routes/types.js';
import { isAjvError, validateAgainstJsonSchema } from '../modules/ajv/index.js';
import { slog } from '../modules/logging/index.js';
import { AllowedSchema } from 'express-json-validator-middleware';

export class OutputValidationError extends Error {
    constructor() {
        super('OUTPUT_VALIDATION_FAILED');
    }
}

export const apiPipeline = (route: Route<unknown, unknown>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            let input = null;
            if (route.method === 'post') {
                input = req.body || {};
            } else if (route.method === 'get') {
                // Note: For now the params are not validated against a json schema
                // (mainly because we only have one endpoint using url params and I don't want to add more)
                // but we rely on express's Route Parameters so for now that's good enough.
                // Add schema validation wouldn't be hard but not sure it would be useful.
                input = req.params || {};
            }

            const routeResult =
                (await route.handler({ input, loggableContext: res.locals.loggableContext })) || {};

            // Only do output validation if we are not in prod
            if (!isProd) {
                validateAgainstJsonSchema(
                    routeResult,
                    route.outputSchema as unknown as AllowedSchema
                );
            }

            // Allow routes to respond with something else that res.send()
            // (e.g. do a redirect, render html, ...)
            if (route.customResponseHandler) {
                return route.customResponseHandler(routeResult, res);
            }
            res.send(routeResult);
            next();
        } catch (error) {
            if (isAjvError(error)) {
                // @ts-expect-error This won't happen in prod
                slog.log('middleware', 'Failed output validation', { error });
                if (!isProd || isDebug) {
                    slog.log('middleware', 'Failed output validation details', {
                        dataStr: JSON.stringify(error)
                    });
                }
                return next(new OutputValidationError());
            }
            next(error);
        }
    };
};
