import { assert } from 'chai';
import { th } from '../helpers/index.js';
import { TestWebSocket } from '../helpers/ws/index.js';
import { wss } from '../../src/app.js';

const WS_SERVER_URL = 'ws://localhost:3001';

describe('WebSocket endpoint routing', async () => {
    let client: TestWebSocket;
    afterEach(async () => {
        client.close();
        await client.waitUntil('close');
    });

    describe('WebSocket ping pong', async () => {
        it('pong response should reset isAlive to true', async () => {
            client = new TestWebSocket(WS_SERVER_URL + '/valid');
            await client.waitUntil('open');
            assert.lengthOf(wss.clients, 1);
            const serverSocket = wss.clients.values().next().value!;

            serverSocket.isAlive = false;
            client.pong();
            return new Promise<void>((resolve) => {
                const i = setInterval(() => {
                    if (serverSocket.isAlive) {
                        clearInterval(i);
                        return resolve();
                    }
                }, 20);
            });
        });
    });

    it('should create a log on new connection', async () => {
        client = new TestWebSocket(WS_SERVER_URL + '/foobar');
        await client.waitUntil('close');

        th.slog.checkLog('ws', 'access-log-ws', {
            url: '/foobar',
            requestId: '00000000-0000-0000-0000-000000000001'
        });
    });

    it('should connect to a valid route', async () => {
        client = new TestWebSocket(WS_SERVER_URL + '/valid');
        await client.waitUntil('open');

        client.send('hello world');
        await client.waitForMessage('Received hello world');
    });

    it('should reject a non existing route with a 404 code', async () => {
        client = new TestWebSocket(WS_SERVER_URL + '/foobar');
        await client.waitUntil('open');
        assert.lengthOf(wss.clients, 1);

        await client.waitUntil('close');

        await client.waitForMessage(JSON.stringify({ error: 'invalid_path' }));
        th.slog.checkLog('ws', 'Rejected websocket with invalid path', { url: '/foobar' });
    });
});
