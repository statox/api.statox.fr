import { FromSchema } from 'json-schema-to-ts';
import { EmptyOutput, PostRoute, RouteHandler } from '../types.js';
import { disableWatcher, enableWatcher } from '../../modules/webWatcher/index.js';
import { emptyObjectSchema } from '../helpers.js';

const handler: RouteHandler<Input> = async (params) => {
    const { watcherId, setToEnabled } = params.input;
    params.loggableContext.addData('id', watcherId);
    params.loggableContext.addData('enabled', setToEnabled);

    if (setToEnabled) {
        await enableWatcher(watcherId);
    } else {
        await disableWatcher(watcherId);
    }
};

const inputSchema = {
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
} as const;

type Input = FromSchema<typeof inputSchema>;

export const route: PostRoute<Input, EmptyOutput> = {
    method: 'post',
    path: '/webWatcher/toggleWatcherEnabled',
    inputSchema,
    handler,
    authentication: 'user',
    outputSchema: emptyObjectSchema
};
