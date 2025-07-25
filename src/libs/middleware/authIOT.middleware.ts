import { NextFunction, Request, Response } from 'express';
import { db } from '../databases/db.js';
import { RowDataPacket } from 'mysql2/promise';
import { slog } from '../modules/logging/index.js';

/*
 * IOT API Key authentication middleware.
 *
 * This middleware implement a very basic authentication via api key.
 *
 * It is meant to be used by my home made sensors calling the /homeTracker/upload endoints.
 * Note
 *  - I want these sensors to be extremely battery efficient and to do as few computation
 *    as possible with each call
 *  - The endpoint enforces a JSON schema to validate the client inputs
 *  - It seems I have very few bots traffic on my endpoints and the /homeTracker/upload
 *    endpoint isn't very sensitive
 *
 * For these reasons the "api key" authentication limits itself to checking that the clients
 * send a `Authorization` header of the form `Bearer API-KEY` where API-KEY is defined in db.
 *
 * If I end up needing other types of clients using API key auth I'll need to re-think another
 * middleware with better security. For now, this is good enough.
 *
 */

let IOT_API_KEY: string;

interface apiKeyResult extends RowDataPacket {
    s3Key: string;
}

const getAPIKey = async () => {
    if (IOT_API_KEY) {
        return IOT_API_KEY;
    }

    const [rows] = await db.query<apiKeyResult[]>(`SELECT accessKey FROM ApiKeys WHERE id = 1`);
    if (!rows || rows.length !== 1) {
        throw new Error('API KEY NOT FOUND');
    }
    IOT_API_KEY = rows[0].accessKey;
    return IOT_API_KEY;
};

export class ApiKeyError extends Error {
    statusCode: number;
    status: number;
    code: string;
    constructor(message: string, code: string, status: number) {
        super(message);
        this.code = code;
        this.status = status;
        this.statusCode = status;
    }
}

export class MissingApiKeyError extends ApiKeyError {
    constructor() {
        super('API Key required', 'unauthorized', 401);
    }
}

export class InvalidAuthHeaderError extends ApiKeyError {
    constructor() {
        super('Invalid authorization scheme', 'unauthorized', 401);
    }
}

export class UnkownApiKeyError extends ApiKeyError {
    constructor() {
        super('Invalid API key', 'forbidden', 403);
    }
}

// this livemode control whether or not we enforce the API keys validation
const livemode = true;
export const validateAPIKeyHeader = async (req: Request, _res: Response, next: NextFunction) => {
    const dataStr = JSON.stringify({ path: req.path });
    slog.log('debug', 'validateAPIKeyHeader', { dataStr });
    const authHeader = req.headers.authorization;

    let error;
    if (!authHeader) {
        error = new MissingApiKeyError();
    } else {
        const [scheme, token] = authHeader.split(' ');

        if (scheme !== 'Bearer') {
            error = new InvalidAuthHeaderError();
        } else {
            const apiKey = await getAPIKey();
            if (token !== apiKey) {
                error = new UnkownApiKeyError();
            }
        }
    }

    if (error) {
        slog.log('auth', 'authIOT rejected', { livemode, error });
    }

    // If livemode is disabled don't enforce api key validation
    // (THIS SHOULD NOT BE TRUE ANYMORE. All clients are up to date now)
    if (!livemode) {
        return next();
    }

    return next(error);
};
