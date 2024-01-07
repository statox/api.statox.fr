import type { NextFunction, Request, Response } from 'express';
import { File } from 'formidable';
import { AllowedSchema } from 'express-json-validator-middleware';
import { PostRoute } from '../types';
import { addEntry } from '../../services/clipboard';

import type { QueryError } from 'mysql2';

const handler = async (req: Request, res: Response, next: NextFunction) => {
    const { name, content, ttlSeconds: ttlSecondsInput, isPublic: isPublicInput } = req.body;

    // We allow multiple types because when uploading a file with multipart/formdata
    // the fields are not casted by Formidable
    // TODO: Fix that
    const ttlSeconds = isNaN(ttlSecondsInput) ? undefined : Number(ttlSecondsInput);
    const isPublic = typeof isPublicInput === 'string' ? isPublicInput === 'true' : isPublicInput;

    const file: File = req.body.file?.pop();

    try {
        await addEntry({ name, content, ttlSeconds, isPublic, file });
        res.send();
    } catch (error) {
        if ((error as QueryError).code === 'ER_DUP_ENTRY') {
            return res.status(400).send('ER_DUP_ENTRY');
        }
        next(error);
    }
};

const inputSchema: AllowedSchema = {
    type: 'object',
    required: ['name', 'content'],
    additionalProperties: false,
    properties: {
        name: {
            type: 'string'
        },
        content: {
            type: 'string'
        },
        file: {
            type: 'array'
        },
        ttlSeconds: {
            type: ['number', 'string'],
            minimum: 0
        },
        isPublic: {
            type: ['boolean', 'string']
        }
    }
};

export const route: PostRoute = {
    method: 'post',
    path: '/clipboard/addEntry',
    inputSchema,
    handler,
    protected: true
};
