import { FromSchema } from 'json-schema-to-ts';
import { EmptyOutput, PostRoute, RouteHandler } from '../types';
import { deleteEntry } from '../../modules/clipboard';
import { emptyObjectSchema } from '../helpers';

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
