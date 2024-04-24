import { NextFunction, Request, Response } from 'express';
import { slog } from '../services/logging';

export const loggingHandler = async (req: Request, _res: Response, next: NextFunction) => {
    const path = req.path;
    const remoteIp = req.socket.remoteAddress ?? 'N/A';
    const ray = req.get('cf-ray') ?? 'N/A';

    const xRequestInfo = {
        'x-request-id': req.get('x-request-id') ?? 'N/A',
        'x-request-start': Number(req.get('x-request-start'))
    };
    const cfGeoInfo = {
        'cf-ipcity': req.get('cf-ipcity') ?? 'N/A',
        'cf-ipcontinent': req.get('cf-ipcontinent') ?? 'N/A',
        'cf-ipcountry': req.get('cf-ipcountry') ?? 'N/A',
        'cf-iplatitude': req.get('cf-iplatitude') ?? 'N/A',
        'cf-iplongitude': req.get('cf-iplongitude') ?? 'N/A',
        'cf-region-code': req.get('cf-region-code') ?? 'N/A'
    };

    slog.log({ path, remoteIp, cfGeoInfo, ray, xRequestInfo });
    next();
};
