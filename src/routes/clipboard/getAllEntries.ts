import type { NextFunction, Request, Response } from 'express';
import { db } from '../../services/db';
import { GetRoute } from '../types';

const handler = async (_req: Request, res: Response, next: NextFunction) => {
    db.query(`SELECT * FROM Clipboard`, (err, rows) => {
        if (err) {
            return next(err);
        }
        res.json(rows);
    });
};

export const route: GetRoute = {
    method: 'get',
    path: '/clipboard/getAllEntries',
    handler,
    protected: true
};
