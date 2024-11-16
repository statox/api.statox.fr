import { NextFunction, Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { hrtime } from 'node:process';
import { LoggableContext, slog } from '../modules/logging/index.js';
import { isTests } from '../../packages/config/index.js';

export const loggingHandler = async (req: Request, res: Response, next: NextFunction) => {
    const path = req.path;
    const remoteIp = req.socket.remoteAddress ?? 'N/A';
    const cfRay = req.get('cf-ray') ?? 'N/A';

    const xRequestInfo = {
        'x-request-id': req.get('x-request-id') ?? 'N/A',
        'x-request-start': Number(req.get('x-request-start'))
    };
    const lat = Number(req.get('cf-iplatitude'));
    const lon = Number(req.get('cf-iplongitude'));

    const cfGeoInfo = {
        'cf-ipcity': req.get('cf-ipcity') ?? 'N/A',
        'cf-ipcontinent': req.get('cf-ipcontinent') ?? 'N/A',
        'cf-ipcountry': req.get('cf-ipcountry') ?? 'N/A',
        'cf-ipGeoPoint':
            req.get('cf-iplatitude') && req.get('cf-iplongitude') ? { lat, lon } : undefined,
        'cf-region-code': req.get('cf-region-code') ?? 'N/A'
    };

    res.locals.startTimeNs = hrtime.bigint();
    res.locals.requestId = isTests ? '00000000-0000-0000-0000-000000000001' : randomUUID();
    res.locals.loggableContext = new LoggableContext();

    const createAccessLog = (params: { requestInterrupted?: boolean }) => {
        const { requestInterrupted } = params;
        const executionTimeMs = Number(hrtime.bigint() - res.locals.startTimeNs) / 1e6;
        const code = res.statusCode;

        slog.log('app', 'access-log', {
            cfGeoInfo,
            cfRay,
            code,
            executionTimeMs,
            path,
            remoteIp,
            requestId: res.locals.requestId,
            requestInterrupted,
            xRequestInfo,
            context: {
                ...res.locals.loggableContext.getData()
            }
        });
    };

    res.on('finish', () => {
        res.locals.finished = true;
    });

    // Also listen for the close event to handle cases where the client closes the connection
    // https://nodejs.org/api/http.html#event-close_2
    res.on('close', () => {
        createAccessLog({ requestInterrupted: res.locals.finished !== true });
    });

    next();
};
