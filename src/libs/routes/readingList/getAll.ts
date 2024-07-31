import type { NextFunction, Request, Response } from 'express';
import { GetRoute } from '../types';
import { getAllReadingListItems } from '../../modules/readingList';

const handler = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const items = await getAllReadingListItems();
        res.send({ items });
    } catch (error) {
        next(error);
    }
};

export const route: GetRoute = {
    method: 'get',
    path: '/readingList/getAll',
    handler,
    authentication: 'none'
};
