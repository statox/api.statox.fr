import { PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { getAllChords } from './queries';
import { Chord } from './types';
import { S3 } from '../s3';

export const addNewChord = async (chord: Chord) => {
    try {
        const allChords = await getAllChords();
        allChords.unshift(chord);

        const params: PutObjectCommandInput = {
            Bucket: 'songbook',
            Key: 'index.json',
            Body: JSON.stringify(allChords, null, 2),
            ContentType: 'application/json'
        };

        await S3.send(new PutObjectCommand(params));
    } catch (error) {
        console.log('Error while uploading file to s3', error);
        return error;
    }
};
