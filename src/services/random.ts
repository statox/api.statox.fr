import * as crypto from 'crypto';

export const generate4BytesHex = () => {
    const buf = crypto.randomBytes(4);
    return buf.toString('hex');
};
