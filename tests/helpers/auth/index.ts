import { TestHelper } from '../TestHelper.js';
import { th } from '../index.js';

const createApiKeys = async () => {
    await th.mysql.fixture({
        ApiKeys: [
            {
                id: 1,
                accessKey: 'fakeaccesskeyfortests',
                description: 'A fake access key, for tests'
            }
        ]
    });
};

export const testHelper_Auth = new TestHelper({
    name: 'Auth',
    hooks: {
        beforeEach: createApiKeys
    }
});
