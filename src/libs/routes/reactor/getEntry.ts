import type { NextFunction, Request, Response } from 'express';
import { GetRoute } from '../types';
import { getRedirectForEntry } from '../../modules/reactor/getEntries';

const handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const linkId = req.params.linkId;
        const s3PresignedUrl = await getRedirectForEntry(linkId);
        res.redirect(s3PresignedUrl);
    } catch (error) {
        next(error);
    }
};

export const route: GetRoute = {
    method: 'get',
    path: '/r/:linkId',
    handler,
    authentication: 'none'
};
