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

describe('gravitrips/ws', () => {
    let client1: TestWebSocket;
    let client2: TestWebSocket;

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
        const { gameId } = (await request(app).get('/gravitrips/getNewGame')).body;
        const game = getGameById(gameId);

        // Register player 1
        client1 = new TestWebSocket(WS_SERVER_URL + `/gravitrips/ws?${gameId}`);
        await client1.waitUntil('open');

        // Register player 2
        client2 = new TestWebSocket(WS_SERVER_URL + `/gravitrips/ws?${gameId}`);
        await client2.waitUntil('open');

        assert.isDefined(game.player1);
        assert.isDefined(game.player2);
        assert.equal(game.player2.id, 2);
        assert.equal(game.gameState, GameState.playing);

        // Notified both players that game is ready
        await client1.waitForMessage(
            JSON.stringify({ type: 'game_ready', youAre: 1, board: [[], [], [], [], [], [], []] })
        );
        await client2.waitForMessage(
            JSON.stringify({ type: 'game_ready', youAre: 2, board: [[], [], [], [], [], [], []] })
        );
    });

    it('should reject the registration of a third player', async () => {
        const { gameId } = (await request(app).get('/gravitrips/getNewGame')).body;

        client1 = new TestWebSocket(WS_SERVER_URL + `/gravitrips/ws?${gameId}`);
        client2 = new TestWebSocket(WS_SERVER_URL + `/gravitrips/ws?${gameId}`);
        await client1.waitUntil('open');
        await client2.waitUntil('open');

        const client3 = new TestWebSocket(WS_SERVER_URL + `/gravitrips/ws?${gameId}`);
        await client3.waitForMessage(JSON.stringify({ error: 'game_already_full' }));
    });

    it('should notify a player when the other disconnects', async () => {
        it('should work for player1', async () => {
            const { gameId } = (await request(app).get('/gravitrips/getNewGame')).body;

            client1 = new TestWebSocket(WS_SERVER_URL + `/gravitrips/ws?${gameId}`);
            client2 = new TestWebSocket(WS_SERVER_URL + `/gravitrips/ws?${gameId}`);
            await client1.waitUntil('open');
            await client2.waitUntil('open');

            client1.close();
            await client2.waitForMessage(
                JSON.stringify({ type: 'game_over', reason: 'other_player_disconnected' })
            );
        });
        it('should work for player2', async () => {
            const { gameId } = (await request(app).get('/gravitrips/getNewGame')).body;

            client1 = new TestWebSocket(WS_SERVER_URL + `/gravitrips/ws?${gameId}`);
            client2 = new TestWebSocket(WS_SERVER_URL + `/gravitrips/ws?${gameId}`);
            await client1.waitUntil('open');
            await client2.waitUntil('open');

            client2.close();
            await client1.waitForMessage(
                JSON.stringify({ type: 'game_over', reason: 'other_player_disconnected' })
            );
        });
    });

    it('should send board updates to both players each time a player make moves', async () => {
        const { gameId } = (await request(app).get('/gravitrips/getNewGame')).body;
        client1 = new TestWebSocket(WS_SERVER_URL + `/gravitrips/ws?${gameId}`);
        client2 = new TestWebSocket(WS_SERVER_URL + `/gravitrips/ws?${gameId}`);

        // Wait for the game to start
        await client1.waitForMessage(
            JSON.stringify({
                type: 'game_ready',
                youAre: 1,
                board: [[], [], [], [], [], [], []]
            })
        );

        client1.send(JSON.stringify({ move: 3 }));
        const firstMoveMessage = JSON.stringify({
            type: 'update_board',
            from: 1,
            board: [[], [], [], [1], [], [], []],
            boardState: BoardState.notOver,
            winningCells: null
        });
        await client1.waitForMessage(firstMoveMessage);
        await client2.waitForMessage(firstMoveMessage);

        client2.send(JSON.stringify({ move: 3 }));
        const secondMoveMessage = JSON.stringify({
            type: 'update_board',
            from: 2,
            board: [[], [], [], [1, 2], [], [], []],
            boardState: BoardState.notOver,
            winningCells: null
        });
        await client1.waitForMessage(secondMoveMessage);
        await client2.waitForMessage(secondMoveMessage);

        client1.send(JSON.stringify({ move: 0 }));
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

        client2.send(JSON.stringify({ move: 3 }));
        await client2.waitForMessage(JSON.stringify({ error: 'not_your_turn' }));

        client1.send(JSON.stringify({ move: 0 }));
        const firstMoveMessage = JSON.stringify({
            type: 'update_board',
            from: 1,
            board: [[1], [], [], [], [], [], []],
            boardState: BoardState.notOver,
            winningCells: null
        });
        await client1.waitForMessage(firstMoveMessage);
        await client2.waitForMessage(firstMoveMessage);

        client1.send(JSON.stringify({ move: 3 }));
        await client1.waitForMessage(JSON.stringify({ error: 'not_your_turn' }));
    });

    it('should reject an invalid input', async () => {
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

        client1.send('Foo bar');
        await client1.waitForMessage(JSON.stringify({ error: 'invalid_input_message' }));
    });

    it('should notify the players when the game is over', async () => {
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

        client1.send(JSON.stringify({ move: 0 }));
        await client1.waitForNewMessage();
        client2.send(JSON.stringify({ move: 3 }));
        await client1.waitForNewMessage();
        client1.send(JSON.stringify({ move: 0 }));
        await client1.waitForNewMessage();
        client2.send(JSON.stringify({ move: 3 }));
        await client1.waitForNewMessage();
        client1.send(JSON.stringify({ move: 0 }));
        await client1.waitForNewMessage();
        client2.send(JSON.stringify({ move: 3 }));
        await client1.waitForNewMessage();
        client1.send(JSON.stringify({ move: 0 }));

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
});
