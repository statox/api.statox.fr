import { FromSchema } from 'json-schema-to-ts';
import { EmptyOutput, PostRoute, RouteHandler } from '../types.js';
import { emptyObjectSchema } from '../helpers.js';
import { addEntry } from '../../modules/personalTracker/index.js';

const handler: RouteHandler<Input> = async (params) => {
    params.loggableContext.addData('eventType', params.input.eventType);
    params.loggableContext.addData('eventValue', params.input.eventValue);

    await addEntry(params.input);
};

const inputSchema = {
    type: 'object',
    required: ['eventType'],
    additionalProperties: false,
    properties: {
        eventType: {
            description: 'Event type',
            type: 'string'
        },
        eventValue: {
            description: 'The value associated with the event',
            type: 'number'
        }
    }
} as const;

type Input = FromSchema<typeof inputSchema>;

export const route: PostRoute<Input, EmptyOutput> = {
    method: 'post',
    path: '/personalTracker/upload',
    inputSchema,
    handler,
    authentication: 'user',
    outputSchema: emptyObjectSchema
};
