import type { NextFunction, Request, Response } from 'express';
import { AllowedSchema } from 'express-json-validator-middleware';
import { PostRoute } from '../types';
import { createWatcher } from '../../services/webWatcher';

const handler = async (req: Request, res: Response, next: NextFunction) => {
    const { name, notificationMessage, url, cssSelector, checkIntervalSeconds } = req.body;

    try {
        await createWatcher({
            name,
            notificationMessage,
            url,
            watchType: 'CSS',
            cssSelector,
            checkIntervalSeconds
        });
        res.send({});
    } catch (error) {
        next(error);
    }
};

const inputSchema: AllowedSchema = {
    type: 'object',
    required: ['name', 'notificationMessage', 'url', 'cssSelector', 'checkIntervalSeconds'],
    additionalProperties: false,
    properties: {
        name: {
            type: 'string',
            description: 'Name of the watcher (must be uniq)'
        },
        notificationMessage: {
            type: 'string',
            description: 'Message to send went the content changes'
        },
        url: {
            type: 'string',
            description: 'URL to monitor'
        },
        cssSelector: {
            type: 'string',
            description: 'CSS selector to the element to monitor in the page'
        },
        checkIntervalSeconds: {
            type: 'number',
            description: 'Minimum time between to checks in seconds',
            minimum: 15 * 60
        }
    }
};

export const route: PostRoute = {
    method: 'post',
    path: '/webWatcher/createWatcher',
    inputSchema,
    handler,
    authentication: 'user'
};
