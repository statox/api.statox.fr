import sinon from 'sinon';
import { assert } from 'chai';
import { slackNotifier } from '../../../src/libs/services/notifier';
import { isDebug } from '../../../src/libs/config/env';

let slackStub: sinon.SinonStub;

export const setupNotifierSlackStub = () => {
    // We might need something more subtle but for now I just want to bypass
    // the call to the webhook during the tests so .resolves(null) is good enough
    slackStub = sinon.stub(slackNotifier, 'notifySlack').resolves(undefined);
};

export const restoreNotifierSlackStub = () => {
    slackStub.restore();
};

export const slackCheckNotification = (params: {
    message?: string;
    error?: Error;
    directMention?: true;
}) => {
    const calledWithCorrectArgs = slackStub.calledWithMatch(params);
    if (!calledWithCorrectArgs) {
        if (isDebug) {
            console.log('slack calls:');
            console.log(JSON.stringify(slackStub.getCalls(), null, 2));
            console.log('slack expected args:');
            console.log(JSON.stringify(params, null, 2));
        } else {
            console.log('slack calls (use debug=true to stringify):');
            console.log(slackStub.getCalls());
            console.log('slack expected:');
            console.log(params);
        }
    }
    assert(calledWithCorrectArgs, 'Slack notification data doesnt match');
};

export const slackCheckNoNotifications = () => {
    const notCalled = slackStub.notCalled;

    if (!notCalled) {
        const nbCalls = slackStub.getCalls().length;
        if (isDebug) {
            console.log(`slack expected 0 zero but was called ${nbCalls} times with:`);
            console.log(JSON.stringify(slackStub.getCalls(), null, 2));
        } else {
            console.log(
                `slack expected 0 zero but was called ${nbCalls} times (use debug=true to see calls)`
            );
        }
    }

    assert(notCalled === true, 'slack was expected not to be called');
};
