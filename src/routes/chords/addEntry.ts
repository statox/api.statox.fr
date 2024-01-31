import type { NextFunction, Request, Response } from 'express';
import { AllowedSchema } from 'express-json-validator-middleware';
import { PostRoute } from '../types';
import { addNewChord } from '../../services/chords/commands';

const handler = async (req: Request, res: Response, next: NextFunction) => {
    const chord = req.body;
    if (!chord.tags) {
        chord.tags = [];
    }
    chord.creationDate = Date.now();
    console.log('Adding chord', chord);

    try {
        await addNewChord(chord);
        res.send();
    } catch (error) {
        next(error);
    }
};

const inputSchema: AllowedSchema = {
    type: 'object',
    required: ['artist', 'title', 'url'],
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
        tags: {
            type: 'array',
            items: {
                type: 'string'
            }
        }
    }
};

export const route: PostRoute = {
    method: 'post',
    path: '/chords/addEntry',
    inputSchema,
    handler,
    protected: true
};
