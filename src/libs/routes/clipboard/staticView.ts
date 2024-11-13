import { FromSchema } from 'json-schema-to-ts';
import { EmptyInput, GetRoute } from '../types';
import { getEntriesForStaticView } from '../../modules/clipboard';

const handler = async () => {
    return getEntriesForStaticView();
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
            isPublic: { type: 'number' },
            linkId: { type: 'string' },
            s3Key: { type: ['string', 'null'] },
            s3PresignedUrl: { type: 'string' },
            contentIsLink: { type: 'boolean' }
        },
        required: ['id', 'name', 'content', 'creationDateUnix', 'ttl', 'isPublic', 'linkId'],
        additionalProperties: false
    }
} as const;

export const route: GetRoute<EmptyInput, FromSchema<typeof outputSchema>> = {
    method: 'get',
    path: '/clipboard/view',
    handler,
    authentication: 'none',
    outputSchema
};
