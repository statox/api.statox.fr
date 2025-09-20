import { slog } from '../logging/index.js';
import { WebSocket } from 'ws';
import {
    Board,
    BoardState,
    Cell,
    getBoardState,
    getNewBoard,
    getWinningCells,
    makeMove
} from './game.js';

type Player = {
    id: number;
    ws: WebSocket;
};

let players: Player[];
let currentTurn: number;
let board: Board;

export const initGravitrip = () => {
    players = [];
    currentTurn = 0;
    board = getNewBoard();
};

interface MessagePlayerMove {
    move: number;
}

export const onconnection = (ws: WebSocket) => {
    slog.log('ws', 'Client connected');

    if (players.length >= 2) {
        ws.send(JSON.stringify({ type: 'error', message: 'Game already full' }));
        ws.close(1002, 'too_many_players');
        return;
    }

    const player: Player = { id: players.length + 1, ws };
    players.push(player);
    slog.log('ws', `Player ${player.id} connected`);

    if (players.length === 1) {
        players.forEach((p) =>
            p.ws.send(JSON.stringify({ type: 'waiting_for_opponent', youAre: p.id, board }))
        );
    }
    if (players.length === 2) {
        // Game ready
        players.forEach((p) =>
            p.ws.send(JSON.stringify({ type: 'game_ready', youAre: p.id, board }))
        );
        currentTurn = 1;
    }

    ws.on('message', (message: string) => {
        const text = message.toString();
        slog.log('ws', `Received from ${player.id}`, { dataStr: text });

        if (players.length < 2) return; // wait for opponent
        if (player.id !== currentTurn) return; // not your turn

        const { move } = JSON.parse(text) as MessagePlayerMove;
        try {
            let boardState = getBoardState(board);
            if (boardState !== BoardState.notOver) {
                ws.send(JSON.stringify({ type: 'game_already_over' }));
                return;
            }

            board = makeMove(board, player.id as Cell, move);
            boardState = getBoardState(board);
            const winningCells = getWinningCells(board);

            // Switch turn
            const other = players.find((p) => p.id !== player.id);
            currentTurn = other ? other.id : currentTurn;

            players.forEach((p) => {
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
                players.forEach((p) => {
                    p.ws.close(1000, 'game_over');
                });

                initGravitrip();
            }
        } catch (e) {
            slog.log('ws', `Failed to make move`, { error: e as Error });
        }
    });

    ws.on('close', () => {
        slog.log('ws', `Player ${player.id} disconnected`);
        players = players.filter((p) => p !== player);
        players.forEach((p) => {
            p.ws.close(1001, 'other_player_disconnected');
        });
        initGravitrip();
    });
};
