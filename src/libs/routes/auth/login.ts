import { FromSchema } from 'json-schema-to-ts';
import { PostRoute, RouteHandler } from '../types.js';
import { slog } from '../../modules/logging/index.js';

const handler: RouteHandler<Input> = async (params) => {
    const { authenticatedUser } = params;

    if (!authenticatedUser) {
        slog.log('auth', 'login error - No authenticated user at the end of process');
        throw new Error();
    }

    slog.log('auth', 'login success');
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
