import { DateTime } from 'luxon';

/** An interval to be used to check a value in DB */
export const aroundNowSec = {
    aroundTimestamp: 'NOW()',
    precision: '1 SECOND'
};

/** Returns the current time in seconds to be used in fixtures */
export const nowSec = () => Math.floor(DateTime.now().toSeconds());
