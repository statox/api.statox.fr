import { FromSchema } from 'json-schema-to-ts';
import { EmptyInput, GetRoute } from '../types.js';
import { getNowSec } from '../../modules/monitoring/getRemoteTime.js';

const handler = async () => {
    return await getNowSec();
};

const outputSchema = {
    type: 'number'
} as const;

export const route: GetRoute<EmptyInput, FromSchema<typeof outputSchema>> = {
    method: 'get',
    path: '/health/getRemoteTime',
    handler,
    authentication: 'none',
    outputSchema
};
