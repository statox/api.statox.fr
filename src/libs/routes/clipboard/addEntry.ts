import { File } from 'formidable';
import { FromSchema } from 'json-schema-to-ts';
import { PostRoute, RouteHandler } from '../types';
import { addEntry } from '../../modules/clipboard';
import { FileOrContentRequiredError } from '../errors';

const handler: RouteHandler<Input> = async (params) => {
    const { name, content, isPublic: isPublicInput } = params.input;

    // We allow multiple types because when uploading a file with multipart/formdata
    // the fields are not casted by Formidable
    // TODO: Fix that
    let ttlSeconds: number | undefined = undefined;
    if (!isNaN(Number(params.input.ttlSeconds))) {
        ttlSeconds = Number(params.input.ttlSeconds);
    }
    const isPublic = typeof isPublicInput === 'string' ? isPublicInput === 'true' : isPublicInput;

    const file: File = params.input.file?.pop() as unknown as File;

    if (!content && !file) {
        throw new FileOrContentRequiredError();
    }

    await addEntry({ name, content, ttlSeconds, isPublic, file });
};

const inputSchema = {
    type: 'object',
    required: ['name'],
    additionalProperties: false,
    properties: {
        name: {
            type: 'string'
        },
        content: {
            type: 'string'
        },
        file: {
            type: 'array'
        },
        ttlSeconds: {
            type: ['number', 'string'],
            minimum: 0
        },
        isPublic: {
            type: ['boolean', 'string']
        }
    }
} as const;

type Input = FromSchema<typeof inputSchema>;

export const route: PostRoute<Input> = {
    method: 'post',
    path: '/clipboard/addEntry',
    inputSchema,
    handler,
    authentication: 'user',
    outputSchema: {
        type: 'object',
        additionalProperties: false
    }
};
