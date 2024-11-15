import { FromSchema } from 'json-schema-to-ts';
import { EmptyOutput, PostRoute, RouteHandler } from '../types.js';
import { addLinkVisit } from '../../modules/chords/index.js';
import { emptyObjectSchema } from '../helpers.js';

const handler: RouteHandler<Input> = async (params) => {
    const { url } = params.input;
    params.loggableContext.addData('visitedUrl', url);
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

export const route: PostRoute<Input, EmptyOutput> = {
    method: 'post',
    path: '/chords/addLinkVisit',
    inputSchema,
    handler,
    authentication: 'user',
    outputSchema: emptyObjectSchema
};
