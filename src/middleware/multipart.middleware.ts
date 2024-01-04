import { NextFunction, Request, Response } from 'express';
import * as formidable from 'formidable';
// import { firstValues } from 'formidable/src/helpers/firstValues.js';
const { firstValues } = require('formidable/src/helpers/firstValues.js');

// Middleware to parse multipart content and put it in the request body
export const multipartHandler = (req: Request, res: Response, next: NextFunction) => {
    const isMultipart =
        req.headers['content-type'] && req.headers['content-type'].indexOf('multipart') !== -1;

    if (!isMultipart) {
        return next();
    }

    const form = new formidable.IncomingForm();

    form.parse(req, (error, fields, files) => {
        if (error) {
            return next(new Error('parse_error'));
        }

        // See https://www.npmjs.com/package/formidable#firstvalues
        const fieldsSingle = firstValues(form, fields);

        req.body = {
            ...fieldsSingle,
            ...files
        };

        next();
    });
};
