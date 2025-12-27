import { FromSchema } from 'json-schema-to-ts';
import { EmptyInput, GetRoute, RouteHandler } from '../types.js';
import { getAllEntries } from '../../modules/personalTracker/services/index.js';

const handler: RouteHandler<EmptyInput> = async (params) => {
    const { authenticatedUser } = params;

    if (!authenticatedUser) {
        throw new Error('User must be authenticated');
    }

    const events = await getAllEntries(authenticatedUser.id);
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
                        description:
                            'The event a stringified JSON object encrypted and encoded in base64',
                        type: 'string'
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
    scope: 'personalTracker',
    outputSchema
};
