import { PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { Chord } from './types.js';
import { S3 } from '../env-helpers/s3.js';
import { slog } from '../logging/index.js';

export const updateChords = async (chords: Chord[]) => {
    try {
        const params: PutObjectCommandInput = {
            Bucket: 'songbook',
            Key: 'index.json',
            Body: JSON.stringify(chords, null, 2),
            ContentType: 'application/json'
        };

        await S3.send(new PutObjectCommand(params));
    } catch (error) {
        slog.log({ message: 'Error while uploading file to s3', error: error as Error });
        return error;
    }
};
