import { File } from 'formidable';
import { PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import mime from 'mime-types';
import * as fs from 'fs';
import { S3 } from '../s3';
import { generate4BytesHex } from '../random';
import { db } from '../db';

type NewEntryParams = {
    name: string;
    content: string;
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
        const fileStream = fs.createReadStream(file.filepath);
        const extension = mime.extension(file.mimetype ?? '');

        s3Key = `${linkId}_${name}`;

        if (extension) {
            s3Key += `.${extension}`;
        }

        const params: PutObjectCommandInput = {
            Bucket: 'clipboard',
            Key: s3Key,
            Body: fileStream,
            ContentType: file.mimetype ?? undefined
        };

        try {
            await S3.send(new PutObjectCommand(params));
        } catch (error) {
            console.log('Error while uploading file to s3', error);
            return error;
        }
    }

    return db.query(
        `
INSERT INTO Clipboard (name, content, ttl, isPublic, linkId, s3Key, creationDateUnix)
VALUES (?, ?, ?, ?, ?, ?, UNIX_TIMESTAMP())
`,
        [name, content, ttlSeconds, isPublic, linkId, s3Key]
    );
};
