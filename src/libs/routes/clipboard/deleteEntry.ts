import { FromSchema } from 'json-schema-to-ts';
import { EmptyOutput, PostRoute, RouteHandler } from '../types.js';
import { deleteEntry } from '../../modules/clipboard/index.js';
import { emptyObjectSchema } from '../helpers.js';

const handler: RouteHandler<Input> = async (params) => {
    const { name } = params.input;
    params.loggableContext.addData('entryName', name);

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

export const route: PostRoute<Input, EmptyOutput> = {
    method: 'post',
    path: '/clipboard/deleteEntry',
    inputSchema,
    handler,
    authentication: 'user',
    outputSchema: emptyObjectSchema
};
