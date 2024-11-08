import { GetRoute } from '../types';
import { getAllEntries } from '../../modules/readingList';

const handler = async () => {
    const items = await getAllEntries();
    return { items };
};

export const route: GetRoute = {
    method: 'get',
    path: '/readingList/getAllEntries',
    handler,
    authentication: 'user',
    outputSchema: {
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
    }
};
