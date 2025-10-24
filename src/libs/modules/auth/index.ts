import { pbkdf2Sync, randomBytes } from 'node:crypto';
import { db } from '../../databases/db.js';
import { RowDataPacket } from 'mysql2/promise';
import crypto from 'node:crypto';

/**
 * Creates a user in the DB which can be authentified with passport.
 * Since this is a personnal API I don't want a signup page so this
 * should only be run manually and not from an endpoint.
 */
export const createUser = async (username: string, password: string) => {
    if (!username || !username.length) {
        throw new Error('Username must be defined');
    }
    if (!password || !password.length) {
        throw new Error('Password must be defined');
    }
    const salt = randomBytes(16);
    return db.query('INSERT INTO User (username, hashedPassword, salt) VALUES (?, ?, ?)', [
        username,
        pbkdf2Sync(password, salt, 310000, 32, 'sha256'),
        salt
    ]);
};

export interface User {
    id: number;
    username: string;
}

export type UserWithAuth = User & {
    hashedPassword: Buffer;
    salt: Buffer;
};

export const getUserByUSername = async (username: string) => {
    const [rows] = await db.query<(UserWithAuth & RowDataPacket)[]>(
        'SELECT id, username, hashedPassword, salt FROM User WHERE username = ?',
        [username]
    );

    if (!rows || !rows.length) {
        return;
    }

    return {
        id: rows[0].id,
        username: rows[0].username,
        hashedPassword: rows[0].hashedPassword,
        salt: rows[0].salt
    };
};

export const checkPasswordMatch = (password: string, user: UserWithAuth) => {
    const hashedPassword = crypto.pbkdf2Sync(password, user.salt, 310000, 32, 'sha256');
    return crypto.timingSafeEqual(user.hashedPassword, hashedPassword);
};

export const validateUser = async (username: string, password: string) => {
    console.log('validate user');
    const user = await getUserByUSername(username);
    console.log('got user result');

    if (!user) {
        console.log('  but no user');
        return;
    }
    const isPasswordValid = checkPasswordMatch(password, user);
    console.log('compared password');
    if (!isPasswordValid) {
        return;
    }

    return {
        id: user.id,
        username: user.username
    };
};
