import type { Request, Response } from 'express';
import { db } from '../../services/db';
import { GetRoute } from '../types';

const handler = async (_req: Request, res: Response) => {
    db.query('SELECT * FROM ChordFrequency ORDER BY count DESC', (err, rows) => {
        if (err) {
            throw err;
        }

        res.send(rows);
    });
};

export const route: GetRoute = {
    method: 'get',
    path: '/chords/getLinksVisitsCount',
    handler
};
