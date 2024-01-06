import { Callback, CallbackErrorOnly } from '../tsUtils';
import { File } from 'formidable';
import { db } from './db';
import { generate4BytesHex } from './random';
import {
    GetObjectCommand,
    ListBucketsCommand,
    PutObjectCommand,
    PutObjectCommandInput
} from '@aws-sdk/client-s3';
import * as crypto from 'crypto';
import * as fs from 'fs';
import { S3 } from './s3';

type ClipboardEntry = {
    id: number;
    name: string;
    content: string;
    creationDateUnix: number;
    ttl: number;
    isPublic: boolean;
    linkId: string;
};

export const getPublicEntries = (cb: Callback<ClipboardEntry>) => {
    db.query(
        `SELECT * FROM Clipboard
WHERE isPublic = 1
AND creationDateUnix + ttl > UNIX_TIMESTAMP() `,
        cb
    );
};

export const getAllEntries = (cb: Callback<ClipboardEntry>) => {
    db.query(`SELECT * FROM Clipboard`, cb);
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
        const uuid = crypto.randomUUID();
        const fileStream = fs.createReadStream(file.filepath);

        s3Key = `${uuid}_${name}`;
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
