import { GetRoute } from '../types';
import { getAllEntries } from '../../modules/clipboard';

const handler = async () => {
    return getAllEntries();
};

export const route: GetRoute = {
    method: 'get',
    path: '/clipboard/getAllEntries',
    handler,
    authentication: 'user',
    outputSchema: {
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
    }
};
