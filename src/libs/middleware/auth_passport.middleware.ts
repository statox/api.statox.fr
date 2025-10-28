import fs from 'node:fs';
import path from 'node:path';

import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import { getUserById, User, validateUserPassword } from '../modules/auth/index.js';

import session from 'express-session';
import connectSqlite3 from 'connect-sqlite3';
import { slog } from '../modules/logging/slog.js';
import { slackNotifier } from '../modules/notifier/slack.js';
const SQLiteStore = connectSqlite3(session);

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

export const logoutPassportRequest = async (req: Request, res: Response, next: NextFunction) =>
    passport.authenticate('session')(req, res, () => {
        // passport.authenticate('session') populates req.isUnauthenticated and req.user
        if (req.isUnauthenticated()) {
            // If the user didn't call login to trigger validatePassportAuth and initialize a session before
            // or if the session expired then we reject the auth
            return next(new AuthUnauthorizedError());
        }

        return req.logout(next);
    });

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
