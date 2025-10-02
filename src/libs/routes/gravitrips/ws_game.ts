import { getGameById } from '../../modules/gravitrips/index.js';
import { slog } from '../../modules/logging/index.js';
import { RouteWS } from '../types.js';
import { WebSocket } from 'ws';

export const connectionHandler = (ws: WebSocket, gameId: string) => {
    slog.log('gravitrips', 'Gravitrips client connected', { gameId });

    const game = getGameById(gameId);

    if (!game) {
        slog.log('gravitrips', 'Couldnt find game by id', { gameId });
        ws.send(JSON.stringify({ type: 'error', message: 'game_not_found' }));
        ws.close();
        return;
    }

    game.registerNewPlayer('player ' + Date.now().toString(), ws);
};

export const route: RouteWS = {
    onConnection: connectionHandler,
    path: '/gravitrips/ws'
};
