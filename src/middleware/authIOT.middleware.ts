import { NextFunction, Request, Response } from 'express';
import { db } from '../services/env-helpers/db';
import { RowDataPacket } from 'mysql2/promise';

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

export const validateAPIKeyHeader = async (req: Request, _res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return next(new MissingApiKeyError());
    }

    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer') {
        return next(new InvalidAuthHeaderError());
    }

    const apiKey = await getAPIKey();
    if (token !== apiKey) {
        return next(new UnkownApiKeyError());
    }

    return next();
};
