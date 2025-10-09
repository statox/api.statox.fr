import { WebSocket, WebSocketServer } from 'ws';
import { IncomingMessage } from 'node:http';
import { slog } from './libs/modules/logging/index.js';
import { routesWS } from './libs/routes/index.js';
import { randomUUID } from 'node:crypto';
import { config } from './packages/config/index.js';

export const initWsServer = (wss: WebSocketServer) => {
    slog.log('app', 'Init WebSocket server');
    wss.on('connection', routeWebsocket);
};

/*
 * We extend the module ws to add our needed fields to the websocket and have
 * a proper typing.
 */
declare module 'ws' {
    interface WebSocket {
        /**
         *
         * A unique id added by our homemade framework when the ws connects for
         * the first time.
         *
         * **Should not be changed.**
         */
        uuid?: string;
        /**
         *
         * Uses `JSON.stringify()` on `data` and pass it to `this.send()`
         *
         * @param {unknown} data The object to send as JSON
         *
         * **This method is added by my homemade framework when the ws connects
         * for the first time**
         */
        sendJson(data: unknown): void;
        /**
         * Keep an interval running ping/pong checks. The checks update
         * the `isAlive` property
         */
        pingPongInterval?: NodeJS.Timeout;
        /**
         * Set to false if the websocket stops answering to ping events
         */
        isAlive?: boolean;
    }
}

const pingPongCheck = function (ws: WebSocket) {
    if (!ws.isAlive) {
        // TODO We need to test this mecanism but I don't know yet
        // how to prevent a socket to send pong events
        slog.log('ws', 'WS lost connection', { requestId: ws.uuid });
        clearInterval(ws.pingPongInterval);
        return ws.terminate();
    }

    ws.isAlive = false;
    // slog.log('ws', 'send ping', { requestId: ws.uuid });
    ws.ping();
};

const routeWebsocket = (ws: WebSocket, req: IncomingMessage) => {
    ws.uuid = config.env.isTests ? '00000000-0000-0000-0000-000000000001' : randomUUID();
    slog.log('ws', 'access-log-ws', { url: req.url, requestId: ws.uuid });

    ws.sendJson = function (data: unknown) {
        this.send(JSON.stringify(data));
    };

    ws.isAlive = true;
    const pingPongIntervalSec = config.env.isProd ? 60 : 5;
    ws.pingPongInterval = setInterval(
        () => pingPongCheck(ws),
        // Add a random interval to pingPongIntervalSec to avoid having clients
        // answering all at the same time
        pingPongIntervalSec * 1000 + Math.random() * 5 * 1000
    );
    ws.on('pong', function () {
        // slog.log('ws', 'got pong', { requestId: ws.uuid });
        this.isAlive = true;
    });

    const [path, params] = (req.url || '').split('?');
    for (const route of routesWS.list) {
        if (path === route.path) {
            return route.onConnection(ws, params);
        }
    }

    slog.log('ws', 'Rejected websocket with invalid path', { url: req.url, requestId: ws.uuid });
    ws.sendJson({ error: 'invalid_path' });
    ws.close();
};
