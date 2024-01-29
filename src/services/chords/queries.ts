import { RowDataPacket } from 'mysql2';
import { db } from '../db';
import { Chord } from './types';

export const addLinkVisit = async (params: { url: string }) => {
    return db.query(
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

const CHORDS_URL = 'https://raw.githubusercontent.com/statox/blog/master/src/_data/chords.json';
export const getAllChords = async (): Promise<Chord[]> => {
    const chords = await fetch(CHORDS_URL).then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
    });
    return chords;
};
