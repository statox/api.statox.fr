import { NextFunction, Request, Response } from 'express';
import { isProd } from '../config/env.js';
import { slog } from '../modules/logging/index.js';

// Token is from https://api-statox-fr.goatcounter.com/user/api
const token = isProd ? process.env.GOATCOUNTER_TOKEN : '';
const goatCounterUrl = 'https://api-statox-fr.goatcounter.com/api/v0/count';

export const goatCounterHandler = async (req: Request, _res: Response, next: NextFunction) => {
    if (!isProd) {
        return next();
    }

    const body = {
        no_sessions: true,
        hits: [{ path: req.path }]
    };

    /*
     * This is buggy:
     * Without an await if the fetch fails the try..catch will not get the error
     * so we'll get an uncaught.
     *
     * I disabled the middleware during a goat counter outage which broke the whole API
     * (because of the uncaughts) now that ELK is running I don't think I need the
     * goatcoutner analytics.
     *
     * IF I re-enable one day I'll probably need to
     * - Make the goatCounterHandler() not async so that the middleware doesn't block
     * - Put the fetch in another function and wait for it in this function with the try...catch
     */
    try {
        fetch(goatCounterUrl, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    } catch (error: unknown) {
        slog.log('middleware', 'Failed call to goat counter', { error: error as Error });
    }

    next();
};
