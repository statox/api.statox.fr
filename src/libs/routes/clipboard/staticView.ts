import { Response } from 'express';
import { FromSchema } from 'json-schema-to-ts';
import { EmptyInput, GetRoute } from '../types.js';
import { getEntriesForStaticView } from '../../modules/clipboard/index.js';

const handler = async () => {
    return getEntriesForStaticView();
};

const customResponseHandler = (output: Output, res: Response) => {
    return res.render('clipboard', { entries: output });
};

const outputSchema = {
    type: 'array',
    items: {
        type: 'object',
        properties: {
            id: { type: 'number' },
            name: { type: 'string' },
            content: { type: 'string' },
            creationDateUnix: { type: 'number' },
            ttl: { type: 'number' },
            isPublic: { type: 'boolean' },
            linkId: { type: 'string' },
            s3Key: { type: ['string', 'null'] },
            s3PresignedUrl: { type: 'string' },
            contentIsLink: { type: 'boolean' }
        },
        required: ['id', 'name', 'content', 'creationDateUnix', 'ttl', 'isPublic', 'linkId'],
        additionalProperties: false
    }
} as const;

type Output = FromSchema<typeof outputSchema>;

export const route: GetRoute<EmptyInput, Output> = {
    method: 'get',
    path: '/clipboard/view',
    handler,
    authentication: 'none',
    outputSchema,
    customResponseHandler
};
