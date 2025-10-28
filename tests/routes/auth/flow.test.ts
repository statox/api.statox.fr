import request from 'supertest';
import { createUser } from '../../../src/libs/modules/auth/index.js';
import { app } from '../../../src/app.js';

/*
 * This should be moved to tests/framework
 */
describe('auth-passport', () => {
    describe('auth/login', () => {
        beforeEach(async () => {
            await createUser('user', 'passwd');
        });

        it(' User does not exist', async () => {
            await request(app)
                .post('/auth/login')
                .set('Accept', 'application/json')
                .send({
                    username: 'foo',
                    password: 'bar'
                })
                .expect(401);
        });

        it(' User exists - Wrong password', async () => {
            await request(app)
                .post('/auth/login')
                .set('Accept', 'application/json')
                .send({
                    username: 'user',
                    password: 'pouet'
                })
                .expect(401);
        });

        it(' User exists - Correct password', async () => {
            await request(app)
                .post('/auth/login')
                .set('Accept', 'application/json')
                .send({
                    username: 'user',
                    password: 'passwd'
                })
                .expect(200);
        });

        it('logs in and uses session cookie', async () => {
            // Protected route without cookie should reject
            await request(app).post('/auth/me').send({}).expect(401);

            const res = await request(app)
                .post('/auth/login')
                .send({ username: 'user', password: 'passwd' })
                .expect(200);

            // Get the session cookie returned to client
            const cookie = res.headers['set-cookie'];
            console.log('Cookie', cookie);

            // use the cookie in a subsequent authenticated request
            await request(app).post('/auth/me').send({}).set('Cookie', cookie).expect(200);
            // Should work several times
            await request(app).post('/auth/me').send({}).set('Cookie', cookie).expect(200);

            // Should not work without a ocokie
            await request(app).post('/auth/me').send({}).expect(401);
        });
    });

    describe('auth/logout', () => {
        beforeEach(async () => {
            await createUser('user', 'passwd');
        });

        it('logout existing user', async () => {
            const res = await request(app)
                .post('/auth/login')
                .send({ username: 'user', password: 'passwd' })
                .expect(200);

            // Get the session cookie returned to client
            const cookie = res.headers['set-cookie'];

            // use the cookie in a subsequent authenticated request
            await request(app).post('/auth/me').send({}).set('Cookie', cookie).expect(200);

            // Logout
            await request(app).post('/auth/logout').send({}).set('Cookie', cookie).expect(200);

            // Cookie should not work anymore
            await request(app).post('/auth/me').send({}).set('Cookie', cookie).expect(401);
        });
    });
});
