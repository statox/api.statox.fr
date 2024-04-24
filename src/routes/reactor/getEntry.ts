import type { NextFunction, Request, Response } from 'express';
import { GetRoute } from '../types';
import { getEntryPresignedUrl } from '../../services/reactor';

const handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const linkId = req.params.linkId;
        const s3PresignedUrl = await getEntryPresignedUrl({ linkId });
        res.redirect(s3PresignedUrl);
    } catch (error) {
        const errorMessage = (error as Error).message;
        if (errorMessage === 'ENTRY_NOT_FOUND') {
            return res.status(404).json({ message: errorMessage });
        }
        next(error);
    }
};

export const route: GetRoute = {
    method: 'get',
    path: '/r/:linkId',
    handler
};
