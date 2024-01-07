import { Callback, CallbackErrorOnly } from '../tsUtils';
import { File } from 'formidable';
import { db } from './db';
import { generate4BytesHex } from './random';
import { PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import * as crypto from 'crypto';
import * as fs from 'fs';
import { S3, getPresignedUrl } from './s3';

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

export const getPublicEntries = (cb: Callback<ClipboardEntry[]>) => {
    db.query(
        `SELECT * FROM Clipboard
WHERE isPublic = 1
AND creationDateUnix + ttl > UNIX_TIMESTAMP() `,
        async (error, result) => {
            if (error) {
                return cb(error);
            }
            return cb(null, await enrichEntries(result));
        }
    );
};

export const getAllEntries = (cb: Callback<ClipboardEntry[]>) => {
    db.query(`SELECT * FROM Clipboard`, async (error, result) => {
        if (error) {
            return cb(error);
        }
        return cb(null, await enrichEntries(result));
    });
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

export const getEntriesForStaticView = (cb: Callback<ClipboardEntryForStaticView[]>) => {
    getPublicEntries((error, entries) => {
        if (error) {
            return cb(error);
        }
        if (!entries) {
            return [];
        }

        const entriesWithS3Link = entries
            .map((e) => {
                let contentIsLink = false;
                try {
                    new URL(e.content);
                    contentIsLink = true;
                } catch (_e) {
                    contentIsLink = false;
                }
                return { ...e, contentIsLink };
            })
            .filter((e) => e.s3PresignedUrl || e.contentIsLink);
        return cb(null, entriesWithS3Link);
    });
};

export const getEntryFilePresignedURL = async (entry: ClipboardEntry) => {
    if (!entry.s3Key) {
        return;
    }

    return await getPresignedUrl({ bucket: 'clipboard', key: entry.s3Key });
};

export const deleteEntry = (params: { name: string }, cb: CallbackErrorOnly) => {
    db.query(`DELETE FROM Clipboard WHERE name = ?`, [params.name], (error) => {
        if (error) {
            return cb(new Error(error.code));
        }
        cb();
    });
};

type NewEntryParams = {
    name: string;
    content: string;
    ttlSeconds?: number;
    isPublic?: boolean;
    file?: File;
};
export const addEntry = async (newEntry: NewEntryParams, cb: CallbackErrorOnly) => {
    const DEFAULT_TTL = 60 * 5; // 5 MINUTES
    const { name, content, ttlSeconds = DEFAULT_TTL, isPublic = false, file } = newEntry;

    const linkId = generate4BytesHex();

    let s3Key: string | undefined = undefined;
    if (file) {
        // const uuid = crypto.randomUUID();
        const fileStream = fs.createReadStream(file.filepath);

        s3Key = `${linkId}_${name}`;
        const params: PutObjectCommandInput = {
            Bucket: 'clipboard',
            Key: s3Key,
            Body: fileStream,
            ContentType: file.mimetype ?? undefined
        };
        try {
            await S3.send(new PutObjectCommand(params));
        } catch (err) {
            console.log('Error while uploading file to s3', err);
            return cb(new Error('s3_upload_failed'));
        }
    }

    db.query(
        `
        INSERT INTO Clipboard (name, content, ttl, isPublic, linkId, s3Key, creationDateUnix)
        VALUES (?, ?, ?, ?, ?, ?, UNIX_TIMESTAMP())
    `,
        [name, content, ttlSeconds, isPublic, linkId, s3Key],
        (error) => {
            if (error) {
                return cb(new Error(error.code));
            }
            cb();
        }
    );
};
