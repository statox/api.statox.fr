import { RowDataPacket } from 'mysql2/promise';
import { db } from '../env-helpers/db';
import { getPresignedUrl } from '../env-helpers/s3';

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
}

export const getEntriesForPublic = async () => {
    const [entries] = await db.query<DBReactorEntryForPublic[]>(
        'SELECT name, tags, creationDateUnix, s3Key FROM Reactor'
    );
    return await enrichEntries(entries);
};

const enrichEntries = async (entries: DBReactorEntryForPublic[]) => {
    const result: ReactorEntryForPublic[] = [];
    for (const entry of entries) {
        result.push({
            name: entry.name,
            tags: entry.tags ? entry.tags.split(',') : [],
            creationDateUnix: entry.creationDateUnix,
            s3PresignedUrl: await getPresignedUrl({ bucket: 'reactor', key: entry.s3Key })
        });
    }
    return result;
};
