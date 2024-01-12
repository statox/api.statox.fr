import { NextFunction, Request, Response } from 'express';
import { isTests } from '../services/env';

export const loggingHandler = async (req: Request, _res: Response, next: NextFunction) => {
    if (isTests) {
        return next();
    }

    console.log(req.path);
    next();
};
