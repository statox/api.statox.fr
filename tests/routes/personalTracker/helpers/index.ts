import _sodium from 'libsodium-wrappers-sumo';
import { th } from '../../../helpers/index.js';

export type PersonalTrackerData =
    | {
          type: 'mood';
          data: number;
      }
    | {
          type: 'weight';
          data: number;
      }
    | {
          type: 'emotionwheel';
          data: {
              emotions: {
                  category: string;
                  subcategory: string;
                  emotion: string;
                  color: string;
              }[];
          };
      };

export type PersonalTrackerEvent = PersonalTrackerData & {
    eventDateUnix: number;
};

export const encryptAndPrepareEvent = async (
    data: PersonalTrackerData,
    password: string,
    eventDateUnix: number
) => {
    await _sodium.ready;

    const saltB64 = th.crypto.getRandomSalt().saltB64;
    const { keyB64 } = th.crypto.getUserKey({ password, saltB64 });
    const { ciphertextB64, nonceB64 } = th.crypto.encryptData({
        data: JSON.stringify(data),
        keyB64
    });

    return {
        eventDateUnix,
        saltB64,
        nonceB64,
        ciphertextB64
    };
};

export const decryptEvent = async (
    cipher: {
        eventDateUnix: number;
        saltB64: string;
        nonceB64: string;
        ciphertextB64: string;
    },
    password: string
): Promise<PersonalTrackerData & { eventDateUnix: number }> => {
    await _sodium.ready;
    const { keyB64 } = th.crypto.getUserKey({ password, saltB64: cipher.saltB64 });
    const { dataB64 } = th.crypto.decryptData({
        ciphertextB64: cipher.ciphertextB64,
        nonceB64: cipher.nonceB64,
        keyB64
    });

    const decryptedData = new TextDecoder().decode(_sodium.from_base64(dataB64));
    const event = {
        ...JSON.parse(decryptedData),
        eventDateUnix: cipher.eventDateUnix
    };

    return event;
};
