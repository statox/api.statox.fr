import { FromSchema } from 'json-schema-to-ts';
import { PostRoute, RouteHandler } from '../types';
import { addLinkVisit } from '../../modules/chords';
import { slog } from '../../modules/logging';

const handler: RouteHandler<Input> = async (params) => {
    const { url } = params.input;
    slog.log('chords', 'Adding visit', { visitedUrl: url });
    await addLinkVisit({ url });
};

const inputSchema = {
    type: 'object',
    required: ['url'],
    additionalProperties: false,
    properties: {
        url: {
            type: 'string'
        }
    }
} as const;

type Input = FromSchema<typeof inputSchema>;

export const route: PostRoute<Input> = {
    method: 'post',
    path: '/chords/addLinkVisit',
    inputSchema,
    handler,
    authentication: 'user',
    outputSchema: {
        type: 'object',
        additionalProperties: false
    }
};
