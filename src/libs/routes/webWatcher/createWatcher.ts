import { FromSchema } from 'json-schema-to-ts';
import { EmptyOutput, PostRoute, RouteHandler } from '../types';
import { createWatcher } from '../../modules/webWatcher';
import { emptyObjectSchema } from '../helpers';

const handler: RouteHandler<Input> = async (params) => {
    let cssSelector: string | undefined = undefined;
    const { name, notificationMessage, url, watchType, checkIntervalSeconds } = params.input;

    if (watchType === 'CSS') {
        cssSelector = params.input.cssSelector;
    }

    await createWatcher({
        name,
        notificationMessage,
        url,
        watchType,
        cssSelector,
        checkIntervalSeconds
    });
};

const inputSchema = {
    oneOf: [
        {
            type: 'object',
            required: [
                'name',
                'notificationMessage',
                'url',
                'watchType',
                'cssSelector',
                'checkIntervalSeconds'
            ],
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
                watchType: {
                    type: 'string',
                    description: 'Type of watch to do',
                    enum: ['CSS']
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
        },
        {
            type: 'object',
            required: ['name', 'notificationMessage', 'url', 'watchType', 'checkIntervalSeconds'],
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
                watchType: {
                    type: 'string',
                    description: 'Type of watch to do',
                    enum: ['HASH']
                },
                checkIntervalSeconds: {
                    type: 'number',
                    description: 'Minimum time between to checks in seconds',
                    minimum: 15 * 60
                }
            }
        }
    ]
} as const;

type Input = FromSchema<typeof inputSchema>;

export const route: PostRoute<Input, EmptyOutput> = {
    method: 'post',
    path: '/webWatcher/createWatcher',
    inputSchema,
    handler,
    authentication: 'user',
    outputSchema: emptyObjectSchema
};
