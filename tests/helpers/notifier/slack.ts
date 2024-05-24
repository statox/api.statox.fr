import sinon from 'sinon';
import { slackNotifier } from '../../../src/services/notifier';

let slackStub: sinon.SinonStub;

export const setupNotifierSlackStub = () => {
    // We might need something more subtle but for now I just want to bypass
    // the call to the webhook during the tests so .resolves(null) is good enough
    slackStub = sinon.stub(slackNotifier, 'notifySlack').resolves(null);
};

export const restoreNotifierSlackStub = () => {
    slackStub.restore();
};
