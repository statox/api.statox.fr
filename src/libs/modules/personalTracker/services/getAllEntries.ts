import _sodium from 'libsodium-wrappers-sumo';
import { RowDataPacket } from 'mysql2/promise';
import { db } from '../../../databases/db.js';
import { PersonalEvent } from '../types.js';

export const getAllEntries = async (): Promise<PersonalEvent[]> => {
    await _sodium.ready;
    const sodium = _sodium;
    if (!sodium) {
        throw new Error("Sodium isn't ready");
    }

    const [rows] = await db.query<
        ({
            salt: Buffer;
            nonce: Buffer;
            ciphertext: Buffer;
            eventDateUnix: number;
        } & RowDataPacket)[]
    >(
        `SELECT eventDateUnix, salt, nonce, ciphertext FROM PersonalTracker ORDER BY eventDateUnix DESC`
    );
    return rows.map((row) => {
        return {
            eventDateUnix: row.eventDateUnix,
            saltB64: sodium.to_base64(row.salt),
            nonceB64: sodium.to_base64(row.nonce),
            ciphertextB64: sodium.to_base64(row.ciphertext)
        };
    });
};
