import type { Request, Response } from 'express';
import fs from 'node:fs';

const PATH = './test_file';

const getTest = (_req: Request, res: Response) => {
    const fileExists = fs.existsSync(PATH);
    const now = Date.now();
    const interval = 1000 * 30; // 30 seconds

    if (!fileExists) {
        const content = { ts: now };
        fs.writeFileSync(PATH, JSON.stringify(content));
        res.send({ ...content, reason: 'created_file' });
        return;
    }
    const contentStr = fs.readFileSync(PATH, 'utf-8');
    const content = JSON.parse(contentStr);

    if (content.ts + interval < now) {
        const content = { ts: now };
        fs.writeFileSync(PATH, JSON.stringify(content));
        res.send({ ...content, reason: 'out_of_date_file' });
        return;
    }

    res.send({ ...content, reason: 'up_to_date_file' });
};

export const route = {
    path: '/test',
    handler: getTest
};
