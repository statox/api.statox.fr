import { FromSchema } from 'json-schema-to-ts';
import { EmptyOutput, PostRoute, RouteHandler } from '../types.js';
import { emptyObjectSchema } from '../helpers.js';
import { addRecipe } from '../../modules/cookbook/index.js';

const handler: RouteHandler<Input> = async (params) => {
    const { name, content, ingredients } = params.input;

    await addRecipe({ name, content, ingredients }, params.loggableContext);
};

const inputSchema = {
    type: 'object',
    required: ['name', 'content', 'ingredients'],
    additionalProperties: false,
    properties: {
        name: {
            type: 'string'
        },
        content: {
            type: 'string'
        },
        ingredients: {
            type: 'array',
            items: {
                type: 'object',
                required: ['name'],
                additionalProperties: false,
                properties: {
                    name: {
                        type: 'string'
                    },
                    quantity: {
                        type: 'number'
                    },
                    unit: {
                        type: 'string'
                    }
                }
            }
        }
    }
} as const;

type Input = FromSchema<typeof inputSchema>;

export const route: PostRoute<Input, EmptyOutput> = {
    method: 'post',
    path: '/cookbook/addRecipe',
    inputSchema,
    handler,
    authentication: 'user2',
    outputSchema: emptyObjectSchema
};
