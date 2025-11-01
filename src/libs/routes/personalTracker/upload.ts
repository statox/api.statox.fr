import { FromSchema } from 'json-schema-to-ts';
import { EmptyOutput, PostRoute, RouteHandler } from '../types.js';
import { emptyObjectSchema } from '../helpers.js';
import { addEntry } from '../../modules/personalTracker/index.js';

const handler: RouteHandler<Input> = async (params) => {
    params.loggableContext.addData('eventTS', params.input.event.timestampUTC);
    params.loggableContext.addData('eventType', params.input.event.type);
    params.loggableContext.addData('eventValue', params.input.event.value);

    await addEntry(params.input.event);
};

const inputSchema = {
    type: 'object',
    required: ['event'],
    additionalProperties: false,
    properties: {
        event: {
            type: 'object',
            required: ['timestampUTC', 'type', 'value'],
            additionalProperties: false,
            properties: {
                timestampUTC: {
                    description: 'The date of the event in seconds in UTC',
                    type: 'number'
                },
                type: {
                    description: 'Event type',
                    type: 'string'
                },
                value: {
                    description: 'The value associated with the event',
                    type: 'number'
                }
            }
        }
    }
} as const;

type Input = FromSchema<typeof inputSchema>;

export const route: PostRoute<Input, EmptyOutput> = {
    method: 'post',
    path: '/personalTracker/upload',
    inputSchema,
    handler,
    authentication: 'user2',
    outputSchema: emptyObjectSchema
};
