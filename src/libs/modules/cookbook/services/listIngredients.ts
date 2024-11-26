import { RowDataPacket } from 'mysql2';
import { Ingredient } from '../types.js';
import { db } from '../../../databases/db.js';

export const listIngredients = async (): Promise<Ingredient[]> => {
    const [rows] = await db.query<(Ingredient & RowDataPacket)[]>(
        `SELECT id, name FROM Cookbook_Ingredient`
    );

    return rows;
};
