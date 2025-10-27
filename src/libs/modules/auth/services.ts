import { pbkdf2Sync, randomBytes } from 'node:crypto';
import { db } from '../../databases/db.js';
import { RowDataPacket } from 'mysql2/promise';
import crypto from 'node:crypto';
import { User, UserWithAuth } from './types.js';

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

const getAuthUserByUsername = async (username: string) => {
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

export const getUserById = async (id: number): Promise<User | undefined> => {
    const [rows] = await db.query<(User & RowDataPacket)[]>(
        'SELECT id, username FROM User WHERE id = ?',
        [id]
    );

    if (!rows || !rows.length) {
        return;
    }

    return {
        id: rows[0].id,
        username: rows[0].username
    };
};

const checkPasswordMatch = (password: string, user: UserWithAuth) => {
    const hashedPassword = crypto.pbkdf2Sync(password, user.salt, 310000, 32, 'sha256');
    return crypto.timingSafeEqual(user.hashedPassword, hashedPassword);
};

/**
 * Take a password and a username and return the id of the
 * corresponding user if the password match
 */
export const validateUserPassword = async (
    username: string,
    password: string
): Promise<number | undefined> => {
    const user = await getAuthUserByUsername(username);

    if (!user) {
        return;
    }
    const isPasswordValid = checkPasswordMatch(password, user);

    if (!isPasswordValid) {
        return;
    }

    return user.id;
};
