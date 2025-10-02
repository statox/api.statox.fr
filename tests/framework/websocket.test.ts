import { assert } from 'chai';
import { th } from '../helpers/index.js';
import { TestWebSocket } from '../helpers/ws/index.js';
import { wss } from '../../src/app.js';

const WS_SERVER_URL = 'ws://localhost:3001';

describe('WebSocket endpoint routing', async () => {
    it('should create a log on new connection', async () => {
        const client = new TestWebSocket(WS_SERVER_URL + '/foobar');
        await client.waitUntil('open');

        await client.waitForMessage(JSON.stringify({ error: 'invalid_path' }));
        th.slog.checkLog('ws', 'access-log-ws', {
            url: '/foobar',
            requestId: '00000000-0000-0000-0000-000000000001'
        });
    });

    it('should reject a non existing route with a 404 code', async () => {
        const client = new TestWebSocket(WS_SERVER_URL + '/foobar');
        await client.waitUntil('open');
        assert.lengthOf(wss.clients, 1);

        await client.waitUntil('close');

        await client.waitForMessage(JSON.stringify({ error: 'invalid_path' }));
        th.slog.checkLog('ws', 'Rejected websocket with invalid path', { url: '/foobar' });
    });
});
