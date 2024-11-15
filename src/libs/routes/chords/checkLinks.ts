import { FromSchema } from 'json-schema-to-ts';
import { checkChordsUrl } from '../../modules/chords';
import { EmptyInput, GetRoute } from '../types';

const handler = async () => {
    return checkChordsUrl();
};

const outputSchema = {
    type: 'object',
    properties: {
        nbChecks: {
            type: 'number'
        },
        nbSkipped: {
            type: 'number'
        },
        nbFails: {
            type: 'number'
        },
        timestamp: {
            type: 'number'
        },
        fails: {
            type: 'array',
            minItems: 0,
            items: {
                type: 'object',
                properties: {
                    status: {
                        type: 'string'
                    },
                    chord: {
                        type: 'object'
                    },
                    error: {
                        type: 'object'
                    }
                },
                required: ['status'],
                additionalProperties: false
            }
        }
    },
    required: ['nbChecks', 'nbSkipped', 'nbFails', 'timestamp', 'fails'],
    additionalProperties: false
} as const;

export const route: GetRoute<EmptyInput, FromSchema<typeof outputSchema>> = {
    method: 'get',
    path: '/chords/checkLinks',
    handler,
    authentication: 'none',
    outputSchema
};
