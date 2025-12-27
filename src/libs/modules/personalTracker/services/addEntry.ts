import _sodium from 'libsodium-wrappers-sumo';
import { db } from '../../../databases/db.js';
import { PersonalEvent } from '../types.js';

export const addEntry = async (event: PersonalEvent, userId: number) => {
    await _sodium.ready;
    const sodium = _sodium;
    if (!sodium) {
        throw new Error("Sodium isn't ready");
    }

    const { eventDateUnix, saltB64, nonceB64, ciphertextB64 } = event;

    const salt = Buffer.from(sodium.from_base64(saltB64));
    const nonce = Buffer.from(sodium.from_base64(nonceB64));
    const ciphertext = Buffer.from(sodium.from_base64(ciphertextB64));

    await db.query(
        `INSERT INTO PersonalTracker (userId, eventDateUnix, salt, nonce, ciphertext)
        VALUES (?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
        salt = VALUES(salt),
        nonce = VALUES(nonce),
        ciphertext = VALUES(ciphertext)`,
        [userId, eventDateUnix, salt, nonce, ciphertext]
    );
};
