import { File } from 'formidable';
import mime from 'mime-types';
import { db } from '../../databases/db.js';
import { ItemAlreadyExistsError } from '../../routes/errors.js';
import { generate4BytesHex } from '../random.js';
import { createS3FileInTransaction } from '../s3files/index.js';
import { QueryError } from 'mysql2/promise';
import { InvalidItemError } from './errors.js';

interface AddReadingListItemParams {
    name: string;
    tags: string[];
    comment?: string;
    link?: string;
    file?: File;
}

export const addEntry = async (params: AddReadingListItemParams) => {
    const { name, comment, tags, link, file } = params;

    if (!comment && !link && !file) {
        throw new InvalidItemError();
    }

    let s3Key: string | undefined;
    if (file) {
        const randomPrefix = generate4BytesHex();
        const extension = mime.extension(file.mimetype ?? '');
        s3Key = `${randomPrefix}_${name}`;

        if (extension) {
            s3Key += `.${extension}`;
        }
    }

    const conn = await db.getConnection();
    try {
        await conn.query(
            `
INSERT INTO ReadingList (name, comment, link, s3Key, tags, creationDateUnix)
VALUES (?, ?, ?, ?, ?, UNIX_TIMESTAMP())
`,
            [name, comment, link, s3Key, JSON.stringify(tags)]
        );

        if (file && s3Key) {
            await createS3FileInTransaction(conn, { file, bucket: 'reading-list', s3Key });
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
