import { NextFunction, Request, Response } from 'express';
import { slog } from '../services/logging';

export const loggingHandler = async (req: Request, _res: Response, next: NextFunction) => {
    slog.log({ path: req.path, remoteIp: req.socket.remoteAddress });
    next();
};
