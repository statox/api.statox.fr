import { checkChordsUrl } from '../../modules/chords';
import { GetRoute } from '../types';

const handler = async () => {
    return checkChordsUrl();
};

export const route: GetRoute = {
    method: 'get',
    path: '/chords/checkLinks',
    handler,
    authentication: 'none',
    outputSchema: {
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
        },
        required: ['nbChecks', 'nbSkipped', 'nbFails', 'timestamp', 'fails'],
        additionalProperties: false
    }
};
