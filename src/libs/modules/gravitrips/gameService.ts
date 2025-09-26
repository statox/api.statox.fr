import { slog } from '../logging/slog.js';
import { generate4BytesHex } from '../random.js';
import { Game } from './Game.js';

const currentGames: {
    [game_id: string]: Game;
} = {};
const currentGameIds: string[] = [];

export const getNewGame = () => {
    if (currentGameIds.length >= 5) {
        // Prevent too many concurrent games
        // TODO Properly stop game if it is ongoing
        const oldestGameId = currentGameIds.shift()!;
        delete currentGames[oldestGameId];
    }

    let id = generate4BytesHex();
    while (currentGames[id]) {
        // Regenerate the id in the (improbable) case that we generated a conflict
        id = generate4BytesHex();
    }

    currentGames[id] = new Game(id);
    currentGameIds.push(id);
    slog.log('gravitrips', 'New game created', { gameId: id });
    return id;
};

export const getGameById = (id: string) => {
    return currentGames[id];
};
