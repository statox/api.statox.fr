import type { Request, Response } from 'express';
import { AllowedSchema } from 'express-json-validator-middleware';
import { PostRoute } from '../types';
import { slog } from '../../services/logging';

const handler = async (req: Request, res: Response) => {
    const { value } = req.body;
    slog.log({ message: 'Home tracking event', sample: value });
    res.send({});
};

const inputSchema: AllowedSchema = {
    type: 'object',
    required: ['value'],
    additionalProperties: false,
    properties: {
        value: {
            type: 'number',
            description: 'A simple numerical value for now'
        }
    }
};

export const route: PostRoute = {
    // TODO add API key authentication
    method: 'post',
    path: '/homeTracker/upload',
    inputSchema,
    handler
};
