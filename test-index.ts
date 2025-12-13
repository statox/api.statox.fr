import _sodium from 'libsodium-wrappers-sumo';
import { DateTime } from 'luxon';

import type { default as LibsodiumType } from 'libsodium-wrappers-sumo';
import { addEntry, getAllEntries } from './src/libs/modules/personalTracker/index.js';
import { initDb } from './src/libs/databases/db.js';

let sodium: typeof LibsodiumType | null = null;

export const getRandomSalt = () => {
    if (!sodium) {
        throw new Error("Sodium isn't ready");
    }
    const salt = sodium.randombytes_buf(sodium.crypto_pwhash_SALTBYTES);
    return { saltB64: sodium.to_base64(salt) };
};

export const getUserKey = (params: { password: string; saltB64: string }) => {
    if (!sodium) {
        throw new Error("Sodium isn't ready");
    }

    const { password, saltB64 } = params;

    try {
        const salt = sodium.from_base64(saltB64);

        const derivedKey = sodium.crypto_pwhash(
            sodium.crypto_box_SEEDBYTES,
            password,
            salt,
            sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE,
            sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE,
            sodium.crypto_pwhash_ALG_DEFAULT
        );

        return { keyB64: sodium.to_base64(derivedKey) };
    } catch (e) {
        console.log('Error while deriving key');
        console.error(e);
        throw e;
    }
};

export const encryptData = (params: { data: string; keyB64: string }) => {
    if (!sodium) {
        throw new Error("Sodium isn't ready");
    }

    const { data, keyB64 } = params;

    try {
        const encryptionKey = sodium.from_base64(keyB64);
        // Nonces must not be reused in two different messages so we generate the
        // nonce here for each message. It can then be stored next to the data, it's not secret.
        const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);
        const nonceB64 = sodium.to_base64(nonce);

        const messageBytes = sodium.from_string(data);
        const ciphertext = sodium.crypto_secretbox_easy(messageBytes, nonce, encryptionKey);
        const ciphertextB64 = sodium.to_base64(ciphertext);

        return { ciphertextB64, nonceB64 };
    } catch (e) {
        console.log('Error while encrypting data');
        console.error(e);
        throw e;
    }
};

export const decryptData = (params: {
    ciphertextB64: string;
    nonceB64: string;
    keyB64: string;
}) => {
    if (!sodium) {
        throw new Error("Sodium isn't ready");
    }

    const { ciphertextB64, nonceB64, keyB64 } = params;

    try {
        const decryptionKey = sodium.from_base64(keyB64);
        const nonce = sodium.from_base64(nonceB64);
        const ciphertext = sodium.from_base64(ciphertextB64);

        const decrypted = sodium.crypto_secretbox_open_easy(ciphertext, nonce, decryptionKey);

        return { dataB64: sodium.to_base64(decrypted) };
    } catch (e) {
        console.log('Error while decrypting data');
        console.error(e);
        throw e;
    }
};

const doAddEntry = async () => {
    const data = {
        type: 'mood',
        data: 10
    };

    const password = 'qwerty';
    const { saltB64 } = getRandomSalt();
    const { keyB64 } = getUserKey({ saltB64, password });

    const timestampUTC = DateTime.now().toUTC().toUnixInteger();
    const { ciphertextB64, nonceB64 } = encryptData({ keyB64, data: JSON.stringify(data) });

    await addEntry({ timestampUTC, saltB64, nonceB64, ciphertextB64 });
};

const doGetAllEntries = async () => {
    const entries = await getAllEntries();

    const password = 'qwerty';

    for (const { saltB64, nonceB64, ciphertextB64, timestampUTC } of entries) {
        const { keyB64 } = getUserKey({ password, saltB64 });
        const { dataB64 } = decryptData({ ciphertextB64, nonceB64, keyB64 });

        console.log('Entry from ', timestampUTC);
        const dataStr = atob(dataB64);
        const data = JSON.parse(dataStr);
        console.log(data);
    }
};

await (async () => {
    try {
        await _sodium.ready;
        sodium = _sodium;
    } catch (e) {
        console.log("Couldn't initialize sodium. Panic.");
        throw e;
    }

    await initDb();
    await doAddEntry();
    await doGetAllEntries();

    process.exit();
})();
