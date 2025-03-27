import { FromSchema } from 'json-schema-to-ts';
import { EmptyOutput, PostRoute, RouteHandler } from '../types.js';
import { updateChords } from '../../modules/chords/commands.js';
import { emptyObjectSchema } from '../helpers.js';

const handler: RouteHandler<Input> = async (params) => {
    const { chords } = params.input;
    params.loggableContext.addData('nbChords', chords.length);
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
                        type: 'string',
                        minLength: 1
                    },
                    title: {
                        type: 'string',
                        minLength: 1
                    },
                    url: {
                        type: 'string',
                        minLength: 1
                    },
                    creationDate: {
                        oneOf: [
                            {
                                type: 'number',
                                minimum: 1600000000000
                            },
                            {
                                // The old entries have a default timestamp at 0
                                type: 'number',
                                enum: [0]
                            }
                        ]
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
