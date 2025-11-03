import { FromSchema } from 'json-schema-to-ts';
import { EmptyInput, GetRoute } from '../types.js';
import { listIngredients } from '../../modules/cookbook/index.js';

const handler = async () => {
    const ingredients = await listIngredients();
    return { ingredients };
};

const outputSchema = {
    type: 'object',
    properties: {
        ingredients: {
            type: 'array',
            minItems: 0,
            items: {
                type: 'object',
                properties: {
                    id: {
                        type: 'number'
                    },
                    name: {
                        type: 'string'
                    }
                },
                required: ['id', 'name'],
                additionalProperties: false
            }
        }
    },
    required: ['ingredients'],
    additionalProperties: false
} as const;

export const route: GetRoute<EmptyInput, FromSchema<typeof outputSchema>> = {
    method: 'get',
    path: '/cookbook/listIngredients',
    handler,
    authentication: 'user2',
    outputSchema
};
