import type { NextFunction, Request, Response } from 'express';
import { db } from '../../services/db';
import { GetRoute } from '../types';

const handler = async (_req: Request, res: Response, next: NextFunction) => {
    db.query(
        `
        SELECT * FROM Clipboard
        WHERE isPublic = 1
        AND creationDateUnix + ttl > UNIX_TIMESTAMP()
    `,
        (err, entries) => {
            if (err) {
                return next(err);
            }
            res.render('clipboard', { entries });
        }
    );
};

export const route: GetRoute = {
    method: 'get',
    path: '/clipboard/view',
    handler
};
