import {
    CreateBucketCommand,
    GetObjectCommand,
    ListBucketsCommand,
    S3Client
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { isProd } from './env';

const R2_ACCESS_KEY_ID = isProd ? process.env.R2_ACCESS_KEY_ID : 'test';
const R2_SECRET_KEY = isProd ? process.env.R2_SECRET_KEY : 'test';
const R2_ENDPOINT = isProd ? process.env.R2_ENDPOINT : 'http://127.0.0.1:4566';

if (!R2_ENDPOINT || !R2_SECRET_KEY || !R2_ACCESS_KEY_ID) {
    throw new Error('Missing R2 config env variable');
}

export const S3 = new S3Client({
    region: isProd ? 'auto' : 'eu-west-1',
    endpoint: R2_ENDPOINT,
    credentials: {
        accessKeyId: R2_ACCESS_KEY_ID,
        secretAccessKey: R2_SECRET_KEY
    }
});

export const getPresignedUrl = async (params: { bucket: string; key: string }) => {
    const cmd = new GetObjectCommand({ Bucket: params.bucket, Key: params.key });
    const url = await getSignedUrl(S3, cmd, { expiresIn: 3600 });
    return url;
};

const requiredBuckets = ['clipboard'];
export const initLocalStackS3 = async () => {
    if (isProd) {
        console.log('dont init local s3 we are in prod');
        return;
    }

    console.log('init localstack s3');
    const listResponse = await S3.send(new ListBucketsCommand({}));
    const existingBuckets = listResponse.Buckets || [];

    const bucketsNotCreated = requiredBuckets.filter(
        (required) => !existingBuckets.map((b) => b.Name).includes(required)
    );

    if (isProd && bucketsNotCreated.length > 0) {
        throw new Error('Some buckets are missing');
    }

    for (const bucket of bucketsNotCreated) {
        console.log('Create bucket', bucket);
        await S3.send(new CreateBucketCommand({ Bucket: bucket }));
    }
};
