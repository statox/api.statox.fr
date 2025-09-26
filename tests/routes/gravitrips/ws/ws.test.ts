import request from 'supertest';
import { th } from '../../../helpers/index.js';
import { app } from '../../../../src/app.js';
import { TestWebSocket } from '../../../helpers/ws/TestWebSocket.js';
import { BoardState } from '../../../../src/libs/modules/gravitrips/board.js';
import { getGameById } from '../../../../src/libs/modules/gravitrips/gameService.js';
import { assert } from 'chai';
import { GameState } from '../../../../src/libs/modules/gravitrips/Game.js';

// Good medium article with a suggestion of class to handle WebSocket tests
// https://thomason-isaiah.medium.com/writing-integration-tests-for-websocket-servers-using-jest-and-ws-8e5c61726b2a

const WS_SERVER_URL = 'ws://localhost:3001';

describe('gravitrips', () => {
    let client1: TestWebSocket;
    let client2: TestWebSocket;

    const setupValidGame = async () => {
        const { gameId } = (await request(app).get('/gravitrips/getNewGame')).body;
        client1 = new TestWebSocket(WS_SERVER_URL + `/gravitrips/ws?${gameId}`);
        client2 = new TestWebSocket(WS_SERVER_URL + `/gravitrips/ws?${gameId}`);
        await client1.waitUntil('open');
        await client2.waitUntil('open');

        // Wait for the game to start
        await client1.waitForMessage(
            JSON.stringify({
                type: 'game_ready',
                youAre: 1,
                board: [[], [], [], [], [], [], []]
            })
        );
        await client2.waitForMessage(
            JSON.stringify({
                type: 'game_ready',
                youAre: 2,
                board: [[], [], [], [], [], [], []]
            })
        );

        return gameId;
    };

    afterEach(() => {
        client1?.close();
        client2?.close();
    });

    it('should reject an missing gameId', async () => {
        client1 = new TestWebSocket(WS_SERVER_URL + '/gravitrips/ws');

        await client1.waitUntil('open');
        th.slog.checkLog('gravitrips', 'Couldnt find game by id', {
            gameId: undefined
        });
    });

    it('should reject an unknown gameId', async () => {
        client1 = new TestWebSocket(WS_SERVER_URL + '/gravitrips/ws?foobar');

        await client1.waitUntil('open');
        th.slog.checkLog('gravitrips', 'Couldnt find game by id', {
            gameId: 'foobar'
        });
    });

    it('should register the first player correctly', async () => {
        const { gameId } = (await request(app).get('/gravitrips/getNewGame')).body;
        const game = getGameById(gameId);
        assert.equal(game.gameState, GameState.created);

        // Register player 1
        client1 = new TestWebSocket(WS_SERVER_URL + `/gravitrips/ws?${gameId}`);
        await client1.waitUntil('open');
        await client1.waitForMessage(
            JSON.stringify({
                type: 'waiting_for_opponent',
                youAre: 1,
                board: [[], [], [], [], [], [], []]
            })
        );

        assert.isDefined(game.player1);
        assert.equal(game.player1.id, 1);
        assert.isUndefined(game.player2);
        assert.equal(game.gameState, GameState.waitingForPlayer2);
    });

    it('should register the second player correctly', async () => {
        const gameId = await setupValidGame();
        const game = getGameById(gameId);

        assert.isDefined(game.player1);
        assert.isDefined(game.player2);
        assert.equal(game.player1.id, 1);
        assert.equal(game.player2.id, 2);
        assert.equal(game.gameState, GameState.playing);
    });

    it('should reject the registration of a third player', async () => {
        const gameId = await setupValidGame();

        const client3 = new TestWebSocket(WS_SERVER_URL + `/gravitrips/ws?${gameId}`);
        await client3.waitForMessage(JSON.stringify({ error: 'game_already_full' }));
    });

    it('should notify a player when the other disconnects', async () => {
        it('should work for player1', async () => {
            await setupValidGame();

            client1.close();
            await client2.waitForMessage(
                JSON.stringify({ type: 'game_over', reason: 'other_player_disconnected' })
            );
        });
        it('should work for player2', async () => {
            await setupValidGame();

            client2.close();
            await client1.waitForMessage(
                JSON.stringify({ type: 'game_over', reason: 'other_player_disconnected' })
            );
        });
    });

    it('should send board updates to both players each time a player make moves', async () => {
        await setupValidGame();

        client1.send(JSON.stringify({ type: 'move', column: 3 }));
        const firstMoveMessage = JSON.stringify({
            type: 'update_board',
            from: 1,
            board: [[], [], [], [1], [], [], []],
            boardState: BoardState.notOver,
            winningCells: null
        });
        await client1.waitForMessage(firstMoveMessage);
        await client2.waitForMessage(firstMoveMessage);

        client2.send(JSON.stringify({ type: 'move', column: 3 }));
        const secondMoveMessage = JSON.stringify({
            type: 'update_board',
            from: 2,
            board: [[], [], [], [1, 2], [], [], []],
            boardState: BoardState.notOver,
            winningCells: null
        });
        await client1.waitForMessage(secondMoveMessage);
        await client2.waitForMessage(secondMoveMessage);

        client1.send(JSON.stringify({ type: 'move', column: 0 }));
        const thirdMoveMessage = JSON.stringify({
            type: 'update_board',
            from: 1,
            board: [[1], [], [], [1, 2], [], [], []],
            boardState: BoardState.notOver,
            winningCells: null
        });
        await client1.waitForMessage(thirdMoveMessage);
        await client2.waitForMessage(thirdMoveMessage);
    });

    it('should reject a player move when its not their turn', async () => {
        await setupValidGame();

        client2.send(JSON.stringify({ type: 'move', column: 3 }));
        await client2.waitForMessage(JSON.stringify({ error: 'not_your_turn' }));

        client1.send(JSON.stringify({ type: 'move', column: 0 }));
        const firstMoveMessage = JSON.stringify({
            type: 'update_board',
            from: 1,
            board: [[1], [], [], [], [], [], []],
            boardState: BoardState.notOver,
            winningCells: null
        });
        await client1.waitForMessage(firstMoveMessage);
        await client2.waitForMessage(firstMoveMessage);

        client1.send(JSON.stringify({ type: 'move', column: 3 }));
        await client1.waitForMessage(JSON.stringify({ error: 'not_your_turn' }));
    });

    it('should reject an invalid input', async () => {
        await setupValidGame();

        client1.send('Foo bar');
        await client1.waitForMessage(JSON.stringify({ error: 'invalid_input_message' }));
    });

    it('should reject an invalid move', async () => {
        await setupValidGame();

        client1.send(JSON.stringify({ type: 'move', column: 100 }));
        await client1.waitForMessage(JSON.stringify({ error: 'invalid_move' }));

        client1.send(JSON.stringify({ type: 'move', column: 0 }));
        const firstMoveMessage = JSON.stringify({
            type: 'update_board',
            from: 1,
            board: [[1], [], [], [], [], [], []],
            boardState: BoardState.notOver,
            winningCells: null
        });
        await client1.waitForMessage(firstMoveMessage);
        await client2.waitForMessage(firstMoveMessage);
    });

    it('should notify the players when the game is over - player1 wins', async () => {
        await setupValidGame();

        client1.send(JSON.stringify({ type: 'move', column: 0 }));
        await client1.waitForNewMessage();
        client2.send(JSON.stringify({ type: 'move', column: 3 }));
        await client1.waitForNewMessage();
        client1.send(JSON.stringify({ type: 'move', column: 0 }));
        await client1.waitForNewMessage();
        client2.send(JSON.stringify({ type: 'move', column: 3 }));
        await client1.waitForNewMessage();
        client1.send(JSON.stringify({ type: 'move', column: 0 }));
        await client1.waitForNewMessage();
        client2.send(JSON.stringify({ type: 'move', column: 3 }));
        await client1.waitForNewMessage();
        client1.send(JSON.stringify({ type: 'move', column: 0 }));

        const lastUpdateMessage = JSON.stringify({
            type: 'update_board',
            from: 1,
            board: [[1, 1, 1, 1], [], [], [2, 2, 2], [], [], []],
            boardState: BoardState.winPlayer1,
            winningCells: [
                [0, 0],
                [1, 0],
                [2, 0],
                [3, 0]
            ]
        });
        await client1.waitForMessage(lastUpdateMessage);
        await client2.waitForMessage(lastUpdateMessage);

        await client1.waitForMessage(
            JSON.stringify({ type: 'game_over', reason: BoardState.winPlayer1 })
        );
        await client2.waitForMessage(
            JSON.stringify({ type: 'game_over', reason: BoardState.winPlayer1 })
        );
    });

    it('should notify the players when the game is over - player2 wins', async () => {
        await setupValidGame();

        client1.send(JSON.stringify({ type: 'move', column: 0 }));
        await client1.waitForNewMessage();
        client2.send(JSON.stringify({ type: 'move', column: 1 }));
        await client1.waitForNewMessage();
        client1.send(JSON.stringify({ type: 'move', column: 6 }));
        await client1.waitForNewMessage();
        client2.send(JSON.stringify({ type: 'move', column: 2 }));
        await client1.waitForNewMessage();
        client1.send(JSON.stringify({ type: 'move', column: 6 }));
        await client1.waitForNewMessage();
        client2.send(JSON.stringify({ type: 'move', column: 3 }));
        await client1.waitForNewMessage();
        client1.send(JSON.stringify({ type: 'move', column: 6 }));
        await client1.waitForNewMessage();
        client2.send(JSON.stringify({ type: 'move', column: 4 }));
        await client1.waitForNewMessage();

        const lastUpdateMessage = JSON.stringify({
            type: 'update_board',
            from: 2,
            board: [[1], [2], [2], [2], [2], [], [1, 1, 1]],
            boardState: BoardState.winPlayer2,
            winningCells: [
                [0, 1],
                [0, 2],
                [0, 3],
                [0, 4]
            ]
        });
        await client1.waitForMessage(lastUpdateMessage);
        await client2.waitForMessage(lastUpdateMessage);

        await client1.waitForMessage(
            JSON.stringify({ type: 'game_over', reason: BoardState.winPlayer2 })
        );
        await client2.waitForMessage(
            JSON.stringify({ type: 'game_over', reason: BoardState.winPlayer2 })
        );
    });

    it('should notify the players when the game is over - draw', async () => {
        await setupValidGame();

        client1.send(JSON.stringify({ type: 'move', column: 3 }));
        await client1.waitForNewMessage();
        client2.send(JSON.stringify({ type: 'move', column: 3 }));
        await client1.waitForNewMessage();
        client1.send(JSON.stringify({ type: 'move', column: 3 }));
        await client1.waitForNewMessage();
        client2.send(JSON.stringify({ type: 'move', column: 3 }));
        await client1.waitForNewMessage();
        client1.send(JSON.stringify({ type: 'move', column: 3 }));
        await client1.waitForNewMessage();

        for (const col of [0, 1, 2, 4, 5, 6]) {
            for (let i = 0; i < 3; i++) {
                client2.send(JSON.stringify({ type: 'move', column: col }));
                await client1.waitForNewMessage();
                client1.send(JSON.stringify({ type: 'move', column: col }));
                await client1.waitForNewMessage();
            }
        }

        client2.send(JSON.stringify({ type: 'move', column: 3 }));
        await client1.waitForNewMessage();

        const lastUpdateMessage = JSON.stringify({
            type: 'update_board',
            from: 2,
            board: [
                [2, 1, 2, 1, 2, 1],
                [2, 1, 2, 1, 2, 1],
                [2, 1, 2, 1, 2, 1],
                [1, 2, 1, 2, 1, 2],
                [2, 1, 2, 1, 2, 1],
                [2, 1, 2, 1, 2, 1],
                [2, 1, 2, 1, 2, 1]
            ],
            boardState: BoardState.draw,
            winningCells: null
        });
        await client1.waitForMessage(lastUpdateMessage);
        await client2.waitForMessage(lastUpdateMessage);

        await client1.waitForMessage(
            JSON.stringify({ type: 'game_over', reason: BoardState.draw })
        );
        await client2.waitForMessage(
            JSON.stringify({ type: 'game_over', reason: BoardState.draw })
        );
    });

    it('should allow restarting the game if its over', async () => {
        const gameId = await setupValidGame();
        const game = getGameById(gameId);

        client1.send(JSON.stringify({ type: 'move', column: 0 }));
        await client1.waitForNewMessage();
        client2.send(JSON.stringify({ type: 'move', column: 3 }));
        await client1.waitForNewMessage();
        client1.send(JSON.stringify({ type: 'move', column: 0 }));
        await client1.waitForNewMessage();
        client2.send(JSON.stringify({ type: 'move', column: 3 }));
        await client1.waitForNewMessage();
        client1.send(JSON.stringify({ type: 'move', column: 0 }));
        await client1.waitForNewMessage();
        client2.send(JSON.stringify({ type: 'move', column: 3 }));
        await client1.waitForNewMessage();
        client1.send(JSON.stringify({ type: 'move', column: 0 }));
        await client1.waitForNewMessage();
        assert.equal(game.gameState, GameState.gameOver);

        client1.send(JSON.stringify({ type: 'restart' }));
        await client1.waitForMessage(
            JSON.stringify({ type: 'game_ready', youAre: 2, board: [[], [], [], [], [], [], []] })
        );
        await client2.waitForMessage(
            JSON.stringify({ type: 'game_ready', youAre: 1, board: [[], [], [], [], [], [], []] })
        );

        client1.send(JSON.stringify({ type: 'move', column: 0 }));
        await client1.waitForMessage(JSON.stringify({ error: 'not_your_turn' }));

        client2.send(JSON.stringify({ type: 'move', column: 3 }));
        await client1.waitForMessage(
            JSON.stringify({
                type: 'update_board',
                from: 1,
                board: [[1], [], [], [], [], [], []],
                boardState: BoardState.notOver,
                winningCells: null
            })
        );
    });

    it('should reject restarting the game if its not over', async () => {
        const gameId = await setupValidGame();
        const game = getGameById(gameId);

        client1.send(JSON.stringify({ type: 'move', column: 0 }));
        await client1.waitForNewMessage();
        client2.send(JSON.stringify({ type: 'move', column: 3 }));
        await client1.waitForNewMessage();

        client1.send(JSON.stringify({ type: 'restart' }));
        await client1.waitForMessage(JSON.stringify({ error: 'game_is_not_over' }));
        assert.equal(game.gameState, GameState.playing);

        client1.send(JSON.stringify({ type: 'move', column: 3 }));
        await client1.waitForMessage(
            JSON.stringify({
                type: 'update_board',
                from: 1,
                board: [[1], [], [], [2, 1], [], [], []],
                boardState: BoardState.notOver,
                winningCells: null
            })
        );
    });
});
