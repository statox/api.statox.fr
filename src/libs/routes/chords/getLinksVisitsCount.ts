import { EmptyInput, GetRoute } from '../types.js';
import { getLinksVisitsCount } from '../../modules/chords/index.js';
import { FromSchema } from 'json-schema-to-ts';

const handler = async () => {
    return getLinksVisitsCount();
};

const outputSchema = {
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
} as const;

export const route: GetRoute<EmptyInput, FromSchema<typeof outputSchema>> = {
    method: 'get',
    path: '/chords/getLinksVisitsCount',
    handler,
    authentication: 'none',
    outputSchema
};
