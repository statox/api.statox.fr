import { GetObjectCommand } from '@aws-sdk/client-s3';
import { RowDataPacket } from 'mysql2';
import { Chord } from './types';
import { db } from '../env-helpers/db';
import { S3 } from '../env-helpers/s3';
import { slog } from '../logging';

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
        'SELECT url, count, lastAccessDateUnix FROM ChordFrequency ORDER BY count DESC'
    );
    return rows as ChordVisitItem[];
};

export const getAllChords = async (): Promise<Chord[]> => {
    const cmd = new GetObjectCommand({ Bucket: 'songbook', Key: 'index.json' });
    try {
        const res = await S3.send(cmd);
        const str = await res.Body?.transformToString();
        if (!str) {
            throw new Error('Empty chords file');
        }

        return JSON.parse(str);
    } catch (error) {
        slog.log('chords', 'Error getting all chords from S3', { error: error as Error });
        throw error;
    }
};
