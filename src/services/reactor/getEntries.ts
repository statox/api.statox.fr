import { RowDataPacket } from 'mysql2/promise';
import { db } from '../env-helpers/db';
import { getPresignedUrl } from '../env-helpers/s3';
import { logErrorToSlack, logMessageToSlack } from '../logging/slack';

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
export const getEntryPresignedUrl = async (params: { linkId: string }) => {
    const [results] = await db.query<s3KeyResult[]>('SELECT s3Key FROM Reactor WHERE linkId = ?', [
        params.linkId
    ]);
    if (!results.length) {
        logMessageToSlack('Error: Reactor entry with linkId not found: ' + params.linkId);
        throw new Error('ENTRY_NOT_FOUND');
    }
    if (results.length > 1) {
        logMessageToSlack('Error: Reactor multiple entries with linkId: ' + params.linkId);
        throw new Error('TOO_MANY_ENTRIES');
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
            logMessageToSlack('Error while enriching reactor entry ' + entry.name);
            logErrorToSlack(error as Error);
        }
    }
    return result;
};
