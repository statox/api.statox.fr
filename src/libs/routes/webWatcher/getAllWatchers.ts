import { FromSchema } from 'json-schema-to-ts';
import { EmptyInput, GetRoute } from '../types';
import { getWatchedContent } from '../../modules/webWatcher';

const handler = async () => {
    return getWatchedContent();
};

const outputSchema = {
    type: 'array',
    items: {
        type: 'object',
        properties: {
            id: { type: 'number' },
            name: { type: 'string' },
            notificationMessage: { type: 'string' },
            url: { type: 'string' },
            watchType: { type: 'string' },
            cssSelector: { type: 'string' },
            lastContent: { type: 'string' },
            lastCheckDateUnix: { type: ['number', 'null'] },
            lastUpdateDateUnix: { type: ['number', 'null'] },
            archivalDateUnix: { type: ['number', 'null'] },
            checkIntervalSeconds: { type: 'number' },
            lastErrorDateUnix: { type: ['number', 'null'] },
            lastErrorMessage: { type: ['string', 'null'] }
        },
        required: [
            'id',
            'name',
            'notificationMessage',
            'url',
            'watchType',
            'lastContent',
            'lastCheckDateUnix',
            'lastUpdateDateUnix',
            'checkIntervalSeconds',
            'lastErrorDateUnix',
            'lastErrorMessage'
        ],
        additionalProperties: false
    }
} as const;

export const route: GetRoute<EmptyInput, FromSchema<typeof outputSchema>> = {
    method: 'get',
    path: '/webWatcher/getAllWatchers',
    handler,
    authentication: 'none',
    outputSchema
};
