import { FromSchema } from 'json-schema-to-ts';
import { getAllChords } from '../../modules/chords/index.js';
import { EmptyInput, GetRoute } from '../types.js';

const handler = async () => {
    return getAllChords();
};

const outputSchema = {
    type: 'array',
    items: {
        type: 'object',
        properties: {
            artist: {
                type: 'string'
            },
            title: {
                type: 'string'
            },
            url: {
                type: 'string'
            },
            creationDate: {
                type: 'number'
            },
            tags: {
                type: 'array',
                items: {
                    type: 'string'
                }
            }
        },
        required: ['artist', 'title', 'url', 'creationDate', 'tags']
    }
} as const;

export const route: GetRoute<EmptyInput, FromSchema<typeof outputSchema>> = {
    method: 'get',
    path: '/chords/getAll',
    handler,
    authentication: 'none',
    outputSchema
};
