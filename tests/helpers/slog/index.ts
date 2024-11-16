import sinon from 'sinon';
import { assert } from 'chai';
import { slog } from '../../../src/libs/modules/logging/index.js';
import { LogObject } from '../../../src/libs/modules/logging/types.js';
import { isDebug } from '../../../src/packages/config/index.js';
import { TestHelper } from '../TestHelper.js';

export type TestLogObject = {
    [P in keyof LogObject]?: LogObject[P] | sinon.SinonMatcher;
};

let slogSpy: sinon.SinonSpy;

const setupSlogSpy = async () => {
    slogSpy = sinon.spy(slog, 'log');
};

const restoreSlogSpy = async () => {
    slogSpy.restore();
};

class TestHelper_Slog extends TestHelper {
    constructor() {
        super({
            name: 'slog',
            hooks: {
                beforeEach: setupSlogSpy,
                afterEach: restoreSlogSpy
            }
        });
    }

    checkLog = (component: string, message: string, data?: TestLogObject) => {
        const calledWithCorrectArgs = slogSpy.calledWithMatch(component, message, data);
        if (!calledWithCorrectArgs) {
            if (isDebug) {
                console.log('slog calls:');
                console.log(JSON.stringify(slogSpy.getCalls(), null, 2));
                console.log('slog expected args:');
                console.log(JSON.stringify([component, message, data], null, 2));
            } else {
                console.log('slog calls (use debug=true to stringify):');
                console.log(slogSpy.getCalls());
                console.log('slog expected:');
                console.log([component, message, data]);
            }
        }
        assert(calledWithCorrectArgs, "Logged data doesn't match");
    };

    checkNoLogs = () => {
        const notCalled = slogSpy.notCalled;

        if (!notCalled) {
            const nbCalls = slogSpy.getCalls().length;
            if (isDebug) {
                console.log(`slog expected 0 zero but was called ${nbCalls} times with:`);
                console.log(JSON.stringify(slogSpy.getCalls(), null, 2));
            } else {
                console.log(
                    `slog expected 0 zero but was called ${nbCalls} times (use debug=true to see calls)`
                );
            }
        }

        assert(notCalled === true, 'slog was expected not to be called');
    };
}

export const testHelper_Slog = new TestHelper_Slog();
