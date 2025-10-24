import request from 'supertest';
import { createUser } from '../../../src/libs/modules/auth/index.js';
import { app } from '../../../src/app.js';
import { assert } from 'chai';

/*
 * This should be moved to tests/framework
 */
describe('/auth/me', () => {
    beforeEach(async () => {
        await createUser('user', 'passwd');
    });

    it('Returns when not authenticated', async () => {
        const res = await request(app).post('/auth/me').send({}).expect(401);

        assert.deepEqual(res.body, {
            message: 'UNAUTHORIZED'
        });
    });
    it('Returns a user when authenticated', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({ username: 'user', password: 'passwd' })
            .expect(200);

        // Get the session cookie returned to client
        const cookie = res.headers['set-cookie'];

        // use the cookie in a subsequent authenticated request
        const res2 = await request(app).post('/auth/me').send({}).set('Cookie', cookie).expect(200);
        assert.deepEqual(res2.body, {
            status: 'logged_in',
            user: {
                id: 1,
                username: 'user'
            }
        });
    });
});
