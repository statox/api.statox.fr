import { RowDataPacket } from 'mysql2';
import { db } from '../../../databases/db.js';

type SensorMetaData = {
    sqlId: number;
    name: string;
    lastSyncDateUnix: number;
    lastAlertDateUnix: number | null;
    hexColor: string;
};

type SensorMetaDataResults = SensorMetaData & RowDataPacket;

export const getAllSensorsMetadata = async (): Promise<SensorMetaData[]> => {
    const [rows] = await db.query<SensorMetaDataResults[]>(
        `SELECT
            id as sqlId, name, lastSyncDateUnix, lastAlertDateUnix, hexColor
        FROM HomeTrackerSensor
    `
    );

    return rows;
};

export const updateSensorLastSyncDate = async (params: { sensorName: string }) => {
    const [rows] = await db.query(
        `UPDATE HomeTrackerSensor
         SET lastSyncDateUnix = UNIX_TIMESTAMP()
         WHERE name = ?
    `,
        [params.sensorName]
    );

    return rows;
};
