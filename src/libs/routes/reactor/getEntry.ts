import { FromSchema } from 'json-schema-to-ts';
import { GetRoute, RouteHandler } from '../types';
import { getRedirectForEntry } from '../../modules/reactor/getEntries';

const handler: RouteHandler<Input> = async (params) => {
    return getRedirectForEntry(params.input.linkId);
};

type Input = {
    linkId: string;
};

const outputSchema = {
    type: 'string',
    description: 'A S3 presigned URL to redirect to'
} as const;

export const route: GetRoute<Input, FromSchema<typeof outputSchema>> = {
    method: 'get',
    path: '/r/:linkId',
    handler,
    authentication: 'none',
    outputSchema
};
