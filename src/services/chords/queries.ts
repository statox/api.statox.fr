import { RowDataPacket } from 'mysql2';
import { db } from '../db';

export const addLinkVisit = async (params: { url: string }) => {
    db.query(
        `
INSERT INTO ChordFrequency (url, count, lastAccessDateUnix)
VALUES (?, 1, UNIX_TIMESTAMP())
ON DUPLICATE KEY UPDATE count = count+1, lastAccessDateUnix = UNIX_TIMESTAMP()
`,
        [params.url]
    );
};

type ChordVisitItem = {
    url: string;
    count: number;
    lastAccessDateUnix: number;
};
export const getLinksVisitsCount = async () => {
    const [rows] = await db.query<RowDataPacket[]>(
        'SELECT * FROM ChordFrequency ORDER BY count DESC'
    );
    return rows as ChordVisitItem[];
};
