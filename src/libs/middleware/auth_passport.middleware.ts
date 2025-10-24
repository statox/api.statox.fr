import fs from 'node:fs';
import path from 'node:path';

import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import { User, validateUser } from '../modules/auth/index.js';

import session from 'express-session';
import connectSqlite3 from 'connect-sqlite3';
const SQLiteStore = connectSqlite3(session);

passport.use(
    new LocalStrategy.Strategy(async function verify(username, password, done) {
        console.log('Applying local strategy');
        const user = await validateUser(username, password);
        if (!user) {
            console.log('local strat: no user');
            return done(null, false, { message: 'Invalid username or password' });
        }
        console.log('local strat: user', user);
        return done(null, user);
    })
);

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, { id: (user as User).id, username: (user as User).username });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user as User);
    });
});

const sqliteDbsPath = path.resolve('/tmp/db/');
const sessionsDbName = 'session.db';
const dbFilePath = path.join(sqliteDbsPath, sessionsDbName);

// Ensure directory exists
if (!fs.existsSync(sqliteDbsPath)) fs.mkdirSync(sqliteDbsPath, { recursive: true });

// Ensure file exists (touch)
if (!fs.existsSync(dbFilePath)) fs.closeSync(fs.openSync(dbFilePath, 'w'));

const sessionStore = new SQLiteStore({
    db: sessionsDbName,
    dir: sqliteDbsPath
}) as unknown as session.Store;

export const doPassportSession = session({
    // /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\
    // IMPORTANT TODO: CHANGE THAT BEFORE GOING TO PROD
    secret: 'keyboard cat',
    // /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    store: sessionStore
});

export class AuthUnauthorizedError extends Error {
    constructor() {
        super('UNAUTHORIZED');
    }
}

export const validatePassportAuth = async (req: Request, res: Response, next: NextFunction) =>
    passport.authenticate(
        'local',
        // TODO: Log attempts and details with currently unused _info param
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (err: Error, user?: Express.User | false | null, _info?: { message: string }) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return next(new AuthUnauthorizedError());
            }
            req.logIn(user, (err) => (err ? next(err) : next()));
        }
    )(req, res, next);

export const validatePassportSession = async (req: Request, res: Response, next: NextFunction) =>
    passport.authenticate('session')(req, res, () => {
        // passport.authenticate('session') populates req.isUnauthenticated and req.user
        if (req.isUnauthenticated()) {
            // If the user didn't call login to trigger validatePassportAuth and initialize a session before
            // or if the session expired then we reject the auth
            return next(new AuthUnauthorizedError());
        }

        return next();
    });
