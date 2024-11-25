import { FromSchema } from 'json-schema-to-ts';
import { PostRoute, RouteHandler } from '../types.js';
import { getRecipeById } from '../../modules/cookbook/index.js';

const handler: RouteHandler<Input> = async (params) => {
    const { recipeId } = params.input;

    return await getRecipeById({ id: recipeId });
};

const inputSchema = {
    type: 'object',
    required: ['recipeId'],
    additionalProperties: false,
    properties: {
        recipeId: {
            type: 'number'
        }
    }
} as const;

type Input = FromSchema<typeof inputSchema>;

const outputSchema = {
    type: 'object',
    required: ['id', 'name', 'creationDateUnix', 'updateDateUnix', 'content', 'ingredients'],
    additionalProperties: false,
    properties: {
        id: {
            type: 'number'
        },
        name: {
            type: 'string'
        },
        creationDateUnix: {
            type: 'number'
        },
        updateDateUnix: {
            type: 'number'
        },
        content: {
            type: 'string'
        },
        ingredients: {
            type: 'array',
            items: {
                type: 'object',
                required: ['id', 'name'],
                additionalProperties: false,
                properties: {
                    id: {
                        type: 'number'
                    },
                    name: {
                        type: 'string'
                    },
                    quantity: {
                        type: ['number', 'null']
                    },
                    unit: {
                        type: ['string', 'null']
                    }
                }
            }
        }
    }
} as const;

export const route: PostRoute<Input, FromSchema<typeof outputSchema>> = {
    method: 'post',
    path: '/cookbook/getRecipe',
    inputSchema,
    handler,
    authentication: 'user',
    outputSchema
};
