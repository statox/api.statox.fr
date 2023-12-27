import { Callback, CallbackErrorOnly } from '../tsUtils';
import { db } from './db';
import { generate4BytesHex } from './random';

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
};
export const addEntry = (newEntry: NewEntryParams, cb: CallbackErrorOnly) => {
    const DEFAULT_TTL = 60 * 5; // 5 MINUTES
    const { name, content, ttlSeconds = DEFAULT_TTL, isPublic = false } = newEntry;

    const linkId = generate4BytesHex();

    db.query(
        `
        INSERT INTO Clipboard (name, content, ttl, isPublic, linkId, creationDateUnix)
        VALUES (?, ?, ?, ?, ?, UNIX_TIMESTAMP())
    `,
        [name, content, ttlSeconds, isPublic, linkId],
        (error) => {
            if (error) {
                return cb(new Error(error.code));
            }
            cb();
        }
    );
};
