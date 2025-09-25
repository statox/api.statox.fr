import { MessageEvent, WebSocket } from 'ws';
import { config } from '../../../src/packages/config/index.js';

// A class to test WebSocket inspired by this article
// https://thomason-isaiah.medium.com/writing-integration-tests-for-websocket-servers-using-jest-and-ws-8e5c61726b2a

const { isDebug } = config.env;

export class TestWebSocket extends WebSocket {
    _messages: string[];

    constructor(...args: ConstructorParameters<typeof WebSocket>) {
        super(...args);

        this._messages = [];

        const addNewMessage = (event: MessageEvent) =>
            this._messages.push(event.data.toString('utf8'));

        this.addEventListener('message', addNewMessage);
        this.addEventListener('close', () => this.removeEventListener('message', addNewMessage), {
            once: true
        });
    }

    get messages() {
        // Allow tests to retrieve the messages to inspect them
        return [...this._messages];
    }

    // Clears all of the stored messages that were previously received by the `WebSocket`
    clearMessages() {
        this._messages.splice(0, this._messages.length);
    }

    waitUntil(state: 'open' | 'close', timeout = 1000) {
        if (this.readyState === this.OPEN && state === 'open') {
            return;
        }
        if (this.readyState === this.CLOSED && state === 'close') {
            return;
        }

        return new Promise<void>((resolve, reject) => {
            const handleStateEvent = () => {
                clearTimeout(timerId);
                resolve();
            };

            this.addEventListener(state, handleStateEvent, { once: true });

            const timerId = setTimeout(() => {
                this.removeEventListener(state, handleStateEvent);
                if (this.readyState === this.OPEN && state === 'open') return resolve();
                if (this.readyState === this.CLOSED && state === 'close') return resolve();

                reject(new Error(`WebSocket did not ${state} in time.`));
            }, timeout);
        });
    }

    waitForMessage(message: string, includeExistingMessages = true, timeout = 1000) {
        if (includeExistingMessages && this._messages.includes(message)) {
            return;
        }
        const originalMessageIndex = this._messages.lastIndexOf(message);

        return new Promise<void>((resolve, reject) => {
            const checkForMessage = (event: MessageEvent) => {
                if (event.data.toString('utf8') !== message) {
                    return;
                }

                clearTimeout(timerId);
                this.removeEventListener('message', checkForMessage);
                resolve();
            };

            this.addEventListener('message', checkForMessage);

            const timerId = setTimeout(() => {
                this.removeEventListener('message', checkForMessage);

                const success = includeExistingMessages
                    ? this._messages.includes(message)
                    : this._messages.lastIndexOf(message) > originalMessageIndex;

                if (success) return resolve();
                if (isDebug) {
                    console.log('WebSocket did not receive message in time');
                    console.log('Expected:');
                    console.log(message);
                    console.log('Got:');
                    console.log(this._messages);
                }
                reject(new Error(`WebSocket did not receive the message "${message}" in time.`));
            }, timeout);
        });
    }
}
