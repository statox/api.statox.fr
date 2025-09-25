import { th } from '../../../helpers/index.js';
import { TestWebSocket } from '../../../helpers/ws/TestWebSocket.js';
import { BoardState } from '../../../../src/libs/modules/gravitrip/board.js';

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

    it('should create access logs at connection', async () => {
        // TODO Remove this test and make it part of a ws framework suite of tests
        client1 = new TestWebSocket(WS_SERVER_URL + '/gravitrips/ws');

        await client1.waitUntil('open');
        th.slog.checkLog('ws', 'access-log-ws', {
            path: '/gravitrips/ws'
        });
    });

    it('should reject a 3rd player and two are already playing', async () => {
        // TODO This will change when we create game rooms and allow multiple concurrent games
        client1 = new TestWebSocket(WS_SERVER_URL + '/gravitrips/ws');
        client2 = new TestWebSocket(WS_SERVER_URL + '/gravitrips/ws');
        await client1.waitUntil('open');
        await client2.waitUntil('open');

        const client3 = new TestWebSocket(WS_SERVER_URL + '/gravitrips/ws');
        await client3.waitUntil('close');

        th.slog.checkLog('ws', 'Gravitrip client rejected because no slot available');
    });

    it('should warn a player when the other disconnects', async () => {
        client1 = new TestWebSocket(WS_SERVER_URL + '/gravitrips/ws');
        client2 = new TestWebSocket(WS_SERVER_URL + '/gravitrips/ws');

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

        // Disconnect player 2
        client2.close();

        // Check that player 1 is notified and the connection closed
        await client1.waitForMessage(
            JSON.stringify({ type: 'game_over', reason: 'other_player_disconnected' })
        );
        await client1.waitUntil('close');
    });

    it('should warn both players when the second player joins', async () => {
        client1 = new TestWebSocket(WS_SERVER_URL + '/gravitrips/ws');

        await client1.waitForMessage(
            JSON.stringify({
                type: 'waiting_for_opponent',
                youAre: 1,
                board: [[], [], [], [], [], [], []]
            })
        );

        client2 = new TestWebSocket(WS_SERVER_URL + '/gravitrips/ws');
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
    });

    it('should send board updates to both players each time a player make moves', async () => {
        client1 = new TestWebSocket(WS_SERVER_URL + '/gravitrips/ws');
        client2 = new TestWebSocket(WS_SERVER_URL + '/gravitrips/ws');

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
});
