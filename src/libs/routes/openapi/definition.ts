import { Response } from 'express';
import { EmptyInput, EmptyOutput, GetRoute } from '../types.js';
import { emptyObjectSchema } from '../helpers.js';

/**
 * Expose the openapi.json definition file for the currently served API.
 * This is a bad idea, the CI should be responsible for creating the file
 * for now the file is created in initApp() and then served here
 */
const handler = async () => {};

const customResponseHandler = (_output: unknown, res: Response) => {
    return res.render('openapi_json');
};

export const route: GetRoute<EmptyInput, EmptyOutput> = {
    method: 'get',
    path: '/openapi/definition.json',
    handler,
    authentication: 'none',
    outputSchema: emptyObjectSchema,
    customResponseHandler
};
