import { RowDataPacket } from 'mysql2/promise';
import { db } from '../../databases/db.js';
import { slog } from '../logging/index.js';
import { getPresignedURLForKey } from '../s3files/index.js';
import { ItemNotFoundError, TooManyEntriesError } from '../../routes/errors.js';

interface DBReactorEntryForPublic extends RowDataPacket {
    name: string;
    tags: string;
    creationDateUnix: number;
    s3Key: string;
}
interface ReactorEntryForPublic {
    name: string;
    tags: string[];
    creationDateUnix: number;
    s3PresignedUrl: string;
    uri: string;
}

export const getEntriesForPublic = async () => {
    const [entries] = await db.query<DBReactorEntryForPublic[]>(
        'SELECT name, tags, creationDateUnix, s3Key, linkId FROM Reactor'
    );
    return await enrichEntries(entries);
};

const enrichEntries = async (entries: DBReactorEntryForPublic[]) => {
    const result: ReactorEntryForPublic[] = [];
    for (const entry of entries) {
        try {
            result.push({
                name: entry.name,
                tags: entry.tags ? JSON.parse(entry.tags) : [],
                creationDateUnix: entry.creationDateUnix,
                s3PresignedUrl: await getPresignedURLForKey({
                    bucket: 'reactor',
                    s3Key: entry.s3Key
                }),
                uri: `/r/${entry.linkId}`
            });
        } catch (error) {
            slog.log('reactor', 'error while enriching entry', {
                entryName: entry.name,
                error: error as Error
            });
        }
    }
    return result;
};

interface s3KeyResult extends RowDataPacket {
    s3Key: string;
}
export const getRedirectForEntry = async (linkId: string) => {
    const [results] = await db.query<s3KeyResult[]>(`SELECT s3Key FROM Reactor WHERE linkId = ?`, [
        linkId
    ]);
    if (!results.length) {
        slog.log('reactor', 'entry not found', { linkId });
        throw new ItemNotFoundError();
    }
    if (results.length > 1) {
        slog.log('reactor', 'multiple entries with same linkId', { linkId });
        throw new TooManyEntriesError();
    }

    const { s3Key } = results.pop()!;
    return getPresignedURLForKey({ bucket: 'reactor', s3Key });
};
