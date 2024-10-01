import sinon from 'sinon';
import { elk, resetDataStreamForTests } from '../../../src/libs/databases/elk';
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
                beforeEach: setupELKSpy,
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
            await elk.indices.refresh({ index });
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

    flush = async () => {
        // IMPORTANT Do not put that in the global mocha `beforeEach` hook /!\
        //
        // Elasticsearch "near real time" nature makes that we can't delete the indices
        // with a query: When doing so we don't have a way to wait for the deletion to
        // be commited (I tried playing with indices.refresh/indices.flush/the wait_for
        // parameter of elk.search... couldn't make it work)
        // So we end up with flaky tests because sometimes there is still data from
        // previous tests in the indices.
        //
        // The solution is to delete the indices and recreate them, but doing that in
        // `beforeEach` is very costly (at the time of writing with 69 tests the average
        // time goes from 2.4s to 4.4 s)
        //
        // Instead we choose to have this flush utile which has to be used manually in the
        // tests which require the ELK indices to be cleaned up (at the time of writing with
        // 13 tests executin flush the average time is 3.1s) this still slows down the test
        // suites but at least it won't grow linearly with the test suite of the app
        await resetDataStreamForTests();
    };

    dumpIndex = async (index: string, size: number = 1000) => {
        try {
            const docs = await elk.search({ index, size });
            console.log(`Content of ${index}`);
            console.log('number of documents', docs.hits.total);
            console.log(JSON.stringify(docs.hits.hits, null, 2));
        } catch (error) {
            const errorMessage = (error as Error).message;
            if (errorMessage.includes('index_not_found_exception')) {
                console.log(`index ${index} does not exists`);
            } else {
                throw error;
            }
        }
    };
}
export const testHelper_ELK = new TestHelper_ELK();
