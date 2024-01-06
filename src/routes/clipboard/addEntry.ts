import type { NextFunction, Request, Response } from 'express';
import { File } from 'formidable';
import { AllowedSchema } from 'express-json-validator-middleware';
import { PostRoute } from '../types';
import { addEntry } from '../../services/clipboard';

const handler = async (req: Request, res: Response, next: NextFunction) => {
    const { name, content, ttlSeconds: ttlSecondsInput, isPublic: isPublicInput } = req.body;

    // We allow multiple types because when uploading a file with multipart/formdata
    // the fields are not casted by Formidable
    // TODO: Fix that
    const ttlSeconds = isNaN(ttlSecondsInput) ? undefined : Number(ttlSecondsInput);
    const isPublic = typeof isPublicInput === 'string' ? isPublicInput === 'true' : isPublicInput;

    const file: File = req.body.file?.pop();

    addEntry({ name, content, ttlSeconds, isPublic, file }, (error) => {
        if (error) {
            if (error.message === 'ER_DUP_ENTRY') {
                return res.status(400).send(error.message);
            }
            return next(error);
        }

        res.send();
    });
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
