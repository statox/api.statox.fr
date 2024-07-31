import type { NextFunction, Request, Response } from 'express';
import { AllowedSchema } from 'express-json-validator-middleware';
import { PostRoute } from '../types';
import { deleteWatcher } from '../../modules/webWatcher';

const handler = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;

    try {
        await deleteWatcher(id);
        res.send({});
    } catch (error) {
        next(error);
    }
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
