import request from 'supertest';
import { createUser } from '../../../src/libs/modules/auth/index.js';
import { TestHelper } from '../TestHelper.js';
import { app } from '../../../src/app.js';

let passportSessionCookie = '';

const setupAuth2User = async () => {
    // We rely on the mysql test helper to clean the table before this hook to recreate the user
    // without violating the uniq username constraint
    await createUser('user', 'passwd');
    // TODO This is slow. I should look into generating the session without calling the endpoint
    // I might want to wait to use a mysql store for express-session before trying to do that
    const res = await request(app)
        .post('/auth/login')
        .send({ username: 'user', password: 'passwd' })
        .expect(200);
    passportSessionCookie = res.headers['set-cookie'];
};

class TestHelper_Auth2 extends TestHelper {
    constructor() {
        super({
            name: 'Auth2',
            hooks: {
                beforeEach: setupAuth2User
            }
        });
    }

    setupAuth2User = setupAuth2User;

    getPassportSessionCookie = () => {
        if (!passportSessionCookie) {
            new Error('Setup Auth2 before trying to get the cookie');
        }

        return passportSessionCookie;
    };
}

export const testHelper_Auth2 = new TestHelper_Auth2();
