import { elk } from '../../databases/elk';
import { slog } from '../logging';
import * as T from '@elastic/elasticsearch/lib/api/types';
import { SensorLogData } from './types';

interface SensorRecord {
    '@timestamp': number;
    document: SensorLogData;
}

interface Bucket {
    key: string;
    doc_count: number;
    top_docs: {
        hits: {
            total: {
                value: number;
                relation: string;
            };
            max_score: number;
            hits: {
                _index: string;
                _id: string;
                _score: number;
                _source: SensorRecord;
            }[];
        };
    };
}

interface Aggregation {
    sensorName: T.AggregationsTermsAggregateBase<Bucket>;
}

export const getLatestData = async () => {
    // const recordsBySensor = new Map<string, SensorRecord[]>();
    const recordsBySensor: {
        [sensorName: string]: SensorRecord[];
    } = {};

    const result = await elk.search<unknown, Aggregation>({
        index: 'data-home-tracker',
        // We don't need results in hits as the results we want are in the aggregation, hence size 0
        size: 0,
        // We need the most recent documents for each sensor
        sort: [
            {
                '@timestamp': 'desc'
            }
        ],
        aggs: {
            sensorName: {
                // Make buckets based on the sensorName, we have to use the keyword indexed field
                terms: {
                    field: 'document.sensorName.keyword'
                },
                aggs: {
                    // This top_docs aggregation is what makes we get hits in the aggregation results
                    top_docs: {
                        top_hits: {
                            size: 10
                        }
                    }
                }
            }
        }
    });

    if (!result.aggregations?.sensorName || !result.aggregations.sensorName?.buckets) {
        slog.log('home-tracker', 'Error while getting latest data: aggregation is empty');
        throw new Error('INVALID_DATA');
    }

    const buckets = result?.aggregations?.sensorName?.buckets as Bucket[];
    if (!buckets) {
        slog.log('home-tracker', 'Error while getting latest data: no buckets created');
        throw new Error('INVALID_DATA');
    }

    for (const bucket of buckets) {
        const records = bucket.top_docs.hits.hits;
        recordsBySensor[bucket.key] = records.map((d) => d._source);
    }

    // console.log(recordsBySensor);
    // console.log(JSON.stringify(recordsBySensor.get('salon'), null, 2));
    return { recordsBySensor };
};
