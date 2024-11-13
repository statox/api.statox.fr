import { FromSchema } from 'json-schema-to-ts';
import { PostRoute, RouteHandler } from '../types';
import { deleteWatcher } from '../../modules/webWatcher';

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

export const route: PostRoute<Input> = {
    method: 'post',
    path: '/webWatcher/deleteWatcher',
    inputSchema,
    handler,
    authentication: 'user',
    outputSchema: {
        type: 'object',
        additionalProperties: false
    }
};
