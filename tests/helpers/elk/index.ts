import sinon from 'sinon';
import { elk } from '../../../src/libs/databases/elk';
import { isDebug } from '../../../src/libs/config/env';
import { assert } from 'chai';
import { TestHelper } from '../TestHelper';
import { ELKFixture } from './types';

const originalSearch = elk.search;

// TODO I could probably use sinon to mock this function and avoid the type error
// when assigning this to the originial function
const fakeSearch = async (...args: Parameters<typeof originalSearch>) => {
    // Since we are using a real ELK in a docker container there is a latency
    // when indexing a log. The log becomes searchable after a few seconds.
    // This is too long for the tests so in test environment we make sure
    // we refresh the index before any search.
    // TODO: Make it automatic to refresh all the indices (will be necessary
    // if I use a second data stream for other data)
    await elk.indices.refresh({ index: 'data-home-tracker' });

    // Call the original function
    return await originalSearch.call(elk, ...args);
};

const mockELKSearch = async () => {
    // @ts-expect-error Type mismatch, check if using a proper sinon.wrap
    // or something similar can fix
    elk.search = fakeSearch;
};

const restoreElkSearch = async () => {
    elk.search = originalSearch;
};

const resetELKIndices = async () => {
    try {
        // Cleanup indices in case the previous test added some data
        await elk.deleteByQuery({
            index: 'data-home-tracker',
            query: { match_all: {} }
        });
    } catch (error: unknown) {
        // When the index is empty (which is expected most of the time) ELK we can an error with several failures with status 409
        if (
            (error as { meta: { body: { failures: { status: number }[] } } }).meta?.body
                ?.failures?.[0]?.status !== 409
        ) {
            throw error;
        }
    }
};

let elkSpy: sinon.SinonSpy;
const setupELKSpy = async () => {
    elkSpy = sinon.spy(elk, 'index');
};

const restoreElkSpy = async () => {
    elkSpy.restore();
};

class TestHelper_ELK extends TestHelper {
    constructor() {
        super({
            name: 'ELK',
            hooks: {
                beforeAll: mockELKSearch,
                beforeEach: async () => {
                    await resetELKIndices();
                    setupELKSpy();
                },
                afterEach: restoreElkSpy,
                afterAll: restoreElkSearch
            }
        });
    }

    fixture = async (fixture: ELKFixture) => {
        for (const index of Object.keys(fixture)) {
            const documents = fixture[index];

            if (!documents.length) {
                continue;
            }

            await Promise.all(documents.map((document) => elk.index({ index, document })));
        }
    };

    checkDocumentCreated = (index: string, document: unknown) => {
        const buildArgs = sinon.match({ index: index });
        const calledWithCorrectArgs = elkSpy.calledWithMatch({
            index,
            document: { document }
        });
        if (!calledWithCorrectArgs) {
            if (isDebug) {
                console.log('elk calls:');
                console.log(JSON.stringify(elkSpy.getCalls(), null, 2));
                console.log('elk expected args:');
                console.log(JSON.stringify(buildArgs, null, 2));
            } else {
                console.log('elk calls (use debug=true to stringify):');
                console.log(elkSpy.getCalls());
                console.log('elk expected:');
                console.log(buildArgs);
            }
        }
        assert(calledWithCorrectArgs, 'ELK inserted data doesnt match');
    };
}
export const testHelper_ELK = new TestHelper_ELK();
