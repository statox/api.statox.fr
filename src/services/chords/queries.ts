import { Callback, CallbackErrorOnly } from '../../tsUtils';
import { db } from '../db';

export const addLinkVisit = (params: { url: string }, cb: CallbackErrorOnly) => {
    db.query(
        `INSERT INTO ChordFrequency (url, count, lastAccessDateUnix)
VALUES (?, 1, UNIX_TIMESTAMP())
ON DUPLICATE KEY UPDATE count = count+1, lastAccessDateUnix = UNIX_TIMESTAMP()
`,
        [params.url],
        (error) => {
            if (error) {
                return cb(new Error(error.code));
            }
            cb();
        }
    );
};

type ChordVisitItem = {
    url: string;
    count: number;
    lastAccessDateUnix: number;
};
export const getLinksVisitsCount = (cb: Callback<ChordVisitItem>) => {
    db.query('SELECT * FROM ChordFrequency ORDER BY count DESC', (error, rows) => {
        if (error) {
            return cb(new Error(error.code));
        }
        return cb(null, rows);
    });
};
