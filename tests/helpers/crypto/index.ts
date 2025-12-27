import _sodium from 'libsodium-wrappers-sumo';
import { TestHelper } from '../TestHelper.js';

class TestHelper_Crypto extends TestHelper {
    constructor() {
        super({
            name: 'Crypto',
            hooks: {
                beforeEach: async () => {
                    await _sodium.ready;
                }
            }
        });
    }

    getRandomSalt = (): { saltB64: string } => {
        const sodium = _sodium;
        const salt = sodium.randombytes_buf(sodium.crypto_pwhash_SALTBYTES);
        const saltB64 = sodium.to_base64(salt);
        return { saltB64 };
    };

    getUserKey = ({
        password,
        saltB64
    }: {
        password: string;
        saltB64: string;
    }): { keyB64: string } => {
        const sodium = _sodium;
        const salt = sodium.from_base64(saltB64);
        const key = sodium.crypto_pwhash(
            sodium.crypto_secretbox_KEYBYTES,
            password,
            salt,
            sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE,
            sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE,
            sodium.crypto_pwhash_ALG_ARGON2ID13
        );
        const keyB64 = sodium.to_base64(key);
        return { keyB64 };
    };

    encryptData = ({
        data,
        keyB64
    }: {
        data: string;
        keyB64: string;
    }): { ciphertextB64: string; nonceB64: string } => {
        const sodium = _sodium;
        const key = sodium.from_base64(keyB64);
        const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);
        const dataBytes = new TextEncoder().encode(data);
        const ciphertext = sodium.crypto_secretbox_easy(dataBytes, nonce, key);
        const ciphertextB64 = sodium.to_base64(ciphertext);
        const nonceB64 = sodium.to_base64(nonce);
        return { ciphertextB64, nonceB64 };
    };

    decryptData = ({
        ciphertextB64,
        nonceB64,
        keyB64
    }: {
        ciphertextB64: string;
        nonceB64: string;
        keyB64: string;
    }): { dataB64: string } => {
        const sodium = _sodium;
        const key = sodium.from_base64(keyB64);
        const nonce = sodium.from_base64(nonceB64);
        const ciphertext = sodium.from_base64(ciphertextB64);
        const decrypted = sodium.crypto_secretbox_open_easy(ciphertext, nonce, key);
        const dataB64 = sodium.to_base64(decrypted);
        return { dataB64 };
    };
}
export const testHelper_Crypto = new TestHelper_Crypto();
