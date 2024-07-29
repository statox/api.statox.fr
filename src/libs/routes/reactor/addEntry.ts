import type { NextFunction, Request, Response } from 'express';
import { File } from 'formidable';
import { AllowedSchema } from 'express-json-validator-middleware';
import { PostRoute } from '../types';
import { addEntry } from '../../services/reactor';

import type { QueryError } from 'mysql2';

const handler = async (req: Request, res: Response, next: NextFunction) => {
    const { name, commaSeparatedTags } = req.body;

    const tags = commaSeparatedTags.split(',').filter((tag: string) => tag.length);

    const file: File = req.body.file.pop();

    try {
        await addEntry({ name, file, tags });
        res.send({});
    } catch (error) {
        if ((error as QueryError).code === 'ER_DUP_ENTRY') {
            return res.status(400).send('ER_DUP_ENTRY');
        }
        next(error);
    }
};

const inputSchema: AllowedSchema = {
    type: 'object',
    required: ['name', 'commaSeparatedTags', 'file'],
    additionalProperties: false,
    properties: {
        name: {
            type: 'string'
        },
        // Sending the file forces us to use a multipart/form-data upload
        // So we can't really have proper JSON with array fields.
        // Instead we get the tags as a big string of comma separated words
        commaSeparatedTags: {
            type: 'string'
        },
        file: {
            type: 'array'
        }
    }
};

export const route: PostRoute = {
    method: 'post',
    path: '/reactor/addEntry',
    inputSchema,
    handler,
    authentication: 'user'
};
