import { slog } from '../logging/index.js';
import { WebSocket } from 'ws';
import { getGameById } from './gameService.js';

export * from './gameService.js';

export const onGravitripsConnection = (ws: WebSocket, gameId: string) => {
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
