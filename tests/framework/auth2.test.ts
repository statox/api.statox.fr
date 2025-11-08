import request from 'supertest';
import { app } from '../../src/app.js';
import { assert } from 'chai';
import { th } from '../helpers/index.js';

describe('auth-passport', () => {
    beforeEach(async () => {
        await th.auth2.setupAuth2User({
            username: 'user',
            password: 'passwd',
            scopes: ['admin']
        });
    });

    describe('auth/login', () => {
        it('User does not exist', async () => {
            await request(app)
                .post('/auth/login')
                .set('Accept', 'application/json')
                .send({
                    username: 'carmensandiego',
                    password: 'bar'
                })
                .expect(401);
        });

        it('User exists - Wrong password', async () => {
            await request(app)
                .post('/auth/login')
                .set('Accept', 'application/json')
                .send({
                    username: 'user',
                    password: 'nottherightpassword'
                })
                .expect(401);
        });

        it('User exists - Correct password', async () => {
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

            // use the cookie in a subsequent authenticated request
            await request(app).post('/auth/me').send({}).set('Cookie', cookie).expect(200);
            // Should work several times
            await request(app).post('/auth/me').send({}).set('Cookie', cookie).expect(200);

            // Should not work without a ocokie
            await request(app).post('/auth/me').send({}).expect(401);
        });

        it('logs in and uses session cookie from helper', async () => {
            // Get the session cookie from the helper
            const cookie = th.auth2.getPassportSessionCookie();

            // use the cookie in a subsequent authenticated request
            await request(app).post('/auth/me').send({}).set('Cookie', cookie).expect(200);
        });
    });

    describe('auth/logout', () => {
        it('reject a not loggedin user', async () => {
            await request(app)
                .post('/auth/login')
                .send({ username: 'carmensandiego', password: 'passwd' })
                .expect(401);
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
            const res2 = await request(app)
                .post('/auth/logout')
                .send({})
                .set('Cookie', cookie)
                .expect(200);

            const cookie2 = res2.headers['set-cookie'];
            assert.equal(
                cookie2,
                'connect.sid=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax'
            );

            // Cookie should not work anymore
            await request(app).post('/auth/me').send({}).set('Cookie', cookie).expect(401);
        });
    });

    describe('/auth/me', () => {
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
            const res2 = await request(app)
                .post('/auth/me')
                .send({})
                .set('Cookie', cookie)
                .expect(200);

            assert.deepEqual(res2.body, {
                status: 'logged_in',
                user: {
                    id: 1,
                    username: 'user',
                    scopes: ['admin']
                }
            });
        });
    });

    describe('scopes', () => {
        it('no scope required', async () => {
            await request(app)
                .post('/post/noscope')
                .send({})
                .set('Cookie', th.auth2.getPassportSessionCookie())
                .expect(200);

            th.slog.checkLog('auth', 'Endpoint doesnt require a scope', { url: '/post/noscope' });
        });

        it('user is admin', async () => {
            await request(app)
                .post('/post/onescope')
                .send({})
                .set('Cookie', th.auth2.getPassportSessionCookie())
                .expect(200);

            th.slog.checkLog('auth', 'User is admin', { userId: 1, url: '/post/onescope' });
        });

        it('user doesnt have the right scope', async () => {
            const { cookie, userId } = await th.auth2.setupAuth2User({
                username: 'foo',
                password: 'bar',
                scopes: ['invalid']
            });

            await request(app).post('/post/onescope').send({}).set('Cookie', cookie).expect(401);

            th.slog.checkLog('auth', 'User has no allowed scope', {
                userId,
                url: '/post/onescope',
                userScopes: ['invalid'],
                requiredScope: 'scope1'
            });
        });

        it('user has the right scope', async () => {
            const { cookie, userId } = await th.auth2.setupAuth2User({
                username: 'foo',
                password: 'bar',
                scopes: ['scope1']
            });

            await request(app).post('/post/onescope').send({}).set('Cookie', cookie).expect(200);

            th.slog.checkLog('auth', 'User has allowed scope', {
                userId,
                url: '/post/onescope',
                userScopes: ['scope1'],
                requiredScope: 'scope1'
            });
        });
    });
});
