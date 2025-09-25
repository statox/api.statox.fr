import { WebSocket, WebSocketServer } from 'ws';
import { IncomingMessage } from 'node:http';
import { slog } from './libs/modules/logging/index.js';
import { onGravitripsConnection } from './libs/modules/gravitrip/index.js';

export const initWsServer = (wss: WebSocketServer) => {
    slog.log('app', 'Init WebSocket server');
    wss.on('connection', routeWebsocket);
};

const routeWebsocket = (ws: WebSocket, req: IncomingMessage) => {
    const [path, params] = (req.url || '').split('?');
    slog.log('ws', 'access-log-ws', { url: req.url });

    if (path === '/gravitrips/ws') {
        onGravitripsConnection(ws, params);
        return;
    }

    slog.log('ws', 'Rejected websocket with invalid path', { url: req.url });
    ws.send(JSON.stringify({ error: 'invalid_path' }));
    ws.close();
};
