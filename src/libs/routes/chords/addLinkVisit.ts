import type { Request } from 'express';
import { AllowedSchema } from 'express-json-validator-middleware';
import { PostRoute } from '../types';
import { addLinkVisit } from '../../modules/chords';
import { slog } from '../../modules/logging';

const handler = async (req: Request) => {
    const { url } = req.body;
    slog.log('chords', 'Adding visit', { visitedUrl: url });
    await addLinkVisit({ url });
};

const inputSchema: AllowedSchema = {
    type: 'object',
    required: ['url'],
    additionalProperties: false,
    properties: {
        url: {
            type: 'string'
        }
    }
};

export const route: PostRoute = {
    method: 'post',
    path: '/chords/addLinkVisit',
    inputSchema,
    handler,
    authentication: 'user'
};
