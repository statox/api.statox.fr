import { FromSchema } from 'json-schema-to-ts';
import { EmptyInput, GetRoute } from '../types';

const handler = async () => {
    return { time: Date.now() };
};

const outputSchema = {
    type: 'object',
    properties: {
        time: {
            type: 'number'
        }
    },
    required: ['time'],
    additionalProperties: false
} as const;

export const route: GetRoute<EmptyInput, FromSchema<typeof outputSchema>> = {
    method: 'get',
    path: '/health/getRemoteTime',
    handler,
    authentication: 'none',
    outputSchema
};
