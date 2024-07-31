import { RowDataPacket } from 'mysql2';
import { DeleteObjectCommand, DeleteObjectCommandInput } from '@aws-sdk/client-s3';
import { db } from '../../databases/db';
import { S3 } from '../../databases/s3';

export const deleteEntry = async (params: { name: string }) => {
    const [rows] = await db.query<RowDataPacket[]>('SELECT s3Key FROM Clipboard WHERE name = ?', [
        params.name
    ]);

    if (rows && rows[0]?.s3Key) {
        const key = rows[0].s3Key;
        const params: DeleteObjectCommandInput = {
            Bucket: 'clipboard',
            Key: key
        };
        await S3.send(new DeleteObjectCommand(params));
    }

    await db.query(`DELETE FROM Clipboard WHERE name = ?`, [params.name]);
};
