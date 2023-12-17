import type { Request, Response } from 'express';
import { db } from '../services/db';

// curl http://localhost:3000/addChordLinkVisit -XPOST -H Content-Type:application/json --data '{"url": "http://foo.bar"}'

const handler = async (req: Request, res: Response) => {
    const { url } = req.body;
    console.log('Adding visit to', url);
    db.query(
        `INSERT INTO ChordFrequency (url, count, lastAccessDateUnix)
        VALUES (?, 1, UNIX_TIMESTAMP())
        ON DUPLICATE KEY UPDATE count = count+1, lastAccessDateUnix = UNIX_TIMESTAMP()
    `,
        [url],
        (err, rows) => {
            if (err) {
                throw err;
            }

            res.send(rows);
        }
    );
};

export const route = {
    method: 'post',
    path: '/addChordLinkVisit',
    handler
};
