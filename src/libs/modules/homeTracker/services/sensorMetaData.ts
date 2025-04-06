import { RowDataPacket } from 'mysql2';
import { db } from '../../../databases/db.js';

type SensorMetaData = {
    sqlId: number;
    name: string;
    lastSyncDateUnix: number;
    hexColor: string;
};

type SensorMetaDataResults = SensorMetaData & RowDataPacket;

export const getAllSensorsMetadata = async (): Promise<SensorMetaData[]> => {
    const [rows] = await db.query<SensorMetaDataResults[]>(
        `SELECT
            id as sqlId, name, lastSyncDateUnix, hexColor
        FROM HomeTrackerSensor
    `
    );

    return rows;
};

export const getSensorMetadataByName = async (params: {
    name: string;
}): Promise<SensorMetaData> => {
    const [rows] = await db.query<SensorMetaDataResults[]>(
        `SELECT
            id as sqlId, name, lastSyncDateUnix, hexColor
        FROM HomeTrackerSensor
        WHERE uiName = ?
    `,
        [params.name]
    );

    if (!rows || rows.length !== 1) {
        throw new Error('SENSOR_NOT_FOUND');
    }

    return rows[0];
};
