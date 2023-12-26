import type { NextFunction, Request, Response } from 'express';
import { AllowedSchema } from 'express-json-validator-middleware';
import { db } from '../../services/db';
import { PostRoute } from '../types';
import { generate4BytesHex } from '../../services/random';

const DEFAULT_TTL = 60 * 5; // 5 MINUTES

const handler = async (req: Request, res: Response, next: NextFunction) => {
    const { name, content, ttlSeconds = DEFAULT_TTL, isPublic = false } = req.body;

    const linkId = generate4BytesHex();

    db.query(
        `
        INSERT INTO Clipboard (name, content, ttl, isPublic, linkId, creationDateUnix)
        VALUES (?, ?, ?, ?, ?, UNIX_TIMESTAMP())
    `,
        [name, content, ttlSeconds, isPublic, linkId],
        (err) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).send(err.code);
                }
                return next(err);
            }

            res.send();
        }
    );
};

const inputSchema: AllowedSchema = {
    type: 'object',
    required: ['name', 'content'],
    additionalProperties: false,
    properties: {
        name: {
            type: 'string'
        },
        content: {
            type: 'string'
        },
        ttlSeconds: {
            type: 'number',
            minimum: 0
        },
        isPublic: {
            type: 'boolean'
        }
    }
};

export const route: PostRoute = {
    method: 'post',
    path: '/clipboard/addEntry',
    inputSchema,
    handler,
    protected: true
};
