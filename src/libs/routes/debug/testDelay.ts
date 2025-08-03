import { FromSchema } from 'json-schema-to-ts';
import { PostRoute, RouteHandler } from '../types.js';
import { getNowSec } from '../../modules/monitoring/getRemoteTime.js';

function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const handler: RouteHandler<Input> = async (params) => {
    console.log("Waiting for", params.input.del);
    await timeout(params.input.del);
    console.log("Done waiting");
    return await getNowSec();
};

const outputSchema = {
    type: 'number'
} as const;

const inputSchema = {
    type: 'object',
    required: ['del'],
    additionalProperties: false,
    properties: {
        del: {
            type: 'number'
        },
    }
} as const;
type Input = FromSchema<typeof inputSchema>;

export const route: PostRoute<Input, FromSchema<typeof outputSchema>> = {
    method: 'post',
    inputSchema,
    path: '/debug/testDelay',
    handler,
    authentication: 'none',
    outputSchema
};

