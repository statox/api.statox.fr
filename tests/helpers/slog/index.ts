import sinon from 'sinon';
import { assert } from 'chai';
import { slog } from '../../../src/services/logging';
import { LogObject } from '../../../src/services/logging/slog';
import { isDebug } from '../../../src/services/env-helpers/env';

let slogSpy: sinon.SinonSpy;

export const setupSlogSpy = () => {
    slogSpy = sinon.spy(slog, 'log');
};

export const restoreSlogSpy = () => {
    slogSpy.restore();
};

export type TestLogObject = {
    [P in keyof LogObject]?: LogObject[P] | sinon.SinonMatcher;
};

export const slogCheckLog = (data: TestLogObject) => {
    const calledWithCorrectArgs = slogSpy.calledWithMatch(data);
    if (!calledWithCorrectArgs) {
        if (isDebug) {
            console.log('slog calls:');
            console.log(JSON.stringify(slogSpy.getCalls(), null, 2));
            console.log('slog expected:');
            console.log(JSON.stringify(data, null, 2));
        } else {
            console.log('slog calls (use debug=true to stringify):');
            console.log(slogSpy.getCalls());
            console.log('slog expected:');
            console.log(data);
        }
    }
    assert(calledWithCorrectArgs, 'Logged data doesnt match');
};
