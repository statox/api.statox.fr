import type { Request } from 'express';
import { AllowedSchema } from 'express-json-validator-middleware';
import { PostRoute } from '../types';
import { disableWatcher, enableWatcher } from '../../modules/webWatcher';

const handler = async (req: Request) => {
    const { watcherId, setToEnabled } = req.body;

    if (setToEnabled) {
        await enableWatcher(watcherId);
    } else {
        await disableWatcher(watcherId);
    }
};

const inputSchema: AllowedSchema = {
    type: 'object',
    required: ['watcherId', 'setToEnabled'],
    additionalProperties: false,
    properties: {
        watcherId: {
            type: 'number',
            description: 'The sql id of the watcher'
        },
        setToEnabled: {
            type: 'boolean',
            description: 'The new enabled status of the watcher'
        }
    }
};

export const route: PostRoute = {
    method: 'post',
    path: '/webWatcher/toggleWatcherEnabled',
    inputSchema,
    handler,
    authentication: 'user',
    outputSchema: {
        type: 'object',
        additionalProperties: false
    }
};
