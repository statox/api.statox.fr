import { File } from 'formidable';
import { PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import mime from 'mime-types';
import * as fs from 'fs';
import { generate4BytesHex } from '../random';
import { S3 } from '../../databases/s3';
import { db } from '../../databases/db';
import { ItemAlreadyExistsError } from '../../routes/errors';
import { QueryError } from 'mysql2/promise';

type NewEntryParams = {
    name: string;
    tags: string[];
    file: File;
};

export const addEntry = async (newEntry: NewEntryParams) => {
    const { name, tags, file } = newEntry;

    const linkId = generate4BytesHex();

    const fileStream = fs.createReadStream(file.filepath);
    const extension = mime.extension(file.mimetype ?? '');

    let s3Key = `${linkId}_${name}`;

    if (extension) {
        s3Key += `.${extension}`;
    }

    const params: PutObjectCommandInput = {
        Bucket: 'reactor',
        Key: s3Key,
        Body: fileStream,
        ContentType: file.mimetype ?? undefined
    };

    const conn = await db.getConnection();
    try {
        await conn.query(
            `INSERT INTO Reactor (name, tags, linkId, s3Key, creationDateUnix) VALUES (?, ?, ?, ?, UNIX_TIMESTAMP())`,
            [name, JSON.stringify(tags), linkId, s3Key]
        );
        await S3.send(new PutObjectCommand(params));
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
