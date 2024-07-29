import { PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { Chord } from './types';
import { S3 } from '../../databases/s3';
import { slog } from '../logging';

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
        slog.log('chords', 'Error while uploading to s3', { error: error as Error });
        return error;
    }
};
