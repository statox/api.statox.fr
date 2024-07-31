import type { NextFunction, Request, Response } from 'express';
import { GetRoute } from '../types';
import { getEntryPresignedUrl } from '../../modules/reactor';

const handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const linkId = req.params.linkId;
        const s3PresignedUrl = await getEntryPresignedUrl({ linkId });
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
