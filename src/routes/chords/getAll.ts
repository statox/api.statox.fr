import type { Request, Response } from 'express';
import { getAllChords } from '../../services/chords';
import { GetRoute } from '../types';

const handler = async (_req: Request, res: Response) => {
    const checkResults = await getAllChords();
    res.json(checkResults);
};

export const route: GetRoute = {
    method: 'get',
    path: '/chords/getAll',
    handler
};
