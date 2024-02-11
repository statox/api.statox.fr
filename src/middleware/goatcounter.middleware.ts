import { NextFunction, Request, Response } from 'express';
import { isProd } from '../services/env-helpers/env';

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

    fetch(goatCounterUrl, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    next();
};
