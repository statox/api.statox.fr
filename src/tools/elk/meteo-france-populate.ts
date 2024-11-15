import { DateTime } from 'luxon';
import { elk, elkClientTargetsLocalEnv } from '../../libs/databases/elk.js';
import { MeteoFranceLogData } from '../../libs/modules/meteofrance/index.js';

export const populateFakeMeteoFranceLogs = async () => {
    if (!elkClientTargetsLocalEnv()) {
        console.log(`
You are trying to create fake home tracker data on a non-local ELK cluster.
This is probably a mistake as this data is not real.

Are you REALLY SURE that's what you want to do?
If so you need to edit this function and remove the guard against non-local url
        `);
        throw new Error('CREATE_FAKE_DATA_ON_NON_LOCAL_ELK');
    }

    const now = DateTime.now();

    const recordsToCreate: {
        '@timestamp': number;
        document: MeteoFranceLogData;
    }[] = [
        {
            '@timestamp': now.minus({ minutes: 4 }).toMillis(),
            document: {
                station: 'LUXEMBOURG',
                observationTimestamp: now.minus({ minutes: 4 }).toMillis(),
                tempCelsius: 26.06,
                humidity: 63.07,
                pressurehPa: 1008.591
            }
        }
    ];

    console.log(`MeteoFrance - Adding ${recordsToCreate.length} records to ELK`);
    await Promise.all(
        recordsToCreate.map((record) =>
            elk.index({
                index: 'logs-meteo-france',
                document: record
            })
        )
    );
    console.log('MeteoFrance - Done adding records to ELK');
};
