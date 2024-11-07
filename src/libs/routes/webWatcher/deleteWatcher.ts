import type { Request } from 'express';
import { AllowedSchema } from 'express-json-validator-middleware';
import { PostRoute } from '../types';
import { deleteWatcher } from '../../modules/webWatcher';

const handler = async (req: Request) => {
    const { id } = req.body;
    await deleteWatcher(id);
};

const inputSchema: AllowedSchema = {
    type: 'object',
    required: ['id'],
    additionalProperties: false,
    properties: {
        id: {
            type: 'number',
            description: 'id of the watcher to delete'
        }
    }
};

export const route: PostRoute = {
    method: 'post',
    path: '/webWatcher/deleteWatcher',
    inputSchema,
    handler,
    authentication: 'user'
};
