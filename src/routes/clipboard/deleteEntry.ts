import type { NextFunction, Request, Response } from 'express';
import { AllowedSchema } from 'express-json-validator-middleware';
import { PostRoute } from '../types';
import { deleteEntry } from '../../services/clipboard';

const handler = async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;

    deleteEntry({ name }, (error) => {
        if (error) {
            return next(error);
        }

        res.send();
    });
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
    protected: true
};
