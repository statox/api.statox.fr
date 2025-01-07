import sinon from 'sinon';
import { assert } from 'chai';
import { pushNotifier } from '../../../src/libs/modules/notifier/index.js';
import { config } from '../../../src/packages/config/index.js';
import { TestHelper } from '../TestHelper.js';

let pushStub: sinon.SinonStub;

const { isDebug } = config.env;

const setupNotifierPushStub = async () => {
    pushStub = sinon.stub(pushNotifier, 'notify').resolves(undefined);
};

const restoreNotifierPushStub = async () => {
    pushStub.restore();
};

class TestHelper_Push extends TestHelper {
    constructor() {
        super({
            name: 'Push',
            hooks: {
                beforeEach: setupNotifierPushStub,
                afterEach: restoreNotifierPushStub
            }
        });
    }

    checkNotification = (params: { message: string; title?: string }) => {
        const calledWithCorrectArgs = pushStub.calledWithMatch(params);
        if (!calledWithCorrectArgs) {
            if (isDebug) {
                console.log('push notification calls:');
                console.log(JSON.stringify(pushStub.getCalls(), null, 2));
                console.log('push notification expected args:');
                console.log(JSON.stringify(params, null, 2));
            } else {
                console.log('push calls (use debug=true to stringify):');
                console.log(pushStub.getCalls());
                console.log('push expected:');
                console.log(params);
            }
        }
        assert(calledWithCorrectArgs, 'Push notification data doesnt match');
    };

    checkNoNotifications = () => {
        const notCalled = pushStub.notCalled;

        if (!notCalled) {
            const nbCalls = pushStub.getCalls().length;
            if (isDebug) {
                console.log(
                    `push notification expected 0 calls but was called ${nbCalls} times with:`
                );
                console.log(JSON.stringify(pushStub.getCalls(), null, 2));
            } else {
                console.log(
                    `push notification expected 0 zero but was called ${nbCalls} times (use debug=true to see calls)`
                );
            }
        }

        assert(notCalled === true, 'push notification was expected not to be called');
    };

    checkNbNotifications = (expectedNbOfNotifications: number) => {
        assert(expectedNbOfNotifications >= 0, 'Cant expect a negative number of notifications');

        const nbCalls = pushStub.getCalls().length;

        if (nbCalls !== expectedNbOfNotifications) {
            if (isDebug) {
                console.log(
                    `push notification expected ${expectedNbOfNotifications} calls but was called ${nbCalls} times with:`
                );
                console.log(JSON.stringify(pushStub.getCalls(), null, 2));
            } else {
                console.log(
                    `push notification expected ${expectedNbOfNotifications} calls but was called ${nbCalls} times (use debug=true to see calls)`
                );
            }
        }

        assert(
            nbCalls === expectedNbOfNotifications,
            `push notification was expected be called ${expectedNbOfNotifications} times instead of ${nbCalls}`
        );
    };
}
export const testHelper_PushNotifier = new TestHelper_Push();
