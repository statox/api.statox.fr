import { File } from 'formidable';
import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import * as fs from 'fs';
import { PoolConnection, RowDataPacket } from 'mysql2/promise';
import { getPresignedUrl, S3 } from '../../databases/s3';
import { db } from '../../databases/db';
import { ExpiredItemError, ItemNotFoundError, TooManyEntriesError } from '../../routes/errors';
import { slog } from '../logging';

type ManagedBuckets = 'clipboard' | 'reactor';

export const createS3FileInTransaction = async (
    conn: PoolConnection, //TODO probably a better way to get just a transaction
    params: {
        file: File;
        bucket: ManagedBuckets;
        s3Key: string;
    }
) => {
    const { file, bucket, s3Key } = params;
    const fileStream = fs.createReadStream(file.filepath);

    await S3.send(
        new PutObjectCommand({
            Bucket: bucket,
            Key: s3Key,
            Body: fileStream,
            ContentType: file.mimetype ?? undefined
        })
    );
    await conn.query(
        `INSERT INTO S3Files (bucket, s3Key, creationDateUnix) VALUES (?, ?, UNIX_TIMESTAMP())`,
        [bucket, s3Key]
    );
};

// TODO: Decide if we want to use a transaction or not
export const deleteS3File = async (params: { bucket: ManagedBuckets; s3Key: string }) => {
    const { bucket, s3Key } = params;
    await S3.send(
        new DeleteObjectCommand({
            Bucket: bucket,
            Key: s3Key
        })
    );
    await db.query(
        'UPDATE S3Files SET deletionDateUnix = UNIX_TIMESTAMP() WHERE s3Key = ? AND bucket = ?',
        [s3Key, bucket]
    );
};

interface s3FileResult extends RowDataPacket {
    s3Key: string;
    deletionDateUnix?: number;
}
export const getPresignedURLForKey = async (params: { bucket: ManagedBuckets; s3Key: string }) => {
    const { bucket, s3Key } = params;
    const [rows] = await db.query<s3FileResult[]>(
        'SELECT s3Key, deletionDateUnix FROM S3Files WHERE s3Key = ? AND bucket = ?',
        [s3Key, bucket]
    );

    if (!rows.length) {
        throw new ItemNotFoundError();
    }
    if (rows.length > 1) {
        slog.log('s3Files', 'multiple entries with same s3Key', { s3Key, bucket });
        throw new TooManyEntriesError();
    }
    if (rows[0].deletionDateUnix) {
        throw new ExpiredItemError();
    }

    return getPresignedUrl({ bucket: 'clipboard', key: s3Key });
};
