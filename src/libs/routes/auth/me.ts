import { FromSchema } from 'json-schema-to-ts';
import { PostRoute, RouteHandler } from '../types.js';

/*
 * Get the user details if they are authenticated.
 * TODO the pipeline catches unauthenticated call earlier than the handler
 * so we can't set a messsage when !authenticatedUser for now.
 * This route should have an exception like /auth/login in the pipeline
 */
const handler: RouteHandler<Input> = async (params) => {
    const { authenticatedUser } = params;
    if (!authenticatedUser) {
        return {
            status: 'logged_out'
        };
    }

    return {
        user: authenticatedUser,
        status: 'logged_in'
    };
};

const inputSchema = {
    type: 'object',
    required: [],
    additionalProperties: false,
    properties: {}
} as const;

type Input = FromSchema<typeof inputSchema>;

const outputSchema = {
    oneOf: [
        {
            type: 'object',
            properties: {
                status: {
                    type: 'string',
                    enum: ['logged_out']
                }
            },
            required: ['status'],
            additionalProperties: false
        },
        {
            type: 'object',
            properties: {
                status: {
                    type: 'string',
                    enum: ['logged_in']
                },
                user: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'number'
                        },
                        username: {
                            type: 'string'
                        },
                        scopes: {
                            type: 'array',
                            items: {
                                type: 'string',
                                enum: ['admin', 'public', 'homeTracker']
                            }
                        }
                    },
                    required: ['id', 'username', 'scopes'],
                    additionalProperties: false
                }
            },
            required: ['status', 'user'],
            additionalProperties: false
        }
    ]
} as const;

type Output = FromSchema<typeof outputSchema>;

export const route: PostRoute<Input, Output> = {
    method: 'post',
    path: '/auth/me',
    handler,
    authentication: 'user2',
    scope: 'public',
    outputSchema,
    inputSchema
};
