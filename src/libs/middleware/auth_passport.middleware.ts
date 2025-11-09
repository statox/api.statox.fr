import { CookieOptions, NextFunction, Request, Response } from 'express';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import { getUserById, User, validateUserPassword } from '../modules/auth/index.js';

import session from 'express-session';
import connectMysql from 'express-mysql-session';
import { slog } from '../modules/logging/slog.js';
import { slackNotifier } from '../modules/notifier/slack.js';
import { config } from '../../packages/config/index.js';
import mysql, { PoolOptions } from 'mysql2/promise';
import { isProd } from '../../packages/config/sources/env.js';
const MySQLStore = connectMysql(session);

passport.use(
    new LocalStrategy.Strategy(async function verify(username, password, done) {
        const user = await validateUserPassword(username, password);
        if (!user) {
            return done(null, false, { message: 'Invalid username or password' });
        }
        return done(null, user);
    })
);

passport.serializeUser(function (userId, cb) {
    process.nextTick(async function () {
        // Store only the user id in the session, complete user profile is retrieved in deserializeUser()
        return cb(null, userId);
    });
});

passport.deserializeUser(function (userId: number, cb) {
    process.nextTick(async function () {
        // Get the data of the user we want to pass to the route
        const user = await getUserById(userId);

        if (!user) {
            // That should not happen since sessions are created for existing users.
            // If we are here potential issues are:
            //     - We deleted a user which had an active session
            //     - Somehow we messed up the user id
            // For now I'm not sure how to handle the error path so I'll with throw
            // and Error and find a way to handler that properly when the case happens.
            //
            slog.log('auth', "Couldn't find user when deserializing a session", { userId });
            slackNotifier.notifySlack({
                directMention: true,
                message: `Error in auth proces - Couldn't find user when deserializing a session. UserId: ${userId}`
            });

            throw new Error(
                `Error in auth proces - Couldn't find user when deserializing a session. UserId: ${userId}`
            );
        }

        return cb(null, user as User);
    });
});

const getSessionDBConnection = () => {
    // We store the express sessions in the mysql DB but we don't use the same
    // connection pool object as the rest of the application (en partie because
    // we haven't called initDb() yet when we are here)
    // So we create the connection object here
    const parsedUrl = new URL(config.mysql.connectionUrl);

    if (!parsedUrl) {
        throw new Error('Couldnt parse DB url');
    }

    const requiredFields: (keyof URL)[] = ['hostname', 'port', 'username', 'password', 'pathname'];
    for (const field of requiredFields) {
        if (!parsedUrl[field]) {
            throw new Error(`Missing ${field} in DB url`);
        }
    }

    const connectionOptions: PoolOptions = {
        host: parsedUrl.hostname!,
        port: Number(parsedUrl.port!),
        user: parsedUrl.username,
        password: parsedUrl.password,
        database: parsedUrl.pathname.replace(/^\//, ''),
        waitForConnections: true,
        connectionLimit: 5,
        queueLimit: 1000
    };

    return mysql.createConnection(connectionOptions);
};

// Exported for tests
export const sessionStore = new MySQLStore(
    {},
    // @ts-expect-error For some reason the typing of the connection seems wrong
    await getSessionDBConnection()
) as unknown as session.Store;

const allowedOrigins = ['https://apps.statox.fr', 'https://localhost:8080'];

export const setPassportHeaders = (req: Request, res: Response, next: NextFunction) => {
    // To send the creds alongside the request, the client need to use `credentials: 'include'`
    // for that to work the server needs to set the following headers
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header(
        'Access-Control-Allow-Headers',
        'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
    );

    // Only set Access-Control-Allow-Origin if the origin is in our whitelist
    const origin = req.headers.origin;
    if (typeof origin === 'string' && allowedOrigins.includes(origin) && origin !== 'null') {
        res.header('Access-Control-Allow-Origin', origin);
    }

    slog.log('auth', 'setPassportHeaders');
    next();
};

const cookieOptions: CookieOptions = {
    // Secure: true = Require the frontend to be servers with https (even localhost for dev)
    secure: isProd,
    // httpOnly: true = JS can't access the session cookie on the client
    httpOnly: true,
    // sameSite: 'none' = Allow localhost:8080 to get a cookie from api.tatox.fr
    // We use 'lax' locally because `sameSite: 'none'` requires `secure: true` which
    // we don't want to do with local dev frontend
    // TODO: Find a way to enforce samesite while allowing dev frontend to call the real API
    sameSite: isProd ? 'none' : 'lax'
};

export const doPassportSession = session({
    secret: config.express.sessionsSecret,
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    store: sessionStore,
    cookie: cookieOptions
});

export class AuthUnauthorizedError extends Error {
    constructor() {
        super('UNAUTHORIZED');
    }
}

export class AuthInvalidScopeError extends Error {
    constructor() {
        super('INVALID_SCOPE');
    }
}

export const logoutPassportRequest = async (req: Request, res: Response, next: NextFunction) =>
    passport.authenticate('session')(req, res, () => {
        // passport.authenticate('session') populates req.isUnauthenticated and req.user
        if (req.isUnauthenticated()) {
            // If the user didn't call login to trigger validatePassportAuth and initialize a session before
            // or if the session expired then we reject the auth
            return next(new AuthUnauthorizedError());
        }

        return req.logout(() => {
            req.session.destroy(() => {
                res.clearCookie('connect.sid', cookieOptions);
                return next();
            });
        });
    });

export const validatePassportAuth = async (req: Request, res: Response, next: NextFunction) =>
    passport.authenticate(
        'local',
        // TODO: Log attempts and details with currently unused _info param
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (err: Error, user?: Express.User | false | null, _info?: { message: string }) => {
            if (err) {
                slog.log('auth', 'Authenticate local - error', {
                    error: err,
                    dataStr: JSON.stringify(user)
                });
                return next(err);
            }
            if (!user) {
                slog.log('auth', 'Authenticate local - rejected', {
                    dataStr: JSON.stringify(user)
                });
                return next(new AuthUnauthorizedError());
            }
            slog.log('auth', 'Authenticate local - login', {
                dataStr: JSON.stringify(user)
            });
            req.logIn(user, (err) => (err ? next(err) : next()));
        }
    )(req, res, next);

export const validatePassportSession = async (req: Request, res: Response, next: NextFunction) =>
    passport.authenticate('session')(req, res, (error: Error) => {
        if (error) {
            slog.log('auth', 'Authenticate session - error', {
                error
            });
            return next(error);
        }
        // passport.authenticate('session') populates req.isUnauthenticated and req.user
        if (req.isUnauthenticated()) {
            slog.log('auth', 'Authenticate session - rejected', {});
            // If the user didn't call login to trigger validatePassportAuth and initialize a session before
            // or if the session expired then we reject the auth
            return next(new AuthUnauthorizedError());
        }

        slog.log('auth', 'Authenticate session - accepted', {});
        return next();
    });

export const validateEndpointScope = (endpointRequiredScope?: string) => {
    return async (req: Request, _res: Response, next: NextFunction) => {
        if (!endpointRequiredScope) {
            slog.log('auth', 'Endpoint doesnt require a scope', { url: req.url });
            return next(new Error('auth2_endpoint_without_scope'));
        }

        const user = req.user as User;
        if (!user) {
            slog.log('auth', 'Trying to get scopes on mising user - error', { url: req.url });
            return next(new AuthUnauthorizedError());
        }

        if (!user.scopes) {
            slog.log('auth', 'User has no scopes', { userId: user.id, url: req.url });
            return next(new AuthInvalidScopeError());
        }

        if (user.scopes.includes('admin')) {
            slog.log('auth', 'User is admin', {
                userId: user.id,
                url: req.url,
                userScopes: user.scopes
            });
            return next();
        }

        if (user.scopes.includes(endpointRequiredScope)) {
            slog.log('auth', 'User has allowed scope', {
                userId: user.id,
                url: req.url,
                userScopes: user.scopes,
                requiredScope: endpointRequiredScope
            });
            return next();
        }

        slog.log('auth', 'User has no allowed scope', {
            userId: user.id,
            url: req.url,
            userScopes: user.scopes,
            requiredScope: endpointRequiredScope
        });
        return next(new AuthInvalidScopeError());
    };
};
