import { File } from 'formidable';
import mime from 'mime-types';
import { generate4BytesHex } from '../random.js';
import { db } from '../../databases/db.js';
import { createS3FileInTransaction } from '../s3files/index.js';
import { QueryError } from 'mysql2/promise';
import { ItemAlreadyExistsError } from '../../routes/errors.js';

type NewEntryParams = {
    name: string;
    content?: string;
    ttlSeconds?: number;
    isPublic?: boolean;
    file?: File;
};

export const addEntry = async (newEntry: NewEntryParams) => {
    const DEFAULT_TTL = 60 * 5; // 5 MINUTES
    const { name, content, ttlSeconds = DEFAULT_TTL, isPublic = false, file } = newEntry;

    const linkId = generate4BytesHex();

    let s3Key: string | undefined = undefined;
    if (file) {
        const extension = mime.extension(file.mimetype ?? '');

        s3Key = `${linkId}_${name}`;

        if (extension) {
            s3Key += `.${extension}`;
        }
    }

    const conn = await db.getConnection();
    conn.beginTransaction();
    try {
        await conn.query(
            `
INSERT INTO Clipboard (name, content, ttl, isPublic, linkId, s3Key, creationDateUnix)
VALUES (?, ?, ?, ?, ?, ?, UNIX_TIMESTAMP())
`,
            [name, content, ttlSeconds, isPublic, linkId, s3Key]
        );

        if (file && s3Key) {
            await createS3FileInTransaction(conn, { file, bucket: 'clipboard', s3Key });
        }

        return conn.commit();
    } catch (error) {
        await conn.rollback();
        if ((error as QueryError).code === 'ER_DUP_ENTRY') {
            throw new ItemAlreadyExistsError();
        }
        throw error;
    } finally {
        conn.release();
    }
};
