import { db } from '../../databases/db';
import { RowDataPacket } from 'mysql2/promise';
import { getPresignedURLForKey } from '../s3files';
import { slog } from '../logging';

interface ReadingListItemDB extends RowDataPacket {
    id: number;
    creationDateUnix: number;
    name: string;
    comment: string;
    link: string;
    s3Key: string;
    tagsStr: string;
}

interface ReadingListItemResponse {
    id: number;
    creationDateUnix: number;
    name: string;
    comment?: string;
    link?: string;
    s3PresignedUrl?: string;
    tags: string[];
}

export const getAllEntries = async () => {
    const [rows] = await db.query<ReadingListItemDB[]>(`
        SELECT
            id,
            creationDateUnix,
            name,
            comment,
            link,
            s3Key,
            tags as tagsStr
        FROM ReadingList
    `);

    return enrichEntries(rows);
};

const enrichEntries = async (entries: ReadingListItemDB[]) => {
    const result: ReadingListItemResponse[] = [];
    for (const entry of entries) {
        try {
            result.push({
                id: entry.id,
                creationDateUnix: entry.creationDateUnix,
                name: entry.name,
                comment: entry.comment,
                link: entry.link,
                tags: entry.tagsStr ? JSON.parse(entry.tagsStr) : [],
                s3PresignedUrl: entry.s3Key
                    ? await getPresignedURLForKey({
                          bucket: 'reading-list',
                          s3Key: entry.s3Key
                      })
                    : undefined
            });
        } catch (error) {
            slog.log('readingList', 'error while enriching entry', {
                entryName: entry.name,
                error: error as Error
            });
        }
    }
    return result;
};
