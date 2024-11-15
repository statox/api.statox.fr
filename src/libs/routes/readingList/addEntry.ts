import { File } from 'formidable';
import { FromSchema } from 'json-schema-to-ts';
import { EmptyOutput, PostRoute, RouteHandler } from '../types.js';
import { addEntry } from '../../modules/readingList/index.js';
import { emptyObjectSchema } from '../helpers.js';

const handler: RouteHandler<Input> = async (params) => {
    const { name, commaSeparatedTags, comment, link } = params.input;
    const tags = commaSeparatedTags.split(',').filter((tag: string) => tag.length);
    const file: File = params.input.file?.pop() as unknown as File;

    await addEntry({ name, tags, comment, link, file });
};

const inputSchema = {
    type: 'object',
    required: ['name', 'commaSeparatedTags'],
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
        comment: {
            type: 'string'
        },
        link: {
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
    path: '/readingList/addEntry',
    inputSchema,
    handler,
    authentication: 'user',
    outputSchema: emptyObjectSchema
};
