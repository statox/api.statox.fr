import { elk } from '../../../databases/elk.js';
import { slog } from '../../logging/index.js';

export const get24hoursOfPressure = async () => {
    try {
        const response = await elk.search<{
            '@timestamp': number;
            document: {
                pressurehPa: number;
            };
        }>({
            size: 0,
            query: {
                range: {
                    '@timestamp': {
                        gt: 'now-24h/h',
                        lte: 'now'
                    }
                }
            },
            aggregations: {
                hourly_averages: {
                    date_histogram: {
                        field: '@timestamp',
                        fixed_interval: '3h',
                        format: 'epoch_millis'
                    },
                    aggs: {
                        avg_pressure: {
                            avg: {
                                field: 'document.pressurehPa'
                            }
                        }
                    }
                }
            }
        });

        // @ts-expect-error Not sure why the `.buckets` member is not in the typing
        const buckets = response.aggregations?.hourly_averages.buckets || [];
        // @ts-expect-error Not sure why the `.buckets` member is not in the typing
        const hourlyAverages = buckets.map((bucket) => ({
            timestamp: bucket.key_as_string,
            averagePressurehPa: Math.floor(bucket.avg_pressure.value)
        }));

        return hourlyAverages;
    } catch (error) {
        slog.log('home-tracker', 'getPressureHistory - Got an error while getting daily history', {
            error: error as Error
        });

        // TODO Better error handling with specific error messages to client
        return [];
    }
};
