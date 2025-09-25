import { generate4BytesHex } from '../random.js';
import { Game } from './Game.js';

const currentGames: {
    [game_id: string]: Game;
} = {};

// DO NOT COMMIT
currentGames['boofar'] = new Game('boofar');

export const getGameById = (id: string) => {
    return currentGames[id];
};

export const getNewGame = () => {
    if (Object.keys(currentGames).length >= 5) {
        // Prevent too many concurrent games
        return;
    }

    let id = generate4BytesHex();
    while (currentGames[id]) {
        // Regenerate the id in the (improbable) case that we generated a conflict
        id = generate4BytesHex();
    }

    currentGames[id] = new Game(id);
};
