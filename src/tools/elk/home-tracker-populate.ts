import { DateTime } from 'luxon';
import { elk, elkClientTargetsLocalEnv } from '../../libs/databases/elk';
import { SensorLogData } from '../../libs/modules/homeTracker';

export const populateFakeHomeTrackerData = async () => {
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
        document: SensorLogData;
    }[] = [
        {
            '@timestamp': now.minus({ minutes: 4 }).toMillis(),
            document: {
                sensorName: 'dev-salon',
                batteryCharge: 3.996,
                batteryPercent: 69.609,
                tempCelsius: 26.06,
                humidity: 63.07,
                pressurehPa: 1008.591
            }
        },
        {
            '@timestamp': now.minus({ minutes: 14 }).toMillis(),
            document: {
                sensorName: 'dev-salon',
                tempCelsius: 26.06,
                humidity: 63.007,
                batteryCharge: 3.996,
                batteryPercent: 69.609,
                pressurehPa: 1008.591
            }
        },
        {
            '@timestamp': now.minus({ minutes: 25 }).toMillis(),
            document: {
                sensorName: 'dev-salon',
                tempCelsius: 24.77,
                humidity: 67.806,
                batteryCharge: 4.003,
                batteryPercent: 70.254,
                pressurehPa: 1008.698
            }
        },
        {
            '@timestamp': now.minus({ minutes: 35 }).toMillis(),
            document: {
                sensorName: 'dev-salon',
                tempCelsius: 24.68,
                humidity: 68.493,
                batteryCharge: 3.996,
                batteryPercent: 69.609,
                pressurehPa: 1008.556
            }
        },
        {
            '@timestamp': now.minus({ minutes: 46 }).toMillis(),
            document: {
                sensorName: 'dev-salon',
                tempCelsius: 24.67,
                humidity: 68.955,
                batteryCharge: 4.003,
                batteryPercent: 70.254,
                pressurehPa: 1008.512
            }
        },
        {
            '@timestamp': now.minus({ minutes: 56 }).toMillis(),
            document: {
                sensorName: 'dev-salon',
                tempCelsius: 24.42,
                humidity: 69.939,
                batteryCharge: 3.996,
                batteryPercent: 69.609,
                pressurehPa: 1008.384
            }
        },
        {
            '@timestamp': now.minus({ minutes: 67 }).toMillis(),
            document: {
                sensorName: 'dev-salon',
                tempCelsius: 24.35,
                humidity: 70.142,
                batteryCharge: 3.996,
                batteryPercent: 69.609,
                pressurehPa: 1008.372
            }
        },
        {
            '@timestamp': now.minus({ minutes: 7 }).toMillis(),
            document: {
                sensorName: 'dev-jardiniere',
                tempCelsius: 27.47,
                humidity: 62.99,
                batteryCharge: 3.571,
                batteryPercent: 27.07,
                internalTempCelsius: 20,
                internalHumidity: 50
            }
        },
        {
            '@timestamp': now.minus({ minutes: 17 }).toMillis(),
            document: {
                sensorName: 'dev-jardiniere',
                tempCelsius: 27.14,
                humidity: 65.87,
                batteryCharge: 3.571,
                batteryPercent: 27.07,
                internalTempCelsius: 21,
                internalHumidity: 51
            }
        },
        {
            '@timestamp': now.minus({ minutes: 28 }).toMillis(),
            document: {
                sensorName: 'dev-jardiniere',
                tempCelsius: 26.98,
                humidity: 66.99,
                batteryCharge: 3.577,
                batteryPercent: 27.71,
                internalTempCelsius: 21,
                internalHumidity: 51
            }
        },
        {
            '@timestamp': now.minus({ minutes: 39 }).toMillis(),
            document: {
                sensorName: 'dev-jardiniere',
                tempCelsius: 26.64,
                humidity: 68.46,
                batteryCharge: 3.571,
                batteryPercent: 27.07,
                internalTempCelsius: 20,
                internalHumidity: 50
            }
        },
        {
            '@timestamp': now.minus({ minutes: 49 }).toMillis(),
            document: {
                sensorName: 'dev-jardiniere',
                tempCelsius: 26.33,
                humidity: 70.57,
                batteryCharge: 3.564,
                batteryPercent: 26.42,
                internalTempCelsius: 20,
                internalHumidity: 50
            }
        },
        {
            '@timestamp': now.minus({ minutes: 59 }).toMillis(),
            document: {
                sensorName: 'dev-jardiniere',
                tempCelsius: 26.44,
                humidity: 70.52,
                batteryCharge: 3.571,
                batteryPercent: 27.07,
                internalTempCelsius: 20,
                internalHumidity: 50
            }
        }
    ];

    console.log(`HomeTracker - Adding ${recordsToCreate.length} records to ELK`);
    await Promise.all(
        recordsToCreate.map((record) =>
            elk.index({
                index: 'data-home-tracker',
                document: record
            })
        )
    );
    console.log('HomeTracker - Done adding records to ELK');
};
