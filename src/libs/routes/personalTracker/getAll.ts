import { FromSchema } from 'json-schema-to-ts';
import { EmptyInput, GetRoute } from '../types.js';
import { getAllEntries } from '../../modules/personalTracker/services/index.js';

const handler = async () => {
    const events = await getAllEntries();
    console.log({ events });
    return { events };
};

const outputSchema = {
    type: 'object',
    required: ['events'],
    additionalProperties: false,
    properties: {
        events: {
            type: 'array',
            minItems: 0,
            items: {
                type: 'object',
                required: ['eventDateUnix', 'type', 'value', 'data'],
                additionalProperties: false,
                properties: {
                    eventDateUnix: {
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
                    },
                    data: {
                        description: 'Free form data associated with the event',
                        type: 'object'
                    }
                }
            }
        }
    }
} as const;

export const route: GetRoute<EmptyInput, FromSchema<typeof outputSchema>> = {
    method: 'get',
    path: '/personalTracker/getAll',
    handler,
    authentication: 'user2',
    scope: 'admin',
    outputSchema
};
