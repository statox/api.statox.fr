import { FromSchema } from 'json-schema-to-ts';
import { EmptyInput, GetRoute } from '../types.js';
import { getNewGame } from '../../modules/gravitrips/index.js';

const handler = async () => {
    return { gameId: getNewGame() };
};

const outputSchema = {
    type: 'object',
    properties: {
        gameId: { type: 'string' }
    }
} as const;

export const route: GetRoute<EmptyInput, FromSchema<typeof outputSchema>> = {
    method: 'get',
    path: '/gravitrips/getNewGame',
    handler,
    authentication: 'none',
    outputSchema
};
