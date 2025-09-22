import { WebSocket, WebSocketServer } from 'ws';
import { IncomingMessage } from 'node:http';
import { slog } from './libs/modules/logging/index.js';
import { resetGravitrip, onGravitripConnection } from './libs/modules/gravitrip/index.js';

export const initWsServer = (wss: WebSocketServer) => {
    slog.log('app', 'Init WebSocket server');
    resetGravitrip();
    wss.on('connection', routeWebsocket);
};

const routeWebsocket = (ws: WebSocket, req: IncomingMessage) => {
    const url = req.url || '';
    slog.log('ws', 'access-log-ws', { path: url });

    if (url === '/gravitrip') {
        onGravitripConnection(ws);
        return;
    }

    slog.log('ws', 'Rejected websocket with invalid path', { url });
    ws.close(999, 'invalid_path');
};
