import { FromSchema } from 'json-schema-to-ts';
import { EmptyOutput, PostRoute, RouteHandler } from '../types.js';
import { emptyObjectSchema } from '../helpers.js';
import { addEntry } from '../../modules/personalTracker/index.js';

const handler: RouteHandler<Input> = async (params) => {
    const entry = params.input;
    params.loggableContext.addData('eventTS', entry.eventDateUnix);
    await addEntry(entry);
};

const inputSchema = {
    type: 'object',
    required: ['eventDateUnix', 'saltB64', 'nonceB64', 'ciphertextB64'],
    additionalProperties: false,
    properties: {
        eventDateUnix: {
            description: 'The date of the event in seconds in UTC',
            type: 'number'
        },
        saltB64: {
            description: 'The salt used to cipher the event in base64',
            type: 'string'
        },
        nonceB64: {
            description: 'The salt used to cipher the event in base64',
            type: 'string'
        },
        ciphertextB64: {
            description: 'The event a stringified JSON object encrypted and encoded in base64',
            type: 'string'
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
    scope: 'admin',
    outputSchema: emptyObjectSchema
};
