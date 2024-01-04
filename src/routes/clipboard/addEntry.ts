import type { NextFunction, Request, Response } from 'express';
import { File } from 'formidable';
import { AllowedSchema } from 'express-json-validator-middleware';
import { PostRoute } from '../types';
import { addEntry } from '../../services/clipboard';

const handler = async (req: Request, res: Response, next: NextFunction) => {
    const { name, content, ttlSeconds, isPublic } = req.body;

    const file: File = req.body.file?.pop();

    if (file) {
        console.log({ file });
        console.log(file.toString());
    }

    addEntry({ name, content, ttlSeconds, isPublic }, (error) => {
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
            type: 'number',
            minimum: 0
        },
        isPublic: {
            type: 'boolean'
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
