import { File } from 'formidable';
import { FromSchema } from 'json-schema-to-ts';
import { EmptyOutput, PostRoute, RouteHandler } from '../types.js';
import { addEntry } from '../../modules/reactor/index.js';
import { emptyObjectSchema } from '../helpers.js';

const handler: RouteHandler<Input> = async (params) => {
    const { name, commaSeparatedTags } = params.input;
    params.loggableContext.addData('entryName', name);

    const tags = commaSeparatedTags.split(',').filter((tag: string) => tag.length);
    const file: File = params.input.file.pop() as unknown as File;

    await addEntry({ name, file, tags });
};

const inputSchema = {
    type: 'object',
    required: ['name', 'commaSeparatedTags', 'file'],
    additionalProperties: false,
    properties: {
        name: {
            type: 'string'
        },
        // Sending the file forces us to use a multipart/form-data upload
        // So we can't really have proper JSON with array fields.
        // Instead we get the tags as a big string of comma separated words
        commaSeparatedTags: {
            type: 'string'
        },
        file: {
            type: 'array'
        }
    }
} as const;

type Input = FromSchema<typeof inputSchema>;

export const route: PostRoute<Input, EmptyOutput> = {
    method: 'post',
    path: '/reactor/addEntry',
    inputSchema,
    handler,
    authentication: 'user2',
    scope: 'admin',
    outputSchema: emptyObjectSchema
};
