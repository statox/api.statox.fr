import { assert } from 'chai';
import { elkMock } from '../../../src/libs/databases/elk';
import { doHomeTrackerMonitoring } from '../../../src/libs/modules/homeTracker';
import { slackCheckNbNotifications, slackCheckNotification } from '../../helpers/notifier/slack';

describe('periodic task - doHomeTrackerMonitoring', () => {
    beforeEach(() => {
        // If the  mock returns {"error":"Mock not found"}
        // it's because no Mock pattern matched the query made to ELK
        // https://github.com/elastic/elasticsearch-js-mock/issues/26#issuecomment-1332981142
        elkMock.add(
            {
                method: ['GET', 'POST', 'PUT'],
                path: '*'
            },
            () => {
                assert.fail('Unexpected ELK call');
            }
        );

        elkMock.add(
            {
                method: 'POST',
                path: '/logs-home-tracker-default/_search',
                body: {
                    query: {
                        bool: {
                            must: [
                                {
                                    term: {
                                        'document.sensorName': {
                                            value: 'salon'
                                        }
                                    }
                                },
                                {
                                    range: {
                                        '@timestamp': {
                                            gte: 'now-30m'
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            },
            () => {
                return {
                    hits: {
                        total: { value: 3, relation: 'eq' },
                        hits: [
                            {
                                _source: {
                                    document: {
                                        component: 'home-tracker',
                                        sensorName: 'salon',
                                        message: 'Home tracking event',
                                        tempCelsius: 23
                                    }
                                }
                            },
                            {
                                _source: {
                                    document: {
                                        component: 'home-tracker',
                                        sensorName: 'salon',
                                        message: 'Home tracking event',
                                        tempCelsius: 23
                                    }
                                }
                            },
                            {
                                _source: {
                                    document: {
                                        component: 'home-tracker',
                                        sensorName: 'salon',
                                        message: 'Home tracking event',
                                        tempCelsius: 23
                                    }
                                }
                            }
                        ]
                    }
                };
            }
        );

        elkMock.add(
            {
                method: 'POST',
                path: '/logs-home-tracker-default/_search',
                body: {
                    query: {
                        bool: {
                            must: [
                                {
                                    term: {
                                        'document.sensorName': {
                                            value: 'jardiniere'
                                        }
                                    }
                                },
                                {
                                    range: {
                                        '@timestamp': {
                                            gte: 'now-30m'
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            },
            () => {
                return {
                    hits: {
                        total: { value: 0, relation: 'eq' },
                        hits: []
                    }
                };
            }
        );
    });

    it('Should create a notification for missing sensor data, and should notify only once', async () => {
        await doHomeTrackerMonitoring();

        slackCheckNotification({
            message: 'Missing home tracker data for sensor jardiniere',
            directMention: true
        });
        slackCheckNbNotifications(1);

        // On second call we shouldn't create another notification for the failing sensor
        await doHomeTrackerMonitoring();
        slackCheckNbNotifications(1);
    });
});
