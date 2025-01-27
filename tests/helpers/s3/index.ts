import sinon from 'sinon';
import {
    DeleteObjectCommand,
    GetObjectCommand,
    PutObjectCommand,
    PutObjectCommandInput
} from '@aws-sdk/client-s3';
import { assert } from 'chai';
import { s3Mock } from '../../../src/libs/databases/s3.js';
import { TestHelper } from '../TestHelper.js';

class TestHelper_S3 extends TestHelper {
    constructor() {
        super({
            name: 'S3',
            hooks: {
                beforeEach: async () => {
                    s3Mock.reset();

                    // TODO See if we want to have a finer way to fail calls to S3
                    // For now any call with a key containing should_fail will fail
                    s3Mock
                        .on(
                            PutObjectCommand,
                            // @ts-expect-error looks like .on is not typed to expect a matcher even if it works
                            (params: Partial<PutObjectCommandInput>) => {
                                return params.Key?.includes('should_fail');
                            }
                        )
                        .rejects(new Error('Simulated failure'));
                }
            }
        });
    }

    checkNbCalls = (params: { nbCalls: number }) => {
        assert.equal(s3Mock.calls().length, params.nbCalls);
    };

    checkCall = (params: {
        commandType: 'DeleteObject' | 'PutObject';
        input: { [key: string]: string };
    }) => {
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
                return assert.fail();
            }

            for (const key of Object.keys(params.input)) {
                const value = params.input[key];
                // TODO allow better matching to test actual content of Body
                sinon.assert.calledWithMatch(
                    c,
                    sinon.match.has('input', sinon.match.has(key, value))
                );
            }
        }
    };
}
export const testHelper_S3 = new TestHelper_S3();
