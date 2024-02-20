import type { NextFunction, Request, Response } from 'express';
import { AllowedSchema } from 'express-json-validator-middleware';
import { PostRoute } from '../types';
import { addLinkVisit } from '../../services/chords';
import { logMessageToSlack } from '../../services/logging/slack';

const handler = async (req: Request, res: Response, next: NextFunction) => {
    const { url } = req.body;
    logMessageToSlack('Adding visit to ' + url);

    try {
        await addLinkVisit({ url });
        res.send();
    } catch (error) {
        next(error);
    }
};

const inputSchema: AllowedSchema = {
    type: 'object',
    required: ['url'],
    additionalProperties: false,
    properties: {
        url: {
            type: 'string'
        }
    }
};

export const route: PostRoute = {
    method: 'post',
    path: '/chords/addLinkVisit',
    inputSchema,
    handler,
    protected: true
};
