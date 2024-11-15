import { FromSchema } from 'json-schema-to-ts';
import { EmptyInput, GetRoute } from '../types.js';
import { getAllEntries } from '../../modules/readingList/index.js';

const handler = async () => {
    const items = await getAllEntries();
    return { items };
};

const outputSchema = {
    type: 'object',
    properties: {
        items: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
                    creationDateUnix: { type: 'number' },
                    name: { type: 'string' },
                    comment: { type: 'string' },
                    link: { type: 'string' },
                    s3PresignedUrl: { type: 'string' },
                    tags: {
                        type: 'array',
                        items: { type: 'string' }
                    }
                },
                required: ['id', 'name', 'comment', 'creationDateUnix', 'link', 'tags'],
                additionalProperties: false
            }
        }
    },
    required: ['items'],
    additionalProperties: false
} as const;

export const route: GetRoute<EmptyInput, FromSchema<typeof outputSchema>> = {
    method: 'get',
    path: '/readingList/getAllEntries',
    handler,
    authentication: 'user',
    outputSchema
};
