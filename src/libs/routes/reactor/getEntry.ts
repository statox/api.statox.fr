import type { Request } from 'express';
import { GetRoute } from '../types';
import { getRedirectForEntry } from '../../modules/reactor/getEntries';

const handler = async (req: Request) => {
    const linkId = req.params.linkId;
    return getRedirectForEntry(linkId);
};

export const route: GetRoute = {
    method: 'get',
    path: '/r/:linkId',
    handler,
    authentication: 'none',
    outputSchema: {
        type: 'string',
        description: 'A S3 presigned URL to redirect to'
    }
};
