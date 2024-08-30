import sinon from 'sinon';
import { elk } from '../../../src/libs/databases/elk';
import { isDebug } from '../../../src/libs/config/env';
import { assert } from 'chai';
import { TestHelper } from '../TestHelper';

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
    const result = await originalSearch.call(elk, ...args);
    return result;
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
