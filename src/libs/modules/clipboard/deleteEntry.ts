import { RowDataPacket } from 'mysql2';
import { db } from '../../databases/db';
import { deleteS3File } from '../s3files';

export const deleteEntry = async (params: { name: string }) => {
    const [rows] = await db.query<RowDataPacket[]>('SELECT s3Key FROM Clipboard WHERE name = ?', [
        params.name
    ]);

    if (rows && rows[0]?.s3Key) {
        const key = rows[0].s3Key;
        await deleteS3File(key);
    }

    await db.query(`DELETE FROM Clipboard WHERE name = ?`, [params.name]);
};
