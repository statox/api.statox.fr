import { GetRoute } from '../types';
import { getLinksVisitsCount } from '../../modules/chords';

const handler = async () => {
    return getLinksVisitsCount();
};

export const route: GetRoute = {
    method: 'get',
    path: '/chords/getLinksVisitsCount',
    handler,
    authentication: 'none',
    outputSchema: {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                url: { type: 'string' },
                count: { type: 'number' },
                lastAccessDateUnix: { type: 'number' }
            },
            required: ['url', 'count', 'lastAccessDateUnix'],
            additionalProperties: false
        }
    }
};
