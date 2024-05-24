import type { NextFunction, Request, Response } from 'express';
import { AllowedSchema } from 'express-json-validator-middleware';
import { PostRoute } from '../types';
import { updateChords } from '../../services/chords/commands';
import { slog } from '../../services/logging';

const handler = async (req: Request, res: Response, next: NextFunction) => {
    const { chords } = req.body;
    slog.log('Updating chords', { nbChords: chords.length });

    try {
        await updateChords(chords);
        res.send({});
    } catch (error) {
        next(error);
    }
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
    protected: true
};
