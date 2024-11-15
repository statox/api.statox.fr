import request from 'supertest';
import sinon from 'sinon';
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

    it('should add a loggable context to the response and allow the route handler to add data to the access log', async () => {
        await request(app).get('/getroutewithloggedcontext');
        th.slog.checkLog('app', 'access-log', {
            path: '/getroutewithloggedcontext',
            code: 200,
            remoteIp: '::ffff:127.0.0.1',
            requestId: '00000000-0000-0000-0000-000000000001',
            requestInterrupted: false,
            context: {
                livemode: true,
                status: 'some data'
            }
        });
    });

    it('should add a loggable context to the response and an error should be in the context', async () => {
        await request(app).get('/getroutethatthrows');
        th.slog.checkLog('app', 'access-log', {
            path: '/getroutethatthrows',
            code: 500,
            remoteIp: '::ffff:127.0.0.1',
            requestId: '00000000-0000-0000-0000-000000000001',
            requestInterrupted: false,
            context: {
                error: sinon.match((error) => error.message === 'The route threw')
            }
        });
    });
});
