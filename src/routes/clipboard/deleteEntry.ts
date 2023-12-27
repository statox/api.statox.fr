import type { NextFunction, Request, Response } from 'express';
import { AllowedSchema } from 'express-json-validator-middleware';
import { db } from '../../services/db';
import { PostRoute } from '../types';

const handler = async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;

    db.query(`DELETE FROM Clipboard WHERE name = ?`, [name], (err) => {
        if (err) {
            return next(err);
        }

        res.send();
    });
};

const inputSchema: AllowedSchema = {
    type: 'object',
    required: ['name'],
    additionalProperties: false,
    properties: {
        name: {
            type: 'string'
        }
    }
};

export const route: PostRoute = {
    method: 'post',
    path: '/clipboard/deleteEntry',
    inputSchema,
    handler,
    protected: true
};
