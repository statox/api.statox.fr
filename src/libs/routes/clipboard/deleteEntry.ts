import { FromSchema } from 'json-schema-to-ts';
import { PostRoute, RouteHandler } from '../types';
import { deleteEntry } from '../../modules/clipboard';

const handler: RouteHandler<Input> = async (params) => {
    const { name } = params.input;
    await deleteEntry({ name });
};

const inputSchema = {
    type: 'object',
    required: ['name'],
    additionalProperties: false,
    properties: {
        name: {
            type: 'string'
        }
    }
} as const;

type Input = FromSchema<typeof inputSchema>;

export const route: PostRoute<Input> = {
    method: 'post',
    path: '/clipboard/deleteEntry',
    inputSchema,
    handler,
    authentication: 'user',
    outputSchema: {
        type: 'object',
        additionalProperties: false
    }
};
