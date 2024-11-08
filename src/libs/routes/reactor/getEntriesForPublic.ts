import { GetRoute } from '../types';
import { getEntriesForPublic } from '../../modules/reactor';

const handler = async () => {
    return getEntriesForPublic();
};

export const route: GetRoute = {
    method: 'get',
    path: '/reactor/getEntriesForPublic',
    handler,
    authentication: 'none',
    outputSchema: {
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
    }
};
