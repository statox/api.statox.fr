import sinon from 'sinon';
import { assert } from 'chai';
import { slackNotifier } from '../../../src/libs/modules/notifier';
import { isDebug } from '../../../src/libs/config/env';
import { TestHelper } from '../TestHelper';

let slackStub: sinon.SinonStub;

const setupNotifierSlackStub = async () => {
    // We might need something more subtle but for now I just want to bypass
    // the call to the webhook during the tests so .resolves(null) is good enough
    slackStub = sinon.stub(slackNotifier, 'notifySlack').resolves(undefined);
};

const restoreNotifierSlackStub = async () => {
    slackStub.restore();
};

export const testHelper_SlackNotifier = new TestHelper({
    name: 'Slack',
    hooks: {
        beforeEach: setupNotifierSlackStub,
        afterEach: restoreNotifierSlackStub
    }
});

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
            console.log(`slack expected 0 calls but was called ${nbCalls} times with:`);
            console.log(JSON.stringify(slackStub.getCalls(), null, 2));
        } else {
            console.log(
                `slack expected 0 zero but was called ${nbCalls} times (use debug=true to see calls)`
            );
        }
    }

    assert(notCalled === true, 'slack was expected not to be called');
};

export const slackCheckNbNotifications = (expectedNbOfNotifications: number) => {
    assert(expectedNbOfNotifications >= 0, 'Cant expect a negative number of notifications');

    const nbCalls = slackStub.getCalls().length;

    if (nbCalls !== expectedNbOfNotifications) {
        if (isDebug) {
            console.log(
                `slack expected ${expectedNbOfNotifications} calls but was called ${nbCalls} times with:`
            );
            console.log(JSON.stringify(slackStub.getCalls(), null, 2));
        } else {
            console.log(
                `slack expected ${expectedNbOfNotifications} calls but was called ${nbCalls} times (use debug=true to see calls)`
            );
        }
    }

    assert(
        nbCalls === expectedNbOfNotifications,
        `slack was expected be called ${expectedNbOfNotifications} times instead of ${nbCalls}`
    );
};
