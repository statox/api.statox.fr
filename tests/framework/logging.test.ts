import sinon from 'sinon';
import request from 'supertest';
import { app } from '../../src/app';
import { th } from '../helpers';

describe('logging middleware', () => {
    it('should emit an access-log when the request finishes', async () => {
        await request(app).get('/getRoute');
        th.slog.checkLog('app', 'access-log', {
            path: '/getRoute',
            code: 200,
            remoteIp: '::ffff:127.0.0.1',
            requestId: '00000000-0000-0000-0000-000000000001',
            requestInterrupted: false,
            executionTimeMs: sinon.match((val) => val < 5)
        });

        await request(app).get('/pouet');
        th.slog.checkLog('app', 'access-log', {
            path: '/pouet',
            code: 404,
            executionTimeMs: sinon.match((val) => val < 5)
        });
    });
});
