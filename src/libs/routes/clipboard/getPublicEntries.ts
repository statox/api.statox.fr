import { FromSchema } from 'json-schema-to-ts';
import { EmptyInput, GetRoute } from '../types';
import { getPublicEntries } from '../../modules/clipboard';

const handler = async () => {
    return getPublicEntries();
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
            s3PresignedUrl: { type: 'string' }
        },
        required: ['id', 'name', 'content', 'creationDateUnix', 'ttl', 'isPublic', 'linkId'],
        additionalProperties: false
    }
} as const;

export const route: GetRoute<EmptyInput, FromSchema<typeof outputSchema>> = {
    method: 'get',
    path: '/clipboard/getPublicEntries',
    handler,
    authentication: 'none',
    outputSchema
};
