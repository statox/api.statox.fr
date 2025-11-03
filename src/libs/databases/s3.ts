import {
    CreateBucketCommand,
    GetObjectCommand,
    ListBucketsCommand,
    PutObjectCommand,
    S3Client
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { config } from '../../packages/config/index.js';
import { AwsClientStub, mockClient } from 'aws-sdk-client-mock';

const { isProd, isTests } = config.env;

export let s3Mock: AwsClientStub<S3Client>;
if (isTests) {
    console.log('mocking s3');
    s3Mock = mockClient(S3Client);
}

export const S3 = new S3Client({
    region: isProd ? 'auto' : 'eu-west-1',
    endpoint: config.r2.endpoint,
    credentials: {
        accessKeyId: config.r2.accessKeyId,
        secretAccessKey: config.r2.secretKey
    }
});

export const getPresignedUrl = async (params: { bucket: string; key: string }) => {
    const cmd = new GetObjectCommand({ Bucket: params.bucket, Key: params.key });
    const url = await getSignedUrl(S3, cmd, { expiresIn: 3600 });
    return url;
};

const requiredBuckets = ['clipboard', 'reactor', 'songbook'];
const requiredFiles = [
    {
        bucket: 'songbook',
        key: 'index.json',
        body: JSON.stringify([
            {
                artist: 'Georges Brassens',
                title: 'Les passantes (tabs)',
                url: 'https://www.songsterr.com/a/wsa/georges-brassens-les-passantes-tab-s3388t2',
                creationDate: 1706554264939,
                tags: ['slow', 'chill', 'romantic']
            },
            {
                artist: 'Georges Brassens',
                title: 'Les passantes (chords)',
                url: 'https://tabs.ultimate-guitar.com/tab/georges-brassens/les-passantes-chords-1429512',
                creationDate: 1706554225305,
                tags: ['slow', 'chill', 'romantic']
            },
            {
                artist: 'Wendy Rene',
                title: 'After Laughter',
                url: 'https://tabs.ultimate-guitar.com/tab/wendy-rene/after-laughter-chords-1746557',
                creationDate: 1706114634304,
                tags: ['slow', 'reggae', 'vocal', 'sad']
            },
            {
                artist: 'The Statler Brothers',
                title: 'Flowers On The Wall Chords',
                url: 'https://tabs.ultimate-guitar.com/tab/the-statler-brothers/flowers-on-the-wall-chords-913105',
                creationDate: 1705586309487,
                tags: ['happy', 'quick', 'country']
            },
            {
                artist: 'Strawbs',
                title: 'Part of the union',
                url: 'https://tabs.ultimate-guitar.com/tab/strawbs/part-of-the-union-chords-1489944',
                creationDate: 1704980365234,
                tags: ['happy', 'loud']
            },
            {
                artist: 'Leonard Cohen',
                title: 'Suzanne',
                url: 'https://tabs.ultimate-guitar.com/tab/leonard-cohen/suzanne-chords-29753',
                creationDate: 1703784188371,
                tags: []
            },
            {
                artist: 'Rodriguez',
                title: 'Sugar man',
                url: 'https://tabs.ultimate-guitar.com/tab/rodriguez/sugar-man-chords-811245',
                creationDate: 1702292191027,
                tags: []
            },
            {
                artist: 'Talking heads',
                title: 'Psycho killer',
                url: 'https://tabs.ultimate-guitar.com/tab/talking-heads/psycho-killer-chords-435224',
                creationDate: 1702292041917,
                tags: []
            }
        ])
    }
];
export const initLocalStackS3 = async () => {
    if (isProd) {
        console.log('dont init local s3 we are in prod');
        return;
    }
    if (isTests) {
        console.log('dont init local s3 we are in tests');
        return;
    }

    console.log('S3 init - Check buckets to create');
    const listResponse = await S3.send(new ListBucketsCommand({}));
    const existingBuckets = listResponse.Buckets || [];

    const bucketsNotCreated = requiredBuckets.filter(
        (required) => !existingBuckets.map((b) => b.Name).includes(required)
    );

    for (const bucket of bucketsNotCreated) {
        console.log('S3 init - Create bucket', bucket);
        await S3.send(new CreateBucketCommand({ Bucket: bucket }));
    }

    for (const file of requiredFiles) {
        console.log('S3 init - Create required file', `${file.bucket}/${file.key}`);
        const cmd = new PutObjectCommand({
            Bucket: file.bucket,
            Key: file.key,
            Body: Buffer.from(file.body)
        });
        await S3.send(cmd);
    }
};
