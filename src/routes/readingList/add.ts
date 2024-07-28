import type { NextFunction, Request, Response } from 'express';
import { AllowedSchema } from 'express-json-validator-middleware';
import { PostRoute } from '../types';
import { createReadingListItem, getAllReadingListItems } from '../../services/readingList';

const handler = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    console.log(body);

    if (!body) {
        next(new Error('INVALID_CONTENT'));
    }

    try {
        await createReadingListItem(body);
        const tableContent = await getAllReadingListItems();
        console.log({ tableContent });
        res.send({});
    } catch (error) {
        next(error);
    }
};

const inputSchema: AllowedSchema = {
    oneOf: [
        {
            type: 'object',
            required: ['name', 'link', 'tags', 'isPublic'],
            additionalProperties: false,
            properties: {
                name: {
                    type: 'string'
                },
                link: {
                    type: 'string'
                },
                tags: {
                    type: 'array',
                    minItems: 0,
                    items: {
                        type: 'string'
                    }
                },
                isPublic: {
                    type: 'boolean'
                }
            }
        },
        {
            type: 'object',
            required: ['name', 'file', 'tags', 'isPublic'],
            additionalProperties: false,
            properties: {
                name: {
                    type: 'string'
                },
                file: {
                    type: 'array'
                },
                tags: {
                    type: 'array',
                    minItems: 0,
                    items: {
                        type: 'string'
                    }
                },
                isPublic: {
                    type: 'boolean'
                }
            }
        }
    ]
};

export const route: PostRoute = {
    method: 'post',
    path: '/readingList/add',
    inputSchema,
    handler,
    authentication: 'user'
};
