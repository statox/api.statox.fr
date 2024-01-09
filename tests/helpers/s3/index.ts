import sinon from 'sinon';
import { S3 } from '../../../src/services/s3';
import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';

let s3Spy: sinon.SinonSpy;

export const setupS3Spy = () => {
    s3Spy = sinon.spy(S3, 'send');
};

export const restoreS3Spy = () => {
    s3Spy.restore();
};

type S3CheckCallParams = {
    nbCalls: number;
    commandType?: 'DeleteObject' | 'PutObject';
    input?: { [key: string]: string };
};
export const s3CheckCall = (params: S3CheckCallParams) => {
    sinon.assert.callCount(s3Spy, params.nbCalls);

    if (params.commandType === 'DeleteObject') {
        sinon.assert.calledWithMatch(s3Spy, sinon.match.instanceOf(DeleteObjectCommand));
    } else if (params.commandType === 'PutObject') {
        sinon.assert.calledWithMatch(s3Spy, sinon.match.instanceOf(PutObjectCommand));
    }

    if (params.input) {
        for (const key of Object.keys(params.input)) {
            const value = params.input[key];

            sinon.assert.calledWithMatch(
                s3Spy,
                sinon.match.has('input', sinon.match.has(key, value))
            );
        }
    }
};
