import sinon from 'sinon';
import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { assert } from 'chai';
import { s3Mock } from '../../../src/services/s3';
import 'aws-sdk-client-mock-jest';

export const setupS3Spy = () => {
    s3Mock.reset();
};

type S3CheckNbCallsParams = { nbCalls: number };
type S3CheckCallArsParams = {
    commandType: 'DeleteObject' | 'PutObject';
    input: { [key: string]: string };
};
type S3CheckCallParams = S3CheckNbCallsParams | S3CheckCallArsParams;

function isNbCallsCheck(check: S3CheckCallParams): check is S3CheckNbCallsParams {
    return (check as S3CheckNbCallsParams).nbCalls !== undefined;
}

export const s3CheckCall = (params: S3CheckCallParams) => {
    if (isNbCallsCheck(params)) {
        assert.equal(s3Mock.calls().length, params.nbCalls);
        return;
    }

    if (params.commandType === 'DeleteObject') {
        assert.exists(s3Mock.commandCalls(DeleteObjectCommand));
    } else if (params.commandType === 'PutObject') {
        assert.exists(s3Mock.commandCalls(PutObjectCommand));
    } else if (params.commandType === 'GetObject') {
        assert.exists(s3Mock.commandCalls(GetObjectCommand));
    }

    if (params.input) {
        const c = s3Mock.calls().pop();
        if (!c) {
            return sinon.assert.fail();
        }

        for (const key of Object.keys(params.input)) {
            const value = params.input[key];
            sinon.assert.calledWithMatch(c, sinon.match.has('input', sinon.match.has(key, value)));
        }
    }
};
