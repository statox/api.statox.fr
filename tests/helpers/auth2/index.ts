import { createUser } from '../../../src/libs/modules/auth/index.js';
import { TestHelper } from '../TestHelper.js';

import session from 'express-session';
import signature from 'cookie-signature';
import { config } from '../../../src/packages/config/index.js';
import { sessionStore } from '../../../src/libs/middleware/auth_passport.middleware.js';

/**
 * Creates a creates a session for a given userId, store it in the session store and returns
 * the value of the cookie
 */
const makeSessionCookie = async (sessionStore: session.Store, userId: number) => {
    const sid = `sessioncookieuser${userId}`;

    const sessionObj = {
        cookie: {
            originalMaxAge: null,
            expires: null,
            secure: false, // We don't have https in tests
            httpOnly: true,
            path: '/',
            sameSite: 'none'
        },
        passport: { user: userId }
    };
    //@ts-expect-error TODO Better type sameSite
    sessionStore.set(sid, sessionObj);

    const signed = signature.sign(sid, config.express.sessionsSecret);
    const cookie = `connect.sid=${encodeURIComponent('s:' + signed)}; Path=/; HttpOnly; SameSite=Lax`;
    return cookie;
};

let passportSessionCookie = '';

const setupAuth2User = async () => {
    // We rely on the mysql test helper to clean the table before this hook to recreate the user
    // without violating the uniq username constraint
    await createUser('user', 'passwd');

    // Generate the cookie, store it in the session/sore and make it available to tests
    passportSessionCookie = await makeSessionCookie(sessionStore, 1);
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
