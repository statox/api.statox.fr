import { db } from '../db';

export const deleteEntry = (params: { name: string }) => {
    return db.query(`DELETE FROM Clipboard WHERE name = ?`, [params.name]);
};
