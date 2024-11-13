import { GetRoute, RouteHandler } from '../types';
import { getRedirectForEntry } from '../../modules/reactor/getEntries';

const handler: RouteHandler<Input> = async (params) => {
    return getRedirectForEntry(params.input.linkId);
};

type Input = {
    linkId: string;
};

export const route: GetRoute<Input> = {
    method: 'get',
    path: '/r/:linkId',
    handler,
    authentication: 'none',
    outputSchema: {
        type: 'string',
        description: 'A S3 presigned URL to redirect to'
    }
};
