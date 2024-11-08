import type { Request } from 'express';
import { AllowedSchema } from 'express-json-validator-middleware';
import { PostRoute } from '../types';
import { deleteEntry } from '../../modules/clipboard';

const handler = async (req: Request) => {
    const { name } = req.body;
    await deleteEntry({ name });
};

const inputSchema: AllowedSchema = {
    type: 'object',
    required: ['name'],
    additionalProperties: false,
    properties: {
        name: {
            type: 'string'
        }
    }
};

export const route: PostRoute = {
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
