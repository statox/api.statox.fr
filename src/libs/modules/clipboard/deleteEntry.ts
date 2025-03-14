import { RowDataPacket } from 'mysql2';
import { db } from '../../databases/db.js';
import { deleteS3File } from '../s3files/index.js';

export const deleteEntry = async (params: { name: string }) => {
    const [rows] = await db.query<RowDataPacket[]>('SELECT s3Key FROM Clipboard WHERE name = ?', [
        params.name
    ]);

    if (rows && rows[0]?.s3Key) {
        const s3Key = rows[0].s3Key;
        await deleteS3File({ bucket: 'clipboard', s3Key });
    }

    await db.query(`DELETE FROM Clipboard WHERE name = ?`, [params.name]);
};
