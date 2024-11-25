import { RowDataPacket } from 'mysql2';
import { db } from '../../../databases/db.js';
import { Recipe } from '../types.js';

export const listRecipes = async (): Promise<Recipe[]> => {
    const [rows] = await db.query<(Recipe & RowDataPacket)[]>(`
SELECT
id, name, creationDateUnix, updateDateUnix
FROM Cookbook_Recipe`);

    return rows;
};
