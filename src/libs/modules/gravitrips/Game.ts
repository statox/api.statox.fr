import WebSocket from 'ws';
import { slog } from '../logging/index.js';
import {
    Board,
    BoardState,
    Cell,
    getBoardState,
    getNewBoard,
    getWinningCells,
    makeMove
} from './board.js';
import { FromSchema } from 'json-schema-to-ts';
import { AllowedSchema, validateAgainstJsonSchema } from '../ajv/index.js';

export enum GameState {
    created = 0,
    waitingForPlayer2 = 1,
    playing = 2
}

export type Player = {
    id: Cell;
    name: string;
    ws: WebSocket;
};

const moveInputSchema = {
    type: 'object',
    required: ['move'],
    additionalProperties: false,
    properties: {
        move: {
            type: 'number'
        }
    }
} as const;
type Move = FromSchema<typeof moveInputSchema>;

export class Game {
    id: string;
    creationDateUnix: number;
    board: Board;
    boardState: BoardState;
    gameState: GameState;
    player1: Player | undefined;
    player2: Player | undefined;
    currentTurn: number;

    constructor(id: string) {
        this.id = id;
        this.creationDateUnix = Date.now();
        this.board = getNewBoard();
        this.boardState = BoardState.notOver;
        this.currentTurn = 1;
        this.gameState = GameState.created;
    }

    changeCurrentTurn() {
        this.currentTurn = this.currentTurn === 1 ? 2 : 1;
    }

    registerNewPlayer(name: string, ws: WebSocket) {
        if (this.gameState === GameState.created) {
            this._registerPlayer1(name, ws);
            return;
        }

        if (this.gameState === GameState.waitingForPlayer2) {
            this._registerPlayer2(name, ws);
            return;
        }

        ws.send(JSON.stringify({ error: 'game_already_full' }));
        ws.close();
    }

    _registerPlayer1(name: string, ws: WebSocket) {
        if (this.gameState !== GameState.created) {
            throw new Error('Trying to add player 1 to a game in state ' + this.gameState);
        }
        slog.log('gravitrips', 'Register player 1', { gameId: this.id });
        this.player1 = { id: 1, name, ws };
        this.gameState = GameState.waitingForPlayer2;
        ws.send(JSON.stringify({ type: 'waiting_for_opponent', youAre: 1, board: this.board }));
    }

    _registerPlayer2(name: string, ws: WebSocket) {
        if (this.gameState !== GameState.waitingForPlayer2) {
            throw new Error('Trying to add player 2 to a game in state ' + this.gameState);
        }
        if (!this.player1) {
            ws.send(JSON.stringify({ error: 'invalid_game_state' }));
            ws.close();
            throw new Error(
                'Trying to add player 2 but player 1 is not registered' + this.gameState
            );
        }
        slog.log('gravitrips', 'Register player 2', { gameId: this.id });
        this.player2 = { id: 2, name, ws };
        this.gameState = GameState.playing;

        this.player1.ws.on('message', (message: string) => {
            this.onGravitripsMessage(message, this.player1!);
        });
        this.player2.ws.on('message', (message: string) => {
            this.onGravitripsMessage(message, this.player2!);
        });

        this.player1.ws.on('close', () => {
            if (!this.player1) {
                return;
            }
            this.onPlayerDisconnect(this.player1);
        });
        this.player2.ws.on('close', () => {
            if (!this.player2) {
                return;
            }
            this.onPlayerDisconnect(this.player2);
        });

        this.player1.ws.send(JSON.stringify({ type: 'game_ready', youAre: 1, board: this.board }));
        this.player2.ws.send(JSON.stringify({ type: 'game_ready', youAre: 2, board: this.board }));
    }

    onPlayerDisconnect(player: Player) {
        slog.log('gravitrips', `Player ${player.id} disconnected`);
        [this.player1, this.player2].forEach((p) => {
            if (!p || p.id === player.id) {
                return;
            }
            p.ws.send(JSON.stringify({ type: 'game_over', reason: 'other_player_disconnected' }));
            p.ws.close();
        });
    }

    onGravitripsMessage(message: string, player: Player) {
        slog.log('gravitrips', 'new move', {
            dataStr: message.toString(),
            gameId: this.id,
            playerId: player.id
        });

        if (this.gameState !== GameState.playing) {
            player.ws.send(JSON.stringify({ error: 'game_not_ready' }));
            return;
        }
        if (this.boardState !== BoardState.notOver) {
            player.ws.send(JSON.stringify({ error: 'game_already_over' }));
            return;
        }
        if (player.id !== this.currentTurn) {
            player.ws.send(JSON.stringify({ error: 'not_your_turn' }));
            return;
        }

        if (!this.player1 || !this.player2) {
            slog.log('gravitrips', 'Invalid game state at least one player missing', {
                gameId: this.id
            });
            player.ws.send(JSON.stringify({ error: 'something_went_wrong' }));
            return;
        }

        let move: number;
        try {
            const input = JSON.parse(message) as Move;
            validateAgainstJsonSchema(input, moveInputSchema as unknown as AllowedSchema);
            move = input.move;
        } catch {
            player.ws.send(JSON.stringify({ error: 'invalid_input_message' }));
            return;
        }

        try {
            const board = makeMove(this.board, player.id, move);
            const boardState = getBoardState(this.board);
            const winningCells = getWinningCells(this.board);

            // Switch turn
            this.board = board;
            this.boardState = boardState;
            this.changeCurrentTurn();

            [this.player1, this.player2].forEach((p) => {
                p.ws.send(
                    JSON.stringify({
                        type: 'update_board',
                        from: player.id,
                        board,
                        boardState,
                        winningCells
                    })
                );
            });

            if (boardState !== BoardState.notOver) {
                [this.player1, this.player2].forEach((p) => {
                    p.ws.send(JSON.stringify({ type: 'game_over', reason: boardState }));
                    p.ws.close();
                });
            }
        } catch (e) {
            slog.log('gravitrips', `Failed to make move`, { error: e as Error });
            player.ws.send(JSON.stringify({ error: 'invalid_move' }));
        }
    }
}
