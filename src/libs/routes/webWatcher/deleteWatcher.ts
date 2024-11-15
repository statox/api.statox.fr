import { FromSchema } from 'json-schema-to-ts';
import { EmptyOutput, PostRoute, RouteHandler } from '../types.js';
import { deleteWatcher } from '../../modules/webWatcher/index.js';
import { emptyObjectSchema } from '../helpers.js';

const handler: RouteHandler<Input> = async (params) => {
    await deleteWatcher(params.input.id);
};

const inputSchema = {
    type: 'object',
    required: ['id'],
    additionalProperties: false,
    properties: {
        id: {
            type: 'number',
            description: 'id of the watcher to delete'
        }
    }
} as const;

type Input = FromSchema<typeof inputSchema>;

export const route: PostRoute<Input, EmptyOutput> = {
    method: 'post',
    path: '/webWatcher/deleteWatcher',
    inputSchema,
    handler,
    authentication: 'user',
    outputSchema: emptyObjectSchema
};
