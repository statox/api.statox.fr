import { EmptyInput, GetRoute } from '../types.js';
import { getEntriesForPublic } from '../../modules/reactor/index.js';
import { FromSchema } from 'json-schema-to-ts';

const handler = async () => {
    return getEntriesForPublic();
};

const outputSchema = {
    type: 'array',
    items: {
        type: 'object',
        properties: {
            name: { type: 'string' },
            creationDateUnix: { type: 'number' },
            s3PresignedUrl: { type: 'string' },
            uri: { type: 'string' },
            tags: {
                type: 'array',
                items: { type: 'string' }
            }
        },
        required: ['name', 'creationDateUnix', 's3PresignedUrl', 'uri', 'tags'],
        additionalProperties: false
    }
} as const;

export const route: GetRoute<EmptyInput, FromSchema<typeof outputSchema>> = {
    method: 'get',
    path: '/reactor/getEntriesForPublic',
    handler,
    authentication: 'none',
    outputSchema
};
