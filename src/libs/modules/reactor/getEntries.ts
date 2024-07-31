import { RowDataPacket } from 'mysql2/promise';
import { db } from '../../databases/db';
import { getPresignedUrl } from '../../databases/s3';
import { slog } from '../logging';
import { ItemNotFoundError } from '../../routes/errors';

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

interface s3KeyResult extends RowDataPacket {
    s3Key: string;
}

class TooManyEntriesError extends Error {
    constructor() {
        super('TOO_MANY_ENTRIES');
    }
}

export const getEntryPresignedUrl = async (params: { linkId: string }) => {
    const [results] = await db.query<s3KeyResult[]>('SELECT s3Key FROM Reactor WHERE linkId = ?', [
        params.linkId
    ]);
    if (!results.length) {
        slog.log('reactor', 'entry not found', { linkId: params.linkId });
        throw new ItemNotFoundError();
    }
    if (results.length > 1) {
        slog.log('reactor', 'multiple entries with same linkId', { linkId: params.linkId });
        throw new TooManyEntriesError();
    }

    const { s3Key } = results.pop()!;
    return await getPresignedUrl({ bucket: 'reactor', key: s3Key });
};

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
                s3PresignedUrl: await getPresignedUrl({ bucket: 'reactor', key: entry.s3Key }),
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
