import { FromSchema } from 'json-schema-to-ts';
import { EmptyOutput, PostRoute, RouteHandler } from '../types';
import { updateChords } from '../../modules/chords/commands';
import { slog } from '../../modules/logging';
import { emptyObjectSchema } from '../helpers';

const handler: RouteHandler<Input> = async (params) => {
    const { chords } = params.input;
    slog.log('chords', 'Updating chords', { nbChords: chords.length });
    await updateChords(chords);
};

const inputSchema = {
    type: 'object',
    required: ['chords'],
    additionalProperties: false,
    properties: {
        chords: {
            type: 'array',
            items: {
                type: 'object',
                required: ['artist', 'title', 'url', 'creationDate', 'tags'],
                additionalProperties: false,
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
                }
            }
        }
    }
} as const;

type Input = FromSchema<typeof inputSchema>;

export const route: PostRoute<Input, EmptyOutput> = {
    method: 'post',
    path: '/chords/updateAll',
    inputSchema,
    handler,
    authentication: 'user',
    outputSchema: emptyObjectSchema
};
