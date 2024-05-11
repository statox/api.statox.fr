import type { Request, Response } from 'express';
import { getAllChords } from '../../services/chords/index.js';
import { GetRoute } from '../types.js';

const handler = async (_req: Request, res: Response) => {
    const chords = await getAllChords();
    res.json(chords);
};

export const route: GetRoute = {
    method: 'get',
    path: '/chords/getAll',
    handler
};
