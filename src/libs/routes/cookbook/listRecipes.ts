import { FromSchema } from 'json-schema-to-ts';
import { EmptyInput, GetRoute } from '../types.js';
import { listRecipes } from '../../modules/cookbook/index.js';

const handler = async () => {
    const recipes = await listRecipes();
    return { recipes };
};

const outputSchema = {
    type: 'object',
    properties: {
        recipes: {
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
                    },
                    creationDateUnix: {
                        type: 'number'
                    },
                    updateDateUnix: {
                        type: 'number'
                    }
                },
                required: ['id', 'name', 'creationDateUnix', 'updateDateUnix'],
                additionalProperties: false
            }
        }
    },
    required: ['recipes'],
    additionalProperties: false
} as const;

export const route: GetRoute<EmptyInput, FromSchema<typeof outputSchema>> = {
    method: 'get',
    path: '/cookbook/listRecipes',
    handler,
    authentication: 'user',
    outputSchema
};
