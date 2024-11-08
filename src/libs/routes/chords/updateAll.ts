import type { Request } from 'express';
import { AllowedSchema } from 'express-json-validator-middleware';
import { PostRoute } from '../types';
import { updateChords } from '../../modules/chords/commands';
import { slog } from '../../modules/logging';

const handler = async (req: Request) => {
    const { chords } = req.body;
    slog.log('chords', 'Updating chords', { nbChords: chords.length });
    await updateChords(chords);
};

const inputSchema: AllowedSchema = {
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
};

export const route: PostRoute = {
    method: 'post',
    path: '/chords/updateAll',
    inputSchema,
    handler,
    authentication: 'user',
    outputSchema: {
        type: 'object',
        additionalProperties: false
    }
};
