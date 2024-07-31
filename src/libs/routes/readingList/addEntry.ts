import type { NextFunction, Request, Response } from 'express';
import { File } from 'formidable';
import { AllowedSchema } from 'express-json-validator-middleware';
import { PostRoute } from '../types';
import { addEntry } from '../../modules/readingList';

const handler = async (req: Request, res: Response, next: NextFunction) => {
    const { name, commaSeparatedTags, comment, link } = req.body;
    const tags = commaSeparatedTags.split(',').filter((tag: string) => tag.length);
    const file: File = req.body.file?.pop();

    try {
        await addEntry({ name, tags, comment, link, file });
        res.send({});
    } catch (error) {
        next(error);
    }
};

const inputSchema: AllowedSchema = {
    type: 'object',
    required: ['name', 'commaSeparatedTags'],
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
        comment: {
            type: 'string'
        },
        link: {
            type: 'string'
        },
        file: {
            type: 'array'
        }
    }
};

export const route: PostRoute = {
    method: 'post',
    path: '/readingList/addEntry',
    inputSchema,
    handler,
    authentication: 'user'
};
