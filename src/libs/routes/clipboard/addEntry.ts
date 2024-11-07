import type { Request } from 'express';
import { File } from 'formidable';
import { AllowedSchema } from 'express-json-validator-middleware';
import { PostRoute } from '../types';
import { addEntry } from '../../modules/clipboard';
import { FileOrContentRequiredError } from '../errors';

const handler = async (req: Request) => {
    const { name, content, ttlSeconds: ttlSecondsInput, isPublic: isPublicInput } = req.body;

    // We allow multiple types because when uploading a file with multipart/formdata
    // the fields are not casted by Formidable
    // TODO: Fix that
    const ttlSeconds = isNaN(ttlSecondsInput) ? undefined : Number(ttlSecondsInput);
    const isPublic = typeof isPublicInput === 'string' ? isPublicInput === 'true' : isPublicInput;

    const file: File = req.body.file?.pop();

    if (!content && !file) {
        throw new FileOrContentRequiredError();
    }

    await addEntry({ name, content, ttlSeconds, isPublic, file });
};

const inputSchema: AllowedSchema = {
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
};

export const route: PostRoute = {
    method: 'post',
    path: '/clipboard/addEntry',
    inputSchema,
    handler,
    authentication: 'user'
};
