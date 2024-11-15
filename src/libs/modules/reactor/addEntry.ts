import { File } from 'formidable';
import mime from 'mime-types';
import { generate4BytesHex } from '../random.js';
import { db } from '../../databases/db.js';
import { ItemAlreadyExistsError } from '../../routes/errors.js';
import { QueryError } from 'mysql2/promise';
import { createS3FileInTransaction } from '../s3files/index.js';

type NewEntryParams = {
    name: string;
    tags: string[];
    file: File;
};

export const addEntry = async (newEntry: NewEntryParams) => {
    const { name, tags, file } = newEntry;

    const linkId = generate4BytesHex();
    const extension = mime.extension(file.mimetype ?? '');

    let s3Key = `${linkId}_${name}`;
    if (extension) {
        s3Key += `.${extension}`;
    }

    const conn = await db.getConnection();
    try {
        await conn.query(
            `INSERT INTO Reactor (name, tags, linkId, s3Key, creationDateUnix) VALUES (?, ?, ?, ?, UNIX_TIMESTAMP())`,
            [name, JSON.stringify(tags), linkId, s3Key]
        );

        await createS3FileInTransaction(conn, { file, bucket: 'reactor', s3Key });
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
