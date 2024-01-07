import { db } from '../db';
import { getPresignedUrl } from '../s3';

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
        `SELECT * FROM Clipboard
WHERE isPublic = 1
AND creationDateUnix + ttl > UNIX_TIMESTAMP() `
    );
    return await enrichEntries(entries as ClipboardEntry[]);
};

export const getAllEntries = async () => {
    const [entries] = await db.query(`SELECT * FROM Clipboard`);
    return await enrichEntries(entries as ClipboardEntry[]);
};

const enrichEntries = async (entries: ClipboardEntry[]) => {
    for (const entry of entries) {
        if (entry.s3Key) {
            entry.s3PresignedUrl = await getEntryFilePresignedURL(entry);
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
    for (const entry of entries) {
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

const getEntryFilePresignedURL = async (entry: ClipboardEntry) => {
    if (!entry.s3Key) {
        return;
    }

    return await getPresignedUrl({ bucket: 'clipboard', key: entry.s3Key });
};
