import { pbkdf2Sync, randomBytes } from 'node:crypto';
import { db } from '../../databases/db.js';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import crypto from 'node:crypto';
import { User, UserWithAuth } from './types.js';
import { Scope } from '../../routes/types.js';

/**
 * Creates a user in the DB which can be authentified with passport.
 * Since this is a personnal API I don't want a signup page so this
 * should only be run manually and not from an endpoint.
 *
 * Returns the id of the created user
 */
export const createUser = async (username: string, password: string, scopes: Scope[]) => {
    if (!username || !username.length) {
        throw new Error('Username must be defined');
    }
    if (!password || !password.length) {
        throw new Error('Password must be defined');
    }
    const salt = randomBytes(16);
    const [res] = await db.query(
        'INSERT INTO User (username, hashedPassword, salt, scopes) VALUES (?, ?, ?, ?)',
        [username, pbkdf2Sync(password, salt, 310000, 32, 'sha256'), salt, JSON.stringify(scopes)]
    );

    return (res as ResultSetHeader).insertId;
};

const getAuthUserByUsername = async (username: string) => {
    const [rows] = await db.query<(UserWithAuth & RowDataPacket)[]>(
        'SELECT id, username, scopes, hashedPassword, salt FROM User WHERE username = ?',
        [username]
    );

    if (!rows || !rows.length) {
        return;
    }

    return {
        id: rows[0].id,
        username: rows[0].username,
        hashedPassword: rows[0].hashedPassword,
        salt: rows[0].salt,
        scopes: rows[0].scopes
    };
};

export const getUserById = async (id: number): Promise<User | undefined> => {
    const [rows] = await db.query<(User & RowDataPacket)[]>(
        'SELECT id, username, scopes FROM User WHERE id = ?',
        [id]
    );

    if (!rows || !rows.length) {
        return;
    }

    return {
        id: rows[0].id,
        username: rows[0].username,
        scopes: rows[0].scopes
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
