import { NextFunction, Request, Response } from 'express';
import { Route } from '../routes/types';

export const routeHandler = (route: Route) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const routeResult = await route.handler(req);

            // TODO Find a better way to handle these specific cases
            if (route.path === '/clipboard/view') {
                return res.render('clipboard', { entries: routeResult });
            }
            if (route.path === '/r/:linkId') {
                return res.redirect(routeResult as string);
            }
            res.send(routeResult || {});
        } catch (error) {
            next(error);
        }
    };
};
