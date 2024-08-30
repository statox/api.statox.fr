import sinon from 'sinon';
import { assert } from 'chai';
import { slog } from '../../../src/libs/modules/logging';
import { AppLogComponent, LogObject } from '../../../src/libs/modules/logging/slog';
import { isDebug } from '../../../src/libs/config/env';
import { TestHelper } from '../TestHelper';

let slogSpy: sinon.SinonSpy;

const setupSlogSpy = async () => {
    slogSpy = sinon.spy(slog, 'log');
};

const restoreSlogSpy = async () => {
    slogSpy.restore();
};

export const testHelper_Slog = new TestHelper({
    name: 'slog',
    hooks: {
        beforeEach: setupSlogSpy,
        afterEach: restoreSlogSpy
    }
});

export type TestLogObject = {
    [P in keyof LogObject]?: LogObject[P] | sinon.SinonMatcher;
};

export const slogCheckLog = (component: AppLogComponent, message: string, data?: TestLogObject) => {
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
    assert(calledWithCorrectArgs, 'Logged data doesnt match');
};

export const slogCheckNoLogs = () => {
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
