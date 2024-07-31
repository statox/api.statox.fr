import { File } from 'formidable';
import { PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import * as fs from 'fs';
import { PoolConnection } from 'mysql2/promise';
import { S3 } from '../../databases/s3';

export const createS3FileInTransaction = async (
    conn: PoolConnection, //TODO probably a better way to get just a transaction
    file: File,
    s3Key: string
) => {
    const bucket = 'clipboard';
    const fileStream = fs.createReadStream(file.filepath);
    const params: PutObjectCommandInput = {
        Bucket: bucket,
        Key: s3Key,
        Body: fileStream,
        ContentType: file.mimetype ?? undefined
    };

    await S3.send(new PutObjectCommand(params));
    await conn.query(
        `INSERT INTO S3Files (bucket, s3Key, creationDateUnix) VALUES (?, ?, UNIX_TIMESTAMP())`,
        [bucket, s3Key]
    );
};
