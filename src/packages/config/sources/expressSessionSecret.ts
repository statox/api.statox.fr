import { isProd } from './env.js';

const PROD_SECRET = process.env.EXPRESS_SESSION_SECRET!;
const NON_PROD_SECRET = 'keyboard cat';

let expressSessionSecret: string;
if (isProd) {
    expressSessionSecret = PROD_SECRET;
} else {
    expressSessionSecret = NON_PROD_SECRET;
}

export const EXPRESS_SESSION_SECRET = expressSessionSecret;
