import { GetRoute } from '../types';

const handler = async () => {
    return { time: Date.now() };
};

export const route: GetRoute = {
    method: 'get',
    path: '/health/getRemoteTime',
    handler,
    authentication: 'none',
    outputSchema: {
        type: 'object',
        properties: {
            time: {
                type: 'number'
            }
        },
        required: ['time'],
        additionalProperties: false
    }
};
