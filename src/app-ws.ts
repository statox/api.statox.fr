import { WebSocketServer } from 'ws';
import { slog } from './libs/modules/logging/index.js';
import { initGravitrip, onconnection } from './libs/modules/gravitrip/index.js';

export const initWsServer = (wss: WebSocketServer) => {
    slog.log('app', 'Init WebSocket server');
    initGravitrip();
    wss.on('connection', onconnection);
};
