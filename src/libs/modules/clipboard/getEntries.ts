import { db } from '../../databases/db.js';
import { getPresignedURLForKey } from '../s3files/index.js';

type ClipboardEntry = {
    id: number;
    name: string;
    content: string;
    creationDateUnix: number;
    ttl: number;
    isPublic: boolean;
    linkId: string;
    s3Key?: string;
    s3PresignedUrl?: string;
};

export const getPublicEntries = async () => {
    const [entries] = await db.query(
        `SELECT
            id, name, content, creationDateUnix, ttl, isPublic, linkId, s3Key
        FROM Clipboard
        WHERE isPublic = 1
        AND creationDateUnix + ttl > UNIX_TIMESTAMP()
`
    );
    return await enrichEntries(entries as ClipboardEntry[]);
};

export const getAllEntries = async () => {
    const [entries] = await db.query(
        `SELECT
            id, name, content, creationDateUnix, ttl, isPublic, linkId, s3Key
        FROM Clipboard`
    );
    return await enrichEntries(entries as ClipboardEntry[]);
};

const enrichEntries = async (entries: ClipboardEntry[]) => {
    for (const entry of entries) {
        if (entry.s3Key) {
            entry.s3PresignedUrl = await getPresignedURLForKey({
                bucket: 'clipboard',
                s3Key: entry.s3Key
            });
        }
    }
    return entries;
};

type ClipboardEntryForStaticView = ClipboardEntry & {
    contentIsLink: boolean;
};

export const getEntriesForStaticView = async () => {
    const entries = await getPublicEntries();
    if (!entries) {
        return [];
    }

    const result: ClipboardEntryForStaticView[] = [];
    // Sort to have the newest entries at the top of the list
    for (const entry of entries.sort((a, b) => b.id - a.id)) {
        let contentIsLink = false;
        try {
            new URL(entry.content);
            contentIsLink = true;
        } catch (_e) {
            contentIsLink = false;
        }

        if (!entry.s3PresignedUrl && !contentIsLink) {
            continue;
        }
        result.push({ ...entry, contentIsLink });
    }
    return result;
};
