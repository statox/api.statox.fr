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

export class EnrichedWebSocket extends WebSocket {
    uuid?: string;
}

const routeWebsocket = (ws: EnrichedWebSocket, req: IncomingMessage) => {
    ws.uuid = config.env.isTests ? '00000000-0000-0000-0000-000000000001' : randomUUID();
    slog.log('ws', 'access-log-ws', { url: req.url, requestId: ws.uuid });

    const [path, params] = (req.url || '').split('?');
    for (const route of routesWS.list) {
        if (path === route.path) {
            return route.onConnection(ws, params);
        }
    }

    slog.log('ws', 'Rejected websocket with invalid path', { url: req.url, requestId: ws.uuid });
    ws.send(JSON.stringify({ error: 'invalid_path' }));
    ws.close();
};
