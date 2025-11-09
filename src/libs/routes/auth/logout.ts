import { FromSchema } from 'json-schema-to-ts';
import { PostRoute, RouteHandler } from '../types.js';
import { slog } from '../../modules/logging/index.js';

const handler: RouteHandler<Input> = async (params) => {
    const { authenticatedUser } = params;
    console.log('logout', { authenticatedUser });
    slog.log('auth', 'logout success');
    return {};
};

const inputSchema = {
    type: 'object',
    required: [],
    additionalProperties: false,
    properties: {}
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
    path: '/auth/logout',
    handler,
    authentication: 'user2',
    scope: 'public',
    outputSchema,
    inputSchema
};
