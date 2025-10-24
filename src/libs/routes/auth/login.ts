import { FromSchema } from 'json-schema-to-ts';
import { PostRoute, RouteHandler } from '../types.js';

const handler: RouteHandler<Input> = async (params) => {
    const { authenticatedUser } = params;
    console.log('IN /auth/login HANDLER');
    console.log(authenticatedUser);

    return {};
};

const inputSchema = {
    type: 'object',
    required: ['username', 'password'],
    additionalProperties: false,
    properties: {
        username: {
            type: 'string'
        },
        password: {
            type: 'string'
        }
    }
} as const;

type Input = FromSchema<typeof inputSchema>;

const outputSchema = {
    type: 'object',
    properties: {},
    required: [],
    additionalProperties: false
} as const;

type Output = FromSchema<typeof outputSchema>;

export const route: PostRoute<Input, Output> = {
    method: 'post',
    path: '/auth/login',
    handler,
    authentication: 'user2',
    outputSchema,
    inputSchema
};
