import { MoonPosition, MoonIllumination, SunPosition } from '..';

interface TestCase {
    input: {
        date: string;
        lat: number;
        lon: number;
        elv: number;
    };
    output: {
        getPosition: SunPosition;
        getTimes: Record<string, string | null>;
        getMoonPosition: MoonPosition;
        getMoonIllumination: MoonIllumination;
        getMoonTimesUTC: Record<string, string | null>;
        getMoonTimesNonUTC: Record<string, string | null>;
    };
}

export const migration_testcases: TestCase[] = [
    {
        input: {
            date: '2002-09-30T22:49:18.794Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.8284977422890702,
                altitude: -0.7470649145788519
            },
            getTimes: {
                solarNoon: '2002-09-30T11:41:50.456Z',
                nadir: '2002-09-29T23:41:50.456Z',
                sunrise: '2002-09-30T05:47:35.726Z',
                sunset: '2002-09-30T17:36:05.185Z',
                sunriseEnd: '2002-09-30T05:50:50.437Z',
                sunsetStart: '2002-09-30T17:32:50.474Z',
                dawn: '2002-09-30T05:16:10.362Z',
                dusk: '2002-09-30T18:07:30.549Z',
                nauticalDawn: '2002-09-30T04:39:26.569Z',
                nauticalDusk: '2002-09-30T18:44:14.342Z',
                nightEnd: '2002-09-30T04:01:52.332Z',
                night: '2002-09-30T19:21:48.579Z',
                goldenHourEnd: '2002-09-30T06:29:28.016Z',
                goldenHour: '2002-09-30T16:54:12.895Z'
            },
            getMoonPosition: {
                azimuth: -2.277002613192533,
                altitude: 0.0037840051429844715,
                distance: 379575.53773321735,
                parallacticAngle: -0.5855553455433197
            },
            getMoonIllumination: {
                fraction: 0.35906031232754904,
                phase: 0.7954788993750607,
                angle: 1.770969862897623
            },
            getMoonTimesUTC: {
                rise: '2002-09-30T22:49:17.817Z',
                set: '2002-09-30T14:57:50.703Z'
            },
            getMoonTimesNonUTC: {
                rise: '2002-09-30T22:49:17.817Z',
                set: '2002-10-01T15:40:57.747Z'
            }
        }
    },
    {
        input: {
            date: '2002-09-30T22:49:18.794Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.7911180120226775,
                altitude: -0.6952227856354083
            },
            getTimes: {
                solarNoon: '2002-09-30T11:50:45.529Z',
                nadir: '2002-09-29T23:50:45.529Z',
                sunrise: '2002-09-30T05:57:23.498Z',
                sunset: '2002-09-30T17:44:07.561Z',
                sunriseEnd: '2002-09-30T06:00:49.349Z',
                sunsetStart: '2002-09-30T17:40:41.710Z',
                dawn: '2002-09-30T05:24:10.368Z',
                dusk: '2002-09-30T18:17:20.691Z',
                nauticalDawn: '2002-09-30T04:45:16.473Z',
                nauticalDusk: '2002-09-30T18:56:14.585Z',
                nightEnd: '2002-09-30T04:05:16.166Z',
                night: '2002-09-30T19:36:14.893Z',
                goldenHourEnd: '2002-09-30T06:41:42.541Z',
                goldenHour: '2002-09-30T16:59:48.517Z'
            },
            getMoonPosition: {
                azimuth: -2.3068398743051954,
                altitude: 0.014627871883782369,
                distance: 379575.53773321735,
                parallacticAngle: -0.5343654979519068
            },
            getMoonIllumination: {
                fraction: 0.35906031232754904,
                phase: 0.7954788993750607,
                angle: 1.770969862897623
            },
            getMoonTimesUTC: {
                rise: '2002-09-30T22:43:19.077Z',
                set: '2002-09-30T15:21:52.376Z'
            },
            getMoonTimesNonUTC: {
                rise: '2002-09-30T22:43:19.077Z',
                set: '2002-10-01T16:04:29.811Z'
            }
        }
    },
    {
        input: {
            date: '2002-09-30T22:49:18.794Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.9092708355741808,
                altitude: -0.4432178980747131
            },
            getTimes: {
                solarNoon: '2002-10-01T06:54:58.244Z',
                nadir: '2002-09-30T18:54:58.244Z',
                sunrise: '2002-10-01T00:59:32.119Z',
                sunset: '2002-10-01T12:50:24.369Z',
                sunriseEnd: '2002-10-01T01:02:21.163Z',
                sunsetStart: '2002-10-01T12:47:35.325Z',
                dawn: '2002-10-01T00:32:15.562Z',
                dusk: '2002-10-01T13:17:40.926Z',
                nauticalDawn: '2002-10-01T00:00:30.712Z',
                nauticalDusk: '2002-10-01T13:49:25.776Z',
                nightEnd: '2002-09-30T23:28:24.940Z',
                night: '2002-10-01T14:21:31.548Z',
                goldenHourEnd: '2002-10-01T01:35:48.779Z',
                goldenHour: '2002-10-01T12:14:07.709Z'
            },
            getMoonPosition: {
                azimuth: -1.5015295406658842,
                altitude: 0.7845234280816848,
                distance: 379575.53773321735,
                parallacticAngle: -0.9877032214571765
            },
            getMoonIllumination: {
                fraction: 0.35906031232754904,
                phase: 0.7954788993750607,
                angle: 1.770969862897623
            },
            getMoonTimesUTC: {
                rise: '2002-09-30T18:26:39.873Z',
                set: '2002-09-30T09:22:24.720Z'
            },
            getMoonTimesNonUTC: {
                rise: '2002-10-01T19:34:38.449Z',
                set: '2002-10-01T10:12:15.886Z'
            }
        }
    },
    {
        input: {
            date: '2002-09-30T22:49:18.794Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.1495357823995567,
                altitude: 0.43978027426701555
            },
            getTimes: {
                solarNoon: '2002-10-01T02:32:25.918Z',
                nadir: '2002-09-30T14:32:25.918Z',
                sunrise: '2002-09-30T20:35:25.211Z',
                sunset: '2002-10-01T08:29:26.624Z',
                sunriseEnd: '2002-09-30T20:38:02.906Z',
                sunsetStart: '2002-10-01T08:26:48.929Z',
                dawn: '2002-09-30T20:09:58.217Z',
                dusk: '2002-10-01T08:54:53.618Z',
                nauticalDawn: '2002-09-30T19:40:22.873Z',
                nauticalDusk: '2002-10-01T09:24:28.962Z',
                nightEnd: '2002-09-30T19:10:34.905Z',
                night: '2002-10-01T09:54:16.930Z',
                goldenHourEnd: '2002-09-30T21:09:13.464Z',
                goldenHour: '2002-10-01T07:55:38.371Z'
            },
            getMoonPosition: {
                azimuth: 0.9322271245599757,
                altitude: 1.2859854450050459,
                distance: 379575.53773321735,
                parallacticAngle: 0.8039095908696138
            },
            getMoonIllumination: {
                fraction: 0.35906031232754904,
                phase: 0.7954788993750607,
                angle: 1.770969862897623
            },
            getMoonTimesUTC: {
                rise: '2002-09-30T14:09:41.955Z',
                set: '2002-09-30T04:32:09.517Z'
            },
            getMoonTimesNonUTC: {
                rise: '2002-10-01T15:14:45.689Z',
                set: '2002-10-01T05:24:19.814Z'
            }
        }
    },
    {
        input: {
            date: '2003-08-19T00:16:01.963Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -3.042788438921073,
                altitude: -0.4885123539124875
            },
            getTimes: {
                solarNoon: '2003-08-19T11:55:45.591Z',
                nadir: '2003-08-18T23:55:45.591Z',
                sunrise: '2003-08-19T04:47:39.141Z',
                sunset: '2003-08-19T19:03:52.041Z',
                sunriseEnd: '2003-08-19T04:51:07.161Z',
                sunsetStart: '2003-08-19T19:00:24.021Z',
                dawn: '2003-08-19T04:13:07.200Z',
                dusk: '2003-08-19T19:38:23.982Z',
                nauticalDawn: '2003-08-19T03:29:59.505Z',
                nauticalDusk: '2003-08-19T20:21:31.677Z',
                nightEnd: '2003-08-19T02:40:56.060Z',
                night: '2003-08-19T21:10:35.122Z',
                goldenHourEnd: '2003-08-19T05:31:08.763Z',
                goldenHour: '2003-08-19T18:20:22.419Z'
            },
            getMoonPosition: {
                azimuth: -1.4803767907896206,
                altitude: 0.4354859535530443,
                distance: 405739.1711398455,
                parallacticAngle: -0.7468369072925104
            },
            getMoonIllumination: {
                fraction: 0.5968044429048188,
                phase: 0.718990361045848,
                angle: 1.2759912855917062
            },
            getMoonTimesUTC: {
                rise: '2003-08-19T21:56:02.974Z',
                set: '2003-08-19T12:42:05.836Z'
            },
            getMoonTimesNonUTC: {
                rise: '2003-08-19T21:56:02.974Z',
                set: '2003-08-19T12:42:05.836Z'
            }
        }
    },
    {
        input: {
            date: '2003-08-19T00:16:01.963Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -3.0869901197251215,
                altitude: -0.44431074222236544
            },
            getTimes: {
                solarNoon: '2003-08-19T12:04:40.710Z',
                nadir: '2003-08-19T00:04:40.710Z',
                sunrise: '2003-08-19T04:49:56.931Z',
                sunset: '2003-08-19T19:19:24.488Z',
                sunriseEnd: '2003-08-19T04:53:38.784Z',
                sunsetStart: '2003-08-19T19:15:42.635Z',
                dawn: '2003-08-19T04:12:55.372Z',
                dusk: '2003-08-19T19:56:26.047Z',
                nauticalDawn: '2003-08-19T03:25:54.046Z',
                nauticalDusk: '2003-08-19T20:43:27.373Z',
                nightEnd: '2003-08-19T02:30:14.326Z',
                night: '2003-08-19T21:39:07.094Z',
                goldenHourEnd: '2003-08-19T05:36:09.745Z',
                goldenHour: '2003-08-19T18:33:11.674Z'
            },
            getMoonPosition: {
                azimuth: -1.4906206388899266,
                altitude: 0.4067522484163208,
                distance: 405739.1711398455,
                parallacticAngle: -0.6986924666500047
            },
            getMoonIllumination: {
                fraction: 0.5968044429048188,
                phase: 0.718990361045848,
                angle: 1.2759912855917062
            },
            getMoonTimesUTC: {
                rise: '2003-08-19T21:55:00.680Z',
                set: '2003-08-19T13:01:34.804Z'
            },
            getMoonTimesNonUTC: {
                rise: '2003-08-19T21:55:00.680Z',
                set: '2003-08-19T13:01:34.804Z'
            }
        }
    },
    {
        input: {
            date: '2003-08-19T00:16:01.963Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.892166379104008,
                altitude: -0.022281853380345704
            },
            getTimes: {
                solarNoon: '2003-08-19T07:09:12.199Z',
                nadir: '2003-08-18T19:09:12.199Z',
                sunrise: '2003-08-19T00:17:12.405Z',
                sunset: '2003-08-19T14:01:11.992Z',
                sunriseEnd: '2003-08-19T00:20:09.802Z',
                sunsetStart: '2003-08-19T13:58:14.596Z',
                dawn: '2003-08-18T23:48:03.911Z',
                dusk: '2003-08-19T14:30:20.487Z',
                nauticalDawn: '2003-08-18T23:12:46.175Z',
                nauticalDusk: '2003-08-19T15:05:38.223Z',
                nightEnd: '2003-08-18T22:35:02.348Z',
                night: '2003-08-19T15:43:22.049Z',
                goldenHourEnd: '2003-08-19T00:54:34.953Z',
                goldenHour: '2003-08-19T13:23:49.445Z'
            },
            getMoonPosition: {
                azimuth: 0.0866902662302391,
                altitude: 1.125617197286357,
                distance: 405739.1711398455,
                parallacticAngle: 0.06808447958880884
            },
            getMoonIllumination: {
                fraction: 0.5968044429048188,
                phase: 0.718990361045848,
                angle: 1.2759912855917062
            },
            getMoonTimesUTC: {
                rise: '2003-08-19T17:29:34.899Z',
                set: '2003-08-19T07:19:47.408Z'
            },
            getMoonTimesNonUTC: {
                rise: '2003-08-19T17:29:34.899Z',
                set: '2003-08-19T07:19:47.408Z'
            }
        }
    },
    {
        input: {
            date: '2003-08-19T00:16:01.963Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.1474928907373436,
                altitude: 0.8610365073621685
            },
            getTimes: {
                solarNoon: '2003-08-19T02:46:38.570Z',
                nadir: '2003-08-18T14:46:38.570Z',
                sunrise: '2003-08-18T20:02:33.339Z',
                sunset: '2003-08-19T09:30:43.800Z',
                sunriseEnd: '2003-08-18T20:05:17.744Z',
                sunsetStart: '2003-08-19T09:27:59.395Z',
                dawn: '2003-08-18T19:35:39.388Z',
                dusk: '2003-08-19T09:57:37.751Z',
                nauticalDawn: '2003-08-18T19:03:26.047Z',
                nauticalDusk: '2003-08-19T10:29:51.093Z',
                nightEnd: '2003-08-18T18:29:39.249Z',
                night: '2003-08-19T11:03:37.890Z',
                goldenHourEnd: '2003-08-18T20:37:18.071Z',
                goldenHour: '2003-08-19T08:55:59.068Z'
            },
            getMoonPosition: {
                azimuth: 1.57300701482874,
                altitude: 0.4660520078537312,
                distance: 405739.1711398455,
                parallacticAngle: 1.0011819132630222
            },
            getMoonIllumination: {
                fraction: 0.5968044429048188,
                phase: 0.718990361045848,
                angle: 1.2759912855917062
            },
            getMoonTimesUTC: {
                rise: '2003-08-19T13:12:45.601Z',
                set: '2003-08-19T02:36:24.965Z'
            },
            getMoonTimesNonUTC: {
                rise: '2003-08-19T13:12:45.601Z',
                set: '2003-08-19T02:36:24.965Z'
            }
        }
    },
    {
        input: {
            date: '2005-02-03T11:26:25.393Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -0.17928878188485795,
                altitude: 0.4212739072908715
            },
            getTimes: {
                solarNoon: '2005-02-03T12:05:43.944Z',
                nadir: '2005-02-03T00:05:43.944Z',
                sunrise: '2005-02-03T07:16:44.090Z',
                sunset: '2005-02-03T16:54:43.798Z',
                sunriseEnd: '2005-02-03T07:20:17.407Z',
                sunsetStart: '2005-02-03T16:51:10.481Z',
                dawn: '2005-02-03T06:43:06.319Z',
                dusk: '2005-02-03T17:28:21.569Z',
                nauticalDawn: '2005-02-03T06:05:26.184Z',
                nauticalDusk: '2005-02-03T18:06:01.704Z',
                nightEnd: '2005-02-03T05:28:37.295Z',
                night: '2005-02-03T18:42:50.593Z',
                goldenHourEnd: '2005-02-03T08:04:02.070Z',
                goldenHour: '2005-02-03T16:07:25.818Z'
            },
            getMoonPosition: {
                azimuth: 1.024909379287033,
                altitude: -0.07324064608675047,
                distance: 370078.90882209584,
                parallacticAngle: 0.661366276591179
            },
            getMoonIllumination: {
                fraction: 0.35480957972407406,
                phase: 0.7968909937844161,
                angle: 1.7607653756662984
            },
            getMoonTimesUTC: {
                rise: '2005-02-03T02:21:01.033Z',
                set: '2005-02-03T10:53:40.126Z'
            },
            getMoonTimesNonUTC: {
                rise: '2005-02-03T02:20:51.466Z',
                set: '2005-02-03T10:53:33.824Z'
            }
        }
    },
    {
        input: {
            date: '2005-02-03T11:26:25.393Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -0.21562071283497064,
                altitude: 0.37103733320423715
            },
            getTimes: {
                solarNoon: '2005-02-03T12:14:39.187Z',
                nadir: '2005-02-03T00:14:39.187Z',
                sunrise: '2005-02-03T07:33:14.956Z',
                sunset: '2005-02-03T16:56:03.419Z',
                sunriseEnd: '2005-02-03T07:37:03.096Z',
                sunsetStart: '2005-02-03T16:52:15.279Z',
                dawn: '2005-02-03T06:57:26.272Z',
                dusk: '2005-02-03T17:31:52.103Z',
                nauticalDawn: '2005-02-03T06:17:32.817Z',
                nauticalDusk: '2005-02-03T18:11:45.558Z',
                nightEnd: '2005-02-03T05:38:39.317Z',
                night: '2005-02-03T18:50:39.057Z',
                goldenHourEnd: '2005-02-03T08:24:13.416Z',
                goldenHour: '2005-02-03T16:05:04.959Z'
            },
            getMoonPosition: {
                azimuth: 0.9993906207232184,
                altitude: -0.07661412759128154,
                distance: 370078.90882209584,
                parallacticAngle: 0.6087573416123553
            },
            getMoonIllumination: {
                fraction: 0.35480957972407406,
                phase: 0.7968909937844161,
                angle: 1.7607653756662984
            },
            getMoonTimesUTC: {
                rise: '2005-02-03T02:43:10.023Z',
                set: '2005-02-03T10:49:18.157Z'
            },
            getMoonTimesNonUTC: {
                rise: '2005-02-03T02:43:18.946Z',
                set: '2005-02-03T10:49:08.795Z'
            }
        }
    },
    {
        input: {
            date: '2005-02-03T11:26:25.393Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.0288427523012413,
                altitude: 0.15876663188452403
            },
            getTimes: {
                solarNoon: '2005-02-03T07:19:06.533Z',
                nadir: '2005-02-02T19:19:06.533Z',
                sunrise: '2005-02-03T02:11:27.112Z',
                sunset: '2005-02-03T12:26:45.953Z',
                sunriseEnd: '2005-02-03T02:14:28.057Z',
                sunsetStart: '2005-02-03T12:23:45.009Z',
                dawn: '2005-02-03T01:42:40.501Z',
                dusk: '2005-02-03T12:55:32.564Z',
                nauticalDawn: '2005-02-03T01:10:03.886Z',
                nauticalDusk: '2005-02-03T13:28:09.180Z',
                nightEnd: '2005-02-03T00:38:01.175Z',
                night: '2005-02-03T14:00:11.890Z',
                goldenHourEnd: '2005-02-03T02:50:59.561Z',
                goldenHour: '2005-02-03T11:47:13.504Z'
            },
            getMoonPosition: {
                azimuth: 1.8268350960663993,
                altitude: -0.9103126471455727,
                distance: 370078.90882209584,
                parallacticAngle: 0.9287085947652524
            },
            getMoonIllumination: {
                fraction: 0.35480957972407406,
                phase: 0.7968909937844161,
                angle: 1.7607653756662984
            },
            getMoonTimesUTC: {
                rise: '2005-02-03T22:04:49.064Z',
                set: '2005-02-03T06:30:41.167Z'
            },
            getMoonTimesNonUTC: {
                rise: '2005-02-03T22:04:44.494Z',
                set: '2005-02-03T06:30:32.426Z'
            }
        }
    },
    {
        input: {
            date: '2005-02-03T11:26:25.393Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.71550220332235,
                altitude: -0.6940750084066162
            },
            getTimes: {
                solarNoon: '2005-02-03T02:56:29.211Z',
                nadir: '2005-02-02T14:56:29.211Z',
                sunrise: '2005-02-02T21:39:33.014Z',
                sunset: '2005-02-03T08:13:25.407Z',
                sunriseEnd: '2005-02-02T21:42:20.395Z',
                sunsetStart: '2005-02-03T08:10:38.026Z',
                dawn: '2005-02-02T21:12:50.255Z',
                dusk: '2005-02-03T08:40:08.167Z',
                nauticalDawn: '2005-02-02T20:42:25.171Z',
                nauticalDusk: '2005-02-03T09:10:33.251Z',
                nightEnd: '2005-02-02T20:12:27.117Z',
                night: '2005-02-03T09:40:31.305Z',
                goldenHourEnd: '2005-02-02T22:15:55.681Z',
                goldenHour: '2005-02-03T07:37:02.741Z'
            },
            getMoonPosition: {
                azimuth: -1.9404391296632413,
                altitude: -1.1211359714897895,
                distance: 370078.90882209584,
                parallacticAngle: -0.9742565622579856
            },
            getMoonIllumination: {
                fraction: 0.35480957972407406,
                phase: 0.7968909937844161,
                angle: 1.7607653756662984
            },
            getMoonTimesUTC: {
                rise: '2005-02-03T17:11:46.107Z',
                set: '2005-02-03T02:15:22.512Z'
            },
            getMoonTimesNonUTC: {
                rise: '2005-02-03T17:11:55.261Z',
                set: '2005-02-03T02:15:22.756Z'
            }
        }
    },
    {
        input: {
            date: '2005-05-26T18:38:26.588Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.9750203901887997,
                altitude: 0.14094370487423663
            },
            getTimes: {
                solarNoon: '2005-05-26T11:49:07.782Z',
                nadir: '2005-05-25T23:49:07.782Z',
                sunrise: '2005-05-26T03:55:12.916Z',
                sunset: '2005-05-26T19:43:02.647Z',
                sunriseEnd: '2005-05-26T03:59:08.971Z',
                sunsetStart: '2005-05-26T19:39:06.592Z',
                dawn: '2005-05-26T03:14:51.601Z',
                dusk: '2005-05-26T20:23:23.962Z',
                nauticalDawn: '2005-05-26T02:19:43.766Z',
                nauticalDusk: '2005-05-26T21:18:31.797Z',
                nightEnd: '2005-05-26T00:57:09.779Z',
                night: '2005-05-26T22:41:05.784Z',
                goldenHourEnd: '2005-05-26T04:43:26.140Z',
                goldenHour: '2005-05-26T18:54:49.423Z'
            },
            getMoonPosition: {
                azimuth: -1.6011034397314357,
                altitude: -0.6854537659371345,
                distance: 365036.9318705038,
                parallacticAngle: -0.8382658429264692
            },
            getMoonIllumination: {
                fraction: 0.8905965754217516,
                phase: 0.6073056962476635,
                angle: 1.5739747943805065
            },
            getMoonTimesUTC: {
                rise: '2005-05-26T23:12:24.520Z',
                set: '2005-05-26T05:33:34.983Z'
            },
            getMoonTimesNonUTC: {
                rise: '2005-05-25T22:15:13.706Z',
                set: '2005-05-26T05:33:34.983Z'
            }
        }
    },
    {
        input: {
            date: '2005-05-26T18:38:26.588Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.9396813031903442,
                altitude: 0.18147006416313202
            },
            getTimes: {
                solarNoon: '2005-05-26T11:58:03.024Z',
                nadir: '2005-05-25T23:58:03.024Z',
                sunrise: '2005-05-26T03:52:03.074Z',
                sunset: '2005-05-26T20:04:02.974Z',
                sunriseEnd: '2005-05-26T03:56:20.041Z',
                sunsetStart: '2005-05-26T19:59:46.007Z',
                dawn: '2005-05-26T03:07:28.004Z',
                dusk: '2005-05-26T20:48:38.043Z',
                nauticalDawn: '2005-05-26T02:02:50.257Z',
                nauticalDusk: '2005-05-26T21:53:15.791Z',
                nightEnd: null,
                night: null,
                goldenHourEnd: '2005-05-26T04:44:02.742Z',
                goldenHour: '2005-05-26T19:12:03.306Z'
            },
            getMoonPosition: {
                azimuth: -1.6716551141049738,
                altitude: -0.7073061700638769,
                distance: 365036.9318705038,
                parallacticAngle: -0.7755393530254833
            },
            getMoonIllumination: {
                fraction: 0.8905965754217516,
                phase: 0.6073056962476635,
                angle: 1.5739747943805065
            },
            getMoonTimesUTC: {
                rise: '2005-05-26T23:39:47.469Z',
                set: '2005-05-26T05:24:06.770Z'
            },
            getMoonTimesNonUTC: {
                rise: '2005-05-25T22:43:30.911Z',
                set: '2005-05-26T05:24:06.770Z'
            }
        }
    },
    {
        input: {
            date: '2005-05-26T18:38:26.588Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 3.0328206164298717,
                altitude: -0.485585557986896
            },
            getTimes: {
                solarNoon: '2005-05-26T07:02:30.428Z',
                nadir: '2005-05-25T19:02:30.428Z',
                sunrise: '2005-05-25T23:37:39.229Z',
                sunset: '2005-05-26T14:27:21.628Z',
                sunriseEnd: '2005-05-25T23:40:52.766Z',
                sunsetStart: '2005-05-26T14:24:08.090Z',
                dawn: '2005-05-25T23:05:23.222Z',
                dusk: '2005-05-26T14:59:37.634Z',
                nauticalDawn: '2005-05-25T22:24:46.708Z',
                nauticalDusk: '2005-05-26T15:40:14.148Z',
                nightEnd: '2005-05-25T21:38:13.138Z',
                night: '2005-05-26T16:26:47.719Z',
                goldenHourEnd: '2005-05-26T00:17:54.301Z',
                goldenHour: '2005-05-26T13:47:06.556Z'
            },
            getMoonPosition: {
                azimuth: -0.7274159387123225,
                altitude: 0.14650418239757748,
                distance: 365036.9318705038,
                parallacticAngle: -0.6062084546985302
            },
            getMoonIllumination: {
                fraction: 0.8905965754217516,
                phase: 0.6073056962476635,
                angle: 1.5739747943805065
            },
            getMoonTimesUTC: {
                rise: '2005-05-26T17:34:44.677Z',
                set: '2005-05-26T01:16:54.991Z'
            },
            getMoonTimesNonUTC: {
                rise: '2005-05-26T17:34:44.677Z',
                set: '2005-05-26T01:16:54.991Z'
            }
        }
    },
    {
        input: {
            date: '2005-05-26T18:38:26.588Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.185202671936289,
                altitude: -0.1713716443420753
            },
            getTimes: {
                solarNoon: '2005-05-27T02:40:00.094Z',
                nadir: '2005-05-26T14:40:00.094Z',
                sunrise: '2005-05-26T19:28:32.747Z',
                sunset: '2005-05-27T09:51:27.440Z',
                sunriseEnd: '2005-05-26T19:31:29.905Z',
                sunsetStart: '2005-05-27T09:48:30.282Z',
                dawn: '2005-05-26T18:59:14.949Z',
                dusk: '2005-05-27T10:20:45.238Z',
                nauticalDawn: '2005-05-26T18:23:12.995Z',
                nauticalDusk: '2005-05-27T10:56:47.192Z',
                nightEnd: '2005-05-26T17:43:46.440Z',
                night: '2005-05-27T11:36:13.747Z',
                goldenHourEnd: '2005-05-26T20:05:37.573Z',
                goldenHour: '2005-05-27T09:14:22.615Z'
            },
            getMoonPosition: {
                azimuth: 0.2980543244817609,
                altitude: 0.42660245524670404,
                distance: 365036.9318705038,
                parallacticAngle: 0.27305126268457536
            },
            getMoonIllumination: {
                fraction: 0.8905965754217516,
                phase: 0.6073056962476635,
                angle: 1.5739747943805065
            },
            getMoonTimesUTC: {
                rise: '2005-05-26T12:41:50.223Z',
                set: '2005-05-26T22:10:23.571Z'
            },
            getMoonTimesNonUTC: {
                rise: '2005-05-26T12:41:50.223Z'
            }
        }
    },
    {
        input: {
            date: '2007-12-29T00:06:08.516Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -3.021207854352679,
                altitude: -1.1220598659655032
            },
            getTimes: {
                solarNoon: '2007-12-29T11:53:38.866Z',
                nadir: '2007-12-28T23:53:38.866Z',
                sunrise: '2007-12-29T07:42:31.640Z',
                sunset: '2007-12-29T16:04:46.092Z',
                sunriseEnd: '2007-12-29T07:46:30.603Z',
                sunsetStart: '2007-12-29T16:00:47.129Z',
                dawn: '2007-12-29T07:05:33.243Z',
                dusk: '2007-12-29T16:41:44.489Z',
                nauticalDawn: '2007-12-29T06:25:19.930Z',
                nauticalDusk: '2007-12-29T17:21:57.802Z',
                nightEnd: '2007-12-29T05:46:58.174Z',
                night: '2007-12-29T18:00:19.558Z',
                goldenHourEnd: '2007-12-29T08:37:08.318Z',
                goldenHour: '2007-12-29T15:10:09.415Z'
            },
            getMoonPosition: {
                azimuth: -1.2585435360603079,
                altitude: 0.4344600057963358,
                distance: 390482.3449496562,
                parallacticAngle: -0.6839170247393374
            },
            getMoonIllumination: {
                fraction: 0.7279327682090491,
                phase: 0.6746648938801103,
                angle: 1.9594037547701217
            },
            getMoonTimesUTC: {
                rise: '2007-12-29T22:36:34.057Z',
                set: '2007-12-29T10:52:02.461Z'
            },
            getMoonTimesNonUTC: {
                rise: '2007-12-29T22:36:32.259Z',
                set: '2007-12-29T10:51:54.569Z'
            }
        }
    },
    {
        input: {
            date: '2007-12-29T00:06:08.516Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -3.1069880442708646,
                altitude: -1.077864621078209
            },
            getTimes: {
                solarNoon: '2007-12-29T12:02:34.242Z',
                nadir: '2007-12-29T00:02:34.242Z',
                sunrise: '2007-12-29T08:03:36.709Z',
                sunset: '2007-12-29T16:01:31.774Z',
                sunriseEnd: '2007-12-29T08:07:57.045Z',
                sunsetStart: '2007-12-29T15:57:11.439Z',
                dawn: '2007-12-29T07:23:42.231Z',
                dusk: '2007-12-29T16:41:26.252Z',
                nauticalDawn: '2007-12-29T06:40:48.883Z',
                nauticalDusk: '2007-12-29T17:24:19.601Z',
                nightEnd: '2007-12-29T06:00:11.623Z',
                night: '2007-12-29T18:04:56.861Z',
                goldenHourEnd: '2007-12-29T09:04:12.494Z',
                goldenHour: '2007-12-29T15:00:55.990Z'
            },
            getMoonPosition: {
                azimuth: -1.2723112286519926,
                altitude: 0.3968431419372894,
                distance: 390482.3449496562,
                parallacticAngle: -0.6439135600519365
            },
            getMoonIllumination: {
                fraction: 0.7279327682090491,
                phase: 0.6746648938801103,
                angle: 1.9594037547701217
            },
            getMoonTimesUTC: {
                rise: '2007-12-29T22:44:43.399Z',
                set: '2007-12-29T11:03:33.640Z'
            },
            getMoonTimesNonUTC: {
                rise: '2007-12-29T22:44:50.212Z',
                set: '2007-12-29T11:03:26.343Z'
            }
        }
    },
    {
        input: {
            date: '2007-12-29T00:06:08.516Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.4105437715071607,
                altitude: -0.4545374908878508
            },
            getTimes: {
                solarNoon: '2007-12-29T07:06:57.215Z',
                nadir: '2007-12-28T19:06:57.215Z',
                sunrise: '2007-12-29T02:26:30.262Z',
                sunset: '2007-12-29T11:47:24.169Z',
                sunriseEnd: '2007-12-29T02:29:46.071Z',
                sunsetStart: '2007-12-29T11:44:08.360Z',
                dawn: '2007-12-29T01:55:40.833Z',
                dusk: '2007-12-29T12:18:13.598Z',
                nauticalDawn: '2007-12-29T01:21:20.168Z',
                nauticalDusk: '2007-12-29T12:52:34.263Z',
                nightEnd: '2007-12-29T00:48:05.323Z',
                night: '2007-12-29T13:25:49.108Z',
                goldenHourEnd: '2007-12-29T03:09:55.462Z',
                goldenHour: '2007-12-29T11:03:58.969Z'
            },
            getMoonPosition: {
                azimuth: 0.3419536733428686,
                altitude: 0.9689264895483629,
                distance: 390482.3449496562,
                parallacticAngle: 0.25936561337435665
            },
            getMoonIllumination: {
                fraction: 0.7279327682090491,
                phase: 0.6746648938801103,
                angle: 1.9594037547701217
            },
            getMoonTimesUTC: {
                rise: '2007-12-29T17:39:55.189Z',
                set: '2007-12-29T05:55:15.369Z'
            },
            getMoonTimesNonUTC: {
                rise: '2007-12-29T17:39:57.717Z',
                set: '2007-12-29T05:55:20.807Z'
            }
        }
    },
    {
        input: {
            date: '2007-12-29T00:06:08.516Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -0.6714533591907864,
                altitude: 0.3532485654697661
            },
            getTimes: {
                solarNoon: '2007-12-29T02:44:16.032Z',
                nadir: '2007-12-28T14:44:16.032Z',
                sunrise: '2007-12-28T21:49:32.773Z',
                sunset: '2007-12-29T07:38:59.291Z',
                sunriseEnd: '2007-12-28T21:52:31.687Z',
                sunsetStart: '2007-12-29T07:36:00.378Z',
                dawn: '2007-12-28T21:21:12.217Z',
                dusk: '2007-12-29T08:07:19.847Z',
                nauticalDawn: '2007-12-28T20:49:19.742Z',
                nauticalDusk: '2007-12-29T08:39:12.322Z',
                nightEnd: '2007-12-28T20:18:16.620Z',
                night: '2007-12-29T09:10:15.444Z',
                goldenHourEnd: '2007-12-28T22:28:49.705Z',
                goldenHour: '2007-12-29T06:59:42.360Z'
            },
            getMoonPosition: {
                azimuth: 1.5450331417433418,
                altitude: 0.26705260006246295,
                distance: 390482.3449496562,
                parallacticAngle: 0.960379924461111
            },
            getMoonIllumination: {
                fraction: 0.7279327682090491,
                phase: 0.6746648938801103,
                angle: 1.9594037547701217
            },
            getMoonTimesUTC: {
                rise: '2007-12-29T13:07:35.451Z',
                set: '2007-12-29T01:23:34.258Z'
            },
            getMoonTimesNonUTC: {
                rise: '2007-12-29T13:07:43.445Z',
                set: '2007-12-29T01:23:42.968Z'
            }
        }
    },
    {
        input: {
            date: '2008-07-01T03:53:46.214Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.2251317922501994,
                altitude: -0.010898879912008287
            },
            getTimes: {
                solarNoon: '2008-07-01T11:55:40.420Z',
                nadir: '2008-06-30T23:55:40.420Z',
                sunrise: '2008-07-01T03:49:57.640Z',
                sunset: '2008-07-01T20:01:23.199Z',
                sunriseEnd: '2008-07-01T03:54:03.902Z',
                sunsetStart: '2008-07-01T19:57:16.937Z',
                dawn: '2008-07-01T03:07:23.929Z',
                dusk: '2008-07-01T20:43:56.910Z',
                nauticalDawn: '2008-07-01T02:06:50.947Z',
                nauticalDusk: '2008-07-01T21:44:29.893Z',
                nightEnd: null,
                night: null,
                goldenHourEnd: '2008-07-01T04:39:52.975Z',
                goldenHour: '2008-07-01T19:11:27.865Z'
            },
            getMoonPosition: {
                azimuth: -1.9185101260017479,
                altitude: 0.3314087260753349,
                distance: 364154.56477016426,
                parallacticAngle: -0.7688732208921174
            },
            getMoonIllumination: {
                fraction: 0.05116000380378932,
                phase: 0.9273743574463782,
                angle: 1.6161235257972564
            },
            getMoonTimesUTC: {
                rise: '2008-07-01T01:30:29.376Z',
                set: '2008-07-01T19:10:11.819Z'
            },
            getMoonTimesNonUTC: {
                rise: '2008-07-01T01:30:29.376Z',
                set: '2008-07-01T19:10:11.819Z'
            }
        }
    },
    {
        input: {
            date: '2008-07-01T03:53:46.214Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.2553598969870716,
                altitude: -0.0017477125853628738
            },
            getTimes: {
                solarNoon: '2008-07-01T12:04:35.687Z',
                nadir: '2008-07-01T00:04:35.687Z',
                sunrise: '2008-07-01T03:45:11.570Z',
                sunset: '2008-07-01T20:23:59.803Z',
                sunriseEnd: '2008-07-01T03:49:41.872Z',
                sunsetStart: '2008-07-01T20:19:29.501Z',
                dawn: '2008-07-01T02:57:32.991Z',
                dusk: '2008-07-01T21:11:38.383Z',
                nauticalDawn: '2008-07-01T01:43:12.696Z',
                nauticalDusk: '2008-07-01T22:25:58.677Z',
                nightEnd: null,
                night: null,
                goldenHourEnd: '2008-07-01T04:39:20.198Z',
                goldenHour: '2008-07-01T19:29:51.176Z'
            },
            getMoonPosition: {
                azimuth: -1.9307707451753997,
                altitude: 0.3240668133143291,
                distance: 364154.56477016426,
                parallacticAngle: -0.7139477770200047
            },
            getMoonIllumination: {
                fraction: 0.05116000380378932,
                phase: 0.9273743574463782,
                angle: 1.6161235257972564
            },
            getMoonTimesUTC: {
                rise: '2008-07-01T01:21:51.822Z',
                set: '2008-07-01T19:37:42.180Z'
            },
            getMoonTimesNonUTC: {
                rise: '2008-07-01T01:21:51.822Z',
                set: '2008-07-01T19:37:42.180Z'
            }
        }
    },
    {
        input: {
            date: '2008-07-01T03:53:46.214Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.4296681374517188,
                altitude: 0.797502581724506
            },
            getTimes: {
                solarNoon: '2008-07-01T07:09:02.264Z',
                nadir: '2008-06-30T19:09:02.264Z',
                sunrise: '2008-06-30T23:35:39.286Z',
                sunset: '2008-07-01T14:42:25.242Z',
                sunriseEnd: '2008-06-30T23:38:58.449Z',
                sunsetStart: '2008-07-01T14:39:06.079Z',
                dawn: '2008-06-30T23:02:17.315Z',
                dusk: '2008-07-01T15:15:47.212Z',
                nauticalDawn: '2008-06-30T22:19:43.100Z',
                nauticalDusk: '2008-07-01T15:58:21.428Z',
                nightEnd: '2008-06-30T21:29:26.180Z',
                night: '2008-07-01T16:48:38.347Z',
                goldenHourEnd: '2008-07-01T00:16:54.732Z',
                goldenHour: '2008-07-01T14:01:09.796Z'
            },
            getMoonPosition: {
                azimuth: -0.9976872193963469,
                altitude: 1.196125619892474,
                distance: 364154.56477016426,
                parallacticAngle: -0.7978250569960129
            },
            getMoonIllumination: {
                fraction: 0.05116000380378932,
                phase: 0.9273743574463782,
                angle: 1.6161235257972564
            },
            getMoonTimesUTC: {
                rise: '2008-07-01T22:12:42.656Z',
                set: '2008-07-01T13:27:08.530Z'
            },
            getMoonTimesNonUTC: {
                set: '2008-07-01T13:27:08.530Z'
            }
        }
    },
    {
        input: {
            date: '2008-07-01T03:53:46.214Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 0.9419322111264372,
                altitude: 1.2337404697571173
            },
            getTimes: {
                solarNoon: '2008-07-01T02:46:24.280Z',
                nadir: '2008-06-30T14:46:24.280Z',
                sunrise: '2008-06-30T19:28:26.109Z',
                sunset: '2008-07-01T10:04:22.452Z',
                sunriseEnd: '2008-06-30T19:31:27.262Z',
                sunsetStart: '2008-07-01T10:01:21.299Z',
                dawn: '2008-06-30T18:58:23.155Z',
                dusk: '2008-07-01T10:34:25.406Z',
                nauticalDawn: '2008-06-30T18:21:07.748Z',
                nauticalDusk: '2008-07-01T11:11:40.813Z',
                nightEnd: '2008-06-30T17:39:44.569Z',
                night: '2008-07-01T11:53:03.991Z',
                goldenHourEnd: '2008-06-30T20:06:15.137Z',
                goldenHour: '2008-07-01T09:26:33.424Z'
            },
            getMoonPosition: {
                azimuth: 1.581399820273478,
                altitude: 0.8845533555119192,
                distance: 364154.56477016426,
                parallacticAngle: 1.1506334459562628
            },
            getMoonIllumination: {
                fraction: 0.05116000380378932,
                phase: 0.9273743574463782,
                angle: 1.6161235257972564
            },
            getMoonTimesUTC: {
                rise: '2008-07-01T17:57:46.795Z',
                set: '2008-07-01T08:32:35.893Z'
            },
            getMoonTimesNonUTC: {
                rise: '2008-07-01T17:57:46.795Z',
                set: '2008-07-01T08:32:35.893Z'
            }
        }
    },
    {
        input: {
            date: '2010-08-31T12:07:15.318Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 0.10279939964839772,
                altitude: 0.866754141949511
            },
            getTimes: {
                solarNoon: '2010-08-31T11:52:29.347Z',
                nadir: '2010-08-30T23:52:29.347Z',
                sunrise: '2010-08-31T05:05:01.591Z',
                sunset: '2010-08-31T18:39:57.103Z',
                sunriseEnd: '2010-08-31T05:08:22.190Z',
                sunsetStart: '2010-08-31T18:36:36.505Z',
                dawn: '2010-08-31T04:32:01.921Z',
                dusk: '2010-08-31T19:12:56.773Z',
                nauticalDawn: '2010-08-31T03:51:47.168Z',
                nauticalDusk: '2010-08-31T19:53:11.526Z',
                nightEnd: '2010-08-31T03:07:57.348Z',
                night: '2010-08-31T20:37:01.346Z',
                goldenHourEnd: '2010-08-31T05:47:19.262Z',
                goldenHour: '2010-08-31T17:57:39.433Z'
            },
            getMoonPosition: {
                azimuth: 2.1079532896026607,
                altitude: 0.052950090531002164,
                distance: 387484.72631667595,
                parallacticAngle: 0.6552371181439298
            },
            getMoonIllumination: {
                fraction: 0.6186684787862955,
                phase: 0.7118627261993002,
                angle: 1.303870027297626
            },
            getMoonTimesUTC: {
                rise: '2010-08-31T21:00:01.108Z',
                set: '2010-08-31T12:30:07.046Z'
            },
            getMoonTimesNonUTC: {
                rise: '2010-08-31T21:00:01.108Z',
                set: '2010-08-31T12:30:07.046Z'
            }
        }
    },
    {
        input: {
            date: '2010-08-31T12:07:15.318Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 0.041149845999326376,
                altitude: 0.8224143164149761
            },
            getTimes: {
                solarNoon: '2010-08-31T12:01:24.431Z',
                nadir: '2010-08-31T00:01:24.431Z',
                sunrise: '2010-08-31T05:09:30.328Z',
                sunset: '2010-08-31T18:53:18.534Z',
                sunriseEnd: '2010-08-31T05:13:03.225Z',
                sunsetStart: '2010-08-31T18:49:45.637Z',
                dawn: '2010-08-31T04:34:22.352Z',
                dusk: '2010-08-31T19:28:26.510Z',
                nauticalDawn: '2010-08-31T03:51:04.599Z',
                nauticalDusk: '2010-08-31T20:11:44.263Z',
                nightEnd: '2010-08-31T03:02:53.214Z',
                night: '2010-08-31T20:59:55.648Z',
                goldenHourEnd: '2010-08-31T05:54:17.810Z',
                goldenHour: '2010-08-31T18:08:31.052Z'
            },
            getMoonPosition: {
                azimuth: 2.076078966656045,
                altitude: 0.09612589905474622,
                distance: 387484.72631667595,
                parallacticAngle: 0.627478721150863
            },
            getMoonIllumination: {
                fraction: 0.6186684787862955,
                phase: 0.7118627261993002,
                angle: 1.303870027297626
            },
            getMoonTimesUTC: {
                rise: '2010-08-31T20:56:04.939Z',
                set: '2010-08-31T12:52:58.313Z'
            },
            getMoonTimesNonUTC: {
                rise: '2010-08-31T20:56:04.939Z',
                set: '2010-08-31T12:52:58.313Z'
            }
        }
    },
    {
        input: {
            date: '2010-08-31T12:07:15.318Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.5211814714411018,
                altitude: 0.2896400038700192
            },
            getTimes: {
                solarNoon: '2010-08-31T07:05:57.068Z',
                nadir: '2010-08-30T19:05:57.068Z',
                sunrise: '2010-08-31T00:29:15.897Z',
                sunset: '2010-08-31T13:42:38.239Z',
                sunriseEnd: '2010-08-31T00:32:08.642Z',
                sunsetStart: '2010-08-31T13:39:45.494Z',
                dawn: '2010-08-31T00:01:02.490Z',
                dusk: '2010-08-31T14:10:51.646Z',
                nauticalDawn: '2010-08-30T23:27:17.716Z',
                nauticalDusk: '2010-08-31T14:44:36.420Z',
                nightEnd: '2010-08-30T22:51:55.794Z',
                night: '2010-08-31T15:19:58.342Z',
                goldenHourEnd: '2010-08-31T01:05:51.028Z',
                goldenHour: '2010-08-31T13:06:03.108Z'
            },
            getMoonPosition: {
                azimuth: -3.068800811610664,
                altitude: -0.46761084715601137,
                distance: 387484.72631667595,
                parallacticAngle: -0.05945328574567803
            },
            getMoonIllumination: {
                fraction: 0.6186684787862955,
                phase: 0.7118627261993002,
                angle: 1.303870027297626
            },
            getMoonTimesUTC: {
                rise: '2010-08-31T16:37:03.909Z',
                set: '2010-08-31T07:01:20.914Z'
            },
            getMoonTimesNonUTC: {
                rise: '2010-08-31T16:37:03.909Z',
                set: '2010-08-31T07:01:20.914Z'
            }
        }
    },
    {
        input: {
            date: '2010-08-31T12:07:15.318Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.3150161781925265,
                altitude: -0.5679499012896623
            },
            getTimes: {
                solarNoon: '2010-08-31T02:43:24.465Z',
                nadir: '2010-08-30T14:43:24.465Z',
                sunrise: '2010-08-30T20:12:01.232Z',
                sunset: '2010-08-31T09:14:47.697Z',
                sunriseEnd: '2010-08-30T20:14:41.921Z',
                sunsetStart: '2010-08-31T09:12:07.008Z',
                dawn: '2010-08-30T19:45:50.178Z',
                dusk: '2010-08-31T09:40:58.751Z',
                nauticalDawn: '2010-08-30T19:14:45.804Z',
                nauticalDusk: '2010-08-31T10:12:03.125Z',
                nightEnd: '2010-08-30T18:42:37.789Z',
                night: '2010-08-31T10:44:11.140Z',
                goldenHourEnd: '2010-08-30T20:46:06.940Z',
                goldenHour: '2010-08-31T08:40:41.989Z'
            },
            getMoonPosition: {
                azimuth: -2.084879277377168,
                altitude: -0.03621689618545448,
                distance: 387484.72631667595,
                parallacticAngle: -0.8670451918432481
            },
            getMoonIllumination: {
                fraction: 0.6186684787862955,
                phase: 0.7118627261993002,
                angle: 1.303870027297626
            },
            getMoonTimesUTC: {
                rise: '2010-08-31T12:20:48.472Z',
                set: '2010-08-31T02:12:14.842Z'
            },
            getMoonTimesNonUTC: {
                rise: '2010-08-31T12:20:48.472Z',
                set: '2010-08-31T02:12:14.842Z'
            }
        }
    },
    {
        input: {
            date: '2011-12-14T16:57:47.030Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.1487081335662288,
                altitude: -0.17139250692216274
            },
            getTimes: {
                solarNoon: '2011-12-14T11:46:28.881Z',
                nadir: '2011-12-13T23:46:28.881Z',
                sunrise: '2011-12-14T07:35:04.297Z',
                sunset: '2011-12-14T15:57:53.464Z',
                sunriseEnd: '2011-12-14T07:39:03.015Z',
                sunsetStart: '2011-12-14T15:53:54.746Z',
                dawn: '2011-12-14T06:58:07.800Z',
                dusk: '2011-12-14T16:34:49.961Z',
                nauticalDawn: '2011-12-14T06:17:55.951Z',
                nauticalDusk: '2011-12-14T17:15:01.811Z',
                nightEnd: '2011-12-14T05:39:35.146Z',
                night: '2011-12-14T17:53:22.615Z',
                goldenHourEnd: '2011-12-14T08:29:36.641Z',
                goldenHour: '2011-12-14T15:03:21.121Z'
            },
            getMoonPosition: {
                azimuth: -2.6182354516472994,
                altitude: -0.3919498772559445,
                distance: 379112.9299962224,
                parallacticAngle: -0.34484559494308203
            },
            getMoonIllumination: {
                fraction: 0.8353044558528595,
                phase: 0.6330164491433267,
                angle: 1.9080590516855862
            },
            getMoonTimesUTC: {
                rise: '2011-12-14T20:09:04.923Z',
                set: '2011-12-14T10:01:53.131Z'
            },
            getMoonTimesNonUTC: {
                rise: '2011-12-14T20:08:56.387Z',
                set: '2011-12-14T10:01:57.990Z'
            }
        }
    },
    {
        input: {
            date: '2011-12-14T16:57:47.030Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.1277974802428037,
                altitude: -0.16814406956292519
            },
            getTimes: {
                solarNoon: '2011-12-14T11:55:24.252Z',
                nadir: '2011-12-13T23:55:24.252Z',
                sunrise: '2011-12-14T07:56:07.378Z',
                sunset: '2011-12-14T15:54:41.127Z',
                sunriseEnd: '2011-12-14T08:00:27.402Z',
                sunsetStart: '2011-12-14T15:50:21.103Z',
                dawn: '2011-12-14T07:16:15.244Z',
                dusk: '2011-12-14T16:34:33.261Z',
                nauticalDawn: '2011-12-14T06:33:23.613Z',
                nauticalDusk: '2011-12-14T17:17:24.892Z',
                nightEnd: '2011-12-14T05:52:47.422Z',
                night: '2011-12-14T17:58:01.083Z',
                goldenHourEnd: '2011-12-14T08:56:37.278Z',
                goldenHour: '2011-12-14T14:54:11.227Z'
            },
            getMoonPosition: {
                azimuth: -2.6660377718125097,
                altitude: -0.36328860518555955,
                distance: 379112.9299962224,
                parallacticAngle: -0.2973171627678576
            },
            getMoonIllumination: {
                fraction: 0.8353044558528595,
                phase: 0.6330164491433267,
                angle: 1.9080590516855862
            },
            getMoonTimesUTC: {
                rise: '2011-12-14T20:12:00.453Z',
                set: '2011-12-14T10:17:14.873Z'
            },
            getMoonTimesNonUTC: {
                rise: '2011-12-14T20:11:50.473Z',
                set: '2011-12-14T10:17:20.148Z'
            }
        }
    },
    {
        input: {
            date: '2011-12-14T16:57:47.030Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.009916073071564,
                altitude: -1.0313113104864957
            },
            getTimes: {
                solarNoon: '2011-12-14T06:59:47.370Z',
                nadir: '2011-12-13T18:59:47.370Z',
                sunrise: '2011-12-14T02:19:02.096Z',
                sunset: '2011-12-14T11:40:32.644Z',
                sunriseEnd: '2011-12-14T02:22:17.703Z',
                sunsetStart: '2011-12-14T11:37:17.036Z',
                dawn: '2011-12-14T01:48:14.331Z',
                dusk: '2011-12-14T12:11:20.409Z',
                nauticalDawn: '2011-12-14T01:13:55.099Z',
                nauticalDusk: '2011-12-14T12:45:39.641Z',
                nightEnd: '2011-12-14T00:40:41.299Z',
                night: '2011-12-14T13:18:53.441Z',
                goldenHourEnd: '2011-12-14T03:02:24.115Z',
                goldenHour: '2011-12-14T10:57:10.625Z'
            },
            getMoonPosition: {
                azimuth: -1.6400141746923114,
                altitude: 0.28220004216390976,
                distance: 379112.9299962224,
                parallacticAngle: -0.8903574005917104
            },
            getMoonIllumination: {
                fraction: 0.8353044558528595,
                phase: 0.6330164491433267,
                angle: 1.9080590516855862
            },
            getMoonTimesUTC: {
                rise: '2011-12-14T15:25:38.209Z',
                set: '2011-12-14T04:49:37.343Z'
            },
            getMoonTimesNonUTC: {
                rise: '2011-12-14T15:25:49.506Z',
                set: '2011-12-14T04:49:27.007Z'
            }
        }
    },
    {
        input: {
            date: '2011-12-14T16:57:47.030Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.7887267272218754,
                altitude: -0.996282844691604
            },
            getTimes: {
                solarNoon: '2011-12-15T02:37:34.075Z',
                nadir: '2011-12-14T14:37:34.075Z',
                sunrise: '2011-12-14T21:42:44.132Z',
                sunset: '2011-12-15T07:32:24.017Z',
                sunriseEnd: '2011-12-14T21:45:42.976Z',
                sunsetStart: '2011-12-15T07:29:25.173Z',
                dawn: '2011-12-14T21:14:24.162Z',
                dusk: '2011-12-15T08:00:43.988Z',
                nauticalDawn: '2011-12-14T20:42:32.219Z',
                nauticalDusk: '2011-12-15T08:32:35.930Z',
                nightEnd: '2011-12-14T20:11:29.510Z',
                night: '2011-12-15T09:03:38.639Z',
                goldenHourEnd: '2011-12-14T22:22:00.018Z',
                goldenHour: '2011-12-15T06:53:08.131Z'
            },
            getMoonPosition: {
                azimuth: -0.5920186026985108,
                altitude: 1.1203924610583755,
                distance: 379112.9299962224,
                parallacticAngle: -0.4847503212108109
            },
            getMoonIllumination: {
                fraction: 0.8353044558528595,
                phase: 0.6330164491433267,
                angle: 1.9080590516855862
            },
            getMoonTimesUTC: {
                rise: '2011-12-14T10:59:08.960Z',
                set: '2011-12-14T00:09:45.027Z'
            },
            getMoonTimesNonUTC: {
                rise: '2011-12-14T10:59:10.671Z',
                set: '2011-12-14T00:09:50.016Z'
            }
        }
    },
    {
        input: {
            date: '2012-10-28T10:30:54.346Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -0.30521049090956404,
                altitude: 0.4587786200309252
            },
            getTimes: {
                solarNoon: '2012-10-28T11:35:33.713Z',
                nadir: '2012-10-27T23:35:33.713Z',
                sunrise: '2012-10-28T06:30:35.138Z',
                sunset: '2012-10-28T16:40:32.287Z',
                sunriseEnd: '2012-10-28T06:34:01.127Z',
                sunsetStart: '2012-10-28T16:37:06.298Z',
                dawn: '2012-10-28T05:57:54.221Z',
                dusk: '2012-10-28T17:13:13.205Z',
                nauticalDawn: '2012-10-28T05:20:53.964Z',
                nauticalDusk: '2012-10-28T17:50:13.461Z',
                nightEnd: '2012-10-28T04:44:21.840Z',
                night: '2012-10-28T18:26:45.585Z',
                goldenHourEnd: '2012-10-28T07:15:50.776Z',
                goldenHour: '2012-10-28T15:55:16.650Z'
            },
            getMoonPosition: {
                azimuth: 3.125454221756383,
                altitude: -0.5151549802692971,
                distance: 398600.41121522733,
                parallacticAngle: 0.010823497623883318
            },
            getMoonIllumination: {
                fraction: 0.9829310107822877,
                phase: 0.45829411608683435,
                angle: -1.7387166351170769
            },
            getMoonTimesUTC: {
                rise: '2012-10-28T15:46:18.355Z',
                set: '2012-10-28T05:13:55.693Z'
            },
            getMoonTimesNonUTC: {
                rise: '2012-10-28T15:46:18.355Z',
                set: '2012-10-28T05:13:55.693Z'
            }
        }
    },
    {
        input: {
            date: '2012-10-28T10:30:54.346Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -0.3392714894162779,
                altitude: 0.4070202385022226
            },
            getTimes: {
                solarNoon: '2012-10-28T11:44:28.890Z',
                nadir: '2012-10-27T23:44:28.890Z',
                sunrise: '2012-10-28T06:45:23.085Z',
                sunset: '2012-10-28T16:43:34.694Z',
                sunriseEnd: '2012-10-28T06:49:02.352Z',
                sunsetStart: '2012-10-28T16:39:55.427Z',
                dawn: '2012-10-28T06:10:42.028Z',
                dusk: '2012-10-28T17:18:15.752Z',
                nauticalDawn: '2012-10-28T05:31:34.111Z',
                nauticalDusk: '2012-10-28T17:57:23.668Z',
                nightEnd: '2012-10-28T04:52:57.640Z',
                night: '2012-10-28T18:36:00.139Z',
                goldenHourEnd: '2012-10-28T07:33:49.276Z',
                goldenHour: '2012-10-28T15:55:08.503Z'
            },
            getMoonPosition: {
                azimuth: 3.0828859871124905,
                altitude: -0.4680079880233232,
                distance: 398600.41121522733,
                parallacticAngle: 0.03723549323597032
            },
            getMoonIllumination: {
                fraction: 0.9829310107822877,
                phase: 0.45829411608683435,
                angle: -1.7387166351170769
            },
            getMoonTimesUTC: {
                rise: '2012-10-28T15:49:21.634Z',
                set: '2012-10-28T05:28:16.493Z'
            },
            getMoonTimesNonUTC: {
                rise: '2012-10-28T15:49:21.634Z',
                set: '2012-10-28T05:28:16.493Z'
            }
        }
    },
    {
        input: {
            date: '2012-10-28T10:30:54.346Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 0.9851036022388351,
                altitude: 0.2708210527102804
            },
            getTimes: {
                solarNoon: '2012-10-28T06:48:58.470Z',
                nadir: '2012-10-27T18:48:58.470Z',
                sunrise: '2012-10-28T01:29:03.700Z',
                sunset: '2012-10-28T12:08:53.239Z',
                sunriseEnd: '2012-10-28T01:31:59.906Z',
                sunsetStart: '2012-10-28T12:05:57.033Z',
                dawn: '2012-10-28T01:00:55.588Z',
                dusk: '2012-10-28T12:37:01.351Z',
                nauticalDawn: '2012-10-28T00:28:49.203Z',
                nauticalDusk: '2012-10-28T13:09:07.736Z',
                nightEnd: '2012-10-27T23:57:03.333Z',
                night: '2012-10-28T13:40:53.607Z',
                goldenHourEnd: '2012-10-28T02:07:21.803Z',
                goldenHour: '2012-10-28T11:30:35.136Z'
            },
            getMoonPosition: {
                azimuth: -1.9381359833921998,
                altitude: -0.10992375671249216,
                distance: 398600.41121522733,
                parallacticAngle: -0.8053156066924755
            },
            getMoonIllumination: {
                fraction: 0.9829310107822877,
                phase: 0.45829411608683435,
                angle: -1.7387166351170769
            },
            getMoonTimesUTC: {
                rise: '2012-10-28T11:07:33.294Z',
                set: '2012-10-28T00:03:10.611Z'
            },
            getMoonTimesNonUTC: {
                rise: '2012-10-28T11:07:33.294Z',
                set: '2012-10-28T00:03:10.611Z'
            }
        }
    },
    {
        input: {
            date: '2012-10-28T10:30:54.346Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.6998843414988873,
                altitude: -0.5748170292528433
            },
            getTimes: {
                solarNoon: '2012-10-28T02:26:23.191Z',
                nadir: '2012-10-27T14:26:23.191Z',
                sunrise: '2012-10-27T20:58:57.092Z',
                sunset: '2012-10-28T07:53:49.290Z',
                sunriseEnd: '2012-10-27T21:01:40.558Z',
                sunsetStart: '2012-10-28T07:51:05.824Z',
                dawn: '2012-10-27T20:32:46.950Z',
                dusk: '2012-10-28T08:19:59.432Z',
                nauticalDawn: '2012-10-27T20:02:49.150Z',
                nauticalDusk: '2012-10-28T08:49:57.232Z',
                nightEnd: '2012-10-27T19:33:08.438Z',
                night: '2012-10-28T09:19:37.944Z',
                goldenHourEnd: '2012-10-27T21:34:20.136Z',
                goldenHour: '2012-10-28T07:18:26.246Z'
            },
            getMoonPosition: {
                azimuth: -1.2061817018569914,
                altitude: 0.762812009945628,
                distance: 398600.41121522733,
                parallacticAngle: -0.8844610021981179
            },
            getMoonIllumination: {
                fraction: 0.9829310107822877,
                phase: 0.45829411608683435,
                angle: -1.7387166351170769
            },
            getMoonTimesUTC: {
                rise: '2012-10-28T06:46:34.163Z',
                set: '2012-10-28T20:20:51.065Z'
            },
            getMoonTimesNonUTC: {
                rise: '2012-10-28T06:46:34.163Z',
                set: '2012-10-28T20:20:51.065Z'
            }
        }
    },
    {
        input: {
            date: '2013-01-16T11:41:42.877Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -0.08446559320107538,
                altitude: 0.35117827680926644
            },
            getTimes: {
                solarNoon: '2013-01-16T12:01:29.740Z',
                nadir: '2013-01-16T00:01:29.740Z',
                sunrise: '2013-01-16T07:36:38.431Z',
                sunset: '2013-01-16T16:26:21.049Z',
                sunriseEnd: '2013-01-16T07:40:26.640Z',
                sunsetStart: '2013-01-16T16:22:32.839Z',
                dawn: '2013-01-16T07:01:03.843Z',
                dusk: '2013-01-16T17:01:55.637Z',
                nauticalDawn: '2013-01-16T06:21:55.159Z',
                nauticalDusk: '2013-01-16T17:41:04.320Z',
                nightEnd: '2013-01-16T05:44:14.762Z',
                night: '2013-01-16T18:18:44.718Z',
                goldenHourEnd: '2013-01-16T08:28:07.905Z',
                goldenHour: '2013-01-16T15:34:51.575Z'
            },
            getMoonPosition: {
                azimuth: -1.2193451123095251,
                altitude: 0.3567977838296479,
                distance: 387339.8693938915,
                parallacticAngle: -0.6669433463887197
            },
            getMoonIllumination: {
                fraction: 0.2552286099787676,
                phase: 0.16858184926478847,
                angle: -2.024564627069933
            },
            getMoonTimesUTC: {
                rise: '2013-01-16T09:32:19.744Z',
                set: '2013-01-16T22:33:03.274Z'
            },
            getMoonTimesNonUTC: {
                rise: '2013-01-16T09:32:26.656Z',
                set: '2013-01-16T22:32:54.622Z'
            }
        }
    },
    {
        input: {
            date: '2013-01-16T11:41:42.877Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -0.12116632406162242,
                altitude: 0.3026184369789507
            },
            getTimes: {
                solarNoon: '2013-01-16T12:10:25.067Z',
                nadir: '2013-01-16T00:10:25.067Z',
                sunrise: '2013-01-16T07:55:58.516Z',
                sunset: '2013-01-16T16:24:51.619Z',
                sunriseEnd: '2013-01-16T08:00:05.129Z',
                sunsetStart: '2013-01-16T16:20:45.005Z',
                dawn: '2013-01-16T07:17:48.044Z',
                dusk: '2013-01-16T17:03:02.091Z',
                nauticalDawn: '2013-01-16T06:36:11.314Z',
                nauticalDusk: '2013-01-16T17:44:38.820Z',
                nightEnd: '2013-01-16T05:56:20.927Z',
                night: '2013-01-16T18:24:29.208Z',
                goldenHourEnd: '2013-01-16T08:52:21.432Z',
                goldenHour: '2013-01-16T15:28:28.702Z'
            },
            getMoonPosition: {
                azimuth: -1.2369368372697656,
                altitude: 0.31787726776166575,
                distance: 387339.8693938915,
                parallacticAngle: -0.6296753396521247
            },
            getMoonIllumination: {
                fraction: 0.2552286099787676,
                phase: 0.16858184926478847,
                angle: -2.024564627069933
            },
            getMoonTimesUTC: {
                rise: '2013-01-16T09:40:16.280Z',
                set: '2013-01-16T22:45:15.610Z'
            },
            getMoonTimesNonUTC: {
                rise: '2013-01-16T09:40:15.445Z',
                set: '2013-01-16T22:45:05.400Z'
            }
        }
    },
    {
        input: {
            date: '2013-01-16T11:41:42.877Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.034361859221629,
                altitude: 0.04654676269789759
            },
            getTimes: {
                solarNoon: '2013-01-16T07:14:49.637Z',
                nadir: '2013-01-15T19:14:49.637Z',
                sunrise: '2013-01-16T02:24:39.948Z',
                sunset: '2013-01-16T12:04:59.327Z',
                sunriseEnd: '2013-01-16T02:27:49.745Z',
                sunsetStart: '2013-01-16T12:01:49.530Z',
                dawn: '2013-01-16T01:54:40.268Z',
                dusk: '2013-01-16T12:34:59.007Z',
                nauticalDawn: '2013-01-16T01:21:02.311Z',
                nauticalDusk: '2013-01-16T13:08:36.963Z',
                nightEnd: '2013-01-16T00:48:18.237Z',
                night: '2013-01-16T13:41:21.038Z',
                goldenHourEnd: '2013-01-16T03:06:30.606Z',
                goldenHour: '2013-01-16T11:23:08.669Z'
            },
            getMoonPosition: {
                azimuth: 0.27639570715582457,
                altitude: 0.8925800943471701,
                distance: 387339.8693938915,
                parallacticAngle: 0.20862659878558165
            },
            getMoonIllumination: {
                fraction: 0.2552286099787676,
                phase: 0.16858184926478847,
                angle: -2.024564627069933
            },
            getMoonTimesUTC: {
                rise: '2013-01-16T04:43:06.760Z',
                set: '2013-01-16T17:27:33.907Z'
            },
            getMoonTimesNonUTC: {
                rise: '2013-01-16T04:43:05.342Z',
                set: '2013-01-16T17:27:42.412Z'
            }
        }
    },
    {
        input: {
            date: '2013-01-16T11:41:42.877Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.683249720876974,
                altitude: -0.8039272191280817
            },
            getTimes: {
                solarNoon: '2013-01-16T02:52:09.857Z',
                nadir: '2013-01-15T14:52:09.857Z',
                sunrise: '2013-01-15T21:49:34.738Z',
                sunset: '2013-01-16T07:54:44.975Z',
                sunriseEnd: '2013-01-15T21:52:29.061Z',
                sunsetStart: '2013-01-16T07:51:50.652Z',
                dawn: '2013-01-15T21:21:53.208Z',
                dusk: '2013-01-16T08:22:26.505Z',
                nauticalDawn: '2013-01-15T20:50:36.050Z',
                nauticalDusk: '2013-01-16T08:53:43.663Z',
                nightEnd: '2013-01-15T20:20:00.022Z',
                night: '2013-01-16T09:24:19.691Z',
                goldenHourEnd: '2013-01-15T22:27:42.235Z',
                goldenHour: '2013-01-16T07:16:37.479Z'
            },
            getMoonPosition: {
                azimuth: 1.4627778672621226,
                altitude: 0.23537716364612263,
                distance: 387339.8693938915,
                parallacticAngle: 0.9418884351905255
            },
            getMoonIllumination: {
                fraction: 0.2552286099787676,
                phase: 0.16858184926478847,
                angle: -2.024564627069933
            },
            getMoonTimesUTC: {
                rise: '2013-01-16T00:15:17.001Z',
                set: '2013-01-16T12:52:16.810Z'
            },
            getMoonTimesNonUTC: {
                rise: '2013-01-16T00:15:03.773Z',
                set: '2013-01-16T12:52:08.642Z'
            }
        }
    },
    {
        input: {
            date: '2013-05-04T12:13:37.502Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 0.19586375044861365,
                altitude: 0.9908559038250739
            },
            getTimes: {
                solarNoon: '2013-05-04T11:48:37.066Z',
                nadir: '2013-05-03T23:48:37.066Z',
                sunrise: '2013-05-04T04:23:54.371Z',
                sunset: '2013-05-04T19:13:19.761Z',
                sunriseEnd: '2013-05-04T04:27:30.603Z',
                sunsetStart: '2013-05-04T19:09:43.529Z',
                dawn: '2013-05-04T03:47:41.444Z',
                dusk: '2013-05-04T19:49:32.688Z',
                nauticalDawn: '2013-05-04T03:01:20.064Z',
                nauticalDusk: '2013-05-04T20:35:54.068Z',
                nightEnd: '2013-05-04T02:05:41.596Z',
                night: '2013-05-04T21:31:32.536Z',
                goldenHourEnd: '2013-05-04T05:08:46.739Z',
                goldenHour: '2013-05-04T18:28:27.392Z'
            },
            getMoonPosition: {
                azimuth: 1.2445531858496024,
                altitude: 0.19866444827147792,
                distance: 377079.4463549876,
                parallacticAngle: 0.6743881944586131
            },
            getMoonIllumination: {
                fraction: 0.28506783703465033,
                phase: 0.8207193062076144,
                angle: 1.2290109417745052
            },
            getMoonTimesUTC: {
                rise: '2013-05-04T01:42:42.502Z',
                set: '2013-05-04T13:28:47.119Z'
            },
            getMoonTimesNonUTC: {
                rise: '2013-05-04T01:42:42.502Z',
                set: '2013-05-04T13:28:47.119Z'
            }
        }
    },
    {
        input: {
            date: '2013-05-04T12:13:37.502Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 0.11943318568525395,
                altitude: 0.9490844565496319
            },
            getTimes: {
                solarNoon: '2013-05-04T11:57:32.237Z',
                nadir: '2013-05-03T23:57:32.237Z',
                sunrise: '2013-05-04T04:24:19.599Z',
                sunset: '2013-05-04T19:30:44.876Z',
                sunriseEnd: '2013-05-04T04:28:11.528Z',
                sunsetStart: '2013-05-04T19:26:52.947Z',
                dawn: '2013-05-04T03:45:10.915Z',
                dusk: '2013-05-04T20:09:53.560Z',
                nauticalDawn: '2013-05-04T02:53:47.615Z',
                nauticalDusk: '2013-05-04T21:01:16.860Z',
                nightEnd: '2013-05-04T01:47:24.490Z',
                night: '2013-05-04T22:07:39.985Z',
                goldenHourEnd: '2013-05-04T05:12:12.011Z',
                goldenHour: '2013-05-04T18:42:52.464Z'
            },
            getMoonPosition: {
                azimuth: 1.2040555434368567,
                altitude: 0.20635838260589343,
                distance: 377079.4463549876,
                parallacticAngle: 0.6213581182482539
            },
            getMoonIllumination: {
                fraction: 0.28506783703465033,
                phase: 0.8207193062076144,
                angle: 1.2290109417745052
            },
            getMoonTimesUTC: {
                rise: '2013-05-04T01:53:44.172Z',
                set: '2013-05-04T13:36:56.475Z'
            },
            getMoonTimesNonUTC: {
                rise: '2013-05-04T01:53:44.172Z',
                set: '2013-05-04T13:36:56.475Z'
            }
        }
    },
    {
        input: {
            date: '2013-05-04T12:13:37.502Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.6548796587998795,
                altitude: 0.33773342718921034
            },
            getTimes: {
                solarNoon: '2013-05-04T07:02:01.992Z',
                nadir: '2013-05-03T19:02:01.992Z',
                sunrise: '2013-05-03T23:58:18.511Z',
                sunset: '2013-05-04T14:05:45.473Z',
                sunriseEnd: '2013-05-04T00:01:20.689Z',
                sunsetStart: '2013-05-04T14:02:43.295Z',
                dawn: '2013-05-03T23:28:14.432Z',
                dusk: '2013-05-04T14:35:49.552Z',
                nauticalDawn: '2013-05-03T22:51:23.764Z',
                nauticalDusk: '2013-05-04T15:12:40.220Z',
                nightEnd: '2013-05-03T22:11:14.162Z',
                night: '2013-05-04T15:52:49.823Z',
                goldenHourEnd: '2013-05-04T00:36:31.661Z',
                goldenHour: '2013-05-04T13:27:32.323Z'
            },
            getMoonPosition: {
                azimuth: 2.1893075403149367,
                altitude: -0.6599019589088022,
                distance: 377079.4463549876,
                parallacticAngle: 0.667058491746539
            },
            getMoonIllumination: {
                fraction: 0.28506783703465033,
                phase: 0.8207193062076144,
                angle: 1.2290109417745052
            },
            getMoonTimesUTC: {
                rise: '2013-05-04T21:14:38.695Z',
                set: '2013-05-04T08:32:35.389Z'
            },
            getMoonTimesNonUTC: {
                rise: '2013-05-04T21:14:38.695Z',
                set: '2013-05-04T08:32:35.389Z'
            }
        }
    },
    {
        input: {
            date: '2013-05-04T12:13:37.502Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.4414984747839377,
                altitude: -0.4870021973448113
            },
            getTimes: {
                solarNoon: '2013-05-04T02:39:26.860Z',
                nadir: '2013-05-03T14:39:26.860Z',
                sunrise: '2013-05-03T19:46:00.845Z',
                sunset: '2013-05-04T09:32:52.876Z',
                sunriseEnd: '2013-05-03T19:48:48.876Z',
                sunsetStart: '2013-05-04T09:30:04.844Z',
                dawn: '2013-05-03T19:18:25.833Z',
                dusk: '2013-05-04T10:00:27.888Z',
                nauticalDawn: '2013-05-03T18:45:07.580Z',
                nauticalDusk: '2013-05-04T10:33:46.141Z',
                nightEnd: '2013-05-03T18:09:47.062Z',
                night: '2013-05-04T11:09:06.659Z',
                goldenHourEnd: '2013-05-03T20:21:24.978Z',
                goldenHour: '2013-05-04T08:57:28.742Z'
            },
            getMoonPosition: {
                azimuth: -2.401380007636868,
                altitude: -0.8619211415201875,
                distance: 377079.4463549876,
                parallacticAngle: -0.5810179899466436
            },
            getMoonIllumination: {
                fraction: 0.28506783703465033,
                phase: 0.8207193062076144,
                angle: 1.2290109417745052
            },
            getMoonTimesUTC: {
                rise: '2013-05-04T16:45:35.348Z',
                set: '2013-05-04T04:01:18.993Z'
            },
            getMoonTimesNonUTC: {
                rise: '2013-05-04T16:45:35.348Z',
                set: '2013-05-04T04:01:18.993Z'
            }
        }
    },
    {
        input: {
            date: '2014-10-17T01:10:45.327Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.544195065055186,
                altitude: -0.7961701341884252
            },
            getTimes: {
                solarNoon: '2014-10-17T11:37:07.083Z',
                nadir: '2014-10-16T23:37:07.083Z',
                sunrise: '2014-10-17T06:12:37.274Z',
                sunset: '2014-10-17T17:01:36.892Z',
                sunriseEnd: '2014-10-17T06:15:56.817Z',
                sunsetStart: '2014-10-17T16:58:17.350Z',
                dawn: '2014-10-17T05:40:44.282Z',
                dusk: '2014-10-17T17:33:29.885Z',
                nauticalDawn: '2014-10-17T05:04:10.854Z',
                nauticalDusk: '2014-10-17T18:10:03.313Z',
                nightEnd: '2014-10-17T04:27:36.998Z',
                night: '2014-10-17T18:46:37.169Z',
                goldenHourEnd: '2014-10-17T06:56:03.287Z',
                goldenHour: '2014-10-17T16:18:10.880Z'
            },
            getMoonPosition: {
                azimuth: -1.637539099309732,
                altitude: 0.26501749846028594,
                distance: 404547.3685072208,
                parallacticAngle: -0.7425010153472482
            },
            getMoonIllumination: {
                fraction: 0.38641520410644303,
                phase: 0.7864735856687172,
                angle: 1.7975488021080273
            },
            getMoonTimesUTC: {
                set: '2014-10-17T14:04:44.536Z'
            },
            getMoonTimesNonUTC: {
                rise: '2014-10-16T23:30:55.714Z',
                set: '2014-10-17T14:04:44.536Z'
            }
        }
    },
    {
        input: {
            date: '2014-10-17T01:10:45.327Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.6195855312479406,
                altitude: -0.7702065108771571
            },
            getTimes: {
                solarNoon: '2014-10-17T11:46:02.208Z',
                nadir: '2014-10-16T23:46:02.208Z',
                sunrise: '2014-10-17T06:25:23.561Z',
                sunset: '2014-10-17T17:06:40.855Z',
                sunriseEnd: '2014-10-17T06:28:55.118Z',
                sunsetStart: '2014-10-17T17:03:09.298Z',
                dawn: '2014-10-17T05:51:38.839Z',
                dusk: '2014-10-17T17:40:25.576Z',
                nauticalDawn: '2014-10-17T05:13:00.556Z',
                nauticalDusk: '2014-10-17T18:19:03.860Z',
                nightEnd: '2014-10-17T04:34:18.520Z',
                night: '2014-10-17T18:57:45.895Z',
                goldenHourEnd: '2014-10-17T07:11:35.697Z',
                goldenHour: '2014-10-17T16:20:28.719Z'
            },
            getMoonPosition: {
                azimuth: -1.6550154547931348,
                altitude: 0.24373508283689185,
                distance: 404547.3685072208,
                parallacticAngle: -0.692928375009531
            },
            getMoonIllumination: {
                fraction: 0.38641520410644303,
                phase: 0.7864735856687172,
                angle: 1.7975488021080273
            },
            getMoonTimesUTC: {
                set: '2014-10-17T14:19:16.109Z'
            },
            getMoonTimesNonUTC: {
                rise: '2014-10-16T23:33:06.462Z',
                set: '2014-10-17T14:19:16.109Z'
            }
        }
    },
    {
        input: {
            date: '2014-10-17T01:10:45.327Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.3926944194783453,
                altitude: -0.035882059635045815
            },
            getTimes: {
                solarNoon: '2014-10-17T06:50:33.524Z',
                nadir: '2014-10-16T18:50:33.524Z',
                sunrise: '2014-10-17T01:16:06.089Z',
                sunset: '2014-10-17T12:25:00.959Z',
                sunriseEnd: '2014-10-17T01:18:58.193Z',
                sunsetStart: '2014-10-17T12:22:08.855Z',
                dawn: '2014-10-17T00:48:29.980Z',
                dusk: '2014-10-17T12:52:37.068Z',
                nauticalDawn: '2014-10-17T00:16:44.828Z',
                nauticalDusk: '2014-10-17T13:24:22.220Z',
                nightEnd: '2014-10-16T23:45:04.165Z',
                night: '2014-10-17T13:56:02.883Z',
                goldenHourEnd: '2014-10-17T01:53:18.159Z',
                goldenHour: '2014-10-17T11:47:48.889Z'
            },
            getMoonPosition: {
                azimuth: -0.40007217249488763,
                altitude: 1.0722036221254867,
                distance: 404547.3685072208,
                parallacticAngle: -0.30892566070287536
            },
            getMoonIllumination: {
                fraction: 0.38641520410644303,
                phase: 0.7864735856687172,
                angle: 1.7975488021080273
            },
            getMoonTimesUTC: {
                rise: '2014-10-17T19:46:17.511Z',
                set: '2014-10-17T08:56:31.315Z'
            },
            getMoonTimesNonUTC: {
                rise: '2014-10-17T19:46:17.511Z',
                set: '2014-10-17T08:56:31.315Z'
            }
        }
    },
    {
        input: {
            date: '2014-10-17T01:10:45.327Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -0.4507208026516169,
                altitude: 0.7283173429784543
            },
            getTimes: {
                solarNoon: '2014-10-17T02:27:59.783Z',
                nadir: '2014-10-16T14:27:59.783Z',
                sunrise: '2014-10-16T20:48:28.109Z',
                sunset: '2014-10-17T08:07:31.457Z',
                sunriseEnd: '2014-10-16T20:51:08.278Z',
                sunsetStart: '2014-10-17T08:04:51.287Z',
                dawn: '2014-10-16T20:22:44.422Z',
                dusk: '2014-10-17T08:33:15.143Z',
                nauticalDawn: '2014-10-16T19:53:05.906Z',
                nauticalDusk: '2014-10-17T09:02:53.660Z',
                nightEnd: '2014-10-16T19:23:32.920Z',
                night: '2014-10-17T09:32:26.645Z',
                goldenHourEnd: '2014-10-16T21:22:59.606Z',
                goldenHour: '2014-10-17T07:32:59.959Z'
            },
            getMoonPosition: {
                azimuth: 1.402969294670215,
                altitude: 0.639366058589329,
                distance: 404547.3685072208,
                parallacticAngle: 0.9699251316651845
            },
            getMoonIllumination: {
                fraction: 0.38641520410644303,
                phase: 0.7864735856687172,
                angle: 1.7975488021080273
            },
            getMoonTimesUTC: {
                rise: '2014-10-17T15:20:48.171Z',
                set: '2014-10-17T04:18:33.596Z'
            },
            getMoonTimesNonUTC: {
                rise: '2014-10-17T15:20:48.171Z',
                set: '2014-10-17T04:18:33.596Z'
            }
        }
    },
    {
        input: {
            date: '2015-09-08T17:05:22.578Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.4928346329416937,
                altitude: 0.2005711291649939
            },
            getTimes: {
                solarNoon: '2015-09-08T11:49:55.485Z',
                nadir: '2015-09-07T23:49:55.485Z',
                sunrise: '2015-09-08T05:15:54.934Z',
                sunset: '2015-09-08T18:23:56.035Z',
                sunriseEnd: '2015-09-08T05:19:12.276Z',
                sunsetStart: '2015-09-08T18:20:38.693Z',
                dawn: '2015-09-08T04:43:37.637Z',
                dusk: '2015-09-08T18:56:13.332Z',
                nauticalDawn: '2015-09-08T04:04:44.174Z',
                nauticalDusk: '2015-09-08T19:35:06.795Z',
                nightEnd: '2015-09-08T03:23:14.526Z',
                night: '2015-09-08T20:16:36.443Z',
                goldenHourEnd: '2015-09-08T05:57:44.133Z',
                goldenHour: '2015-09-08T17:42:06.836Z'
            },
            getMoonPosition: {
                azimuth: 2.294550185077863,
                altitude: -0.18646386746800742,
                distance: 391140.4320073303,
                parallacticAngle: 0.5397082007408666
            },
            getMoonIllumination: {
                fraction: 0.18576954946301172,
                phase: 0.8581573935317379,
                angle: 1.6752148055473586
            },
            getMoonTimesUTC: {
                rise: '2015-09-08T00:25:22.289Z',
                set: '2015-09-08T15:43:22.726Z'
            },
            getMoonTimesNonUTC: {
                rise: '2015-09-08T00:25:22.289Z',
                set: '2015-09-08T15:43:22.726Z'
            }
        }
    },
    {
        input: {
            date: '2015-09-08T17:05:22.578Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.452565702911069,
                altitude: 0.22085442163233876
            },
            getTimes: {
                solarNoon: '2015-09-08T11:58:50.554Z',
                nadir: '2015-09-07T23:58:50.554Z',
                sunrise: '2015-09-08T05:21:45.943Z',
                sunset: '2015-09-08T18:35:55.165Z',
                sunriseEnd: '2015-09-08T05:25:14.947Z',
                sunsetStart: '2015-09-08T18:32:26.162Z',
                dawn: '2015-09-08T04:47:29.480Z',
                dusk: '2015-09-08T19:10:11.629Z',
                nauticalDawn: '2015-09-08T04:05:54.124Z',
                nauticalDusk: '2015-09-08T19:51:46.985Z',
                nightEnd: '2015-09-08T03:20:50.596Z',
                night: '2015-09-08T20:36:50.513Z',
                goldenHourEnd: '2015-09-08T06:06:00.053Z',
                goldenHour: '2015-09-08T17:51:41.056Z'
            },
            getMoonPosition: {
                azimuth: 2.267884546491996,
                altitude: -0.13740685260101915,
                distance: 391140.4320073303,
                parallacticAngle: 0.5206339827464793
            },
            getMoonIllumination: {
                fraction: 0.18576954946301172,
                phase: 0.8581573935317379,
                angle: 1.6752148055473586
            },
            getMoonTimesUTC: {
                rise: '2015-09-08T00:25:21.066Z',
                set: '2015-09-08T16:01:48.455Z'
            },
            getMoonTimesNonUTC: {
                rise: '2015-09-08T00:25:21.066Z',
                set: '2015-09-08T16:01:48.455Z'
            }
        }
    },
    {
        input: {
            date: '2015-09-08T17:05:22.578Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.492878389443515,
                altitude: -0.6345576698880775
            },
            getTimes: {
                solarNoon: '2015-09-08T07:03:23.667Z',
                nadir: '2015-09-07T19:03:23.667Z',
                sunrise: '2015-09-08T00:36:45.503Z',
                sunset: '2015-09-08T13:30:01.831Z',
                sunriseEnd: '2015-09-08T00:39:36.162Z',
                sunsetStart: '2015-09-08T13:27:11.171Z',
                dawn: '2015-09-08T00:08:57.978Z',
                dusk: '2015-09-08T13:57:49.355Z',
                nauticalDawn: '2015-09-07T23:35:58.808Z',
                nauticalDusk: '2015-09-08T14:30:48.526Z',
                nightEnd: '2015-09-07T23:01:46.553Z',
                night: '2015-09-08T15:05:00.780Z',
                goldenHourEnd: '2015-09-08T01:13:01.204Z',
                goldenHour: '2015-09-08T12:53:46.130Z'
            },
            getMoonPosition: {
                azimuth: -2.7229341454984266,
                altitude: -0.5063517966385274,
                distance: 391140.4320073303,
                parallacticAngle: -0.3269591362881658
            },
            getMoonIllumination: {
                fraction: 0.18576954946301172,
                phase: 0.8581573935317379,
                angle: 1.6752148055473586
            },
            getMoonTimesUTC: {
                rise: '2015-09-08T20:47:42.542Z',
                set: '2015-09-08T10:26:49.924Z'
            },
            getMoonTimesNonUTC: {
                rise: '2015-09-08T20:47:42.542Z',
                set: '2015-09-08T10:26:49.924Z'
            }
        }
    },
    {
        input: {
            date: '2015-09-08T17:05:22.578Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.319410300657808,
                altitude: -0.6343262877426123
            },
            getTimes: {
                solarNoon: '2015-09-09T02:40:30.430Z',
                nadir: '2015-09-08T14:40:30.430Z',
                sunrise: '2015-09-08T20:18:34.772Z',
                sunset: '2015-09-09T09:02:26.088Z',
                sunriseEnd: '2015-09-08T20:21:13.604Z',
                sunsetStart: '2015-09-09T08:59:47.256Z',
                dawn: '2015-09-08T19:52:46.217Z',
                dusk: '2015-09-09T09:28:14.643Z',
                nauticalDawn: '2015-09-08T19:22:19.917Z',
                nauticalDusk: '2015-09-09T09:58:40.943Z',
                nightEnd: '2015-09-08T18:51:07.295Z',
                night: '2015-09-09T10:29:53.564Z',
                goldenHourEnd: '2015-09-08T20:52:22.588Z',
                goldenHour: '2015-09-09T08:28:38.272Z'
            },
            getMoonPosition: {
                azimuth: -1.8310943099642063,
                altitude: 0.12980765826236768,
                distance: 391140.4320073303,
                parallacticAngle: -0.9581791112892096
            },
            getMoonIllumination: {
                fraction: 0.18576954946301172,
                phase: 0.8581573935317379,
                angle: 1.6752148055473586
            },
            getMoonTimesUTC: {
                rise: '2015-09-08T16:25:02.369Z',
                set: '2015-09-08T05:45:34.371Z'
            },
            getMoonTimesNonUTC: {
                rise: '2015-09-08T16:25:02.369Z',
                set: '2015-09-08T05:45:34.371Z'
            }
        }
    },
    {
        input: {
            date: '2016-08-17T07:49:21.142Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.3432892834370296,
                altitude: 0.4998565087509478
            },
            getTimes: {
                solarNoon: '2016-08-17T11:56:03.177Z',
                nadir: '2016-08-16T23:56:03.177Z',
                sunrise: '2016-08-17T04:45:41.139Z',
                sunset: '2016-08-17T19:06:25.215Z',
                sunriseEnd: '2016-08-17T04:49:10.155Z',
                sunsetStart: '2016-08-17T19:02:56.198Z',
                dawn: '2016-08-17T04:10:56.938Z',
                dusk: '2016-08-17T19:41:09.416Z',
                nauticalDawn: '2016-08-17T03:27:26.116Z',
                nauticalDusk: '2016-08-17T20:24:40.238Z',
                nightEnd: '2016-08-17T02:37:38.352Z',
                night: '2016-08-17T21:14:28.001Z',
                goldenHourEnd: '2016-08-17T05:29:20.712Z',
                goldenHour: '2016-08-17T18:22:45.642Z'
            },
            getMoonPosition: {
                azimuth: 2.0055802546573727,
                altitude: -0.6832776108158899,
                distance: 382673.8656408935,
                parallacticAngle: 0.6678054984681171
            },
            getMoonIllumination: {
                fraction: 0.9836730936092213,
                phase: 0.45921588913309574,
                angle: -1.6830810180804332
            },
            getMoonTimesUTC: {
                rise: '2016-08-17T18:23:41.955Z',
                set: '2016-08-17T03:31:19.111Z'
            },
            getMoonTimesNonUTC: {
                rise: '2016-08-17T18:23:41.955Z',
                set: '2016-08-17T03:31:19.111Z'
            }
        }
    },
    {
        input: {
            date: '2016-08-17T07:49:21.142Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.352444785185219,
                altitude: 0.46531517016354973
            },
            getTimes: {
                solarNoon: '2016-08-17T12:04:58.300Z',
                nadir: '2016-08-17T00:04:58.300Z',
                sunrise: '2016-08-17T04:47:44.142Z',
                sunset: '2016-08-17T19:22:12.457Z',
                sunriseEnd: '2016-08-17T04:51:27.208Z',
                sunsetStart: '2016-08-17T19:18:29.392Z',
                dawn: '2016-08-17T04:10:27.326Z',
                dusk: '2016-08-17T19:59:29.273Z',
                nauticalDawn: '2016-08-17T03:22:55.430Z',
                nauticalDusk: '2016-08-17T20:47:01.170Z',
                nightEnd: '2016-08-17T02:26:08.579Z',
                night: '2016-08-17T21:43:48.021Z',
                goldenHourEnd: '2016-08-17T05:34:08.847Z',
                goldenHour: '2016-08-17T18:35:47.753Z'
            },
            getMoonPosition: {
                azimuth: 2.0007130073001584,
                altitude: -0.6412603011194475,
                distance: 382673.8656408935,
                parallacticAngle: 0.6275413295577489
            },
            getMoonIllumination: {
                fraction: 0.9836730936092213,
                phase: 0.45921588913309574,
                angle: -1.6830810180804332
            },
            getMoonTimesUTC: {
                rise: '2016-08-17T18:39:55.286Z',
                set: '2016-08-17T03:32:36.499Z'
            },
            getMoonTimesNonUTC: {
                rise: '2016-08-17T18:39:55.286Z',
                set: '2016-08-17T03:32:36.499Z'
            }
        }
    },
    {
        input: {
            date: '2016-08-17T07:49:21.142Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 0.36451875888087937,
                altitude: 1.0684394972840483
            },
            getTimes: {
                solarNoon: '2016-08-17T07:09:29.637Z',
                nadir: '2016-08-16T19:09:29.637Z',
                sunrise: '2016-08-17T00:15:49.926Z',
                sunset: '2016-08-17T14:03:09.348Z',
                sunriseEnd: '2016-08-17T00:18:47.937Z',
                sunsetStart: '2016-08-17T14:00:11.338Z',
                dawn: '2016-08-16T23:46:34.263Z',
                dusk: '2016-08-17T14:32:25.011Z',
                nauticalDawn: '2016-08-16T23:11:04.552Z',
                nauticalDusk: '2016-08-17T15:07:54.722Z',
                nightEnd: '2016-08-16T22:33:02.225Z',
                night: '2016-08-17T15:45:57.050Z',
                goldenHourEnd: '2016-08-17T00:53:18.909Z',
                goldenHour: '2016-08-17T13:25:40.365Z'
            },
            getMoonPosition: {
                azimuth: -2.29980021126044,
                altitude: -0.9797782875625247,
                distance: 382673.8656408935,
                parallacticAngle: -0.6268936798307276
            },
            getMoonIllumination: {
                fraction: 0.9836730936092213,
                phase: 0.45921588913309574,
                angle: -1.6830810180804332
            },
            getMoonTimesUTC: {
                rise: '2016-08-17T13:11:03.556Z',
                set: '2016-08-17T23:56:18.027Z'
            },
            getMoonTimesNonUTC: {
                rise: '2016-08-17T13:11:03.556Z',
                set: '2016-08-16T22:53:04.215Z'
            }
        }
    },
    {
        input: {
            date: '2016-08-17T07:49:21.142Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.6219432871697483,
                altitude: 0.334464967716424
            },
            getTimes: {
                solarNoon: '2016-08-17T02:46:55.873Z',
                nadir: '2016-08-16T14:46:55.873Z',
                sunrise: '2016-08-16T20:01:27.972Z',
                sunset: '2016-08-17T09:32:23.773Z',
                sunriseEnd: '2016-08-16T20:04:12.864Z',
                sunsetStart: '2016-08-17T09:29:38.881Z',
                dawn: '2016-08-16T19:34:28.479Z',
                dusk: '2016-08-17T09:59:23.266Z',
                nauticalDawn: '2016-08-16T19:02:06.353Z',
                nauticalDusk: '2016-08-17T10:31:45.393Z',
                nightEnd: '2016-08-16T18:28:06.949Z',
                night: '2016-08-17T11:05:44.796Z',
                goldenHourEnd: '2016-08-16T20:36:17.951Z',
                goldenHour: '2016-08-17T08:57:33.795Z'
            },
            getMoonPosition: {
                azimuth: -1.341300316645002,
                altitude: -0.13604152303824624,
                distance: 382673.8656408935,
                parallacticAngle: -0.9629030695648483
            },
            getMoonIllumination: {
                fraction: 0.9836730936092213,
                phase: 0.45921588913309574,
                angle: -1.6830810180804332
            },
            getMoonTimesUTC: {
                rise: '2016-08-17T08:32:10.852Z',
                set: '2016-08-17T19:29:45.979Z'
            },
            getMoonTimesNonUTC: {
                rise: '2016-08-17T08:32:10.852Z',
                set: '2016-08-17T19:29:45.979Z'
            }
        }
    },
    {
        input: {
            date: '2018-03-08T23:58:06.442Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 3.117518580014419,
                altitude: -0.8004781486139073
            },
            getTimes: {
                solarNoon: '2018-03-09T12:02:36.842Z',
                nadir: '2018-03-09T00:02:36.842Z',
                sunrise: '2018-03-09T06:16:12.123Z',
                sunset: '2018-03-09T17:49:01.562Z',
                sunriseEnd: '2018-03-09T06:19:27.536Z',
                sunsetStart: '2018-03-09T17:45:46.149Z',
                dawn: '2018-03-09T05:44:44.846Z',
                dusk: '2018-03-09T18:20:28.838Z',
                nauticalDawn: '2018-03-09T05:08:10.231Z',
                nauticalDusk: '2018-03-09T18:57:03.453Z',
                nightEnd: '2018-03-09T04:30:59.657Z',
                night: '2018-03-09T19:34:14.028Z',
                goldenHourEnd: '2018-03-09T06:58:21.087Z',
                goldenHour: '2018-03-09T17:06:52.597Z'
            },
            getMoonPosition: {
                azimuth: -1.2869796862491307,
                altitude: -0.15609223816845913,
                distance: 402351.76328887395,
                parallacticAngle: -0.7252700132288806
            },
            getMoonIllumination: {
                fraction: 0.5466465165219587,
                phase: 0.7351303292843575,
                angle: 1.687007463885607
            },
            getMoonTimesUTC: {
                set: '2018-03-08T09:50:01.429Z'
            },
            getMoonTimesNonUTC: {
                rise: '2018-03-09T00:59:59.222Z',
                set: '2018-03-09T10:24:50.964Z'
            }
        }
    },
    {
        input: {
            date: '2018-03-08T23:58:06.442Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 3.065419238434147,
                altitude: -0.7530386687935443
            },
            getTimes: {
                solarNoon: '2018-03-08T12:11:47.443Z',
                nadir: '2018-03-08T00:11:47.443Z',
                sunrise: '2018-03-08T06:28:59.141Z',
                sunset: '2018-03-08T17:54:35.745Z',
                sunriseEnd: '2018-03-08T06:32:26.069Z',
                sunsetStart: '2018-03-08T17:51:08.817Z',
                dawn: '2018-03-08T05:55:42.964Z',
                dusk: '2018-03-08T18:27:51.922Z',
                nauticalDawn: '2018-03-08T05:17:02.733Z',
                nauticalDusk: '2018-03-08T19:06:32.153Z',
                nightEnd: '2018-03-08T04:37:38.387Z',
                night: '2018-03-08T19:45:56.499Z',
                goldenHourEnd: '2018-03-08T07:13:43.741Z',
                goldenHour: '2018-03-08T17:09:51.145Z'
            },
            getMoonPosition: {
                azimuth: -1.3239167162164436,
                altitude: -0.19227951679039856,
                distance: 402351.76328887395,
                parallacticAngle: -0.6865399329280367
            },
            getMoonIllumination: {
                fraction: 0.5466465165219587,
                phase: 0.7351303292843575,
                angle: 1.687007463885607
            },
            getMoonTimesUTC: {
                rise: '2018-03-08T00:17:36.969Z',
                set: '2018-03-08T09:50:58.490Z'
            },
            getMoonTimesNonUTC: {
                rise: '2018-03-09T01:19:18.139Z',
                set: '2018-03-09T10:24:26.101Z'
            }
        }
    },
    {
        input: {
            date: '2018-03-08T23:58:06.442Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.7316358281792807,
                altitude: -0.30841204453899135
            },
            getTimes: {
                solarNoon: '2018-03-09T07:16:03.958Z',
                nadir: '2018-03-08T19:16:03.958Z',
                sunrise: '2018-03-09T01:25:42.829Z',
                sunset: '2018-03-09T13:06:25.087Z',
                sunriseEnd: '2018-03-09T01:28:32.308Z',
                sunsetStart: '2018-03-09T13:03:35.609Z',
                dawn: '2018-03-09T00:58:24.458Z',
                dusk: '2018-03-09T13:33:43.459Z',
                nauticalDawn: '2018-03-09T00:26:42.996Z',
                nauticalDusk: '2018-03-09T14:05:24.920Z',
                nightEnd: '2018-03-08T23:54:47.189Z',
                night: '2018-03-09T14:37:20.728Z',
                goldenHourEnd: '2018-03-09T02:02:08.742Z',
                goldenHour: '2018-03-09T12:29:59.175Z'
            },
            getMoonPosition: {
                azimuth: -0.23765013536160484,
                altitude: 0.5313618412615801,
                distance: 402351.76328887395,
                parallacticAngle: -0.18850250307454913
            },
            getMoonIllumination: {
                fraction: 0.5466465165219587,
                phase: 0.7351303292843575,
                angle: 1.687007463885607
            },
            getMoonTimesUTC: {
                rise: '2018-03-08T19:40:41.697Z',
                set: '2018-03-08T05:15:53.408Z'
            },
            getMoonTimesNonUTC: {
                rise: '2018-03-09T20:35:11.443Z',
                set: '2018-03-09T05:54:40.423Z'
            }
        }
    },
    {
        input: {
            date: '2018-03-08T23:58:06.442Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -0.9546178504005749,
                altitude: 0.5676971678026957
            },
            getTimes: {
                solarNoon: '2018-03-09T02:53:30.800Z',
                nadir: '2018-03-08T14:53:30.800Z',
                sunrise: '2018-03-08T21:01:08.929Z',
                sunset: '2018-03-09T08:45:52.670Z',
                sunriseEnd: '2018-03-08T21:03:47.018Z',
                sunsetStart: '2018-03-09T08:43:14.581Z',
                dawn: '2018-03-08T20:35:40.021Z',
                dusk: '2018-03-09T09:11:21.578Z',
                nauticalDawn: '2018-03-08T20:06:06.809Z',
                nauticalDusk: '2018-03-09T09:40:54.791Z',
                nightEnd: '2018-03-08T19:36:26.070Z',
                night: '2018-03-09T10:10:35.529Z',
                goldenHourEnd: '2018-03-08T21:35:05.141Z',
                goldenHour: '2018-03-09T08:11:56.459Z'
            },
            getMoonPosition: {
                azimuth: 0.9219085208803042,
                altitude: 0.2889288936244413,
                distance: 402351.76328887395,
                parallacticAngle: 0.7473345017943245
            },
            getMoonIllumination: {
                fraction: 0.5466465165219587,
                phase: 0.7351303292843575,
                angle: 1.687007463885607
            },
            getMoonTimesUTC: {
                rise: '2018-03-08T14:56:31.299Z',
                set: '2018-03-08T00:56:57.319Z'
            },
            getMoonTimesNonUTC: {
                rise: '2018-03-09T15:50:41.915Z',
                set: '2018-03-09T01:35:27.988Z'
            }
        }
    },
    {
        input: {
            date: '2018-07-08T18:50:49.418Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.0040661111120484,
                altitude: 0.14460440947251124
            },
            getTimes: {
                solarNoon: '2018-07-08T11:56:44.126Z',
                nadir: '2018-07-07T23:56:44.126Z',
                sunrise: '2018-07-08T03:54:45.463Z',
                sunset: '2018-07-08T19:58:42.790Z',
                sunriseEnd: '2018-07-08T03:58:48.343Z',
                sunsetStart: '2018-07-08T19:54:39.909Z',
                dawn: '2018-07-08T03:12:56.021Z',
                dusk: '2018-07-08T20:40:32.231Z',
                nauticalDawn: '2018-07-08T02:14:16.200Z',
                nauticalDusk: '2018-07-08T21:39:12.053Z',
                nightEnd: '2018-07-08T00:27:00.287Z',
                night: '2018-07-08T23:26:27.966Z',
                goldenHourEnd: '2018-07-08T04:44:07.112Z',
                goldenHour: '2018-07-08T19:09:21.140Z'
            },
            getMoonPosition: {
                azimuth: 2.8330759824801293,
                altitude: -0.4612725508108708,
                distance: 375433.0301240536,
                parallacticAngle: 0.20620179057714932
            },
            getMoonIllumination: {
                fraction: 0.23544194060945994,
                phase: 0.8387382054683239,
                angle: 1.2432922065600598
            },
            getMoonTimesUTC: {
                rise: '2018-07-08T00:33:18.421Z',
                set: '2018-07-08T14:44:19.827Z'
            },
            getMoonTimesNonUTC: {
                rise: '2018-07-08T00:33:18.421Z',
                set: '2018-07-08T14:44:19.827Z'
            }
        }
    },
    {
        input: {
            date: '2018-07-08T18:50:49.418Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.9687838603216985,
                altitude: 0.18608538030904243
            },
            getTimes: {
                solarNoon: '2018-07-08T12:05:39.382Z',
                nadir: '2018-07-08T00:05:39.382Z',
                sunrise: '2018-07-08T03:50:30.916Z',
                sunset: '2018-07-08T20:20:47.848Z',
                sunriseEnd: '2018-07-08T03:54:56.758Z',
                sunsetStart: '2018-07-08T20:16:22.005Z',
                dawn: '2018-07-08T03:03:54.606Z',
                dusk: '2018-07-08T21:07:24.157Z',
                nauticalDawn: '2018-07-08T01:53:08.193Z',
                nauticalDusk: '2018-07-08T22:18:10.570Z',
                nightEnd: null,
                night: null,
                goldenHourEnd: '2018-07-08T04:43:56.687Z',
                goldenHour: '2018-07-08T19:27:22.077Z'
            },
            getMoonPosition: {
                azimuth: 2.7989768880755936,
                altitude: -0.4094845399696688,
                distance: 375433.0301240536,
                parallacticAngle: 0.2159753743224534
            },
            getMoonIllumination: {
                fraction: 0.23544194060945994,
                phase: 0.8387382054683239,
                angle: 1.2432922065600598
            },
            getMoonTimesUTC: {
                rise: '2018-07-08T00:37:50.703Z',
                set: '2018-07-08T15:00:18.632Z'
            },
            getMoonTimesNonUTC: {
                rise: '2018-07-08T00:37:50.703Z',
                set: '2018-07-08T15:00:18.632Z'
            }
        }
    },
    {
        input: {
            date: '2018-07-08T18:50:49.418Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 3.0566287521760884,
                altitude: -0.4657853570557065
            },
            getTimes: {
                solarNoon: '2018-07-08T07:10:06.334Z',
                nadir: '2018-07-07T19:10:06.334Z',
                sunrise: '2018-07-07T23:39:18.415Z',
                sunset: '2018-07-08T14:40:54.253Z',
                sunriseEnd: '2018-07-07T23:42:35.809Z',
                sunsetStart: '2018-07-08T14:37:36.859Z',
                dawn: '2018-07-07T23:06:17.259Z',
                dusk: '2018-07-08T15:13:55.409Z',
                nauticalDawn: '2018-07-07T22:24:20.599Z',
                nauticalDusk: '2018-07-08T15:55:52.070Z',
                nightEnd: '2018-07-07T21:35:17.053Z',
                night: '2018-07-08T16:44:55.615Z',
                goldenHourEnd: '2018-07-08T00:20:14.891Z',
                goldenHour: '2018-07-08T13:59:57.778Z'
            },
            getMoonPosition: {
                azimuth: -2.1493752624988773,
                altitude: -0.2714060475873913,
                distance: 375433.0301240536,
                parallacticAngle: -0.7080056426243737
            },
            getMoonIllumination: {
                fraction: 0.23544194060945994,
                phase: 0.8387382054683239,
                angle: 1.2432922065600598
            },
            getMoonTimesUTC: {
                rise: '2018-07-08T20:25:32.420Z',
                set: '2018-07-08T09:28:43.251Z'
            },
            getMoonTimesNonUTC: {
                rise: '2018-07-08T20:25:32.420Z',
                set: '2018-07-08T09:28:43.251Z'
            }
        }
    },
    {
        input: {
            date: '2018-07-08T18:50:49.418Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.186862211659259,
                altitude: -0.1424357667381527
            },
            getTimes: {
                solarNoon: '2018-07-09T02:47:37.609Z',
                nadir: '2018-07-08T14:47:37.609Z',
                sunrise: '2018-07-08T19:32:08.629Z',
                sunset: '2018-07-09T10:03:06.589Z',
                sunriseEnd: '2018-07-08T19:35:08.213Z',
                sunsetStart: '2018-07-09T10:00:07.005Z',
                dawn: '2018-07-08T19:02:23.433Z',
                dusk: '2018-07-09T10:32:51.786Z',
                nauticalDawn: '2018-07-08T18:25:37.054Z',
                nauticalDusk: '2018-07-09T11:09:38.164Z',
                nightEnd: '2018-07-08T17:45:00.501Z',
                night: '2018-07-09T11:50:14.718Z',
                goldenHourEnd: '2018-07-08T20:09:40.301Z',
                goldenHour: '2018-07-09T09:25:34.917Z'
            },
            getMoonPosition: {
                azimuth: -1.4310428067055683,
                altitude: 0.5683526648546711,
                distance: 375433.0301240536,
                parallacticAngle: -0.9690304614885743
            },
            getMoonIllumination: {
                fraction: 0.23544194060945994,
                phase: 0.8387382054683239,
                angle: 1.2432922065600598
            },
            getMoonTimesUTC: {
                rise: '2018-07-08T16:03:05.566Z',
                set: '2018-07-08T04:48:13.847Z'
            },
            getMoonTimesNonUTC: {
                rise: '2018-07-08T16:03:05.566Z',
                set: '2018-07-08T04:48:13.847Z'
            }
        }
    },
    {
        input: {
            date: '2018-12-18T18:37:12.014Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.4450287585329196,
                altitude: -0.4425116135097825
            },
            getTimes: {
                solarNoon: '2018-12-18T11:48:26.736Z',
                nadir: '2018-12-17T23:48:26.736Z',
                sunrise: '2018-12-18T07:38:11.296Z',
                sunset: '2018-12-18T15:58:42.175Z',
                sunriseEnd: '2018-12-18T07:42:10.996Z',
                sunsetStart: '2018-12-18T15:54:42.476Z',
                dawn: '2018-12-18T07:01:07.194Z',
                dusk: '2018-12-18T16:35:46.277Z',
                nauticalDawn: '2018-12-18T06:20:49.490Z',
                nauticalDusk: '2018-12-18T17:16:03.982Z',
                nightEnd: '2018-12-18T05:42:24.874Z',
                night: '2018-12-18T17:54:28.597Z',
                goldenHourEnd: '2018-12-18T08:33:01.012Z',
                goldenHour: '2018-12-18T15:03:52.459Z'
            },
            getMoonPosition: {
                azimuth: -0.6554278932348365,
                altitude: 0.7703711372282371,
                distance: 386201.35968053195,
                parallacticAngle: -0.4176815036945465
            },
            getMoonIllumination: {
                fraction: 0.8137191630825962,
                phase: 0.3579482742894836,
                angle: -1.9750617312307395
            },
            getMoonTimesUTC: {
                rise: '2018-12-18T13:36:12.324Z',
                set: '2018-12-18T02:18:09.336Z'
            },
            getMoonTimesNonUTC: {
                rise: '2018-12-18T13:36:15.784Z',
                set: '2018-12-18T02:18:12.223Z'
            }
        }
    },
    {
        input: {
            date: '2018-12-18T18:37:12.014Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.4378258379396989,
                altitude: -0.42375282919654533
            },
            getTimes: {
                solarNoon: '2018-12-18T11:57:22.113Z',
                nadir: '2018-12-17T23:57:22.113Z',
                sunrise: '2018-12-18T07:59:23.412Z',
                sunset: '2018-12-18T15:55:20.813Z',
                sunriseEnd: '2018-12-18T08:03:44.702Z',
                sunsetStart: '2018-12-18T15:50:59.523Z',
                dawn: '2018-12-18T07:19:21.758Z',
                dusk: '2018-12-18T16:35:22.467Z',
                nauticalDawn: '2018-12-18T06:36:23.152Z',
                nauticalDusk: '2018-12-18T17:18:21.074Z',
                nightEnd: '2018-12-18T05:55:42.618Z',
                night: '2018-12-18T17:59:01.607Z',
                goldenHourEnd: '2018-12-18T09:00:17.276Z',
                goldenHour: '2018-12-18T14:54:26.950Z'
            },
            getMoonPosition: {
                azimuth: -0.677055248044616,
                altitude: 0.7186426108259167,
                distance: 386201.35968053195,
                parallacticAngle: -0.4054715090632409
            },
            getMoonIllumination: {
                fraction: 0.8137191630825962,
                phase: 0.3579482742894836,
                angle: -1.9750617312307395
            },
            getMoonTimesUTC: {
                rise: '2018-12-18T13:41:37.172Z',
                set: '2018-12-18T02:30:24.405Z'
            },
            getMoonTimesNonUTC: {
                rise: '2018-12-18T13:41:34.459Z',
                set: '2018-12-18T02:30:18.116Z'
            }
        }
    },
    {
        input: {
            date: '2018-12-18T18:37:12.014Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.8269380999727347,
                altitude: -1.2560297459044516
            },
            getTimes: {
                solarNoon: '2018-12-18T07:01:45.055Z',
                nadir: '2018-12-17T19:01:45.055Z',
                sunrise: '2018-12-18T02:21:50.494Z',
                sunset: '2018-12-18T11:41:39.616Z',
                sunriseEnd: '2018-12-18T02:25:06.661Z',
                sunsetStart: '2018-12-18T11:38:23.449Z',
                dawn: '2018-12-18T01:50:58.106Z',
                dusk: '2018-12-18T12:12:32.004Z',
                nauticalDawn: '2018-12-18T01:16:34.894Z',
                nauticalDusk: '2018-12-18T12:46:55.216Z',
                nightEnd: '2018-12-18T00:43:18.189Z',
                night: '2018-12-18T13:20:11.921Z',
                goldenHourEnd: '2018-12-18T03:05:21.352Z',
                goldenHour: '2018-12-18T10:58:08.758Z'
            },
            getMoonPosition: {
                azimuth: 1.1214319379541298,
                altitude: 0.6742733622761007,
                distance: 386201.35968053195,
                parallacticAngle: 0.7622503017089526
            },
            getMoonIllumination: {
                fraction: 0.8137191630825962,
                phase: 0.3579482742894836,
                angle: -1.9750617312307395
            },
            getMoonTimesUTC: {
                rise: '2018-12-18T08:52:39.142Z',
                set: '2018-12-18T22:15:57.346Z'
            },
            getMoonTimesNonUTC: {
                rise: '2018-12-18T08:52:45.269Z',
                set: '2018-12-18T22:15:58.915Z'
            }
        }
    },
    {
        input: {
            date: '2018-12-18T18:37:12.014Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.505010956760775,
                altitude: -0.6537578957589049
            },
            getTimes: {
                solarNoon: '2018-12-19T02:39:32.427Z',
                nadir: '2018-12-18T14:39:32.427Z',
                sunrise: '2018-12-18T21:45:18.327Z',
                sunset: '2018-12-19T07:33:46.528Z',
                sunriseEnd: '2018-12-18T21:48:17.542Z',
                sunsetStart: '2018-12-19T07:30:47.313Z',
                dawn: '2018-12-18T21:16:55.202Z',
                dusk: '2018-12-19T08:02:09.653Z',
                nauticalDawn: '2018-12-18T20:45:00.395Z',
                nauticalDusk: '2018-12-19T08:34:04.460Z',
                nightEnd: '2018-12-18T20:13:55.464Z',
                night: '2018-12-19T09:05:09.391Z',
                goldenHourEnd: '2018-12-18T22:24:39.839Z',
                goldenHour: '2018-12-19T06:54:25.016Z'
            },
            getMoonPosition: {
                azimuth: 1.9128495515733175,
                altitude: -0.19393474771134345,
                distance: 386201.35968053195,
                parallacticAngle: 0.8852145201472283
            },
            getMoonIllumination: {
                fraction: 0.8137191630825962,
                phase: 0.3579482742894836,
                angle: -1.9750617312307395
            },
            getMoonTimesUTC: {
                rise: '2018-12-18T04:28:46.562Z',
                set: '2018-12-18T17:36:30.654Z'
            },
            getMoonTimesNonUTC: {
                rise: '2018-12-18T04:28:33.283Z',
                set: '2018-12-18T17:36:44.209Z'
            }
        }
    },
    {
        input: {
            date: '2019-01-24T22:00:41.982Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.258790476572603,
                altitude: -0.8981153600714611
            },
            getTimes: {
                solarNoon: '2019-01-24T12:03:44.060Z',
                nadir: '2019-01-24T00:03:44.060Z',
                sunrise: '2019-01-24T07:29:55.505Z',
                sunset: '2019-01-24T16:37:32.616Z',
                sunriseEnd: '2019-01-24T07:33:37.624Z',
                sunsetStart: '2019-01-24T16:33:50.497Z',
                dawn: '2019-01-24T06:55:08.679Z',
                dusk: '2019-01-24T17:12:19.442Z',
                nauticalDawn: '2019-01-24T06:16:36.661Z',
                nauticalDusk: '2019-01-24T17:50:51.460Z',
                nightEnd: '2019-01-24T05:39:18.726Z',
                night: '2019-01-24T18:28:09.394Z',
                goldenHourEnd: '2019-01-24T08:19:41.271Z',
                goldenHour: '2019-01-24T15:47:46.850Z'
            },
            getMoonPosition: {
                azimuth: -1.5161296256911436,
                altitude: 0.18999879445728843,
                distance: 367264.70031044673,
                parallacticAngle: -0.7218290179131995
            },
            getMoonIllumination: {
                fraction: 0.8206912239316811,
                phase: 0.6391806039882664,
                angle: 1.9192348118594202
            },
            getMoonTimesUTC: {
                rise: '2019-01-24T20:49:41.041Z',
                set: '2019-01-24T09:38:13.147Z'
            },
            getMoonTimesNonUTC: {
                rise: '2019-01-24T20:49:50.068Z',
                set: '2019-01-24T09:38:25.011Z'
            }
        }
    },
    {
        input: {
            date: '2019-01-24T22:00:41.982Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.25283500048681,
                altitude: -0.8495481317958247
            },
            getTimes: {
                solarNoon: '2019-01-24T12:12:39.356Z',
                nadir: '2019-01-24T00:12:39.356Z',
                sunrise: '2019-01-24T07:48:10.863Z',
                sunset: '2019-01-24T16:37:07.849Z',
                sunriseEnd: '2019-01-24T07:52:09.851Z',
                sunsetStart: '2019-01-24T16:33:08.861Z',
                dawn: '2019-01-24T07:10:58.797Z',
                dusk: '2019-01-24T17:14:19.914Z',
                nauticalDawn: '2019-01-24T06:30:05.092Z',
                nauticalDusk: '2019-01-24T17:55:13.620Z',
                nightEnd: '2019-01-24T05:50:39.819Z',
                night: '2019-01-24T18:34:38.892Z',
                goldenHourEnd: '2019-01-24T08:42:18.036Z',
                goldenHour: '2019-01-24T15:43:00.676Z'
            },
            getMoonPosition: {
                azimuth: -1.5380495804727106,
                altitude: 0.16329133023115203,
                distance: 367264.70031044673,
                parallacticAngle: -0.6760197156767472
            },
            getMoonIllumination: {
                fraction: 0.8206912239316811,
                phase: 0.6391806039882664,
                angle: 1.9192348118594202
            },
            getMoonTimesUTC: {
                rise: '2019-01-24T20:55:23.723Z',
                set: '2019-01-24T09:51:59.229Z'
            },
            getMoonTimesNonUTC: {
                rise: '2019-01-24T20:55:32.934Z',
                set: '2019-01-24T09:52:07.331Z'
            }
        }
    },
    {
        input: {
            date: '2019-01-24T22:00:41.982Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.9058080619722217,
                altitude: -0.8549863109813907
            },
            getTimes: {
                solarNoon: '2019-01-25T07:17:20.160Z',
                nadir: '2019-01-24T19:17:20.160Z',
                sunrise: '2019-01-25T02:19:46.714Z',
                sunset: '2019-01-25T12:14:53.607Z',
                sunriseEnd: '2019-01-25T02:22:52.463Z',
                sunsetStart: '2019-01-25T12:11:47.857Z',
                dawn: '2019-01-25T01:50:20.516Z',
                dusk: '2019-01-25T12:44:19.804Z',
                nauticalDawn: '2019-01-25T01:17:11.006Z',
                nauticalDusk: '2019-01-25T13:17:29.314Z',
                nightEnd: '2019-01-25T00:44:46.742Z',
                night: '2019-01-25T13:49:53.579Z',
                goldenHourEnd: '2019-01-25T03:00:34.124Z',
                goldenHour: '2019-01-25T11:34:06.197Z'
            },
            getMoonPosition: {
                azimuth: -0.26703631602651134,
                altitude: 0.9507980234552895,
                distance: 367264.70031044673,
                parallacticAngle: -0.2025327885016257
            },
            getMoonIllumination: {
                fraction: 0.8206912239316811,
                phase: 0.6391806039882664,
                angle: 1.9192348118594202
            },
            getMoonTimesUTC: {
                rise: '2019-01-24T15:56:20.535Z',
                set: '2019-01-24T04:34:18.708Z'
            },
            getMoonTimesNonUTC: {
                rise: '2019-01-24T15:56:14.447Z',
                set: '2019-01-24T04:34:06.031Z'
            }
        }
    },
    {
        input: {
            date: '2019-01-24T22:00:41.982Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.13182250622434,
                altitude: 0.02835764204850143
            },
            getTimes: {
                solarNoon: '2019-01-25T02:54:41.448Z',
                nadir: '2019-01-24T14:54:41.448Z',
                sunrise: '2019-01-24T21:46:03.439Z',
                sunset: '2019-01-25T08:03:19.457Z',
                sunriseEnd: '2019-01-24T21:48:54.611Z',
                sunsetStart: '2019-01-25T08:00:28.284Z',
                dawn: '2019-01-24T21:18:48.652Z',
                dusk: '2019-01-25T08:30:34.243Z',
                nauticalDawn: '2019-01-24T20:47:55.444Z',
                nauticalDusk: '2019-01-25T09:01:27.451Z',
                nightEnd: '2019-01-24T20:17:37.311Z',
                night: '2019-01-25T09:31:45.585Z',
                goldenHourEnd: '2019-01-24T22:23:23.387Z',
                goldenHour: '2019-01-25T07:25:59.508Z'
            },
            getMoonPosition: {
                azimuth: 1.2991121615863683,
                altitude: 0.5290694095873698,
                distance: 367264.70031044673,
                parallacticAngle: 0.9059449634548633
            },
            getMoonIllumination: {
                fraction: 0.8206912239316811,
                phase: 0.6391806039882664,
                angle: 1.9192348118594202
            },
            getMoonTimesUTC: {
                rise: '2019-01-24T11:26:12.109Z'
            },
            getMoonTimesNonUTC: {
                rise: '2019-01-24T11:26:25.118Z',
                set: '2019-01-23T23:59:28.652Z'
            }
        }
    },
    {
        input: {
            date: '2020-03-15T22:45:31.981Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.710372867524599,
                altitude: -0.7036740673153284
            },
            getTimes: {
                solarNoon: '2020-03-15T12:00:47.901Z',
                nadir: '2020-03-15T00:00:47.901Z',
                sunrise: '2020-03-15T06:02:41.328Z',
                sunset: '2020-03-15T17:58:54.473Z',
                sunriseEnd: '2020-03-15T06:05:55.841Z',
                sunsetStart: '2020-03-15T17:55:39.961Z',
                dawn: '2020-03-15T05:31:15.474Z',
                dusk: '2020-03-15T18:30:20.328Z',
                nauticalDawn: '2020-03-15T04:54:25.341Z',
                nauticalDusk: '2020-03-15T19:07:10.461Z',
                nightEnd: '2020-03-15T04:16:37.115Z',
                night: '2020-03-15T19:44:58.686Z',
                goldenHourEnd: '2020-03-15T06:44:27.407Z',
                goldenHour: '2020-03-15T17:17:08.395Z'
            },
            getMoonPosition: {
                azimuth: -1.4538790335531935,
                altitude: -0.3853647310974715,
                distance: 376968.3879390459,
                parallacticAngle: -0.7760333434134692
            },
            getMoonIllumination: {
                fraction: 0.5605607325681523,
                phase: 0.7306754724267046,
                angle: 1.6508545146460571
            },
            getMoonTimesUTC: {
                rise: '2020-03-15T00:04:15.179Z',
                set: '2020-03-15T09:22:44.752Z'
            },
            getMoonTimesNonUTC: {
                rise: '2020-03-15T00:04:10.978Z',
                set: '2020-03-15T09:22:45.408Z'
            }
        }
    },
    {
        input: {
            date: '2020-03-15T22:45:31.981Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.6784761021901624,
                altitude: -0.6511980576536716
            },
            getTimes: {
                solarNoon: '2020-03-15T12:09:42.991Z',
                nadir: '2020-03-15T00:09:42.991Z',
                sunrise: '2020-03-15T06:12:04.757Z',
                sunset: '2020-03-15T18:07:21.224Z',
                sunriseEnd: '2020-03-15T06:15:30.376Z',
                sunsetStart: '2020-03-15T18:03:55.605Z',
                dawn: '2020-03-15T05:38:50.895Z',
                dusk: '2020-03-15T18:40:35.086Z',
                nauticalDawn: '2020-03-15T04:59:48.960Z',
                nauticalDusk: '2020-03-15T19:19:37.022Z',
                nightEnd: '2020-03-15T04:19:30.768Z',
                night: '2020-03-15T19:59:55.214Z',
                goldenHourEnd: '2020-03-15T06:56:16.271Z',
                goldenHour: '2020-03-15T17:23:09.711Z'
            },
            getMoonPosition: {
                azimuth: -1.5027116358405508,
                altitude: -0.41446353722759,
                distance: 376968.3879390459,
                parallacticAngle: -0.7283717732109943
            },
            getMoonIllumination: {
                fraction: 0.5605607325681523,
                phase: 0.7306754724267046,
                angle: 1.6508545146460571
            },
            getMoonTimesUTC: {
                rise: '2020-03-15T00:24:07.118Z',
                set: '2020-03-15T09:21:36.561Z'
            },
            getMoonTimesNonUTC: {
                rise: '2020-03-15T00:23:58.637Z',
                set: '2020-03-15T09:21:34.724Z'
            }
        }
    },
    {
        input: {
            date: '2020-03-15T22:45:31.981Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.0025030824648287,
                altitude: -0.49592881440806647
            },
            getTimes: {
                solarNoon: '2020-03-16T07:13:57.601Z',
                nadir: '2020-03-15T19:13:57.601Z',
                sunrise: '2020-03-16T01:13:27.560Z',
                sunset: '2020-03-16T13:14:27.642Z',
                sunriseEnd: '2020-03-16T01:16:16.367Z',
                sunsetStart: '2020-03-16T13:11:38.836Z',
                dawn: '2020-03-16T00:46:10.930Z',
                dusk: '2020-03-16T13:41:44.273Z',
                nauticalDawn: '2020-03-16T00:14:20.396Z',
                nauticalDusk: '2020-03-16T14:13:34.807Z',
                nightEnd: '2020-03-15T23:42:02.010Z',
                night: '2020-03-16T14:45:53.193Z',
                goldenHourEnd: '2020-03-16T01:49:37.592Z',
                goldenHour: '2020-03-16T12:38:17.611Z'
            },
            getMoonPosition: {
                azimuth: -0.5108836129436394,
                altitude: 0.39513424489802057,
                distance: 376968.3879390459,
                parallacticAngle: -0.4085055629116785
            },
            getMoonIllumination: {
                fraction: 0.5605607325681523,
                phase: 0.7306754724267046,
                angle: 1.6508545146460571
            },
            getMoonTimesUTC: {
                rise: '2020-03-15T19:49:40.707Z',
                set: '2020-03-15T04:53:45.608Z'
            },
            getMoonTimesNonUTC: {
                rise: '2020-03-15T19:49:34.222Z',
                set: '2020-03-15T04:53:39.745Z'
            }
        }
    },
    {
        input: {
            date: '2020-03-15T22:45:31.981Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.235520469957612,
                altitude: 0.38084411427299053
            },
            getTimes: {
                solarNoon: '2020-03-16T02:51:24.870Z',
                nadir: '2020-03-15T14:51:24.870Z',
                sunrise: '2020-03-15T20:50:35.300Z',
                sunset: '2020-03-16T08:52:14.440Z',
                sunriseEnd: '2020-03-15T20:53:12.815Z',
                sunsetStart: '2020-03-16T08:49:36.925Z',
                dawn: '2020-03-15T20:25:08.497Z',
                dusk: '2020-03-16T09:17:41.243Z',
                nauticalDawn: '2020-03-15T19:55:29.734Z',
                nauticalDusk: '2020-03-16T09:47:20.006Z',
                nightEnd: '2020-03-15T19:25:33.958Z',
                night: '2020-03-16T10:17:15.782Z',
                goldenHourEnd: '2020-03-15T21:24:18.902Z',
                goldenHour: '2020-03-16T08:18:30.838Z'
            },
            getMoonPosition: {
                azimuth: 0.6535076186095057,
                altitude: 0.4097808422510347,
                distance: 376968.3879390459,
                parallacticAngle: 0.5578545354559418
            },
            getMoonIllumination: {
                fraction: 0.5605607325681523,
                phase: 0.7306754724267046,
                angle: 1.6508545146460571
            },
            getMoonTimesUTC: {
                rise: '2020-03-15T15:00:53.069Z',
                set: '2020-03-15T00:34:34.085Z'
            },
            getMoonTimesNonUTC: {
                rise: '2020-03-15T15:00:54.011Z',
                set: '2020-03-15T00:34:21.802Z'
            }
        }
    },
    {
        input: {
            date: '2020-05-17T02:18:43.310Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.502996319962278,
                altitude: -0.24378925632899542
            },
            getTimes: {
                solarNoon: '2020-05-17T11:48:24.939Z',
                nadir: '2020-05-16T23:48:24.939Z',
                sunrise: '2020-05-17T04:04:53.333Z',
                sunset: '2020-05-17T19:31:56.545Z',
                sunriseEnd: '2020-05-17T04:08:41.496Z',
                sunsetStart: '2020-05-17T19:28:08.382Z',
                dawn: '2020-05-17T03:26:12.088Z',
                dusk: '2020-05-17T20:10:37.790Z',
                nauticalDawn: '2020-05-17T02:34:47.126Z',
                nauticalDusk: '2020-05-17T21:02:02.752Z',
                nightEnd: '2020-05-17T01:26:05.952Z',
                night: '2020-05-17T22:10:43.926Z',
                goldenHourEnd: '2020-05-17T04:51:46.828Z',
                goldenHour: '2020-05-17T18:45:03.050Z'
            },
            getMoonPosition: {
                azimuth: -1.419898645954136,
                altitude: -0.023190732854854047,
                distance: 404565.08765981963,
                parallacticAngle: -0.7148541341117574
            },
            getMoonIllumination: {
                fraction: 0.2699924960032316,
                phase: 0.8260779887366623,
                angle: 1.1146546335193195
            },
            getMoonTimesUTC: {
                rise: '2020-05-17T02:28:49.380Z',
                set: '2020-05-17T13:56:23.198Z'
            },
            getMoonTimesNonUTC: {
                rise: '2020-05-17T02:28:49.380Z',
                set: '2020-05-17T13:56:23.198Z'
            }
        }
    },
    {
        input: {
            date: '2020-05-17T02:18:43.310Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.5440386701280544,
                altitude: -0.22054115971319896
            },
            getTimes: {
                solarNoon: '2020-05-17T11:57:20.155Z',
                nadir: '2020-05-16T23:57:20.155Z',
                sunrise: '2020-05-17T04:03:03.456Z',
                sunset: '2020-05-17T19:51:36.855Z',
                sunriseEnd: '2020-05-17T04:07:10.322Z',
                sunsetStart: '2020-05-17T19:47:29.988Z',
                dawn: '2020-05-17T03:20:42.496Z',
                dusk: '2020-05-17T20:33:57.814Z',
                nauticalDawn: '2020-05-17T02:21:58.723Z',
                nauticalDusk: '2020-05-17T21:32:41.588Z',
                nightEnd: '2020-05-17T00:44:03.323Z',
                night: '2020-05-17T23:10:36.988Z',
                goldenHourEnd: '2020-05-17T04:53:23.973Z',
                goldenHour: '2020-05-17T19:01:16.338Z'
            },
            getMoonPosition: {
                azimuth: -1.4518018605134866,
                altitude: -0.05411819139282931,
                distance: 404565.08765981963,
                parallacticAngle: -0.6723391526390137
            },
            getMoonIllumination: {
                fraction: 0.2699924960032316,
                phase: 0.8260779887366623,
                angle: 1.1146546335193195
            },
            getMoonTimesUTC: {
                rise: '2020-05-17T02:41:01.476Z',
                set: '2020-05-17T14:03:29.405Z'
            },
            getMoonTimesNonUTC: {
                rise: '2020-05-17T02:41:01.476Z',
                set: '2020-05-17T14:03:29.405Z'
            }
        }
    },
    {
        input: {
            date: '2020-05-17T02:18:43.310Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.6223173242077915,
                altitude: 0.4713926756311496
            },
            getTimes: {
                solarNoon: '2020-05-17T07:01:48.422Z',
                nadir: '2020-05-16T19:01:48.422Z',
                sunrise: '2020-05-16T23:44:24.663Z',
                sunset: '2020-05-17T14:19:12.180Z',
                sunriseEnd: '2020-05-16T23:47:33.780Z',
                sunsetStart: '2020-05-17T14:16:03.064Z',
                dawn: '2020-05-16T23:13:00.137Z',
                dusk: '2020-05-17T14:50:36.707Z',
                nauticalDawn: '2020-05-16T22:33:53.040Z',
                nauticalDusk: '2020-05-17T15:29:43.803Z',
                nightEnd: '2020-05-16T21:49:57.534Z',
                night: '2020-05-17T16:13:39.310Z',
                goldenHourEnd: '2020-05-17T00:23:52.207Z',
                goldenHour: '2020-05-17T13:39:44.637Z'
            },
            getMoonPosition: {
                azimuth: -0.29949432024926703,
                altitude: 0.7118208617260863,
                distance: 404565.08765981963,
                parallacticAngle: -0.227298764225883
            },
            getMoonIllumination: {
                fraction: 0.2699924960032316,
                phase: 0.8260779887366623,
                angle: 1.1146546335193195
            },
            getMoonTimesUTC: {
                rise: '2020-05-17T21:53:01.652Z',
                set: '2020-05-17T09:03:42.530Z'
            },
            getMoonTimesNonUTC: {
                rise: '2020-05-17T21:53:01.652Z',
                set: '2020-05-17T09:03:42.530Z'
            }
        }
    },
    {
        input: {
            date: '2020-05-17T02:18:43.310Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -0.2805594659113218,
                altitude: 1.2758043954996556
            },
            getTimes: {
                solarNoon: '2020-05-17T02:39:11.966Z',
                nadir: '2020-05-16T14:39:11.966Z',
                sunrise: '2020-05-16T19:34:28.849Z',
                sunset: '2020-05-17T09:43:55.083Z',
                sunriseEnd: '2020-05-16T19:37:22.266Z',
                sunsetStart: '2020-05-17T09:41:01.666Z',
                dawn: '2020-05-16T19:05:53.207Z',
                dusk: '2020-05-17T10:12:30.725Z',
                nauticalDawn: '2020-05-16T18:30:58.855Z',
                nauticalDusk: '2020-05-17T10:47:25.076Z',
                nightEnd: '2020-05-16T17:53:15.963Z',
                night: '2020-05-17T11:25:07.969Z',
                goldenHourEnd: '2020-05-16T20:10:52.285Z',
                goldenHour: '2020-05-17T09:07:31.647Z'
            },
            getMoonPosition: {
                azimuth: 1.0515398926014552,
                altitude: 0.43158645191976,
                distance: 404565.08765981963,
                parallacticAngle: 0.790458130789626
            },
            getMoonIllumination: {
                fraction: 0.2699924960032316,
                phase: 0.8260779887366623,
                angle: 1.1146546335193195
            },
            getMoonTimesUTC: {
                rise: '2020-05-17T17:23:49.526Z',
                set: '2020-05-17T04:33:55.191Z'
            },
            getMoonTimesNonUTC: {
                rise: '2020-05-17T17:23:49.526Z',
                set: '2020-05-17T04:33:55.191Z'
            }
        }
    },
    {
        input: {
            date: '2021-08-07T01:38:28.146Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.6860563762030694,
                altitude: -0.3640862660435175
            },
            getTimes: {
                solarNoon: '2021-08-07T11:57:41.017Z',
                nadir: '2021-08-06T23:57:41.017Z',
                sunrise: '2021-08-07T04:31:03.718Z',
                sunset: '2021-08-07T19:24:18.317Z',
                sunriseEnd: '2021-08-07T04:34:41.030Z',
                sunsetStart: '2021-08-07T19:20:41.005Z',
                dawn: '2021-08-07T03:54:37.476Z',
                dusk: '2021-08-07T20:00:44.559Z',
                nauticalDawn: '2021-08-07T03:07:49.899Z',
                nauticalDusk: '2021-08-07T20:47:32.136Z',
                nightEnd: '2021-08-07T02:11:13.150Z',
                night: '2021-08-07T21:44:08.885Z',
                goldenHourEnd: '2021-08-07T05:16:07.044Z',
                goldenHour: '2021-08-07T18:39:14.991Z'
            },
            getMoonPosition: {
                azimuth: -2.4612212549979846,
                altitude: -0.10446074854591758,
                distance: 395751.0773621216,
                parallacticAngle: -0.4745508256613733
            },
            getMoonIllumination: {
                fraction: 0.027516109773778885,
                phase: 0.9469536225257296,
                angle: 1.9746538345369573
            },
            getMoonTimesUTC: {
                rise: '2021-08-07T02:35:22.874Z',
                set: '2021-08-07T19:21:39.234Z'
            },
            getMoonTimesNonUTC: {
                rise: '2021-08-07T02:35:22.874Z',
                set: '2021-08-07T19:21:39.234Z'
            }
        }
    },
    {
        input: {
            date: '2021-08-07T01:38:28.146Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.7312231633039366,
                altitude: -0.33256250517498803
            },
            getTimes: {
                solarNoon: '2021-08-07T12:06:36.177Z',
                nadir: '2021-08-07T00:06:36.177Z',
                sunrise: '2021-08-07T04:31:16.962Z',
                sunset: '2021-08-07T19:41:55.392Z',
                sunriseEnd: '2021-08-07T04:35:10.215Z',
                sunsetStart: '2021-08-07T19:38:02.140Z',
                dawn: '2021-08-07T03:51:51.478Z',
                dusk: '2021-08-07T20:21:20.876Z',
                nauticalDawn: '2021-08-07T02:59:52.104Z',
                nauticalDusk: '2021-08-07T21:13:20.250Z',
                nightEnd: '2021-08-07T01:51:45.065Z',
                night: '2021-08-07T22:21:27.290Z',
                goldenHourEnd: '2021-08-07T05:19:22.517Z',
                goldenHour: '2021-08-07T18:53:49.837Z'
            },
            getMoonPosition: {
                azimuth: -2.496064540041865,
                altitude: -0.08335003696520246,
                distance: 395751.0773621216,
                parallacticAngle: -0.426190458341504
            },
            getMoonIllumination: {
                fraction: 0.027516109773778885,
                phase: 0.9469536225257296,
                angle: 1.9746538345369573
            },
            getMoonTimesUTC: {
                rise: '2021-08-07T02:29:11.768Z',
                set: '2021-08-07T19:44:49.856Z'
            },
            getMoonTimesNonUTC: {
                rise: '2021-08-07T02:29:11.768Z',
                set: '2021-08-07T19:44:49.856Z'
            }
        }
    },
    {
        input: {
            date: '2021-08-07T01:38:28.146Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.7155167293673088,
                altitude: 0.2779044511404508
            },
            getTimes: {
                solarNoon: '2021-08-07T07:11:06.299Z',
                nadir: '2021-08-06T19:11:06.299Z',
                sunrise: '2021-08-07T00:05:32.565Z',
                sunset: '2021-08-07T14:16:40.034Z',
                sunriseEnd: '2021-08-07T00:08:35.589Z',
                sunsetStart: '2021-08-07T14:13:37.009Z',
                dawn: '2021-08-06T23:35:18.677Z',
                dusk: '2021-08-07T14:46:53.921Z',
                nauticalDawn: '2021-08-06T22:58:11.541Z',
                nauticalDusk: '2021-08-07T15:24:01.057Z',
                nightEnd: '2021-08-06T22:17:35.503Z',
                night: '2021-08-07T16:04:37.096Z',
                goldenHourEnd: '2021-08-07T00:43:54.752Z',
                goldenHour: '2021-08-07T13:38:17.846Z'
            },
            getMoonPosition: {
                azimuth: -1.6543976677440857,
                altitude: 0.6062104653245469,
                distance: 395751.0773621216,
                parallacticAngle: -0.9859669749765946
            },
            getMoonIllumination: {
                fraction: 0.027516109773778885,
                phase: 0.9469536225257296,
                angle: 1.9746538345369573
            },
            getMoonTimesUTC: {
                rise: '2021-08-07T23:15:01.970Z',
                set: '2021-08-07T13:55:13.862Z'
            },
            getMoonTimesNonUTC: {
                rise: '2021-08-06T22:12:32.427Z',
                set: '2021-08-07T13:55:13.862Z'
            }
        }
    },
    {
        input: {
            date: '2021-08-07T01:38:28.146Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -0.7553012536356336,
                altitude: 1.1415559000111422
            },
            getTimes: {
                solarNoon: '2021-08-07T02:48:31.453Z',
                nadir: '2021-08-06T14:48:31.453Z',
                sunrise: '2021-08-06T19:53:14.325Z',
                sunset: '2021-08-07T09:43:48.581Z',
                sunriseEnd: '2021-08-06T19:56:03.165Z',
                sunsetStart: '2021-08-07T09:40:59.741Z',
                dawn: '2021-08-06T19:25:30.203Z',
                dusk: '2021-08-07T10:11:32.703Z',
                nauticalDawn: '2021-08-06T18:51:57.562Z',
                nauticalDusk: '2021-08-07T10:45:05.345Z',
                nightEnd: '2021-08-06T18:16:16.042Z',
                night: '2021-08-07T11:20:46.865Z',
                goldenHourEnd: '2021-08-06T20:28:47.319Z',
                goldenHour: '2021-08-07T09:08:15.588Z'
            },
            getMoonPosition: {
                azimuth: 0.07952798935889392,
                altitude: 1.3849858746244637,
                distance: 395751.0773621216,
                parallacticAngle: 0.07130136385058833
            },
            getMoonIllumination: {
                fraction: 0.027516109773778885,
                phase: 0.9469536225257296,
                angle: 1.9746538345369573
            },
            getMoonTimesUTC: {
                rise: '2021-08-07T18:56:21.479Z',
                set: '2021-08-07T09:08:08.133Z'
            },
            getMoonTimesNonUTC: {
                rise: '2021-08-07T18:56:21.479Z',
                set: '2021-08-07T09:08:08.133Z'
            }
        }
    },
    {
        input: {
            date: '2023-07-03T02:55:35.587Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.423216405047161,
                altitude: -0.1331854202930111
            },
            getTimes: {
                solarNoon: '2023-07-03T11:55:52.224Z',
                nadir: '2023-07-02T23:55:52.224Z',
                sunrise: '2023-07-03T03:50:40.990Z',
                sunset: '2023-07-03T20:01:03.457Z',
                sunriseEnd: '2023-07-03T03:54:46.768Z',
                sunsetStart: '2023-07-03T19:56:57.679Z',
                dawn: '2023-07-03T03:08:13.650Z',
                dusk: '2023-07-03T20:43:30.797Z',
                nauticalDawn: '2023-07-03T02:07:57.258Z',
                nauticalDusk: '2023-07-03T21:43:47.189Z',
                nightEnd: null,
                night: null,
                goldenHourEnd: '2023-07-03T04:40:31.506Z',
                goldenHour: '2023-07-03T19:11:12.941Z'
            },
            getMoonPosition: {
                azimuth: 0.7479773476539344,
                altitude: 0.021421692564038315,
                distance: 369004.78335239575,
                parallacticAngle: 0.5321872772714166
            },
            getMoonIllumination: {
                fraction: 0.9963026844786939,
                phase: 0.48063304388510614,
                angle: -2.36593312477679
            },
            getMoonTimesUTC: {
                rise: '2023-07-03T20:42:39.736Z',
                set: '2023-07-03T03:06:20.591Z'
            },
            getMoonTimesNonUTC: {
                rise: '2023-07-03T20:42:39.736Z',
                set: '2023-07-03T03:06:20.591Z'
            }
        }
    },
    {
        input: {
            date: '2023-07-03T02:55:35.587Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.4591862379449445,
                altitude: -0.11389053232589719
            },
            getTimes: {
                solarNoon: '2023-07-03T12:04:47.489Z',
                nadir: '2023-07-03T00:04:47.489Z',
                sunrise: '2023-07-03T03:45:59.407Z',
                sunset: '2023-07-03T20:23:35.571Z',
                sunriseEnd: '2023-07-03T03:50:29.067Z',
                sunsetStart: '2023-07-03T20:19:05.911Z',
                dawn: '2023-07-03T02:58:29.845Z',
                dusk: '2023-07-03T21:11:05.133Z',
                nauticalDawn: '2023-07-03T01:44:41.766Z',
                nauticalDusk: '2023-07-03T22:24:53.212Z',
                nightEnd: null,
                night: null,
                goldenHourEnd: '2023-07-03T04:40:01.886Z',
                goldenHour: '2023-07-03T19:29:33.091Z'
            },
            getMoonPosition: {
                azimuth: 0.7177809278404099,
                altitude: 0.005570740970828943,
                distance: 369004.78335239575,
                parallacticAngle: 0.4827217301130343
            },
            getMoonIllumination: {
                fraction: 0.9963026844786939,
                phase: 0.48063304388510614,
                angle: -2.36593312477679
            },
            getMoonTimesUTC: {
                rise: '2023-07-03T21:08:39.188Z',
                set: '2023-07-03T02:57:23.571Z'
            },
            getMoonTimesNonUTC: {
                rise: '2023-07-03T21:08:39.188Z',
                set: '2023-07-03T02:57:23.571Z'
            }
        }
    },
    {
        input: {
            date: '2023-07-03T02:55:35.587Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.6023031542630832,
                altitude: 0.605829544858233
            },
            getTimes: {
                solarNoon: '2023-07-03T07:09:14.120Z',
                nadir: '2023-07-02T19:09:14.120Z',
                sunrise: '2023-07-02T23:36:12.840Z',
                sunset: '2023-07-03T14:42:15.401Z',
                sunriseEnd: '2023-07-02T23:39:31.752Z',
                sunsetStart: '2023-07-03T14:38:56.488Z',
                dawn: '2023-07-02T23:02:53.827Z',
                dusk: '2023-07-03T15:15:34.414Z',
                nauticalDawn: '2023-07-02T22:20:24.971Z',
                nauticalDusk: '2023-07-03T15:58:03.269Z',
                nightEnd: '2023-07-02T21:30:18.654Z',
                night: '2023-07-03T16:48:09.587Z',
                goldenHourEnd: '2023-07-03T00:17:25.596Z',
                goldenHour: '2023-07-03T14:01:02.645Z'
            },
            getMoonPosition: {
                azimuth: 1.5020190895011485,
                altitude: -0.7158027194117963,
                distance: 369004.78335239575,
                parallacticAngle: 1.0301181889162885
            },
            getMoonIllumination: {
                fraction: 0.9963026844786939,
                phase: 0.48063304388510614,
                angle: -2.36593312477679
            },
            getMoonTimesUTC: {
                rise: '2023-07-03T15:03:25.133Z',
                set: '2023-07-03T23:57:19.511Z'
            },
            getMoonTimesNonUTC: {
                rise: '2023-07-03T15:03:25.133Z',
                set: '2023-07-02T22:49:26.142Z'
            }
        }
    },
    {
        input: {
            date: '2023-07-03T02:55:35.587Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 0.17706429253396408,
                altitude: 1.3469349674435627
            },
            getTimes: {
                solarNoon: '2023-07-03T02:46:36.185Z',
                nadir: '2023-07-02T14:46:36.185Z',
                sunrise: '2023-07-02T19:28:55.377Z',
                sunset: '2023-07-03T10:04:16.992Z',
                sunriseEnd: '2023-07-02T19:31:56.344Z',
                sunsetStart: '2023-07-03T10:01:16.025Z',
                dawn: '2023-07-02T18:58:54.523Z',
                dusk: '2023-07-03T10:34:17.846Z',
                nauticalDawn: '2023-07-02T18:21:42.560Z',
                nauticalDusk: '2023-07-03T11:11:29.810Z',
                nightEnd: '2023-07-02T17:40:24.950Z',
                night: '2023-07-03T11:52:47.419Z',
                goldenHourEnd: '2023-07-02T20:06:42.354Z',
                goldenHour: '2023-07-03T09:26:30.015Z'
            },
            getMoonPosition: {
                azimuth: -2.388635180376754,
                altitude: -1.3875918019782452,
                distance: 369004.78335239575,
                parallacticAngle: -0.6812965162862069
            },
            getMoonIllumination: {
                fraction: 0.9963026844786939,
                phase: 0.48063304388510614,
                angle: -2.36593312477679
            },
            getMoonTimesUTC: {
                rise: '2023-07-03T10:10:52.160Z',
                set: '2023-07-03T19:40:25.505Z'
            },
            getMoonTimesNonUTC: {
                rise: '2023-07-03T10:10:52.160Z',
                set: '2023-07-03T19:40:25.505Z'
            }
        }
    },
    {
        input: {
            date: '2024-04-09T05:06:29.910Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.8095002758999157,
                altitude: -0.030758198624539282
            },
            getTimes: {
                solarNoon: '2024-04-09T11:53:11.441Z',
                nadir: '2024-04-08T23:53:11.441Z',
                sunrise: '2024-04-09T05:10:12.037Z',
                sunset: '2024-04-09T18:36:10.845Z',
                sunriseEnd: '2024-04-09T05:13:31.418Z',
                sunsetStart: '2024-04-09T18:32:51.465Z',
                dawn: '2024-04-09T04:37:27.938Z',
                dusk: '2024-04-09T19:08:54.945Z',
                nauticalDawn: '2024-04-09T03:57:42.670Z',
                nauticalDusk: '2024-04-09T19:48:40.212Z',
                nightEnd: '2024-04-09T03:14:43.978Z',
                night: '2024-04-09T20:31:38.905Z',
                goldenHourEnd: '2024-04-09T05:52:18.624Z',
                goldenHour: '2024-04-09T17:54:04.258Z'
            },
            getMoonPosition: {
                azimuth: -1.9331850682375835,
                altitude: -0.04939635519491807,
                distance: 367345.2986362109,
                parallacticAngle: -0.67722393132436
            },
            getMoonIllumination: {
                fraction: 0.004014415316446085,
                phase: 0.020181445968135647,
                angle: -2.0352507651374423
            },
            getMoonTimesUTC: {
                rise: '2024-04-09T05:26:35.672Z',
                set: '2024-04-09T20:01:41.788Z'
            },
            getMoonTimesNonUTC: {
                rise: '2024-04-09T05:26:35.672Z',
                set: '2024-04-09T20:01:41.788Z'
            }
        }
    },
    {
        input: {
            date: '2024-04-09T05:06:29.910Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.8412905545491478,
                altitude: -0.04323848008268444
            },
            getTimes: {
                solarNoon: '2024-04-09T12:02:06.539Z',
                nadir: '2024-04-09T00:02:06.539Z',
                sunrise: '2024-04-09T05:15:06.921Z',
                sunset: '2024-04-09T18:49:06.157Z',
                sunriseEnd: '2024-04-09T05:18:38.366Z',
                sunsetStart: '2024-04-09T18:45:34.713Z',
                dawn: '2024-04-09T04:40:17.826Z',
                dusk: '2024-04-09T19:23:55.253Z',
                nauticalDawn: '2024-04-09T03:57:37.216Z',
                nauticalDusk: '2024-04-09T20:06:35.863Z',
                nightEnd: '2024-04-09T03:10:34.804Z',
                night: '2024-04-09T20:53:38.274Z',
                goldenHourEnd: '2024-04-09T05:59:41.432Z',
                goldenHour: '2024-04-09T18:04:31.647Z'
            },
            getMoonPosition: {
                azimuth: -1.966267130443851,
                altitude: -0.05545057101921351,
                distance: 367345.2986362109,
                parallacticAngle: -0.6249424701826375
            },
            getMoonIllumination: {
                fraction: 0.004014415316446085,
                phase: 0.020181445968135647,
                angle: -2.0352507651374423
            },
            getMoonTimesUTC: {
                rise: '2024-04-09T05:30:22.536Z',
                set: '2024-04-09T20:17:48.759Z'
            },
            getMoonTimesNonUTC: {
                rise: '2024-04-09T05:30:22.536Z',
                set: '2024-04-09T20:17:48.759Z'
            }
        }
    },
    {
        input: {
            date: '2024-04-09T05:06:29.910Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -0.8206655241979774,
                altitude: 0.8297689388629944
            },
            getTimes: {
                solarNoon: '2024-04-09T07:06:38.723Z',
                nadir: '2024-04-08T19:06:38.723Z',
                sunrise: '2024-04-09T00:33:49.014Z',
                sunset: '2024-04-09T13:39:28.432Z',
                sunriseEnd: '2024-04-09T00:36:40.868Z',
                sunsetStart: '2024-04-09T13:36:36.578Z',
                dawn: '2024-04-09T00:05:46.486Z',
                dusk: '2024-04-09T14:07:30.960Z',
                nauticalDawn: '2024-04-08T23:32:20.581Z',
                nauticalDusk: '2024-04-09T14:40:56.865Z',
                nightEnd: '2024-04-08T22:57:27.369Z',
                night: '2024-04-09T15:15:50.077Z',
                goldenHourEnd: '2024-04-09T01:10:15.578Z',
                goldenHour: '2024-04-09T13:03:01.868Z'
            },
            getMoonPosition: {
                azimuth: -1.0030121903516402,
                altitude: 0.8076251184417346,
                distance: 367345.2986362109,
                parallacticAngle: -0.7087143041166355
            },
            getMoonIllumination: {
                fraction: 0.004014415316446085,
                phase: 0.020181445968135647,
                angle: -2.0352507651374423
            },
            getMoonTimesUTC: {
                rise: '2024-04-09T00:48:13.001Z',
                set: '2024-04-09T14:40:27.250Z'
            },
            getMoonTimesNonUTC: {
                rise: '2024-04-09T00:48:13.001Z',
                set: '2024-04-09T14:40:27.250Z'
            }
        }
    },
    {
        input: {
            date: '2024-04-09T05:06:29.910Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.0129717504492763,
                altitude: 0.8191447211270738
            },
            getTimes: {
                solarNoon: '2024-04-09T02:44:05.741Z',
                nadir: '2024-04-08T14:44:05.741Z',
                sunrise: '2024-04-08T20:16:18.847Z',
                sunset: '2024-04-09T09:11:52.634Z',
                sunriseEnd: '2024-04-08T20:18:58.737Z',
                sunsetStart: '2024-04-09T09:09:12.745Z',
                dawn: '2024-04-08T19:50:17.312Z',
                dusk: '2024-04-09T09:37:54.169Z',
                nauticalDawn: '2024-04-08T19:19:28.741Z',
                nauticalDusk: '2024-04-09T10:08:42.741Z',
                nightEnd: '2024-04-08T18:47:43.536Z',
                night: '2024-04-09T10:40:27.946Z',
                goldenHourEnd: '2024-04-08T20:50:16.594Z',
                goldenHour: '2024-04-09T08:37:54.887Z'
            },
            getMoonPosition: {
                azimuth: 0.945989362696961,
                altitude: 0.938463267243661,
                distance: 367345.2986362109,
                parallacticAngle: 0.7356236799651605
            },
            getMoonIllumination: {
                fraction: 0.004014415316446085,
                phase: 0.020181445968135647,
                angle: -2.0352507651374423
            },
            getMoonTimesUTC: {
                rise: '2024-04-09T20:56:29.169Z',
                set: '2024-04-09T09:56:45.382Z'
            },
            getMoonTimesNonUTC: {
                rise: '2024-04-09T20:56:29.169Z',
                set: '2024-04-09T09:56:45.382Z'
            }
        }
    },
    {
        input: {
            date: '2026-03-28T22:34:39.316Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.7033896795688683,
                altitude: -0.6130829742314233
            },
            getTimes: {
                solarNoon: '2026-03-28T11:56:56.078Z',
                nadir: '2026-03-27T23:56:56.078Z',
                sunrise: '2026-03-28T05:36:19.730Z',
                sunset: '2026-03-28T18:17:32.425Z',
                sunriseEnd: '2026-03-28T05:39:35.027Z',
                sunsetStart: '2026-03-28T18:14:17.128Z',
                dawn: '2026-03-28T05:04:31.786Z',
                dusk: '2026-03-28T18:49:20.369Z',
                nauticalDawn: '2026-03-28T04:26:38.960Z',
                nauticalDusk: '2026-03-28T19:27:13.196Z',
                nightEnd: '2026-03-28T03:46:53.954Z',
                night: '2026-03-28T20:06:58.202Z',
                goldenHourEnd: '2026-03-28T06:17:55.182Z',
                goldenHour: '2026-03-28T17:35:56.973Z'
            },
            getMoonPosition: {
                azimuth: 0.7125232944073709,
                altitude: 0.9158405628510847,
                distance: 375364.03614431474,
                parallacticAngle: 0.466798421849032
            },
            getMoonIllumination: {
                fraction: 0.8304486528774517,
                phase: 0.36491206216705524,
                angle: -1.2187922561382587
            },
            getMoonTimesUTC: {
                rise: '2026-03-28T12:59:51.552Z',
                set: '2026-03-28T04:03:03.403Z'
            },
            getMoonTimesNonUTC: {
                rise: '2026-03-28T12:59:51.945Z',
                set: '2026-03-28T04:03:11.381Z'
            }
        }
    },
    {
        input: {
            date: '2026-03-28T22:34:39.316Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.672072547318236,
                altitude: -0.5605915572430868
            },
            getTimes: {
                solarNoon: '2026-03-28T12:05:51.161Z',
                nadir: '2026-03-28T00:05:51.161Z',
                sunrise: '2026-03-28T05:43:29.738Z',
                sunset: '2026-03-28T18:28:12.584Z',
                sunriseEnd: '2026-03-28T05:46:56.307Z',
                sunsetStart: '2026-03-28T18:24:46.014Z',
                dawn: '2026-03-28T05:09:48.778Z',
                dusk: '2026-03-28T19:01:53.543Z',
                nauticalDawn: '2026-03-28T04:29:28.846Z',
                nauticalDusk: '2026-03-28T19:42:13.475Z',
                nightEnd: '2026-03-28T03:46:41.412Z',
                night: '2026-03-28T20:25:00.909Z',
                goldenHourEnd: '2026-03-28T06:27:28.004Z',
                goldenHour: '2026-03-28T17:44:14.318Z'
            },
            getMoonPosition: {
                azimuth: 0.6212245931030788,
                altitude: 0.8949189834002478,
                distance: 375364.03614431474,
                parallacticAngle: 0.388754884451424
            },
            getMoonIllumination: {
                fraction: 0.8304486528774517,
                phase: 0.36491206216705524,
                angle: -1.2187922561382587
            },
            getMoonTimesUTC: {
                rise: '2026-03-28T12:58:34.984Z',
                set: '2026-03-28T04:22:38.079Z'
            },
            getMoonTimesNonUTC: {
                rise: '2026-03-28T12:58:39.062Z',
                set: '2026-03-28T04:22:39.509Z'
            }
        }
    },
    {
        input: {
            date: '2026-03-28T22:34:39.316Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.0925457487619434,
                altitude: -0.4532074710713625
            },
            getTimes: {
                solarNoon: '2026-03-29T07:10:04.973Z',
                nadir: '2026-03-28T19:10:04.973Z',
                sunrise: '2026-03-29T00:52:40.696Z',
                sunset: '2026-03-29T13:27:29.250Z',
                sunriseEnd: '2026-03-29T00:55:30.113Z',
                sunsetStart: '2026-03-29T13:24:39.833Z',
                dawn: '2026-03-29T00:25:10.005Z',
                dusk: '2026-03-29T13:54:59.941Z',
                nauticalDawn: '2026-03-28T23:52:42.951Z',
                nauticalDusk: '2026-03-29T14:27:26.995Z',
                nightEnd: '2026-03-28T23:19:21.081Z',
                night: '2026-03-29T15:00:48.866Z',
                goldenHourEnd: '2026-03-29T01:28:46.893Z',
                goldenHour: '2026-03-29T12:51:23.053Z'
            },
            getMoonPosition: {
                azimuth: 1.867769169241099,
                altitude: 0.11486554954964256,
                distance: 375364.03614431474,
                parallacticAngle: 0.8606634382905167
            },
            getMoonIllumination: {
                fraction: 0.8304486528774517,
                phase: 0.36491206216705524,
                angle: -1.2187922561382587
            },
            getMoonTimesUTC: {
                rise: '2026-03-28T08:24:56.748Z',
                set: '2026-03-28T23:12:46.759Z'
            },
            getMoonTimesNonUTC: {
                rise: '2026-03-28T08:24:45.747Z'
            }
        }
    },
    {
        input: {
            date: '2026-03-28T22:34:39.316Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.3283839844384193,
                altitude: 0.41079712220263004
            },
            getTimes: {
                solarNoon: '2026-03-29T02:47:32.408Z',
                nadir: '2026-03-28T14:47:32.408Z',
                sunrise: '2026-03-28T20:32:36.826Z',
                sunset: '2026-03-29T09:02:27.990Z',
                sunriseEnd: '2026-03-28T20:35:14.787Z',
                sunsetStart: '2026-03-29T08:59:50.029Z',
                dawn: '2026-03-28T20:06:59.807Z',
                dusk: '2026-03-29T09:28:05.009Z',
                nauticalDawn: '2026-03-28T19:36:54.826Z',
                nauticalDusk: '2026-03-29T09:58:09.990Z',
                nightEnd: '2026-03-28T19:06:14.414Z',
                night: '2026-03-29T10:28:50.402Z',
                goldenHourEnd: '2026-03-28T21:06:17.703Z',
                goldenHour: '2026-03-29T08:28:47.113Z'
            },
            getMoonPosition: {
                azimuth: 2.773302224332656,
                altitude: -0.5944186960329569,
                distance: 375364.03614431474,
                parallacticAngle: 0.3109557098493672
            },
            getMoonIllumination: {
                fraction: 0.8304486528774517,
                phase: 0.36491206216705524,
                angle: -1.2187922561382587
            },
            getMoonTimesUTC: {
                rise: '2026-03-28T04:01:38.048Z',
                set: '2026-03-28T18:33:36.957Z'
            },
            getMoonTimesNonUTC: {
                rise: '2026-03-28T04:01:35.903Z',
                set: '2026-03-28T18:33:24.100Z'
            }
        }
    },
    {
        input: {
            date: '2026-11-08T02:04:15.178Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.158187436895447,
                altitude: -0.795239936728274
            },
            getTimes: {
                solarNoon: '2026-11-08T11:35:39.416Z',
                nadir: '2026-11-07T23:35:39.416Z',
                sunrise: '2026-11-08T06:47:06.859Z',
                sunset: '2026-11-08T16:24:11.973Z',
                sunriseEnd: '2026-11-08T06:50:40.412Z',
                sunsetStart: '2026-11-08T16:20:38.419Z',
                dawn: '2026-11-08T06:13:27.234Z',
                dusk: '2026-11-08T16:57:51.597Z',
                nauticalDawn: '2026-11-08T05:35:45.739Z',
                nauticalDusk: '2026-11-08T17:35:33.092Z',
                nightEnd: '2026-11-08T04:58:56.156Z',
                night: '2026-11-08T18:12:22.675Z',
                goldenHourEnd: '2026-11-08T07:34:28.796Z',
                goldenHour: '2026-11-08T15:36:50.035Z'
            },
            getMoonPosition: {
                azimuth: -1.9106195415744864,
                altitude: -0.649512645799298,
                distance: 392495.810108904,
                parallacticAngle: -0.7044694475225076
            },
            getMoonIllumination: {
                fraction: 0.013217201089100239,
                phase: 0.9633240611911362,
                angle: 1.5844540934761884
            },
            getMoonTimesUTC: {
                rise: '2026-11-08T06:09:56.491Z',
                set: '2026-11-08T15:31:52.509Z'
            },
            getMoonTimesNonUTC: {
                rise: '2026-11-08T06:09:48.728Z',
                set: '2026-11-08T15:32:00.060Z'
            }
        }
    },
    {
        input: {
            date: '2026-11-08T02:04:15.178Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.240830512601774,
                altitude: -0.7882011703391731
            },
            getTimes: {
                solarNoon: '2026-11-08T11:44:34.646Z',
                nadir: '2026-11-07T23:44:34.646Z',
                sunrise: '2026-11-08T07:03:42.013Z',
                sunset: '2026-11-08T16:25:27.279Z',
                sunriseEnd: '2026-11-08T07:07:30.454Z',
                sunsetStart: '2026-11-08T16:21:38.838Z',
                dawn: '2026-11-08T06:27:51.014Z',
                dusk: '2026-11-08T17:01:18.278Z',
                nauticalDawn: '2026-11-08T05:47:55.925Z',
                nauticalDusk: '2026-11-08T17:41:13.367Z',
                nightEnd: '2026-11-08T05:09:01.653Z',
                night: '2026-11-08T18:20:07.638Z',
                goldenHourEnd: '2026-11-08T07:54:45.665Z',
                goldenHour: '2026-11-08T15:34:23.627Z'
            },
            getMoonPosition: {
                azimuth: -1.9811059184516107,
                altitude: -0.6557697497641206,
                distance: 392495.810108904,
                parallacticAngle: -0.638382057543523
            },
            getMoonIllumination: {
                fraction: 0.013217201089100239,
                phase: 0.9633240611911362,
                angle: 1.5844540934761884
            },
            getMoonTimesUTC: {
                rise: '2026-11-08T06:29:02.613Z',
                set: '2026-11-08T15:30:56.623Z'
            },
            getMoonTimesNonUTC: {
                rise: '2026-11-08T06:28:57.328Z',
                set: '2026-11-08T15:31:02.887Z'
            }
        }
    },
    {
        input: {
            date: '2026-11-08T02:04:15.178Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.138541018274896,
                altitude: 0.05331143218132687
            },
            getTimes: {
                solarNoon: '2026-11-08T06:49:02.458Z',
                nadir: '2026-11-07T18:49:02.458Z',
                sunrise: '2026-11-08T01:41:16.382Z',
                sunset: '2026-11-08T11:56:48.534Z',
                sunriseEnd: '2026-11-08T01:44:17.279Z',
                sunsetStart: '2026-11-08T11:53:47.637Z',
                dawn: '2026-11-08T01:12:30.167Z',
                dusk: '2026-11-08T12:25:34.749Z',
                nauticalDawn: '2026-11-08T00:39:53.873Z',
                nauticalDusk: '2026-11-08T12:58:11.042Z',
                nightEnd: '2026-11-08T00:07:51.362Z',
                night: '2026-11-08T13:30:13.553Z',
                goldenHourEnd: '2026-11-08T02:20:48.079Z',
                goldenHour: '2026-11-08T11:17:16.837Z'
            },
            getMoonPosition: {
                azimuth: -0.9665962453194119,
                altitude: 0.20900326718091733,
                distance: 392495.810108904,
                parallacticAngle: -0.7091588235367219
            },
            getMoonIllumination: {
                fraction: 0.013217201089100239,
                phase: 0.9633240611911362,
                angle: 1.5844540934761884
            },
            getMoonTimesUTC: {
                rise: '2026-11-08T00:48:12.550Z',
                set: '2026-11-08T11:04:52.684Z'
            },
            getMoonTimesNonUTC: {
                rise: '2026-11-08T00:48:17.582Z',
                set: '2026-11-08T11:04:46.238Z'
            }
        }
    },
    {
        input: {
            date: '2026-11-08T02:04:15.178Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -0.11204810622315046,
                altitude: 0.6577960612108169
            },
            getTimes: {
                solarNoon: '2026-11-08T02:26:25.610Z',
                nadir: '2026-11-07T14:26:25.610Z',
                sunrise: '2026-11-07T21:09:03.712Z',
                sunset: '2026-11-08T07:43:47.508Z',
                sunriseEnd: '2026-11-07T21:11:50.914Z',
                sunsetStart: '2026-11-08T07:41:00.306Z',
                dawn: '2026-11-07T20:42:22.456Z',
                dusk: '2026-11-08T08:10:28.763Z',
                nauticalDawn: '2026-11-07T20:11:58.669Z',
                nauticalDusk: '2026-11-08T08:40:52.550Z',
                nightEnd: '2026-11-07T19:42:01.504Z',
                night: '2026-11-08T09:10:49.716Z',
                goldenHourEnd: '2026-11-07T21:45:23.668Z',
                goldenHour: '2026-11-08T07:07:27.551Z'
            },
            getMoonPosition: {
                azimuth: 0.17719062592706336,
                altitude: 0.6470147816045376,
                distance: 392495.810108904,
                parallacticAngle: 0.1500424143303
            },
            getMoonIllumination: {
                fraction: 0.013217201089100239,
                phase: 0.9633240611911362,
                angle: 1.5844540934761884
            },
            getMoonTimesUTC: {
                rise: '2026-11-08T21:06:09.031Z',
                set: '2026-11-08T06:48:07.854Z'
            },
            getMoonTimesNonUTC: {
                rise: '2026-11-08T21:06:14.642Z',
                set: '2026-11-08T06:47:57.963Z'
            }
        }
    },
    {
        input: {
            date: '2028-05-24T18:32:10.108Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.9545101300746375,
                altitude: 0.15036408122491285
            },
            getTimes: {
                solarNoon: '2028-05-24T11:48:55.125Z',
                nadir: '2028-05-23T23:48:55.125Z',
                sunrise: '2028-05-24T03:57:06.603Z',
                sunset: '2028-05-24T19:40:43.647Z',
                sunriseEnd: '2028-05-24T04:01:00.979Z',
                sunsetStart: '2028-05-24T19:36:49.271Z',
                dawn: '2028-05-24T03:17:06.741Z',
                dusk: '2028-05-24T20:20:43.509Z',
                nauticalDawn: '2028-05-24T02:22:48.147Z',
                nauticalDusk: '2028-05-24T21:15:02.103Z',
                nightEnd: '2028-05-24T01:03:50.274Z',
                night: '2028-05-24T22:33:59.976Z',
                goldenHourEnd: '2028-05-24T04:45:02.907Z',
                goldenHour: '2028-05-24T18:52:47.342Z'
            },
            getMoonPosition: {
                azimuth: 1.9532143960809865,
                altitude: 0.2488848183270181,
                distance: 382974.27907471545,
                parallacticAngle: 0.739128648248041
            },
            getMoonIllumination: {
                fraction: 0.0023819783157487118,
                phase: 0.015541452063795369,
                angle: -2.3892897216009477
            },
            getMoonTimesUTC: {
                rise: '2028-05-24T03:26:26.881Z',
                set: '2028-05-24T20:19:24.102Z'
            },
            getMoonTimesNonUTC: {
                rise: '2028-05-24T03:26:26.881Z',
                set: '2028-05-24T20:19:24.102Z'
            }
        }
    },
    {
        input: {
            date: '2028-05-24T18:32:10.108Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.9187159808932663,
                altitude: 0.19018858117449805
            },
            getTimes: {
                solarNoon: '2028-05-24T11:57:50.362Z',
                nadir: '2028-05-23T23:57:50.362Z',
                sunrise: '2028-05-24T03:54:13.329Z',
                sunset: '2028-05-24T20:01:27.394Z',
                sunriseEnd: '2028-05-24T03:58:28.131Z',
                sunsetStart: '2028-05-24T19:57:12.592Z',
                dawn: '2028-05-24T03:10:07.331Z',
                dusk: '2028-05-24T20:45:33.393Z',
                nauticalDawn: '2028-05-24T02:06:50.460Z',
                nauticalDusk: '2028-05-24T21:48:50.264Z',
                nightEnd: null,
                night: null,
                goldenHourEnd: '2028-05-24T04:45:51.841Z',
                goldenHour: '2028-05-24T19:09:48.882Z'
            },
            getMoonPosition: {
                azimuth: 1.9138821505109578,
                altitude: 0.2884493163543824,
                distance: 382974.27907471545,
                parallacticAngle: 0.7034729223870954
            },
            getMoonIllumination: {
                fraction: 0.0023819783157487118,
                phase: 0.015541452063795369,
                angle: -2.3892897216009477
            },
            getMoonTimesUTC: {
                rise: '2028-05-24T03:21:16.919Z',
                set: '2028-05-24T20:44:59.747Z'
            },
            getMoonTimesNonUTC: {
                rise: '2028-05-24T03:21:16.919Z',
                set: '2028-05-24T20:44:59.747Z'
            }
        }
    },
    {
        input: {
            date: '2028-05-24T18:32:10.108Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 3.0078881097486585,
                altitude: -0.4895027126582201
            },
            getTimes: {
                solarNoon: '2028-05-24T07:02:17.942Z',
                nadir: '2028-05-23T19:02:17.942Z',
                sunrise: '2028-05-23T23:38:57.123Z',
                sunset: '2028-05-24T14:25:38.760Z',
                sunriseEnd: '2028-05-23T23:42:09.731Z',
                sunsetStart: '2028-05-24T14:22:26.152Z',
                dawn: '2028-05-23T23:06:51.968Z',
                dusk: '2028-05-24T14:57:43.915Z',
                nauticalDawn: '2028-05-23T22:26:34.467Z',
                nauticalDusk: '2028-05-24T15:38:01.417Z',
                nightEnd: '2028-05-23T21:40:35.269Z',
                night: '2028-05-24T16:24:00.615Z',
                goldenHourEnd: '2028-05-24T00:19:02.200Z',
                goldenHour: '2028-05-24T13:45:33.683Z'
            },
            getMoonPosition: {
                azimuth: 2.946591267160688,
                altitude: -0.4007971835835208,
                distance: 382974.27907471545,
                parallacticAngle: 0.16279003651538468
            },
            getMoonIllumination: {
                fraction: 0.0023819783157487118,
                phase: 0.015541452063795369,
                angle: -2.3892897216009477
            },
            getMoonTimesUTC: {
                rise: '2028-05-24T23:52:13.991Z',
                set: '2028-05-24T14:44:11.664Z'
            },
            getMoonTimesNonUTC: {
                rise: '2028-05-23T23:04:08.017Z',
                set: '2028-05-24T14:44:11.664Z'
            }
        }
    },
    {
        input: {
            date: '2028-05-24T18:32:10.108Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.19628767606318,
                altitude: -0.1909078639605395
            },
            getTimes: {
                solarNoon: '2028-05-25T02:39:46.914Z',
                nadir: '2028-05-24T14:39:46.914Z',
                sunrise: '2028-05-24T19:29:31.643Z',
                sunset: '2028-05-25T09:50:02.186Z',
                sunriseEnd: '2028-05-24T19:32:28.105Z',
                sunsetStart: '2028-05-25T09:47:05.724Z',
                dawn: '2028-05-24T19:00:21.695Z',
                dusk: '2028-05-25T10:19:12.133Z',
                nauticalDawn: '2028-05-24T18:24:32.397Z',
                nauticalDusk: '2028-05-25T10:55:01.432Z',
                nightEnd: '2028-05-24T17:45:25.497Z',
                night: '2028-05-25T11:34:08.331Z',
                goldenHourEnd: '2028-05-24T20:06:28.765Z',
                goldenHour: '2028-05-25T09:13:05.064Z'
            },
            getMoonPosition: {
                azimuth: -2.295157776091264,
                altitude: -0.17532648575854087,
                distance: 382974.27907471545,
                parallacticAngle: -0.7360229399336017
            },
            getMoonIllumination: {
                fraction: 0.0023819783157487118,
                phase: 0.015541452063795369,
                angle: -2.3892897216009477
            },
            getMoonTimesUTC: {
                rise: '2028-05-24T19:37:47.688Z',
                set: '2028-05-24T09:53:14.337Z'
            },
            getMoonTimesNonUTC: {
                rise: '2028-05-24T19:37:47.688Z',
                set: '2028-05-24T09:53:14.337Z'
            }
        }
    },
    {
        input: {
            date: '2030-01-18T15:31:44.629Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 0.8462698259657268,
                altitude: 0.10979134316939725
            },
            getTimes: {
                solarNoon: '2030-01-18T12:02:01.531Z',
                nadir: '2030-01-18T00:02:01.531Z',
                sunrise: '2030-01-18T07:35:24.042Z',
                sunset: '2030-01-18T16:28:39.020Z',
                sunriseEnd: '2030-01-18T07:39:10.993Z',
                sunsetStart: '2030-01-18T16:24:52.069Z',
                dawn: '2030-01-18T06:59:59.317Z',
                dusk: '2030-01-18T17:04:03.745Z',
                nauticalDawn: '2030-01-18T06:20:58.228Z',
                nauticalDusk: '2030-01-18T17:43:04.834Z',
                nightEnd: '2030-01-18T05:43:22.564Z',
                night: '2030-01-18T18:20:40.498Z',
                goldenHourEnd: '2030-01-18T08:26:31.954Z',
                goldenHour: '2030-01-18T15:37:31.108Z'
            },
            getMoonPosition: {
                azimuth: -2.107657717770943,
                altitude: 0.018618580469749225,
                distance: 393775.50518773607,
                parallacticAngle: -0.646657766386732
            },
            getMoonIllumination: {
                fraction: 0.987654872924056,
                phase: 0.46455984992282584,
                angle: -1.639455361281639
            },
            getMoonTimesUTC: {
                rise: '2030-01-18T15:24:59.785Z',
                set: '2030-01-18T06:34:36.765Z'
            },
            getMoonTimesNonUTC: {
                rise: '2030-01-18T15:25:09.071Z',
                set: '2030-01-18T06:34:27.291Z'
            }
        }
    },
    {
        input: {
            date: '2030-01-18T15:31:44.629Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 0.8110851908211856,
                altitude: 0.09690753249129504
            },
            getTimes: {
                solarNoon: '2030-01-18T12:10:56.852Z',
                nadir: '2030-01-18T00:10:56.852Z',
                sunrise: '2030-01-18T07:54:31.126Z',
                sunset: '2030-01-18T16:27:22.578Z',
                sunriseEnd: '2030-01-18T07:58:36.154Z',
                sunsetStart: '2030-01-18T16:23:17.550Z',
                dawn: '2030-01-18T07:16:32.764Z',
                dusk: '2030-01-18T17:05:20.940Z',
                nauticalDawn: '2030-01-18T06:35:04.974Z',
                nauticalDusk: '2030-01-18T17:46:48.730Z',
                nightEnd: '2030-01-18T05:55:19.904Z',
                night: '2030-01-18T18:26:33.800Z',
                goldenHourEnd: '2030-01-18T08:50:25.579Z',
                goldenHour: '2030-01-18T15:31:28.125Z'
            },
            getMoonPosition: {
                azimuth: -2.136867386064256,
                altitude: 0.02128983383799108,
                distance: 393775.50518773607,
                parallacticAngle: -0.5942041922632129
            },
            getMoonIllumination: {
                fraction: 0.987654872924056,
                phase: 0.46455984992282584,
                angle: -1.639455361281639
            },
            getMoonTimesUTC: {
                rise: '2030-01-18T15:22:58.450Z',
                set: '2030-01-18T06:56:13.069Z'
            },
            getMoonTimesNonUTC: {
                rise: '2030-01-18T15:23:08.389Z',
                set: '2030-01-18T06:56:08.144Z'
            }
        }
    },
    {
        input: {
            date: '2030-01-18T15:31:44.629Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.6713409308907452,
                altitude: -0.680080133429514
            },
            getTimes: {
                solarNoon: '2030-01-18T07:15:21.632Z',
                nadir: '2030-01-17T19:15:21.632Z',
                sunrise: '2030-01-18T02:23:55.878Z',
                sunset: '2030-01-18T12:06:47.386Z',
                sunriseEnd: '2030-01-18T02:27:04.948Z',
                sunsetStart: '2030-01-18T12:03:38.315Z',
                dawn: '2030-01-18T01:54:02.207Z',
                dusk: '2030-01-18T12:36:41.056Z',
                nauticalDawn: '2030-01-18T01:20:29.381Z',
                nauticalDusk: '2030-01-18T13:10:13.882Z',
                nightEnd: '2030-01-18T00:47:48.932Z',
                night: '2030-01-18T13:42:54.331Z',
                goldenHourEnd: '2030-01-18T03:05:35.173Z',
                goldenHour: '2030-01-18T11:25:08.090Z'
            },
            getMoonPosition: {
                azimuth: -1.273408606662736,
                altitude: 0.8534420174144186,
                distance: 393775.50518773607,
                parallacticAngle: -0.8823764681959664
            },
            getMoonIllumination: {
                fraction: 0.987654872924056,
                phase: 0.46455984992282584,
                angle: -1.639455361281639
            },
            getMoonTimesUTC: {
                rise: '2030-01-18T10:53:10.748Z',
                set: '2030-01-18T01:11:21.600Z'
            },
            getMoonTimesNonUTC: {
                rise: '2030-01-18T10:53:19.827Z',
                set: '2030-01-18T01:11:14.055Z'
            }
        }
    },
    {
        input: {
            date: '2030-01-18T15:31:44.629Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.572309004232065,
                altitude: -1.2661304047903954
            },
            getTimes: {
                solarNoon: '2030-01-19T02:53:01.484Z',
                nadir: '2030-01-18T14:53:01.484Z',
                sunrise: '2030-01-18T21:48:43.651Z',
                sunset: '2030-01-19T07:57:19.318Z',
                sunriseEnd: '2030-01-18T21:51:37.049Z',
                sunsetStart: '2030-01-19T07:54:25.920Z',
                dawn: '2030-01-18T21:21:09.981Z',
                dusk: '2030-01-19T08:24:52.988Z',
                nauticalDawn: '2030-01-18T20:49:59.890Z',
                nauticalDusk: '2030-01-19T08:56:03.079Z',
                nightEnd: '2030-01-18T20:19:29.195Z',
                night: '2030-01-19T09:26:33.773Z',
                goldenHourEnd: '2030-01-18T22:26:37.181Z',
                goldenHour: '2030-01-19T07:19:25.787Z'
            },
            getMoonPosition: {
                azimuth: 1.0389080048806119,
                altitude: 1.120076209330641,
                distance: 393775.50518773607,
                parallacticAngle: 0.8421102670038595
            },
            getMoonIllumination: {
                fraction: 0.987654872924056,
                phase: 0.46455984992282584,
                angle: -1.639455361281639
            },
            getMoonTimesUTC: {
                rise: '2030-01-18T06:34:04.233Z',
                set: '2030-01-18T21:09:15.491Z'
            },
            getMoonTimesNonUTC: {
                rise: '2030-01-18T06:33:57.152Z',
                set: '2030-01-18T21:09:09.254Z'
            }
        }
    },
    {
        input: {
            date: '2031-06-11T21:45:18.960Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.630082010209665,
                altitude: -0.22420263386598557
            },
            getTimes: {
                solarNoon: '2031-06-11T11:51:32.111Z',
                nadir: '2031-06-10T23:51:32.111Z',
                sunrise: '2031-06-11T03:45:57.363Z',
                sunset: '2031-06-11T19:57:06.858Z',
                sunriseEnd: '2031-06-11T03:50:03.501Z',
                sunsetStart: '2031-06-11T19:53:00.720Z',
                dawn: '2031-06-11T03:03:25.278Z',
                dusk: '2031-06-11T20:39:38.943Z',
                nauticalDawn: '2031-06-11T02:02:56.541Z',
                nauticalDusk: '2031-06-11T21:40:07.680Z',
                nightEnd: null,
                night: null,
                goldenHourEnd: '2031-06-11T04:35:51.468Z',
                goldenHour: '2031-06-11T19:07:12.753Z'
            },
            getMoonPosition: {
                azimuth: -1.9409280706011012,
                altitude: -0.3120011648950862,
                distance: 374125.8452296245,
                parallacticAngle: -0.6604969710404819
            },
            getMoonIllumination: {
                fraction: 0.5314238035571819,
                phase: 0.7399908962481215,
                angle: 1.1678882754790683
            },
            getMoonTimesUTC: {
                rise: '2031-06-11T23:40:07.892Z',
                set: '2031-06-11T11:03:39.623Z'
            },
            getMoonTimesNonUTC: {
                rise: '2031-06-10T23:14:09.743Z',
                set: '2031-06-11T11:03:39.623Z'
            }
        }
    },
    {
        input: {
            date: '2031-06-11T21:45:18.960Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.6005171560299054,
                altitude: -0.1716947825394095
            },
            getTimes: {
                solarNoon: '2031-06-11T12:00:27.382Z',
                nadir: '2031-06-11T00:00:27.382Z',
                sunrise: '2031-06-11T03:41:12.046Z',
                sunset: '2031-06-11T20:19:42.717Z',
                sunriseEnd: '2031-06-11T03:45:42.191Z',
                sunsetStart: '2031-06-11T20:15:12.572Z',
                dawn: '2031-06-11T02:53:35.671Z',
                dusk: '2031-06-11T21:07:19.092Z',
                nauticalDawn: '2031-06-11T01:39:23.296Z',
                nauticalDusk: '2031-06-11T22:21:31.467Z',
                nightEnd: null,
                night: null,
                goldenHourEnd: '2031-06-11T04:35:19.172Z',
                goldenHour: '2031-06-11T19:25:35.591Z'
            },
            getMoonPosition: {
                azimuth: -1.9883338450731884,
                altitude: -0.31727695331932027,
                distance: 374125.8452296245,
                parallacticAngle: -0.6053752705620383
            },
            getMoonIllumination: {
                fraction: 0.5314238035571819,
                phase: 0.7399908962481215,
                angle: 1.1678882754790683
            },
            getMoonTimesUTC: {
                rise: '2031-06-11T23:49:03.052Z',
                set: '2031-06-11T11:11:09.870Z'
            },
            getMoonTimesNonUTC: {
                rise: '2031-06-10T23:25:59.394Z',
                set: '2031-06-11T11:11:09.870Z'
            }
        }
    },
    {
        input: {
            date: '2031-06-11T21:45:18.960Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.4725759055287675,
                altitude: -0.2789572258701393
            },
            getTimes: {
                solarNoon: '2031-06-12T07:05:05.338Z',
                nadir: '2031-06-11T19:05:05.338Z',
                sunrise: '2031-06-11T23:31:36.625Z',
                sunset: '2031-06-12T14:38:34.050Z',
                sunriseEnd: '2031-06-11T23:34:55.855Z',
                sunsetStart: '2031-06-12T14:35:14.820Z',
                dawn: '2031-06-11T22:58:13.872Z',
                dusk: '2031-06-12T15:11:56.804Z',
                nauticalDawn: '2031-06-11T22:15:38.234Z',
                nauticalDusk: '2031-06-12T15:54:32.442Z',
                nightEnd: '2031-06-11T21:25:18.493Z',
                night: '2031-06-12T16:44:52.183Z',
                goldenHourEnd: '2031-06-12T00:12:52.785Z',
                goldenHour: '2031-06-12T13:57:17.891Z'
            },
            getMoonPosition: {
                azimuth: -1.0020436844036718,
                altitude: 0.5451144114319525,
                distance: 374125.8452296245,
                parallacticAngle: -0.692844599737007
            },
            getMoonIllumination: {
                fraction: 0.5314238035571819,
                phase: 0.7399908962481215,
                angle: 1.1678882754790683
            },
            getMoonTimesUTC: {
                rise: '2031-06-11T18:47:14.560Z',
                set: '2031-06-11T06:06:03.370Z'
            },
            getMoonTimesNonUTC: {
                rise: '2031-06-11T18:47:14.560Z',
                set: '2031-06-11T06:06:03.370Z'
            }
        }
    },
    {
        input: {
            date: '2031-06-11T21:45:18.960Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.76095334727712,
                altitude: 0.4502938325195153
            },
            getTimes: {
                solarNoon: '2031-06-12T02:42:27.228Z',
                nadir: '2031-06-11T14:42:27.228Z',
                sunrise: '2031-06-11T19:24:29.849Z',
                sunset: '2031-06-12T10:00:24.607Z',
                sunriseEnd: '2031-06-11T19:27:30.993Z',
                sunsetStart: '2031-06-12T09:57:23.462Z',
                dawn: '2031-06-11T18:54:26.991Z',
                dusk: '2031-06-12T10:30:27.465Z',
                nauticalDawn: '2031-06-11T18:17:11.742Z',
                nauticalDusk: '2031-06-12T11:07:42.714Z',
                nightEnd: '2031-06-11T17:35:48.818Z',
                night: '2031-06-12T11:49:05.637Z',
                goldenHourEnd: '2031-06-11T20:02:18.783Z',
                goldenHour: '2031-06-12T09:22:35.673Z'
            },
            getMoonPosition: {
                azimuth: 0.5393492166783397,
                altitude: 0.8620288724840863,
                distance: 374125.8452296245,
                parallacticAngle: 0.43041868686426465
            },
            getMoonIllumination: {
                fraction: 0.5314238035571819,
                phase: 0.7399908962481215,
                angle: 1.1678882754790683
            },
            getMoonTimesUTC: {
                rise: '2031-06-11T14:17:35.803Z',
                set: '2031-06-11T01:33:17.985Z'
            },
            getMoonTimesNonUTC: {
                rise: '2031-06-11T14:17:35.803Z',
                set: '2031-06-11T01:33:17.985Z'
            }
        }
    },
    {
        input: {
            date: '2032-03-28T22:36:08.711Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.713762113238732,
                altitude: -0.6123848209619159
            },
            getTimes: {
                solarNoon: '2032-03-28T11:56:47.734Z',
                nadir: '2032-03-27T23:56:47.734Z',
                sunrise: '2032-03-28T05:35:23.561Z',
                sunset: '2032-03-28T18:18:11.907Z',
                sunriseEnd: '2032-03-28T05:38:38.946Z',
                sunsetStart: '2032-03-28T18:14:56.522Z',
                dawn: '2032-03-28T05:03:34.217Z',
                dusk: '2032-03-28T18:50:01.250Z',
                nauticalDawn: '2032-03-28T04:25:38.304Z',
                nauticalDusk: '2032-03-28T19:27:57.163Z',
                nightEnd: '2032-03-28T03:45:47.901Z',
                night: '2032-03-28T20:07:47.567Z',
                goldenHourEnd: '2032-03-28T06:16:59.417Z',
                goldenHour: '2032-03-28T17:36:36.050Z'
            },
            getMoonPosition: {
                azimuth: -0.732332519864725,
                altitude: 0.34518403771175465,
                distance: 388261.43696772645,
                parallacticAngle: -0.46636713441316
            },
            getMoonIllumination: {
                fraction: 0.9646105448261266,
                phase: 0.5602396642957613,
                angle: 1.9513087240100826
            },
            getMoonTimesUTC: {
                rise: '2032-03-28T20:03:12.305Z',
                set: '2032-03-28T06:02:31.831Z'
            },
            getMoonTimesNonUTC: {
                rise: '2032-03-29T21:10:59.515Z',
                set: '2032-03-29T06:32:05.759Z'
            }
        }
    },
    {
        input: {
            date: '2032-03-28T22:36:08.711Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.6820917195300202,
                altitude: -0.5599178224273954
            },
            getTimes: {
                solarNoon: '2032-03-28T12:05:42.817Z',
                nadir: '2032-03-28T00:05:42.817Z',
                sunrise: '2032-03-28T05:42:28.815Z',
                sunset: '2032-03-28T18:28:56.819Z',
                sunriseEnd: '2032-03-28T05:45:55.490Z',
                sunsetStart: '2032-03-28T18:25:30.144Z',
                dawn: '2032-03-28T05:08:46.159Z',
                dusk: '2032-03-28T19:02:39.475Z',
                nauticalDawn: '2032-03-28T04:28:22.392Z',
                nauticalDusk: '2032-03-28T19:43:03.242Z',
                nightEnd: '2032-03-28T03:45:27.997Z',
                night: '2032-03-28T20:25:57.637Z',
                goldenHourEnd: '2032-03-28T06:26:27.537Z',
                goldenHour: '2032-03-28T17:44:58.097Z'
            },
            getMoonPosition: {
                azimuth: -0.7579284937782539,
                altitude: 0.2944360332776092,
                distance: 388261.43696772645,
                parallacticAngle: -0.452642092040596
            },
            getMoonIllumination: {
                fraction: 0.9646105448261266,
                phase: 0.5602396642957613,
                angle: 1.9513087240100826
            },
            getMoonTimesUTC: {
                rise: '2032-03-28T20:18:44.006Z',
                set: '2032-03-28T06:06:45.798Z'
            },
            getMoonTimesNonUTC: {
                rise: '2032-03-29T21:28:22.852Z',
                set: '2032-03-29T06:35:02.471Z'
            }
        }
    },
    {
        input: {
            date: '2032-03-28T22:36:08.711Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.088105348526591,
                altitude: -0.4456911402227195
            },
            getTimes: {
                solarNoon: '2032-03-29T07:09:56.655Z',
                nadir: '2032-03-28T19:09:56.655Z',
                sunrise: '2032-03-29T00:51:56.499Z',
                sunset: '2032-03-29T13:27:56.810Z',
                sunriseEnd: '2032-03-29T00:54:45.977Z',
                sunsetStart: '2032-03-29T13:25:07.332Z',
                dawn: '2032-03-29T00:24:24.916Z',
                dusk: '2032-03-29T13:55:28.393Z',
                nauticalDawn: '2032-03-28T23:51:56.052Z',
                nauticalDusk: '2032-03-29T14:27:57.257Z',
                nightEnd: '2032-03-28T23:18:31.279Z',
                night: '2032-03-29T15:01:22.030Z',
                goldenHourEnd: '2032-03-29T01:28:03.067Z',
                goldenHour: '2032-03-29T12:51:50.242Z'
            },
            getMoonPosition: {
                azimuth: 0.6325035783401384,
                altitude: 0.5206378732734658,
                distance: 388261.43696772645,
                parallacticAngle: 0.47571596920828496
            },
            getMoonIllumination: {
                fraction: 0.9646105448261266,
                phase: 0.5602396642957613,
                angle: 1.9513087240100826
            },
            getMoonTimesUTC: {
                rise: '2032-03-28T14:50:55.006Z',
                set: '2032-03-28T01:19:22.571Z'
            },
            getMoonTimesNonUTC: {
                rise: '2032-03-29T15:53:34.440Z',
                set: '2032-03-29T01:54:21.562Z'
            }
        }
    },
    {
        input: {
            date: '2032-03-28T22:36:08.711Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.3256491540183037,
                altitude: 0.4189350724629859
            },
            getTimes: {
                solarNoon: '2032-03-29T02:47:24.083Z',
                nadir: '2032-03-28T14:47:24.083Z',
                sunrise: '2032-03-28T20:31:58.580Z',
                sunset: '2032-03-29T09:02:49.587Z',
                sunriseEnd: '2032-03-28T20:34:36.589Z',
                sunsetStart: '2032-03-29T09:00:11.578Z',
                dawn: '2032-03-28T20:06:20.882Z',
                dusk: '2032-03-29T09:28:27.285Z',
                nauticalDawn: '2032-03-28T19:36:14.570Z',
                nauticalDusk: '2032-03-29T09:58:33.597Z',
                nightEnd: '2032-03-28T19:05:32.095Z',
                night: '2032-03-29T10:29:16.072Z',
                goldenHourEnd: '2032-03-28T21:05:39.771Z',
                goldenHour: '2032-03-29T08:29:08.396Z'
            },
            getMoonPosition: {
                azimuth: 1.4727573803295861,
                altitude: -0.2143165420169863,
                distance: 388261.43696772645,
                parallacticAngle: 0.9724633931740848
            },
            getMoonIllumination: {
                fraction: 0.9646105448261266,
                phase: 0.5602396642957613,
                angle: 1.9513087240100826
            },
            getMoonTimesUTC: {
                rise: '2032-03-28T10:10:48.862Z',
                set: '2032-03-28T21:31:29.399Z'
            },
            getMoonTimesNonUTC: {
                rise: '2032-03-29T11:10:49.890Z'
            }
        }
    },
    {
        input: {
            date: '2032-11-18T10:22:23.429Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -0.3220599763595301,
                altitude: 0.34793244698145837
            },
            getTimes: {
                solarNoon: '2032-11-18T11:37:15.930Z',
                nadir: '2032-11-17T23:37:15.930Z',
                sunrise: '2032-11-18T07:03:27.983Z',
                sunset: '2032-11-18T16:11:03.878Z',
                sunriseEnd: '2032-11-18T07:07:10.108Z',
                sunsetStart: '2032-11-18T16:07:21.752Z',
                dawn: '2032-11-18T06:28:41.106Z',
                dusk: '2032-11-18T16:45:50.755Z',
                nauticalDawn: '2032-11-18T05:50:09.049Z',
                nauticalDusk: '2032-11-18T17:24:22.812Z',
                nightEnd: '2032-11-18T05:12:51.091Z',
                night: '2032-11-18T18:01:40.769Z',
                goldenHourEnd: '2032-11-18T07:53:13.859Z',
                goldenHour: '2032-11-18T15:21:18.002Z'
            },
            getMoonPosition: {
                azimuth: 2.5338617505437466,
                altitude: -0.2510008299549293,
                distance: 383049.4046171133,
                parallacticAngle: 0.40920959261026557
            },
            getMoonIllumination: {
                fraction: 0.979733836699192,
                phase: 0.5454688357408434,
                angle: 1.625211558427705
            },
            getMoonTimesUTC: {
                rise: '2032-11-18T17:24:04.871Z',
                set: '2032-11-18T08:15:47.912Z'
            },
            getMoonTimesNonUTC: {
                rise: '2032-11-18T17:24:15.098Z',
                set: '2032-11-18T08:15:55.252Z'
            }
        }
    },
    {
        input: {
            date: '2032-11-18T10:22:23.429Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -0.3546848820369132,
                altitude: 0.2960357508921128
            },
            getTimes: {
                solarNoon: '2032-11-18T11:46:11.214Z',
                nadir: '2032-11-17T23:46:11.214Z',
                sunrise: '2032-11-18T07:21:44.483Z',
                sunset: '2032-11-18T16:10:37.944Z',
                sunriseEnd: '2032-11-18T07:25:43.492Z',
                sunsetStart: '2032-11-18T16:06:38.936Z',
                dawn: '2032-11-18T06:44:32.256Z',
                dusk: '2032-11-18T16:47:50.171Z',
                nauticalDawn: '2032-11-18T06:03:38.432Z',
                nauticalDusk: '2032-11-18T17:28:43.995Z',
                nightEnd: '2032-11-18T05:24:13.093Z',
                night: '2032-11-18T18:08:09.334Z',
                goldenHourEnd: '2032-11-18T08:15:52.025Z',
                goldenHour: '2032-11-18T15:16:30.402Z'
            },
            getMoonPosition: {
                azimuth: 2.505549029494259,
                altitude: -0.19889239734124076,
                distance: 383049.4046171133,
                parallacticAngle: 0.4023449997601588
            },
            getMoonIllumination: {
                fraction: 0.979733836699192,
                phase: 0.5454688357408434,
                angle: 1.625211558427705
            },
            getMoonTimesUTC: {
                rise: '2032-11-18T17:22:42.531Z',
                set: '2032-11-18T08:35:49.838Z'
            },
            getMoonTimesNonUTC: {
                rise: '2032-11-18T17:22:53.030Z',
                set: '2032-11-18T08:35:40.168Z'
            }
        }
    },
    {
        input: {
            date: '2032-11-18T10:22:23.429Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 0.8856164388917003,
                altitude: 0.21422435705278164
            },
            getTimes: {
                solarNoon: '2032-11-18T06:50:37.262Z',
                nadir: '2032-11-17T18:50:37.262Z',
                sunrise: '2032-11-18T01:53:38.983Z',
                sunset: '2032-11-18T11:47:35.541Z',
                sunriseEnd: '2032-11-18T01:56:45.037Z',
                sunsetStart: '2032-11-18T11:44:29.486Z',
                dawn: '2032-11-18T01:24:10.271Z',
                dusk: '2032-11-18T12:17:04.253Z',
                nauticalDawn: '2032-11-18T00:50:58.639Z',
                nauticalDusk: '2032-11-18T12:50:15.885Z',
                nightEnd: '2032-11-18T00:18:32.924Z',
                night: '2032-11-18T13:22:41.600Z',
                goldenHourEnd: '2032-11-18T02:34:31.142Z',
                goldenHour: '2032-11-18T11:06:43.382Z'
            },
            getMoonPosition: {
                azimuth: -2.504702224385637,
                altitude: -0.3656060380830915,
                distance: 383049.4046171133,
                parallacticAngle: -0.49764824023009735
            },
            getMoonIllumination: {
                fraction: 0.979733836699192,
                phase: 0.5454688357408434,
                angle: 1.625211558427705
            },
            getMoonTimesUTC: {
                rise: '2032-11-18T12:52:40.759Z',
                set: '2032-11-18T02:52:52.377Z'
            },
            getMoonTimesNonUTC: {
                rise: '2032-11-18T12:52:49.304Z',
                set: '2032-11-18T02:52:44.505Z'
            }
        }
    },
    {
        input: {
            date: '2032-11-18T10:22:23.429Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.5684909796783384,
                altitude: -0.5984695703498872
            },
            getTimes: {
                solarNoon: '2032-11-18T02:27:58.844Z',
                nadir: '2032-11-17T14:27:58.844Z',
                sunrise: '2032-11-17T21:19:32.579Z',
                sunset: '2032-11-18T07:36:25.109Z',
                sunriseEnd: '2032-11-17T21:22:23.849Z',
                sunsetStart: '2032-11-18T07:33:33.840Z',
                dawn: '2032-11-17T20:52:16.972Z',
                dusk: '2032-11-18T08:03:40.716Z',
                nauticalDawn: '2032-11-17T20:21:23.034Z',
                nauticalDusk: '2032-11-18T08:34:34.655Z',
                nightEnd: '2032-11-17T19:51:04.363Z',
                night: '2032-11-18T09:04:53.325Z',
                goldenHourEnd: '2032-11-17T21:56:53.989Z',
                goldenHour: '2032-11-18T06:59:03.700Z'
            },
            getMoonPosition: {
                azimuth: -1.7389771284069337,
                altitude: 0.3533107904017477,
                distance: 383049.4046171133,
                parallacticAngle: -1.012442142920961
            },
            getMoonIllumination: {
                fraction: 0.979733836699192,
                phase: 0.5454688357408434,
                angle: 1.625211558427705
            },
            getMoonTimesUTC: {
                rise: '2032-11-18T08:33:39.972Z',
                set: '2032-11-18T23:04:14.090Z'
            },
            getMoonTimesNonUTC: {
                rise: '2032-11-18T08:33:31.725Z'
            }
        }
    },
    {
        input: {
            date: '2032-12-01T21:43:30.305Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.250786249227028,
                altitude: -0.9516267589013361
            },
            getTimes: {
                solarNoon: '2032-12-01T11:41:12.499Z',
                nadir: '2032-11-30T23:41:12.499Z',
                sunrise: '2032-12-01T07:21:48.572Z',
                sunset: '2032-12-01T16:00:36.426Z',
                sunriseEnd: '2032-12-01T07:25:40.842Z',
                sunsetStart: '2032-12-01T15:56:44.157Z',
                dawn: '2032-12-01T06:45:42.243Z',
                dusk: '2032-12-01T16:36:42.755Z',
                nauticalDawn: '2032-12-01T06:06:09.081Z',
                nauticalDusk: '2032-12-01T17:16:15.918Z',
                nightEnd: '2032-12-01T05:28:13.211Z',
                night: '2032-12-01T17:54:11.788Z',
                goldenHourEnd: '2032-12-01T08:14:28.058Z',
                goldenHour: '2032-12-01T15:07:56.940Z'
            },
            getMoonPosition: {
                azimuth: 2.6389517963482296,
                altitude: -0.9524487330825075,
                distance: 388390.87494473177,
                parallacticAngle: 0.33727483775157396
            },
            getMoonIllumination: {
                fraction: 0.012450505815087332,
                phase: 0.9644082808896978,
                angle: 2.0264391668397073
            },
            getMoonTimesUTC: {
                rise: '2032-12-01T05:28:17.393Z',
                set: '2032-12-01T15:21:26.117Z'
            },
            getMoonTimesNonUTC: {
                rise: '2032-12-01T05:28:24.657Z',
                set: '2032-12-01T15:21:26.274Z'
            }
        }
    },
    {
        input: {
            date: '2032-12-01T21:43:30.305Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.2480327263992472,
                altitude: -0.903187818802649
            },
            getTimes: {
                solarNoon: '2032-12-01T11:50:07.838Z',
                nadir: '2032-11-30T23:50:07.838Z',
                sunrise: '2032-12-01T07:41:50.194Z',
                sunset: '2032-12-01T15:58:25.483Z',
                sunriseEnd: '2032-12-01T07:46:01.959Z',
                sunsetStart: '2032-12-01T15:54:13.718Z',
                dawn: '2032-12-01T07:03:00.483Z',
                dusk: '2032-12-01T16:37:15.194Z',
                nauticalDawn: '2032-12-01T06:20:54.788Z',
                nauticalDusk: '2032-12-01T17:19:20.889Z',
                nightEnd: '2032-12-01T05:40:46.909Z',
                night: '2032-12-01T17:59:28.768Z',
                goldenHourEnd: '2032-12-01T08:39:46.635Z',
                goldenHour: '2032-12-01T15:00:29.042Z'
            },
            getMoonPosition: {
                azimuth: 2.610643837375619,
                altitude: -0.8999273305775148,
                distance: 388390.87494473177,
                parallacticAngle: 0.33529517956862
            },
            getMoonIllumination: {
                fraction: 0.012450505815087332,
                phase: 0.9644082808896978,
                angle: 2.0264391668397073
            },
            getMoonTimesUTC: {
                rise: '2032-12-01T05:45:22.149Z',
                set: '2032-12-01T15:22:33.034Z'
            },
            getMoonTimesNonUTC: {
                rise: '2032-12-01T05:45:14.259Z',
                set: '2032-12-01T15:22:32.887Z'
            }
        }
    },
    {
        input: {
            date: '2032-12-01T21:43:30.305Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.8250334803910064,
                altitude: -0.865575492330215
            },
            getTimes: {
                solarNoon: '2032-12-02T06:54:54.663Z',
                nadir: '2032-12-01T18:54:54.663Z',
                sunrise: '2032-12-02T02:09:00.934Z',
                sunset: '2032-12-02T11:40:48.391Z',
                sunriseEnd: '2032-12-02T02:12:13.273Z',
                sunsetStart: '2032-12-02T11:37:36.052Z',
                dawn: '2032-12-02T01:38:40.212Z',
                dusk: '2032-12-02T12:11:09.113Z',
                nauticalDawn: '2032-12-02T01:04:44.231Z',
                nauticalDusk: '2032-12-02T12:45:05.095Z',
                nightEnd: '2032-12-02T00:31:47.282Z',
                night: '2032-12-02T13:18:02.044Z',
                goldenHourEnd: '2032-12-02T02:51:31.460Z',
                goldenHour: '2032-12-02T10:58:17.865Z'
            },
            getMoonPosition: {
                azimuth: -1.7496220752242948,
                altitude: -0.6408088269021621,
                distance: 388390.87494473177,
                parallacticAngle: -0.8925529291237264
            },
            getMoonIllumination: {
                fraction: 0.012450505815087332,
                phase: 0.9644082808896978,
                angle: 2.0264391668397073
            },
            getMoonTimesUTC: {
                rise: '2032-12-01T00:10:38.732Z',
                set: '2032-12-01T10:47:10.512Z'
            },
            getMoonTimesNonUTC: {
                rise: '2032-12-01T00:10:30.162Z',
                set: '2032-12-01T10:47:00.593Z'
            }
        }
    },
    {
        input: {
            date: '2032-12-01T21:43:30.305Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.0791228801920447,
                altitude: 0.017826515075891294
            },
            getTimes: {
                solarNoon: '2032-12-02T02:32:14.496Z',
                nadir: '2032-12-01T14:32:14.496Z',
                sunrise: '2032-12-01T21:32:56.565Z',
                sunset: '2032-12-02T07:31:32.426Z',
                sunriseEnd: '2032-12-01T21:35:52.738Z',
                sunsetStart: '2032-12-02T07:28:36.253Z',
                dawn: '2032-12-01T21:04:59.308Z',
                dusk: '2032-12-02T07:59:29.683Z',
                nauticalDawn: '2032-12-01T20:33:27.954Z',
                nauticalDusk: '2032-12-02T08:31:01.037Z',
                nightEnd: '2032-12-01T20:02:41.114Z',
                night: '2032-12-02T09:01:47.878Z',
                goldenHourEnd: '2032-12-01T22:11:32.014Z',
                goldenHour: '2032-12-02T06:52:56.977Z'
            },
            getMoonPosition: {
                azimuth: -1.010850036913422,
                altitude: 0.2315969403063085,
                distance: 388390.87494473177,
                parallacticAngle: -0.8016987624015867
            },
            getMoonIllumination: {
                fraction: 0.012450505815087332,
                phase: 0.9644082808896978,
                angle: 2.0264391668397073
            },
            getMoonTimesUTC: {
                rise: '2032-12-01T20:26:58.015Z',
                set: '2032-12-01T06:25:57.709Z'
            },
            getMoonTimesNonUTC: {
                rise: '2032-12-01T20:26:46.317Z',
                set: '2032-12-01T06:25:48.484Z'
            }
        }
    },
    {
        input: {
            date: '2032-12-05T21:32:20.116Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.1696302538518717,
                altitude: -0.9300361232717473
            },
            getTimes: {
                solarNoon: '2032-12-05T11:42:46.640Z',
                nadir: '2032-12-04T23:42:46.640Z',
                sunrise: '2032-12-05T07:26:38.650Z',
                sunset: '2032-12-05T15:58:54.629Z',
                sunriseEnd: '2032-12-05T07:30:33.482Z',
                sunsetStart: '2032-12-05T15:54:59.797Z',
                dawn: '2032-12-05T06:50:12.350Z',
                dusk: '2032-12-05T16:35:20.929Z',
                nauticalDawn: '2032-12-05T06:10:23.779Z',
                nauticalDusk: '2032-12-05T17:15:09.500Z',
                nightEnd: '2032-12-05T05:32:18.036Z',
                night: '2032-12-05T17:53:15.243Z',
                goldenHourEnd: '2032-12-05T08:20:02.717Z',
                goldenHour: '2032-12-05T15:05:30.562Z'
            },
            getMoonPosition: {
                azimuth: 1.6046866304439962,
                altitude: -0.41170664425223474,
                distance: 370790.1711255773,
                parallacticAngle: 0.7566526455703207
            },
            getMoonIllumination: {
                fraction: 0.10647474114449468,
                phase: 0.10580353941881948,
                angle: -1.8382984009218213
            },
            getMoonTimesUTC: {
                rise: '2032-12-05T09:17:10.830Z',
                set: '2032-12-05T18:56:28.418Z'
            },
            getMoonTimesNonUTC: {
                rise: '2032-12-05T09:17:21.296Z',
                set: '2032-12-05T18:56:24.802Z'
            }
        }
    },
    {
        input: {
            date: '2032-12-05T21:32:20.116Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.170559347859639,
                altitude: -0.8833601697690119
            },
            getTimes: {
                solarNoon: '2032-12-05T11:51:41.992Z',
                nadir: '2032-12-04T23:51:41.992Z',
                sunrise: '2032-12-05T07:47:05.108Z',
                sunset: '2032-12-05T15:56:18.875Z',
                sunriseEnd: '2032-12-05T07:51:20.140Z',
                sunsetStart: '2032-12-05T15:52:03.843Z',
                dawn: '2032-12-05T07:07:50.629Z',
                dusk: '2032-12-05T16:35:33.355Z',
                nauticalDawn: '2032-12-05T06:25:26.675Z',
                nauticalDusk: '2032-12-05T17:17:57.308Z',
                nightEnd: '2032-12-05T05:45:07.610Z',
                night: '2032-12-05T17:58:16.373Z',
                goldenHourEnd: '2032-12-05T08:46:01.706Z',
                goldenHour: '2032-12-05T14:57:22.278Z'
            },
            getMoonPosition: {
                azimuth: 1.5944090663489685,
                altitude: -0.3854538135158901,
                distance: 370790.1711255773,
                parallacticAngle: 0.70709665675685
            },
            getMoonIllumination: {
                fraction: 0.10647474114449468,
                phase: 0.10580353941881948,
                angle: -1.8382984009218213
            },
            getMoonTimesUTC: {
                rise: '2032-12-05T09:35:54.969Z',
                set: '2032-12-05T18:57:10.442Z'
            },
            getMoonTimesNonUTC: {
                rise: '2032-12-05T09:35:55.924Z',
                set: '2032-12-05T18:57:07.371Z'
            }
        }
    },
    {
        input: {
            date: '2032-12-05T21:32:20.116Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.8635074260154483,
                altitude: -0.9120846163799265
            },
            getTimes: {
                solarNoon: '2032-12-06T06:56:30.463Z',
                nadir: '2032-12-05T18:56:30.463Z',
                sunrise: '2032-12-06T02:12:51.368Z',
                sunset: '2032-12-06T11:40:09.559Z',
                sunriseEnd: '2032-12-06T02:16:05.105Z',
                sunsetStart: '2032-12-06T11:36:55.821Z',
                dawn: '2032-12-06T01:42:19.069Z',
                dusk: '2032-12-06T12:10:41.858Z',
                nauticalDawn: '2032-12-06T01:08:13.143Z',
                nauticalDusk: '2032-12-06T12:44:47.784Z',
                nightEnd: '2032-12-06T00:35:09.015Z',
                night: '2032-12-06T13:17:51.912Z',
                goldenHourEnd: '2032-12-06T02:55:43.897Z',
                goldenHour: '2032-12-06T10:57:17.030Z'
            },
            getMoonPosition: {
                azimuth: 3.116068894421488,
                altitude: -1.1425926444640415,
                distance: 370790.1711255773,
                parallacticAngle: 0.020195055182494332
            },
            getMoonIllumination: {
                fraction: 0.10647474114449468,
                phase: 0.10580353941881948,
                angle: -1.8382984009218213
            },
            getMoonTimesUTC: {
                rise: '2032-12-05T03:57:53.516Z',
                set: '2032-12-05T14:17:25.840Z'
            },
            getMoonTimesNonUTC: {
                rise: '2032-12-05T03:57:49.272Z',
                set: '2032-12-05T14:17:25.971Z'
            }
        }
    },
    {
        input: {
            date: '2032-12-05T21:32:20.116Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.1040841045982148,
                altitude: -0.028299817913363192
            },
            getTimes: {
                solarNoon: '2032-12-06T02:33:49.923Z',
                nadir: '2032-12-05T14:33:49.923Z',
                sunrise: '2032-12-05T21:36:23.152Z',
                sunset: '2032-12-06T07:31:16.695Z',
                sunriseEnd: '2032-12-05T21:39:20.411Z',
                sunsetStart: '2032-12-06T07:28:19.436Z',
                dawn: '2032-12-05T21:08:16.661Z',
                dusk: '2032-12-06T07:59:23.186Z',
                nauticalDawn: '2032-12-05T20:36:36.946Z',
                nauticalDusk: '2032-12-06T08:31:02.901Z',
                nightEnd: '2032-12-05T20:05:43.684Z',
                night: '2032-12-06T09:01:56.163Z',
                goldenHourEnd: '2032-12-05T22:15:15.028Z',
                goldenHour: '2032-12-06T06:52:24.819Z'
            },
            getMoonPosition: {
                azimuth: -1.5740827092585266,
                altitude: -0.5103031656948916,
                distance: 370790.1711255773,
                parallacticAngle: -1.0122108832968644
            },
            getMoonIllumination: {
                fraction: 0.10647474114449468,
                phase: 0.10580353941881948,
                angle: -1.8382984009218213
            },
            getMoonTimesUTC: {
                set: '2032-12-05T09:54:59.440Z'
            },
            getMoonTimesNonUTC: {
                rise: '2032-12-04T23:15:09.284Z',
                set: '2032-12-05T09:55:04.351Z'
            }
        }
    },
    {
        input: {
            date: '2033-08-18T06:09:01.540Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.6772746328303747,
                altitude: 0.21341485956286405
            },
            getTimes: {
                solarNoon: '2033-08-18T11:55:55.806Z',
                nadir: '2033-08-17T23:55:55.806Z',
                sunrise: '2033-08-18T04:46:31.430Z',
                sunset: '2033-08-18T19:05:20.181Z',
                sunriseEnd: '2033-08-18T04:50:00.018Z',
                sunsetStart: '2033-08-18T19:01:51.594Z',
                dawn: '2033-08-18T04:11:52.497Z',
                dusk: '2033-08-18T19:39:59.114Z',
                nauticalDawn: '2033-08-18T03:28:31.624Z',
                nauticalDusk: '2033-08-18T20:23:19.987Z',
                nightEnd: '2033-08-18T02:39:03.007Z',
                night: '2033-08-18T21:12:48.604Z',
                goldenHourEnd: '2033-08-18T05:30:06.721Z',
                goldenHour: '2033-08-18T18:21:44.891Z'
            },
            getMoonPosition: {
                azimuth: -0.10756269575739433,
                altitude: 1.023219464634874,
                distance: 371310.24041580316,
                parallacticAngle: -0.07417429622942526
            },
            getMoonIllumination: {
                fraction: 0.41051940072525156,
                phase: 0.7786368289235761,
                angle: 1.3851522501867484
            },
            getMoonTimesUTC: {
                rise: '2033-08-18T23:30:48.770Z',
                set: '2033-08-18T14:10:01.914Z'
            },
            getMoonTimesNonUTC: {
                rise: '2033-08-17T22:42:01.077Z',
                set: '2033-08-18T14:10:01.914Z'
            }
        }
    },
    {
        input: {
            date: '2033-08-18T06:09:01.540Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.6970866192619916,
                altitude: 0.194021345477768
            },
            getTimes: {
                solarNoon: '2033-08-18T12:04:50.927Z',
                nadir: '2033-08-18T00:04:50.927Z',
                sunrise: '2033-08-18T04:48:40.734Z',
                sunset: '2033-08-18T19:21:01.119Z',
                sunriseEnd: '2033-08-18T04:52:23.278Z',
                sunsetStart: '2033-08-18T19:17:18.575Z',
                dawn: '2033-08-18T04:11:30.480Z',
                dusk: '2033-08-18T19:58:11.374Z',
                nauticalDawn: '2033-08-18T03:24:11.755Z',
                nauticalDusk: '2033-08-18T20:45:30.099Z',
                nightEnd: '2033-08-18T02:27:54.035Z',
                night: '2033-08-18T21:41:47.818Z',
                goldenHourEnd: '2033-08-18T05:35:00.320Z',
                goldenHour: '2033-08-18T18:34:41.534Z'
            },
            getMoonPosition: {
                azimuth: -0.16601211336640853,
                altitude: 0.9740226938636782,
                distance: 371310.24041580316,
                parallacticAngle: -0.10812422173775148
            },
            getMoonIllumination: {
                fraction: 0.41051940072525156,
                phase: 0.7786368289235761,
                angle: 1.3851522501867484
            },
            getMoonTimesUTC: {
                rise: '2033-08-18T23:30:07.309Z',
                set: '2033-08-18T14:28:58.295Z'
            },
            getMoonTimesNonUTC: {
                rise: '2033-08-17T22:42:15.226Z',
                set: '2033-08-18T14:28:58.295Z'
            }
        }
    },
    {
        input: {
            date: '2033-08-18T06:09:01.540Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -0.5116461342982579,
                altitude: 1.0399202330678181
            },
            getTimes: {
                solarNoon: '2033-08-18T07:09:22.329Z',
                nadir: '2033-08-17T19:09:22.329Z',
                sunrise: '2033-08-18T00:16:25.093Z',
                sunset: '2033-08-18T14:02:19.566Z',
                sunriseEnd: '2033-08-18T00:19:22.840Z',
                sunsetStart: '2033-08-18T13:59:21.819Z',
                dawn: '2033-08-17T23:47:12.506Z',
                dusk: '2033-08-18T14:31:32.152Z',
                nauticalDawn: '2033-08-17T23:11:47.933Z',
                nauticalDusk: '2033-08-18T15:06:56.726Z',
                nightEnd: '2033-08-17T22:33:53.552Z',
                night: '2033-08-18T15:44:51.106Z',
                goldenHourEnd: '2033-08-18T00:53:51.310Z',
                goldenHour: '2033-08-18T13:24:53.349Z'
            },
            getMoonPosition: {
                azimuth: 1.569664036019769,
                altitude: 0.4834842950194886,
                distance: 371310.24041580316,
                parallacticAngle: 0.9193014551718725
            },
            getMoonIllumination: {
                fraction: 0.41051940072525156,
                phase: 0.7786368289235761,
                angle: 1.3851522501867484
            },
            getMoonTimesUTC: {
                rise: '2033-08-18T18:57:02.916Z',
                set: '2033-08-18T08:47:35.043Z'
            },
            getMoonTimesNonUTC: {
                rise: '2033-08-18T18:57:02.916Z',
                set: '2033-08-18T08:47:35.043Z'
            }
        }
    },
    {
        input: {
            date: '2033-08-18T06:09:01.540Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.3457458803833942,
                altitude: 0.6837665787466456
            },
            getTimes: {
                solarNoon: '2033-08-18T02:46:48.623Z',
                nadir: '2033-08-17T14:46:48.623Z',
                sunrise: '2033-08-17T20:01:55.859Z',
                sunset: '2033-08-18T09:31:41.386Z',
                sunriseEnd: '2033-08-17T20:04:40.542Z',
                sunsetStart: '2033-08-18T09:28:56.703Z',
                dawn: '2033-08-17T19:34:58.743Z',
                dusk: '2033-08-18T09:58:38.502Z',
                nauticalDawn: '2033-08-17T19:02:40.383Z',
                nauticalDusk: '2033-08-18T10:30:56.862Z',
                nightEnd: '2033-08-17T18:28:46.386Z',
                night: '2033-08-18T11:04:50.859Z',
                goldenHourEnd: '2033-08-17T20:36:43.584Z',
                goldenHour: '2033-08-18T08:56:53.661Z'
            },
            getMoonPosition: {
                azimuth: 2.3142453903834013,
                altitude: -0.3610934940750097,
                distance: 371310.24041580316,
                parallacticAngle: 0.6781408540288107
            },
            getMoonIllumination: {
                fraction: 0.41051940072525156,
                phase: 0.7786368289235761,
                angle: 1.3851522501867484
            },
            getMoonTimesUTC: {
                rise: '2033-08-18T14:37:32.307Z',
                set: '2033-08-18T04:02:20.208Z'
            },
            getMoonTimesNonUTC: {
                rise: '2033-08-18T14:37:32.307Z',
                set: '2033-08-18T04:02:20.208Z'
            }
        }
    },
    {
        input: {
            date: '2035-04-16T12:49:34.264Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 0.3937195891692079,
                altitude: 0.8587361594162083
            },
            getTimes: {
                solarNoon: '2035-04-16T11:51:37.012Z',
                nadir: '2035-04-15T23:51:37.012Z',
                sunrise: '2035-04-16T04:57:51.667Z',
                sunset: '2035-04-16T18:45:22.357Z',
                sunriseEnd: '2035-04-16T05:01:14.212Z',
                sunsetStart: '2035-04-16T18:41:59.812Z',
                dawn: '2035-04-16T04:24:27.501Z',
                dusk: '2035-04-16T19:18:46.523Z',
                nauticalDawn: '2035-04-16T03:43:26.763Z',
                nauticalDusk: '2035-04-16T19:59:47.261Z',
                nightEnd: '2035-04-16T02:58:16.130Z',
                night: '2035-04-16T20:44:57.894Z',
                goldenHourEnd: '2035-04-16T05:40:27.652Z',
                goldenHour: '2035-04-16T18:02:46.372Z'
            },
            getMoonPosition: {
                azimuth: -1.8238119827883101,
                altitude: 0.10389745229548533,
                distance: 371593.6035373259,
                parallacticAngle: -0.7158751979000086
            },
            getMoonIllumination: {
                fraction: 0.6586575280535638,
                phase: 0.3013906342497825,
                angle: -1.2975575599676326
            },
            getMoonTimesUTC: {
                rise: '2035-04-16T12:08:34.188Z',
                set: '2035-04-16T02:08:22.093Z'
            },
            getMoonTimesNonUTC: {
                rise: '2035-04-16T12:08:34.188Z',
                set: '2035-04-16T02:08:22.093Z'
            }
        }
    },
    {
        input: {
            date: '2035-04-16T12:49:34.264Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 0.3196061004003581,
                altitude: 0.8240933407412933
            },
            getTimes: {
                solarNoon: '2035-04-16T12:00:32.124Z',
                nadir: '2035-04-16T00:00:32.124Z',
                sunrise: '2035-04-16T05:01:39.792Z',
                sunset: '2035-04-16T18:59:24.456Z',
                sunriseEnd: '2035-04-16T05:05:15.034Z',
                sunsetStart: '2035-04-16T18:55:49.214Z',
                dawn: '2035-04-16T04:26:01.757Z',
                dusk: '2035-04-16T19:35:02.492Z',
                nauticalDawn: '2035-04-16T03:41:45.157Z',
                nauticalDusk: '2035-04-16T20:19:19.091Z',
                nightEnd: '2035-04-16T02:51:41.862Z',
                night: '2035-04-16T21:09:22.387Z',
                goldenHourEnd: '2035-04-16T05:46:48.961Z',
                goldenHour: '2035-04-16T18:14:15.288Z'
            },
            getMoonPosition: {
                azimuth: -1.8488142945323038,
                altitude: 0.09223106791549496,
                distance: 371593.6035373259,
                parallacticAngle: -0.664477151914145
            },
            getMoonIllumination: {
                fraction: 0.6586575280535638,
                phase: 0.3013906342497825,
                angle: -1.2975575599676326
            },
            getMoonTimesUTC: {
                rise: '2035-04-16T12:10:48.096Z',
                set: '2035-04-16T02:25:00.040Z'
            },
            getMoonTimesNonUTC: {
                rise: '2035-04-16T12:10:48.096Z',
                set: '2035-04-16T02:25:00.040Z'
            }
        }
    },
    {
        input: {
            date: '2035-04-16T12:49:34.264Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.6628120497726973,
                altitude: 0.16046389785023848
            },
            getTimes: {
                solarNoon: '2035-04-16T07:05:03.842Z',
                nadir: '2035-04-15T19:05:03.842Z',
                sunrise: '2035-04-16T00:24:12.277Z',
                sunset: '2035-04-16T13:45:55.408Z',
                sunriseEnd: '2035-04-16T00:27:06.113Z',
                sunsetStart: '2035-04-16T13:43:01.572Z',
                dawn: '2035-04-15T23:55:45.757Z',
                dusk: '2035-04-16T14:14:21.928Z',
                nauticalDawn: '2035-04-15T23:21:38.578Z',
                nauticalDusk: '2035-04-16T14:48:29.107Z',
                nightEnd: '2035-04-15T22:45:42.615Z',
                night: '2035-04-16T15:24:25.070Z',
                goldenHourEnd: '2035-04-16T01:00:58.216Z',
                goldenHour: '2035-04-16T13:09:09.469Z'
            },
            getMoonPosition: {
                azimuth: -0.8207401469727822,
                altitude: 0.9628935388238934,
                distance: 371593.6035373259,
                parallacticAngle: -0.6081095888490309
            },
            getMoonIllumination: {
                fraction: 0.6586575280535638,
                phase: 0.3013906342497825,
                angle: -1.2975575599676326
            },
            getMoonTimesUTC: {
                rise: '2035-04-16T07:26:47.885Z',
                set: '2035-04-16T21:36:40.036Z'
            },
            getMoonTimesNonUTC: {
                rise: '2035-04-16T07:26:47.885Z',
                set: '2035-04-16T21:36:40.036Z'
            }
        }
    },
    {
        input: {
            date: '2035-04-16T12:49:34.264Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.522364129698277,
                altitude: -0.6509110335970829
            },
            getTimes: {
                solarNoon: '2035-04-16T02:42:30.450Z',
                nadir: '2035-04-15T14:42:30.450Z',
                sunrise: '2035-04-15T20:08:02.540Z',
                sunset: '2035-04-16T09:16:58.361Z',
                sunriseEnd: '2035-04-15T20:10:44.001Z',
                sunsetStart: '2035-04-16T09:14:16.900Z',
                dawn: '2035-04-15T19:41:42.435Z',
                dusk: '2035-04-16T09:43:18.466Z',
                nauticalDawn: '2035-04-15T19:10:23.279Z',
                nauticalDusk: '2035-04-16T10:14:37.622Z',
                nightEnd: '2035-04-15T18:37:54.046Z',
                night: '2035-04-16T10:47:06.855Z',
                goldenHourEnd: '2035-04-15T20:42:16.144Z',
                goldenHour: '2035-04-16T08:42:44.757Z'
            },
            getMoonPosition: {
                azimuth: 1.2078805971905244,
                altitude: 0.8375743763624361,
                distance: 371593.6035373259,
                parallacticAngle: 0.8984432805078891
            },
            getMoonIllumination: {
                fraction: 0.6586575280535638,
                phase: 0.3013906342497825,
                angle: -1.2975575599676326
            },
            getMoonTimesUTC: {
                rise: '2035-04-16T03:00:46.972Z',
                set: '2035-04-16T16:59:07.252Z'
            },
            getMoonTimesNonUTC: {
                rise: '2035-04-16T03:00:46.972Z',
                set: '2035-04-16T16:59:07.252Z'
            }
        }
    },
    {
        input: {
            date: '2035-11-20T08:56:14.227Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -0.6698075139261557,
                altitude: 0.22538441535865597
            },
            getTimes: {
                solarNoon: '2035-11-20T11:37:32.978Z',
                nadir: '2035-11-19T23:37:32.978Z',
                sunrise: '2035-11-20T07:05:18.893Z',
                sunset: '2035-11-20T16:09:47.062Z',
                sunriseEnd: '2035-11-20T07:09:02.033Z',
                sunsetStart: '2035-11-20T16:06:03.922Z',
                dawn: '2035-11-20T06:30:24.053Z',
                dusk: '2035-11-20T16:44:41.902Z',
                nauticalDawn: '2035-11-20T05:51:45.908Z',
                nauticalDusk: '2035-11-20T17:23:20.047Z',
                nightEnd: '2035-11-20T05:14:24.297Z',
                night: '2035-11-20T18:00:41.658Z',
                goldenHourEnd: '2035-11-20T07:55:21.944Z',
                goldenHour: '2035-11-20T15:19:44.011Z'
            },
            getMoonPosition: {
                azimuth: 1.5406828706987854,
                altitude: 0.4314564096806294,
                distance: 364921.8907643736,
                parallacticAngle: 0.7596863755691715
            },
            getMoonIllumination: {
                fraction: 0.718664364670613,
                phase: 0.6779623128555754,
                angle: 1.8121067797460106
            },
            getMoonTimesUTC: {
                rise: '2035-11-20T21:18:52.333Z',
                set: '2035-11-20T11:38:01.770Z'
            },
            getMoonTimesNonUTC: {
                rise: '2035-11-20T21:19:03.893Z',
                set: '2035-11-20T11:38:13.275Z'
            }
        }
    },
    {
        input: {
            date: '2035-11-20T08:56:14.227Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -0.6977077533345015,
                altitude: 0.17378843132885177
            },
            getTimes: {
                solarNoon: '2035-11-20T11:46:28.267Z',
                nadir: '2035-11-19T23:46:28.267Z',
                sunrise: '2035-11-20T07:23:46.493Z',
                sunset: '2035-11-20T16:09:10.041Z',
                sunriseEnd: '2035-11-20T07:27:46.765Z',
                sunsetStart: '2035-11-20T16:05:09.769Z',
                dawn: '2035-11-20T06:46:24.571Z',
                dusk: '2035-11-20T16:46:31.963Z',
                nauticalDawn: '2035-11-20T06:05:23.627Z',
                nauticalDusk: '2035-11-20T17:27:32.907Z',
                nightEnd: '2035-11-20T05:25:54.225Z',
                night: '2035-11-20T18:07:02.309Z',
                goldenHourEnd: '2035-11-20T08:18:16.319Z',
                goldenHour: '2035-11-20T15:14:40.215Z'
            },
            getMoonPosition: {
                azimuth: 1.4882651969138763,
                altitude: 0.4537123744836863,
                distance: 364921.8907643736,
                parallacticAngle: 0.707055594489398
            },
            getMoonIllumination: {
                fraction: 0.718664364670613,
                phase: 0.6779623128555754,
                angle: 1.8121067797460106
            },
            getMoonTimesUTC: {
                rise: '2035-11-20T21:19:50.662Z',
                set: '2035-11-20T11:56:53.704Z'
            },
            getMoonTimesNonUTC: {
                rise: '2035-11-20T21:20:01.859Z',
                set: '2035-11-20T11:56:57.648Z'
            }
        }
    },
    {
        input: {
            date: '2035-11-20T08:56:14.227Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 0.5676658304139498,
                altitude: 0.400182740499816
            },
            getTimes: {
                solarNoon: '2035-11-20T06:50:54.120Z',
                nadir: '2035-11-19T18:50:54.120Z',
                sunrise: '2035-11-20T01:55:04.209Z',
                sunset: '2035-11-20T11:46:44.031Z',
                sunriseEnd: '2035-11-20T01:58:10.863Z',
                sunsetStart: '2035-11-20T11:43:37.377Z',
                dawn: '2035-11-20T01:25:30.540Z',
                dusk: '2035-11-20T12:16:17.701Z',
                nauticalDawn: '2035-11-20T00:52:14.716Z',
                nauticalDusk: '2035-11-20T12:49:33.524Z',
                nightEnd: '2035-11-20T00:19:46.123Z',
                night: '2035-11-20T13:22:02.118Z',
                goldenHourEnd: '2035-11-20T02:36:05.727Z',
                goldenHour: '2035-11-20T11:05:42.513Z'
            },
            getMoonPosition: {
                azimuth: 2.4793469750822386,
                altitude: -0.3917297440404234,
                distance: 364921.8907643736,
                parallacticAngle: 0.509840701842614
            },
            getMoonIllumination: {
                fraction: 0.718664364670613,
                phase: 0.6779623128555754,
                angle: 1.8121067797460106
            },
            getMoonTimesUTC: {
                rise: '2035-11-20T16:39:44.629Z',
                set: '2035-11-20T06:19:27.257Z'
            },
            getMoonTimesNonUTC: {
                rise: '2035-11-20T16:39:43.286Z',
                set: '2035-11-20T06:19:26.373Z'
            }
        }
    },
    {
        input: {
            date: '2035-11-20T08:56:14.227Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.3584775145445886,
                altitude: -0.2973646276881417
            },
            getTimes: {
                solarNoon: '2035-11-20T02:28:15.529Z',
                nadir: '2035-11-19T14:28:15.529Z',
                sunrise: '2035-11-19T21:20:45.714Z',
                sunset: '2035-11-20T07:35:45.344Z',
                sunriseEnd: '2035-11-19T21:23:37.454Z',
                sunsetStart: '2035-11-20T07:32:53.604Z',
                dawn: '2035-11-19T20:53:26.120Z',
                dusk: '2035-11-20T08:03:04.937Z',
                nauticalDawn: '2035-11-19T20:22:28.630Z',
                nauticalDusk: '2035-11-20T08:34:02.428Z',
                nightEnd: '2035-11-19T19:52:07.338Z',
                night: '2035-11-20T09:04:23.720Z',
                goldenHourEnd: '2035-11-19T21:58:14.218Z',
                goldenHour: '2035-11-20T06:58:16.840Z'
            },
            getMoonPosition: {
                azimuth: -2.570218606580188,
                altitude: -0.5196130384323479,
                distance: 364921.8907643736,
                parallacticAngle: -0.4780064014607186
            },
            getMoonIllumination: {
                fraction: 0.718664364670613,
                phase: 0.6779623128555754,
                angle: 1.8121067797460106
            },
            getMoonTimesUTC: {
                rise: '2035-11-20T12:15:06.652Z',
                set: '2035-11-20T01:36:18.347Z'
            },
            getMoonTimesNonUTC: {
                rise: '2035-11-20T12:14:53.777Z',
                set: '2035-11-20T01:36:31.972Z'
            }
        }
    },
    {
        input: {
            date: '2035-11-30T09:22:45.244Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -0.5648776408006244,
                altitude: 0.23271643645936038
            },
            getTimes: {
                solarNoon: '2035-11-30T11:40:33.488Z',
                nadir: '2035-11-29T23:40:33.488Z',
                sunrise: '2035-11-30T07:19:30.811Z',
                sunset: '2035-11-30T16:01:36.164Z',
                sunriseEnd: '2035-11-30T07:23:21.827Z',
                sunsetStart: '2035-11-30T15:57:45.148Z',
                dawn: '2035-11-30T06:43:34.269Z',
                dusk: '2035-11-30T16:37:32.706Z',
                nauticalDawn: '2035-11-30T06:04:08.658Z',
                nauticalDusk: '2035-11-30T17:16:58.317Z',
                nightEnd: '2035-11-30T05:26:17.593Z',
                night: '2035-11-30T17:54:49.383Z',
                goldenHourEnd: '2035-11-30T08:11:48.603Z',
                goldenHour: '2035-11-30T15:09:18.372Z'
            },
            getMoonPosition: {
                azimuth: -0.7298658609056833,
                altitude: 0.2351829646042963,
                distance: 402543.23869873,
                parallacticAngle: -0.4783508704187181
            },
            getMoonIllumination: {
                fraction: 0.006461691869612707,
                phase: 0.025614865189525382,
                angle: -2.0379430387244986
            },
            getMoonTimesUTC: {
                rise: '2035-11-30T07:33:56.150Z',
                set: '2035-11-30T17:03:40.272Z'
            },
            getMoonTimesNonUTC: {
                rise: '2035-11-30T07:33:59.261Z',
                set: '2035-11-30T17:03:32.590Z'
            }
        }
    },
    {
        input: {
            date: '2035-11-30T09:22:45.244Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -0.5938442659927382,
                altitude: 0.18037127562719787
            },
            getTimes: {
                solarNoon: '2035-11-30T11:49:28.820Z',
                nadir: '2035-11-29T23:49:28.820Z',
                sunrise: '2035-11-30T07:39:20.063Z',
                sunset: '2035-11-30T15:59:37.577Z',
                sunriseEnd: '2035-11-30T07:43:30.237Z',
                sunsetStart: '2035-11-30T15:55:27.403Z',
                dawn: '2035-11-30T07:00:42.452Z',
                dusk: '2035-11-30T16:38:15.188Z',
                nauticalDawn: '2035-11-30T06:18:45.686Z',
                nauticalDusk: '2035-11-30T17:20:11.955Z',
                nightEnd: '2035-11-30T05:38:43.236Z',
                night: '2035-11-30T18:00:14.404Z',
                goldenHourEnd: '2035-11-30T08:36:47.443Z',
                goldenHour: '2035-11-30T15:02:10.197Z'
            },
            getMoonPosition: {
                azimuth: -0.7570261139940188,
                altitude: 0.18458063658210483,
                distance: 402543.23869873,
                parallacticAngle: -0.4651170009204416
            },
            getMoonIllumination: {
                fraction: 0.006461691869612707,
                phase: 0.025614865189525382,
                angle: -2.0379430387244986
            },
            getMoonTimesUTC: {
                rise: '2035-11-30T07:51:53.081Z',
                set: '2035-11-30T17:03:38.811Z'
            },
            getMoonTimesNonUTC: {
                rise: '2035-11-30T07:51:41.585Z',
                set: '2035-11-30T17:03:30.466Z'
            }
        }
    },
    {
        input: {
            date: '2035-11-30T09:22:45.244Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 0.6419742120954233,
                altitude: 0.32486912048109534
            },
            getTimes: {
                solarNoon: '2035-11-30T06:53:53.241Z',
                nadir: '2035-11-29T18:53:53.241Z',
                sunrise: '2035-11-30T02:06:10.298Z',
                sunset: '2035-11-30T11:41:36.184Z',
                sunriseEnd: '2035-11-30T02:09:21.533Z',
                sunsetStart: '2035-11-30T11:38:24.948Z',
                dawn: '2035-11-30T01:35:58.709Z',
                dusk: '2035-11-30T12:11:47.773Z',
                nauticalDawn: '2035-11-30T01:02:10.561Z',
                nauticalDusk: '2035-11-30T12:45:35.920Z',
                nightEnd: '2035-11-30T00:29:19.231Z',
                night: '2035-11-30T13:18:27.251Z',
                goldenHourEnd: '2035-11-30T02:48:23.502Z',
                goldenHour: '2035-11-30T10:59:22.980Z'
            },
            getMoonPosition: {
                azimuth: 0.5349118140322605,
                altitude: 0.4518200436651341,
                distance: 402543.23869873,
                parallacticAngle: 0.4174163454123616
            },
            getMoonIllumination: {
                fraction: 0.006461691869612707,
                phase: 0.025614865189525382,
                angle: -2.0379430387244986
            },
            getMoonTimesUTC: {
                rise: '2035-11-30T02:14:04.465Z',
                set: '2035-11-30T12:30:45.589Z'
            },
            getMoonTimesNonUTC: {
                rise: '2035-11-30T02:13:54.563Z',
                set: '2035-11-30T12:30:36.305Z'
            }
        }
    },
    {
        input: {
            date: '2035-11-30T09:22:45.244Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.3809101674446242,
                altitude: -0.3976219520805522
            },
            getTimes: {
                solarNoon: '2035-11-30T02:31:13.371Z',
                nadir: '2035-11-29T14:31:13.371Z',
                sunrise: '2035-11-29T21:30:25.339Z',
                sunset: '2035-11-30T07:32:01.402Z',
                sunriseEnd: '2035-11-29T21:33:20.655Z',
                sunsetStart: '2035-11-30T07:29:06.087Z',
                dawn: '2035-11-29T21:02:35.373Z',
                dusk: '2035-11-30T07:59:51.369Z',
                nauticalDawn: '2035-11-29T20:31:10.606Z',
                nauticalDusk: '2035-11-30T08:31:16.135Z',
                nightEnd: '2035-11-29T20:00:28.799Z',
                night: '2035-11-30T09:01:57.942Z',
                goldenHourEnd: '2035-11-29T22:08:47.828Z',
                goldenHour: '2035-11-30T06:53:38.913Z'
            },
            getMoonPosition: {
                azimuth: 1.3604682734133453,
                altitude: -0.22983899248725737,
                distance: 402543.23869873,
                parallacticAngle: 0.9854582534838623
            },
            getMoonIllumination: {
                fraction: 0.006461691869612707,
                phase: 0.025614865189525382,
                angle: -2.0379430387244986
            },
            getMoonTimesUTC: {
                rise: '2035-11-30T22:23:46.205Z',
                set: '2035-11-30T08:11:26.378Z'
            },
            getMoonTimesNonUTC: {
                rise: '2035-11-30T22:23:34.257Z',
                set: '2035-11-30T08:11:29.070Z'
            }
        }
    },
    {
        input: {
            date: '2036-03-28T22:19:25.344Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.6298892312825126,
                altitude: -0.591129324503812
            },
            getTimes: {
                solarNoon: '2036-03-28T11:56:48.461Z',
                nadir: '2036-03-27T23:56:48.461Z',
                sunrise: '2036-03-28T05:35:28.456Z',
                sunset: '2036-03-28T18:18:08.465Z',
                sunriseEnd: '2036-03-28T05:38:43.833Z',
                sunsetStart: '2036-03-28T18:14:53.088Z',
                dawn: '2036-03-28T05:03:39.236Z',
                dusk: '2036-03-28T18:49:57.685Z',
                nauticalDawn: '2036-03-28T04:25:43.595Z',
                nauticalDusk: '2036-03-28T19:27:53.327Z',
                nightEnd: '2036-03-28T03:45:53.666Z',
                night: '2036-03-28T20:07:43.256Z',
                goldenHourEnd: '2036-03-28T06:17:04.275Z',
                goldenHour: '2036-03-28T17:36:32.646Z'
            },
            getMoonPosition: {
                azimuth: 2.388483126026601,
                altitude: -0.48533580014513467,
                distance: 385427.74368857965,
                parallacticAngle: 0.467901412869974
            },
            getMoonIllumination: {
                fraction: 0.01303377520662613,
                phase: 0.036419434492320324,
                angle: -1.6035266918272173
            },
            getMoonTimesUTC: {
                rise: '2036-03-28T06:12:12.239Z',
                set: '2036-03-28T18:58:08.470Z'
            },
            getMoonTimesNonUTC: {
                rise: '2036-03-28T06:12:02.179Z',
                set: '2036-03-28T18:58:06.381Z'
            }
        }
    },
    {
        input: {
            date: '2036-03-28T22:19:25.344Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.601044594178962,
                altitude: -0.5386211871724672
            },
            getTimes: {
                solarNoon: '2036-03-28T12:05:43.544Z',
                nadir: '2036-03-28T00:05:43.544Z',
                sunrise: '2036-03-28T05:42:34.124Z',
                sunset: '2036-03-28T18:28:52.963Z',
                sunriseEnd: '2036-03-28T05:46:00.790Z',
                sunsetStart: '2036-03-28T18:25:26.298Z',
                dawn: '2036-03-28T05:08:51.618Z',
                dusk: '2036-03-28T19:02:35.469Z',
                nauticalDawn: '2036-03-28T04:28:28.189Z',
                nauticalDusk: '2036-03-28T19:42:58.898Z',
                nightEnd: '2036-03-28T03:45:34.406Z',
                night: '2036-03-28T20:25:52.682Z',
                goldenHourEnd: '2036-03-28T06:26:32.804Z',
                goldenHour: '2036-03-28T17:44:54.284Z'
            },
            getMoonPosition: {
                azimuth: 2.365677605131352,
                altitude: -0.4347049212473255,
                distance: 385427.74368857965,
                parallacticAngle: 0.45219221978925744
            },
            getMoonIllumination: {
                fraction: 0.01303377520662613,
                phase: 0.036419434492320324,
                angle: -1.6035266918272173
            },
            getMoonTimesUTC: {
                rise: '2036-03-28T06:21:04.717Z',
                set: '2036-03-28T19:08:35.889Z'
            },
            getMoonTimesNonUTC: {
                rise: '2036-03-28T06:20:53.545Z',
                set: '2036-03-28T19:08:25.556Z'
            }
        }
    },
    {
        input: {
            date: '2036-03-28T22:19:25.344Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.149626583154177,
                altitude: -0.4928201130313104
            },
            getTimes: {
                solarNoon: '2036-03-29T07:09:57.379Z',
                nadir: '2036-03-28T19:09:57.379Z',
                sunrise: '2036-03-29T00:52:00.351Z',
                sunset: '2036-03-29T13:27:54.408Z',
                sunriseEnd: '2036-03-29T00:54:49.823Z',
                sunsetStart: '2036-03-29T13:25:04.935Z',
                dawn: '2036-03-29T00:24:28.846Z',
                dusk: '2036-03-29T13:55:25.912Z',
                nauticalDawn: '2036-03-28T23:52:00.142Z',
                nauticalDusk: '2036-03-29T14:27:54.616Z',
                nightEnd: '2036-03-28T23:18:35.623Z',
                night: '2036-03-29T15:01:19.135Z',
                goldenHourEnd: '2036-03-29T01:28:06.885Z',
                goldenHour: '2036-03-29T12:51:47.874Z'
            },
            getMoonPosition: {
                azimuth: -2.3740120597413688,
                altitude: -0.6105269814224411,
                distance: 385427.74368857965,
                parallacticAngle: -0.555668536041232
            },
            getMoonIllumination: {
                fraction: 0.01303377520662613,
                phase: 0.036419434492320324,
                angle: -1.6035266918272173
            },
            getMoonTimesUTC: {
                rise: '2036-03-28T01:20:52.732Z',
                set: '2036-03-28T13:54:46.233Z'
            },
            getMoonTimesNonUTC: {
                rise: '2036-03-28T01:21:06.006Z',
                set: '2036-03-28T13:54:51.723Z'
            }
        }
    },
    {
        input: {
            date: '2036-03-28T22:19:25.344Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.372927571930645,
                altitude: 0.3613183537907974
            },
            getTimes: {
                solarNoon: '2036-03-29T02:47:24.808Z',
                nadir: '2036-03-28T14:47:24.808Z',
                sunrise: '2036-03-28T20:32:01.912Z',
                sunset: '2036-03-29T09:02:47.705Z',
                sunriseEnd: '2036-03-28T20:34:39.917Z',
                sunsetStart: '2036-03-29T09:00:09.700Z',
                dawn: '2036-03-28T20:06:24.274Z',
                dusk: '2036-03-29T09:28:25.342Z',
                nauticalDawn: '2036-03-28T19:36:18.079Z',
                nauticalDusk: '2036-03-29T09:58:31.537Z',
                nightEnd: '2036-03-28T19:05:35.786Z',
                night: '2036-03-29T10:29:13.831Z',
                goldenHourEnd: '2036-03-28T21:05:43.075Z',
                goldenHour: '2036-03-29T08:29:06.542Z'
            },
            getMoonPosition: {
                azimuth: -1.5206228601366945,
                altitude: 0.18415005017573463,
                distance: 385427.74368857965,
                parallacticAngle: -0.9495113864855935
            },
            getMoonIllumination: {
                fraction: 0.01303377520662613,
                phase: 0.036419434492320324,
                angle: -1.6035266918272173
            },
            getMoonTimesUTC: {
                rise: '2036-03-28T21:25:29.679Z',
                set: '2036-03-28T09:19:00.350Z'
            },
            getMoonTimesNonUTC: {
                rise: '2036-03-28T21:25:43.987Z',
                set: '2036-03-28T09:19:04.643Z'
            }
        }
    },
    {
        input: {
            date: '2037-10-23T08:32:21.434Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -0.8265891505621243,
                altitude: 0.3077581699908558
            },
            getTimes: {
                solarNoon: '2037-10-23T11:36:05.991Z',
                nadir: '2037-10-22T23:36:05.991Z',
                sunrise: '2037-10-23T06:21:56.421Z',
                sunset: '2037-10-23T16:50:15.562Z',
                sunriseEnd: '2037-10-23T06:25:19.044Z',
                sunsetStart: '2037-10-23T16:46:52.939Z',
                dawn: '2037-10-23T05:49:40.983Z',
                dusk: '2037-10-23T17:22:31.000Z',
                nauticalDawn: '2037-10-23T05:12:56.454Z',
                nauticalDusk: '2037-10-23T17:59:15.529Z',
                nightEnd: '2037-10-23T04:36:26.788Z',
                night: '2037-10-23T18:35:45.194Z',
                goldenHourEnd: '2037-10-23T07:06:15.364Z',
                goldenHour: '2037-10-23T16:05:56.619Z'
            },
            getMoonPosition: {
                azimuth: 2.3552182504382535,
                altitude: -0.4824189821603715,
                distance: 404565.16146483796,
                parallacticAngle: 0.48528398259766165
            },
            getMoonIllumination: {
                fraction: 0.9913479883508903,
                phase: 0.4703491652238597,
                angle: -2.4485094650470733
            },
            getMoonTimesUTC: {
                rise: '2037-10-23T16:57:28.521Z',
                set: '2037-10-23T05:14:37.002Z'
            },
            getMoonTimesNonUTC: {
                rise: '2037-10-23T16:57:28.521Z',
                set: '2037-10-23T05:14:37.002Z'
            }
        }
    },
    {
        input: {
            date: '2037-10-23T08:32:21.434Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -0.8513278575155404,
                altitude: 0.25830984923657574
            },
            getTimes: {
                solarNoon: '2037-10-23T11:45:01.142Z',
                nadir: '2037-10-22T23:45:01.142Z',
                sunrise: '2037-10-23T06:35:46.501Z',
                sunset: '2037-10-23T16:54:15.783Z',
                sunriseEnd: '2037-10-23T06:39:21.730Z',
                sunsetStart: '2037-10-23T16:50:40.554Z',
                dawn: '2037-10-23T06:01:35.495Z',
                dusk: '2037-10-23T17:28:26.789Z',
                nauticalDawn: '2037-10-23T05:22:45.203Z',
                nauticalDusk: '2037-10-23T18:07:17.080Z',
                nightEnd: '2037-10-23T04:44:10.017Z',
                night: '2037-10-23T18:45:52.267Z',
                goldenHourEnd: '2037-10-23T07:23:03.080Z',
                goldenHour: '2037-10-23T16:06:59.204Z'
            },
            getMoonPosition: {
                azimuth: 2.3331985767532175,
                altitude: -0.4322759088056171,
                distance: 404565.16146483796,
                parallacticAngle: 0.46774216884783826
            },
            getMoonIllumination: {
                fraction: 0.9913479883508903,
                phase: 0.4703491652238597,
                angle: -2.4485094650470733
            },
            getMoonTimesUTC: {
                rise: '2037-10-23T17:04:21.877Z',
                set: '2037-10-23T05:25:07.387Z'
            },
            getMoonTimesNonUTC: {
                rise: '2037-10-23T17:04:21.877Z',
                set: '2037-10-23T05:25:07.387Z'
            }
        }
    },
    {
        input: {
            date: '2037-10-23T08:32:21.434Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 0.5358975626282956,
                altitude: 0.5700498570958215
            },
            getTimes: {
                solarNoon: '2037-10-23T06:49:31.594Z',
                nadir: '2037-10-22T18:49:31.594Z',
                sunrise: '2037-10-23T01:22:47.103Z',
                sunset: '2037-10-23T12:16:16.086Z',
                sunriseEnd: '2037-10-23T01:25:41.179Z',
                sunsetStart: '2037-10-23T12:13:22.009Z',
                dawn: '2037-10-23T00:54:55.877Z',
                dusk: '2037-10-23T12:44:07.311Z',
                nauticalDawn: '2037-10-23T00:23:01.502Z',
                nauticalDusk: '2037-10-23T13:16:01.686Z',
                nightEnd: '2037-10-22T23:51:20.188Z',
                night: '2037-10-23T13:47:43.000Z',
                goldenHourEnd: '2037-10-23T02:00:31.287Z',
                goldenHour: '2037-10-23T11:38:31.901Z'
            },
            getMoonPosition: {
                azimuth: -2.395941733909601,
                altitude: -0.6340685489917579,
                distance: 404565.16146483796,
                parallacticAngle: -0.5410764171298976
            },
            getMoonIllumination: {
                fraction: 0.9913479883508903,
                phase: 0.4703491652238597,
                angle: -2.4485094650470733
            },
            getMoonTimesUTC: {
                rise: '2037-10-23T12:12:03.688Z',
                set: '2037-10-23T00:13:20.641Z'
            },
            getMoonTimesNonUTC: {
                rise: '2037-10-23T12:12:03.688Z',
                set: '2037-10-23T00:13:20.641Z'
            }
        }
    },
    {
        input: {
            date: '2037-10-23T08:32:21.434Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.425613902976301,
                altitude: -0.1381331520051138
            },
            getTimes: {
                solarNoon: '2037-10-23T02:26:57.088Z',
                nadir: '2037-10-22T14:26:57.088Z',
                sunrise: '2037-10-22T20:53:50.565Z',
                sunset: '2037-10-23T08:00:03.612Z',
                sunriseEnd: '2037-10-22T20:56:32.323Z',
                sunsetStart: '2037-10-23T07:57:21.854Z',
                dawn: '2037-10-22T20:27:54.332Z',
                dusk: '2037-10-23T08:25:59.845Z',
                nauticalDawn: '2037-10-22T19:58:07.247Z',
                nauticalDusk: '2037-10-23T08:55:46.930Z',
                nightEnd: '2037-10-22T19:28:31.873Z',
                night: '2037-10-23T09:25:22.304Z',
                goldenHourEnd: '2037-10-22T21:28:47.176Z',
                goldenHour: '2037-10-23T07:25:07.000Z'
            },
            getMoonPosition: {
                azimuth: -1.5278438617080217,
                altitude: 0.15581647585060937,
                distance: 404565.16146483796,
                parallacticAngle: -0.9490634799192421
            },
            getMoonIllumination: {
                fraction: 0.9913479883508903,
                phase: 0.4703491652238597,
                angle: -2.4485094650470733
            },
            getMoonTimesUTC: {
                rise: '2037-10-23T07:47:07.869Z',
                set: '2037-10-23T20:34:34.719Z'
            },
            getMoonTimesNonUTC: {
                rise: '2037-10-23T07:47:07.869Z',
                set: '2037-10-23T20:34:34.719Z'
            }
        }
    },
    {
        input: {
            date: '2037-12-04T17:42:27.031Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.3128617112547365,
                altitude: -0.2940504562826937
            },
            getTimes: {
                solarNoon: '2037-12-04T11:42:15.171Z',
                nadir: '2037-12-03T23:42:15.171Z',
                sunrise: '2037-12-04T07:25:07.686Z',
                sunset: '2037-12-04T15:59:22.656Z',
                sunriseEnd: '2037-12-04T07:29:01.729Z',
                sunsetStart: '2037-12-04T15:55:28.613Z',
                dawn: '2037-12-04T06:48:47.528Z',
                dusk: '2037-12-04T16:35:42.814Z',
                nauticalDawn: '2037-12-04T06:09:03.695Z',
                nauticalDusk: '2037-12-04T17:15:26.647Z',
                nightEnd: '2037-12-04T05:31:00.997Z',
                night: '2037-12-04T17:53:29.345Z',
                goldenHourEnd: '2037-12-04T08:18:17.995Z',
                goldenHour: '2037-12-04T15:06:12.346Z'
            },
            getMoonPosition: {
                azimuth: 1.810845548250639,
                altitude: -0.4596568420130724,
                distance: 367742.3320198604,
                parallacticAngle: 0.7106962968283126
            },
            getMoonIllumination: {
                fraction: 0.059697794767767653,
                phase: 0.9214315534761737,
                angle: 2.023298757642559
            },
            getMoonTimesUTC: {
                rise: '2037-12-04T04:01:02.344Z',
                set: '2037-12-04T14:56:00.747Z'
            },
            getMoonTimesNonUTC: {
                rise: '2037-12-04T04:01:01.241Z',
                set: '2037-12-04T14:55:56.607Z'
            }
        }
    },
    {
        input: {
            date: '2037-12-04T17:42:27.031Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.298125083278344,
                altitude: -0.2821168776543078
            },
            getTimes: {
                solarNoon: '2037-12-04T11:51:10.519Z',
                nadir: '2037-12-03T23:51:10.519Z',
                sunrise: '2037-12-04T07:45:26.560Z',
                sunset: '2037-12-04T15:56:54.478Z',
                sunriseEnd: '2037-12-04T07:49:40.585Z',
                sunsetStart: '2037-12-04T15:52:40.453Z',
                dawn: '2037-12-04T07:06:19.710Z',
                dusk: '2037-12-04T16:36:01.328Z',
                nauticalDawn: '2037-12-04T06:24:01.376Z',
                nauticalDusk: '2037-12-04T17:18:19.662Z',
                nightEnd: '2037-12-04T05:43:45.766Z',
                night: '2037-12-04T17:58:35.272Z',
                goldenHourEnd: '2037-12-04T08:44:04.531Z',
                goldenHour: '2037-12-04T14:58:16.507Z'
            },
            getMoonPosition: {
                azimuth: 1.7999060311081736,
                altitude: -0.42465696812690396,
                distance: 367742.3320198604,
                parallacticAngle: 0.6671700642700746
            },
            getMoonIllumination: {
                fraction: 0.059697794767767653,
                phase: 0.9214315534761737,
                angle: 2.023298757642559
            },
            getMoonTimesUTC: {
                rise: '2037-12-04T04:15:14.632Z',
                set: '2037-12-04T15:00:04.656Z'
            },
            getMoonTimesNonUTC: {
                rise: '2037-12-04T04:15:04.841Z',
                set: '2037-12-04T15:00:04.470Z'
            }
        }
    },
    {
        input: {
            date: '2037-12-04T17:42:27.031Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.3602137007487234,
                altitude: -1.1544717871036088
            },
            getTimes: {
                solarNoon: '2037-12-04T06:55:34.421Z',
                nadir: '2037-12-03T18:55:34.421Z',
                sunrise: '2037-12-04T02:10:41.323Z',
                sunset: '2037-12-04T11:40:27.520Z',
                sunriseEnd: '2037-12-04T02:13:54.286Z',
                sunsetStart: '2037-12-04T11:37:14.556Z',
                dawn: '2037-12-04T01:40:15.431Z',
                dusk: '2037-12-04T12:10:53.412Z',
                nauticalDawn: '2037-12-04T01:06:15.010Z',
                nauticalDusk: '2037-12-04T12:44:53.832Z',
                nightEnd: '2037-12-04T00:33:14.862Z',
                night: '2037-12-04T13:17:53.980Z',
                goldenHourEnd: '2037-12-04T02:53:21.668Z',
                goldenHour: '2037-12-04T10:57:47.174Z'
            },
            getMoonPosition: {
                azimuth: -2.8179991634707497,
                altitude: -1.033079994119671,
                distance: 367742.3320198604,
                parallacticAngle: -0.24856032768368383
            },
            getMoonIllumination: {
                fraction: 0.059697794767767653,
                phase: 0.9214315534761737,
                angle: 2.023298757642559
            },
            getMoonTimesUTC: {
                set: '2037-12-04T10:14:29.438Z'
            },
            getMoonTimesNonUTC: {
                set: '2037-12-04T10:14:30.214Z'
            }
        }
    },
    {
        input: {
            date: '2037-12-04T17:42:27.031Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.6512266194404799,
                altitude: -0.8134526748210454
            },
            getTimes: {
                solarNoon: '2037-12-05T02:33:18.062Z',
                nadir: '2037-12-04T14:33:18.062Z',
                sunrise: '2037-12-04T21:35:17.692Z',
                sunset: '2037-12-05T07:31:18.432Z',
                sunriseEnd: '2037-12-04T21:38:14.619Z',
                sunsetStart: '2037-12-05T07:28:21.504Z',
                dawn: '2037-12-04T21:07:14.020Z',
                dusk: '2037-12-05T07:59:22.104Z',
                nauticalDawn: '2037-12-04T20:35:36.859Z',
                nauticalDusk: '2037-12-05T08:30:59.265Z',
                nightEnd: '2037-12-04T20:04:45.563Z',
                night: '2037-12-05T09:01:50.561Z',
                goldenHourEnd: '2037-12-04T22:14:04.551Z',
                goldenHour: '2037-12-05T06:52:31.572Z'
            },
            getMoonPosition: {
                azimuth: -1.554432129949127,
                altitude: -0.3189896821070733,
                distance: 367742.3320198604,
                parallacticAngle: -0.9774100716409638
            },
            getMoonIllumination: {
                fraction: 0.059697794767767653,
                phase: 0.9214315534761737,
                angle: 2.023298757642559
            },
            getMoonTimesUTC: {
                rise: '2037-12-04T19:18:52.676Z',
                set: '2037-12-04T05:51:29.976Z'
            },
            getMoonTimesNonUTC: {
                rise: '2037-12-04T19:19:05.263Z',
                set: '2037-12-04T05:51:38.478Z'
            }
        }
    },
    {
        input: {
            date: '2038-03-25T00:41:09.920Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.892633851597207,
                altitude: -0.6758245824473574
            },
            getTimes: {
                solarNoon: '2038-03-25T11:57:55.076Z',
                nadir: '2038-03-24T23:57:55.076Z',
                sunrise: '2038-03-25T05:42:56.177Z',
                sunset: '2038-03-25T18:12:53.975Z',
                sunriseEnd: '2038-03-25T05:46:10.968Z',
                sunsetStart: '2038-03-25T18:09:39.185Z',
                dawn: '2038-03-25T05:11:16.887Z',
                dusk: '2038-03-25T18:44:33.266Z',
                nauticalDawn: '2038-03-25T04:33:44.078Z',
                nauticalDusk: '2038-03-25T19:22:06.074Z',
                nightEnd: '2038-03-25T03:54:34.495Z',
                night: '2038-03-25T20:01:15.658Z',
                goldenHourEnd: '2038-03-25T06:24:30.274Z',
                goldenHour: '2038-03-25T17:31:19.878Z'
            },
            getMoonPosition: {
                azimuth: -0.7291220077397724,
                altitude: 0.271911560604757,
                distance: 367939.907639942,
                parallacticAngle: -0.472913011339561
            },
            getMoonIllumination: {
                fraction: 0.7944617192903677,
                phase: 0.6497759741630944,
                angle: 1.742155478579411
            },
            getMoonTimesUTC: {
                rise: '2038-03-25T23:51:41.045Z',
                set: '2038-03-25T08:25:35.941Z'
            },
            getMoonTimesNonUTC: {
                set: '2038-03-25T08:25:32.093Z'
            }
        }
    },
    {
        input: {
            date: '2038-03-25T00:41:09.920Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.94905659621108,
                altitude: -0.6361538526243747
            },
            getTimes: {
                solarNoon: '2038-03-25T12:06:50.159Z',
                nadir: '2038-03-25T00:06:50.159Z',
                sunrise: '2038-03-25T05:50:39.645Z',
                sunset: '2038-03-25T18:23:00.673Z',
                sunriseEnd: '2038-03-25T05:54:05.610Z',
                sunsetStart: '2038-03-25T18:19:34.708Z',
                dawn: '2038-03-25T05:17:09.193Z',
                dusk: '2038-03-25T18:56:31.125Z',
                nauticalDawn: '2038-03-25T04:37:14.115Z',
                nauticalDusk: '2038-03-25T19:36:26.203Z',
                nightEnd: '2038-03-25T03:55:12.204Z',
                night: '2038-03-25T20:18:28.114Z',
                goldenHourEnd: '2038-03-25T06:34:36.472Z',
                goldenHour: '2038-03-25T17:39:03.846Z'
            },
            getMoonPosition: {
                azimuth: -0.7557916525092789,
                altitude: 0.22121750374819052,
                distance: 367939.907639942,
                parallacticAngle: -0.4596178375206597
            },
            getMoonIllumination: {
                fraction: 0.7944617192903677,
                phase: 0.6497759741630944,
                angle: 1.742155478579411
            },
            getMoonTimesUTC: {
                set: '2038-03-25T08:26:12.592Z'
            },
            getMoonTimesNonUTC: {
                set: '2038-03-25T08:26:09.326Z'
            }
        }
    },
    {
        input: {
            date: '2038-03-25T00:41:09.920Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.6738381126880892,
                altitude: -0.07856762235733039
            },
            getTimes: {
                solarNoon: '2038-03-25T07:11:22.848Z',
                nadir: '2038-03-24T19:11:22.848Z',
                sunrise: '2038-03-25T00:59:33.328Z',
                sunset: '2038-03-25T13:23:12.367Z',
                sunriseEnd: '2038-03-25T01:02:22.305Z',
                sunsetStart: '2038-03-25T13:20:23.390Z',
                dawn: '2038-03-25T00:32:09.651Z',
                dusk: '2038-03-25T13:50:36.044Z',
                nauticalDawn: '2038-03-24T23:59:57.737Z',
                nauticalDusk: '2038-03-25T14:22:47.958Z',
                nightEnd: '2038-03-24T23:27:00.688Z',
                night: '2038-03-25T14:55:45.008Z',
                goldenHourEnd: '2038-03-25T01:35:37.720Z',
                goldenHour: '2038-03-25T12:47:07.975Z'
            },
            getMoonPosition: {
                azimuth: 0.5677723015406699,
                altitude: 0.47406787250387283,
                distance: 367939.907639942,
                parallacticAngle: 0.43732805481084763
            },
            getMoonIllumination: {
                fraction: 0.7944617192903677,
                phase: 0.6497759741630944,
                angle: 1.742155478579411
            },
            getMoonTimesUTC: {
                rise: '2038-03-25T18:26:51.928Z',
                set: '2038-03-25T03:52:36.125Z'
            },
            getMoonTimesNonUTC: {
                rise: '2038-03-25T18:26:41.957Z',
                set: '2038-03-25T03:52:42.923Z'
            }
        }
    },
    {
        input: {
            date: '2038-03-25T00:41:09.920Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -0.8345531117688421,
                altitude: 0.7853452887740531
            },
            getTimes: {
                solarNoon: '2038-03-25T02:48:50.303Z',
                nadir: '2038-03-24T14:48:50.303Z',
                sunrise: '2038-03-24T20:38:33.938Z',
                sunset: '2038-03-25T08:59:06.667Z',
                sunriseEnd: '2038-03-24T20:41:11.558Z',
                sunsetStart: '2038-03-25T08:56:29.047Z',
                dawn: '2038-03-24T20:13:02.204Z',
                dusk: '2038-03-25T09:24:38.402Z',
                nauticalDawn: '2038-03-24T19:43:08.294Z',
                nauticalDusk: '2038-03-25T09:54:32.311Z',
                nightEnd: '2038-03-24T19:12:45.480Z',
                night: '2038-03-25T10:24:55.125Z',
                goldenHourEnd: '2038-03-24T21:12:13.223Z',
                goldenHour: '2038-03-25T08:25:27.382Z'
            },
            getMoonPosition: {
                azimuth: 1.3982607684751085,
                altitude: -0.2264495122589562,
                distance: 367939.907639942,
                parallacticAngle: 0.9818511066554498
            },
            getMoonIllumination: {
                fraction: 0.7944617192903677,
                phase: 0.6497759741630944,
                angle: 1.742155478579411
            },
            getMoonTimesUTC: {
                rise: '2038-03-25T13:40:21.891Z'
            },
            getMoonTimesNonUTC: {
                rise: '2038-03-25T13:40:25.573Z',
                set: '2038-03-24T23:31:45.287Z'
            }
        }
    },
    {
        input: {
            date: '2039-12-20T03:02:44.048Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.8441197057453982,
                altitude: -0.7710622775111811
            },
            getTimes: {
                solarNoon: '2039-12-20T11:49:11.083Z',
                nadir: '2039-12-19T23:49:11.083Z',
                sunrise: '2039-12-20T07:39:08.761Z',
                sunset: '2039-12-20T15:59:13.405Z',
                sunriseEnd: '2039-12-20T07:43:08.648Z',
                sunsetStart: '2039-12-20T15:55:13.518Z',
                dawn: '2039-12-20T07:02:03.205Z',
                dusk: '2039-12-20T16:36:18.961Z',
                nauticalDawn: '2039-12-20T06:21:44.382Z',
                nauticalDusk: '2039-12-20T17:16:37.784Z',
                nightEnd: '2039-12-20T05:43:19.038Z',
                night: '2039-12-20T17:55:03.128Z',
                goldenHourEnd: '2039-12-20T08:34:01.805Z',
                goldenHour: '2039-12-20T15:04:20.360Z'
            },
            getMoonPosition: {
                azimuth: 2.6738514083752563,
                altitude: -0.963167322785152,
                distance: 372378.2085918673,
                parallacticAngle: 0.3152625406404891
            },
            getMoonIllumination: {
                fraction: 0.25226053564425166,
                phase: 0.16749628778721248,
                angle: -1.8803147218746261
            },
            getMoonTimesUTC: {
                rise: '2039-12-20T11:33:40.177Z',
                set: '2039-12-20T21:42:52.645Z'
            },
            getMoonTimesNonUTC: {
                rise: '2039-12-20T11:33:44.996Z',
                set: '2039-12-20T21:43:02.557Z'
            }
        }
    },
    {
        input: {
            date: '2039-12-20T03:02:44.048Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.9247323038746946,
                altitude: -0.780512595750863
            },
            getTimes: {
                solarNoon: '2039-12-20T11:58:06.461Z',
                nadir: '2039-12-19T23:58:06.461Z',
                sunrise: '2039-12-20T08:00:22.582Z',
                sunset: '2039-12-20T15:55:50.340Z',
                sunriseEnd: '2039-12-20T08:04:44.115Z',
                sunsetStart: '2039-12-20T15:51:28.807Z',
                dawn: '2039-12-20T07:20:19.109Z',
                dusk: '2039-12-20T16:35:53.813Z',
                nauticalDawn: '2039-12-20T06:37:19.170Z',
                nauticalDusk: '2039-12-20T17:18:53.751Z',
                nightEnd: '2039-12-20T05:56:37.807Z',
                night: '2039-12-20T17:59:35.115Z',
                goldenHourEnd: '2039-12-20T09:01:21.043Z',
                goldenHour: '2039-12-20T14:54:51.879Z'
            },
            getMoonPosition: {
                azimuth: 2.6431283215577355,
                altitude: -0.9106361205240157,
                distance: 372378.2085918673,
                parallacticAngle: 0.31627634624156215
            },
            getMoonIllumination: {
                fraction: 0.25226053564425166,
                phase: 0.16749628778721248,
                angle: -1.8803147218746261
            },
            getMoonTimesUTC: {
                rise: '2039-12-20T11:50:00.949Z',
                set: '2039-12-20T21:45:53.365Z'
            },
            getMoonTimesNonUTC: {
                rise: '2039-12-20T11:49:51.268Z',
                set: '2039-12-20T21:46:02.750Z'
            }
        }
    },
    {
        input: {
            date: '2039-12-20T03:02:44.048Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -0.9181757244177048,
                altitude: 0.0935706269012404
            },
            getTimes: {
                solarNoon: '2039-12-20T07:02:29.365Z',
                nadir: '2039-12-19T19:02:29.365Z',
                sunrise: '2039-12-20T02:22:44.724Z',
                sunset: '2039-12-20T11:42:14.005Z',
                sunriseEnd: '2039-12-20T02:26:01.001Z',
                sunsetStart: '2039-12-20T11:38:57.728Z',
                dawn: '2039-12-20T01:51:51.426Z',
                dusk: '2039-12-20T12:13:07.303Z',
                nauticalDawn: '2039-12-20T01:17:27.431Z',
                nauticalDusk: '2039-12-20T12:47:31.299Z',
                nightEnd: '2039-12-20T00:44:10.152Z',
                night: '2039-12-20T13:20:48.577Z',
                goldenHourEnd: '2039-12-20T03:06:17.323Z',
                goldenHour: '2039-12-20T10:58:41.406Z'
            },
            getMoonPosition: {
                azimuth: -1.728581325184447,
                altitude: -0.6258334364301725,
                distance: 372378.2085918673,
                parallacticAngle: -0.8984456790213364
            },
            getMoonIllumination: {
                fraction: 0.25226053564425166,
                phase: 0.16749628778721248,
                angle: -1.8803147218746261
            },
            getMoonTimesUTC: {
                rise: '2039-12-20T06:21:45.187Z',
                set: '2039-12-20T16:58:53.532Z'
            },
            getMoonTimesNonUTC: {
                rise: '2039-12-20T06:21:33.324Z',
                set: '2039-12-20T16:58:52.369Z'
            }
        }
    },
    {
        input: {
            date: '2039-12-20T03:02:44.048Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 0.11373097076677799,
                altitude: 0.5346627915925038
            },
            getTimes: {
                solarNoon: '2039-12-20T02:39:48.129Z',
                nadir: '2039-12-19T14:39:48.129Z',
                sunrise: '2039-12-19T21:45:36.607Z',
                sunset: '2039-12-20T07:33:59.651Z',
                sunriseEnd: '2039-12-19T21:48:35.849Z',
                sunsetStart: '2039-12-20T07:31:00.409Z',
                dawn: '2039-12-19T21:17:13.254Z',
                dusk: '2039-12-20T08:02:23.003Z',
                nauticalDawn: '2039-12-19T20:45:18.240Z',
                nauticalDusk: '2039-12-20T08:34:18.018Z',
                nightEnd: '2039-12-19T20:14:13.148Z',
                night: '2039-12-20T09:05:23.110Z',
                goldenHourEnd: '2039-12-19T22:24:58.525Z',
                goldenHour: '2039-12-20T06:54:37.732Z'
            },
            getMoonPosition: {
                azimuth: -0.9920683669892663,
                altitude: 0.2447623850154928,
                distance: 372378.2085918673,
                parallacticAngle: -0.7905856822409566
            },
            getMoonIllumination: {
                fraction: 0.25226053564425166,
                phase: 0.16749628778721248,
                angle: -1.8803147218746261
            },
            getMoonTimesUTC: {
                rise: '2039-12-20T01:42:31.171Z',
                set: '2039-12-20T12:31:52.024Z'
            },
            getMoonTimesNonUTC: {
                rise: '2039-12-20T01:42:33.950Z',
                set: '2039-12-20T12:31:40.765Z'
            }
        }
    },
    {
        input: {
            date: '2041-08-31T01:35:51.784Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.624707211209637,
                altitude: -0.4868944119901985
            },
            getTimes: {
                solarNoon: '2041-08-31T11:52:30.260Z',
                nadir: '2041-08-30T23:52:30.260Z',
                sunrise: '2041-08-31T05:04:57.442Z',
                sunset: '2041-08-31T18:40:03.077Z',
                sunriseEnd: '2041-08-31T05:08:18.065Z',
                sunsetStart: '2041-08-31T18:36:42.454Z',
                dawn: '2041-08-31T04:31:57.464Z',
                dusk: '2041-08-31T19:13:03.055Z',
                nauticalDawn: '2041-08-31T03:51:42.130Z',
                nauticalDusk: '2041-08-31T19:53:18.389Z',
                nightEnd: '2041-08-31T03:07:51.298Z',
                night: '2041-08-31T20:37:09.221Z',
                goldenHourEnd: '2041-08-31T05:47:15.337Z',
                goldenHour: '2041-08-31T17:57:45.182Z'
            },
            getMoonPosition: {
                azimuth: 2.643722707573072,
                altitude: -0.8186382269791386,
                distance: 397766.56552522676,
                parallacticAngle: 0.32413952674909546
            },
            getMoonIllumination: {
                fraction: 0.17066794497062376,
                phase: 0.13556091766069256,
                angle: -1.2113030674298262
            },
            getMoonTimesUTC: {
                rise: '2041-08-31T09:57:22.428Z',
                set: '2041-08-31T20:22:03.404Z'
            },
            getMoonTimesNonUTC: {
                rise: '2041-08-31T09:57:22.428Z',
                set: '2041-08-31T20:22:03.404Z'
            }
        }
    },
    {
        input: {
            date: '2041-08-31T01:35:51.784Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.6769832576890926,
                altitude: -0.4578501029691008
            },
            getTimes: {
                solarNoon: '2041-08-31T12:01:25.344Z',
                nadir: '2041-08-31T00:01:25.344Z',
                sunrise: '2041-08-31T05:09:25.657Z',
                sunset: '2041-08-31T18:53:25.030Z',
                sunriseEnd: '2041-08-31T05:12:58.583Z',
                sunsetStart: '2041-08-31T18:49:52.104Z',
                dawn: '2041-08-31T04:34:17.305Z',
                dusk: '2041-08-31T19:28:33.382Z',
                nauticalDawn: '2041-08-31T03:50:58.814Z',
                nauticalDusk: '2041-08-31T20:11:51.873Z',
                nightEnd: '2041-08-31T03:02:46.049Z',
                night: '2041-08-31T21:00:04.639Z',
                goldenHourEnd: '2041-08-31T05:54:13.403Z',
                goldenHour: '2041-08-31T18:08:37.284Z'
            },
            getMoonPosition: {
                azimuth: 2.614793538926067,
                altitude: -0.766112113011396,
                distance: 397766.56552522676,
                parallacticAngle: 0.3227864584723605
            },
            getMoonIllumination: {
                fraction: 0.17066794497062376,
                phase: 0.13556091766069256,
                angle: -1.2113030674298262
            },
            getMoonTimesUTC: {
                rise: '2041-08-31T10:12:39.777Z',
                set: '2041-08-31T20:24:36.007Z'
            },
            getMoonTimesNonUTC: {
                rise: '2041-08-31T10:12:39.777Z',
                set: '2041-08-31T20:24:36.007Z'
            }
        }
    },
    {
        input: {
            date: '2041-08-31T01:35:51.784Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.5992183226846362,
                altitude: 0.2040765723988091
            },
            getTimes: {
                solarNoon: '2041-08-31T07:05:57.977Z',
                nadir: '2041-08-30T19:05:57.977Z',
                sunrise: '2041-08-31T00:29:13.034Z',
                sunset: '2041-08-31T13:42:42.920Z',
                sunriseEnd: '2041-08-31T00:32:05.795Z',
                sunsetStart: '2041-08-31T13:39:50.159Z',
                dawn: '2041-08-31T00:00:59.440Z',
                dusk: '2041-08-31T14:10:56.514Z',
                nauticalDawn: '2041-08-30T23:27:14.344Z',
                nauticalDusk: '2041-08-31T14:44:41.610Z',
                nightEnd: '2041-08-30T22:51:51.933Z',
                night: '2041-08-31T15:20:04.021Z',
                goldenHourEnd: '2041-08-31T01:05:48.316Z',
                goldenHour: '2041-08-31T13:06:07.638Z'
            },
            getMoonPosition: {
                azimuth: -1.9007964050811064,
                altitude: -0.5874215976737445,
                distance: 397766.56552522676,
                parallacticAngle: -0.8136657446671008
            },
            getMoonIllumination: {
                fraction: 0.17066794497062376,
                phase: 0.13556091766069256,
                angle: -1.2113030674298262
            },
            getMoonTimesUTC: {
                rise: '2041-08-31T04:45:22.820Z',
                set: '2041-08-31T15:47:29.520Z'
            },
            getMoonTimesNonUTC: {
                rise: '2041-08-31T04:45:22.820Z',
                set: '2041-08-31T15:47:29.520Z'
            }
        }
    },
    {
        input: {
            date: '2041-08-31T01:35:51.784Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -0.5795392107387021,
                altitude: 1.0337555422836096
            },
            getTimes: {
                solarNoon: '2041-08-31T02:43:25.370Z',
                nadir: '2041-08-30T14:43:25.370Z',
                sunrise: '2041-08-30T20:11:59.003Z',
                sunset: '2041-08-31T09:14:51.738Z',
                sunriseEnd: '2041-08-30T20:14:39.704Z',
                sunsetStart: '2041-08-31T09:12:11.036Z',
                dawn: '2041-08-30T19:45:47.802Z',
                dusk: '2041-08-31T09:41:02.938Z',
                nauticalDawn: '2041-08-30T19:14:43.188Z',
                nauticalDusk: '2041-08-31T10:12:07.553Z',
                nightEnd: '2041-08-30T18:42:34.826Z',
                night: '2041-08-31T10:44:15.914Z',
                goldenHourEnd: '2041-08-30T20:46:04.836Z',
                goldenHour: '2041-08-31T08:40:45.904Z'
            },
            getMoonPosition: {
                azimuth: -1.1361114025353145,
                altitude: 0.2884416009577679,
                distance: 397766.56552522676,
                parallacticAngle: -0.8432310727156924
            },
            getMoonIllumination: {
                fraction: 0.17066794497062376,
                phase: 0.13556091766069256,
                angle: -1.2113030674298262
            },
            getMoonTimesUTC: {
                rise: '2041-08-31T00:05:12.474Z',
                set: '2041-08-31T11:27:01.752Z'
            },
            getMoonTimesNonUTC: {
                rise: '2041-08-31T00:05:12.474Z',
                set: '2041-08-31T11:27:01.752Z'
            }
        }
    },
    {
        input: {
            date: '2041-09-02T14:00:38.575Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 0.7819654720385255,
                altitude: 0.7109048203429694
            },
            getTimes: {
                solarNoon: '2041-09-02T11:51:52.113Z',
                nadir: '2041-09-01T23:51:52.113Z',
                sunrise: '2041-09-02T05:07:47.549Z',
                sunset: '2041-09-02T18:35:56.677Z',
                sunriseEnd: '2041-09-02T05:11:07.213Z',
                sunsetStart: '2041-09-02T18:32:37.013Z',
                dawn: '2041-09-02T04:34:59.807Z',
                dusk: '2041-09-02T19:08:44.419Z',
                nauticalDawn: '2041-09-02T03:55:07.614Z',
                nauticalDusk: '2041-09-02T19:48:36.611Z',
                nightEnd: '2041-09-02T03:11:56.953Z',
                night: '2041-09-02T20:31:47.273Z',
                goldenHourEnd: '2041-09-02T05:49:56.679Z',
                goldenHour: '2041-09-02T17:53:47.546Z'
            },
            getMoonPosition: {
                azimuth: -0.670443303880493,
                altitude: 0.18263176043516685,
                distance: 386731.7265019602,
                parallacticAngle: -0.4560226054467957
            },
            getMoonIllumination: {
                fraction: 0.39845345022628087,
                phase: 0.21745029545595973,
                angle: -1.3331249978128632
            },
            getMoonTimesUTC: {
                rise: '2041-09-02T12:27:59.789Z',
                set: '2041-09-02T21:06:34.102Z'
            },
            getMoonTimesNonUTC: {
                rise: '2041-09-02T12:27:59.789Z',
                set: '2041-09-02T21:06:34.102Z'
            }
        }
    },
    {
        input: {
            date: '2041-09-02T14:00:38.575Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 0.7099935630496617,
                altitude: 0.6938534943434715
            },
            getTimes: {
                solarNoon: '2041-09-02T12:00:47.192Z',
                nadir: '2041-09-02T00:00:47.192Z',
                sunrise: '2041-09-02T05:12:37.179Z',
                sunset: '2041-09-02T18:48:57.205Z',
                sunriseEnd: '2041-09-02T05:16:08.956Z',
                sunsetStart: '2041-09-02T18:45:25.428Z',
                dawn: '2041-09-02T04:37:43.739Z',
                dusk: '2041-09-02T19:23:50.646Z',
                nauticalDawn: '2041-09-02T03:54:54.556Z',
                nauticalDusk: '2041-09-02T20:06:39.829Z',
                nightEnd: '2041-09-02T03:07:36.325Z',
                night: '2041-09-02T20:53:58.060Z',
                goldenHourEnd: '2041-09-02T05:57:14.618Z',
                goldenHour: '2041-09-02T18:04:19.767Z'
            },
            getMoonPosition: {
                azimuth: -0.6987886207877744,
                altitude: 0.131572223941352,
                distance: 386731.7265019602,
                parallacticAngle: -0.44597006789479904
            },
            getMoonIllumination: {
                fraction: 0.39845345022628087,
                phase: 0.21745029545595973,
                angle: -1.3331249978128632
            },
            getMoonTimesUTC: {
                rise: '2041-09-02T12:49:05.914Z',
                set: '2041-09-02T21:03:21.067Z'
            },
            getMoonTimesNonUTC: {
                rise: '2041-09-02T12:49:05.914Z',
                set: '2041-09-02T21:03:21.067Z'
            }
        }
    },
    {
        input: {
            date: '2041-09-02T14:00:38.575Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.838729873887371,
                altitude: -0.09554264178616209
            },
            getTimes: {
                solarNoon: '2041-09-02T07:05:19.971Z',
                nadir: '2041-09-01T19:05:19.971Z',
                sunrise: '2041-09-02T00:31:10.325Z',
                sunset: '2041-09-02T13:39:29.618Z',
                sunriseEnd: '2041-09-02T00:34:02.474Z',
                sunsetStart: '2041-09-02T13:36:37.469Z',
                dawn: '2041-09-02T00:03:04.174Z',
                dusk: '2041-09-02T14:07:35.769Z',
                nauticalDawn: '2041-09-01T23:29:31.949Z',
                nauticalDusk: '2041-09-02T14:41:07.994Z',
                nightEnd: '2041-09-01T22:54:29.110Z',
                night: '2041-09-02T15:16:10.833Z',
                goldenHourEnd: '2041-09-02T01:07:39.692Z',
                goldenHour: '2041-09-02T13:03:00.250Z'
            },
            getMoonPosition: {
                azimuth: 0.5301415648363622,
                altitude: 0.37349262118963744,
                distance: 386731.7265019602,
                parallacticAngle: 0.4255804552594479
            },
            getMoonIllumination: {
                fraction: 0.39845345022628087,
                phase: 0.21745029545595973,
                angle: -1.3331249978128632
            },
            getMoonTimesUTC: {
                rise: '2041-09-02T06:57:36.131Z',
                set: '2041-09-02T16:43:34.850Z'
            },
            getMoonTimesNonUTC: {
                rise: '2041-09-02T06:57:36.131Z',
                set: '2041-09-02T16:43:34.850Z'
            }
        }
    },
    {
        input: {
            date: '2041-09-02T14:00:38.575Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.8921774771041155,
                altitude: -0.7924161728254798
            },
            getTimes: {
                solarNoon: '2041-09-02T02:42:47.495Z',
                nadir: '2041-09-01T14:42:47.495Z',
                sunrise: '2041-09-01T20:13:30.233Z',
                sunset: '2041-09-02T09:12:04.757Z',
                sunriseEnd: '2041-09-01T20:16:10.443Z',
                sunsetStart: '2041-09-02T09:09:24.547Z',
                dawn: '2041-09-01T19:47:24.864Z',
                dusk: '2041-09-02T09:38:10.126Z',
                nauticalDawn: '2041-09-01T19:16:29.887Z',
                nauticalDusk: '2041-09-02T10:09:05.102Z',
                nightEnd: '2041-09-01T18:44:35.416Z',
                night: '2041-09-02T10:40:59.574Z',
                goldenHourEnd: '2041-09-01T20:47:31.135Z',
                goldenHour: '2041-09-02T08:38:03.855Z'
            },
            getMoonPosition: {
                azimuth: 1.31236353873867,
                altitude: -0.2933040500144686,
                distance: 386731.7265019602,
                parallacticAngle: 1.0083746260159578
            },
            getMoonIllumination: {
                fraction: 0.39845345022628087,
                phase: 0.21745029545595973,
                angle: -1.3331249978128632
            },
            getMoonTimesUTC: {
                rise: '2041-09-02T02:10:11.295Z',
                set: '2041-09-02T12:28:12.220Z'
            },
            getMoonTimesNonUTC: {
                rise: '2041-09-02T02:10:11.295Z',
                set: '2041-09-02T12:28:12.220Z'
            }
        }
    },
    {
        input: {
            date: '2042-07-16T16:21:55.128Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.5227954456299604,
                altitude: 0.546913025803285
            },
            getTimes: {
                solarNoon: '2042-07-16T11:57:42.302Z',
                nadir: '2042-07-15T23:57:42.302Z',
                sunrise: '2042-07-16T04:02:20.449Z',
                sunset: '2042-07-16T19:53:04.154Z',
                sunriseEnd: '2042-07-16T04:06:17.686Z',
                sunsetStart: '2042-07-16T19:49:06.917Z',
                dawn: '2042-07-16T03:21:44.001Z',
                dusk: '2042-07-16T20:33:40.602Z',
                nauticalDawn: '2042-07-16T02:26:00.904Z',
                nauticalDusk: '2042-07-16T21:29:23.699Z',
                nightEnd: '2042-07-16T01:00:35.320Z',
                night: '2042-07-16T22:54:49.283Z',
                goldenHourEnd: '2042-07-16T04:50:45.550Z',
                goldenHour: '2042-07-16T19:04:39.053Z'
            },
            getMoonPosition: {
                azimuth: 1.6656382780566772,
                altitude: 0.5661175169787439,
                distance: 384320.8756574692,
                parallacticAngle: 0.8273437933300614
            },
            getMoonIllumination: {
                fraction: 0.0037791871539488153,
                phase: 0.9804195236201096,
                angle: 2.5134111007629816
            },
            getMoonTimesUTC: {
                rise: '2042-07-16T02:36:00.228Z',
                set: '2042-07-16T20:11:00.678Z'
            },
            getMoonTimesNonUTC: {
                rise: '2042-07-16T02:36:00.228Z',
                set: '2042-07-16T20:11:00.678Z'
            }
        }
    },
    {
        input: {
            date: '2042-07-16T16:21:55.128Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.4629295595989786,
                altitude: 0.5681714847763776
            },
            getTimes: {
                solarNoon: '2042-07-16T12:06:37.538Z',
                nadir: '2042-07-16T00:06:37.538Z',
                sunrise: '2042-07-16T03:58:59.910Z',
                sunset: '2042-07-16T20:14:15.166Z',
                sunriseEnd: '2042-07-16T04:03:18.391Z',
                sunsetStart: '2042-07-16T20:09:56.685Z',
                dawn: '2042-07-16T03:14:04.399Z',
                dusk: '2042-07-16T20:59:10.677Z',
                nauticalDawn: '2042-07-16T02:08:28.207Z',
                nauticalDusk: '2042-07-16T22:04:46.869Z',
                nightEnd: null,
                night: null,
                goldenHourEnd: '2042-07-16T04:51:14.338Z',
                goldenHour: '2042-07-16T19:22:00.738Z'
            },
            getMoonPosition: {
                azimuth: 1.606587943891279,
                altitude: 0.5939911878775388,
                distance: 384320.8756574692,
                parallacticAngle: 0.774135645615885
            },
            getMoonIllumination: {
                fraction: 0.0037791871539488153,
                phase: 0.9804195236201096,
                angle: 2.5134111007629816
            },
            getMoonTimesUTC: {
                rise: '2042-07-16T02:26:24.327Z',
                set: '2042-07-16T20:37:32.843Z'
            },
            getMoonTimesNonUTC: {
                rise: '2042-07-16T02:26:24.327Z',
                set: '2042-07-16T20:37:32.843Z'
            }
        }
    },
    {
        input: {
            date: '2042-07-16T16:21:55.128Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.433966275260464,
                altitude: -0.2910629906437882
            },
            getTimes: {
                solarNoon: '2042-07-16T07:11:05.126Z',
                nadir: '2042-07-15T19:11:05.126Z',
                sunrise: '2042-07-15T23:44:55.062Z',
                sunset: '2042-07-16T14:37:15.190Z',
                sunriseEnd: '2042-07-15T23:48:09.427Z',
                sunsetStart: '2042-07-16T14:34:00.825Z',
                dawn: '2042-07-15T23:12:29.395Z',
                dusk: '2042-07-16T15:09:40.857Z',
                nauticalDawn: '2042-07-15T22:31:35.877Z',
                nauticalDusk: '2042-07-16T15:50:34.376Z',
                nightEnd: '2042-07-15T21:44:31.189Z',
                night: '2042-07-16T16:37:39.063Z',
                goldenHourEnd: '2042-07-16T00:25:19.019Z',
                goldenHour: '2042-07-16T13:56:51.233Z'
            },
            getMoonPosition: {
                azimuth: 2.5494392215371073,
                altitude: -0.2311804803773107,
                distance: 384320.8756574692,
                parallacticAngle: 0.49546707789541033
            },
            getMoonIllumination: {
                fraction: 0.0037791871539488153,
                phase: 0.9804195236201096,
                angle: 2.5134111007629816
            },
            getMoonTimesUTC: {
                rise: '2042-07-16T23:24:26.064Z',
                set: '2042-07-16T14:34:49.021Z'
            },
            getMoonTimesNonUTC: {
                rise: '2042-07-15T22:19:46.152Z',
                set: '2042-07-16T14:34:49.021Z'
            }
        }
    },
    {
        input: {
            date: '2042-07-16T16:21:55.128Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.7011384510453635,
                altitude: -0.5008187274168685
            },
            getTimes: {
                solarNoon: '2042-07-17T02:48:33.839Z',
                nadir: '2042-07-16T14:48:33.839Z',
                sunrise: '2042-07-16T19:36:59.572Z',
                sunset: '2042-07-17T10:00:08.107Z',
                sunriseEnd: '2042-07-16T19:39:56.798Z',
                sunsetStart: '2042-07-17T09:57:10.881Z',
                dawn: '2042-07-16T19:07:41.012Z',
                dusk: '2042-07-17T10:29:26.666Z',
                nauticalDawn: '2042-07-16T18:31:37.830Z',
                nauticalDusk: '2042-07-17T11:05:29.849Z',
                nightEnd: '2042-07-16T17:52:09.359Z',
                night: '2042-07-17T11:44:58.320Z',
                goldenHourEnd: '2042-07-16T20:14:05.145Z',
                goldenHour: '2042-07-17T09:23:02.534Z'
            },
            getMoonPosition: {
                azimuth: -2.6729769574213,
                altitude: -0.3723263636901795,
                distance: 384320.8756574692,
                parallacticAngle: -0.42499927222442013
            },
            getMoonIllumination: {
                fraction: 0.0037791871539488153,
                phase: 0.9804195236201096,
                angle: 2.5134111007629816
            },
            getMoonTimesUTC: {
                rise: '2042-07-16T19:08:21.527Z',
                set: '2042-07-16T09:43:35.732Z'
            },
            getMoonTimesNonUTC: {
                rise: '2042-07-16T19:08:21.527Z',
                set: '2042-07-16T09:43:35.732Z'
            }
        }
    },
    {
        input: {
            date: '2045-01-08T03:03:37.126Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.8971067661813164,
                altitude: -0.7797817823330407
            },
            getTimes: {
                solarNoon: '2045-01-08T11:58:19.155Z',
                nadir: '2045-01-07T23:58:19.155Z',
                sunrise: '2045-01-08T07:41:18.385Z',
                sunset: '2045-01-08T16:15:19.926Z',
                sunriseEnd: '2045-01-08T07:45:12.516Z',
                sunsetStart: '2045-01-08T16:11:25.794Z',
                dawn: '2045-01-08T07:04:57.538Z',
                dusk: '2045-01-08T16:51:40.773Z',
                nauticalDawn: '2045-01-08T06:25:13.172Z',
                nauticalDusk: '2045-01-08T17:31:25.139Z',
                nightEnd: '2045-01-08T05:47:10.133Z',
                night: '2045-01-08T18:09:28.178Z',
                goldenHourEnd: '2045-01-08T08:34:30.238Z',
                goldenHour: '2045-01-08T15:22:08.073Z'
            },
            getMoonPosition: {
                azimuth: -0.3697270864962564,
                altitude: 0.7312945678967048,
                distance: 371800.1231316343,
                parallacticAngle: -0.24034512616287676
            },
            getMoonIllumination: {
                fraction: 0.7242034748858663,
                phase: 0.6759957740178342,
                angle: 1.9840574238473452
            },
            getMoonTimesUTC: {
                rise: '2045-01-08T22:54:49.930Z',
                set: '2045-01-08T10:24:06.243Z'
            },
            getMoonTimesNonUTC: {
                rise: '2045-01-08T22:54:58.541Z',
                set: '2045-01-08T10:24:01.665Z'
            }
        }
    },
    {
        input: {
            date: '2045-01-08T03:03:37.126Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.9788982467108338,
                altitude: -0.7864497312253552
            },
            getTimes: {
                solarNoon: '2045-01-08T12:07:14.511Z',
                nadir: '2045-01-08T00:07:14.511Z',
                sunrise: '2045-01-08T08:01:37.462Z',
                sunset: '2045-01-08T16:12:51.560Z',
                sunriseEnd: '2045-01-08T08:05:51.590Z',
                sunsetStart: '2045-01-08T16:08:37.432Z',
                dawn: '2045-01-08T07:22:29.830Z',
                dusk: '2045-01-08T16:51:59.192Z',
                nauticalDawn: '2045-01-08T06:40:10.920Z',
                nauticalDusk: '2045-01-08T17:34:18.102Z',
                nightEnd: '2045-01-08T05:59:54.956Z',
                night: '2045-01-08T18:14:34.066Z',
                goldenHourEnd: '2045-01-08T09:00:17.337Z',
                goldenHour: '2045-01-08T15:14:11.684Z'
            },
            getMoonPosition: {
                azimuth: -0.4044161479574701,
                altitude: 0.679098473743382,
                distance: 371800.1231316343,
                parallacticAngle: -0.2477326268871195
            },
            getMoonIllumination: {
                fraction: 0.7242034748858663,
                phase: 0.6759957740178342,
                angle: 1.9840574238473452
            },
            getMoonTimesUTC: {
                rise: '2045-01-08T23:05:20.871Z',
                set: '2045-01-08T10:33:40.975Z'
            },
            getMoonTimesNonUTC: {
                set: '2045-01-08T10:33:31.068Z'
            }
        }
    },
    {
        input: {
            date: '2045-01-08T03:03:37.126Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -0.9563803206816803,
                altitude: 0.08583865135234997
            },
            getTimes: {
                solarNoon: '2045-01-08T07:11:38.155Z',
                nadir: '2045-01-07T19:11:38.155Z',
                sunrise: '2045-01-08T02:27:03.309Z',
                sunset: '2045-01-08T11:56:13.001Z',
                sunriseEnd: '2045-01-08T02:30:16.462Z',
                sunsetStart: '2045-01-08T11:52:59.848Z',
                dawn: '2045-01-08T01:56:35.846Z',
                dusk: '2045-01-08T12:26:40.464Z',
                nauticalDawn: '2045-01-08T01:22:34.077Z',
                nauticalDusk: '2045-01-08T13:00:42.233Z',
                nightEnd: '2045-01-08T00:49:32.955Z',
                night: '2045-01-08T13:33:43.355Z',
                goldenHourEnd: '2045-01-08T03:09:46.639Z',
                goldenHour: '2045-01-08T11:13:29.671Z'
            },
            getMoonPosition: {
                azimuth: 1.1924145549283036,
                altitude: 0.47078028179665576,
                distance: 371800.1231316343,
                parallacticAngle: 0.7826249415482168
            },
            getMoonIllumination: {
                fraction: 0.7242034748858663,
                phase: 0.6759957740178342,
                angle: 1.9840574238473452
            },
            getMoonTimesUTC: {
                rise: '2045-01-08T17:51:27.676Z',
                set: '2045-01-08T05:31:54.617Z'
            },
            getMoonTimesNonUTC: {
                rise: '2045-01-08T17:51:21.640Z',
                set: '2045-01-08T05:32:06.923Z'
            }
        }
    },
    {
        input: {
            date: '2045-01-08T03:03:37.126Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 0.07644734564180122,
                altitude: 0.5568489564760011
            },
            getTimes: {
                solarNoon: '2045-01-08T02:48:57.558Z',
                nadir: '2045-01-07T14:48:57.558Z',
                sunrise: '2045-01-07T21:50:54.680Z',
                sunset: '2045-01-08T07:47:00.435Z',
                sunriseEnd: '2045-01-07T21:53:51.583Z',
                sunsetStart: '2045-01-08T07:44:03.532Z',
                dawn: '2045-01-07T21:22:51.218Z',
                dusk: '2045-01-08T08:15:03.897Z',
                nauticalDawn: '2045-01-07T20:51:14.247Z',
                nauticalDusk: '2045-01-08T08:46:40.868Z',
                nightEnd: '2045-01-07T20:20:23.096Z',
                night: '2045-01-08T09:17:32.019Z',
                goldenHourEnd: '2045-01-07T22:29:41.167Z',
                goldenHour: '2045-01-08T07:08:13.948Z'
            },
            getMoonPosition: {
                azimuth: 1.954429115327813,
                altitude: -0.4024142845161071,
                distance: 371800.1231316343,
                parallacticAngle: 0.8543298724001891
            },
            getMoonIllumination: {
                fraction: 0.7242034748858663,
                phase: 0.6759957740178342,
                angle: 1.9840574238473452
            },
            getMoonTimesUTC: {
                rise: '2045-01-08T13:15:30.066Z',
                set: '2045-01-08T01:03:43.730Z'
            },
            getMoonTimesNonUTC: {
                rise: '2045-01-08T13:15:42.472Z',
                set: '2045-01-08T01:03:39.294Z'
            }
        }
    },
    {
        input: {
            date: '2046-01-24T20:57:19.485Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.9544222664908781,
                altitude: -0.7441088212723522
            },
            getTimes: {
                solarNoon: '2046-01-24T12:03:43.903Z',
                nadir: '2046-01-24T00:03:43.903Z',
                sunrise: '2046-01-24T07:29:56.147Z',
                sunset: '2046-01-24T16:37:31.660Z',
                sunriseEnd: '2046-01-24T07:33:38.274Z',
                sunsetStart: '2046-01-24T16:33:49.532Z',
                dawn: '2046-01-24T06:55:09.254Z',
                dusk: '2046-01-24T17:12:18.553Z',
                nauticalDawn: '2046-01-24T06:16:37.184Z',
                nauticalDusk: '2046-01-24T17:50:50.622Z',
                nightEnd: '2046-01-24T05:39:19.220Z',
                night: '2046-01-24T18:28:08.587Z',
                goldenHourEnd: '2046-01-24T08:19:42.057Z',
                goldenHour: '2046-01-24T15:47:45.750Z'
            },
            getMoonPosition: {
                azimuth: -1.4821762715322755,
                altitude: 0.2532598857413628,
                distance: 364104.7170613391,
                parallacticAngle: -0.7224023394565375
            },
            getMoonIllumination: {
                fraction: 0.925651808134351,
                phase: 0.5879062716167427,
                angle: 2.000200559708879
            },
            getMoonTimesUTC: {
                rise: '2046-01-24T19:22:17.708Z',
                set: '2046-01-24T08:29:55.019Z'
            },
            getMoonTimesNonUTC: {
                rise: '2046-01-24T19:22:28.004Z',
                set: '2046-01-24T08:29:46.810Z'
            }
        }
    },
    {
        input: {
            date: '2046-01-24T20:57:19.485Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.954192913293942,
                altitude: -0.7036800803392418
            },
            getTimes: {
                solarNoon: '2046-01-24T12:12:39.199Z',
                nadir: '2046-01-24T00:12:39.199Z',
                sunrise: '2046-01-24T07:48:11.599Z',
                sunset: '2046-01-24T16:37:06.798Z',
                sunriseEnd: '2046-01-24T07:52:10.598Z',
                sunsetStart: '2046-01-24T16:33:07.800Z',
                dawn: '2046-01-24T07:10:59.452Z',
                dusk: '2046-01-24T17:14:18.946Z',
                nauticalDawn: '2046-01-24T06:30:05.686Z',
                nauticalDusk: '2046-01-24T17:55:12.711Z',
                nightEnd: '2046-01-24T05:50:40.380Z',
                night: '2046-01-24T18:34:38.017Z',
                goldenHourEnd: '2046-01-24T08:42:18.960Z',
                goldenHour: '2046-01-24T15:42:59.438Z'
            },
            getMoonPosition: {
                azimuth: -1.5013732266832027,
                altitude: 0.22489148938433667,
                distance: 364104.7170613391,
                parallacticAngle: -0.6769931383493739
            },
            getMoonIllumination: {
                fraction: 0.925651808134351,
                phase: 0.5879062716167427,
                angle: 2.000200559708879
            },
            getMoonTimesUTC: {
                rise: '2046-01-24T19:27:55.066Z',
                set: '2046-01-24T08:44:37.681Z'
            },
            getMoonTimesNonUTC: {
                rise: '2046-01-24T19:28:02.250Z',
                set: '2046-01-24T08:44:25.982Z'
            }
        }
    },
    {
        input: {
            date: '2046-01-24T20:57:19.485Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.2196276191884667,
                altitude: -1.0375176742789831
            },
            getTimes: {
                solarNoon: '2046-01-25T07:17:20.010Z',
                nadir: '2046-01-24T19:17:20.010Z',
                sunrise: '2046-01-25T02:19:47.152Z',
                sunset: '2046-01-25T12:14:52.867Z',
                sunriseEnd: '2046-01-25T02:22:52.907Z',
                sunsetStart: '2046-01-25T12:11:47.112Z',
                dawn: '2046-01-25T01:50:20.913Z',
                dusk: '2046-01-25T12:44:19.106Z',
                nauticalDawn: '2046-01-25T01:17:11.368Z',
                nauticalDusk: '2046-01-25T13:17:28.651Z',
                nightEnd: '2046-01-25T00:44:47.079Z',
                night: '2046-01-25T13:49:52.940Z',
                goldenHourEnd: '2046-01-25T03:00:34.642Z',
                goldenHour: '2046-01-25T11:34:05.377Z'
            },
            getMoonPosition: {
                azimuth: -0.15772660453482734,
                altitude: 0.9870824169441165,
                distance: 364104.7170613391,
                parallacticAngle: -0.12039797162359298
            },
            getMoonIllumination: {
                fraction: 0.925651808134351,
                phase: 0.5879062716167427,
                angle: 2.000200559708879
            },
            getMoonTimesUTC: {
                rise: '2046-01-24T14:30:55.257Z',
                set: '2046-01-24T03:24:11.779Z'
            },
            getMoonTimesNonUTC: {
                rise: '2046-01-24T14:30:46.315Z',
                set: '2046-01-24T03:24:18.487Z'
            }
        }
    },
    {
        input: {
            date: '2046-01-24T20:57:19.485Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.2852472750130808,
                altitude: -0.17865299555984535
            },
            getTimes: {
                solarNoon: '2046-01-25T02:54:41.296Z',
                nadir: '2046-01-24T14:54:41.296Z',
                sunrise: '2046-01-24T21:46:03.770Z',
                sunset: '2046-01-25T08:03:18.821Z',
                sunriseEnd: '2046-01-24T21:48:54.946Z',
                sunsetStart: '2046-01-25T08:00:27.645Z',
                dawn: '2046-01-24T21:18:48.950Z',
                dusk: '2046-01-25T08:30:33.642Z',
                nauticalDawn: '2046-01-24T20:47:55.712Z',
                nauticalDusk: '2046-01-25T09:01:26.880Z',
                nightEnd: '2046-01-24T20:17:37.556Z',
                night: '2046-01-25T09:31:45.035Z',
                goldenHourEnd: '2046-01-24T22:23:23.779Z',
                goldenHour: '2046-01-25T07:25:58.813Z'
            },
            getMoonPosition: {
                azimuth: 1.369139418752549,
                altitude: 0.4915698913851147,
                distance: 364104.7170613391,
                parallacticAngle: 0.9321360768521096
            },
            getMoonIllumination: {
                fraction: 0.925651808134351,
                phase: 0.5879062716167427,
                angle: 2.000200559708879
            },
            getMoonTimesUTC: {
                rise: '2046-01-24T10:00:00.615Z',
                set: '2046-01-24T23:20:24.725Z'
            },
            getMoonTimesNonUTC: {
                rise: '2046-01-24T10:00:00.601Z'
            }
        }
    },
    {
        input: {
            date: '2046-08-03T18:33:18.900Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.8919881129421892,
                altitude: 0.12652758498503944
            },
            getTimes: {
                solarNoon: '2046-08-03T11:58:04.217Z',
                nadir: '2046-08-02T23:58:04.217Z',
                sunrise: '2046-08-03T04:24:49.699Z',
                sunset: '2046-08-03T19:31:18.735Z',
                sunriseEnd: '2046-08-03T04:28:30.978Z',
                sunsetStart: '2046-08-03T19:27:37.456Z',
                dawn: '2046-08-03T03:47:34.371Z',
                dusk: '2046-08-03T20:08:34.063Z',
                nauticalDawn: '2046-08-03T02:59:08.575Z',
                nauticalDusk: '2046-08-03T20:56:59.859Z',
                nightEnd: '2046-08-03T01:58:40.157Z',
                night: '2046-08-03T21:57:28.277Z',
                goldenHourEnd: '2046-08-03T05:10:33.328Z',
                goldenHour: '2046-08-03T18:45:35.106Z'
            },
            getMoonPosition: {
                azimuth: 1.587033038552697,
                altitude: 0.2139995680623242,
                distance: 366466.06424584106,
                parallacticAngle: 0.7309718397802122
            },
            getMoonIllumination: {
                fraction: 0.02434079154714741,
                phase: 0.049864935301354385,
                angle: -1.0909018523205727
            },
            getMoonTimesUTC: {
                rise: '2046-08-03T05:33:51.707Z',
                set: '2046-08-03T19:51:14.439Z'
            },
            getMoonTimesNonUTC: {
                rise: '2046-08-03T05:33:51.707Z',
                set: '2046-08-03T19:51:14.439Z'
            }
        }
    },
    {
        input: {
            date: '2046-08-03T18:33:18.900Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.8567174972248826,
                altitude: 0.1641431336321159
            },
            getTimes: {
                solarNoon: '2046-08-03T12:06:59.393Z',
                nadir: '2046-08-03T00:06:59.393Z',
                sunrise: '2046-08-03T04:24:16.236Z',
                sunset: '2046-08-03T19:49:42.551Z',
                sunriseEnd: '2046-08-03T04:28:14.424Z',
                sunsetStart: '2046-08-03T19:45:44.362Z',
                dawn: '2046-08-03T03:43:47.723Z',
                dusk: '2046-08-03T20:30:11.063Z',
                nauticalDawn: '2046-08-03T02:49:29.289Z',
                nauticalDusk: '2046-08-03T21:24:29.498Z',
                nightEnd: '2046-08-03T01:33:48.661Z',
                night: '2046-08-03T22:40:10.125Z',
                goldenHourEnd: '2046-08-03T05:13:10.824Z',
                goldenHour: '2046-08-03T19:00:47.962Z'
            },
            getMoonPosition: {
                azimuth: 1.5465195905960163,
                altitude: 0.23861475999415496,
                distance: 366466.06424584106,
                parallacticAngle: 0.6834302894738937
            },
            getMoonIllumination: {
                fraction: 0.02434079154714741,
                phase: 0.049864935301354385,
                angle: -1.0909018523205727
            },
            getMoonTimesUTC: {
                rise: '2046-08-03T05:36:43.064Z',
                set: '2046-08-03T20:04:50.077Z'
            },
            getMoonTimesNonUTC: {
                rise: '2046-08-03T05:36:43.064Z',
                set: '2046-08-03T20:04:50.077Z'
            }
        }
    },
    {
        input: {
            date: '2046-08-03T18:33:18.900Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.9638395665748565,
                altitude: -0.5436908944380565
            },
            getTimes: {
                solarNoon: '2046-08-03T07:11:28.968Z',
                nadir: '2046-08-02T19:11:28.968Z',
                sunrise: '2046-08-03T00:01:07.113Z',
                sunset: '2046-08-03T14:21:50.823Z',
                sunriseEnd: '2046-08-03T00:04:12.475Z',
                sunsetStart: '2046-08-03T14:18:45.461Z',
                dawn: '2046-08-02T23:30:26.143Z',
                dusk: '2046-08-03T14:52:31.793Z',
                nauticalDawn: '2046-08-02T22:52:33.326Z',
                nauticalDusk: '2046-08-03T15:30:24.610Z',
                nightEnd: '2046-08-02T22:10:42.835Z',
                night: '2046-08-03T16:12:15.102Z',
                goldenHourEnd: '2046-08-03T00:39:54.331Z',
                goldenHour: '2046-08-03T13:43:03.605Z'
            },
            getMoonPosition: {
                azimuth: 2.597270419117767,
                altitude: -0.5888279656243192,
                distance: 366466.06424584106,
                parallacticAngle: 0.40964958838260196
            },
            getMoonIllumination: {
                fraction: 0.02434079154714741,
                phase: 0.049864935301354385,
                angle: -1.0909018523205727
            },
            getMoonTimesUTC: {
                rise: '2046-08-03T00:48:33.305Z',
                set: '2046-08-03T14:47:28.198Z'
            },
            getMoonTimesNonUTC: {
                rise: '2046-08-03T00:48:33.305Z',
                set: '2046-08-03T14:47:28.198Z'
            }
        }
    },
    {
        input: {
            date: '2046-08-03T18:33:18.900Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.17695483385959,
                altitude: -0.25452494420772775
            },
            getTimes: {
                solarNoon: '2046-08-04T02:48:49.732Z',
                nadir: '2046-08-03T14:48:49.732Z',
                sunrise: '2046-08-03T19:50:27.248Z',
                sunset: '2046-08-04T09:47:12.216Z',
                sunriseEnd: '2046-08-03T19:53:17.502Z',
                sunsetStart: '2046-08-04T09:44:21.963Z',
                dawn: '2046-08-03T19:22:27.201Z',
                dusk: '2046-08-04T10:15:12.264Z',
                nauticalDawn: '2046-08-03T18:48:29.378Z',
                nauticalDusk: '2046-08-04T10:49:10.087Z',
                nightEnd: '2046-08-03T18:12:10.855Z',
                night: '2046-08-04T11:25:28.610Z',
                goldenHourEnd: '2046-08-03T20:26:15.787Z',
                goldenHour: '2046-08-04T09:11:23.678Z'
            },
            getMoonPosition: {
                azimuth: -2.3118993684187403,
                altitude: -0.5331036982560522,
                distance: 366466.06424584106,
                parallacticAngle: -0.6536739562216018
            },
            getMoonIllumination: {
                fraction: 0.02434079154714741,
                phase: 0.049864935301354385,
                angle: -1.0909018523205727
            },
            getMoonTimesUTC: {
                rise: '2046-08-03T21:32:47.359Z',
                set: '2046-08-03T10:11:45.631Z'
            },
            getMoonTimesNonUTC: {
                rise: '2046-08-03T21:32:47.359Z',
                set: '2046-08-03T10:11:45.631Z'
            }
        }
    },
    {
        input: {
            date: '2048-09-06T00:46:40.170Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.8402153141244155,
                altitude: -0.5785405663811665
            },
            getTimes: {
                solarNoon: '2048-09-06T11:50:28.180Z',
                nadir: '2048-09-05T23:50:28.180Z',
                sunrise: '2048-09-06T05:13:42.260Z',
                sunset: '2048-09-06T18:27:14.099Z',
                sunriseEnd: '2048-09-06T05:17:00.170Z',
                sunsetStart: '2048-09-06T18:23:56.189Z',
                dawn: '2048-09-06T04:41:17.360Z',
                dusk: '2048-09-06T18:59:38.999Z',
                nauticalDawn: '2048-09-06T04:02:09.008Z',
                nauticalDusk: '2048-09-06T19:38:47.352Z',
                nightEnd: '2048-09-06T03:20:13.822Z',
                night: '2048-09-06T20:20:42.537Z',
                goldenHourEnd: '2048-09-06T05:55:36.102Z',
                goldenHour: '2048-09-06T17:45:20.258Z'
            },
            getMoonPosition: {
                azimuth: -2.3826098191494145,
                altitude: -0.3256678095852477,
                distance: 396234.95156857825,
                parallacticAngle: -0.4809079482265921
            },
            getMoonIllumination: {
                fraction: 0.055830586777502134,
                phase: 0.9240701142950353,
                angle: 1.7208529446146517
            },
            getMoonTimesUTC: {
                rise: '2048-09-06T03:09:26.153Z',
                set: '2048-09-06T17:12:00.249Z'
            },
            getMoonTimesNonUTC: {
                rise: '2048-09-06T03:09:26.153Z',
                set: '2048-09-06T17:12:00.249Z'
            }
        }
    },
    {
        input: {
            date: '2048-09-06T00:46:40.170Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.8930186657795347,
                altitude: -0.5407960424217808
            },
            getTimes: {
                solarNoon: '2048-09-06T11:59:23.252Z',
                nadir: '2048-09-05T23:59:23.252Z',
                sunrise: '2048-09-06T05:19:16.563Z',
                sunset: '2048-09-06T18:39:29.941Z',
                sunriseEnd: '2048-09-06T05:22:46.244Z',
                sunsetStart: '2048-09-06T18:36:00.260Z',
                dawn: '2048-09-06T04:44:50.880Z',
                dusk: '2048-09-06T19:13:55.624Z',
                nauticalDawn: '2048-09-06T04:02:56.877Z',
                nauticalDusk: '2048-09-06T19:55:49.626Z',
                nightEnd: '2048-09-06T03:17:19.607Z',
                night: '2048-09-06T20:41:26.897Z',
                goldenHourEnd: '2048-09-06T06:03:36.088Z',
                goldenHour: '2048-09-06T17:55:10.416Z'
            },
            getMoonPosition: {
                azimuth: -2.429217086764835,
                altitude: -0.3081086250317573,
                distance: 396234.95156857825,
                parallacticAngle: -0.42865220835663187
            },
            getMoonIllumination: {
                fraction: 0.055830586777502134,
                phase: 0.9240701142950353,
                angle: 1.7208529446146517
            },
            getMoonTimesUTC: {
                rise: '2048-09-06T03:13:10.192Z',
                set: '2048-09-06T17:25:01.554Z'
            },
            getMoonTimesNonUTC: {
                rise: '2048-09-06T03:13:10.192Z',
                set: '2048-09-06T17:25:01.554Z'
            }
        }
    },
    {
        input: {
            date: '2048-09-06T00:46:40.170Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.70155180624314,
                altitude: 0.02387717497096205
            },
            getTimes: {
                solarNoon: '2048-09-06T07:03:56.286Z',
                nadir: '2048-09-05T19:03:56.286Z',
                sunrise: '2048-09-06T00:35:14.371Z',
                sunset: '2048-09-06T13:32:38.202Z',
                sunriseEnd: '2048-09-06T00:38:05.397Z',
                sunsetStart: '2048-09-06T13:29:47.176Z',
                dawn: '2048-09-06T00:07:22.184Z',
                dusk: '2048-09-06T14:00:30.389Z',
                nauticalDawn: '2048-09-05T23:34:14.585Z',
                nauticalDusk: '2048-09-06T14:33:37.988Z',
                nightEnd: '2048-09-05T22:59:49.363Z',
                night: '2048-09-06T15:08:03.210Z',
                goldenHourEnd: '2048-09-06T01:11:33.294Z',
                goldenHour: '2048-09-06T12:56:19.279Z'
            },
            getMoonPosition: {
                azimuth: -1.462831846484785,
                altitude: 0.44091656270823587,
                distance: 396234.95156857825,
                parallacticAngle: -0.8785445052117935
            },
            getMoonIllumination: {
                fraction: 0.055830586777502134,
                phase: 0.9240701142950353,
                angle: 1.7208529446146517
            },
            getMoonTimesUTC: {
                rise: '2048-09-06T23:27:19.630Z',
                set: '2048-09-06T12:09:15.216Z'
            },
            getMoonTimesNonUTC: {
                rise: '2048-09-05T22:25:25.005Z',
                set: '2048-09-06T12:09:15.216Z'
            }
        }
    },
    {
        input: {
            date: '2048-09-06T00:46:40.170Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -0.844040658981555,
                altitude: 0.8912776400553163
            },
            getTimes: {
                solarNoon: '2048-09-06T02:41:24.040Z',
                nadir: '2048-09-05T14:41:24.040Z',
                sunrise: '2048-09-05T20:16:39.450Z',
                sunset: '2048-09-06T09:06:08.630Z',
                sunriseEnd: '2048-09-05T20:19:18.754Z',
                sunsetStart: '2048-09-06T09:03:29.327Z',
                dawn: '2048-09-05T19:50:45.033Z',
                dusk: '2048-09-06T09:32:03.047Z',
                nauticalDawn: '2048-09-05T19:20:08.537Z',
                nauticalDusk: '2048-09-06T10:02:39.543Z',
                nightEnd: '2048-09-05T18:48:40.912Z',
                night: '2048-09-06T10:34:07.168Z',
                goldenHourEnd: '2048-09-05T20:50:31.577Z',
                goldenHour: '2048-09-06T08:32:16.503Z'
            },
            getMoonPosition: {
                azimuth: -0.045795128793469184,
                altitude: 1.1535550661483551,
                distance: 396234.95156857825,
                parallacticAngle: -0.03799925309667733
            },
            getMoonIllumination: {
                fraction: 0.055830586777502134,
                phase: 0.9240701142950353,
                angle: 1.7208529446146517
            },
            getMoonTimesUTC: {
                rise: '2048-09-06T18:57:49.050Z',
                set: '2048-09-06T07:35:02.921Z'
            },
            getMoonTimesNonUTC: {
                rise: '2048-09-06T18:57:49.050Z',
                set: '2048-09-06T07:35:02.921Z'
            }
        }
    },
    {
        input: {
            date: '2050-04-26T10:34:40.051Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -0.5131844446040051,
                altitude: 0.8975656692425992
            },
            getTimes: {
                solarNoon: '2050-04-26T11:49:37.249Z',
                nadir: '2050-04-25T23:49:37.249Z',
                sunrise: '2050-04-26T04:38:42.408Z',
                sunset: '2050-04-26T19:00:32.090Z',
                sunriseEnd: '2050-04-26T04:42:11.671Z',
                sunsetStart: '2050-04-26T18:57:02.827Z',
                dawn: '2050-04-26T04:03:55.174Z',
                dusk: '2050-04-26T19:35:19.324Z',
                nauticalDawn: '2050-04-26T03:20:18.616Z',
                nauticalDusk: '2050-04-26T20:18:55.882Z',
                nightEnd: '2050-04-26T02:30:19.757Z',
                night: '2050-04-26T21:08:54.741Z',
                goldenHourEnd: '2050-04-26T05:22:24.451Z',
                goldenHour: '2050-04-26T18:16:50.047Z'
            },
            getMoonPosition: {
                azimuth: -1.7313928982313203,
                altitude: 0.32302984570189325,
                distance: 396273.2660474572,
                parallacticAngle: -0.7618255108969699
            },
            getMoonIllumination: {
                fraction: 0.27516811178951994,
                phase: 0.1757719048831431,
                angle: -1.4772126986414287
            },
            getMoonTimesUTC: {
                rise: '2050-04-26T08:28:00.610Z'
            },
            getMoonTimesNonUTC: {
                rise: '2050-04-26T08:28:00.610Z',
                set: '2050-04-25T23:31:39.540Z'
            }
        }
    },
    {
        input: {
            date: '2050-04-26T10:34:40.051Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -0.5410428740767117,
                altitude: 0.8450591828753686
            },
            getTimes: {
                solarNoon: '2050-04-26T11:58:32.391Z',
                nadir: '2050-04-25T23:58:32.391Z',
                sunrise: '2050-04-26T04:40:40.481Z',
                sunset: '2050-04-26T19:16:24.301Z',
                sunriseEnd: '2050-04-26T04:44:23.859Z',
                sunsetStart: '2050-04-26T19:12:40.924Z',
                dawn: '2050-04-26T04:03:19.742Z',
                dusk: '2050-04-26T19:53:45.041Z',
                nauticalDawn: '2050-04-26T03:15:39.953Z',
                nauticalDusk: '2050-04-26T20:41:24.830Z',
                nightEnd: '2050-04-26T02:18:35.489Z',
                night: '2050-04-26T21:38:29.294Z',
                goldenHourEnd: '2050-04-26T05:27:08.250Z',
                goldenHour: '2050-04-26T18:29:56.533Z'
            },
            getMoonPosition: {
                azimuth: -1.745148375641767,
                altitude: 0.30620432113045276,
                distance: 396273.2660474572,
                parallacticAngle: -0.7095206141159105
            },
            getMoonIllumination: {
                fraction: 0.27516811178951994,
                phase: 0.1757719048831431,
                angle: -1.4772126986414287
            },
            getMoonTimesUTC: {
                rise: '2050-04-26T08:26:14.834Z'
            },
            getMoonTimesNonUTC: {
                rise: '2050-04-26T08:26:14.834Z',
                set: '2050-04-25T23:52:50.977Z'
            }
        }
    },
    {
        input: {
            date: '2050-04-26T10:34:40.051Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.3152331490951714,
                altitude: 0.6328617997420141
            },
            getTimes: {
                solarNoon: '2050-04-26T07:03:03.118Z',
                nadir: '2050-04-25T19:03:03.118Z',
                sunrise: '2050-04-26T00:09:28.192Z',
                sunset: '2050-04-26T13:56:38.044Z',
                sunriseEnd: '2050-04-26T00:12:26.173Z',
                sunsetStart: '2050-04-26T13:53:40.063Z',
                dawn: '2050-04-25T23:40:12.878Z',
                dusk: '2050-04-26T14:25:53.358Z',
                nauticalDawn: '2050-04-25T23:04:43.749Z',
                nauticalDusk: '2050-04-26T15:01:22.487Z',
                nightEnd: '2050-04-25T22:26:42.323Z',
                night: '2050-04-26T15:39:23.913Z',
                goldenHourEnd: '2050-04-26T00:46:56.861Z',
                goldenHour: '2050-04-26T13:19:09.375Z'
            },
            getMoonPosition: {
                azimuth: -0.5401407714207979,
                altitude: 1.1599733735622442,
                distance: 396273.2660474572,
                parallacticAngle: -0.42709564129668354
            },
            getMoonIllumination: {
                fraction: 0.27516811178951994,
                phase: 0.1757719048831431,
                angle: -1.4772126986414287
            },
            getMoonTimesUTC: {
                rise: '2050-04-26T03:56:02.663Z',
                set: '2050-04-26T18:53:03.268Z'
            },
            getMoonTimesNonUTC: {
                rise: '2050-04-26T03:56:02.663Z',
                set: '2050-04-26T18:53:03.268Z'
            }
        }
    },
    {
        input: {
            date: '2050-04-26T10:34:40.051Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.0685600452173745,
                altitude: -0.2504642927713101
            },
            getTimes: {
                solarNoon: '2050-04-26T02:40:28.849Z',
                nadir: '2050-04-25T14:40:28.849Z',
                sunrise: '2050-04-25T19:55:26.897Z',
                sunset: '2050-04-26T09:25:30.800Z',
                sunriseEnd: '2050-04-25T19:58:11.635Z',
                sunsetStart: '2050-04-26T09:22:46.063Z',
                dawn: '2050-04-25T19:28:29.163Z',
                dusk: '2050-04-26T09:52:28.535Z',
                nauticalDawn: '2050-04-25T18:56:09.822Z',
                nauticalDusk: '2050-04-26T10:24:47.875Z',
                nightEnd: '2050-04-25T18:22:14.418Z',
                night: '2050-04-26T10:58:43.279Z',
                goldenHourEnd: '2050-04-25T20:30:15.208Z',
                goldenHour: '2050-04-26T08:50:42.489Z'
            },
            getMoonPosition: {
                azimuth: 1.4975634124640067,
                altitude: 0.7170153693934685,
                distance: 396273.2660474572,
                parallacticAngle: 1.037134723939102
            },
            getMoonIllumination: {
                fraction: 0.27516811178951994,
                phase: 0.1757719048831431,
                angle: -1.4772126986414287
            },
            getMoonTimesUTC: {
                set: '2050-04-26T14:09:43.879Z'
            },
            getMoonTimesNonUTC: {
                rise: '2050-04-25T23:37:09.595Z',
                set: '2050-04-26T14:09:43.879Z'
            }
        }
    },
    {
        input: {
            date: '2050-08-28T15:00:07.952Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.0732975746041782,
                altitude: 0.6054040221902609
            },
            getTimes: {
                solarNoon: '2050-08-28T11:53:30.544Z',
                nadir: '2050-08-27T23:53:30.544Z',
                sunrise: '2050-08-28T05:00:12.886Z',
                sunset: '2050-08-28T18:46:48.202Z',
                sunriseEnd: '2050-08-28T05:03:35.279Z',
                sunsetStart: '2050-08-28T18:43:25.809Z',
                dawn: '2050-08-28T04:26:50.621Z',
                dusk: '2050-08-28T19:20:10.467Z',
                nauticalDawn: '2050-08-28T03:45:53.441Z',
                nauticalDusk: '2050-08-28T20:01:07.647Z',
                nightEnd: '2050-08-28T03:00:49.117Z',
                night: '2050-08-28T20:46:11.971Z',
                goldenHourEnd: '2050-08-28T05:42:47.420Z',
                goldenHour: '2050-08-28T18:04:13.668Z'
            },
            getMoonPosition: {
                azimuth: -1.2531196735686314,
                altitude: -0.13337952233500577,
                distance: 372981.16818130127,
                parallacticAngle: -0.7174675327210364
            },
            getMoonIllumination: {
                fraction: 0.8200595289501664,
                phase: 0.36055749422217953,
                angle: -1.6085634064283434
            },
            getMoonTimesUTC: {
                rise: '2050-08-28T15:53:38.528Z',
                set: '2050-08-28T00:21:34.176Z'
            },
            getMoonTimesNonUTC: {
                rise: '2050-08-28T15:53:38.528Z',
                set: '2050-08-28T00:21:34.176Z'
            }
        }
    },
    {
        input: {
            date: '2050-08-28T15:00:07.952Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.0071247501371556,
                altitude: 0.6035028463498716
            },
            getTimes: {
                solarNoon: '2050-08-28T12:02:25.636Z',
                nadir: '2050-08-28T00:02:25.636Z',
                sunrise: '2050-08-28T05:04:05.301Z',
                sunset: '2050-08-28T19:00:45.971Z',
                sunriseEnd: '2050-08-28T05:07:40.352Z',
                sunsetStart: '2050-08-28T18:57:10.921Z',
                dawn: '2050-08-28T04:28:29.703Z',
                dusk: '2050-08-28T19:36:21.569Z',
                nauticalDawn: '2050-08-28T03:44:17.873Z',
                nauticalDusk: '2050-08-28T20:20:33.400Z',
                nightEnd: '2050-08-28T02:54:23.783Z',
                night: '2050-08-28T21:10:27.489Z',
                goldenHourEnd: '2050-08-28T05:49:12.675Z',
                goldenHour: '2050-08-28T18:15:38.597Z'
            },
            getMoonPosition: {
                azimuth: -1.2889854497691058,
                altitude: -0.1708550034326054,
                distance: 372981.16818130127,
                parallacticAngle: -0.6801687184672973
            },
            getMoonIllumination: {
                fraction: 0.8200595289501664,
                phase: 0.36055749422217953,
                angle: -1.6085634064283434
            },
            getMoonTimesUTC: {
                rise: '2050-08-28T16:12:01.670Z',
                set: '2050-08-28T00:20:47.847Z'
            },
            getMoonTimesNonUTC: {
                rise: '2050-08-28T16:12:01.670Z',
                set: '2050-08-28T00:20:47.847Z'
            }
        }
    },
    {
        input: {
            date: '2050-08-28T15:00:07.952Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.041061420169261,
                altitude: -0.25157850856804514
            },
            getTimes: {
                solarNoon: '2050-08-28T07:06:57.997Z',
                nadir: '2050-08-27T19:06:57.997Z',
                sunrise: '2050-08-28T00:25:56.390Z',
                sunset: '2050-08-28T13:47:59.603Z',
                sunriseEnd: '2050-08-28T00:28:50.272Z',
                sunsetStart: '2050-08-28T13:45:05.721Z',
                dawn: '2050-08-27T23:57:29.316Z',
                dusk: '2050-08-28T14:16:26.677Z',
                nauticalDawn: '2050-08-27T23:23:21.194Z',
                nauticalDusk: '2050-08-28T14:50:34.799Z',
                nightEnd: '2050-08-27T22:47:23.798Z',
                night: '2050-08-28T15:26:32.195Z',
                goldenHourEnd: '2050-08-28T01:02:42.796Z',
                goldenHour: '2050-08-28T13:11:13.197Z'
            },
            getMoonPosition: {
                azimuth: -0.19077424215626548,
                altitude: 0.5331801425086795,
                distance: 372981.16818130127,
                parallacticAngle: -0.1517604857334478
            },
            getMoonIllumination: {
                fraction: 0.8200595289501664,
                phase: 0.36055749422217953,
                angle: -1.6085634064283434
            },
            getMoonTimesUTC: {
                rise: '2050-08-28T10:35:11.843Z',
                set: '2050-08-28T20:51:36.636Z'
            },
            getMoonTimesNonUTC: {
                rise: '2050-08-28T10:35:11.843Z',
                set: '2050-08-28T20:51:36.636Z'
            }
        }
    },
    {
        input: {
            date: '2050-08-28T15:00:07.952Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -3.034158826553856,
                altitude: -0.7737000679128181
            },
            getTimes: {
                solarNoon: '2050-08-29T02:44:07.706Z',
                nadir: '2050-08-28T14:44:07.706Z',
                sunrise: '2050-08-28T20:10:11.717Z',
                sunset: '2050-08-29T09:18:03.696Z',
                sunriseEnd: '2050-08-28T20:12:53.038Z',
                sunsetStart: '2050-08-29T09:15:22.374Z',
                dawn: '2050-08-28T19:43:53.237Z',
                dusk: '2050-08-29T09:44:22.175Z',
                nauticalDawn: '2050-08-28T19:12:36.723Z',
                nauticalDusk: '2050-08-29T10:15:38.689Z',
                nightEnd: '2050-08-28T18:40:11.275Z',
                night: '2050-08-29T10:48:04.137Z',
                goldenHourEnd: '2050-08-28T20:44:23.884Z',
                goldenHour: '2050-08-29T08:43:51.528Z'
            },
            getMoonPosition: {
                azimuth: 0.9485799996383772,
                altitude: 0.25780919305591526,
                distance: 372981.16818130127,
                parallacticAngle: 0.7674797717469438
            },
            getMoonIllumination: {
                fraction: 0.8200595289501664,
                phase: 0.36055749422217953,
                angle: -1.6085634064283434
            },
            getMoonTimesUTC: {
                rise: '2050-08-28T05:51:33.227Z',
                set: '2050-08-28T16:27:45.523Z'
            },
            getMoonTimesNonUTC: {
                rise: '2050-08-28T05:51:33.227Z',
                set: '2050-08-28T16:27:45.523Z'
            }
        }
    },
    {
        input: {
            date: '2052-07-28T00:23:40.716Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -3.0210271071556685,
                altitude: -0.3806175232700329
            },
            getTimes: {
                solarNoon: '2052-07-28T11:58:16.463Z',
                nadir: '2052-07-27T23:58:16.463Z',
                sunrise: '2052-07-28T04:17:21.297Z',
                sunset: '2052-07-28T19:39:11.628Z',
                sunriseEnd: '2052-07-28T04:21:07.630Z',
                sunsetStart: '2052-07-28T19:35:25.296Z',
                dawn: '2052-07-28T03:39:03.007Z',
                dusk: '2052-07-28T20:17:29.919Z',
                nauticalDawn: '2052-07-28T02:48:26.908Z',
                nauticalDusk: '2052-07-28T21:08:06.018Z',
                nightEnd: '2052-07-28T01:42:11.158Z',
                night: '2052-07-28T22:14:21.768Z',
                goldenHourEnd: '2052-07-28T05:03:56.236Z',
                goldenHour: '2052-07-28T18:52:36.689Z'
            },
            getMoonPosition: {
                azimuth: 2.771037716017575,
                altitude: -0.5363742419145349,
                distance: 382323.3357164916,
                parallacticAngle: 0.24285443339689913
            },
            getMoonIllumination: {
                fraction: 0.053910366977959256,
                phase: 0.07458782525318053,
                angle: -1.0891457409219896
            },
            getMoonTimesUTC: {
                rise: '2052-07-28T07:18:08.399Z',
                set: '2052-07-28T20:37:33.100Z'
            },
            getMoonTimesNonUTC: {
                rise: '2052-07-28T07:18:08.399Z',
                set: '2052-07-28T20:37:33.100Z'
            }
        }
    },
    {
        input: {
            date: '2052-07-28T00:23:40.716Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -3.0619675272528846,
                altitude: -0.33709252964078407
            },
            getTimes: {
                solarNoon: '2052-07-28T12:07:11.659Z',
                nadir: '2052-07-28T00:07:11.659Z',
                sunrise: '2052-07-28T04:15:51.933Z',
                sunset: '2052-07-28T19:58:31.385Z',
                sunriseEnd: '2052-07-28T04:19:56.468Z',
                sunsetStart: '2052-07-28T19:54:26.850Z',
                dawn: '2052-07-28T03:34:01.404Z',
                dusk: '2052-07-28T20:40:21.914Z',
                nauticalDawn: '2052-07-28T02:36:31.892Z',
                nauticalDusk: '2052-07-28T21:37:51.426Z',
                nightEnd: '2052-07-28T01:06:37.673Z',
                night: '2052-07-28T23:07:45.645Z',
                goldenHourEnd: '2052-07-28T05:05:49.424Z',
                goldenHour: '2052-07-28T19:08:33.894Z'
            },
            getMoonPosition: {
                azimuth: 2.7379246867921085,
                altitude: -0.4841415689209736,
                distance: 382323.3357164916,
                parallacticAngle: 0.2493314469198621
            },
            getMoonIllumination: {
                fraction: 0.053910366977959256,
                phase: 0.07458782525318053,
                angle: -1.0891457409219896
            },
            getMoonTimesUTC: {
                rise: '2052-07-28T07:24:25.469Z',
                set: '2052-07-28T20:49:06.910Z'
            },
            getMoonTimesNonUTC: {
                rise: '2052-07-28T07:24:25.469Z',
                set: '2052-07-28T20:49:06.910Z'
            }
        }
    },
    {
        input: {
            date: '2052-07-28T00:23:40.716Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.9521503853108721,
                altitude: 0.06956992222900794
            },
            getTimes: {
                solarNoon: '2052-07-28T07:11:40.569Z',
                nadir: '2052-07-27T19:11:40.569Z',
                sunrise: '2052-07-27T23:55:46.888Z',
                sunset: '2052-07-28T14:27:34.251Z',
                sunriseEnd: '2052-07-27T23:58:55.170Z',
                sunsetStart: '2052-07-28T14:24:25.969Z',
                dawn: '2052-07-27T23:24:32.058Z',
                dusk: '2052-07-28T14:58:49.081Z',
                nauticalDawn: '2052-07-27T22:45:41.598Z',
                nauticalDusk: '2052-07-28T15:37:39.541Z',
                nightEnd: '2052-07-27T22:02:14.550Z',
                night: '2052-07-28T16:21:06.589Z',
                goldenHourEnd: '2052-07-28T00:35:05.456Z',
                goldenHour: '2052-07-28T13:48:15.683Z'
            },
            getMoonPosition: {
                azimuth: -2.119730728811384,
                altitude: -0.35966018413393785,
                distance: 382323.3357164916,
                parallacticAngle: -0.710966311447506
            },
            getMoonIllumination: {
                fraction: 0.053910366977959256,
                phase: 0.07458782525318053,
                angle: -1.0891457409219896
            },
            getMoonTimesUTC: {
                rise: '2052-07-28T02:27:24.626Z',
                set: '2052-07-28T15:38:54.123Z'
            },
            getMoonTimesNonUTC: {
                rise: '2052-07-28T02:27:24.626Z',
                set: '2052-07-28T15:38:54.123Z'
            }
        }
    },
    {
        input: {
            date: '2052-07-28T00:23:40.716Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.255430667761932,
                altitude: 0.9482151843436715
            },
            getTimes: {
                solarNoon: '2052-07-28T02:49:04.647Z',
                nadir: '2052-07-27T14:49:04.647Z',
                sunrise: '2052-07-27T19:45:18.611Z',
                sunset: '2052-07-28T09:52:50.683Z',
                sunriseEnd: '2052-07-27T19:48:11.531Z',
                sunsetStart: '2052-07-28T09:49:57.763Z',
                dawn: '2052-07-27T19:16:48.557Z',
                dusk: '2052-07-28T10:21:20.737Z',
                nauticalDawn: '2052-07-27T18:42:03.110Z',
                nauticalDusk: '2052-07-28T10:56:06.185Z',
                nightEnd: '2052-07-27T18:04:33.636Z',
                night: '2052-07-28T11:33:35.659Z',
                goldenHourEnd: '2052-07-27T20:21:36.561Z',
                goldenHour: '2052-07-28T09:16:32.734Z'
            },
            getMoonPosition: {
                azimuth: -1.3749514509815177,
                altitude: 0.4894876305861358,
                distance: 382323.3357164916,
                parallacticAngle: -0.9342373374126516
            },
            getMoonIllumination: {
                fraction: 0.053910366977959256,
                phase: 0.07458782525318053,
                angle: -1.0891457409219896
            },
            getMoonTimesUTC: {
                rise: '2052-07-28T22:58:07.129Z',
                set: '2052-07-28T11:06:49.758Z'
            },
            getMoonTimesNonUTC: {
                set: '2052-07-28T11:06:49.758Z'
            }
        }
    },
    {
        input: {
            date: '2053-08-17T02:53:55.179Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.3462692948051984,
                altitude: -0.2795125582322812
            },
            getTimes: {
                solarNoon: '2053-08-17T11:56:10.608Z',
                nadir: '2053-08-16T23:56:10.608Z',
                sunrise: '2053-08-17T04:44:49.112Z',
                sunset: '2053-08-17T19:07:32.103Z',
                sunriseEnd: '2053-08-17T04:48:18.577Z',
                sunsetStart: '2053-08-17T19:04:02.638Z',
                dawn: '2053-08-17T04:09:59.393Z',
                dusk: '2053-08-17T19:42:21.822Z',
                nauticalDawn: '2053-08-17T03:26:18.134Z',
                nauticalDusk: '2053-08-17T20:26:03.081Z',
                nightEnd: '2053-08-17T02:36:10.147Z',
                night: '2053-08-17T21:16:11.068Z',
                goldenHourEnd: '2053-08-17T05:28:33.179Z',
                goldenHour: '2053-08-17T18:23:48.036Z'
            },
            getMoonPosition: {
                azimuth: -3.0089814110550726,
                altitude: -0.7267170508646146,
                distance: 379248.0440945624,
                parallacticAngle: -0.08713685307406008
            },
            getMoonIllumination: {
                fraction: 0.12702909106969473,
                phase: 0.11599983930970714,
                angle: -1.1836608606350527
            },
            getMoonTimesUTC: {
                rise: '2053-08-17T08:52:05.376Z',
                set: '2053-08-17T20:48:33.996Z'
            },
            getMoonTimesNonUTC: {
                rise: '2053-08-17T08:52:05.376Z',
                set: '2053-08-17T20:48:33.996Z'
            }
        }
    },
    {
        input: {
            date: '2053-08-17T02:53:55.179Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.3901408802535404,
                altitude: -0.2638330599463127
            },
            getTimes: {
                solarNoon: '2053-08-17T12:05:05.733Z',
                nadir: '2053-08-17T00:05:05.733Z',
                sunrise: '2053-08-17T04:46:45.599Z',
                sunset: '2053-08-17T19:23:25.866Z',
                sunriseEnd: '2053-08-17T04:50:29.211Z',
                sunsetStart: '2053-08-17T19:19:42.254Z',
                dawn: '2053-08-17T04:09:21.902Z',
                dusk: '2053-08-17T20:00:49.563Z',
                nauticalDawn: '2053-08-17T03:21:36.153Z',
                nauticalDusk: '2053-08-17T20:48:35.312Z',
                nightEnd: '2053-08-17T02:24:18.312Z',
                night: '2053-08-17T21:45:53.153Z',
                goldenHourEnd: '2053-08-17T05:33:15.679Z',
                goldenHour: '2053-08-17T18:36:55.787Z'
            },
            getMoonPosition: {
                azimuth: -3.0645361589478135,
                altitude: -0.6833290337789821,
                distance: 379248.0440945624,
                parallacticAngle: -0.04795053062891916
            },
            getMoonIllumination: {
                fraction: 0.12702909106969473,
                phase: 0.11599983930970714,
                angle: -1.1836608606350527
            },
            getMoonTimesUTC: {
                rise: '2053-08-17T09:01:55.205Z',
                set: '2053-08-17T20:55:58.125Z'
            },
            getMoonTimesNonUTC: {
                rise: '2053-08-17T09:01:55.205Z',
                set: '2053-08-17T20:55:58.125Z'
            }
        }
    },
    {
        input: {
            date: '2053-08-17T02:53:55.179Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.4501044704467565,
                altitude: 0.5039574376581711
            },
            getTimes: {
                solarNoon: '2053-08-17T07:09:37.002Z',
                nadir: '2053-08-16T19:09:37.002Z',
                sunrise: '2053-08-17T00:15:13.521Z',
                sunset: '2053-08-17T14:04:00.483Z',
                sunriseEnd: '2053-08-17T00:18:11.808Z',
                sunsetStart: '2053-08-17T14:01:02.196Z',
                dawn: '2053-08-16T23:45:54.644Z',
                dusk: '2053-08-17T14:33:19.360Z',
                nauticalDawn: '2053-08-16T23:10:19.564Z',
                nauticalDusk: '2053-08-17T15:08:54.439Z',
                nightEnd: '2053-08-16T22:32:08.919Z',
                night: '2053-08-17T15:47:05.084Z',
                goldenHourEnd: '2053-08-17T00:52:45.402Z',
                goldenHour: '2053-08-17T13:26:28.602Z'
            },
            getMoonPosition: {
                azimuth: -1.700778271176329,
                altitude: -0.17328409236234232,
                distance: 379248.0440945624,
                parallacticAngle: -0.8507811369484567
            },
            getMoonIllumination: {
                fraction: 0.12702909106969473,
                phase: 0.11599983930970714,
                angle: -1.1836608606350527
            },
            getMoonTimesUTC: {
                rise: '2053-08-17T03:50:20.994Z',
                set: '2053-08-17T16:00:24.004Z'
            },
            getMoonTimesNonUTC: {
                rise: '2053-08-17T03:50:20.994Z',
                set: '2053-08-17T16:00:24.004Z'
            }
        }
    },
    {
        input: {
            date: '2053-08-17T02:53:55.179Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 0.10010453770957574,
                altitude: 1.1839187268030171
            },
            getTimes: {
                solarNoon: '2053-08-17T02:47:03.177Z',
                nadir: '2053-08-16T14:47:03.177Z',
                sunrise: '2053-08-16T20:00:59.077Z',
                sunset: '2053-08-17T09:33:07.277Z',
                sunriseEnd: '2053-08-16T20:03:44.188Z',
                sunsetStart: '2053-08-17T09:30:22.166Z',
                dawn: '2053-08-16T19:33:57.102Z',
                dusk: '2053-08-17T10:00:09.251Z',
                nauticalDawn: '2053-08-16T19:01:31.046Z',
                nauticalDusk: '2053-08-17T10:32:35.308Z',
                nightEnd: '2053-08-16T18:27:25.997Z',
                night: '2053-08-17T11:06:40.357Z',
                goldenHourEnd: '2053-08-16T20:35:51.415Z',
                goldenHour: '2053-08-17T08:58:14.939Z'
            },
            getMoonPosition: {
                azimuth: -0.8957623388464324,
                altitude: 0.6892277175334338,
                distance: 379248.0440945624,
                parallacticAngle: -0.687185032457206
            },
            getMoonIllumination: {
                fraction: 0.12702909106969473,
                phase: 0.11599983930970714,
                angle: -1.1836608606350527
            },
            getMoonTimesUTC: {
                set: '2053-08-17T11:32:16.240Z'
            },
            getMoonTimesNonUTC: {
                rise: '2053-08-16T23:15:10.045Z',
                set: '2053-08-17T11:32:16.240Z'
            }
        }
    },
    {
        input: {
            date: '2055-05-07T18:21:35.590Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.8767351363257454,
                altitude: 0.1205918895343911
            },
            getTimes: {
                solarNoon: '2055-05-07T11:48:28.672Z',
                nadir: '2055-05-06T23:48:28.672Z',
                sunrise: '2055-05-07T04:20:33.678Z',
                sunset: '2055-05-07T19:16:23.667Z',
                sunriseEnd: '2055-05-07T04:24:11.738Z',
                sunsetStart: '2055-05-07T19:12:45.607Z',
                dawn: '2055-05-07T03:43:58.197Z',
                dusk: '2055-05-07T19:52:59.148Z',
                nauticalDawn: '2055-05-07T02:56:52.337Z',
                nauticalDusk: '2055-05-07T20:40:05.008Z',
                nightEnd: '2055-05-07T01:59:34.092Z',
                night: '2055-05-07T21:37:23.253Z',
                goldenHourEnd: '2055-05-07T05:05:44.603Z',
                goldenHour: '2055-05-07T18:31:12.742Z'
            },
            getMoonPosition: {
                azimuth: -0.8985368459151581,
                altitude: 0.5422853908851678,
                distance: 364263.53533665347,
                parallacticAngle: -0.5412551388939238
            },
            getMoonIllumination: {
                fraction: 0.8666091290990208,
                phase: 0.38099131915653695,
                angle: -1.090434795659536
            },
            getMoonTimesUTC: {
                rise: '2055-05-07T14:47:59.428Z',
                set: '2055-05-07T03:04:05.935Z'
            },
            getMoonTimesNonUTC: {
                rise: '2055-05-07T14:47:59.428Z',
                set: '2055-05-07T03:04:05.935Z'
            }
        }
    },
    {
        input: {
            date: '2055-05-07T18:21:35.590Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.8416178970267492,
                altitude: 0.15764654909628373
            },
            getTimes: {
                solarNoon: '2055-05-07T11:57:23.851Z',
                nadir: '2055-05-06T23:57:23.851Z',
                sunrise: '2055-05-07T04:20:36.654Z',
                sunset: '2055-05-07T19:34:11.048Z',
                sunriseEnd: '2055-05-07T04:24:30.848Z',
                sunsetStart: '2055-05-07T19:30:16.854Z',
                dawn: '2055-05-07T03:40:59.194Z',
                dusk: '2055-05-07T20:13:48.508Z',
                nauticalDawn: '2055-05-07T02:48:33.860Z',
                nauticalDusk: '2055-05-07T21:06:13.842Z',
                nightEnd: '2055-05-07T01:39:08.972Z',
                night: '2055-05-07T22:15:38.731Z',
                goldenHourEnd: '2055-05-07T05:08:51.563Z',
                goldenHour: '2055-05-07T18:45:56.139Z'
            },
            getMoonPosition: {
                azimuth: -0.9164234362028765,
                altitude: 0.49422375423510095,
                distance: 364263.53533665347,
                parallacticAngle: -0.5169876125291357
            },
            getMoonIllumination: {
                fraction: 0.8666091290990208,
                phase: 0.38099131915653695,
                angle: -1.090434795659536
            },
            getMoonTimesUTC: {
                rise: '2055-05-07T14:55:18.368Z',
                set: '2055-05-07T03:15:01.620Z'
            },
            getMoonTimesNonUTC: {
                rise: '2055-05-07T14:55:18.368Z',
                set: '2055-05-07T03:15:01.620Z'
            }
        }
    },
    {
        input: {
            date: '2055-05-07T18:21:35.590Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.952631079554096,
                altitude: -0.5568467493374798
            },
            getTimes: {
                solarNoon: '2055-05-07T07:01:53.363Z',
                nadir: '2055-05-06T19:01:53.363Z',
                sunrise: '2055-05-06T23:55:49.321Z',
                sunset: '2055-05-07T14:07:57.406Z',
                sunriseEnd: '2055-05-06T23:58:52.583Z',
                sunsetStart: '2055-05-07T14:04:54.144Z',
                dawn: '2055-05-06T23:25:32.684Z',
                dusk: '2055-05-07T14:38:14.042Z',
                nauticalDawn: '2055-05-06T22:48:20.925Z',
                nauticalDusk: '2055-05-07T15:15:25.802Z',
                nightEnd: '2055-05-06T22:07:37.428Z',
                night: '2055-05-07T15:56:09.299Z',
                goldenHourEnd: '2055-05-07T00:34:14.045Z',
                goldenHour: '2055-05-07T13:29:32.681Z'
            },
            getMoonPosition: {
                azimuth: 0.7402425049862994,
                altitude: 0.7527599405239104,
                distance: 364263.53533665347,
                parallacticAngle: 0.5370620076216961
            },
            getMoonIllumination: {
                fraction: 0.8666091290990208,
                phase: 0.38099131915653695,
                angle: -1.090434795659536
            },
            getMoonTimesUTC: {
                rise: '2055-05-07T09:50:48.388Z',
                set: '2055-05-07T22:38:05.636Z'
            },
            getMoonTimesNonUTC: {
                rise: '2055-05-07T09:50:48.388Z',
                set: '2055-05-06T22:03:51.957Z'
            }
        }
    },
    {
        input: {
            date: '2055-05-07T18:21:35.590Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.1721074928868958,
                altitude: -0.27009526654459703
            },
            getTimes: {
                solarNoon: '2055-05-08T02:39:14.668Z',
                nadir: '2055-05-07T14:39:14.668Z',
                sunrise: '2055-05-07T19:42:57.984Z',
                sunset: '2055-05-08T09:35:31.352Z',
                sunriseEnd: '2055-05-07T19:45:47.269Z',
                sunsetStart: '2055-05-08T09:32:42.067Z',
                dawn: '2055-05-07T19:15:08.845Z',
                dusk: '2055-05-08T10:03:20.492Z',
                nauticalDawn: '2055-05-07T18:41:28.274Z',
                nauticalDusk: '2055-05-08T10:37:01.062Z',
                nightEnd: '2055-05-07T18:05:35.139Z',
                night: '2055-05-08T11:12:54.198Z',
                goldenHourEnd: '2055-05-07T20:18:35.868Z',
                goldenHour: '2055-05-08T08:59:53.468Z'
            },
            getMoonPosition: {
                azimuth: 1.6537190863203843,
                altitude: -0.043030085793192716,
                distance: 364263.53533665347,
                parallacticAngle: 0.9444217861779725
            },
            getMoonIllumination: {
                fraction: 0.8666091290990208,
                phase: 0.38099131915653695,
                angle: -1.090434795659536
            },
            getMoonTimesUTC: {
                rise: '2055-05-07T05:17:48.944Z',
                set: '2055-05-07T18:07:46.271Z'
            },
            getMoonTimesNonUTC: {
                rise: '2055-05-07T05:17:48.944Z',
                set: '2055-05-07T18:07:46.271Z'
            }
        }
    },
    {
        input: {
            date: '2055-05-31T23:42:05.366Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 3.118236189219617,
                altitude: -0.336022445839398
            },
            getTimes: {
                solarNoon: '2055-05-31T11:49:38.512Z',
                nadir: '2055-05-30T23:49:38.512Z',
                sunrise: '2055-05-31T03:51:49.531Z',
                sunset: '2055-05-31T19:47:27.493Z',
                sunriseEnd: '2055-05-31T03:55:48.811Z',
                sunsetStart: '2055-05-31T19:43:28.214Z',
                dawn: '2055-05-31T03:10:46.790Z',
                dusk: '2055-05-31T20:28:30.234Z',
                nauticalDawn: '2055-05-31T02:14:01.348Z',
                nauticalDusk: '2055-05-31T21:25:15.677Z',
                nightEnd: '2055-05-31T00:42:45.126Z',
                night: '2055-05-31T22:56:31.898Z',
                goldenHourEnd: '2055-05-31T04:40:35.142Z',
                goldenHour: '2055-05-31T18:58:41.882Z'
            },
            getMoonPosition: {
                azimuth: 1.9601997277654835,
                altitude: 0.04221343581217038,
                distance: 368147.38530847215,
                parallacticAngle: 0.686350763010874
            },
            getMoonIllumination: {
                fraction: 0.31801963267310074,
                phase: 0.19071211519419223,
                angle: -1.2627231878269922
            },
            getMoonTimesUTC: {
                rise: '2055-05-31T08:35:59.060Z',
                set: '2055-05-31T23:59:04.452Z'
            },
            getMoonTimesNonUTC: {
                rise: '2055-06-01T09:50:44.712Z',
                set: '2055-05-31T23:59:04.452Z'
            }
        }
    },
    {
        input: {
            date: '2055-05-31T23:42:05.366Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 3.080916981745993,
                altitude: -0.28877012703377175
            },
            getTimes: {
                solarNoon: '2055-05-31T11:58:33.764Z',
                nadir: '2055-05-30T23:58:33.764Z',
                sunrise: '2055-05-31T03:48:08.469Z',
                sunset: '2055-05-31T20:08:59.060Z',
                sunriseEnd: '2055-05-31T03:52:29.615Z',
                sunsetStart: '2055-05-31T20:04:37.914Z',
                dawn: '2055-05-31T03:02:36.741Z',
                dusk: '2055-05-31T20:54:30.788Z',
                nauticalDawn: '2055-05-31T01:55:13.544Z',
                nauticalDusk: '2055-05-31T22:01:53.984Z',
                nightEnd: null,
                night: null,
                goldenHourEnd: '2055-05-31T04:40:48.807Z',
                goldenHour: '2055-05-31T19:16:18.721Z'
            },
            getMoonPosition: {
                azimuth: 1.9283438316122121,
                altitude: 0.08060360058679902,
                distance: 368147.38530847215,
                parallacticAngle: 0.6523360317483159
            },
            getMoonIllumination: {
                fraction: 0.31801963267310074,
                phase: 0.19071211519419223,
                angle: -1.2627231878269922
            },
            getMoonTimesUTC: {
                rise: '2055-05-31T08:35:35.780Z'
            },
            getMoonTimesNonUTC: {
                rise: '2055-06-01T09:52:20.995Z',
                set: '2055-06-01T00:15:29.673Z'
            }
        }
    },
    {
        input: {
            date: '2055-05-31T23:42:05.366Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.079116771235375,
                altitude: 0.005894920285860232
            },
            getTimes: {
                solarNoon: '2055-06-01T07:03:09.368Z',
                nadir: '2055-05-31T19:03:09.368Z',
                sunrise: '2055-05-31T23:34:53.265Z',
                sunset: '2055-06-01T14:31:25.472Z',
                sunriseEnd: '2055-05-31T23:38:08.981Z',
                sunsetStart: '2055-06-01T14:28:09.755Z',
                dawn: '2055-05-31T23:02:11.783Z',
                dusk: '2055-06-01T15:04:06.954Z',
                nauticalDawn: '2055-05-31T22:20:50.260Z',
                nauticalDusk: '2055-06-01T15:45:28.476Z',
                nightEnd: '2055-05-31T21:32:53.522Z',
                night: '2055-06-01T16:33:25.215Z',
                goldenHourEnd: '2055-06-01T00:15:31.738Z',
                goldenHour: '2055-06-01T13:50:46.998Z'
            },
            getMoonPosition: {
                azimuth: 3.0898835045124398,
                altitude: -0.5694098314758912,
                distance: 368147.38530847215,
                parallacticAngle: 0.04079611308234557
            },
            getMoonIllumination: {
                fraction: 0.31801963267310074,
                phase: 0.19071211519419223,
                angle: -1.2627231878269922
            },
            getMoonTimesUTC: {
                rise: '2055-05-31T03:58:34.142Z',
                set: '2055-05-31T18:42:51.045Z'
            },
            getMoonTimesNonUTC: {
                rise: '2055-06-01T05:08:15.414Z',
                set: '2055-06-01T19:23:40.683Z'
            }
        }
    },
    {
        input: {
            date: '2055-05-31T23:42:05.366Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.4383335098449184,
                altitude: 0.8618846400107831
            },
            getTimes: {
                solarNoon: '2055-06-01T02:40:31.787Z',
                nadir: '2055-05-31T14:40:31.787Z',
                sunrise: '2055-05-31T19:26:51.948Z',
                sunset: '2055-06-01T09:54:11.626Z',
                sunriseEnd: '2055-05-31T19:29:50.419Z',
                sunsetStart: '2055-06-01T09:51:13.156Z',
                dawn: '2055-05-31T18:57:19.334Z',
                dusk: '2055-06-01T10:23:44.240Z',
                nauticalDawn: '2055-05-31T18:20:53.410Z',
                nauticalDusk: '2055-06-01T11:00:10.165Z',
                nightEnd: '2055-05-31T17:40:49.282Z',
                night: '2055-06-01T11:40:14.293Z',
                goldenHourEnd: '2055-05-31T20:04:11.301Z',
                goldenHour: '2055-06-01T09:16:52.274Z'
            },
            getMoonPosition: {
                azimuth: -2.0811282241396443,
                altitude: -0.18422173271934378,
                distance: 368147.38530847215,
                parallacticAngle: -0.8299950243006431
            },
            getMoonIllumination: {
                fraction: 0.31801963267310074,
                phase: 0.19071211519419223,
                angle: -1.2627231878269922
            },
            getMoonTimesUTC: {
                set: '2055-05-31T14:01:35.244Z'
            },
            getMoonTimesNonUTC: {
                rise: '2055-06-01T00:43:45.406Z',
                set: '2055-06-01T14:45:57.447Z'
            }
        }
    },
    {
        input: {
            date: '2057-03-23T19:09:27.269Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.8260049530876266,
                altitude: -0.19308626304441745
            },
            getTimes: {
                solarNoon: '2057-03-23T11:58:31.653Z',
                nadir: '2057-03-22T23:58:31.653Z',
                sunrise: '2057-03-23T05:47:02.435Z',
                sunset: '2057-03-23T18:10:00.870Z',
                sunriseEnd: '2057-03-23T05:50:17.016Z',
                sunsetStart: '2057-03-23T18:06:46.289Z',
                dawn: '2057-03-23T05:15:27.458Z',
                dusk: '2057-03-23T18:41:35.848Z',
                nauticalDawn: '2057-03-23T04:38:05.577Z',
                nauticalDusk: '2057-03-23T19:18:57.728Z',
                nightEnd: '2057-03-23T03:59:15.775Z',
                night: '2057-03-23T19:57:47.530Z',
                goldenHourEnd: '2057-03-23T06:28:37.023Z',
                goldenHour: '2057-03-23T17:28:26.282Z'
            },
            getMoonPosition: {
                azimuth: -1.6776277084660365,
                altitude: -0.3267133302246602,
                distance: 366846.2192449221,
                parallacticAngle: -0.7279233974227628
            },
            getMoonIllumination: {
                fraction: 0.9022395613931764,
                phase: 0.6012222741820682,
                angle: 1.7899553313215302
            },
            getMoonTimesUTC: {
                rise: '2057-03-23T21:11:54.738Z',
                set: '2057-03-23T07:18:44.528Z'
            },
            getMoonTimesNonUTC: {
                rise: '2057-03-23T21:12:03.637Z',
                set: '2057-03-23T07:18:44.125Z'
            }
        }
    },
    {
        input: {
            date: '2057-03-23T19:09:27.269Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.8029931997559963,
                altitude: -0.1577317634366785
            },
            getTimes: {
                solarNoon: '2057-03-23T12:07:26.736Z',
                nadir: '2057-03-23T00:07:26.736Z',
                sunrise: '2057-03-23T05:55:06.640Z',
                sunset: '2057-03-23T18:19:46.831Z',
                sunriseEnd: '2057-03-23T05:58:32.353Z',
                sunsetStart: '2057-03-23T18:16:21.118Z',
                dawn: '2057-03-23T05:21:41.444Z',
                dusk: '2057-03-23T18:53:12.027Z',
                nauticalDawn: '2057-03-23T04:41:59.934Z',
                nauticalDusk: '2057-03-23T19:32:53.538Z',
                nightEnd: '2057-03-23T04:00:23.329Z',
                night: '2057-03-23T20:14:30.142Z',
                goldenHourEnd: '2057-03-23T06:39:04.150Z',
                goldenHour: '2057-03-23T17:35:49.321Z'
            },
            getMoonPosition: {
                azimuth: -1.7251494641172014,
                altitude: -0.3454115818684337,
                distance: 366846.2192449221,
                parallacticAngle: -0.6757625269998486
            },
            getMoonIllumination: {
                fraction: 0.9022395613931764,
                phase: 0.6012222741820682,
                angle: 1.7899553313215302
            },
            getMoonTimesUTC: {
                rise: '2057-03-23T21:27:06.460Z',
                set: '2057-03-23T07:24:12.441Z'
            },
            getMoonTimesNonUTC: {
                rise: '2057-03-23T21:27:13.818Z',
                set: '2057-03-23T07:24:15.726Z'
            }
        }
    },
    {
        input: {
            date: '2057-03-23T19:09:27.269Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 3.138525397368094,
                altitude: -0.8417280140534555
            },
            getTimes: {
                solarNoon: '2057-03-24T07:11:40.515Z',
                nadir: '2057-03-23T19:11:40.515Z',
                sunrise: '2057-03-24T01:01:07.052Z',
                sunset: '2057-03-24T13:22:13.978Z',
                sunriseEnd: '2057-03-24T01:03:55.962Z',
                sunsetStart: '2057-03-24T13:19:25.069Z',
                dawn: '2057-03-24T00:33:44.640Z',
                dusk: '2057-03-24T13:49:36.390Z',
                nauticalDawn: '2057-03-24T00:01:35.733Z',
                nauticalDusk: '2057-03-24T14:21:45.297Z',
                nightEnd: '2057-03-23T23:28:43.771Z',
                night: '2057-03-24T14:54:37.260Z',
                goldenHourEnd: '2057-03-24T01:37:11.452Z',
                goldenHour: '2057-03-24T12:46:09.579Z'
            },
            getMoonPosition: {
                azimuth: -0.7158733535347457,
                altitude: 0.5097495883154379,
                distance: 366846.2192449221,
                parallacticAngle: -0.5303843709758095
            },
            getMoonIllumination: {
                fraction: 0.9022395613931764,
                phase: 0.6012222741820682,
                angle: 1.7899553313215302
            },
            getMoonTimesUTC: {
                rise: '2057-03-23T15:57:31.003Z',
                set: '2057-03-23T02:35:18.708Z'
            },
            getMoonTimesNonUTC: {
                rise: '2057-03-23T15:57:26.394Z',
                set: '2057-03-23T02:35:05.949Z'
            }
        }
    },
    {
        input: {
            date: '2057-03-23T19:09:27.269Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.8455554877481963,
                altitude: -0.3316441325161934
            },
            getTimes: {
                solarNoon: '2057-03-24T02:49:07.965Z',
                nadir: '2057-03-23T14:49:07.965Z',
                sunrise: '2057-03-23T20:39:55.044Z',
                sunset: '2057-03-24T08:58:20.885Z',
                sunriseEnd: '2057-03-23T20:42:32.613Z',
                sunsetStart: '2057-03-24T08:55:43.316Z',
                dawn: '2057-03-23T20:14:24.246Z',
                dusk: '2057-03-24T09:23:51.683Z',
                nauticalDawn: '2057-03-23T19:44:32.515Z',
                nauticalDusk: '2057-03-24T09:53:43.414Z',
                nightEnd: '2057-03-23T19:14:13.295Z',
                night: '2057-03-24T10:24:02.634Z',
                goldenHourEnd: '2057-03-23T21:13:34.307Z',
                goldenHour: '2057-03-24T08:24:41.622Z'
            },
            getMoonPosition: {
                azimuth: 0.6522997773727246,
                altitude: 0.6265388430729911,
                distance: 366846.2192449221,
                parallacticAngle: 0.5252778085842736
            },
            getMoonIllumination: {
                fraction: 0.9022395613931764,
                phase: 0.6012222741820682,
                angle: 1.7899553313215302
            },
            getMoonTimesUTC: {
                rise: '2057-03-23T11:16:51.190Z',
                set: '2057-03-23T22:45:46.416Z'
            },
            getMoonTimesNonUTC: {
                rise: '2057-03-23T11:17:03.556Z',
                set: '2057-03-23T22:45:34.440Z'
            }
        }
    },
    {
        input: {
            date: '2058-01-23T23:08:07.516Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.708166659492051,
                altitude: -1.0241596757708498
            },
            getTimes: {
                solarNoon: '2058-01-23T12:03:26.247Z',
                nadir: '2058-01-23T00:03:26.247Z',
                sunrise: '2058-01-23T07:31:05.025Z',
                sunset: '2058-01-23T16:35:47.470Z',
                sunriseEnd: '2058-01-23T07:34:48.087Z',
                sunsetStart: '2058-01-23T16:32:04.408Z',
                dawn: '2058-01-23T06:56:10.796Z',
                dusk: '2058-01-23T17:10:41.699Z',
                nauticalDawn: '2058-01-23T06:17:33.119Z',
                nauticalDusk: '2058-01-23T17:49:19.376Z',
                nightEnd: '2058-01-23T05:40:11.790Z',
                night: '2058-01-23T18:26:40.705Z',
                goldenHourEnd: '2058-01-23T08:21:06.757Z',
                goldenHour: '2058-01-23T15:45:45.738Z'
            },
            getMoonPosition: {
                azimuth: 2.8491727586060107,
                altitude: -1.1067394395613348,
                distance: 364434.9343600815,
                parallacticAngle: 0.20836931532162536
            },
            getMoonIllumination: {
                fraction: 0.0032206816255874737,
                phase: 0.9819258691706436,
                angle: 0.9110230542118041
            },
            getMoonTimesUTC: {
                rise: '2058-01-23T07:02:39.399Z',
                set: '2058-01-23T15:19:21.666Z'
            },
            getMoonTimesNonUTC: {
                rise: '2058-01-24T07:53:28.535Z',
                set: '2058-01-24T16:35:36.207Z'
            }
        }
    },
    {
        input: {
            date: '2058-01-23T23:08:07.516Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.674664200409738,
                altitude: -0.9716763840730981
            },
            getTimes: {
                solarNoon: '2058-01-23T12:12:21.548Z',
                nadir: '2058-01-23T00:12:21.548Z',
                sunrise: '2058-01-23T07:49:30.732Z',
                sunset: '2058-01-23T16:35:12.364Z',
                sunriseEnd: '2058-01-23T07:53:30.894Z',
                sunsetStart: '2058-01-23T16:31:12.202Z',
                dawn: '2058-01-23T07:12:09.653Z',
                dusk: '2058-01-23T17:12:33.443Z',
                nauticalDawn: '2058-01-23T06:31:09.329Z',
                nauticalDusk: '2058-01-23T17:53:33.767Z',
                nightEnd: '2058-01-23T05:51:40.282Z',
                night: '2058-01-23T18:33:02.814Z',
                goldenHourEnd: '2058-01-23T08:43:58.616Z',
                goldenHour: '2058-01-23T15:40:44.480Z'
            },
            getMoonPosition: {
                azimuth: 2.801451889730567,
                altitude: -1.0550336585057207,
                distance: 364434.9343600815,
                parallacticAngle: 0.2284680481571961
            },
            getMoonIllumination: {
                fraction: 0.0032206816255874737,
                phase: 0.9819258691706436,
                angle: 0.9110230542118041
            },
            getMoonTimesUTC: {
                rise: '2058-01-23T07:27:06.172Z',
                set: '2058-01-23T15:14:47.034Z'
            },
            getMoonTimesNonUTC: {
                rise: '2058-01-24T08:15:28.951Z',
                set: '2058-01-24T16:32:47.190Z'
            }
        }
    },
    {
        input: {
            date: '2058-01-23T23:08:07.516Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.659372098073434,
                altitude: -0.6348758252855127
            },
            getTimes: {
                solarNoon: '2058-01-24T07:17:03.017Z',
                nadir: '2058-01-23T19:17:03.017Z',
                sunrise: '2058-01-24T02:20:33.994Z',
                sunset: '2058-01-24T12:13:32.039Z',
                sunriseEnd: '2058-01-24T02:23:40.303Z',
                sunsetStart: '2058-01-24T12:10:25.730Z',
                dawn: '2058-01-24T01:51:03.172Z',
                dusk: '2058-01-24T12:43:02.862Z',
                nauticalDawn: '2058-01-24T01:17:49.756Z',
                nauticalDusk: '2058-01-24T13:16:16.277Z',
                nightEnd: '2058-01-24T00:45:22.819Z',
                night: '2058-01-24T13:48:43.214Z',
                goldenHourEnd: '2058-01-24T03:01:30.137Z',
                goldenHour: '2058-01-24T11:32:35.896Z'
            },
            getMoonPosition: {
                azimuth: -1.525339364150518,
                altitude: -0.5958446267841551,
                distance: 364434.9343600815,
                parallacticAngle: -0.9716075696170287
            },
            getMoonIllumination: {
                fraction: 0.0032206816255874737,
                phase: 0.9819258691706436,
                angle: 0.9110230542118041
            },
            getMoonTimesUTC: {
                rise: '2058-01-23T01:30:50.394Z',
                set: '2058-01-23T10:53:28.029Z'
            },
            getMoonTimesNonUTC: {
                rise: '2058-01-24T02:26:44.176Z',
                set: '2058-01-24T12:04:23.725Z'
            }
        }
    },
    {
        input: {
            date: '2058-01-23T23:08:07.516Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -0.9353033299140263,
                altitude: 0.23551520918647795
            },
            getTimes: {
                solarNoon: '2058-01-24T02:54:24.151Z',
                nadir: '2058-01-23T14:54:24.151Z',
                sunrise: '2058-01-23T21:46:38.942Z',
                sunset: '2058-01-24T08:02:09.360Z',
                sunriseEnd: '2058-01-23T21:49:30.552Z',
                sunsetStart: '2058-01-24T07:59:17.749Z',
                dawn: '2058-01-23T21:19:20.442Z',
                dusk: '2058-01-24T08:29:27.860Z',
                nauticalDawn: '2058-01-23T20:48:23.927Z',
                nauticalDusk: '2058-01-24T09:00:24.374Z',
                nightEnd: '2058-01-23T20:18:03.357Z',
                night: '2058-01-24T09:30:44.945Z',
                goldenHourEnd: '2058-01-23T22:24:05.499Z',
                goldenHour: '2058-01-24T07:24:42.803Z'
            },
            getMoonPosition: {
                azimuth: -0.8188988663716482,
                altitude: 0.24321750811533596,
                distance: 364434.9343600815,
                parallacticAngle: -0.7037534397084122
            },
            getMoonIllumination: {
                fraction: 0.0032206816255874737,
                phase: 0.9819258691706436,
                angle: 0.9110230542118041
            },
            getMoonTimesUTC: {
                rise: '2058-01-23T21:39:12.543Z',
                set: '2058-01-23T06:34:30.536Z'
            },
            getMoonTimesNonUTC: {
                rise: '2058-01-24T22:29:38.287Z',
                set: '2058-01-24T07:43:19.944Z'
            }
        }
    },
    {
        input: {
            date: '2058-03-25T13:10:45.173Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 0.43214075151780296,
                altitude: 0.7007524181336388
            },
            getTimes: {
                solarNoon: '2058-03-25T11:57:58.728Z',
                nadir: '2058-03-24T23:57:58.728Z',
                sunrise: '2058-03-25T05:43:20.726Z',
                sunset: '2058-03-25T18:12:36.731Z',
                sunriseEnd: '2058-03-25T05:46:35.492Z',
                sunsetStart: '2058-03-25T18:09:21.965Z',
                dawn: '2058-03-25T05:11:41.902Z',
                dusk: '2058-03-25T18:44:15.555Z',
                nauticalDawn: '2058-03-25T04:34:10.233Z',
                nauticalDusk: '2058-03-25T19:21:47.223Z',
                nightEnd: '2058-03-25T03:55:02.695Z',
                night: '2058-03-25T20:00:54.761Z',
                goldenHourEnd: '2058-03-25T06:24:54.826Z',
                goldenHour: '2058-03-25T17:31:02.631Z'
            },
            getMoonPosition: {
                azimuth: 0.03826313315409455,
                altitude: 0.784981802150549,
                distance: 382046.8118898148,
                parallacticAngle: 0.0252312325434078
            },
            getMoonIllumination: {
                fraction: 0.022580450007299246,
                phase: 0.04801363143200699,
                angle: -1.6893788991423684
            },
            getMoonTimesUTC: {
                rise: '2058-03-25T06:40:29.458Z',
                set: '2058-03-25T19:42:35.729Z'
            },
            getMoonTimesNonUTC: {
                rise: '2058-03-25T06:40:29.155Z',
                set: '2058-03-25T19:42:46.441Z'
            }
        }
    },
    {
        input: {
            date: '2058-03-25T13:10:45.173Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 0.3687951951715945,
                altitude: 0.6678765621196032
            },
            getTimes: {
                solarNoon: '2058-03-25T12:06:53.811Z',
                nadir: '2058-03-25T00:06:53.811Z',
                sunrise: '2058-03-25T05:51:06.262Z',
                sunset: '2058-03-25T18:22:41.360Z',
                sunriseEnd: '2058-03-25T05:54:32.197Z',
                sunsetStart: '2058-03-25T18:19:15.424Z',
                dawn: '2058-03-25T05:17:36.377Z',
                dusk: '2058-03-25T18:56:11.245Z',
                nauticalDawn: '2058-03-25T04:37:42.714Z',
                nauticalDusk: '2058-03-25T19:36:04.907Z',
                nightEnd: '2058-03-25T03:55:43.424Z',
                night: '2058-03-25T20:18:04.198Z',
                goldenHourEnd: '2058-03-25T06:35:03.102Z',
                goldenHour: '2058-03-25T17:38:44.520Z'
            },
            getMoonPosition: {
                azimuth: -0.01590911963057208,
                altitude: 0.7390420909121079,
                distance: 382046.8118898148,
                parallacticAngle: -0.009925558369094846
            },
            getMoonIllumination: {
                fraction: 0.022580450007299246,
                phase: 0.04801363143200699,
                angle: -1.6893788991423684
            },
            getMoonTimesUTC: {
                rise: '2058-03-25T06:48:06.064Z',
                set: '2058-03-25T19:55:08.428Z'
            },
            getMoonTimesNonUTC: {
                rise: '2058-03-25T06:48:13.576Z',
                set: '2058-03-25T19:55:13.373Z'
            }
        }
    },
    {
        input: {
            date: '2058-03-25T13:10:45.173Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.5963615489017333,
                altitude: 0.014432616349486841
            },
            getTimes: {
                solarNoon: '2058-03-25T07:11:26.499Z',
                nadir: '2058-03-24T19:11:26.499Z',
                sunrise: '2058-03-25T00:59:52.685Z',
                sunset: '2058-03-25T13:23:00.313Z',
                sunriseEnd: '2058-03-25T01:02:41.647Z',
                sunsetStart: '2058-03-25T13:20:11.351Z',
                dawn: '2058-03-25T00:32:29.279Z',
                dusk: '2058-03-25T13:50:23.718Z',
                nauticalDawn: '2058-03-25T00:00:17.999Z',
                nauticalDusk: '2058-03-25T14:22:34.999Z',
                nightEnd: '2058-03-24T23:27:22.016Z',
                night: '2058-03-25T14:55:30.981Z',
                goldenHourEnd: '2058-03-25T01:35:57.066Z',
                goldenHour: '2058-03-25T12:46:55.932Z'
            },
            getMoonPosition: {
                azimuth: 1.4279047565140095,
                altitude: 0.2662513127841347,
                distance: 382046.8118898148,
                parallacticAngle: 0.8510506963317601
            },
            getMoonIllumination: {
                fraction: 0.022580450007299246,
                phase: 0.04801363143200699,
                angle: -1.6893788991423684
            },
            getMoonTimesUTC: {
                rise: '2058-03-25T01:51:18.951Z',
                set: '2058-03-25T14:36:09.979Z'
            },
            getMoonTimesNonUTC: {
                rise: '2058-03-25T01:51:13.997Z',
                set: '2058-03-25T14:35:58.027Z'
            }
        }
    },
    {
        input: {
            date: '2058-03-25T13:10:45.173Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.509618132498381,
                altitude: -0.8109414527338538
            },
            getTimes: {
                solarNoon: '2058-03-25T02:48:53.953Z',
                nadir: '2058-03-24T14:48:53.953Z',
                sunrise: '2058-03-24T20:38:50.689Z',
                sunset: '2058-03-25T08:58:57.217Z',
                sunriseEnd: '2058-03-24T20:41:28.298Z',
                sunsetStart: '2058-03-25T08:56:19.608Z',
                dawn: '2058-03-24T20:13:19.156Z',
                dusk: '2058-03-25T09:24:28.750Z',
                nauticalDawn: '2058-03-24T19:43:25.707Z',
                nauticalDusk: '2058-03-25T09:54:22.199Z',
                nightEnd: '2058-03-24T19:13:03.647Z',
                night: '2058-03-25T10:24:44.259Z',
                goldenHourEnd: '2058-03-24T21:12:29.960Z',
                goldenHour: '2058-03-25T08:25:17.946Z'
            },
            getMoonPosition: {
                azimuth: 2.2142981616535526,
                altitude: -0.5998368080505491,
                distance: 382046.8118898148,
                parallacticAngle: 0.7093815638207143
            },
            getMoonIllumination: {
                fraction: 0.022580450007299246,
                phase: 0.04801363143200699,
                angle: -1.6893788991423684
            },
            getMoonTimesUTC: {
                rise: '2058-03-25T21:53:44.414Z',
                set: '2058-03-25T10:00:02.443Z'
            },
            getMoonTimesNonUTC: {
                rise: '2058-03-25T21:53:39.585Z',
                set: '2058-03-25T10:00:02.520Z'
            }
        }
    },
    {
        input: {
            date: '2061-02-04T10:46:34.069Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -0.3502467279772211,
                altitude: 0.394915569790814
            },
            getTimes: {
                solarNoon: '2061-02-04T12:05:47.085Z',
                nadir: '2061-02-04T00:05:47.085Z',
                sunrise: '2061-02-04T07:16:04.781Z',
                sunset: '2061-02-04T16:55:29.389Z',
                sunriseEnd: '2061-02-04T07:19:37.733Z',
                sunsetStart: '2061-02-04T16:51:56.437Z',
                dawn: '2061-02-04T06:42:29.868Z',
                dusk: '2061-02-04T17:29:04.302Z',
                nauticalDawn: '2061-02-04T06:04:51.824Z',
                nauticalDusk: '2061-02-04T18:06:42.346Z',
                nightEnd: '2061-02-04T05:28:03.989Z',
                night: '2061-02-04T18:43:30.181Z',
                goldenHourEnd: '2061-02-04T08:03:16.663Z',
                goldenHour: '2061-02-04T16:08:17.507Z'
            },
            getMoonPosition: {
                azimuth: 2.7856644554697234,
                altitude: -0.30040600323532235,
                distance: 381232.8282467463,
                parallacticAngle: 0.24818768127568158
            },
            getMoonIllumination: {
                fraction: 0.9981517563519727,
                phase: 0.5136887442501831,
                angle: 0.30911798876050745
            },
            getMoonTimesUTC: {
                rise: '2061-02-04T16:42:41.324Z',
                set: '2061-02-04T07:53:27.179Z'
            },
            getMoonTimesNonUTC: {
                rise: '2061-02-04T16:42:48.177Z',
                set: '2061-02-04T07:53:34.663Z'
            }
        }
    },
    {
        input: {
            date: '2061-02-04T10:46:34.069Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -0.38273868698237246,
                altitude: 0.34280995185835395
            },
            getTimes: {
                solarNoon: '2061-02-04T12:14:42.326Z',
                nadir: '2061-02-04T00:14:42.326Z',
                sunrise: '2061-02-04T07:32:30.920Z',
                sunset: '2061-02-04T16:56:53.731Z',
                sunriseEnd: '2061-02-04T07:36:18.615Z',
                sunsetStart: '2061-02-04T16:53:06.037Z',
                dawn: '2061-02-04T06:56:45.659Z',
                dusk: '2061-02-04T17:32:38.993Z',
                nauticalDawn: '2061-02-04T06:16:54.614Z',
                nauticalDusk: '2061-02-04T18:12:30.038Z',
                nightEnd: '2061-02-04T05:38:02.239Z',
                night: '2061-02-04T18:51:22.412Z',
                goldenHourEnd: '2061-02-04T08:23:21.703Z',
                goldenHour: '2061-02-04T16:06:02.948Z'
            },
            getMoonPosition: {
                azimuth: 2.753896467836503,
                altitude: -0.24826551150363818,
                distance: 381232.8282467463,
                parallacticAngle: 0.25487673153812374
            },
            getMoonIllumination: {
                fraction: 0.9981517563519727,
                phase: 0.5136887442501831,
                angle: 0.30911798876050745
            },
            getMoonTimesUTC: {
                rise: '2061-02-04T16:40:56.660Z',
                set: '2061-02-04T08:13:46.658Z'
            },
            getMoonTimesNonUTC: {
                rise: '2061-02-04T16:41:03.259Z',
                set: '2061-02-04T08:13:57.539Z'
            }
        }
    },
    {
        input: {
            date: '2061-02-04T10:46:34.069Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 0.9067436327170824,
                altitude: 0.2639821751696235
            },
            getTimes: {
                solarNoon: '2061-02-04T07:19:09.748Z',
                nadir: '2061-02-03T19:19:09.748Z',
                sunrise: '2061-02-04T02:10:59.229Z',
                sunset: '2061-02-04T12:27:20.268Z',
                sunriseEnd: '2061-02-04T02:13:59.949Z',
                sunsetStart: '2061-02-04T12:24:19.547Z',
                dawn: '2061-02-04T01:42:14.459Z',
                dusk: '2061-02-04T12:56:05.038Z',
                nauticalDawn: '2061-02-04T01:09:39.340Z',
                nauticalDusk: '2061-02-04T13:28:40.156Z',
                nightEnd: '2061-02-04T00:37:37.555Z',
                night: '2061-02-04T14:00:41.941Z',
                goldenHourEnd: '2061-02-04T02:50:28.173Z',
                goldenHour: '2061-02-04T11:47:51.324Z'
            },
            getMoonPosition: {
                azimuth: -2.307704024244555,
                altitude: -0.20627067607168093,
                distance: 381232.8282467463,
                parallacticAngle: -0.6452235986830327
            },
            getMoonIllumination: {
                fraction: 0.9981517563519727,
                phase: 0.5136887442501831,
                angle: 0.30911798876050745
            },
            getMoonTimesUTC: {
                rise: '2061-02-04T12:08:11.878Z',
                set: '2061-02-04T02:30:19.038Z'
            },
            getMoonTimesNonUTC: {
                rise: '2061-02-04T12:08:03.398Z',
                set: '2061-02-04T02:30:10.204Z'
            }
        }
    },
    {
        input: {
            date: '2061-02-04T10:46:34.069Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.6119517373985297,
                altitude: -0.5588010244785362
            },
            getTimes: {
                solarNoon: '2061-02-04T02:56:32.495Z',
                nadir: '2061-02-03T14:56:32.495Z',
                sunrise: '2061-02-03T21:39:10.665Z',
                sunset: '2061-02-04T08:13:54.326Z',
                sunriseEnd: '2061-02-03T21:41:57.867Z',
                sunsetStart: '2061-02-04T08:11:07.123Z',
                dawn: '2061-02-03T21:12:29.405Z',
                dusk: '2061-02-04T08:40:35.585Z',
                nauticalDawn: '2061-02-03T20:42:05.615Z',
                nauticalDusk: '2061-02-04T09:10:59.375Z',
                nightEnd: '2061-02-03T20:12:08.447Z',
                night: '2061-02-04T09:40:56.543Z',
                goldenHourEnd: '2061-02-03T22:15:30.628Z',
                goldenHour: '2061-02-04T07:37:34.362Z'
            },
            getMoonPosition: {
                azimuth: -1.629168985783332,
                altitude: 0.5794028359419421,
                distance: 381232.8282467463,
                parallacticAngle: -1.0528357069283447
            },
            getMoonIllumination: {
                fraction: 0.9981517563519727,
                phase: 0.5136887442501831,
                angle: 0.30911798876050745
            },
            getMoonTimesUTC: {
                rise: '2061-02-04T07:47:28.781Z',
                set: '2061-02-04T22:22:05.253Z'
            },
            getMoonTimesNonUTC: {
                rise: '2061-02-04T07:47:23.638Z',
                set: '2061-02-04T22:22:00.202Z'
            }
        }
    },
    {
        input: {
            date: '2061-03-04T18:53:47.067Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.6692182796726762,
                altitude: -0.23413495616070942
            },
            getTimes: {
                solarNoon: '2061-03-04T12:03:52.136Z',
                nadir: '2061-03-04T00:03:52.136Z',
                sunrise: '2061-03-04T06:26:43.263Z',
                sunset: '2061-03-04T17:41:01.009Z',
                sunriseEnd: '2061-03-04T06:30:00.029Z',
                sunsetStart: '2061-03-04T17:37:44.243Z',
                dawn: '2061-03-04T05:55:08.756Z',
                dusk: '2061-03-04T18:12:35.516Z',
                nauticalDawn: '2061-03-04T05:18:38.904Z',
                nauticalDusk: '2061-03-04T18:49:05.368Z',
                nightEnd: '2061-03-04T04:41:48.829Z',
                night: '2061-03-04T19:25:55.443Z',
                goldenHourEnd: '2061-03-04T07:09:19.196Z',
                goldenHour: '2061-03-04T16:58:25.076Z'
            },
            getMoonPosition: {
                azimuth: -1.4207191006636806,
                altitude: 0.5042849010352342,
                distance: 384948.39760278637,
                parallacticAngle: -0.7439458770094336
            },
            getMoonIllumination: {
                fraction: 0.9814619353153106,
                phase: 0.45652562282269016,
                angle: -0.9307395730328988
            },
            getMoonTimesUTC: {
                rise: '2061-03-04T15:42:49.502Z',
                set: '2061-03-04T06:18:56.576Z'
            },
            getMoonTimesNonUTC: {
                rise: '2061-03-04T15:42:43.465Z',
                set: '2061-03-04T06:19:00.004Z'
            }
        }
    },
    {
        input: {
            date: '2061-03-04T18:53:47.067Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.649113431034192,
                altitude: -0.20521808224566956
            },
            getTimes: {
                solarNoon: '2061-03-04T12:12:47.253Z',
                nadir: '2061-03-04T00:12:47.253Z',
                sunrise: '2061-03-04T06:38:11.514Z',
                sunset: '2061-03-04T17:47:22.992Z',
                sunriseEnd: '2061-03-04T06:41:39.778Z',
                sunsetStart: '2061-03-04T17:43:54.728Z',
                dawn: '2061-03-04T06:04:48.242Z',
                dusk: '2061-03-04T18:20:46.264Z',
                nauticalDawn: '2061-03-04T05:26:12.800Z',
                nauticalDusk: '2061-03-04T18:59:21.706Z',
                nightEnd: '2061-03-04T04:47:08.995Z',
                night: '2061-03-04T19:38:25.511Z',
                goldenHourEnd: '2061-03-04T07:23:23.017Z',
                goldenHour: '2061-03-04T17:02:11.489Z'
            },
            getMoonPosition: {
                azimuth: -1.4282560113602911,
                altitude: 0.47291612132512767,
                distance: 384948.39760278637,
                parallacticAngle: -0.6962645010713054
            },
            getMoonIllumination: {
                fraction: 0.9814619353153106,
                phase: 0.45652562282269016,
                angle: -0.9307395730328988
            },
            getMoonTimesUTC: {
                rise: '2061-03-04T15:43:14.550Z',
                set: '2061-03-04T06:38:15.806Z'
            },
            getMoonTimesNonUTC: {
                rise: '2061-03-04T15:43:06.651Z',
                set: '2061-03-04T06:38:04.665Z'
            }
        }
    },
    {
        input: {
            date: '2061-03-04T18:53:47.067Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.979752537727594,
                altitude: -0.9666450017705275
            },
            getTimes: {
                solarNoon: '2061-03-04T07:17:18.786Z',
                nadir: '2061-03-03T19:17:18.786Z',
                sunrise: '2061-03-04T01:33:54.621Z',
                sunset: '2061-03-04T13:00:42.951Z',
                sunriseEnd: '2061-03-04T01:36:45.010Z',
                sunsetStart: '2061-03-04T12:57:52.562Z',
                dawn: '2061-03-04T01:06:30.731Z',
                dusk: '2061-03-04T13:28:06.841Z',
                nauticalDawn: '2061-03-04T00:34:50.264Z',
                nauticalDusk: '2061-03-04T13:59:47.308Z',
                nightEnd: '2061-03-04T00:03:03.949Z',
                night: '2061-03-04T14:31:33.623Z',
                goldenHourEnd: '2061-03-04T02:10:37.463Z',
                goldenHour: '2061-03-04T12:24:00.109Z'
            },
            getMoonPosition: {
                azimuth: 0.2893659905860631,
                altitude: 1.1273633289566363,
                distance: 384948.39760278637,
                parallacticAngle: 0.2270732355867654
            },
            getMoonIllumination: {
                fraction: 0.9814619353153106,
                phase: 0.45652562282269016,
                angle: -0.9307395730328988
            },
            getMoonTimesUTC: {
                rise: '2061-03-04T11:03:10.663Z',
                set: '2061-03-04T01:03:00.197Z'
            },
            getMoonTimesNonUTC: {
                rise: '2061-03-04T11:03:14.544Z',
                set: '2061-03-04T01:02:54.090Z'
            }
        }
    },
    {
        input: {
            date: '2061-03-04T18:53:47.067Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.7936116137779228,
                altitude: -0.48293350174123306
            },
            getTimes: {
                solarNoon: '2061-03-05T02:54:31.772Z',
                nadir: '2061-03-04T14:54:31.772Z',
                sunrise: '2061-03-04T21:06:50.289Z',
                sunset: '2061-03-05T08:42:13.255Z',
                sunriseEnd: '2061-03-04T21:09:28.966Z',
                sunsetStart: '2061-03-05T08:39:34.578Z',
                dawn: '2061-03-04T20:41:17.606Z',
                dusk: '2061-03-05T09:07:45.938Z',
                nauticalDawn: '2061-03-04T20:11:44.335Z',
                nauticalDusk: '2061-03-05T09:37:19.209Z',
                nightEnd: '2061-03-04T19:42:08.437Z',
                night: '2061-03-05T10:06:55.107Z',
                goldenHourEnd: '2061-03-04T21:40:57.068Z',
                goldenHour: '2061-03-05T08:08:06.476Z'
            },
            getMoonPosition: {
                azimuth: 1.6373545374952099,
                altitude: 0.4016069147545732,
                distance: 384948.39760278637,
                parallacticAngle: 1.004102432531971
            },
            getMoonIllumination: {
                fraction: 0.9814619353153106,
                phase: 0.45652562282269016,
                angle: -0.9307395730328988
            },
            getMoonTimesUTC: {
                rise: '2061-03-04T06:40:45.446Z',
                set: '2061-03-04T20:53:52.956Z'
            },
            getMoonTimesNonUTC: {
                rise: '2061-03-04T06:40:43.896Z',
                set: '2061-03-04T20:53:45.620Z'
            }
        }
    },
    {
        input: {
            date: '2061-11-12T05:02:48.645Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.463661719018173,
                altitude: -0.3168218715790388
            },
            getTimes: {
                solarNoon: '2061-11-12T11:36:05.014Z',
                nadir: '2061-11-11T23:36:05.014Z',
                sunrise: '2061-11-12T06:53:19.439Z',
                sunset: '2061-11-12T16:18:50.590Z',
                sunriseEnd: '2061-11-12T06:56:56.146Z',
                sunsetStart: '2061-11-12T16:15:13.883Z',
                dawn: '2061-11-12T06:19:15.102Z',
                dusk: '2061-11-12T16:52:54.927Z',
                nauticalDawn: '2061-11-12T05:41:15.261Z',
                nauticalDusk: '2061-11-12T17:30:54.768Z',
                nightEnd: '2061-11-12T05:04:15.893Z',
                night: '2061-11-12T18:07:54.136Z',
                goldenHourEnd: '2061-11-12T07:41:34.122Z',
                goldenHour: '2061-11-12T15:30:35.907Z'
            },
            getMoonPosition: {
                azimuth: -1.4340092045822184,
                altitude: -0.37394036644915873,
                distance: 402682.8297122805,
                parallacticAngle: -0.7753466397930147
            },
            getMoonIllumination: {
                fraction: 0.0012749366971682163,
                phase: 0.011368070660855822,
                angle: -0.36838664894300965
            },
            getMoonTimesUTC: {
                rise: '2061-11-12T07:31:44.051Z',
                set: '2061-11-12T16:05:51.834Z'
            },
            getMoonTimesNonUTC: {
                rise: '2061-11-12T07:31:47.546Z',
                set: '2061-11-12T16:06:02.466Z'
            }
        }
    },
    {
        input: {
            date: '2061-11-12T05:02:48.645Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.5086863915878599,
                altitude: -0.3455746476390128
            },
            getTimes: {
                solarNoon: '2061-11-12T11:45:00.265Z',
                nadir: '2061-11-11T23:45:00.265Z',
                sunrise: '2061-11-12T07:10:33.683Z',
                sunset: '2061-11-12T16:19:26.847Z',
                sunriseEnd: '2061-11-12T07:14:25.991Z',
                sunsetStart: '2061-11-12T16:15:34.540Z',
                dawn: '2061-11-12T06:34:12.972Z',
                dusk: '2061-11-12T16:55:47.559Z',
                nauticalDawn: '2061-11-12T05:53:56.662Z',
                nauticalDusk: '2061-11-12T17:36:03.869Z',
                nightEnd: '2061-11-12T05:14:51.804Z',
                night: '2061-11-12T18:15:08.726Z',
                goldenHourEnd: '2061-11-12T08:02:44.145Z',
                goldenHour: '2061-11-12T15:27:16.386Z'
            },
            getMoonPosition: {
                azimuth: -1.4820224560933764,
                altitude: -0.4039201601241772,
                distance: 402682.8297122805,
                parallacticAngle: -0.7285573635773938
            },
            getMoonIllumination: {
                fraction: 0.0012749366971682163,
                phase: 0.011368070660855822,
                angle: -0.36838664894300965
            },
            getMoonTimesUTC: {
                rise: '2061-11-12T07:52:51.991Z',
                set: '2061-11-12T16:02:33.595Z'
            },
            getMoonTimesNonUTC: {
                rise: '2061-11-12T07:52:39.032Z',
                set: '2061-11-12T16:02:40.739Z'
            }
        }
    },
    {
        input: {
            date: '2061-11-12T05:02:48.645Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -0.48962726034677545,
                altitude: 0.4695282252060743
            },
            getTimes: {
                solarNoon: '2061-11-12T06:49:27.402Z',
                nadir: '2061-11-11T18:49:27.402Z',
                sunrise: '2061-11-12T01:45:56.148Z',
                sunset: '2061-11-12T11:52:58.657Z',
                sunriseEnd: '2061-11-12T01:48:58.961Z',
                sunsetStart: '2061-11-12T11:49:55.843Z',
                dawn: '2061-11-12T01:16:54.183Z',
                dusk: '2061-11-12T12:22:00.622Z',
                nauticalDawn: '2061-11-12T00:44:04.945Z',
                nauticalDusk: '2061-11-12T12:54:49.860Z',
                nightEnd: '2061-11-12T00:11:54.205Z',
                night: '2061-11-12T13:27:00.600Z',
                goldenHourEnd: '2061-11-12T02:25:57.752Z',
                goldenHour: '2061-11-12T11:12:57.053Z'
            },
            getMoonPosition: {
                azimuth: -0.4877919665312392,
                altitude: 0.3990047042381617,
                distance: 402682.8297122805,
                parallacticAngle: -0.39138372425256945
            },
            getMoonIllumination: {
                fraction: 0.0012749366971682163,
                phase: 0.011368070660855822,
                angle: -0.36838664894300965
            },
            getMoonTimesUTC: {
                rise: '2061-11-12T02:02:17.391Z',
                set: '2061-11-12T11:44:04.138Z'
            },
            getMoonTimesNonUTC: {
                rise: '2061-11-12T02:02:15.182Z',
                set: '2061-11-12T11:44:14.405Z'
            }
        }
    },
    {
        input: {
            date: '2061-11-12T05:02:48.645Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 0.7336133431031782,
                altitude: 0.43503763762633063
            },
            getTimes: {
                solarNoon: '2061-11-12T02:26:49.954Z',
                nadir: '2061-11-11T14:26:49.954Z',
                sunrise: '2061-11-11T21:12:58.926Z',
                sunset: '2061-11-12T07:40:40.983Z',
                sunriseEnd: '2061-11-11T21:15:47.645Z',
                sunsetStart: '2061-11-12T07:37:52.264Z',
                dawn: '2061-11-11T20:46:04.900Z',
                dusk: '2061-11-12T08:07:35.009Z',
                nauticalDawn: '2061-11-11T20:15:30.020Z',
                nauticalDusk: '2061-11-12T08:38:09.889Z',
                nightEnd: '2061-11-11T19:45:25.132Z',
                night: '2061-11-12T09:08:14.777Z',
                goldenHourEnd: '2061-11-11T21:49:41.821Z',
                goldenHour: '2061-11-12T07:03:58.088Z'
            },
            getMoonPosition: {
                azimuth: 0.6701448327806472,
                altitude: 0.3945039719550941,
                distance: 402682.8297122805,
                parallacticAngle: 0.5725623569618532
            },
            getMoonIllumination: {
                fraction: 0.0012749366971682163,
                phase: 0.011368070660855822,
                angle: -0.36838664894300965
            },
            getMoonTimesUTC: {
                rise: '2061-11-12T22:16:20.284Z',
                set: '2061-11-12T07:29:41.642Z'
            },
            getMoonTimesNonUTC: {
                rise: '2061-11-12T22:16:09.838Z',
                set: '2061-11-12T07:29:51.539Z'
            }
        }
    },
    {
        input: {
            date: '2063-04-30T18:40:21.952Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.9120088564206363,
                altitude: 0.04315552308819188
            },
            getTimes: {
                solarNoon: '2063-04-30T11:49:06.928Z',
                nadir: '2063-04-29T23:49:06.928Z',
                sunrise: '2063-04-30T04:32:16.724Z',
                sunset: '2063-04-30T19:05:57.133Z',
                sunriseEnd: '2063-04-30T04:35:48.802Z',
                sunsetStart: '2063-04-30T19:02:25.055Z',
                dawn: '2063-04-30T03:56:54.897Z',
                dusk: '2063-04-30T19:41:18.960Z',
                nauticalDawn: '2063-04-30T03:12:12.509Z',
                nauticalDusk: '2063-04-30T20:26:01.348Z',
                nightEnd: '2063-04-30T02:20:03.091Z',
                night: '2063-04-30T21:18:10.766Z',
                goldenHourEnd: '2063-04-30T05:16:27.063Z',
                goldenHour: '2063-04-30T18:21:46.793Z'
            },
            getMoonPosition: {
                azimuth: 1.7309226000272713,
                altitude: 0.4864441604311169,
                distance: 377209.2513752303,
                parallacticAngle: 0.8112698541887237
            },
            getMoonIllumination: {
                fraction: 0.055695776482270976,
                phase: 0.07583638195468362,
                angle: -1.9262443380615513
            },
            getMoonTimesUTC: {
                rise: '2063-04-30T04:50:59.483Z',
                set: '2063-04-30T22:03:38.369Z'
            },
            getMoonTimesNonUTC: {
                rise: '2063-04-30T04:50:59.483Z'
            }
        }
    },
    {
        input: {
            date: '2063-04-30T18:40:21.952Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.8798686368993551,
                altitude: 0.08155376344086704
            },
            getTimes: {
                solarNoon: '2063-04-30T11:58:02.083Z',
                nadir: '2063-04-29T23:58:02.083Z',
                sunrise: '2063-04-30T04:33:35.490Z',
                sunset: '2063-04-30T19:22:28.676Z',
                sunriseEnd: '2063-04-30T04:37:22.307Z',
                sunsetStart: '2063-04-30T19:18:41.858Z',
                dawn: '2063-04-30T03:55:31.433Z',
                dusk: '2063-04-30T20:00:32.733Z',
                nauticalDawn: '2063-04-30T03:06:23.515Z',
                nauticalDusk: '2063-04-30T20:49:40.650Z',
                nightEnd: '2063-04-30T02:05:53.725Z',
                night: '2063-04-30T21:50:10.441Z',
                goldenHourEnd: '2063-04-30T05:20:37.199Z',
                goldenHour: '2063-04-30T18:35:26.967Z'
            },
            getMoonPosition: {
                azimuth: 1.6777174435704834,
                altitude: 0.5172746767222327,
                distance: 377209.2513752303,
                parallacticAngle: 0.7627917430936711
            },
            getMoonIllumination: {
                fraction: 0.055695776482270976,
                phase: 0.07583638195468362,
                angle: -1.9262443380615513
            },
            getMoonTimesUTC: {
                rise: '2063-04-30T04:45:30.611Z',
                set: '2063-04-30T22:29:39.076Z'
            },
            getMoonTimesNonUTC: {
                rise: '2063-04-30T04:45:30.611Z'
            }
        }
    },
    {
        input: {
            date: '2063-04-30T18:40:21.952Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 3.039033235568477,
                altitude: -0.6016372747720119
            },
            getTimes: {
                solarNoon: '2063-04-30T07:02:32.408Z',
                nadir: '2063-04-29T19:02:32.408Z',
                sunrise: '2063-04-30T00:04:35.605Z',
                sunset: '2063-04-30T14:00:29.211Z',
                sunriseEnd: '2063-04-30T00:07:35.295Z',
                sunsetStart: '2063-04-30T13:57:29.522Z',
                dawn: '2063-04-29T23:35:00.407Z',
                dusk: '2063-04-30T14:30:04.410Z',
                nauticalDawn: '2063-04-29T22:58:58.069Z',
                nauticalDusk: '2063-04-30T15:06:06.747Z',
                nightEnd: '2063-04-29T22:20:04.944Z',
                night: '2063-04-30T15:44:59.872Z',
                goldenHourEnd: '2063-04-30T00:42:22.291Z',
                goldenHour: '2063-04-30T13:22:42.525Z'
            },
            getMoonPosition: {
                azimuth: 2.633314825314206,
                altitude: -0.28599223059989837,
                distance: 377209.2513752303,
                parallacticAngle: 0.4244406580717808
            },
            getMoonIllumination: {
                fraction: 0.055695776482270976,
                phase: 0.07583638195468362,
                angle: -1.9262443380615513
            },
            getMoonTimesUTC: {
                rise: '2063-04-30T00:32:28.307Z',
                set: '2063-04-30T16:21:27.368Z'
            },
            getMoonTimesNonUTC: {
                rise: '2063-04-30T00:32:28.307Z',
                set: '2063-04-30T16:21:27.368Z'
            }
        }
    },
    {
        input: {
            date: '2063-04-30T18:40:21.952Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.0897391564205416,
                altitude: -0.24042264992088266
            },
            getTimes: {
                solarNoon: '2063-05-01T02:39:50.469Z',
                nadir: '2063-04-30T14:39:50.469Z',
                sunrise: '2063-04-30T19:50:12.714Z',
                sunset: '2063-05-01T09:29:28.224Z',
                sunriseEnd: '2063-04-30T19:52:59.178Z',
                sunsetStart: '2063-05-01T09:26:41.759Z',
                dawn: '2063-04-30T19:22:55.401Z',
                dusk: '2063-05-01T09:56:45.537Z',
                nauticalDawn: '2063-04-30T18:50:05.094Z',
                nauticalDusk: '2063-05-01T10:29:35.843Z',
                nightEnd: '2063-04-30T18:15:25.108Z',
                night: '2063-05-01T11:04:15.829Z',
                goldenHourEnd: '2063-04-30T20:25:19.734Z',
                goldenHour: '2063-05-01T08:54:21.203Z'
            },
            getMoonPosition: {
                azimuth: -2.5740898762073474,
                altitude: -0.34045974616101665,
                distance: 377209.2513752303,
                parallacticAngle: -0.5091854344356607
            },
            getMoonIllumination: {
                fraction: 0.055695776482270976,
                phase: 0.07583638195468362,
                angle: -1.9262443380615513
            },
            getMoonTimesUTC: {
                rise: '2063-04-30T21:02:16.018Z',
                set: '2063-04-30T11:27:53.455Z'
            },
            getMoonTimesNonUTC: {
                rise: '2063-04-30T21:02:16.018Z',
                set: '2063-04-30T11:27:53.455Z'
            }
        }
    },
    {
        input: {
            date: '2063-10-31T23:00:18.928Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.8995034958695878,
                altitude: -0.9511519179973333
            },
            getTimes: {
                solarNoon: '2063-10-31T11:35:28.413Z',
                nadir: '2063-10-30T23:35:28.413Z',
                sunrise: '2063-10-31T06:33:22.719Z',
                sunset: '2063-10-31T16:37:34.107Z',
                sunriseEnd: '2063-10-31T06:36:49.889Z',
                sunsetStart: '2063-10-31T16:34:06.937Z',
                dawn: '2063-10-31T06:00:32.730Z',
                dusk: '2063-10-31T17:10:24.097Z',
                nauticalDawn: '2063-10-31T05:23:26.437Z',
                nauticalDusk: '2063-10-31T17:47:30.390Z',
                nightEnd: '2063-10-31T04:46:52.421Z',
                night: '2063-10-31T18:24:04.406Z',
                goldenHourEnd: '2063-10-31T07:18:58.122Z',
                goldenHour: '2063-10-31T15:51:58.704Z'
            },
            getMoonPosition: {
                azimuth: 0.875908760795636,
                altitude: 0.35944625993861873,
                distance: 405895.6936504241,
                parallacticAngle: 0.5349423481197325
            },
            getMoonIllumination: {
                fraction: 0.7628162908672309,
                phase: 0.338085661423348,
                angle: -1.9468082369583832
            },
            getMoonTimesUTC: {
                rise: '2063-10-31T14:22:58.959Z',
                set: '2063-10-31T00:19:52.028Z'
            },
            getMoonTimesNonUTC: {
                rise: '2063-11-01T14:35:32.018Z',
                set: '2063-11-01T01:27:32.176Z'
            }
        }
    },
    {
        input: {
            date: '2063-10-31T23:00:18.928Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.8537261452038694,
                altitude: -0.8999916898727659
            },
            getTimes: {
                solarNoon: '2063-10-31T11:44:23.599Z',
                nadir: '2063-10-30T23:44:23.599Z',
                sunrise: '2063-10-31T06:48:29.097Z',
                sunset: '2063-10-31T16:40:18.102Z',
                sunriseEnd: '2063-10-31T06:52:09.787Z',
                sunsetStart: '2063-10-31T16:36:37.411Z',
                dawn: '2063-10-31T06:13:37.292Z',
                dusk: '2063-10-31T17:15:09.906Z',
                nauticalDawn: '2063-10-31T05:34:22.535Z',
                nauticalDusk: '2063-10-31T17:54:24.663Z',
                nightEnd: '2063-10-31T04:55:44.330Z',
                night: '2063-10-31T18:33:02.869Z',
                goldenHourEnd: '2063-10-31T07:37:19.706Z',
                goldenHour: '2063-10-31T15:51:27.492Z'
            },
            getMoonPosition: {
                azimuth: 0.8271460062450289,
                altitude: 0.34775681257964586,
                distance: 405895.6936504241,
                parallacticAngle: 0.4803684399376719
            },
            getMoonIllumination: {
                fraction: 0.7628162908672309,
                phase: 0.338085661423348,
                angle: -1.9468082369583832
            },
            getMoonTimesUTC: {
                rise: '2063-10-31T14:36:27.874Z',
                set: '2063-10-31T00:23:06.550Z'
            },
            getMoonTimesNonUTC: {
                rise: '2063-11-01T14:46:10.923Z',
                set: '2063-11-01T01:33:49.175Z'
            }
        }
    },
    {
        input: {
            date: '2063-10-31T23:00:18.928Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.6854674769720914,
                altitude: -0.5088276744652372
            },
            getTimes: {
                solarNoon: '2063-11-01T06:48:50.834Z',
                nadir: '2063-10-31T18:48:50.834Z',
                sunrise: '2063-11-01T01:32:16.440Z',
                sunset: '2063-11-01T12:05:25.229Z',
                sunriseEnd: '2063-11-01T01:35:13.820Z',
                sunsetStart: '2063-11-01T12:02:27.848Z',
                dawn: '2063-11-01T01:03:58.878Z',
                dusk: '2063-11-01T12:33:42.791Z',
                nauticalDawn: '2063-11-01T00:31:45.341Z',
                nauticalDusk: '2063-11-01T13:05:56.328Z',
                nightEnd: '2063-10-31T23:59:55.952Z',
                night: '2063-11-01T13:37:45.717Z',
                goldenHourEnd: '2063-11-01T02:10:53.058Z',
                goldenHour: '2063-11-01T11:26:48.610Z'
            },
            getMoonPosition: {
                azimuth: 1.802692686089667,
                altitude: -0.44664289697620957,
                distance: 405895.6936504241,
                parallacticAngle: 0.8391328291458866
            },
            getMoonIllumination: {
                fraction: 0.7628162908672309,
                phase: 0.338085661423348,
                angle: -1.9468082369583832
            },
            getMoonTimesUTC: {
                rise: '2063-10-31T09:21:18.648Z',
                set: '2063-10-31T20:37:19.867Z'
            },
            getMoonTimesNonUTC: {
                rise: '2063-11-01T09:41:03.394Z',
                set: '2063-11-01T21:36:55.227Z'
            }
        }
    },
    {
        input: {
            date: '2063-10-31T23:00:18.928Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -0.93764915699931,
                altitude: 0.3634339500653125
            },
            getTimes: {
                solarNoon: '2063-11-01T02:26:15.147Z',
                nadir: '2063-10-31T14:26:15.147Z',
                sunrise: '2063-10-31T21:01:35.359Z',
                sunset: '2063-11-01T07:50:54.936Z',
                sunriseEnd: '2063-10-31T21:04:19.764Z',
                sunsetStart: '2063-11-01T07:48:10.531Z',
                dawn: '2063-10-31T20:35:17.469Z',
                dusk: '2063-11-01T08:17:12.826Z',
                nauticalDawn: '2063-10-31T20:05:13.391Z',
                nauticalDusk: '2063-11-01T08:47:16.904Z',
                nightEnd: '2063-10-31T19:35:29.017Z',
                night: '2063-11-01T09:17:01.278Z',
                goldenHourEnd: '2063-10-31T21:37:12.782Z',
                goldenHour: '2063-11-01T07:15:17.513Z'
            },
            getMoonPosition: {
                azimuth: -3.002867835142697,
                altitude: -1.0666213150794255,
                distance: 405895.6936504241,
                parallacticAngle: -0.11354571461302482
            },
            getMoonIllumination: {
                fraction: 0.7628162908672309,
                phase: 0.338085661423348,
                angle: -1.9468082369583832
            },
            getMoonTimesUTC: {
                rise: '2063-10-31T04:48:30.539Z',
                set: '2063-10-31T16:08:57.893Z'
            },
            getMoonTimesNonUTC: {
                rise: '2063-11-01T05:11:03.626Z',
                set: '2063-11-01T17:05:26.593Z'
            }
        }
    },
    {
        input: {
            date: '2065-11-05T00:52:55.899Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.5664329612482972,
                altitude: -0.9219783067967651
            },
            getTimes: {
                solarNoon: '2065-11-05T11:35:28.237Z',
                nadir: '2065-11-04T23:35:28.237Z',
                sunrise: '2065-11-05T06:42:07.456Z',
                sunset: '2065-11-05T16:28:49.017Z',
                sunriseEnd: '2065-11-05T06:45:38.588Z',
                sunsetStart: '2065-11-05T16:25:17.885Z',
                dawn: '2065-11-05T06:08:46.746Z',
                dusk: '2065-11-05T17:02:09.728Z',
                nauticalDawn: '2065-11-05T05:31:18.994Z',
                nauticalDusk: '2065-11-05T17:39:37.479Z',
                nightEnd: '2065-11-05T04:54:36.146Z',
                night: '2065-11-05T18:16:20.327Z',
                goldenHourEnd: '2065-11-05T07:28:48.984Z',
                goldenHour: '2065-11-05T15:42:07.490Z'
            },
            getMoonPosition: {
                azimuth: 1.6000639413970823,
                altitude: -0.4062680871227887,
                distance: 375184.24795884616,
                parallacticAngle: 0.7564931678279667
            },
            getMoonIllumination: {
                fraction: 0.4842857906096049,
                phase: 0.24499718798268655,
                angle: -1.8420789829463742
            },
            getMoonTimesUTC: {
                rise: '2065-11-05T13:13:40.398Z',
                set: '2065-11-05T23:36:06.656Z'
            },
            getMoonTimesNonUTC: {
                rise: '2065-11-05T13:13:50.384Z'
            }
        }
    },
    {
        input: {
            date: '2065-11-05T00:52:55.899Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.653947895239178,
                altitude: -0.8947279361692402
            },
            getTimes: {
                solarNoon: '2065-11-05T11:44:23.451Z',
                nadir: '2065-11-04T23:44:23.451Z',
                sunrise: '2065-11-05T06:58:10.718Z',
                sunset: '2065-11-05T16:30:36.183Z',
                sunriseEnd: '2065-11-05T07:01:56.208Z',
                sunsetStart: '2065-11-05T16:26:50.694Z',
                dawn: '2065-11-05T06:22:42.353Z',
                dusk: '2065-11-05T17:06:04.549Z',
                nauticalDawn: '2065-11-05T05:43:03.082Z',
                nauticalDusk: '2065-11-05T17:45:43.820Z',
                nightEnd: '2065-11-05T05:04:15.948Z',
                night: '2065-11-05T18:24:30.953Z',
                goldenHourEnd: '2065-11-05T07:48:23.615Z',
                goldenHour: '2065-11-05T15:40:23.287Z'
            },
            getMoonPosition: {
                azimuth: 1.589551934959266,
                altitude: -0.3802313068760364,
                distance: 375184.24795884616,
                parallacticAngle: 0.7069154811815596
            },
            getMoonIllumination: {
                fraction: 0.4842857906096049,
                phase: 0.24499718798268655,
                angle: -1.8420789829463742
            },
            getMoonTimesUTC: {
                rise: '2065-11-05T13:29:56.625Z',
                set: '2065-11-05T23:39:54.016Z'
            },
            getMoonTimesNonUTC: {
                rise: '2065-11-05T13:30:03.356Z'
            }
        }
    },
    {
        input: {
            date: '2065-11-05T00:52:55.899Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.346985600208388,
                altitude: -0.1540735263471399
            },
            getTimes: {
                solarNoon: '2065-11-05T06:48:51.804Z',
                nadir: '2065-11-04T18:48:51.804Z',
                sunrise: '2065-11-05T01:37:33.389Z',
                sunset: '2065-11-05T12:00:10.219Z',
                sunriseEnd: '2065-11-05T01:40:32.799Z',
                sunsetStart: '2065-11-05T11:57:10.809Z',
                dawn: '2065-11-05T01:08:59.340Z',
                dusk: '2065-11-05T12:28:44.267Z',
                nauticalDawn: '2065-11-05T00:36:32.863Z',
                nauticalDusk: '2065-11-05T13:01:10.745Z',
                nightEnd: '2065-11-05T00:04:36.279Z',
                night: '2065-11-05T13:33:07.329Z',
                goldenHourEnd: '2065-11-05T02:16:41.842Z',
                goldenHour: '2065-11-05T11:21:01.766Z'
            },
            getMoonPosition: {
                azimuth: 3.099466307056599,
                altitude: -1.1413567190346874,
                distance: 375184.24795884616,
                parallacticAngle: 0.03331861511255534
            },
            getMoonIllumination: {
                fraction: 0.4842857906096049,
                phase: 0.24499718798268655,
                angle: -1.8420789829463742
            },
            getMoonTimesUTC: {
                rise: '2065-11-05T08:03:58.847Z',
                set: '2065-11-05T18:50:19.672Z'
            },
            getMoonTimesNonUTC: {
                rise: '2065-11-05T08:03:54.844Z',
                set: '2065-11-05T18:50:11.594Z'
            }
        }
    },
    {
        input: {
            date: '2065-11-05T00:52:55.899Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -0.46972342926416255,
                altitude: 0.6025610788533806
            },
            getTimes: {
                solarNoon: '2065-11-05T02:26:15.437Z',
                nadir: '2065-11-04T14:26:15.437Z',
                sunrise: '2065-11-04T21:05:57.655Z',
                sunset: '2065-11-05T07:46:33.219Z',
                sunriseEnd: '2065-11-04T21:08:43.676Z',
                sunsetStart: '2065-11-05T07:43:47.197Z',
                dawn: '2065-11-04T20:39:26.298Z',
                dusk: '2065-11-05T08:13:04.575Z',
                nauticalDawn: '2065-11-04T20:09:10.974Z',
                nauticalDusk: '2065-11-05T08:43:19.899Z',
                nightEnd: '2065-11-04T19:39:19.483Z',
                night: '2065-11-05T09:13:11.390Z',
                goldenHourEnd: '2065-11-04T21:41:59.706Z',
                goldenHour: '2065-11-05T07:10:31.167Z'
            },
            getMoonPosition: {
                azimuth: -1.5792750909944708,
                altitude: -0.5155148794050215,
                distance: 375184.24795884616,
                parallacticAngle: -1.0116583726424428
            },
            getMoonIllumination: {
                fraction: 0.4842857906096049,
                phase: 0.24499718798268655,
                angle: -1.8420789829463742
            },
            getMoonTimesUTC: {
                rise: '2065-11-05T03:26:24.238Z',
                set: '2065-11-05T14:22:36.401Z'
            },
            getMoonTimesNonUTC: {
                rise: '2065-11-05T03:26:36.800Z',
                set: '2065-11-05T14:22:30.042Z'
            }
        }
    },
    {
        input: {
            date: '2066-06-29T01:23:56.978Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.764127744013995,
                altitude: -0.26267796179150876
            },
            getTimes: {
                solarNoon: '2066-06-29T11:55:06.361Z',
                nadir: '2066-06-28T23:55:06.361Z',
                sunrise: '2066-06-29T03:48:12.451Z',
                sunset: '2066-06-29T20:02:00.272Z',
                sunriseEnd: '2066-06-29T03:52:19.816Z',
                sunsetStart: '2066-06-29T19:57:52.907Z',
                dawn: '2066-06-29T03:05:24.201Z',
                dusk: '2066-06-29T20:44:48.522Z',
                nauticalDawn: '2066-06-29T02:04:12.959Z',
                nauticalDusk: '2066-06-29T21:45:59.764Z',
                nightEnd: null,
                night: null,
                goldenHourEnd: '2066-06-29T04:38:18.744Z',
                goldenHour: '2066-06-29T19:11:53.979Z'
            },
            getMoonPosition: {
                azimuth: 2.179490672581635,
                altitude: -0.4527991417141292,
                distance: 386600.38429528585,
                parallacticAngle: 0.5702562078930739
            },
            getMoonIllumination: {
                fraction: 0.34428910595232876,
                phase: 0.19959740292837558,
                angle: -1.1421746426433868
            },
            getMoonTimesUTC: {
                rise: '2066-06-29T10:57:38.312Z',
                set: '2066-06-29T22:52:58.756Z'
            },
            getMoonTimesNonUTC: {
                rise: '2066-06-29T10:57:38.312Z',
                set: '2066-06-28T22:32:37.462Z'
            }
        }
    },
    {
        input: {
            date: '2066-06-29T01:23:56.978Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.803931824913546,
                altitude: -0.22807874886674662
            },
            getTimes: {
                solarNoon: '2066-06-29T12:04:01.632Z',
                nadir: '2066-06-29T00:04:01.632Z',
                sunrise: '2066-06-29T03:43:16.197Z',
                sunset: '2066-06-29T20:24:47.067Z',
                sunriseEnd: '2066-06-29T03:47:47.963Z',
                sunsetStart: '2066-06-29T20:20:15.302Z',
                dawn: '2066-06-29T02:55:16.968Z',
                dusk: '2066-06-29T21:12:46.296Z',
                nauticalDawn: '2066-06-29T01:39:41.144Z',
                nauticalDusk: '2066-06-29T22:28:22.120Z',
                nightEnd: null,
                night: null,
                goldenHourEnd: '2066-06-29T04:37:38.829Z',
                goldenHour: '2066-06-29T19:30:24.436Z'
            },
            getMoonPosition: {
                azimuth: 2.1608858862464317,
                altitude: -0.406125733374075,
                distance: 386600.38429528585,
                parallacticAngle: 0.5436258921180459
            },
            getMoonIllumination: {
                fraction: 0.34428910595232876,
                phase: 0.19959740292837558,
                angle: -1.1421746426433868
            },
            getMoonTimesUTC: {
                rise: '2066-06-29T11:08:09.563Z',
                set: '2066-06-29T23:00:10.129Z'
            },
            getMoonTimesNonUTC: {
                rise: '2066-06-29T11:08:09.563Z',
                set: '2066-06-28T22:42:22.045Z'
            }
        }
    },
    {
        input: {
            date: '2066-06-29T01:23:56.978Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.840443642613491,
                altitude: 0.3170322492174847
            },
            getTimes: {
                solarNoon: '2066-06-29T07:08:28.083Z',
                nadir: '2066-06-28T19:08:28.083Z',
                sunrise: '2066-06-28T23:34:16.456Z',
                sunset: '2066-06-29T14:42:39.710Z',
                sunriseEnd: '2066-06-28T23:37:36.187Z',
                sunsetStart: '2066-06-29T14:39:19.979Z',
                dawn: '2066-06-28T23:00:47.803Z',
                dusk: '2066-06-29T15:16:08.363Z',
                nauticalDawn: '2066-06-28T22:18:01.443Z',
                nauticalDusk: '2066-06-29T15:58:54.723Z',
                nightEnd: '2066-06-28T21:27:20.334Z',
                night: '2066-06-29T16:49:35.832Z',
                goldenHourEnd: '2066-06-29T00:15:37.977Z',
                goldenHour: '2066-06-29T14:01:18.190Z'
            },
            getMoonPosition: {
                azimuth: -2.535609040515765,
                altitude: -0.7520633688089485,
                distance: 386600.38429528585,
                parallacticAngle: -0.44642878550389486
            },
            getMoonIllumination: {
                fraction: 0.34428910595232876,
                phase: 0.19959740292837558,
                angle: -1.1421746426433868
            },
            getMoonTimesUTC: {
                rise: '2066-06-29T05:56:16.712Z',
                set: '2066-06-29T18:05:54.925Z'
            },
            getMoonTimesNonUTC: {
                rise: '2066-06-29T05:56:16.712Z',
                set: '2066-06-29T18:05:54.925Z'
            }
        }
    },
    {
        input: {
            date: '2066-06-29T01:23:56.978Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.0422970555744009,
                altitude: 1.2002480426457494
            },
            getTimes: {
                solarNoon: '2066-06-29T02:45:49.990Z',
                nadir: '2066-06-28T14:45:49.990Z',
                sunrise: '2066-06-28T19:27:13.067Z',
                sunset: '2066-06-29T10:04:26.912Z',
                sunriseEnd: '2066-06-28T19:30:14.637Z',
                sunsetStart: '2066-06-29T10:01:25.343Z',
                dawn: '2066-06-28T18:57:05.394Z',
                dusk: '2066-06-29T10:34:34.585Z',
                nauticalDawn: '2066-06-28T18:19:42.240Z',
                nauticalDusk: '2066-06-29T11:11:57.739Z',
                nightEnd: '2066-06-28T17:38:06.494Z',
                night: '2066-06-29T11:53:33.485Z',
                goldenHourEnd: '2066-06-28T20:05:06.700Z',
                goldenHour: '2066-06-29T09:26:33.279Z'
            },
            getMoonPosition: {
                azimuth: -1.572053567780845,
                altitude: 0.009608477955758577,
                distance: 386600.38429528585,
                parallacticAngle: -0.9482385702696812
            },
            getMoonIllumination: {
                fraction: 0.34428910595232876,
                phase: 0.19959740292837558,
                angle: -1.1421746426433868
            },
            getMoonTimesUTC: {
                rise: '2066-06-29T01:22:18.027Z',
                set: '2066-06-29T13:39:44.467Z'
            },
            getMoonTimesNonUTC: {
                rise: '2066-06-29T01:22:18.027Z',
                set: '2066-06-29T13:39:44.467Z'
            }
        }
    },
    {
        input: {
            date: '2067-07-13T15:12:38.471Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.2819895710431926,
                altitude: 0.7459026360664179
            },
            getTimes: {
                solarNoon: '2067-07-13T11:57:19.167Z',
                nadir: '2067-07-12T23:57:19.167Z',
                sunrise: '2067-07-13T03:58:43.194Z',
                sunset: '2067-07-13T19:55:55.141Z',
                sunriseEnd: '2067-07-13T04:02:43.138Z',
                sunsetStart: '2067-07-13T19:51:55.197Z',
                dawn: '2067-07-13T03:17:31.867Z',
                dusk: '2067-07-13T20:37:06.468Z',
                nauticalDawn: '2067-07-13T02:20:25.754Z',
                nauticalDusk: '2067-07-13T21:34:12.581Z',
                nightEnd: '2067-07-13T00:46:55.302Z',
                night: '2067-07-13T23:07:43.033Z',
                goldenHourEnd: '2067-07-13T04:47:35.469Z',
                goldenHour: '2067-07-13T19:07:02.866Z'
            },
            getMoonPosition: {
                azimuth: 0.6554688600464149,
                altitude: 0.8373587351949939,
                distance: 405833.803626195,
                parallacticAngle: 0.4227088770854325
            },
            getMoonIllumination: {
                fraction: 0.04903555290780032,
                phase: 0.07107560663074486,
                angle: -1.1189755305124602
            },
            getMoonTimesUTC: {
                rise: '2067-07-13T06:12:24.044Z',
                set: '2067-07-13T20:37:08.292Z'
            },
            getMoonTimesNonUTC: {
                rise: '2067-07-13T06:12:24.044Z',
                set: '2067-07-13T20:37:08.292Z'
            }
        }
    },
    {
        input: {
            date: '2067-07-13T15:12:38.471Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.2037836332134866,
                altitude: 0.7546133930424527
            },
            getTimes: {
                solarNoon: '2067-07-13T12:06:14.413Z',
                nadir: '2067-07-13T00:06:14.413Z',
                sunrise: '2067-07-13T03:54:56.506Z',
                sunset: '2067-07-13T20:17:32.320Z',
                sunriseEnd: '2067-07-13T03:59:18.505Z',
                sunsetStart: '2067-07-13T20:13:10.320Z',
                dawn: '2067-07-13T03:09:13.111Z',
                dusk: '2067-07-13T21:03:15.715Z',
                nauticalDawn: '2067-07-13T02:01:14.435Z',
                nauticalDusk: '2067-07-13T22:11:14.391Z',
                nightEnd: null,
                night: null,
                goldenHourEnd: '2067-07-13T04:47:45.125Z',
                goldenHour: '2067-07-13T19:24:43.700Z'
            },
            getMoonPosition: {
                azimuth: 0.5745870230942709,
                altitude: 0.8139726611806968,
                distance: 405833.803626195,
                parallacticAngle: 0.35334713329950607
            },
            getMoonIllumination: {
                fraction: 0.04903555290780032,
                phase: 0.07107560663074486,
                angle: -1.1189755305124602
            },
            getMoonTimesUTC: {
                rise: '2067-07-13T06:14:50.926Z',
                set: '2067-07-13T20:52:07.399Z'
            },
            getMoonTimesNonUTC: {
                rise: '2067-07-13T06:14:50.926Z',
                set: '2067-07-13T20:52:07.399Z'
            }
        }
    },
    {
        input: {
            date: '2067-07-13T15:12:38.471Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.2131444110601945,
                altitude: -0.11916299724754524
            },
            getTimes: {
                solarNoon: '2067-07-13T07:10:41.693Z',
                nadir: '2067-07-12T19:10:41.693Z',
                sunrise: '2067-07-12T23:42:15.282Z',
                sunset: '2067-07-13T14:39:08.104Z',
                sunriseEnd: '2067-07-12T23:45:31.111Z',
                sunsetStart: '2067-07-13T14:35:52.276Z',
                dawn: '2067-07-12T23:09:32.486Z',
                dusk: '2067-07-13T15:11:50.900Z',
                nauticalDawn: '2067-07-12T22:28:08.627Z',
                nauticalDusk: '2067-07-13T15:53:14.759Z',
                nightEnd: '2067-07-12T21:40:07.499Z',
                night: '2067-07-13T16:41:15.887Z',
                goldenHourEnd: '2067-07-13T00:22:54.960Z',
                goldenHour: '2067-07-13T13:58:28.426Z'
            },
            getMoonPosition: {
                azimuth: 1.8025920430693552,
                altitude: 0.05915653395396365,
                distance: 405833.803626195,
                parallacticAngle: 0.8549853862930414
            },
            getMoonIllumination: {
                fraction: 0.04903555290780032,
                phase: 0.07107560663074486,
                angle: -1.1189755305124602
            },
            getMoonTimesUTC: {
                rise: '2067-07-13T01:31:44.325Z',
                set: '2067-07-13T15:31:15.646Z'
            },
            getMoonTimesNonUTC: {
                rise: '2067-07-13T01:31:44.325Z',
                set: '2067-07-13T15:31:15.646Z'
            }
        }
    },
    {
        input: {
            date: '2067-07-13T15:12:38.471Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -3.0140931240679114,
                altitude: -0.5595836203137494
            },
            getTimes: {
                solarNoon: '2067-07-14T02:48:11.646Z',
                nadir: '2067-07-13T14:48:11.646Z',
                sunrise: '2067-07-13T19:34:42.590Z',
                sunset: '2067-07-14T10:01:40.701Z',
                sunriseEnd: '2067-07-13T19:37:40.952Z',
                sunsetStart: '2067-07-14T09:58:42.339Z',
                dawn: '2067-07-13T19:05:11.201Z',
                dusk: '2067-07-14T10:31:12.090Z',
                nauticalDawn: '2067-07-13T18:28:47.262Z',
                nauticalDusk: '2067-07-14T11:07:36.029Z',
                nightEnd: '2067-07-13T17:48:46.264Z',
                night: '2067-07-14T11:47:37.027Z',
                goldenHourEnd: '2067-07-13T20:12:00.742Z',
                goldenHour: '2067-07-14T09:24:22.549Z'
            },
            getMoonPosition: {
                azimuth: 2.740127246437891,
                altitude: -0.6768333194568138,
                distance: 405833.803626195,
                parallacticAngle: 0.33068430630233664
            },
            getMoonIllumination: {
                fraction: 0.04903555290780032,
                phase: 0.07107560663074486,
                angle: -1.1189755305124602
            },
            getMoonTimesUTC: {
                rise: '2067-07-13T22:02:47.790Z',
                set: '2067-07-13T10:56:44.941Z'
            },
            getMoonTimesNonUTC: {
                set: '2067-07-13T10:56:44.941Z'
            }
        }
    },
    {
        input: {
            date: '2067-09-02T19:08:13.962Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.924353465211672,
                altitude: -0.11371565045259452
            },
            getTimes: {
                solarNoon: '2067-09-02T11:52:06.593Z',
                nadir: '2067-09-01T23:52:06.593Z',
                sunrise: '2067-09-02T05:06:43.752Z',
                sunset: '2067-09-02T18:37:29.434Z',
                sunriseEnd: '2067-09-02T05:10:03.767Z',
                sunsetStart: '2067-09-02T18:34:09.420Z',
                dawn: '2067-09-02T04:33:51.517Z',
                dusk: '2067-09-02T19:10:21.669Z',
                nauticalDawn: '2067-09-02T03:53:50.808Z',
                nauticalDusk: '2067-09-02T19:50:22.378Z',
                nightEnd: '2067-09-02T03:10:25.396Z',
                night: '2067-09-02T20:33:47.790Z',
                goldenHourEnd: '2067-09-02T05:48:56.063Z',
                goldenHour: '2067-09-02T17:55:17.123Z'
            },
            getMoonPosition: {
                azimuth: 3.065430788196185,
                altitude: -0.3214838816850244,
                distance: 399315.52758197504,
                parallacticAngle: 0.05407851865970482
            },
            getMoonIllumination: {
                fraction: 0.28691087720712893,
                phase: 0.8200701814725053,
                angle: 1.5952652698575696
            },
            getMoonTimesUTC: {
                rise: '2067-09-02T23:44:45.932Z',
                set: '2067-09-02T15:12:21.097Z'
            },
            getMoonTimesNonUTC: {
                rise: '2067-09-01T22:45:36.272Z',
                set: '2067-09-02T15:12:21.097Z'
            }
        }
    },
    {
        input: {
            date: '2067-09-02T19:08:13.962Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.8977875557818786,
                altitude: -0.07477928393728253
            },
            getTimes: {
                solarNoon: '2067-09-02T12:01:01.674Z',
                nadir: '2067-09-02T00:01:01.674Z',
                sunrise: '2067-09-02T05:11:25.350Z',
                sunset: '2067-09-02T18:50:37.999Z',
                sunriseEnd: '2067-09-02T05:14:57.547Z',
                sunsetStart: '2067-09-02T18:47:05.802Z',
                dawn: '2067-09-02T04:36:26.438Z',
                dusk: '2067-09-02T19:25:36.911Z',
                nauticalDawn: '2067-09-02T03:53:26.484Z',
                nauticalDusk: '2067-09-02T20:08:36.864Z',
                nightEnd: '2067-09-02T03:05:48.296Z',
                night: '2067-09-02T20:56:15.053Z',
                goldenHourEnd: '2067-09-02T05:56:06.526Z',
                goldenHour: '2067-09-02T18:05:56.823Z'
            },
            getMoonPosition: {
                azimuth: 3.029070268485941,
                altitude: -0.27309565123046925,
                distance: 399315.52758197504,
                parallacticAngle: 0.07553230343413181
            },
            getMoonIllumination: {
                fraction: 0.28691087720712893,
                phase: 0.8200701814725053,
                angle: 1.5952652698575696
            },
            getMoonTimesUTC: {
                rise: '2067-09-02T23:41:35.435Z',
                set: '2067-09-02T15:34:05.838Z'
            },
            getMoonTimesNonUTC: {
                rise: '2067-09-01T22:41:25.708Z',
                set: '2067-09-02T15:34:05.838Z'
            }
        }
    },
    {
        input: {
            date: '2067-09-02T19:08:13.962Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -3.1106499061356225,
                altitude: -0.7186047206755903
            },
            getTimes: {
                solarNoon: '2067-09-03T07:05:15.133Z',
                nadir: '2067-09-02T19:05:15.133Z',
                sunrise: '2067-09-03T00:31:24.925Z',
                sunset: '2067-09-03T13:39:05.341Z',
                sunriseEnd: '2067-09-03T00:34:17.002Z',
                sunsetStart: '2067-09-03T13:36:13.265Z',
                dawn: '2067-09-03T00:03:19.668Z',
                dusk: '2067-09-03T14:07:10.598Z',
                nauticalDawn: '2067-09-02T23:29:48.999Z',
                nauticalDusk: '2067-09-03T14:40:41.267Z',
                nightEnd: '2067-09-02T22:54:48.529Z',
                night: '2067-09-03T15:15:41.738Z',
                goldenHourEnd: '2067-09-03T01:07:53.596Z',
                goldenHour: '2067-09-03T13:02:36.670Z'
            },
            getMoonPosition: {
                azimuth: -2.1176275479721793,
                altitude: -0.017981021377601474,
                distance: 399315.52758197504,
                parallacticAngle: -0.7739969509374717
            },
            getMoonIllumination: {
                fraction: 0.28691087720712893,
                phase: 0.8200701814725053,
                angle: 1.5952652698575696
            },
            getMoonTimesUTC: {
                rise: '2067-09-02T19:16:08.768Z',
                set: '2067-09-02T09:46:10.858Z'
            },
            getMoonTimesNonUTC: {
                rise: '2067-09-02T19:16:08.768Z',
                set: '2067-09-02T09:46:10.858Z'
            }
        }
    },
    {
        input: {
            date: '2067-09-02T19:08:13.962Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.9279610085615106,
                altitude: -0.2342484929575593
            },
            getTimes: {
                solarNoon: '2067-09-03T02:42:42.672Z',
                nadir: '2067-09-02T14:42:42.672Z',
                sunrise: '2067-09-02T20:13:41.575Z',
                sunset: '2067-09-03T09:11:43.769Z',
                sunriseEnd: '2067-09-02T20:16:21.726Z',
                sunsetStart: '2067-09-03T09:09:03.618Z',
                dawn: '2067-09-02T19:47:36.907Z',
                dusk: '2067-09-03T09:37:48.438Z',
                nauticalDawn: '2067-09-02T19:16:43.097Z',
                nauticalDusk: '2067-09-03T10:08:42.248Z',
                nightEnd: '2067-09-02T18:44:50.311Z',
                night: '2067-09-03T10:40:35.034Z',
                goldenHourEnd: '2067-09-02T20:47:41.895Z',
                goldenHour: '2067-09-03T08:37:43.449Z'
            },
            getMoonPosition: {
                azimuth: -1.4809385040220882,
                altitude: 0.8206678978736663,
                distance: 399315.52758197504,
                parallacticAngle: -1.062318960695581
            },
            getMoonIllumination: {
                fraction: 0.28691087720712893,
                phase: 0.8200701814725053,
                angle: 1.5952652698575696
            },
            getMoonTimesUTC: {
                rise: '2067-09-02T14:57:36.819Z',
                set: '2067-09-02T05:00:25.633Z'
            },
            getMoonTimesNonUTC: {
                rise: '2067-09-02T14:57:36.819Z',
                set: '2067-09-02T05:00:25.633Z'
            }
        }
    },
    {
        input: {
            date: '2067-09-09T12:36:50.292Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 0.3100320049223099,
                altitude: 0.7940398402502788
            },
            getTimes: {
                solarNoon: '2067-09-09T11:49:44.963Z',
                nadir: '2067-09-08T23:49:44.963Z',
                sunrise: '2067-09-09T05:16:37.120Z',
                sunset: '2067-09-09T18:22:52.805Z',
                sunriseEnd: '2067-09-09T05:19:54.292Z',
                sunsetStart: '2067-09-09T18:19:35.634Z',
                dawn: '2067-09-09T04:44:22.132Z',
                dusk: '2067-09-09T18:55:07.793Z',
                nauticalDawn: '2067-09-09T04:05:33.234Z',
                nauticalDusk: '2067-09-09T19:33:56.691Z',
                nightEnd: '2067-09-09T03:24:11.414Z',
                night: '2067-09-09T20:15:18.511Z',
                goldenHourEnd: '2067-09-09T05:58:24.969Z',
                goldenHour: '2067-09-09T17:41:04.956Z'
            },
            getMoonPosition: {
                azimuth: 0.14026394694978514,
                altitude: 0.671128863031813,
                distance: 400749.64419948414,
                parallacticAngle: 0.09220918232802595
            },
            getMoonIllumination: {
                fraction: 0.007783081552628912,
                phase: 0.028118418517247334,
                angle: -0.649601296548582
            },
            getMoonTimesUTC: {
                rise: '2067-09-09T06:04:04.409Z',
                set: '2067-09-09T18:06:41.379Z'
            },
            getMoonTimesNonUTC: {
                rise: '2067-09-09T06:04:04.409Z',
                set: '2067-09-09T18:06:41.379Z'
            }
        }
    },
    {
        input: {
            date: '2067-09-09T12:36:50.292Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 0.24423115005902218,
                altitude: 0.7563705948843187
            },
            getTimes: {
                solarNoon: '2067-09-09T11:58:40.032Z',
                nadir: '2067-09-08T23:58:40.032Z',
                sunrise: '2067-09-09T05:22:33.441Z',
                sunset: '2067-09-09T18:34:46.623Z',
                sunriseEnd: '2067-09-09T05:26:02.241Z',
                sunsetStart: '2067-09-09T18:31:17.823Z',
                dawn: '2067-09-09T04:48:19.776Z',
                dusk: '2067-09-09T19:09:00.288Z',
                nauticalDawn: '2067-09-09T04:06:50.127Z',
                nauticalDusk: '2067-09-09T19:50:29.936Z',
                nightEnd: '2067-09-09T03:21:56.902Z',
                night: '2067-09-09T20:35:23.161Z',
                goldenHourEnd: '2067-09-09T06:06:45.978Z',
                goldenHour: '2067-09-09T17:50:34.085Z'
            },
            getMoonPosition: {
                azimuth: 0.08757159436808086,
                altitude: 0.6280469431344115,
                distance: 400749.64419948414,
                parallacticAngle: 0.05452087992249093
            },
            getMoonIllumination: {
                fraction: 0.007783081552628912,
                phase: 0.028118418517247334,
                angle: -0.649601296548582
            },
            getMoonTimesUTC: {
                rise: '2067-09-09T06:14:15.441Z',
                set: '2067-09-09T18:13:52.123Z'
            },
            getMoonTimesNonUTC: {
                rise: '2067-09-09T06:14:15.441Z',
                set: '2067-09-09T18:13:52.123Z'
            }
        }
    },
    {
        input: {
            date: '2067-09-09T12:36:50.292Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.5777813877458913,
                altitude: 0.14232260243061118
            },
            getTimes: {
                solarNoon: '2067-09-09T07:03:13.167Z',
                nadir: '2067-09-08T19:03:13.167Z',
                sunrise: '2067-09-09T00:37:14.466Z',
                sunset: '2067-09-09T13:29:11.867Z',
                sunriseEnd: '2067-09-09T00:40:05.016Z',
                sunsetStart: '2067-09-09T13:26:21.318Z',
                dawn: '2067-09-09T00:09:28.359Z',
                dusk: '2067-09-09T13:56:57.975Z',
                nauticalDawn: '2067-09-08T23:36:31.778Z',
                nauticalDusk: '2067-09-09T14:29:54.556Z',
                nightEnd: '2067-09-08T23:02:23.522Z',
                night: '2067-09-09T15:04:02.811Z',
                goldenHourEnd: '2067-09-09T01:13:29.224Z',
                goldenHour: '2067-09-09T12:52:57.109Z'
            },
            getMoonPosition: {
                azimuth: 1.4002877189069622,
                altitude: 0.13296763185187477,
                distance: 400749.64419948414,
                parallacticAngle: 0.8445907584544199
            },
            getMoonIllumination: {
                fraction: 0.007783081552628912,
                phase: 0.028118418517247334,
                angle: -0.649601296548582
            },
            getMoonTimesUTC: {
                rise: '2067-09-09T01:04:41.863Z',
                set: '2067-09-09T13:18:18.857Z'
            },
            getMoonTimesNonUTC: {
                rise: '2067-09-09T01:04:41.863Z',
                set: '2067-09-09T13:18:18.857Z'
            }
        }
    },
    {
        input: {
            date: '2067-09-09T12:36:50.292Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.428615426049856,
                altitude: -0.6959494975435072
            },
            getTimes: {
                solarNoon: '2067-09-09T02:40:41.011Z',
                nadir: '2067-09-08T14:40:41.011Z',
                sunrise: '2067-09-08T20:18:12.310Z',
                sunset: '2067-09-09T09:03:09.712Z',
                sunriseEnd: '2067-09-08T20:20:51.229Z',
                sunsetStart: '2067-09-09T09:00:30.794Z',
                dawn: '2067-09-08T19:52:22.664Z',
                dusk: '2067-09-09T09:28:59.359Z',
                nauticalDawn: '2067-09-08T19:21:54.444Z',
                nauticalDusk: '2067-09-09T09:59:27.578Z',
                nightEnd: '2067-09-08T18:50:38.983Z',
                night: '2067-09-09T10:30:43.039Z',
                goldenHourEnd: '2067-09-08T20:52:00.901Z',
                goldenHour: '2067-09-09T08:29:21.121Z'
            },
            getMoonPosition: {
                azimuth: 2.203119874065942,
                altitude: -0.736517100787817,
                distance: 400749.64419948414,
                parallacticAngle: 0.7153844132911082
            },
            getMoonIllumination: {
                fraction: 0.007783081552628912,
                phase: 0.028118418517247334,
                angle: -0.649601296548582
            },
            getMoonTimesUTC: {
                rise: '2067-09-09T21:28:19.659Z',
                set: '2067-09-09T08:52:45.806Z'
            },
            getMoonTimesNonUTC: {
                rise: '2067-09-09T21:28:19.659Z',
                set: '2067-09-09T08:52:45.806Z'
            }
        }
    },
    {
        input: {
            date: '2068-02-19T17:22:55.289Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.3057407886555659,
                altitude: -0.03761642244453486
            },
            getTimes: {
                solarNoon: '2068-02-19T12:06:00.068Z',
                nadir: '2068-02-19T00:06:00.068Z',
                sunrise: '2068-02-19T06:53:05.734Z',
                sunset: '2068-02-19T17:18:54.402Z',
                sunriseEnd: '2068-02-19T06:56:28.781Z',
                sunsetStart: '2068-02-19T17:15:31.355Z',
                dawn: '2068-02-19T06:20:47.124Z',
                dusk: '2068-02-19T17:51:13.011Z',
                nauticalDawn: '2068-02-19T05:44:00.767Z',
                nauticalDusk: '2068-02-19T18:27:59.368Z',
                nightEnd: '2068-02-19T05:07:31.097Z',
                night: '2068-02-19T19:04:29.039Z',
                goldenHourEnd: '2068-02-19T07:37:31.867Z',
                goldenHour: '2068-02-19T16:34:28.268Z'
            },
            getMoonPosition: {
                azimuth: -1.911035651092493,
                altitude: -0.2692799008107336,
                distance: 405344.5792197929,
                parallacticAngle: -0.6691477072478531
            },
            getMoonIllumination: {
                fraction: 0.9741243968454966,
                phase: 0.551426424999451,
                angle: 2.234421612609196
            },
            getMoonTimesUTC: {
                rise: '2068-02-19T19:03:40.358Z',
                set: '2068-02-19T06:57:30.317Z'
            },
            getMoonTimesNonUTC: {
                rise: '2068-02-19T19:03:44.123Z',
                set: '2068-02-19T06:57:27.474Z'
            }
        }
    },
    {
        input: {
            date: '2068-02-19T17:22:55.289Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.2774834240420847,
                altitude: -0.02639464254182549
            },
            getTimes: {
                solarNoon: '2068-02-19T12:14:55.239Z',
                nadir: '2068-02-19T00:14:55.239Z',
                sunrise: '2068-02-19T07:07:02.264Z',
                sunset: '2068-02-19T17:22:48.214Z',
                sunriseEnd: '2068-02-19T07:10:37.992Z',
                sunsetStart: '2068-02-19T17:19:12.486Z',
                dawn: '2068-02-19T06:32:47.593Z',
                dusk: '2068-02-19T17:57:02.885Z',
                nauticalDawn: '2068-02-19T05:53:55.310Z',
                nauticalDusk: '2068-02-19T18:35:55.169Z',
                nightEnd: '2068-02-19T05:15:20.339Z',
                night: '2068-02-19T19:14:30.140Z',
                goldenHourEnd: '2068-02-19T07:54:27.489Z',
                goldenHour: '2068-02-19T16:35:22.990Z'
            },
            getMoonPosition: {
                azimuth: -1.9559822663503008,
                altitude: -0.2761799433244645,
                distance: 405344.5792197929,
                parallacticAngle: -0.6149388407237226
            },
            getMoonIllumination: {
                fraction: 0.9741243968454966,
                phase: 0.551426424999451,
                angle: 2.234421612609196
            },
            getMoonTimesUTC: {
                rise: '2068-02-19T19:13:11.047Z',
                set: '2068-02-19T07:07:13.537Z'
            },
            getMoonTimesNonUTC: {
                rise: '2068-02-19T19:13:20.501Z',
                set: '2068-02-19T07:07:04.195Z'
            }
        }
    },
    {
        input: {
            date: '2068-02-19T17:22:55.289Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.2905658502210793,
                altitude: -0.9003542093156977
            },
            getTimes: {
                solarNoon: '2068-02-19T07:19:24.972Z',
                nadir: '2068-02-18T19:19:24.972Z',
                sunrise: '2068-02-19T01:54:06.725Z',
                sunset: '2068-02-19T12:44:43.219Z',
                sunriseEnd: '2068-02-19T01:57:01.219Z',
                sunsetStart: '2068-02-19T12:41:48.725Z',
                dawn: '2068-02-19T01:26:12.217Z',
                dusk: '2068-02-19T13:12:37.727Z',
                nauticalDawn: '2068-02-19T00:54:15.610Z',
                nauticalDusk: '2068-02-19T13:44:34.334Z',
                nightEnd: '2068-02-19T00:22:33.639Z',
                night: '2068-02-19T14:16:16.305Z',
                goldenHourEnd: '2068-02-19T02:31:57.615Z',
                goldenHour: '2068-02-19T12:06:52.329Z'
            },
            getMoonPosition: {
                azimuth: -0.9691686806978015,
                altitude: 0.58833155063524,
                distance: 405344.5792197929,
                parallacticAngle: -0.6750429458699232
            },
            getMoonIllumination: {
                fraction: 0.9741243968454966,
                phase: 0.551426424999451,
                angle: 2.234421612609196
            },
            getMoonTimesUTC: {
                rise: '2068-02-19T14:06:10.865Z',
                set: '2068-02-19T02:02:59.957Z'
            },
            getMoonTimesNonUTC: {
                rise: '2068-02-19T14:06:04.671Z',
                set: '2068-02-19T02:03:04.858Z'
            }
        }
    },
    {
        input: {
            date: '2068-02-19T17:22:55.289Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.029511283982691,
                altitude: -0.8498529596790084
            },
            getTimes: {
                solarNoon: '2068-02-20T02:56:45.071Z',
                nadir: '2068-02-19T14:56:45.071Z',
                sunrise: '2068-02-19T21:24:09.739Z',
                sunset: '2068-02-20T08:29:20.403Z',
                sunriseEnd: '2068-02-19T21:26:51.641Z',
                sunsetStart: '2068-02-20T08:26:38.501Z',
                dawn: '2068-02-19T20:58:12.341Z',
                dusk: '2068-02-20T08:55:17.801Z',
                nauticalDawn: '2068-02-19T20:28:24.396Z',
                nauticalDusk: '2068-02-20T09:25:05.747Z',
                nightEnd: '2068-02-19T19:58:48.656Z',
                night: '2068-02-20T09:54:41.486Z',
                goldenHourEnd: '2068-02-19T21:59:08.606Z',
                goldenHour: '2068-02-20T07:54:21.536Z'
            },
            getMoonPosition: {
                azimuth: 0.617146407637838,
                altitude: 0.8546836693994607,
                distance: 405344.5792197929,
                parallacticAngle: 0.48945295022340585
            },
            getMoonIllumination: {
                fraction: 0.9741243968454966,
                phase: 0.551426424999451,
                angle: 2.234421612609196
            },
            getMoonTimesUTC: {
                rise: '2068-02-19T09:34:57.282Z',
                set: '2068-02-19T22:01:21.351Z'
            },
            getMoonTimesNonUTC: {
                rise: '2068-02-19T09:35:06.114Z',
                set: '2068-02-19T22:01:23.638Z'
            }
        }
    },
    {
        input: {
            date: '2068-07-14T04:08:20.364Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.1631988625527896,
                altitude: 0.0038973774896799325
            },
            getTimes: {
                solarNoon: '2068-07-14T11:57:31.358Z',
                nadir: '2068-07-13T23:57:31.358Z',
                sunrise: '2068-07-14T04:00:29.077Z',
                sunset: '2068-07-14T19:54:33.639Z',
                sunriseEnd: '2068-07-14T04:04:27.702Z',
                sunsetStart: '2068-07-14T19:50:35.014Z',
                dawn: '2068-07-14T03:19:34.778Z',
                dusk: '2068-07-14T20:35:27.938Z',
                nauticalDawn: '2068-07-14T02:23:09.506Z',
                nauticalDusk: '2068-07-14T21:31:53.210Z',
                nightEnd: '2068-07-14T00:53:54.645Z',
                night: '2068-07-14T23:01:08.071Z',
                goldenHourEnd: '2068-07-14T04:49:08.120Z',
                goldenHour: '2068-07-14T19:05:54.596Z'
            },
            getMoonPosition: {
                azimuth: 1.168189440948312,
                altitude: -0.09213155218565054,
                distance: 376635.56834834965,
                parallacticAngle: 0.6969142146231386
            },
            getMoonIllumination: {
                fraction: 0.988787762185752,
                phase: 0.4662315440033367,
                angle: -1.3392197432352169
            },
            getMoonTimesUTC: {
                rise: '2068-07-14T19:02:49.375Z',
                set: '2068-07-14T03:28:49.309Z'
            },
            getMoonTimesNonUTC: {
                rise: '2068-07-14T19:02:49.375Z',
                set: '2068-07-14T03:28:49.309Z'
            }
        }
    },
    {
        input: {
            date: '2068-07-14T04:08:20.364Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.192741901258844,
                altitude: 0.00981057539108047
            },
            getTimes: {
                solarNoon: '2068-07-14T12:06:26.599Z',
                nadir: '2068-07-14T00:06:26.599Z',
                sunrise: '2068-07-14T03:56:55.073Z',
                sunset: '2068-07-14T20:15:58.125Z',
                sunriseEnd: '2068-07-14T04:01:15.355Z',
                sunsetStart: '2068-07-14T20:11:37.843Z',
                dawn: '2068-07-14T03:11:35.117Z',
                dusk: '2068-07-14T21:01:18.081Z',
                nauticalDawn: '2068-07-14T02:04:47.211Z',
                nauticalDusk: '2068-07-14T22:08:05.987Z',
                nightEnd: null,
                night: null,
                goldenHourEnd: '2068-07-14T04:49:27.022Z',
                goldenHour: '2068-07-14T19:23:26.176Z'
            },
            getMoonPosition: {
                azimuth: 1.1434644655509856,
                altitude: -0.08796198993199518,
                distance: 376635.56834834965,
                parallacticAngle: 0.6442902480525536
            },
            getMoonIllumination: {
                fraction: 0.988787762185752,
                phase: 0.4662315440033367,
                angle: -1.3392197432352169
            },
            getMoonTimesUTC: {
                rise: '2068-07-14T19:21:51.272Z',
                set: '2068-07-14T03:27:46.271Z'
            },
            getMoonTimesNonUTC: {
                rise: '2068-07-14T19:21:51.272Z',
                set: '2068-07-14T03:27:46.271Z'
            }
        }
    },
    {
        input: {
            date: '2068-07-14T04:08:20.364Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.3508781680816635,
                altitude: 0.8311485770100727
            },
            getTimes: {
                solarNoon: '2068-07-14T07:10:54.029Z',
                nadir: '2068-07-13T19:10:54.029Z',
                sunrise: '2068-07-13T23:43:33.334Z',
                sunset: '2068-07-14T14:38:14.723Z',
                sunriseEnd: '2068-07-13T23:46:48.451Z',
                sunsetStart: '2068-07-14T14:34:59.606Z',
                dawn: '2068-07-13T23:10:58.862Z',
                dusk: '2068-07-14T15:10:49.196Z',
                nauticalDawn: '2068-07-13T22:29:49.778Z',
                nauticalDusk: '2068-07-14T15:51:58.280Z',
                nightEnd: '2068-07-13T21:42:16.285Z',
                night: '2068-07-14T16:39:31.772Z',
                goldenHourEnd: '2068-07-14T00:24:05.378Z',
                goldenHour: '2068-07-14T13:57:42.679Z'
            },
            getMoonPosition: {
                azimuth: 2.059778268923375,
                altitude: -0.9546201053293798,
                distance: 376635.56834834965,
                parallacticAngle: 0.7887368344138284
            },
            getMoonIllumination: {
                fraction: 0.988787762185752,
                phase: 0.4662315440033367,
                angle: -1.3392197432352169
            },
            getMoonTimesUTC: {
                rise: '2068-07-14T13:45:15.380Z'
            },
            getMoonTimesNonUTC: {
                rise: '2068-07-14T13:45:15.380Z',
                set: '2068-07-13T22:55:48.259Z'
            }
        }
    },
    {
        input: {
            date: '2068-07-14T04:08:20.364Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.0070811941205473,
                altitude: 1.1744741502869638
            },
            getTimes: {
                solarNoon: '2068-07-14T02:48:16.796Z',
                nadir: '2068-07-13T14:48:16.796Z',
                sunrise: '2068-07-13T19:35:10.852Z',
                sunset: '2068-07-14T10:01:22.740Z',
                sunriseEnd: '2068-07-13T19:38:08.983Z',
                sunsetStart: '2068-07-14T09:58:24.609Z',
                dawn: '2068-07-13T19:05:42.076Z',
                dusk: '2068-07-14T10:30:51.516Z',
                nauticalDawn: '2068-07-13T18:29:22.372Z',
                nauticalDusk: '2068-07-14T11:07:11.219Z',
                nightEnd: '2068-07-13T17:49:28.039Z',
                night: '2068-07-14T11:47:05.553Z',
                goldenHourEnd: '2068-07-13T20:12:26.443Z',
                goldenHour: '2068-07-14T09:24:07.149Z'
            },
            getMoonPosition: {
                azimuth: -1.9214605317282154,
                altitude: -0.9775048504426562,
                distance: 376635.56834834965,
                parallacticAngle: -0.9422246047270992
            },
            getMoonIllumination: {
                fraction: 0.988787762185752,
                phase: 0.4662315440033367,
                angle: -1.3392197432352169
            },
            getMoonTimesUTC: {
                rise: '2068-07-14T09:01:19.009Z',
                set: '2068-07-14T19:36:47.145Z'
            },
            getMoonTimesNonUTC: {
                rise: '2068-07-14T09:01:19.009Z',
                set: '2068-07-14T19:36:47.145Z'
            }
        }
    },
    {
        input: {
            date: '2070-06-04T20:21:40.383Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.3283316605795976,
                altitude: -0.09188682158295709
            },
            getTimes: {
                solarNoon: '2070-06-04T11:50:15.944Z',
                nadir: '2070-06-03T23:50:15.944Z',
                sunrise: '2070-06-04T03:49:02.799Z',
                sunset: '2070-06-04T19:51:29.089Z',
                sunriseEnd: '2070-06-04T03:53:05.010Z',
                sunsetStart: '2070-06-04T19:47:26.877Z',
                dawn: '2070-06-04T03:07:22.072Z',
                dusk: '2070-06-04T20:33:09.815Z',
                nauticalDawn: '2070-06-04T02:09:03.967Z',
                nauticalDusk: '2070-06-04T21:31:27.920Z',
                nightEnd: '2070-06-04T00:25:47.076Z',
                night: '2070-06-04T23:14:44.811Z',
                goldenHourEnd: '2070-06-04T04:38:17.762Z',
                goldenHour: '2070-06-04T19:02:14.125Z'
            },
            getMoonPosition: {
                azimuth: -3.1389464769183575,
                altitude: -0.5655250735146887,
                distance: 369646.3771076797,
                parallacticAngle: -0.001759538722427982
            },
            getMoonIllumination: {
                fraction: 0.18935878793171257,
                phase: 0.8566940124288887,
                angle: 1.1845958430774857
            },
            getMoonTimesUTC: {
                rise: '2070-06-04T01:17:15.825Z',
                set: '2070-06-04T14:44:30.962Z'
            },
            getMoonTimesNonUTC: {
                rise: '2070-06-04T01:17:15.825Z',
                set: '2070-06-04T14:44:30.962Z'
            }
        }
    },
    {
        input: {
            date: '2070-06-04T20:21:40.383Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.2995851717453233,
                altitude: -0.04224095808263805
            },
            getTimes: {
                solarNoon: '2070-06-04T11:59:11.204Z',
                nadir: '2070-06-03T23:59:11.204Z',
                sunrise: '2070-06-04T03:44:53.932Z',
                sunset: '2070-06-04T20:13:28.477Z',
                sunriseEnd: '2070-06-04T03:49:18.907Z',
                sunsetStart: '2070-06-04T20:09:03.502Z',
                dawn: '2070-06-04T02:58:29.629Z',
                dusk: '2070-06-04T20:59:52.780Z',
                nauticalDawn: '2070-06-04T01:48:22.312Z',
                nauticalDusk: '2070-06-04T22:10:00.096Z',
                nightEnd: null,
                night: null,
                goldenHourEnd: '2070-06-04T04:38:11.332Z',
                goldenHour: '2070-06-04T19:20:11.076Z'
            },
            getMoonPosition: {
                azimuth: 3.099591685661807,
                altitude: -0.5187963621115831,
                distance: 369646.3771076797,
                parallacticAngle: 0.026415847126392774
            },
            getMoonIllumination: {
                fraction: 0.18935878793171257,
                phase: 0.8566940124288887,
                angle: 1.1845958430774857
            },
            getMoonTimesUTC: {
                rise: '2070-06-04T01:24:14.055Z',
                set: '2070-06-04T14:57:58.769Z'
            },
            getMoonTimesNonUTC: {
                rise: '2070-06-04T01:24:14.055Z',
                set: '2070-06-04T14:57:58.769Z'
            }
        }
    },
    {
        input: {
            date: '2070-06-04T20:21:40.383Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.7849270927851943,
                altitude: -0.4216616676714133
            },
            getTimes: {
                solarNoon: '2070-06-05T07:03:47.867Z',
                nadir: '2070-06-04T19:03:47.867Z',
                sunrise: '2070-06-04T23:33:12.967Z',
                sunset: '2070-06-05T14:34:22.766Z',
                sunriseEnd: '2070-06-04T23:36:30.215Z',
                sunsetStart: '2070-06-05T14:31:05.518Z',
                dawn: '2070-06-04T23:00:13.525Z',
                dusk: '2070-06-05T15:07:22.208Z',
                nauticalDawn: '2070-06-04T22:18:19.940Z',
                nauticalDusk: '2070-06-05T15:49:15.793Z',
                nightEnd: '2070-06-04T21:29:22.311Z',
                night: '2070-06-05T16:38:13.422Z',
                goldenHourEnd: '2070-06-05T00:14:07.877Z',
                goldenHour: '2070-06-05T13:53:27.857Z'
            },
            getMoonPosition: {
                azimuth: -1.8901002138892202,
                altitude: -0.13284146194682905,
                distance: 369646.3771076797,
                parallacticAngle: -0.8143168165023025
            },
            getMoonIllumination: {
                fraction: 0.18935878793171257,
                phase: 0.8566940124288887,
                angle: 1.1845958430774857
            },
            getMoonTimesUTC: {
                rise: '2070-06-04T21:05:10.448Z',
                set: '2070-06-04T09:34:43.085Z'
            },
            getMoonTimesNonUTC: {
                rise: '2070-06-04T21:05:10.448Z',
                set: '2070-06-04T09:34:43.085Z'
            }
        }
    },
    {
        input: {
            date: '2070-06-04T20:21:40.383Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.9327080167692743,
                altitude: 0.16812435165781192
            },
            getTimes: {
                solarNoon: '2070-06-05T02:41:10.046Z',
                nadir: '2070-06-04T14:41:10.046Z',
                sunrise: '2070-06-04T19:25:36.033Z',
                sunset: '2070-06-05T09:56:44.060Z',
                sunriseEnd: '2070-06-04T19:28:35.669Z',
                sunsetStart: '2070-06-05T09:53:44.424Z',
                dawn: '2070-06-04T18:55:50.248Z',
                dusk: '2070-06-05T10:26:29.845Z',
                nauticalDawn: '2070-06-04T18:19:02.910Z',
                nauticalDusk: '2070-06-05T11:03:17.182Z',
                nightEnd: '2070-06-04T17:38:24.828Z',
                night: '2070-06-05T11:43:55.265Z',
                goldenHourEnd: '2070-06-04T20:03:08.281Z',
                goldenHour: '2070-06-05T09:19:11.812Z'
            },
            getMoonPosition: {
                azimuth: -1.1393597431210836,
                altitude: 0.7424673756056569,
                distance: 369646.3771076797,
                parallacticAngle: -0.8415682707690385
            },
            getMoonIllumination: {
                fraction: 0.18935878793171257,
                phase: 0.8566940124288887,
                angle: 1.1845958430774857
            },
            getMoonTimesUTC: {
                rise: '2070-06-04T16:41:19.804Z',
                set: '2070-06-04T04:56:58.938Z'
            },
            getMoonTimesNonUTC: {
                rise: '2070-06-04T16:41:19.804Z',
                set: '2070-06-04T04:56:58.938Z'
            }
        }
    },
    {
        input: {
            date: '2071-03-30T07:15:55.764Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.3362243064731456,
                altitude: 0.27684174766718384
            },
            getTimes: {
                solarNoon: '2071-03-30T11:56:31.279Z',
                nadir: '2071-03-29T23:56:31.279Z',
                sunrise: '2071-03-30T05:33:32.614Z',
                sunset: '2071-03-30T18:19:29.944Z',
                sunriseEnd: '2071-03-30T05:36:48.186Z',
                sunsetStart: '2071-03-30T18:16:14.372Z',
                dawn: '2071-03-30T05:01:40.379Z',
                dusk: '2071-03-30T18:51:22.179Z',
                nauticalDawn: '2071-03-30T04:23:38.181Z',
                nauticalDusk: '2071-03-30T19:29:24.377Z',
                nightEnd: '2071-03-30T03:43:36.826Z',
                night: '2071-03-30T20:09:25.732Z',
                goldenHourEnd: '2071-03-30T06:15:09.424Z',
                goldenHour: '2071-03-30T17:37:53.134Z'
            },
            getMoonPosition: {
                azimuth: -1.0566900811415023,
                altitude: 0.3588064364193585,
                distance: 389856.86747278314,
                parallacticAngle: -0.6106635613451755
            },
            getMoonIllumination: {
                fraction: 0.019230323458439336,
                phase: 0.9557161593616195,
                angle: 1.2110042676085906
            },
            getMoonTimesUTC: {
                rise: '2071-03-30T05:00:22.345Z',
                set: '2071-03-30T17:12:13.684Z'
            },
            getMoonTimesNonUTC: {
                rise: '2071-03-30T05:00:22.345Z',
                set: '2071-03-30T17:12:13.684Z'
            }
        }
    },
    {
        input: {
            date: '2071-03-30T07:15:55.764Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.3556290654644343,
                altitude: 0.242225045998504
            },
            getTimes: {
                solarNoon: '2071-03-30T12:05:26.363Z',
                nadir: '2071-03-30T00:05:26.363Z',
                sunrise: '2071-03-30T05:40:28.468Z',
                sunset: '2071-03-30T18:30:24.258Z',
                sunriseEnd: '2071-03-30T05:43:55.366Z',
                sunsetStart: '2071-03-30T18:26:57.359Z',
                dawn: '2071-03-30T05:06:42.307Z',
                dusk: '2071-03-30T19:04:10.418Z',
                nauticalDawn: '2071-03-30T04:26:10.730Z',
                nauticalDusk: '2071-03-30T19:44:41.996Z',
                nightEnd: '2071-03-30T03:43:02.186Z',
                night: '2071-03-30T20:27:50.539Z',
                goldenHourEnd: '2071-03-30T06:24:28.272Z',
                goldenHour: '2071-03-30T17:46:24.453Z'
            },
            getMoonPosition: {
                azimuth: -1.0766545555568172,
                altitude: 0.31475257037271115,
                distance: 389856.86747278314,
                parallacticAngle: -0.5805317048478873
            },
            getMoonIllumination: {
                fraction: 0.019230323458439336,
                phase: 0.9557161593616195,
                angle: 1.2110042676085906
            },
            getMoonTimesUTC: {
                rise: '2071-03-30T05:10:50.583Z',
                set: '2071-03-30T17:21:11.869Z'
            },
            getMoonTimesNonUTC: {
                rise: '2071-03-30T05:10:50.583Z',
                set: '2071-03-30T17:21:11.869Z'
            }
        }
    },
    {
        input: {
            date: '2071-03-30T07:15:55.764Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 0.05924742931627656,
                altitude: 0.91818301963368
            },
            getTimes: {
                solarNoon: '2071-03-30T07:09:59.020Z',
                nadir: '2071-03-29T19:09:59.020Z',
                sunrise: '2071-03-30T00:52:09.072Z',
                sunset: '2071-03-30T13:27:48.968Z',
                sunriseEnd: '2071-03-30T00:54:58.532Z',
                sunsetStart: '2071-03-30T13:24:59.508Z',
                dawn: '2071-03-30T00:24:37.745Z',
                dusk: '2071-03-30T13:55:20.295Z',
                nauticalDawn: '2071-03-29T23:52:09.400Z',
                nauticalDusk: '2071-03-30T14:27:48.640Z',
                nightEnd: '2071-03-29T23:18:45.458Z',
                night: '2071-03-30T15:01:12.582Z',
                goldenHourEnd: '2071-03-30T01:28:15.531Z',
                goldenHour: '2071-03-30T12:51:42.509Z'
            },
            getMoonPosition: {
                azimuth: 0.41952255564952945,
                altitude: 0.7742552417979692,
                distance: 389856.86747278314,
                parallacticAngle: 0.31413911210781137
            },
            getMoonIllumination: {
                fraction: 0.019230323458439336,
                phase: 0.9557161593616195,
                angle: 1.2110042676085906
            },
            getMoonTimesUTC: {
                rise: '2071-03-30T00:04:49.365Z',
                set: '2071-03-30T12:13:34.616Z'
            },
            getMoonTimesNonUTC: {
                rise: '2071-03-30T00:04:49.365Z',
                set: '2071-03-30T12:13:34.616Z'
            }
        }
    },
    {
        input: {
            date: '2071-03-30T07:15:55.764Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.3855730534042154,
                altitude: 0.34879833632510804
            },
            getTimes: {
                solarNoon: '2071-03-30T02:47:26.451Z',
                nadir: '2071-03-29T14:47:26.451Z',
                sunrise: '2071-03-29T20:32:09.459Z',
                sunset: '2071-03-30T09:02:43.442Z',
                sunriseEnd: '2071-03-29T20:34:47.454Z',
                sunsetStart: '2071-03-30T09:00:05.447Z',
                dawn: '2071-03-29T20:06:31.957Z',
                dusk: '2071-03-30T09:28:20.944Z',
                nauticalDawn: '2071-03-29T19:36:26.026Z',
                nauticalDusk: '2071-03-30T09:58:26.875Z',
                nightEnd: '2071-03-29T19:05:44.142Z',
                night: '2071-03-30T10:29:08.759Z',
                goldenHourEnd: '2071-03-29T21:05:50.558Z',
                goldenHour: '2071-03-30T08:29:02.343Z'
            },
            getMoonPosition: {
                azimuth: 1.4633297510133811,
                altitude: 0.08474909071395695,
                distance: 389856.86747278314,
                parallacticAngle: 0.9412992157767843
            },
            getMoonIllumination: {
                fraction: 0.019230323458439336,
                phase: 0.9557161593616195,
                angle: 1.2110042676085906
            },
            getMoonTimesUTC: {
                rise: '2071-03-30T20:08:43.661Z',
                set: '2071-03-30T07:41:09.045Z'
            },
            getMoonTimesNonUTC: {
                rise: '2071-03-30T20:08:43.661Z',
                set: '2071-03-30T07:41:09.045Z'
            }
        }
    },
    {
        input: {
            date: '2073-02-28T06:23:34.252Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.4062740595893566,
                altitude: -0.04614433053486123
            },
            getTimes: {
                solarNoon: '2073-02-28T12:04:42.612Z',
                nadir: '2073-02-28T00:04:42.612Z',
                sunrise: '2073-02-28T06:34:53.081Z',
                sunset: '2073-02-28T17:34:32.143Z',
                sunriseEnd: '2073-02-28T06:38:11.322Z',
                sunsetStart: '2073-02-28T17:31:13.902Z',
                dawn: '2073-02-28T06:03:09.082Z',
                dusk: '2073-02-28T18:06:16.142Z',
                nauticalDawn: '2073-02-28T05:26:38.538Z',
                nauticalDusk: '2073-02-28T18:42:46.686Z',
                nightEnd: '2073-02-28T04:49:59.415Z',
                night: '2073-02-28T19:19:25.809Z',
                goldenHourEnd: '2073-02-28T07:17:56.085Z',
                goldenHour: '2073-02-28T16:51:29.139Z'
            },
            getMoonPosition: {
                azimuth: 0.3154247090845505,
                altitude: 0.42345026091010124,
                distance: 372907.059832404,
                parallacticAngle: 0.21310472428509022
            },
            getMoonIllumination: {
                fraction: 0.5791523142525534,
                phase: 0.7246985986667108,
                angle: 1.7641064680609264
            },
            getMoonTimesUTC: {
                rise: '2073-02-28T00:08:04.296Z',
                set: '2073-02-28T10:10:44.991Z'
            },
            getMoonTimesNonUTC: {
                rise: '2073-02-28T00:07:57.330Z',
                set: '2073-02-28T10:10:53.304Z'
            }
        }
    },
    {
        input: {
            date: '2073-02-28T06:23:34.252Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.4387815895371798,
                altitude: -0.07763482891103533
            },
            getTimes: {
                solarNoon: '2073-02-28T12:13:37.743Z',
                nadir: '2073-02-28T00:13:37.743Z',
                sunrise: '2073-02-28T06:47:05.514Z',
                sunset: '2073-02-28T17:40:09.973Z',
                sunriseEnd: '2073-02-28T06:50:35.521Z',
                sunsetStart: '2073-02-28T17:36:39.965Z',
                dawn: '2073-02-28T06:13:31.291Z',
                dusk: '2073-02-28T18:13:44.195Z',
                nauticalDawn: '2073-02-28T05:34:55.846Z',
                nauticalDusk: '2073-02-28T18:52:19.641Z',
                nightEnd: '2073-02-28T04:56:06.518Z',
                night: '2073-02-28T19:31:08.969Z',
                goldenHourEnd: '2073-02-28T07:32:49.679Z',
                goldenHour: '2073-02-28T16:54:25.807Z'
            },
            getMoonPosition: {
                azimuth: 0.26960355531830665,
                altitude: 0.3864220413251272,
                distance: 372907.059832404,
                parallacticAngle: 0.1726410461350883
            },
            getMoonIllumination: {
                fraction: 0.5791523142525534,
                phase: 0.7246985986667108,
                angle: 1.7641064680609264
            },
            getMoonTimesUTC: {
                rise: '2073-02-28T00:25:13.180Z',
                set: '2073-02-28T10:12:08.163Z'
            },
            getMoonTimesNonUTC: {
                rise: '2073-02-28T00:25:04.811Z',
                set: '2073-02-28T10:12:17.091Z'
            }
        }
    },
    {
        input: {
            date: '2073-02-28T06:23:34.252Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -0.29270453105669547,
                altitude: 0.6922722412159934
            },
            getTimes: {
                solarNoon: '2073-02-28T07:18:08.811Z',
                nadir: '2073-02-27T19:18:08.811Z',
                sunrise: '2073-02-28T01:40:13.579Z',
                sunset: '2073-02-28T12:56:04.043Z',
                sunriseEnd: '2073-02-28T01:43:04.946Z',
                sunsetStart: '2073-02-28T12:53:12.676Z',
                dawn: '2073-02-28T01:12:42.880Z',
                dusk: '2073-02-28T13:23:34.742Z',
                nauticalDawn: '2073-02-28T00:41:00.321Z',
                nauticalDusk: '2073-02-28T13:55:17.301Z',
                nightEnd: '2073-02-28T00:09:18.314Z',
                night: '2073-02-28T14:26:59.308Z',
                goldenHourEnd: '2073-02-28T02:17:13.327Z',
                goldenHour: '2073-02-28T12:19:04.295Z'
            },
            getMoonPosition: {
                azimuth: 1.35395172276325,
                altitude: -0.14606035017585817,
                distance: 372907.059832404,
                parallacticAngle: 0.8740901237448343
            },
            getMoonIllumination: {
                fraction: 0.5791523142525534,
                phase: 0.7246985986667108,
                angle: 1.7641064680609264
            },
            getMoonTimesUTC: {
                rise: '2073-02-28T19:56:11.338Z',
                set: '2073-02-28T05:34:33.445Z'
            },
            getMoonTimesNonUTC: {
                rise: '2073-02-28T19:56:05.264Z',
                set: '2073-02-28T05:34:44.893Z'
            }
        }
    },
    {
        input: {
            date: '2073-02-28T06:23:34.252Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.0366822988891808,
                altitude: 0.4163785947619133
            },
            getTimes: {
                solarNoon: '2073-02-28T02:55:34.805Z',
                nadir: '2073-02-27T14:55:34.805Z',
                sunrise: '2073-02-27T21:13:34.064Z',
                sunset: '2073-02-28T08:37:35.546Z',
                sunriseEnd: '2073-02-27T21:16:13.717Z',
                sunsetStart: '2073-02-28T08:34:55.894Z',
                dawn: '2073-02-27T20:47:54.317Z',
                dusk: '2073-02-28T09:03:15.294Z',
                nauticalDawn: '2073-02-27T20:18:18.077Z',
                nauticalDusk: '2073-02-28T09:32:51.534Z',
                nightEnd: '2073-02-27T19:48:44.929Z',
                night: '2073-02-28T10:02:24.682Z',
                goldenHourEnd: '2073-02-27T21:47:57.190Z',
                goldenHour: '2073-02-28T08:03:12.421Z'
            },
            getMoonPosition: {
                azimuth: 2.185282582568387,
                altitude: -1.025462803083931,
                distance: 372907.059832404,
                parallacticAngle: 0.758332560950721
            },
            getMoonIllumination: {
                fraction: 0.5791523142525534,
                phase: 0.7246985986667108,
                angle: 1.7641064680609264
            },
            getMoonTimesUTC: {
                rise: '2073-02-28T15:11:51.905Z',
                set: '2073-02-28T01:12:54.067Z'
            },
            getMoonTimesNonUTC: {
                rise: '2073-02-28T15:12:01.755Z',
                set: '2073-02-28T01:12:53.212Z'
            }
        }
    },
    {
        input: {
            date: '2073-11-04T04:19:34.841Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.6323792530701449,
                altitude: -0.40784471042777487
            },
            getTimes: {
                solarNoon: '2073-11-04T11:35:26.292Z',
                nadir: '2073-11-03T23:35:26.292Z',
                sunrise: '2073-11-04T06:40:24.190Z',
                sunset: '2073-11-04T16:30:28.395Z',
                sunriseEnd: '2073-11-04T06:43:54.513Z',
                sunsetStart: '2073-11-04T16:26:58.072Z',
                dawn: '2073-11-04T06:07:09.783Z',
                dusk: '2073-11-04T17:03:42.802Z',
                nauticalDawn: '2073-11-04T05:29:46.536Z',
                nauticalDusk: '2073-11-04T17:41:06.049Z',
                nightEnd: '2073-11-04T04:53:05.744Z',
                night: '2073-11-04T18:17:46.841Z',
                goldenHourEnd: '2073-11-04T07:26:52.217Z',
                goldenHour: '2073-11-04T15:44:00.368Z'
            },
            getMoonPosition: {
                azimuth: -2.83551209456879,
                altitude: -1.0354993336406138,
                distance: 376736.09550969774,
                parallacticAngle: -0.21205726109392506
            },
            getMoonIllumination: {
                fraction: 0.2465590856395109,
                phase: 0.16539902163245407,
                angle: -1.6830505445460966
            },
            getMoonTimesUTC: {
                rise: '2073-11-04T11:32:56.367Z',
                set: '2073-11-04T20:47:39.268Z'
            },
            getMoonTimesNonUTC: {
                rise: '2073-11-04T11:33:00.367Z',
                set: '2073-11-04T20:47:30.005Z'
            }
        }
    },
    {
        input: {
            date: '2073-11-04T04:19:34.841Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.6837269730692535,
                altitude: -0.42865309623287373
            },
            getTimes: {
                solarNoon: '2073-11-04T11:44:21.501Z',
                nadir: '2073-11-03T23:44:21.501Z',
                sunrise: '2073-11-04T06:56:16.356Z',
                sunset: '2073-11-04T16:32:26.646Z',
                sunriseEnd: '2073-11-04T07:00:00.862Z',
                sunsetStart: '2073-11-04T16:28:42.139Z',
                dawn: '2073-11-04T06:20:55.513Z',
                dusk: '2073-11-04T17:07:47.489Z',
                nauticalDawn: '2073-11-04T05:41:21.408Z',
                nauticalDusk: '2073-11-04T17:47:21.593Z',
                nightEnd: '2073-11-04T05:02:36.415Z',
                night: '2073-11-04T18:26:06.586Z',
                goldenHourEnd: '2073-11-04T07:46:12.377Z',
                goldenHour: '2073-11-04T15:42:30.625Z'
            },
            getMoonPosition: {
                azimuth: -2.9247435280499725,
                altitude: -0.9972501931101503,
                distance: 376736.09550969774,
                parallacticAngle: -0.14265430114978003
            },
            getMoonIllumination: {
                fraction: 0.2465590856395109,
                phase: 0.16539902163245407,
                angle: -1.6830505445460966
            },
            getMoonTimesUTC: {
                rise: '2073-11-04T11:52:08.987Z',
                set: '2073-11-04T20:46:45.400Z'
            },
            getMoonTimesNonUTC: {
                rise: '2073-11-04T11:51:57.247Z',
                set: '2073-11-04T20:46:35.687Z'
            }
        }
    },
    {
        input: {
            date: '2073-11-04T04:19:34.841Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -0.6868320219490136,
                altitude: 0.42929204206587324
            },
            getTimes: {
                solarNoon: '2073-11-04T06:48:50.040Z',
                nadir: '2073-11-03T18:48:50.040Z',
                sunrise: '2073-11-04T01:36:16.843Z',
                sunset: '2073-11-04T12:01:23.237Z',
                sunriseEnd: '2073-11-04T01:39:15.753Z',
                sunsetStart: '2073-11-04T11:58:24.327Z',
                dawn: '2073-11-04T01:07:46.871Z',
                dusk: '2073-11-04T12:29:53.209Z',
                nauticalDawn: '2073-11-04T00:35:23.638Z',
                nauticalDusk: '2073-11-04T13:02:16.442Z',
                nightEnd: '2073-11-04T00:03:28.935Z',
                night: '2073-11-04T13:34:11.145Z',
                goldenHourEnd: '2073-11-04T02:15:17.466Z',
                goldenHour: '2073-11-04T11:22:22.613Z'
            },
            getMoonPosition: {
                azimuth: -1.4034896569864799,
                altitude: -0.329591235936946,
                distance: 376736.09550969774,
                parallacticAngle: -0.9163581994645092
            },
            getMoonIllumination: {
                fraction: 0.2465590856395109,
                phase: 0.16539902163245407,
                angle: -1.6830505445460966
            },
            getMoonTimesUTC: {
                rise: '2073-11-04T06:09:43.249Z',
                set: '2073-11-04T16:13:29.869Z'
            },
            getMoonTimesNonUTC: {
                rise: '2073-11-04T06:09:35.203Z',
                set: '2073-11-04T16:13:33.644Z'
            }
        }
    },
    {
        input: {
            date: '2073-11-04T04:19:34.841Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 0.5856663556609893,
                altitude: 0.562769008193844
            },
            getTimes: {
                solarNoon: '2073-11-04T02:26:13.838Z',
                nadir: '2073-11-03T14:26:13.838Z',
                sunrise: '2073-11-03T21:04:54.076Z',
                sunset: '2073-11-04T07:47:33.599Z',
                sunriseEnd: '2073-11-03T21:07:39.700Z',
                sunsetStart: '2073-11-04T07:44:47.975Z',
                dawn: '2073-11-03T20:38:26.044Z',
                dusk: '2073-11-04T08:14:01.631Z',
                nauticalDawn: '2073-11-03T20:08:13.528Z',
                nauticalDusk: '2073-11-04T08:44:14.147Z',
                nightEnd: '2073-11-03T19:38:23.867Z',
                night: '2073-11-04T09:14:03.808Z',
                goldenHourEnd: '2073-11-03T21:40:50.082Z',
                goldenHour: '2073-11-04T07:11:37.593Z'
            },
            getMoonPosition: {
                azimuth: -0.6176941113168355,
                altitude: 0.45957126856589814,
                distance: 376736.09550969774,
                parallacticAngle: -0.5229384374876676
            },
            getMoonIllumination: {
                fraction: 0.2465590856395109,
                phase: 0.16539902163245407,
                angle: -1.6830505445460966
            },
            getMoonTimesUTC: {
                rise: '2073-11-04T01:24:44.232Z',
                set: '2073-11-04T11:53:13.629Z'
            },
            getMoonTimesNonUTC: {
                rise: '2073-11-04T01:24:56.163Z',
                set: '2073-11-04T11:53:19.916Z'
            }
        }
    },
    {
        input: {
            date: '2074-09-15T19:06:24.508Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.8797178065478535,
                altitude: -0.1890213107398246
            },
            getTimes: {
                solarNoon: '2074-09-15T11:47:30.995Z',
                nadir: '2074-09-14T23:47:30.995Z',
                sunrise: '2074-09-15T05:25:19.312Z',
                sunset: '2074-09-15T18:09:42.677Z',
                sunriseEnd: '2074-09-15T05:28:34.790Z',
                sunsetStart: '2074-09-15T18:06:27.200Z',
                dawn: '2074-09-15T04:53:28.537Z',
                dusk: '2074-09-15T18:41:33.453Z',
                nauticalDawn: '2074-09-15T04:15:29.495Z',
                nauticalDusk: '2074-09-15T19:19:32.495Z',
                nightEnd: '2074-09-15T03:35:33.633Z',
                night: '2074-09-15T19:59:28.356Z',
                goldenHourEnd: '2074-09-15T06:06:55.623Z',
                goldenHour: '2074-09-15T17:28:06.366Z'
            },
            getMoonPosition: {
                azimuth: 3.023809619279852,
                altitude: -0.32883186856305197,
                distance: 398373.86755838327,
                parallacticAngle: 0.08323939490306269
            },
            getMoonIllumination: {
                fraction: 0.27817991447026524,
                phase: 0.8231565835545612,
                angle: 1.7018583462770873
            },
            getMoonTimesUTC: {
                rise: '2074-09-15T23:54:40.277Z',
                set: '2074-09-15T15:15:31.551Z'
            },
            getMoonTimesNonUTC: {
                rise: '2074-09-14T23:02:52.222Z',
                set: '2074-09-15T15:15:31.551Z'
            }
        }
    },
    {
        input: {
            date: '2074-09-15T19:06:24.508Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.8561682500985046,
                altitude: -0.1516415494497211
            },
            getTimes: {
                solarNoon: '2074-09-15T11:56:26.058Z',
                nadir: '2074-09-14T23:56:26.058Z',
                sunrise: '2074-09-15T05:32:21.283Z',
                sunset: '2074-09-15T18:20:30.833Z',
                sunriseEnd: '2074-09-15T05:35:48.065Z',
                sunsetStart: '2074-09-15T18:17:04.051Z',
                dawn: '2074-09-15T04:58:36.940Z',
                dusk: '2074-09-15T18:54:15.176Z',
                nauticalDawn: '2074-09-15T04:18:09.396Z',
                nauticalDusk: '2074-09-15T19:34:42.721Z',
                nightEnd: '2074-09-15T03:35:08.151Z',
                night: '2074-09-15T20:17:43.965Z',
                goldenHourEnd: '2074-09-15T06:16:20.504Z',
                goldenHour: '2074-09-15T17:36:31.612Z'
            },
            getMoonPosition: {
                azimuth: 2.9879452589524953,
                altitude: -0.279639085378397,
                distance: 398373.86755838327,
                parallacticAngle: 0.10261926443192251
            },
            getMoonIllumination: {
                fraction: 0.27817991447026524,
                phase: 0.8231565835545612,
                angle: 1.7018583462770873
            },
            getMoonTimesUTC: {
                rise: '2074-09-15T23:52:00.658Z',
                set: '2074-09-15T15:36:59.622Z'
            },
            getMoonTimesNonUTC: {
                rise: '2074-09-14T22:59:42.958Z',
                set: '2074-09-15T15:36:59.622Z'
            }
        }
    },
    {
        input: {
            date: '2074-09-15T19:06:24.508Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -3.0893656748494336,
                altitude: -0.8045130120261893
            },
            getTimes: {
                solarNoon: '2074-09-16T07:00:37.308Z',
                nadir: '2074-09-15T19:00:37.308Z',
                sunrise: '2074-09-16T00:44:10.561Z',
                sunset: '2074-09-16T13:17:04.055Z',
                sunriseEnd: '2074-09-16T00:46:59.885Z',
                sunsetStart: '2074-09-16T13:14:14.731Z',
                dawn: '2074-09-16T00:16:41.243Z',
                dusk: '2074-09-16T13:44:33.373Z',
                nauticalDawn: '2074-09-15T23:44:17.015Z',
                nauticalDusk: '2074-09-16T14:16:57.601Z',
                nightEnd: '2074-09-15T23:10:59.698Z',
                night: '2074-09-16T14:50:14.917Z',
                goldenHourEnd: '2074-09-16T01:20:16.234Z',
                goldenHour: '2074-09-16T12:40:58.381Z'
            },
            getMoonPosition: {
                azimuth: -2.1386143423713637,
                altitude: -0.05205393270863057,
                distance: 398373.86755838327,
                parallacticAngle: -0.7575547641571458
            },
            getMoonIllumination: {
                fraction: 0.27817991447026524,
                phase: 0.8231565835545612,
                angle: 1.7018583462770873
            },
            getMoonTimesUTC: {
                rise: '2074-09-15T19:27:05.777Z',
                set: '2074-09-15T09:50:00.773Z'
            },
            getMoonTimesNonUTC: {
                rise: '2074-09-15T19:27:05.777Z',
                set: '2074-09-15T09:50:00.773Z'
            }
        }
    },
    {
        input: {
            date: '2074-09-15T19:06:24.508Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.8504621732419362,
                altitude: -0.2789598097855323
            },
            getTimes: {
                solarNoon: '2074-09-16T02:38:05.338Z',
                nadir: '2074-09-15T14:38:05.338Z',
                sunrise: '2074-09-15T20:23:33.215Z',
                sunset: '2074-09-16T08:52:37.462Z',
                sunriseEnd: '2074-09-15T20:26:11.140Z',
                sunsetStart: '2074-09-16T08:49:59.537Z',
                dawn: '2074-09-15T19:57:56.713Z',
                dusk: '2074-09-16T09:18:13.964Z',
                nauticalDawn: '2074-09-15T19:27:52.756Z',
                nauticalDusk: '2074-09-16T09:48:17.921Z',
                nightEnd: '2074-09-15T18:57:13.936Z',
                night: '2074-09-16T10:18:56.741Z',
                goldenHourEnd: '2074-09-15T20:57:13.865Z',
                goldenHour: '2074-09-16T08:18:56.812Z'
            },
            getMoonPosition: {
                azimuth: -1.4955844195307952,
                altitude: 0.7820027867535747,
                distance: 398373.86755838327,
                parallacticAngle: -1.0573079258698244
            },
            getMoonIllumination: {
                fraction: 0.27817991447026524,
                phase: 0.8231565835545612,
                angle: 1.7018583462770873
            },
            getMoonTimesUTC: {
                rise: '2074-09-15T15:08:39.768Z',
                set: '2074-09-15T05:04:06.926Z'
            },
            getMoonTimesNonUTC: {
                rise: '2074-09-15T15:08:39.768Z',
                set: '2074-09-15T05:04:06.926Z'
            }
        }
    },
    {
        input: {
            date: '2075-02-08T14:51:59.399Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 0.7382038274581157,
                altitude: 0.2765398426325962
            },
            getTimes: {
                solarNoon: '2075-02-08T12:06:04.782Z',
                nadir: '2075-02-08T00:06:04.782Z',
                sunrise: '2075-02-08T07:11:06.057Z',
                sunset: '2075-02-08T17:01:03.507Z',
                sunriseEnd: '2075-02-08T07:14:36.406Z',
                sunsetStart: '2075-02-08T16:57:33.157Z',
                dawn: '2075-02-08T06:37:51.442Z',
                dusk: '2075-02-08T17:34:18.121Z',
                nauticalDawn: '2075-02-08T06:00:28.048Z',
                nauticalDusk: '2075-02-08T18:11:41.516Z',
                nightEnd: '2075-02-08T05:23:47.190Z',
                night: '2075-02-08T18:48:22.373Z',
                goldenHourEnd: '2075-02-08T07:57:34.528Z',
                goldenHour: '2075-02-08T16:14:35.035Z'
            },
            getMoonPosition: {
                azimuth: 2.003833638112841,
                altitude: -0.6521649374459072,
                distance: 365991.6840921077,
                parallacticAngle: 0.6635385443638423
            },
            getMoonIllumination: {
                fraction: 0.4708700539805007,
                phase: 0.7592776032215204,
                angle: 1.829717853285333
            },
            getMoonTimesUTC: {
                rise: '2075-02-08T00:23:08.896Z',
                set: '2075-02-08T10:52:34.882Z'
            },
            getMoonTimesNonUTC: {
                rise: '2075-02-08T00:22:59.292Z',
                set: '2075-02-08T10:52:27.997Z'
            }
        }
    },
    {
        input: {
            date: '2075-02-08T14:51:59.399Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 0.6948352057293049,
                altitude: 0.2580353053906162
            },
            getTimes: {
                solarNoon: '2075-02-08T12:15:00.006Z',
                nadir: '2075-02-08T00:15:00.006Z',
                sunrise: '2075-02-08T07:26:57.302Z',
                sunset: '2075-02-08T17:03:02.710Z',
                sunriseEnd: '2075-02-08T07:30:41.829Z',
                sunsetStart: '2075-02-08T16:59:18.183Z',
                dawn: '2075-02-08T06:51:36.297Z',
                dusk: '2075-02-08T17:38:23.714Z',
                nauticalDawn: '2075-02-08T06:12:02.083Z',
                nauticalDusk: '2075-02-08T18:17:57.929Z',
                nightEnd: '2075-02-08T05:33:17.045Z',
                night: '2075-02-08T18:56:42.967Z',
                goldenHourEnd: '2075-02-08T08:16:53.683Z',
                goldenHour: '2075-02-08T16:13:06.328Z'
            },
            getMoonPosition: {
                azimuth: 1.9974843774242712,
                altitude: -0.61022659304413,
                distance: 365991.6840921077,
                parallacticAngle: 0.6240944714986449
            },
            getMoonIllumination: {
                fraction: 0.4708700539805007,
                phase: 0.7592776032215204,
                angle: 1.829717853285333
            },
            getMoonTimesUTC: {
                rise: '2075-02-08T00:38:18.092Z',
                set: '2075-02-08T10:55:20.665Z'
            },
            getMoonTimesNonUTC: {
                rise: '2075-02-08T00:38:19.210Z',
                set: '2075-02-08T10:55:15.865Z'
            }
        }
    },
    {
        input: {
            date: '2075-02-08T14:51:59.399Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.6327518331630146,
                altitude: -0.48516272261611615
            },
            getTimes: {
                solarNoon: '2075-02-08T07:19:27.993Z',
                nadir: '2075-02-07T19:19:27.993Z',
                sunrise: '2075-02-08T02:07:25.162Z',
                sunset: '2075-02-08T12:31:30.823Z',
                sunriseEnd: '2075-02-08T02:10:24.274Z',
                sunsetStart: '2075-02-08T12:28:31.712Z',
                dawn: '2075-02-08T01:38:53.548Z',
                dusk: '2075-02-08T13:00:02.437Z',
                nauticalDawn: '2075-02-08T01:06:29.011Z',
                nauticalDusk: '2075-02-08T13:32:26.974Z',
                nightEnd: '2075-02-08T00:34:33.557Z',
                night: '2075-02-08T14:04:22.428Z',
                goldenHourEnd: '2075-02-08T02:46:28.943Z',
                goldenHour: '2075-02-08T11:52:27.042Z'
            },
            getMoonPosition: {
                azimuth: -2.3542630457679037,
                altitude: -0.9719360223011527,
                distance: 365991.6840921077,
                parallacticAngle: -0.586888643890331
            },
            getMoonIllumination: {
                fraction: 0.4708700539805007,
                phase: 0.7592776032215204,
                angle: 1.829717853285333
            },
            getMoonTimesUTC: {
                rise: '2075-02-08T20:20:29.655Z',
                set: '2075-02-08T06:13:59.332Z'
            },
            getMoonTimesNonUTC: {
                rise: '2075-02-08T20:20:18.323Z',
                set: '2075-02-08T06:14:00.836Z'
            }
        }
    },
    {
        input: {
            date: '2075-02-08T14:51:59.399Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 3.1146111749204772,
                altitude: -1.2138999598172906
            },
            getTimes: {
                solarNoon: '2075-02-09T02:56:55.029Z',
                nadir: '2075-02-08T14:56:55.029Z',
                sunrise: '2075-02-08T21:35:23.198Z',
                sunset: '2075-02-09T08:18:26.860Z',
                sunriseEnd: '2075-02-08T21:38:08.745Z',
                sunsetStart: '2075-02-09T08:15:41.313Z',
                dawn: '2075-02-08T21:08:55.803Z',
                dusk: '2075-02-09T08:44:54.255Z',
                nauticalDawn: '2075-02-08T20:38:43.823Z',
                nauticalDusk: '2075-02-09T09:15:06.234Z',
                nightEnd: '2075-02-08T20:08:54.508Z',
                night: '2075-02-09T09:44:55.550Z',
                goldenHourEnd: '2075-02-08T22:11:18.042Z',
                goldenHour: '2075-02-09T07:42:32.016Z'
            },
            getMoonPosition: {
                azimuth: -1.372614622952271,
                altitude: -0.1392109585101427,
                distance: 365991.6840921077,
                parallacticAngle: -0.9637049105989922
            },
            getMoonIllumination: {
                fraction: 0.4708700539805007,
                phase: 0.7592776032215204,
                angle: 1.829717853285333
            },
            getMoonTimesUTC: {
                rise: '2075-02-08T15:36:03.947Z',
                set: '2075-02-08T01:52:21.621Z'
            },
            getMoonTimesNonUTC: {
                rise: '2075-02-08T15:36:11.391Z',
                set: '2075-02-08T01:52:29.247Z'
            }
        }
    },
    {
        input: {
            date: '2075-12-31T16:41:20.931Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.0801152395043379,
                altitude: -0.11310219435443469
            },
            getTimes: {
                solarNoon: '2075-12-31T11:54:16.852Z',
                nadir: '2075-12-30T23:54:16.852Z',
                sunrise: '2075-12-31T07:42:40.069Z',
                sunset: '2075-12-31T16:05:53.635Z',
                sunriseEnd: '2075-12-31T07:46:38.615Z',
                sunsetStart: '2075-12-31T16:01:55.089Z',
                dawn: '2075-12-31T07:05:44.904Z',
                dusk: '2075-12-31T16:42:48.799Z',
                nauticalDawn: '2075-12-31T06:25:34.081Z',
                nauticalDusk: '2075-12-31T17:22:59.623Z',
                nightEnd: '2075-12-31T05:47:13.943Z',
                night: '2075-12-31T18:01:19.761Z',
                goldenHourEnd: '2075-12-31T08:37:09.377Z',
                goldenHour: '2075-12-31T15:11:24.327Z'
            },
            getMoonPosition: {
                azimuth: 2.380204037356596,
                altitude: -0.6614454707603613,
                distance: 382964.1714686136,
                parallacticAngle: 0.47351772757891786
            },
            getMoonIllumination: {
                fraction: 0.36200276861256303,
                phase: 0.7945035733649368,
                angle: 1.9645756235913294
            },
            getMoonTimesUTC: {
                rise: '2075-12-31T00:30:12.110Z',
                set: '2075-12-31T12:25:44.238Z'
            },
            getMoonTimesNonUTC: {
                rise: '2075-12-31T00:30:05.328Z',
                set: '2075-12-31T12:25:38.657Z'
            }
        }
    },
    {
        input: {
            date: '2075-12-31T16:41:20.931Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.0561942689876747,
                altitude: -0.11353512822579853
            },
            getTimes: {
                solarNoon: '2075-12-31T12:03:12.226Z',
                nadir: '2075-12-31T00:03:12.226Z',
                sunrise: '2075-12-31T08:03:41.227Z',
                sunset: '2075-12-31T16:02:43.225Z',
                sunriseEnd: '2075-12-31T08:08:01.024Z',
                sunsetStart: '2075-12-31T15:58:23.428Z',
                dawn: '2075-12-31T07:23:50.799Z',
                dusk: '2075-12-31T16:42:33.653Z',
                nauticalDawn: '2075-12-31T06:41:00.420Z',
                nauticalDusk: '2075-12-31T17:25:24.032Z',
                nightEnd: '2075-12-31T06:00:25.007Z',
                night: '2075-12-31T18:05:59.445Z',
                goldenHourEnd: '2075-12-31T09:04:06.848Z',
                goldenHour: '2075-12-31T15:02:17.604Z'
            },
            getMoonPosition: {
                azimuth: 2.3610885347092845,
                altitude: -0.6109053798031303,
                distance: 382964.1714686136,
                parallacticAngle: 0.45557490303031667
            },
            getMoonIllumination: {
                fraction: 0.36200276861256303,
                phase: 0.7945035733649368,
                angle: 1.9645756235913294
            },
            getMoonTimesUTC: {
                rise: '2075-12-31T00:40:20.934Z',
                set: '2075-12-31T12:32:58.460Z'
            },
            getMoonTimesNonUTC: {
                rise: '2075-12-31T00:40:23.492Z',
                set: '2075-12-31T12:32:49.276Z'
            }
        }
    },
    {
        input: {
            date: '2075-12-31T16:41:20.931Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.9048430044953475,
                altitude: -0.9622874809714542
            },
            getTimes: {
                solarNoon: '2075-12-31T07:07:35.252Z',
                nadir: '2075-12-30T19:07:35.252Z',
                sunrise: '2075-12-31T02:26:47.840Z',
                sunset: '2075-12-31T11:48:22.665Z',
                sunriseEnd: '2075-12-31T02:30:03.424Z',
                sunsetStart: '2075-12-31T11:45:07.080Z',
                dawn: '2075-12-31T01:56:00.269Z',
                dusk: '2075-12-31T12:19:10.236Z',
                nauticalDawn: '2075-12-31T01:21:41.204Z',
                nauticalDusk: '2075-12-31T12:53:29.301Z',
                nightEnd: '2075-12-31T00:48:27.526Z',
                night: '2075-12-31T13:26:42.979Z',
                goldenHourEnd: '2075-12-31T03:10:09.489Z',
                goldenHour: '2075-12-31T11:05:01.015Z'
            },
            getMoonPosition: {
                azimuth: -2.180357003360418,
                altitude: -0.6991100689096919,
                distance: 382964.1714686136,
                parallacticAngle: -0.6742006066796901
            },
            getMoonIllumination: {
                fraction: 0.36200276861256303,
                phase: 0.7945035733649368,
                angle: 1.9645756235913294
            },
            getMoonTimesUTC: {
                rise: '2075-12-31T20:34:24.955Z',
                set: '2075-12-31T07:38:56.752Z'
            },
            getMoonTimesNonUTC: {
                rise: '2075-12-31T20:34:17.822Z',
                set: '2075-12-31T07:39:09.928Z'
            }
        }
    },
    {
        input: {
            date: '2075-12-31T16:41:20.931Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.8820441911115926,
                altitude: -1.0720608588801053
            },
            getTimes: {
                solarNoon: '2076-01-01T02:45:22.201Z',
                nadir: '2075-12-31T14:45:22.201Z',
                sunrise: '2075-12-31T21:50:08.632Z',
                sunset: '2076-01-01T07:40:35.771Z',
                sunriseEnd: '2075-12-31T21:53:07.234Z',
                sunsetStart: '2076-01-01T07:37:37.169Z',
                dawn: '2075-12-31T21:21:50.727Z',
                dusk: '2076-01-01T08:08:53.676Z',
                nauticalDawn: '2075-12-31T20:50:00.658Z',
                nauticalDusk: '2076-01-01T08:40:43.745Z',
                nightEnd: '2075-12-31T20:18:59.401Z',
                night: '2076-01-01T09:11:45.002Z',
                goldenHourEnd: '2075-12-31T22:29:20.839Z',
                goldenHour: '2076-01-01T07:01:23.564Z'
            },
            getMoonPosition: {
                azimuth: -1.34569768912788,
                altitude: 0.14854708386858298,
                distance: 382964.1714686136,
                parallacticAngle: -0.9197109148028394
            },
            getMoonIllumination: {
                fraction: 0.36200276861256303,
                phase: 0.7945035733649368,
                angle: 1.9645756235913294
            },
            getMoonTimesUTC: {
                rise: '2075-12-31T15:56:00.695Z',
                set: '2075-12-31T03:12:44.854Z'
            },
            getMoonTimesNonUTC: {
                rise: '2075-12-31T15:55:55.828Z',
                set: '2075-12-31T03:12:44.795Z'
            }
        }
    },
    {
        input: {
            date: '2077-10-01T09:23:40.781Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -0.7012773079937322,
                altitude: 0.531110095000533
            },
            getTimes: {
                solarNoon: '2077-10-01T11:41:39.762Z',
                nadir: '2077-09-30T23:41:39.762Z',
                sunrise: '2077-10-01T05:48:21.338Z',
                sunset: '2077-10-01T17:34:58.185Z',
                sunriseEnd: '2077-10-01T05:51:36.112Z',
                sunsetStart: '2077-10-01T17:31:43.412Z',
                dawn: '2077-10-01T05:16:55.949Z',
                dusk: '2077-10-01T18:06:23.575Z',
                nauticalDawn: '2077-10-01T04:40:13.513Z',
                nauticalDusk: '2077-10-01T18:43:06.011Z',
                nightEnd: '2077-10-01T04:02:42.435Z',
                night: '2077-10-01T19:20:37.088Z',
                goldenHourEnd: '2077-10-01T06:30:15.335Z',
                goldenHour: '2077-10-01T16:53:04.189Z'
            },
            getMoonPosition: {
                azimuth: 2.48511103933621,
                altitude: -0.6798177029704049,
                distance: 364242.3685103479,
                parallacticAngle: 0.4145468797131149
            },
            getMoonIllumination: {
                fraction: 0.9935356126285149,
                phase: 0.4743797811681988,
                angle: -2.484347945354424
            },
            getMoonTimesUTC: {
                rise: '2077-10-01T17:42:01.439Z',
                set: '2077-10-01T04:43:04.149Z'
            },
            getMoonTimesNonUTC: {
                rise: '2077-10-01T17:42:01.439Z',
                set: '2077-10-01T04:43:04.149Z'
            }
        }
    },
    {
        input: {
            date: '2077-10-01T09:23:40.781Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -0.7248696913798818,
                altitude: 0.47982576063876103
            },
            getTimes: {
                solarNoon: '2077-10-01T11:50:34.836Z',
                nadir: '2077-09-30T23:50:34.836Z',
                sunrise: '2077-10-01T05:58:14.674Z',
                sunset: '2077-10-01T17:42:54.999Z',
                sunriseEnd: '2077-10-01T06:01:40.599Z',
                sunsetStart: '2077-10-01T17:39:29.074Z',
                dawn: '2077-10-01T05:25:01.550Z',
                dusk: '2077-10-01T18:16:08.123Z',
                nauticalDawn: '2077-10-01T04:46:09.376Z',
                nauticalDusk: '2077-10-01T18:55:00.297Z',
                nightEnd: '2077-10-01T04:06:13.087Z',
                night: '2077-10-01T19:34:56.586Z',
                goldenHourEnd: '2077-10-01T06:42:35.775Z',
                goldenHour: '2077-10-01T16:58:33.898Z'
            },
            getMoonPosition: {
                azimuth: 2.4622848305558866,
                altitude: -0.6280711268739387,
                distance: 364242.3685103479,
                parallacticAngle: 0.4030473051465375
            },
            getMoonIllumination: {
                fraction: 0.9935356126285149,
                phase: 0.4743797811681988,
                angle: -2.484347945354424
            },
            getMoonTimesUTC: {
                rise: '2077-10-01T17:51:37.654Z',
                set: '2077-10-01T04:50:10.291Z'
            },
            getMoonTimesNonUTC: {
                rise: '2077-10-01T17:51:37.654Z',
                set: '2077-10-01T04:50:10.291Z'
            }
        }
    },
    {
        input: {
            date: '2077-10-01T09:23:40.781Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 0.8349502530360853,
                altitude: 0.5994404559818007
            },
            getTimes: {
                solarNoon: '2077-10-01T06:55:07.788Z',
                nadir: '2077-09-30T18:55:07.788Z',
                sunrise: '2077-10-01T00:59:03.729Z',
                sunset: '2077-10-01T12:51:11.848Z',
                sunriseEnd: '2077-10-01T01:01:52.733Z',
                sunsetStart: '2077-10-01T12:48:22.844Z',
                dawn: '2077-10-01T00:31:47.266Z',
                dusk: '2077-10-01T13:18:28.311Z',
                nauticalDawn: '2077-10-01T00:00:01.834Z',
                nauticalDusk: '2077-10-01T13:50:13.743Z',
                nightEnd: '2077-09-30T23:27:54.637Z',
                night: '2077-10-01T14:22:20.940Z',
                goldenHourEnd: '2077-10-01T01:35:19.421Z',
                goldenHour: '2077-10-01T12:14:56.155Z'
            },
            getMoonPosition: {
                azimuth: -2.114968481091939,
                altitude: -0.632828097024653,
                distance: 364242.3685103479,
                parallacticAngle: -0.7081050819441375
            },
            getMoonIllumination: {
                fraction: 0.9935356126285149,
                phase: 0.4743797811681988,
                angle: -2.484347945354424
            },
            getMoonTimesUTC: {
                rise: '2077-10-01T12:47:39.330Z'
            },
            getMoonTimesNonUTC: {
                rise: '2077-10-01T12:47:39.330Z',
                set: '2077-09-30T23:48:06.639Z'
            }
        }
    },
    {
        input: {
            date: '2077-10-01T09:23:40.781Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.666334950682524,
                altitude: -0.22083010275549644
            },
            getTimes: {
                solarNoon: '2077-10-01T02:32:35.489Z',
                nadir: '2077-09-30T14:32:35.489Z',
                sunrise: '2077-09-30T20:35:03.142Z',
                sunset: '2077-10-01T08:30:07.835Z',
                sunriseEnd: '2077-09-30T20:37:40.804Z',
                sunsetStart: '2077-10-01T08:27:30.173Z',
                dawn: '2077-09-30T20:09:36.249Z',
                dusk: '2077-10-01T08:55:34.728Z',
                nauticalDawn: '2077-09-30T19:40:00.522Z',
                nauticalDusk: '2077-10-01T09:25:10.455Z',
                nightEnd: '2077-09-30T19:10:11.577Z',
                night: '2077-10-01T09:54:59.400Z',
                goldenHourEnd: '2077-09-30T21:08:50.651Z',
                goldenHour: '2077-10-01T07:56:20.326Z'
            },
            getMoonPosition: {
                azimuth: -1.3098426772736207,
                altitude: 0.22383569692175792,
                distance: 364242.3685103479,
                parallacticAngle: -0.9061644591693611
            },
            getMoonIllumination: {
                fraction: 0.9935356126285149,
                phase: 0.4743797811681988,
                angle: -2.484347945354424
            },
            getMoonTimesUTC: {
                rise: '2077-10-01T08:17:18.367Z',
                set: '2077-10-01T20:26:35.982Z'
            },
            getMoonTimesNonUTC: {
                rise: '2077-10-01T08:17:18.367Z',
                set: '2077-10-01T20:26:35.982Z'
            }
        }
    },
    {
        input: {
            date: '2079-02-27T09:33:13.000Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -0.7121835494052867,
                altitude: 0.4156463044510205
            },
            getTimes: {
                solarNoon: '2079-02-27T12:04:59.190Z',
                nadir: '2079-02-27T00:04:59.190Z',
                sunrise: '2079-02-27T06:37:54.849Z',
                sunset: '2079-02-27T17:32:03.531Z',
                sunriseEnd: '2079-02-27T06:41:13.738Z',
                sunsetStart: '2079-02-27T17:28:44.642Z',
                dawn: '2079-02-27T06:06:06.423Z',
                dusk: '2079-02-27T18:03:51.957Z',
                nauticalDawn: '2079-02-27T05:29:34.634Z',
                nauticalDusk: '2079-02-27T18:40:23.746Z',
                nightEnd: '2079-02-27T04:52:58.507Z',
                night: '2079-02-27T19:16:59.873Z',
                goldenHourEnd: '2079-02-27T07:21:09.387Z',
                goldenHour: '2079-02-27T16:48:48.993Z'
            },
            getMoonPosition: {
                azimuth: 0.1844520172618754,
                altitude: 0.23267084102578212,
                distance: 398795.9050834821,
                parallacticAngle: 0.13609661424300257
            },
            getMoonIllumination: {
                fraction: 0.17652946382083756,
                phase: 0.8619760191533841,
                angle: 1.3555208517171746
            },
            getMoonTimesUTC: {
                rise: '2079-02-27T05:00:11.304Z',
                set: '2079-02-27T12:32:36.701Z'
            },
            getMoonTimesNonUTC: {
                rise: '2079-02-27T05:00:11.550Z',
                set: '2079-02-27T12:32:30.651Z'
            }
        }
    },
    {
        input: {
            date: '2079-02-27T09:33:13.000Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -0.7371536366071286,
                altitude: 0.3644975993431926
            },
            getTimes: {
                solarNoon: '2079-02-27T12:13:54.327Z',
                nadir: '2079-02-27T00:13:54.327Z',
                sunrise: '2079-02-27T06:50:24.010Z',
                sunset: '2079-02-27T17:37:24.644Z',
                sunriseEnd: '2079-02-27T06:53:54.785Z',
                sunsetStart: '2079-02-27T17:33:53.869Z',
                dawn: '2079-02-27T06:16:44.649Z',
                dusk: '2079-02-27T18:11:04.005Z',
                nauticalDawn: '2079-02-27T05:38:08.036Z',
                nauticalDusk: '2079-02-27T18:49:40.617Z',
                nightEnd: '2079-02-27T04:59:22.795Z',
                night: '2079-02-27T19:28:25.859Z',
                goldenHourEnd: '2079-02-27T07:36:22.125Z',
                goldenHour: '2079-02-27T16:51:26.529Z'
            },
            getMoonPosition: {
                azimuth: 0.14765595331642317,
                altitude: 0.1914286356272594,
                distance: 398795.9050834821,
                parallacticAngle: 0.10314115233976606
            },
            getMoonIllumination: {
                fraction: 0.17652946382083756,
                phase: 0.8619760191533841,
                angle: 1.3555208517171746
            },
            getMoonTimesUTC: {
                rise: '2079-02-27T05:27:40.901Z',
                set: '2079-02-27T12:24:39.199Z'
            },
            getMoonTimesNonUTC: {
                rise: '2079-02-27T05:27:46.113Z',
                set: '2079-02-27T12:24:41.974Z'
            }
        }
    },
    {
        input: {
            date: '2079-02-27T09:33:13.000Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 0.712714481084053,
                altitude: 0.5457715754796483
            },
            getTimes: {
                solarNoon: '2079-02-27T07:18:25.202Z',
                nadir: '2079-02-26T19:18:25.202Z',
                sunrise: '2079-02-27T01:42:33.464Z',
                sunset: '2079-02-27T12:54:16.939Z',
                sunriseEnd: '2079-02-27T01:45:25.259Z',
                sunsetStart: '2079-02-27T12:51:25.145Z',
                dawn: '2079-02-27T01:14:59.654Z',
                dusk: '2079-02-27T13:21:50.750Z',
                nauticalDawn: '2079-02-27T00:43:15.671Z',
                nauticalDusk: '2079-02-27T13:53:34.733Z',
                nightEnd: '2079-02-27T00:11:34.588Z',
                night: '2079-02-27T14:25:15.816Z',
                goldenHourEnd: '2079-02-27T02:19:40.381Z',
                goldenHour: '2079-02-27T12:17:10.022Z'
            },
            getMoonPosition: {
                azimuth: 1.1318184980582606,
                altitude: -0.21180096113385166,
                distance: 398795.9050834821,
                parallacticAngle: 0.8809820121713436
            },
            getMoonIllumination: {
                fraction: 0.17652946382083756,
                phase: 0.8619760191533841,
                angle: 1.3555208517171746
            },
            getMoonTimesUTC: {
                set: '2079-02-27T08:13:36.234Z'
            },
            getMoonTimesNonUTC: {
                rise: '2079-02-26T23:24:52.087Z',
                set: '2079-02-27T08:13:42.608Z'
            }
        }
    },
    {
        input: {
            date: '2079-02-27T09:33:13.000Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.5479021746924548,
                altitude: -0.2310499342983524
            },
            getTimes: {
                solarNoon: '2079-02-27T02:55:51.023Z',
                nadir: '2079-02-26T14:55:51.023Z',
                sunrise: '2079-02-26T21:15:32.997Z',
                sunset: '2079-02-27T08:36:09.049Z',
                sunriseEnd: '2079-02-26T21:18:13.000Z',
                sunsetStart: '2079-02-27T08:33:29.046Z',
                dawn: '2079-02-26T20:49:50.590Z',
                dusk: '2079-02-27T09:01:51.456Z',
                nauticalDawn: '2079-02-26T20:20:12.845Z',
                nauticalDusk: '2079-02-27T09:31:29.202Z',
                nightEnd: '2079-02-26T19:50:39.875Z',
                night: '2079-02-27T10:01:02.171Z',
                goldenHourEnd: '2079-02-26T21:50:01.811Z',
                goldenHour: '2079-02-27T08:01:40.235Z'
            },
            getMoonPosition: {
                azimuth: 1.7279838922748851,
                altitude: -1.078134485238775,
                distance: 398795.9050834821,
                parallacticAngle: 1.124429774763331
            },
            getMoonIllumination: {
                fraction: 0.17652946382083756,
                phase: 0.8619760191533841,
                angle: 1.3555208517171746
            },
            getMoonTimesUTC: {
                rise: '2079-02-27T19:20:29.291Z',
                set: '2079-02-27T04:00:24.412Z'
            },
            getMoonTimesNonUTC: {
                rise: '2079-02-27T19:20:40.367Z',
                set: '2079-02-27T04:00:25.282Z'
            }
        }
    },
    {
        input: {
            date: '2080-01-12T14:04:56.046Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 0.531136662669238,
                altitude: 0.24058219486449414
            },
            getTimes: {
                solarNoon: '2080-01-12T11:59:30.191Z',
                nadir: '2080-01-11T23:59:30.191Z',
                sunrise: '2080-01-12T07:40:01.816Z',
                sunset: '2080-01-12T16:18:58.567Z',
                sunriseEnd: '2080-01-12T07:43:54.029Z',
                sunsetStart: '2080-01-12T16:15:06.354Z',
                dawn: '2080-01-12T07:03:55.932Z',
                dusk: '2080-01-12T16:55:04.451Z',
                nauticalDawn: '2080-01-12T06:24:23.113Z',
                nauticalDusk: '2080-01-12T17:34:37.270Z',
                nightEnd: '2080-01-12T05:46:27.462Z',
                night: '2080-01-12T18:12:32.921Z',
                goldenHourEnd: '2080-01-12T08:32:40.314Z',
                goldenHour: '2080-01-12T15:26:20.069Z'
            },
            getMoonPosition: {
                azimuth: 2.2886641751426544,
                altitude: -0.5221457108699528,
                distance: 380978.7984314168,
                parallacticAngle: 0.5185847397788442
            },
            getMoonIllumination: {
                fraction: 0.6392176911507202,
                phase: 0.7050920955247417,
                angle: 1.970210750092955
            },
            getMoonTimesUTC: {
                rise: '2080-01-12T23:15:00.301Z',
                set: '2080-01-12T10:44:38.917Z'
            },
            getMoonTimesNonUTC: {
                set: '2080-01-12T10:44:27.582Z'
            }
        }
    },
    {
        input: {
            date: '2080-01-12T14:04:56.046Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 0.49100974519544033,
                altitude: 0.21243515645915312
            },
            getTimes: {
                solarNoon: '2080-01-12T12:08:25.538Z',
                nadir: '2080-01-12T00:08:25.538Z',
                sunrise: '2080-01-12T08:00:02.135Z',
                sunset: '2080-01-12T16:16:48.942Z',
                sunriseEnd: '2080-01-12T08:04:13.817Z',
                sunsetStart: '2080-01-12T16:12:37.260Z',
                dawn: '2080-01-12T07:21:13.057Z',
                dusk: '2080-01-12T16:55:38.019Z',
                nauticalDawn: '2080-01-12T06:39:07.829Z',
                nauticalDusk: '2080-01-12T17:37:43.247Z',
                nightEnd: '2080-01-12T05:59:00.235Z',
                night: '2080-01-12T18:17:50.841Z',
                goldenHourEnd: '2080-01-12T08:57:57.050Z',
                goldenHour: '2080-01-12T15:18:54.026Z'
            },
            getMoonPosition: {
                azimuth: 2.269246662186885,
                altitude: -0.47313072109677334,
                distance: 380978.7984314168,
                parallacticAngle: 0.4969657747693202
            },
            getMoonIllumination: {
                fraction: 0.6392176911507202,
                phase: 0.7050920955247417,
                angle: 1.970210750092955
            },
            getMoonTimesUTC: {
                rise: '2080-01-12T23:26:01.142Z',
                set: '2080-01-12T10:54:14.472Z'
            },
            getMoonTimesNonUTC: {
                set: '2080-01-12T10:54:08.466Z'
            }
        }
    },
    {
        input: {
            date: '2080-01-12T14:04:56.046Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.4181074726701024,
                altitude: -0.4207234689492903
            },
            getTimes: {
                solarNoon: '2080-01-12T07:12:49.472Z',
                nadir: '2080-01-11T19:12:49.472Z',
                sunrise: '2080-01-12T02:26:30.025Z',
                sunset: '2080-01-12T11:59:08.918Z',
                sunriseEnd: '2080-01-12T02:29:42.101Z',
                sunsetStart: '2080-01-12T11:55:56.842Z',
                dawn: '2080-01-12T01:56:11.474Z',
                dusk: '2080-01-12T12:29:27.469Z',
                nauticalDawn: '2080-01-12T01:22:17.356Z',
                nauticalDusk: '2080-01-12T13:03:21.587Z',
                nightEnd: '2080-01-12T00:49:21.747Z',
                night: '2080-01-12T13:36:17.196Z',
                goldenHourEnd: '2080-01-12T03:08:56.430Z',
                goldenHour: '2080-01-12T11:16:42.514Z'
            },
            getMoonPosition: {
                azimuth: -2.38928742494612,
                altitude: -0.7042204571118924,
                distance: 380978.7984314168,
                parallacticAngle: -0.5444980279327235
            },
            getMoonIllumination: {
                fraction: 0.6392176911507202,
                phase: 0.7050920955247417,
                angle: 1.970210750092955
            },
            getMoonTimesUTC: {
                rise: '2080-01-12T18:11:43.247Z',
                set: '2080-01-12T05:52:58.163Z'
            },
            getMoonTimesNonUTC: {
                rise: '2080-01-12T18:11:33.537Z',
                set: '2080-01-12T05:53:05.617Z'
            }
        }
    },
    {
        input: {
            date: '2080-01-12T14:04:56.046Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.4983896282640856,
                altitude: -1.2792017766343615
            },
            getTimes: {
                solarNoon: '2080-01-12T02:50:09.129Z',
                nadir: '2080-01-11T14:50:09.129Z',
                sunrise: '2080-01-11T21:50:41.404Z',
                sunset: '2080-01-12T07:49:36.854Z',
                sunriseEnd: '2080-01-11T21:53:37.483Z',
                sunsetStart: '2080-01-12T07:46:40.775Z',
                dawn: '2080-01-11T21:22:44.948Z',
                dusk: '2080-01-12T08:17:33.310Z',
                nauticalDawn: '2080-01-11T20:51:14.318Z',
                nauticalDusk: '2080-01-12T08:49:03.940Z',
                nightEnd: '2080-01-11T20:20:28.032Z',
                night: '2080-01-12T09:19:50.225Z',
                goldenHourEnd: '2080-01-11T22:29:15.429Z',
                goldenHour: '2080-01-12T07:11:02.829Z'
            },
            getMoonPosition: {
                azimuth: -1.495265295277981,
                altitude: 0.09429505055684044,
                distance: 380978.7984314168,
                parallacticAngle: -0.9443173209118382
            },
            getMoonIllumination: {
                fraction: 0.6392176911507202,
                phase: 0.7050920955247417,
                angle: 1.970210750092955
            },
            getMoonTimesUTC: {
                rise: '2080-01-12T13:36:58.555Z',
                set: '2080-01-12T01:23:44.073Z'
            },
            getMoonTimesNonUTC: {
                rise: '2080-01-12T13:37:05.831Z',
                set: '2080-01-12T01:23:53.455Z'
            }
        }
    },
    {
        input: {
            date: '2080-01-29T20:53:35.349Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.9555853341102976,
                altitude: -0.720769303269761
            },
            getTimes: {
                solarNoon: '2080-01-29T12:04:41.607Z',
                nadir: '2080-01-29T00:04:41.607Z',
                sunrise: '2080-01-29T07:25:13.757Z',
                sunset: '2080-01-29T16:44:09.457Z',
                sunriseEnd: '2080-01-29T07:28:52.380Z',
                sunsetStart: '2080-01-29T16:40:30.833Z',
                dawn: '2080-01-29T06:50:54.379Z',
                dusk: '2080-01-29T17:18:28.835Z',
                nauticalDawn: '2080-01-29T06:12:43.220Z',
                nauticalDusk: '2080-01-29T17:56:39.994Z',
                nightEnd: '2080-01-29T05:35:37.487Z',
                night: '2080-01-29T18:33:45.726Z',
                goldenHourEnd: '2080-01-29T08:14:00.596Z',
                goldenHour: '2080-01-29T15:55:22.618Z'
            },
            getMoonPosition: {
                azimuth: 1.156215210098889,
                altitude: 0.7286035697018389,
                distance: 373094.37147568533,
                parallacticAngle: 0.6842245801094742
            },
            getMoonIllumination: {
                fraction: 0.5254208607851516,
                phase: 0.2580952013823873,
                angle: -1.8878225788947243
            },
            getMoonTimesUTC: {
                rise: '2080-01-29T10:14:13.927Z',
                set: '2080-01-29T00:09:51.741Z'
            },
            getMoonTimesNonUTC: {
                rise: '2080-01-29T10:14:02.401Z',
                set: '2080-01-29T00:10:02.144Z'
            }
        }
    },
    {
        input: {
            date: '2080-01-29T20:53:35.349Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.9539717682685533,
                altitude: -0.680325169439495
            },
            getTimes: {
                solarNoon: '2080-01-29T12:13:36.882Z',
                nadir: '2080-01-29T00:13:36.882Z',
                sunrise: '2080-01-29T07:42:49.498Z',
                sunset: '2080-01-29T16:44:24.267Z',
                sunriseEnd: '2080-01-29T07:46:44.154Z',
                sunsetStart: '2080-01-29T16:40:29.611Z',
                dawn: '2080-01-29T07:06:10.724Z',
                dusk: '2080-01-29T17:21:03.041Z',
                nauticalDawn: '2080-01-29T06:25:41.339Z',
                nauticalDusk: '2080-01-29T18:01:32.426Z',
                nightEnd: '2080-01-29T05:46:29.550Z',
                night: '2080-01-29T18:40:44.215Z',
                goldenHourEnd: '2080-01-29T08:35:40.789Z',
                goldenHour: '2080-01-29T15:51:32.976Z'
            },
            getMoonPosition: {
                azimuth: 1.0793857484086793,
                altitude: 0.7307778904622856,
                distance: 373094.37147568533,
                parallacticAngle: 0.6138191157177924
            },
            getMoonIllumination: {
                fraction: 0.5254208607851516,
                phase: 0.2580952013823873,
                angle: -1.8878225788947243
            },
            getMoonTimesUTC: {
                rise: '2080-01-29T10:15:38.628Z',
                set: '2080-01-29T00:25:42.027Z'
            },
            getMoonTimesNonUTC: {
                rise: '2080-01-29T10:15:26.859Z',
                set: '2080-01-29T00:25:40.257Z'
            }
        }
    },
    {
        input: {
            date: '2080-01-29T20:53:35.349Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.2641519305892444,
                altitude: -1.032170322472861
            },
            getTimes: {
                solarNoon: '2080-01-30T07:18:15.140Z',
                nadir: '2080-01-29T19:18:15.140Z',
                sunrise: '2080-01-30T02:16:31.205Z',
                sunset: '2080-01-30T12:19:59.075Z',
                sunriseEnd: '2080-01-30T02:19:34.869Z',
                sunsetStart: '2080-01-30T12:16:55.411Z',
                dawn: '2080-01-30T01:47:22.231Z',
                dusk: '2080-01-30T12:49:08.049Z',
                nauticalDawn: '2080-01-30T01:14:27.167Z',
                nauticalDusk: '2080-01-30T13:22:03.113Z',
                nightEnd: '2080-01-30T00:42:12.608Z',
                night: '2080-01-30T13:54:17.672Z',
                goldenHourEnd: '2080-01-30T02:56:46.074Z',
                goldenHour: '2080-01-30T11:39:44.205Z'
            },
            getMoonPosition: {
                azimuth: 2.1190490739924757,
                altitude: -0.12704470996964917,
                distance: 373094.37147568533,
                parallacticAngle: 0.7462832495094587
            },
            getMoonIllumination: {
                fraction: 0.5254208607851516,
                phase: 0.2580952013823873,
                angle: -1.8878225788947243
            },
            getMoonTimesUTC: {
                rise: '2080-01-29T05:41:42.710Z',
                set: '2080-01-29T20:06:29.899Z'
            },
            getMoonTimesNonUTC: {
                rise: '2080-01-29T05:41:43.597Z',
                set: '2080-01-29T20:06:38.508Z'
            }
        }
    },
    {
        input: {
            date: '2080-01-29T20:53:35.349Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.3089365404416766,
                altitude: -0.18012494181414201
            },
            getTimes: {
                solarNoon: '2080-01-30T02:55:37.014Z',
                nadir: '2080-01-29T14:55:37.014Z',
                sunrise: '2080-01-29T21:43:33.394Z',
                sunset: '2080-01-30T08:07:40.634Z',
                sunriseEnd: '2080-01-29T21:46:22.927Z',
                sunsetStart: '2080-01-30T08:04:51.101Z',
                dawn: '2080-01-29T21:16:32.486Z',
                dusk: '2080-01-30T08:34:41.542Z',
                nauticalDawn: '2080-01-29T20:45:51.565Z',
                nauticalDusk: '2080-01-30T09:05:22.463Z',
                nightEnd: '2080-01-29T20:15:42.367Z',
                night: '2080-01-30T09:35:31.660Z',
                goldenHourEnd: '2080-01-29T22:20:28.595Z',
                goldenHour: '2080-01-30T07:30:45.432Z'
            },
            getMoonPosition: {
                azimuth: -3.077419940503453,
                altitude: -0.6301691766286875,
                distance: 373094.37147568533,
                parallacticAngle: -0.054701073501808306
            },
            getMoonIllumination: {
                fraction: 0.5254208607851516,
                phase: 0.2580952013823873,
                angle: -1.8878225788947243
            },
            getMoonTimesUTC: {
                rise: '2080-01-29T01:21:54.343Z',
                set: '2080-01-29T15:19:14.695Z'
            },
            getMoonTimesNonUTC: {
                rise: '2080-01-29T01:22:08.795Z',
                set: '2080-01-29T15:19:16.761Z'
            }
        }
    },
    {
        input: {
            date: '2081-07-23T21:23:57.441Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.50732752379855,
                altitude: -0.23123254366501358
            },
            getTimes: {
                solarNoon: '2081-07-23T11:58:11.197Z',
                nadir: '2081-07-22T23:58:11.197Z',
                sunrise: '2081-07-23T04:10:18.774Z',
                sunset: '2081-07-23T19:46:03.619Z',
                sunriseEnd: '2081-07-23T04:14:10.121Z',
                sunsetStart: '2081-07-23T19:42:12.272Z',
                dawn: '2081-07-23T03:30:57.379Z',
                dusk: '2081-07-23T20:25:25.014Z',
                nauticalDawn: '2081-07-23T02:38:05.021Z',
                nauticalDusk: '2081-07-23T21:18:17.372Z',
                nightEnd: '2081-07-23T01:24:36.399Z',
                night: '2081-07-23T22:31:45.994Z',
                goldenHourEnd: '2081-07-23T04:57:44.498Z',
                goldenHour: '2081-07-23T18:58:37.895Z'
            },
            getMoonPosition: {
                azimuth: -1.2347363091402292,
                altitude: 0.052741800699351735,
                distance: 405757.0462127533,
                parallacticAngle: -0.68356162790791
            },
            getMoonIllumination: {
                fraction: 0.9071041147640679,
                phase: 0.5985856986469837,
                angle: 1.2196978026941108
            },
            getMoonTimesUTC: {
                rise: '2081-07-23T21:03:55.132Z',
                set: '2081-07-23T06:51:51.277Z'
            },
            getMoonTimesNonUTC: {
                rise: '2081-07-23T21:03:55.132Z',
                set: '2081-07-23T06:51:51.277Z'
            }
        }
    },
    {
        input: {
            date: '2081-07-23T21:23:57.441Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.4791045447959545,
                altitude: -0.1793192106405385
            },
            getTimes: {
                solarNoon: '2081-07-23T12:07:06.412Z',
                nadir: '2081-07-23T00:07:06.412Z',
                sunrise: '2081-07-23T04:07:56.950Z',
                sunset: '2081-07-23T20:06:15.874Z',
                sunriseEnd: '2081-07-23T04:12:07.855Z',
                sunsetStart: '2081-07-23T20:02:04.969Z',
                dawn: '2081-07-23T03:24:42.823Z',
                dusk: '2081-07-23T20:49:30.001Z',
                nauticalDawn: '2081-07-23T02:23:44.300Z',
                nauticalDusk: '2081-07-23T21:50:28.524Z',
                nightEnd: null,
                night: null,
                goldenHourEnd: '2081-07-23T04:58:57.242Z',
                goldenHour: '2081-07-23T19:15:15.581Z'
            },
            getMoonPosition: {
                azimuth: -1.2635766553398944,
                altitude: 0.0174124720438868,
                distance: 405757.0462127533,
                parallacticAngle: -0.6475562892488264
            },
            getMoonIllumination: {
                fraction: 0.9071041147640679,
                phase: 0.5985856986469837,
                angle: 1.2196978026941108
            },
            getMoonTimesUTC: {
                rise: '2081-07-23T21:18:08.589Z',
                set: '2081-07-23T06:54:35.821Z'
            },
            getMoonTimesNonUTC: {
                rise: '2081-07-23T21:18:08.589Z',
                set: '2081-07-23T06:54:35.821Z'
            }
        }
    },
    {
        input: {
            date: '2081-07-23T21:23:57.441Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.5456480787062357,
                altitude: -0.37677671390299416
            },
            getTimes: {
                solarNoon: '2081-07-24T07:11:36.996Z',
                nadir: '2081-07-23T19:11:36.996Z',
                sunrise: '2081-07-23T23:51:36.471Z',
                sunset: '2081-07-24T14:31:37.522Z',
                sunriseEnd: '2081-07-23T23:54:47.084Z',
                sunsetStart: '2081-07-24T14:28:26.908Z',
                dawn: '2081-07-23T23:19:54.541Z',
                dusk: '2081-07-24T15:03:19.451Z',
                nauticalDawn: '2081-07-23T22:40:17.432Z',
                nauticalDusk: '2081-07-24T15:42:56.561Z',
                nightEnd: '2081-07-23T21:55:29.861Z',
                night: '2081-07-24T16:27:44.132Z',
                goldenHourEnd: '2081-07-24T00:31:20.109Z',
                goldenHour: '2081-07-24T13:51:53.883Z'
            },
            getMoonPosition: {
                azimuth: -0.03998345189371682,
                altitude: 0.6789971012538654,
                distance: 405757.0462127533,
                parallacticAngle: -0.03080918325531642
            },
            getMoonIllumination: {
                fraction: 0.9071041147640679,
                phase: 0.5985856986469837,
                angle: 1.2196978026941108
            },
            getMoonTimesUTC: {
                rise: '2081-07-23T16:01:14.964Z',
                set: '2081-07-23T02:09:00.428Z'
            },
            getMoonTimesNonUTC: {
                rise: '2081-07-23T16:01:14.964Z',
                set: '2081-07-23T02:09:00.428Z'
            }
        }
    },
    {
        input: {
            date: '2081-07-23T21:23:57.441Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.772448187832959,
                altitude: 0.33097765220549596
            },
            getTimes: {
                solarNoon: '2081-07-24T02:49:00.617Z',
                nadir: '2081-07-23T14:49:00.617Z',
                sunrise: '2081-07-23T19:41:52.825Z',
                sunset: '2081-07-24T09:56:08.409Z',
                sunriseEnd: '2081-07-23T19:44:47.535Z',
                sunsetStart: '2081-07-24T09:53:13.698Z',
                dawn: '2081-07-23T19:13:02.616Z',
                dusk: '2081-07-24T10:24:58.617Z',
                nauticalDawn: '2081-07-23T18:37:44.999Z',
                nauticalDusk: '2081-07-24T11:00:16.234Z',
                nightEnd: '2081-07-23T17:59:26.794Z',
                night: '2081-07-24T11:38:34.439Z',
                goldenHourEnd: '2081-07-23T20:18:30.565Z',
                goldenHour: '2081-07-24T09:19:30.668Z'
            },
            getMoonPosition: {
                azimuth: 1.146073574633973,
                altitude: 0.25098942026384835,
                distance: 405757.0462127533,
                parallacticAngle: 0.8518887511286101
            },
            getMoonIllumination: {
                fraction: 0.9071041147640679,
                phase: 0.5985856986469837,
                angle: 1.2196978026941108
            },
            getMoonTimesUTC: {
                rise: '2081-07-23T11:28:12.645Z',
                set: '2081-07-23T22:42:45.164Z'
            },
            getMoonTimesNonUTC: {
                rise: '2081-07-23T11:28:12.645Z'
            }
        }
    },
    {
        input: {
            date: '2081-10-26T20:51:21.331Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.1545411719145453,
                altitude: -0.7090087932777116
            },
            getTimes: {
                solarNoon: '2081-10-26T11:35:47.939Z',
                nadir: '2081-10-25T23:35:47.939Z',
                sunrise: '2081-10-26T06:25:58.798Z',
                sunset: '2081-10-26T16:45:37.079Z',
                sunriseEnd: '2081-10-26T06:29:22.937Z',
                sunsetStart: '2081-10-26T16:42:12.940Z',
                dawn: '2081-10-26T05:53:31.968Z',
                dusk: '2081-10-26T17:18:03.909Z',
                nauticalDawn: '2081-10-26T05:16:40.678Z',
                nauticalDusk: '2081-10-26T17:54:55.199Z',
                nightEnd: '2081-10-26T04:40:10.544Z',
                night: '2081-10-26T18:31:25.334Z',
                goldenHourEnd: '2081-10-26T07:10:43.366Z',
                goldenHour: '2081-10-26T16:00:52.512Z'
            },
            getMoonPosition: {
                azimuth: -2.710934082172666,
                altitude: -0.3919109996034201,
                distance: 366206.15524703066,
                parallacticAngle: -0.28824584454609536
            },
            getMoonIllumination: {
                fraction: 0.32089372248174647,
                phase: 0.8083068428312221,
                angle: 1.9190940376920094
            },
            getMoonTimesUTC: {
                set: '2081-10-26T14:24:07.395Z'
            },
            getMoonTimesNonUTC: {
                rise: '2081-10-25T22:50:04.249Z',
                set: '2081-10-26T14:24:07.395Z'
            }
        }
    },
    {
        input: {
            date: '2081-10-26T20:51:21.331Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.1451599978695786,
                altitude: -0.6628336990616106
            },
            getTimes: {
                solarNoon: '2081-10-26T11:44:43.102Z',
                nadir: '2081-10-25T23:44:43.102Z',
                sunrise: '2081-10-26T06:40:16.073Z',
                sunset: '2081-10-26T16:49:10.130Z',
                sunriseEnd: '2081-10-26T06:43:53.117Z',
                sunsetStart: '2081-10-26T16:45:33.086Z',
                dawn: '2081-10-26T06:05:51.656Z',
                dusk: '2081-10-26T17:23:34.547Z',
                nauticalDawn: '2081-10-26T05:26:53.833Z',
                nauticalDusk: '2081-10-26T18:02:32.370Z',
                nightEnd: '2081-10-26T04:48:18.863Z',
                night: '2081-10-26T18:41:07.340Z',
                goldenHourEnd: '2081-10-26T07:28:04.037Z',
                goldenHour: '2081-10-26T16:01:22.166Z'
            },
            getMoonPosition: {
                azimuth: -2.7574932365910585,
                altitude: -0.3593226200399,
                distance: 366206.15524703066,
                parallacticAngle: -0.24379942066678584
            },
            getMoonIllumination: {
                fraction: 0.32089372248174647,
                phase: 0.8083068428312221,
                angle: 1.9190940376920094
            },
            getMoonTimesUTC: {
                set: '2081-10-26T14:42:03.574Z'
            },
            getMoonTimesNonUTC: {
                rise: '2081-10-25T22:48:22.836Z',
                set: '2081-10-26T14:42:03.574Z'
            }
        }
    },
    {
        input: {
            date: '2081-10-26T20:51:21.331Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.2169129086532973,
                altitude: -0.8840132541608112
            },
            getTimes: {
                solarNoon: '2081-10-27T06:49:07.363Z',
                nadir: '2081-10-26T18:49:07.363Z',
                sunrise: '2081-10-27T01:26:51.226Z',
                sunset: '2081-10-27T12:11:23.500Z',
                sunriseEnd: '2081-10-27T01:29:46.657Z',
                sunsetStart: '2081-10-27T12:08:28.070Z',
                dawn: '2081-10-27T00:58:49.312Z',
                dusk: '2081-10-27T12:39:25.415Z',
                nauticalDawn: '2081-10-27T00:26:47.470Z',
                nauticalDusk: '2081-10-27T13:11:27.256Z',
                nightEnd: '2081-10-26T23:55:03.579Z',
                night: '2081-10-27T13:43:11.148Z',
                goldenHourEnd: '2081-10-27T02:04:57.033Z',
                goldenHour: '2081-10-27T11:33:17.694Z'
            },
            getMoonPosition: {
                azimuth: -1.7142126145399805,
                altitude: 0.23611960982162375,
                distance: 366206.15524703066,
                parallacticAngle: -0.888859929775282
            },
            getMoonIllumination: {
                fraction: 0.32089372248174647,
                phase: 0.8083068428312221,
                angle: 1.9190940376920094
            },
            getMoonTimesUTC: {
                rise: '2081-10-26T19:32:56.383Z',
                set: '2081-10-26T09:10:45.556Z'
            },
            getMoonTimesNonUTC: {
                rise: '2081-10-26T19:32:56.383Z',
                set: '2081-10-26T09:10:45.556Z'
            }
        }
    },
    {
        input: {
            date: '2081-10-26T20:51:21.331Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.3254325608185762,
                altitude: -0.03042431099559211
            },
            getTimes: {
                solarNoon: '2081-10-27T02:26:32.361Z',
                nadir: '2081-10-26T14:26:32.361Z',
                sunrise: '2081-10-26T20:57:08.857Z',
                sunset: '2081-10-27T07:55:55.865Z',
                sunriseEnd: '2081-10-26T20:59:51.702Z',
                sunsetStart: '2081-10-27T07:53:13.021Z',
                dawn: '2081-10-26T20:31:03.809Z',
                dusk: '2081-10-27T08:22:00.913Z',
                nauticalDawn: '2081-10-26T20:01:10.031Z',
                nauticalDusk: '2081-10-27T08:51:54.691Z',
                nightEnd: '2081-10-26T19:31:31.492Z',
                night: '2081-10-27T09:21:33.231Z',
                goldenHourEnd: '2081-10-26T21:32:22.332Z',
                goldenHour: '2081-10-27T07:20:42.390Z'
            },
            getMoonPosition: {
                azimuth: -0.7786552779633119,
                altitude: 1.0999292908072726,
                distance: 366206.15524703066,
                parallacticAngle: -0.6315792973239045
            },
            getMoonIllumination: {
                fraction: 0.32089372248174647,
                phase: 0.8083068428312221,
                angle: 1.9190940376920094
            },
            getMoonTimesUTC: {
                rise: '2081-10-26T15:05:57.842Z',
                set: '2081-10-26T04:30:25.849Z'
            },
            getMoonTimesNonUTC: {
                rise: '2081-10-26T15:05:57.842Z',
                set: '2081-10-26T04:30:25.849Z'
            }
        }
    },
    {
        input: {
            date: '2081-12-20T03:56:40.799Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.6395328780089948,
                altitude: -0.6148152508640778
            },
            getTimes: {
                solarNoon: '2081-12-20T11:49:13.821Z',
                nadir: '2081-12-19T23:49:13.821Z',
                sunrise: '2081-12-20T07:39:12.085Z',
                sunset: '2081-12-20T15:59:15.558Z',
                sunriseEnd: '2081-12-20T07:43:11.980Z',
                sunsetStart: '2081-12-20T15:55:15.663Z',
                dawn: '2081-12-20T07:02:06.464Z',
                dusk: '2081-12-20T16:36:21.179Z',
                nauticalDawn: '2081-12-20T06:21:47.591Z',
                nauticalDusk: '2081-12-20T17:16:40.052Z',
                nightEnd: '2081-12-20T05:43:22.214Z',
                night: '2081-12-20T17:55:05.428Z',
                goldenHourEnd: '2081-12-20T08:34:05.278Z',
                goldenHour: '2081-12-20T15:04:22.365Z'
            },
            getMoonPosition: {
                azimuth: 0.2715523552875296,
                altitude: 0.9985976183514202,
                distance: 368217.38128128776,
                parallacticAngle: 0.18546661113172982
            },
            getMoonIllumination: {
                fraction: 0.8170085139038998,
                phase: 0.6407024518706452,
                angle: 1.863940672539535
            },
            getMoonTimesUTC: {
                rise: '2081-12-20T20:55:42.478Z',
                set: '2081-12-20T10:51:02.571Z'
            },
            getMoonTimesNonUTC: {
                rise: '2081-12-20T20:55:51.400Z',
                set: '2081-12-20T10:50:53.399Z'
            }
        }
    },
    {
        input: {
            date: '2081-12-20T03:56:40.799Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.7044452776688133,
                altitude: -0.6349511702477385
            },
            getTimes: {
                solarNoon: '2081-12-20T11:58:09.200Z',
                nadir: '2081-12-19T23:58:09.200Z',
                sunrise: '2081-12-20T08:00:25.981Z',
                sunset: '2081-12-20T15:55:52.418Z',
                sunriseEnd: '2081-12-20T08:04:47.525Z',
                sunsetStart: '2081-12-20T15:51:30.874Z',
                dawn: '2081-12-20T07:20:22.427Z',
                dusk: '2081-12-20T16:35:55.972Z',
                nauticalDawn: '2081-12-20T06:37:22.429Z',
                nauticalDusk: '2081-12-20T17:18:55.970Z',
                nightEnd: '2081-12-20T05:56:41.028Z',
                night: '2081-12-20T17:59:37.371Z',
                goldenHourEnd: '2081-12-20T09:01:24.648Z',
                goldenHour: '2081-12-20T14:54:53.751Z'
            },
            getMoonPosition: {
                azimuth: 0.1898282605080418,
                altitude: 0.9592784338811648,
                distance: 368217.38128128776,
                parallacticAngle: 0.12303197819178681
            },
            getMoonIllumination: {
                fraction: 0.8170085139038998,
                phase: 0.6407024518706452,
                angle: 1.863940672539535
            },
            getMoonTimesUTC: {
                rise: '2081-12-20T20:58:22.400Z',
                set: '2081-12-20T11:07:33.036Z'
            },
            getMoonTimesNonUTC: {
                rise: '2081-12-20T20:58:26.788Z',
                set: '2081-12-20T11:07:21.937Z'
            }
        }
    },
    {
        input: {
            date: '2081-12-20T03:56:40.799Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -0.7402116355149213,
                altitude: 0.2284563900103
            },
            getTimes: {
                solarNoon: '2081-12-20T07:02:32.101Z',
                nadir: '2081-12-19T19:02:32.101Z',
                sunrise: '2081-12-20T02:22:47.914Z',
                sunset: '2081-12-20T11:42:16.289Z',
                sunriseEnd: '2081-12-20T02:26:04.196Z',
                sunsetStart: '2081-12-20T11:39:00.006Z',
                dawn: '2081-12-20T01:51:54.575Z',
                dusk: '2081-12-20T12:13:09.628Z',
                nauticalDawn: '2081-12-20T01:17:30.543Z',
                nauticalDusk: '2081-12-20T12:47:33.660Z',
                nightEnd: '2081-12-20T00:44:13.238Z',
                night: '2081-12-20T13:20:50.964Z',
                goldenHourEnd: '2081-12-20T03:06:20.593Z',
                goldenHour: '2081-12-20T10:58:43.610Z'
            },
            getMoonPosition: {
                azimuth: 1.692284059124461,
                altitude: 0.3162198874364641,
                distance: 368217.38128128776,
                parallacticAngle: 0.9045121642422443
            },
            getMoonIllumination: {
                fraction: 0.8170085139038998,
                phase: 0.6407024518706452,
                angle: 1.863940672539535
            },
            getMoonTimesUTC: {
                rise: '2081-12-20T16:10:21.665Z',
                set: '2081-12-20T05:38:51.012Z'
            },
            getMoonTimesNonUTC: {
                rise: '2081-12-20T16:10:11.953Z',
                set: '2081-12-20T05:39:04.193Z'
            }
        }
    },
    {
        input: {
            date: '2081-12-20T03:56:40.799Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 0.36212381723464765,
                altitude: 0.48824514820229536
            },
            getTimes: {
                solarNoon: '2081-12-20T02:39:50.864Z',
                nadir: '2081-12-19T14:39:50.864Z',
                sunrise: '2081-12-19T21:45:39.740Z',
                sunset: '2081-12-20T07:34:01.987Z',
                sunriseEnd: '2081-12-19T21:48:38.986Z',
                sunsetStart: '2081-12-20T07:31:02.741Z',
                dawn: '2081-12-19T21:17:16.352Z',
                dusk: '2081-12-20T08:02:25.375Z',
                nauticalDawn: '2081-12-19T20:45:21.305Z',
                nauticalDusk: '2081-12-20T08:34:20.422Z',
                nightEnd: '2081-12-19T20:14:16.189Z',
                night: '2081-12-20T09:05:25.538Z',
                goldenHourEnd: '2081-12-19T22:25:01.721Z',
                goldenHour: '2081-12-20T06:54:40.006Z'
            },
            getMoonPosition: {
                azimuth: 2.4879117108653195,
                altitude: -0.4876440296581174,
                distance: 368217.38128128776,
                parallacticAngle: 0.5423427176339849
            },
            getMoonIllumination: {
                fraction: 0.8170085139038998,
                phase: 0.6407024518706452,
                angle: 1.863940672539535
            },
            getMoonTimesUTC: {
                rise: '2081-12-20T11:43:53.902Z',
                set: '2081-12-20T01:00:26.188Z'
            },
            getMoonTimesNonUTC: {
                rise: '2081-12-20T11:43:53.379Z',
                set: '2081-12-20T01:00:25.306Z'
            }
        }
    },
    {
        input: {
            date: '2083-02-08T12:38:45.062Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 0.16596051115316268,
                altitude: 0.44302829541674577
            },
            getTimes: {
                solarNoon: '2083-02-08T12:06:04.480Z',
                nadir: '2083-02-08T00:06:04.480Z',
                sunrise: '2083-02-08T07:11:13.118Z',
                sunset: '2083-02-08T17:00:55.842Z',
                sunriseEnd: '2083-02-08T07:14:43.526Z',
                sunsetStart: '2083-02-08T16:57:25.434Z',
                dawn: '2083-02-08T06:37:58.051Z',
                dusk: '2083-02-08T17:34:10.909Z',
                nauticalDawn: '2083-02-08T06:00:34.335Z',
                nauticalDusk: '2083-02-08T18:11:34.625Z',
                nightEnd: '2083-02-08T05:23:53.333Z',
                night: '2083-02-08T18:48:15.627Z',
                goldenHourEnd: '2083-02-08T07:57:42.559Z',
                goldenHour: '2083-02-08T16:14:26.401Z'
            },
            getMoonPosition: {
                azimuth: 1.7623992475866084,
                altitude: -0.5619433662851188,
                distance: 364406.5305400061,
                parallacticAngle: 0.7442646142819503
            },
            getMoonIllumination: {
                fraction: 0.6266231731372355,
                phase: 0.7092508395911475,
                angle: 1.9469842687279606
            },
            getMoonTimesUTC: {
                set: '2083-02-08T09:12:22.050Z'
            },
            getMoonTimesNonUTC: {
                rise: '2083-02-07T23:17:00.581Z',
                set: '2083-02-08T09:12:14.726Z'
            }
        }
    },
    {
        input: {
            date: '2083-02-08T12:38:45.062Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 0.12200357260730359,
                altitude: 0.40083544025700235
            },
            getTimes: {
                solarNoon: '2083-02-08T12:14:59.704Z',
                nadir: '2083-02-08T00:14:59.704Z',
                sunrise: '2083-02-08T07:27:05.168Z',
                sunset: '2083-02-08T17:02:54.241Z',
                sunriseEnd: '2083-02-08T07:30:49.766Z',
                sunsetStart: '2083-02-08T16:59:09.643Z',
                dawn: '2083-02-08T06:51:43.624Z',
                dusk: '2083-02-08T17:38:15.784Z',
                nauticalDawn: '2083-02-08T06:12:09.041Z',
                nauticalDusk: '2083-02-08T18:17:50.368Z',
                nightEnd: '2083-02-08T05:33:23.854Z',
                night: '2083-02-08T18:56:35.555Z',
                goldenHourEnd: '2083-02-08T08:17:02.761Z',
                goldenHour: '2083-02-08T16:12:56.648Z'
            },
            getMoonPosition: {
                azimuth: 1.7576888841431073,
                altitude: -0.5287538993207647,
                distance: 364406.5305400061,
                parallacticAngle: 0.6963796853317461
            },
            getMoonIllumination: {
                fraction: 0.6266231731372355,
                phase: 0.7092508395911475,
                angle: 1.9469842687279606
            },
            getMoonTimesUTC: {
                set: '2083-02-08T09:13:05.112Z'
            },
            getMoonTimesNonUTC: {
                rise: '2083-02-07T23:34:08.255Z',
                set: '2083-02-08T09:12:56.812Z'
            }
        }
    },
    {
        input: {
            date: '2083-02-08T12:38:45.062Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.262456581325928,
                altitude: -0.051867084155209235
            },
            getTimes: {
                solarNoon: '2083-02-08T07:19:27.678Z',
                nadir: '2083-02-07T19:19:27.678Z',
                sunrise: '2083-02-08T02:07:30.263Z',
                sunset: '2083-02-08T12:31:25.093Z',
                sunriseEnd: '2083-02-08T02:10:29.411Z',
                sunsetStart: '2083-02-08T12:28:25.946Z',
                dawn: '2083-02-08T01:38:58.354Z',
                dusk: '2083-02-08T12:59:57.002Z',
                nauticalDawn: '2083-02-08T01:06:33.583Z',
                nauticalDusk: '2083-02-08T13:32:21.774Z',
                nightEnd: '2083-02-08T00:34:37.993Z',
                night: '2083-02-08T14:04:17.363Z',
                goldenHourEnd: '2083-02-08T02:46:34.610Z',
                goldenHour: '2083-02-08T11:52:20.746Z'
            },
            getMoonPosition: {
                azimuth: -2.6755152791260977,
                altitude: -1.1217179206310768,
                distance: 364406.5305400061,
                parallacticAngle: -0.3652925036238967
            },
            getMoonIllumination: {
                fraction: 0.6266231731372355,
                phase: 0.7092508395911475,
                angle: 1.9469842687279606
            },
            getMoonTimesUTC: {
                rise: '2083-02-08T19:14:00.834Z',
                set: '2083-02-08T04:40:23.130Z'
            },
            getMoonTimesNonUTC: {
                rise: '2083-02-08T19:14:10.673Z',
                set: '2083-02-08T04:40:11.132Z'
            }
        }
    },
    {
        input: {
            date: '2083-02-08T12:38:45.062Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.0118636382504658,
                altitude: -0.9355053159483904
            },
            getTimes: {
                solarNoon: '2083-02-08T02:56:50.915Z',
                nadir: '2083-02-07T14:56:50.915Z',
                sunrise: '2083-02-07T21:36:21.883Z',
                sunset: '2083-02-08T08:17:19.948Z',
                sunriseEnd: '2083-02-07T21:39:07.831Z',
                sunsetStart: '2083-02-08T08:14:33.999Z',
                dawn: '2083-02-07T21:09:51.136Z',
                dusk: '2083-02-08T08:43:50.695Z',
                nauticalDawn: '2083-02-07T20:39:36.328Z',
                nauticalDusk: '2083-02-08T09:14:05.502Z',
                nightEnd: '2083-02-07T20:09:45.176Z',
                night: '2083-02-08T09:43:56.654Z',
                goldenHourEnd: '2083-02-07T22:12:22.827Z',
                goldenHour: '2083-02-08T07:41:19.004Z'
            },
            getMoonPosition: {
                azimuth: -1.4405197193201205,
                altitude: -0.3455152837111002,
                distance: 364406.5305400061,
                parallacticAngle: -1.0060204540874014
            },
            getMoonIllumination: {
                fraction: 0.6266231731372355,
                phase: 0.7092508395911475,
                angle: 1.9469842687279606
            },
            getMoonTimesUTC: {
                rise: '2083-02-08T14:26:22.295Z',
                set: '2083-02-08T00:20:36.691Z'
            },
            getMoonTimesNonUTC: {
                rise: '2083-02-08T14:26:10.902Z',
                set: '2083-02-08T00:20:30.706Z'
            }
        }
    },
    {
        input: {
            date: '2084-09-06T03:17:17.280Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.1653839465821534,
                altitude: -0.31649890943666675
            },
            getTimes: {
                solarNoon: '2084-09-06T11:50:35.331Z',
                nadir: '2084-09-05T23:50:35.331Z',
                sunrise: '2084-09-06T05:13:12.887Z',
                sunset: '2084-09-06T18:27:57.776Z',
                sunriseEnd: '2084-09-06T05:16:30.929Z',
                sunsetStart: '2084-09-06T18:24:39.733Z',
                dawn: '2084-09-06T04:40:46.234Z',
                dusk: '2084-09-06T19:00:24.428Z',
                nauticalDawn: '2084-09-06T04:01:34.475Z',
                nauticalDusk: '2084-09-06T19:39:36.187Z',
                nightEnd: '2084-09-06T03:19:33.444Z',
                night: '2084-09-06T20:21:37.219Z',
                goldenHourEnd: '2084-09-06T05:55:07.837Z',
                goldenHour: '2084-09-06T17:46:02.825Z'
            },
            getMoonPosition: {
                azimuth: 2.638125233754547,
                altitude: -1.0624448834975597,
                distance: 371437.06357568543,
                parallacticAngle: 0.35109500513250275
            },
            getMoonIllumination: {
                fraction: 0.34381737686054914,
                phase: 0.1994393634114775,
                angle: -1.2969977541032427
            },
            getMoonTimesUTC: {
                rise: '2084-09-06T12:35:28.738Z',
                set: '2084-09-06T20:55:47.525Z'
            },
            getMoonTimesNonUTC: {
                rise: '2084-09-06T12:35:28.738Z',
                set: '2084-09-06T20:55:47.525Z'
            }
        }
    },
    {
        input: {
            date: '2084-09-06T03:17:17.280Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.212176465683756,
                altitude: -0.3100214306520736
            },
            getTimes: {
                solarNoon: '2084-09-06T11:59:30.404Z',
                nadir: '2084-09-05T23:59:30.404Z',
                sunrise: '2084-09-06T05:18:43.490Z',
                sunset: '2084-09-06T18:40:17.318Z',
                sunriseEnd: '2084-09-06T05:22:13.329Z',
                sunsetStart: '2084-09-06T18:36:47.479Z',
                dawn: '2084-09-06T04:44:15.680Z',
                dusk: '2084-09-06T19:14:45.127Z',
                nauticalDawn: '2084-09-06T04:02:17.405Z',
                nauticalDusk: '2084-09-06T19:56:43.402Z',
                nightEnd: '2084-09-06T03:16:32.382Z',
                night: '2084-09-06T20:42:28.426Z',
                goldenHourEnd: '2084-09-06T06:03:04.310Z',
                goldenHour: '2084-09-06T17:55:56.497Z'
            },
            getMoonPosition: {
                azimuth: 2.61030293586811,
                altitude: -1.0099241645491956,
                distance: 371437.06357568543,
                parallacticAngle: 0.34869209015239166
            },
            getMoonIllumination: {
                fraction: 0.34381737686054914,
                phase: 0.1994393634114775,
                angle: -1.2969977541032427
            },
            getMoonTimesUTC: {
                rise: '2084-09-06T12:57:23.572Z',
                set: '2084-09-06T20:50:46.322Z'
            },
            getMoonTimesNonUTC: {
                rise: '2084-09-06T12:57:23.572Z',
                set: '2084-09-06T20:50:46.322Z'
            }
        }
    },
    {
        input: {
            date: '2084-09-06T03:17:17.280Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.2480935831833238,
                altitude: 0.5206923380516764
            },
            getTimes: {
                solarNoon: '2084-09-06T07:04:03.420Z',
                nadir: '2084-09-05T19:04:03.420Z',
                sunrise: '2084-09-06T00:34:54.186Z',
                sunset: '2084-09-06T13:33:12.654Z',
                sunriseEnd: '2084-09-06T00:37:45.296Z',
                sunsetStart: '2084-09-06T13:30:21.544Z',
                dawn: '2084-09-06T00:07:00.924Z',
                dusk: '2084-09-06T14:01:05.916Z',
                nauticalDawn: '2084-09-05T23:33:51.401Z',
                nauticalDusk: '2084-09-06T14:34:15.438Z',
                nightEnd: '2084-09-05T22:59:23.227Z',
                night: '2084-09-06T15:08:43.613Z',
                goldenHourEnd: '2084-09-06T01:11:13.873Z',
                goldenHour: '2084-09-06T12:56:52.967Z'
            },
            getMoonPosition: {
                azimuth: -1.6161139246693483,
                altitude: -0.6737205921380387,
                distance: 371437.06357568543,
                parallacticAngle: -0.9619804863269659
            },
            getMoonIllumination: {
                fraction: 0.34381737686054914,
                phase: 0.1994393634114775,
                angle: -1.2969977541032427
            },
            getMoonTimesUTC: {
                rise: '2084-09-06T07:01:08.511Z',
                set: '2084-09-06T16:31:46.610Z'
            },
            getMoonTimesNonUTC: {
                rise: '2084-09-06T07:01:08.511Z',
                set: '2084-09-06T16:31:46.610Z'
            }
        }
    },
    {
        input: {
            date: '2084-09-06T03:17:17.280Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 0.3385128271453975,
                altitude: 1.0410105624752415
            },
            getTimes: {
                solarNoon: '2084-09-06T02:41:31.157Z',
                nadir: '2084-09-05T14:41:31.157Z',
                sunrise: '2084-09-05T20:16:23.828Z',
                sunset: '2084-09-06T09:06:38.486Z',
                sunriseEnd: '2084-09-05T20:19:03.199Z',
                sunsetStart: '2084-09-06T09:03:59.114Z',
                dawn: '2084-09-05T19:50:28.567Z',
                dusk: '2084-09-06T09:32:33.746Z',
                nauticalDawn: '2084-09-05T19:19:50.626Z',
                nauticalDusk: '2084-09-06T10:03:11.687Z',
                nightEnd: '2084-09-05T18:48:20.888Z',
                night: '2084-09-06T10:34:41.425Z',
                goldenHourEnd: '2084-09-05T20:50:16.601Z',
                goldenHour: '2084-09-06T08:32:45.713Z'
            },
            getMoonPosition: {
                azimuth: -0.9094559114971048,
                altitude: 0.18441779185162893,
                distance: 371437.06357568543,
                parallacticAngle: -0.7677551419949873
            },
            getMoonIllumination: {
                fraction: 0.34381737686054914,
                phase: 0.1994393634114775,
                angle: -1.2969977541032427
            },
            getMoonTimesUTC: {
                rise: '2084-09-06T02:11:09.976Z',
                set: '2084-09-06T12:15:26.809Z'
            },
            getMoonTimesNonUTC: {
                rise: '2084-09-06T02:11:09.976Z',
                set: '2084-09-06T12:15:26.809Z'
            }
        }
    },
    {
        input: {
            date: '2085-10-14T17:30:57.025Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.4646706677526935,
                altitude: -0.0939491868771486
            },
            getTimes: {
                solarNoon: '2085-10-14T11:37:52.698Z',
                nadir: '2085-10-13T23:37:52.698Z',
                sunrise: '2085-10-14T06:07:24.271Z',
                sunset: '2085-10-14T17:08:21.125Z',
                sunriseEnd: '2085-10-14T06:10:42.368Z',
                sunsetStart: '2085-10-14T17:05:03.029Z',
                dawn: '2085-10-14T05:35:41.247Z',
                dusk: '2085-10-14T17:40:04.149Z',
                nauticalDawn: '2085-10-14T04:59:10.918Z',
                nauticalDusk: '2085-10-14T18:16:34.478Z',
                nightEnd: '2085-10-14T04:22:31.002Z',
                night: '2085-10-14T18:53:14.394Z',
                goldenHourEnd: '2085-10-14T06:50:24.669Z',
                goldenHour: '2085-10-14T16:25:20.728Z'
            },
            getMoonPosition: {
                azimuth: 2.1979141674014175,
                altitude: -0.3741043362767783,
                distance: 405869.39047525515,
                parallacticAngle: 0.5638170438663912
            },
            getMoonIllumination: {
                fraction: 0.140013594453129,
                phase: 0.8779228769917433,
                angle: 1.8580871541644626
            },
            getMoonTimesUTC: {
                rise: '2085-10-14T01:45:02.491Z',
                set: '2085-10-14T15:06:44.900Z'
            },
            getMoonTimesNonUTC: {
                rise: '2085-10-14T01:45:02.491Z',
                set: '2085-10-14T15:06:44.900Z'
            }
        }
    },
    {
        input: {
            date: '2085-10-14T17:30:57.025Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.438901587764667,
                altitude: -0.07468417351703775
            },
            getTimes: {
                solarNoon: '2085-10-14T11:46:47.809Z',
                nadir: '2085-10-13T23:46:47.809Z',
                sunrise: '2085-10-14T06:19:34.197Z',
                sunset: '2085-10-14T17:14:01.422Z',
                sunriseEnd: '2085-10-14T06:23:04.038Z',
                sunsetStart: '2085-10-14T17:10:31.580Z',
                dawn: '2085-10-14T05:46:01.066Z',
                dusk: '2085-10-14T17:47:34.553Z',
                nauticalDawn: '2085-10-14T05:07:25.798Z',
                nauticalDusk: '2085-10-14T18:26:09.821Z',
                nightEnd: '2085-10-14T04:28:35.439Z',
                night: '2085-10-14T19:05:00.180Z',
                goldenHourEnd: '2085-10-14T07:05:15.317Z',
                goldenHour: '2085-10-14T16:28:20.301Z'
            },
            getMoonPosition: {
                azimuth: 2.176765036224851,
                altitude: -0.3270245538801676,
                distance: 405869.39047525515,
                parallacticAngle: 0.538915967587374
            },
            getMoonIllumination: {
                fraction: 0.140013594453129,
                phase: 0.8779228769917433,
                angle: 1.8580871541644626
            },
            getMoonTimesUTC: {
                rise: '2085-10-14T01:50:27.548Z',
                set: '2085-10-14T15:17:35.712Z'
            },
            getMoonTimesNonUTC: {
                rise: '2085-10-14T01:50:27.548Z',
                set: '2085-10-14T15:17:35.712Z'
            }
        }
    },
    {
        input: {
            date: '2085-10-14T17:30:57.025Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.5632056801374112,
                altitude: -0.9262775809415601
            },
            getTimes: {
                solarNoon: '2085-10-14T06:51:19.562Z',
                nadir: '2085-10-13T18:51:19.562Z',
                sunrise: '2085-10-14T01:12:23.770Z',
                sunset: '2085-10-14T12:30:15.355Z',
                sunriseEnd: '2085-10-14T01:15:14.940Z',
                sunsetStart: '2085-10-14T12:27:24.185Z',
                dawn: '2085-10-14T00:44:54.486Z',
                dusk: '2085-10-14T12:57:44.638Z',
                nauticalDawn: '2085-10-14T00:13:12.499Z',
                nauticalDusk: '2085-10-14T13:29:26.625Z',
                nightEnd: '2085-10-13T23:41:29.902Z',
                night: '2085-10-14T14:01:09.222Z',
                goldenHourEnd: '2085-10-14T01:49:20.167Z',
                goldenHour: '2085-10-14T11:53:18.957Z'
            },
            getMoonPosition: {
                azimuth: -2.61144873108544,
                altitude: -0.6946582880626035,
                distance: 405869.39047525515,
                parallacticAngle: -0.3946060539118221
            },
            getMoonIllumination: {
                fraction: 0.140013594453129,
                phase: 0.8779228769917433,
                angle: 1.8580871541644626
            },
            getMoonTimesUTC: {
                rise: '2085-10-14T21:53:25.771Z',
                set: '2085-10-14T10:09:11.108Z'
            },
            getMoonTimesNonUTC: {
                rise: '2085-10-14T21:53:25.771Z',
                set: '2085-10-14T10:09:11.108Z'
            }
        }
    },
    {
        input: {
            date: '2085-10-14T17:30:57.025Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.9501858911584888,
                altitude: -0.6914117528924488
            },
            getTimes: {
                solarNoon: '2085-10-15T02:28:31.946Z',
                nadir: '2085-10-14T14:28:31.946Z',
                sunrise: '2085-10-14T20:46:22.131Z',
                sunset: '2085-10-15T08:10:41.761Z',
                sunriseEnd: '2085-10-14T20:49:01.754Z',
                sunsetStart: '2085-10-15T08:08:02.138Z',
                dawn: '2085-10-14T20:20:42.606Z',
                dusk: '2085-10-15T08:36:21.286Z',
                nauticalDawn: '2085-10-14T19:51:06.485Z',
                nauticalDusk: '2085-10-15T09:05:57.406Z',
                nightEnd: '2085-10-14T19:21:33.308Z',
                night: '2085-10-15T09:35:30.584Z',
                goldenHourEnd: '2085-10-14T21:20:44.770Z',
                goldenHour: '2085-10-15T07:36:19.121Z'
            },
            getMoonPosition: {
                azimuth: -1.649693894082153,
                altitude: 0.0283925966550403,
                distance: 405869.39047525515,
                parallacticAngle: -0.9480551287865198
            },
            getMoonIllumination: {
                fraction: 0.140013594453129,
                phase: 0.8779228769917433,
                angle: 1.8580871541644626
            },
            getMoonTimesUTC: {
                rise: '2085-10-14T17:23:06.219Z',
                set: '2085-10-14T05:38:12.617Z'
            },
            getMoonTimesNonUTC: {
                rise: '2085-10-14T17:23:06.219Z',
                set: '2085-10-14T05:38:12.617Z'
            }
        }
    },
    {
        input: {
            date: '2086-01-31T07:58:35.385Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -0.9885601500361911,
                altitude: 0.07701336778184559
            },
            getTimes: {
                solarNoon: '2086-01-31T12:05:09.083Z',
                nadir: '2086-01-31T00:05:09.083Z',
                sunrise: '2086-01-31T07:22:11.213Z',
                sunset: '2086-01-31T16:48:06.954Z',
                sunriseEnd: '2086-01-31T07:25:47.805Z',
                sunsetStart: '2086-01-31T16:44:30.362Z',
                dawn: '2086-01-31T06:48:07.788Z',
                dusk: '2086-01-31T17:22:10.379Z',
                nauticalDawn: '2086-01-31T06:10:08.631Z',
                nauticalDusk: '2086-01-31T18:00:09.536Z',
                nightEnd: '2086-01-31T05:33:09.640Z',
                night: '2086-01-31T18:37:08.527Z',
                goldenHourEnd: '2086-01-31T08:10:23.948Z',
                goldenHour: '2086-01-31T15:59:54.219Z'
            },
            getMoonPosition: {
                azimuth: 1.798817471818213,
                altitude: -0.02903703252222082,
                distance: 404914.45851064933,
                parallacticAngle: 0.7019383663730961
            },
            getMoonIllumination: {
                fraction: 0.9688462714144539,
                phase: 0.5564789137825517,
                angle: 2.1523372532242555
            },
            getMoonTimesUTC: {
                rise: '2086-01-31T19:07:43.939Z',
                set: '2086-01-31T07:46:43.010Z'
            },
            getMoonTimesNonUTC: {
                rise: '2086-01-31T19:07:51.093Z',
                set: '2086-01-31T07:46:53.672Z'
            }
        }
    },
    {
        input: {
            date: '2086-01-31T07:58:35.385Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.017076704230947,
                altitude: 0.031121048560165187
            },
            getTimes: {
                solarNoon: '2086-01-31T12:14:04.347Z',
                nadir: '2086-01-31T00:14:04.347Z',
                sunrise: '2086-01-31T07:39:22.871Z',
                sunset: '2086-01-31T16:48:45.823Z',
                sunriseEnd: '2086-01-31T07:43:15.023Z',
                sunsetStart: '2086-01-31T16:44:53.672Z',
                dawn: '2086-01-31T07:03:03.355Z',
                dusk: '2086-01-31T17:25:05.339Z',
                nauticalDawn: '2086-01-31T06:22:47.907Z',
                nauticalDusk: '2086-01-31T18:05:20.788Z',
                nightEnd: '2086-01-31T05:43:43.496Z',
                night: '2086-01-31T18:44:25.198Z',
                goldenHourEnd: '2086-01-31T08:31:30.636Z',
                goldenHour: '2086-01-31T15:56:38.059Z'
            },
            getMoonPosition: {
                azimuth: 1.7697311535334421,
                altitude: 0.0051267796923007095,
                distance: 404914.45851064933,
                parallacticAngle: 0.6620193070229375
            },
            getMoonIllumination: {
                fraction: 0.9688462714144539,
                phase: 0.5564789137825517,
                angle: 2.1523372532242555
            },
            getMoonTimesUTC: {
                rise: '2086-01-31T19:14:53.164Z',
                set: '2086-01-31T07:59:38.326Z'
            },
            getMoonTimesNonUTC: {
                rise: '2086-01-31T19:15:03.232Z',
                set: '2086-01-31T07:59:38.772Z'
            }
        }
    },
    {
        input: {
            date: '2086-01-31T07:58:35.385Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 0.2084422925834532,
                altitude: 0.5377778465106342
            },
            getTimes: {
                solarNoon: '2086-01-31T07:18:31.022Z',
                nadir: '2086-01-30T19:18:31.022Z',
                sunrise: '2086-01-31T02:15:16.100Z',
                sunset: '2086-01-31T12:21:45.945Z',
                sunriseEnd: '2086-01-31T02:18:19.041Z',
                sunsetStart: '2086-01-31T12:18:43.004Z',
                dawn: '2086-01-31T01:46:13.082Z',
                dusk: '2086-01-31T12:50:48.962Z',
                nauticalDawn: '2086-01-31T01:13:22.971Z',
                nauticalDusk: '2086-01-31T13:23:39.073Z',
                nightEnd: '2086-01-31T00:41:11.664Z',
                night: '2086-01-31T13:55:50.380Z',
                goldenHourEnd: '2086-01-31T02:55:19.696Z',
                goldenHour: '2086-01-31T11:41:42.348Z'
            },
            getMoonPosition: {
                azimuth: 2.9773849566076827,
                altitude: -0.7234627512727255,
                distance: 404914.45851064933,
                parallacticAngle: 0.12514901963463038
            },
            getMoonIllumination: {
                fraction: 0.9688462714144539,
                phase: 0.5564789137825517,
                angle: 2.1523372532242555
            },
            getMoonTimesUTC: {
                rise: '2086-01-31T14:16:03.997Z',
                set: '2086-01-31T02:47:00.883Z'
            },
            getMoonTimesNonUTC: {
                rise: '2086-01-31T14:15:52.228Z',
                set: '2086-01-31T02:46:49.338Z'
            }
        }
    },
    {
        input: {
            date: '2086-01-31T07:58:35.385Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.184533205236554,
                altitude: 0.005494982257301956
            },
            getTimes: {
                solarNoon: '2086-01-31T02:55:53.105Z',
                nadir: '2086-01-30T14:55:53.105Z',
                sunrise: '2086-01-30T21:42:34.682Z',
                sunset: '2086-01-31T08:09:11.529Z',
                sunriseEnd: '2086-01-30T21:45:23.644Z',
                sunsetStart: '2086-01-31T08:06:22.567Z',
                dawn: '2086-01-30T21:15:38.593Z',
                dusk: '2086-01-31T08:36:07.617Z',
                nauticalDawn: '2086-01-30T20:45:01.907Z',
                nauticalDusk: '2086-01-31T09:06:44.304Z',
                nightEnd: '2086-01-30T20:14:55.737Z',
                night: '2086-01-31T09:36:50.474Z',
                goldenHourEnd: '2086-01-30T22:19:21.267Z',
                goldenHour: '2086-01-31T07:32:24.943Z'
            },
            getMoonPosition: {
                azimuth: -2.0111274935376624,
                altitude: -0.3489053113791238,
                distance: 404914.45851064933,
                parallacticAngle: -0.8334914437332894
            },
            getMoonIllumination: {
                fraction: 0.9688462714144539,
                phase: 0.5564789137825517,
                angle: 2.1523372532242555
            },
            getMoonTimesUTC: {
                rise: '2086-01-31T09:47:15.747Z',
                set: '2086-01-31T22:41:35.846Z'
            },
            getMoonTimesNonUTC: {
                rise: '2086-01-31T09:47:13.874Z',
                set: '2086-01-31T22:41:21.611Z'
            }
        }
    },
    {
        input: {
            date: '2086-11-28T18:01:17.404Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.3970701226086755,
                altitude: -0.345270959713973
            },
            getTimes: {
                solarNoon: '2086-11-28T11:39:47.089Z',
                nadir: '2086-11-27T23:39:47.089Z',
                sunrise: '2086-11-28T07:16:30.445Z',
                sunset: '2086-11-28T16:03:03.734Z',
                sunriseEnd: '2086-11-28T07:20:19.801Z',
                sunsetStart: '2086-11-28T15:59:14.378Z',
                dawn: '2086-11-28T06:40:46.886Z',
                dusk: '2086-11-28T16:38:47.292Z',
                nauticalDawn: '2086-11-28T06:01:31.289Z',
                nauticalDusk: '2086-11-28T17:18:02.890Z',
                nightEnd: '2086-11-28T05:23:46.552Z',
                night: '2086-11-28T17:55:47.627Z',
                goldenHourEnd: '2086-11-28T08:08:19.608Z',
                goldenHour: '2086-11-28T15:11:14.571Z'
            },
            getMoonPosition: {
                azimuth: 3.0613113703056785,
                altitude: -0.6803273117800452,
                distance: 401088.5022763751,
                parallacticAngle: 0.052815912102699626
            },
            getMoonIllumination: {
                fraction: 0.42764658790053134,
                phase: 0.7731119511131729,
                angle: 1.9499733812264286
            },
            getMoonTimesUTC: {
                set: '2086-11-28T12:19:06.675Z'
            },
            getMoonTimesNonUTC: {
                rise: '2086-11-27T23:18:32.831Z',
                set: '2086-11-28T12:19:07.011Z'
            }
        }
    },
    {
        input: {
            date: '2086-11-28T18:01:17.404Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.384685089397686,
                altitude: -0.32901667529912537
            },
            getTimes: {
                solarNoon: '2086-11-28T11:48:42.413Z',
                nadir: '2086-11-27T23:48:42.413Z',
                sunrise: '2086-11-28T07:36:03.071Z',
                sunset: '2086-11-28T16:01:21.755Z',
                sunriseEnd: '2086-11-28T07:40:11.143Z',
                sunsetStart: '2086-11-28T15:57:13.683Z',
                dawn: '2086-11-28T06:57:41.470Z',
                dusk: '2086-11-28T16:39:43.356Z',
                nauticalDawn: '2086-11-28T06:15:56.523Z',
                nauticalDusk: '2086-11-28T17:21:28.303Z',
                nightEnd: '2086-11-28T05:36:01.212Z',
                night: '2086-11-28T18:01:23.615Z',
                goldenHourEnd: '2086-11-28T08:32:52.305Z',
                goldenHour: '2086-11-28T15:04:32.521Z'
            },
            getMoonPosition: {
                azimuth: 3.015711031388505,
                altitude: -0.63176093725817,
                distance: 401088.5022763751,
                parallacticAngle: 0.07826643123317621
            },
            getMoonIllumination: {
                fraction: 0.42764658790053134,
                phase: 0.7731119511131729,
                angle: 1.9499733812264286
            },
            getMoonTimesUTC: {
                set: '2086-11-28T12:29:36.521Z'
            },
            getMoonTimesNonUTC: {
                rise: '2086-11-27T23:25:32.126Z',
                set: '2086-11-28T12:29:29.317Z'
            }
        }
    },
    {
        input: {
            date: '2086-11-28T18:01:17.404Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.590617030409873,
                altitude: -1.1857340376654513
            },
            getTimes: {
                solarNoon: '2086-11-28T06:53:07.125Z',
                nadir: '2086-11-27T18:53:07.125Z',
                sunrise: '2086-11-28T02:03:47.292Z',
                sunset: '2086-11-28T11:42:26.957Z',
                sunriseEnd: '2086-11-28T02:06:57.572Z',
                sunsetStart: '2086-11-28T11:39:16.677Z',
                dawn: '2086-11-28T01:33:43.612Z',
                dusk: '2086-11-28T12:12:30.637Z',
                nauticalDawn: '2086-11-28T01:00:02.237Z',
                nauticalDusk: '2086-11-28T12:46:12.013Z',
                nightEnd: '2086-11-28T00:27:15.735Z',
                night: '2086-11-28T13:18:58.514Z',
                goldenHourEnd: '2086-11-28T02:45:45.517Z',
                goldenHour: '2086-11-28T11:00:28.732Z'
            },
            getMoonPosition: {
                azimuth: -1.848361014175576,
                altitude: -0.2592498125051107,
                distance: 401088.5022763751,
                parallacticAngle: -0.8172827471123585
            },
            getMoonIllumination: {
                fraction: 0.42764658790053134,
                phase: 0.7731119511131729,
                angle: 1.9499733812264286
            },
            getMoonTimesUTC: {
                rise: '2086-11-28T19:25:29.603Z',
                set: '2086-11-28T07:23:59.870Z'
            },
            getMoonTimesNonUTC: {
                rise: '2086-11-28T19:25:41.144Z',
                set: '2086-11-28T07:24:07.110Z'
            }
        }
    },
    {
        input: {
            date: '2086-11-28T18:01:17.404Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.6102402259395219,
                altitude: -0.7231985194824375
            },
            getTimes: {
                solarNoon: '2086-11-29T02:30:47.576Z',
                nadir: '2086-11-28T14:30:47.576Z',
                sunrise: '2086-11-28T21:29:16.057Z',
                sunset: '2086-11-29T07:32:19.095Z',
                sunriseEnd: '2086-11-28T21:32:10.966Z',
                sunsetStart: '2086-11-29T07:29:24.186Z',
                dawn: '2086-11-28T21:01:29.546Z',
                dusk: '2086-11-29T08:00:05.606Z',
                nauticalDawn: '2086-11-28T20:30:07.899Z',
                nauticalDusk: '2086-11-29T08:31:27.254Z',
                nightEnd: '2086-11-28T19:59:28.466Z',
                night: '2086-11-29T09:02:06.687Z',
                goldenHourEnd: '2086-11-28T22:07:32.404Z',
                goldenHour: '2086-11-29T06:54:02.748Z'
            },
            getMoonPosition: {
                azimuth: -1.085837730707529,
                altitude: 0.6163901588841676,
                distance: 401088.5022763751,
                parallacticAngle: -0.8023530618989891
            },
            getMoonIllumination: {
                fraction: 0.42764658790053134,
                phase: 0.7731119511131729,
                angle: 1.9499733812264286
            },
            getMoonTimesUTC: {
                rise: '2086-11-28T14:53:27.996Z',
                set: '2086-11-28T02:54:49.191Z'
            },
            getMoonTimesNonUTC: {
                rise: '2086-11-28T14:53:33.158Z',
                set: '2086-11-28T02:54:42.998Z'
            }
        }
    },
    {
        input: {
            date: '2088-03-28T00:13:30.284Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -3.034393351753628,
                altitude: -0.6681495427434827
            },
            getTimes: {
                solarNoon: '2088-03-28T11:56:57.918Z',
                nadir: '2088-03-27T23:56:57.918Z',
                sunrise: '2088-03-28T05:36:32.115Z',
                sunset: '2088-03-28T18:17:23.722Z',
                sunriseEnd: '2088-03-28T05:39:47.393Z',
                sunsetStart: '2088-03-28T18:14:08.444Z',
                dawn: '2088-03-28T05:04:44.473Z',
                dusk: '2088-03-28T18:49:11.363Z',
                nauticalDawn: '2088-03-28T04:26:52.319Z',
                nauticalDusk: '2088-03-28T19:27:03.518Z',
                nightEnd: '2088-03-28T03:47:08.490Z',
                night: '2088-03-28T20:06:47.347Z',
                goldenHourEnd: '2088-03-28T06:18:07.485Z',
                goldenHour: '2088-03-28T17:35:48.352Z'
            },
            getMoonPosition: {
                azimuth: 2.1587265003620657,
                altitude: -0.03218932997140043,
                distance: 364096.1436802017,
                parallacticAngle: 0.6198579041622199
            },
            getMoonIllumination: {
                fraction: 0.3071052375298309,
                phase: 0.18696454532486284,
                angle: -1.6659126472336103
            },
            getMoonTimesUTC: {
                rise: '2088-03-28T09:03:19.485Z'
            },
            getMoonTimesNonUTC: {
                rise: '2088-03-28T09:03:23.774Z',
                set: '2088-03-27T23:58:35.534Z'
            }
        }
    },
    {
        input: {
            date: '2088-03-28T00:13:30.284Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -3.085872832128714,
                altitude: -0.6240820284061916
            },
            getTimes: {
                solarNoon: '2088-03-28T12:05:53.001Z',
                nadir: '2088-03-28T00:05:53.001Z',
                sunrise: '2088-03-28T05:43:43.170Z',
                sunset: '2088-03-28T18:28:02.833Z',
                sunriseEnd: '2088-03-28T05:47:09.717Z',
                sunsetStart: '2088-03-28T18:24:36.286Z',
                dawn: '2088-03-28T05:10:02.577Z',
                dusk: '2088-03-28T19:01:43.425Z',
                nauticalDawn: '2088-03-28T04:29:43.480Z',
                nauticalDusk: '2088-03-28T19:42:02.523Z',
                nightEnd: '2088-03-28T03:46:57.564Z',
                night: '2088-03-28T20:24:48.439Z',
                goldenHourEnd: '2088-03-28T06:27:41.344Z',
                goldenHour: '2088-03-28T17:44:04.659Z'
            },
            getMoonPosition: {
                azimuth: 2.1292721992817234,
                altitude: 0.013092632599230464,
                distance: 364096.1436802017,
                parallacticAngle: 0.5945228210004248
            },
            getMoonIllumination: {
                fraction: 0.3071052375298309,
                phase: 0.18696454532486284,
                angle: -1.6659126472336103
            },
            getMoonTimesUTC: {
                rise: '2088-03-28T09:01:40.401Z',
                set: '2088-03-28T00:17:36.217Z'
            },
            getMoonTimesNonUTC: {
                rise: '2088-03-28T09:01:42.746Z',
                set: '2088-03-28T00:17:43.280Z'
            }
        }
    },
    {
        input: {
            date: '2088-03-28T00:13:30.284Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.7620757512301797,
                altitude: -0.14693469946976984
            },
            getTimes: {
                solarNoon: '2088-03-28T07:10:25.679Z',
                nadir: '2088-03-27T19:10:25.679Z',
                sunrise: '2088-03-28T00:54:30.532Z',
                sunset: '2088-03-28T13:26:20.826Z',
                sunriseEnd: '2088-03-28T00:57:19.809Z',
                sunsetStart: '2088-03-28T13:23:31.549Z',
                dawn: '2088-03-28T00:27:01.939Z',
                dusk: '2088-03-28T13:53:49.419Z',
                nauticalDawn: '2088-03-27T23:54:39.223Z',
                nauticalDusk: '2088-03-28T14:26:12.135Z',
                nightEnd: '2088-03-27T23:21:24.357Z',
                night: '2088-03-28T14:59:27.001Z',
                goldenHourEnd: '2088-03-28T01:30:35.956Z',
                goldenHour: '2088-03-28T12:50:15.402Z'
            },
            getMoonPosition: {
                azimuth: -2.9577949605508635,
                altitude: -0.4993354284942866,
                distance: 364096.1436802017,
                parallacticAngle: -0.1475188018932935
            },
            getMoonIllumination: {
                fraction: 0.3071052375298309,
                phase: 0.18696454532486284,
                angle: -1.6659126472336103
            },
            getMoonTimesUTC: {
                rise: '2088-03-28T04:32:22.677Z',
                set: '2088-03-28T19:34:06.918Z'
            },
            getMoonTimesNonUTC: {
                rise: '2088-03-28T04:32:15.211Z',
                set: '2088-03-28T19:34:18.265Z'
            }
        }
    },
    {
        input: {
            date: '2088-03-28T00:13:30.284Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -0.9686299071767811,
                altitude: 0.7314907848297818
            },
            getTimes: {
                solarNoon: '2088-03-28T02:47:53.127Z',
                nadir: '2088-03-27T14:47:53.127Z',
                sunrise: '2088-03-27T20:34:11.881Z',
                sunset: '2088-03-28T09:01:34.372Z',
                sunriseEnd: '2088-03-27T20:36:49.733Z',
                sunsetStart: '2088-03-28T08:58:56.520Z',
                dawn: '2088-03-27T20:08:36.454Z',
                dusk: '2088-03-28T09:27:09.799Z',
                nauticalDawn: '2088-03-27T19:38:34.659Z',
                nauticalDusk: '2088-03-28T09:57:11.594Z',
                nightEnd: '2088-03-27T19:07:59.220Z',
                night: '2088-03-28T10:27:47.033Z',
                goldenHourEnd: '2088-03-27T21:07:52.097Z',
                goldenHour: '2088-03-28T08:27:54.156Z'
            },
            getMoonPosition: {
                azimuth: -1.9931357663133316,
                altitude: 0.010042366801609194,
                distance: 364096.1436802017,
                parallacticAngle: -0.9045972182516704
            },
            getMoonIllumination: {
                fraction: 0.3071052375298309,
                phase: 0.18696454532486284,
                angle: -1.6659126472336103
            },
            getMoonTimesUTC: {
                rise: '2088-03-28T00:11:24.740Z',
                set: '2088-03-28T14:48:24.990Z'
            },
            getMoonTimesNonUTC: {
                rise: '2088-03-28T00:11:13.438Z',
                set: '2088-03-28T14:48:13.517Z'
            }
        }
    },
    {
        input: {
            date: '2093-05-26T06:52:27.580Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.6081564185668025,
                altitude: 0.46289429355245926
            },
            getTimes: {
                solarNoon: '2093-05-26T11:49:02.132Z',
                nadir: '2093-05-25T23:49:02.132Z',
                sunrise: '2093-05-26T03:56:00.720Z',
                sunset: '2093-05-26T19:42:03.545Z',
                sunriseEnd: '2093-05-26T03:59:56.060Z',
                sunsetStart: '2093-05-26T19:38:08.204Z',
                dawn: '2093-05-26T03:15:48.557Z',
                dusk: '2093-05-26T20:22:15.707Z',
                nauticalDawn: '2093-05-26T02:21:01.833Z',
                nauticalDusk: '2093-05-26T21:17:02.431Z',
                nightEnd: '2093-05-26T01:00:03.504Z',
                night: '2093-05-26T22:38:00.760Z',
                goldenHourEnd: '2093-05-26T04:44:06.738Z',
                goldenHour: '2093-05-26T18:53:57.526Z'
            },
            getMoonPosition: {
                azimuth: -1.7785780396001512,
                altitude: 0.2714902223584908,
                distance: 403345.42984472663,
                parallacticAngle: -0.7513048941259735
            },
            getMoonIllumination: {
                fraction: 0.015557629302088316,
                phase: 0.039806538617383314,
                angle: -1.4133191729640318
            },
            getMoonTimesUTC: {
                rise: '2093-05-26T05:06:14.493Z',
                set: '2093-05-26T20:56:01.128Z'
            },
            getMoonTimesNonUTC: {
                rise: '2093-05-26T05:06:14.493Z',
                set: '2093-05-26T20:56:01.128Z'
            }
        }
    },
    {
        input: {
            date: '2093-05-26T06:52:27.580Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.6151595045640461,
                altitude: 0.43987043324126424
            },
            getTimes: {
                solarNoon: '2093-05-26T11:57:57.372Z',
                nadir: '2093-05-25T23:57:57.372Z',
                sunrise: '2093-05-26T03:52:57.911Z',
                sunset: '2093-05-26T20:02:56.833Z',
                sunriseEnd: '2093-05-26T03:57:13.954Z',
                sunsetStart: '2093-05-26T19:58:40.790Z',
                dawn: '2093-05-26T03:08:35.265Z',
                dusk: '2093-05-26T20:47:19.479Z',
                nauticalDawn: '2093-05-26T02:04:32.393Z',
                nauticalDusk: '2093-05-26T21:51:22.351Z',
                nightEnd: null,
                night: null,
                goldenHourEnd: '2093-05-26T04:44:48.561Z',
                goldenHour: '2093-05-26T19:11:06.183Z'
            },
            getMoonPosition: {
                azimuth: -1.7948637971673276,
                altitude: 0.2571033375783369,
                distance: 403345.42984472663,
                parallacticAngle: -0.6989923218733286
            },
            getMoonIllumination: {
                fraction: 0.015557629302088316,
                phase: 0.039806538617383314,
                angle: -1.4133191729640318
            },
            getMoonTimesUTC: {
                rise: '2093-05-26T05:04:57.240Z',
                set: '2093-05-26T21:15:49.012Z'
            },
            getMoonTimesNonUTC: {
                rise: '2093-05-26T05:04:57.240Z',
                set: '2093-05-26T21:15:49.012Z'
            }
        }
    },
    {
        input: {
            date: '2093-05-26T06:52:27.580Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -0.07838875292222426,
                altitude: 1.2258028000193941
            },
            getTimes: {
                solarNoon: '2093-05-26T07:02:24.851Z',
                nadir: '2093-05-25T19:02:24.851Z',
                sunrise: '2093-05-25T23:38:11.870Z',
                sunset: '2093-05-26T14:26:37.831Z',
                sunriseEnd: '2093-05-25T23:41:25.012Z',
                sunsetStart: '2093-05-26T14:23:24.689Z',
                dawn: '2093-05-25T23:06:00.481Z',
                dusk: '2093-05-26T14:58:49.221Z',
                nauticalDawn: '2093-05-25T22:25:32.067Z',
                nauticalDusk: '2093-05-26T15:39:17.634Z',
                nightEnd: '2093-05-25T21:39:13.196Z',
                night: '2093-05-26T16:25:36.506Z',
                goldenHourEnd: '2093-05-26T00:18:22.691Z',
                goldenHour: '2093-05-26T13:46:27.010Z'
            },
            getMoonPosition: {
                azimuth: -0.6785388302394791,
                altitude: 1.122614972043482,
                distance: 403345.42984472663,
                parallacticAngle: -0.5286671536198777
            },
            getMoonIllumination: {
                fraction: 0.015557629302088316,
                phase: 0.039806538617383314,
                angle: -1.4133191729640318
            },
            getMoonTimesUTC: {
                rise: '2093-05-26T00:38:08.442Z',
                set: '2093-05-26T15:30:15.266Z'
            },
            getMoonTimesNonUTC: {
                rise: '2093-05-26T00:38:08.442Z',
                set: '2093-05-26T15:30:15.266Z'
            }
        }
    },
    {
        input: {
            date: '2093-05-26T06:52:27.580Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.633356658952335,
                altitude: 0.5717340429104392
            },
            getTimes: {
                solarNoon: '2093-05-26T02:39:47.692Z',
                nadir: '2093-05-25T14:39:47.692Z',
                sunrise: '2093-05-25T19:29:27.769Z',
                sunset: '2093-05-26T09:50:07.614Z',
                sunriseEnd: '2093-05-25T19:32:24.276Z',
                sunsetStart: '2093-05-26T09:47:11.108Z',
                dawn: '2093-05-25T19:00:17.320Z',
                dusk: '2093-05-26T10:19:18.063Z',
                nauticalDawn: '2093-05-25T18:24:27.213Z',
                nauticalDusk: '2093-05-26T10:55:08.171Z',
                nightEnd: '2093-05-25T17:45:19.061Z',
                night: '2093-05-26T11:34:16.322Z',
                goldenHourEnd: '2093-05-25T20:06:25.384Z',
                goldenHour: '2093-05-26T09:13:09.999Z'
            },
            getMoonPosition: {
                azimuth: 1.4420882488580555,
                altitude: 0.7721727856876578,
                distance: 403345.42984472663,
                parallacticAngle: 1.0238394716726276
            },
            getMoonIllumination: {
                fraction: 0.015557629302088316,
                phase: 0.039806538617383314,
                angle: -1.4133191729640318
            },
            getMoonTimesUTC: {
                rise: '2093-05-26T21:00:24.230Z',
                set: '2093-05-26T10:45:24.048Z'
            },
            getMoonTimesNonUTC: {
                rise: '2093-05-26T21:00:24.230Z',
                set: '2093-05-26T10:45:24.048Z'
            }
        }
    },
    {
        input: {
            date: '2093-07-09T12:37:00.035Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 0.3811983420325992,
                altitude: 1.0857974010555371
            },
            getTimes: {
                solarNoon: '2093-07-09T11:56:48.808Z',
                nadir: '2093-07-08T23:56:48.808Z',
                sunrise: '2093-07-09T03:55:12.926Z',
                sunset: '2093-07-09T19:58:24.690Z',
                sunriseEnd: '2093-07-09T03:59:15.471Z',
                sunsetStart: '2093-07-09T19:54:22.145Z',
                dawn: '2093-07-09T03:13:27.858Z',
                dusk: '2093-07-09T20:40:09.758Z',
                nauticalDawn: '2093-07-09T02:14:58.955Z',
                nauticalDusk: '2093-07-09T21:38:38.660Z',
                nightEnd: '2093-07-09T00:29:48.788Z',
                night: '2093-07-09T23:23:48.828Z',
                goldenHourEnd: '2093-07-09T04:44:31.222Z',
                goldenHour: '2093-07-09T19:09:06.393Z'
            },
            getMoonPosition: {
                azimuth: 3.0566689792136903,
                altitude: -1.066534709170468,
                distance: 364372.5291288455,
                parallacticAngle: 0.0596286120634736
            },
            getMoonIllumination: {
                fraction: 0.9881967239707474,
                phase: 0.5346504979797585,
                angle: 1.3756723168181226
            },
            getMoonTimesUTC: {
                rise: '2093-07-09T20:42:13.106Z',
                set: '2093-07-09T04:45:23.138Z'
            },
            getMoonTimesNonUTC: {
                rise: '2093-07-09T20:42:13.106Z',
                set: '2093-07-09T04:45:23.138Z'
            }
        }
    },
    {
        input: {
            date: '2093-07-09T12:37:00.035Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 0.2810671802452078,
                altitude: 1.0501439750062342
            },
            getTimes: {
                solarNoon: '2093-07-09T12:05:44.062Z',
                nadir: '2093-07-09T00:05:44.062Z',
                sunrise: '2093-07-09T03:51:01.540Z',
                sunset: '2093-07-09T20:20:26.584Z',
                sunriseEnd: '2093-07-09T03:55:26.942Z',
                sunsetStart: '2093-07-09T20:16:01.183Z',
                dawn: '2093-07-09T03:04:31.334Z',
                dusk: '2093-07-09T21:06:56.791Z',
                nauticalDawn: '2093-07-09T01:54:04.875Z',
                nauticalDusk: '2093-07-09T22:17:23.250Z',
                nightEnd: null,
                night: null,
                goldenHourEnd: '2093-07-09T04:44:23.060Z',
                goldenHour: '2093-07-09T19:27:05.064Z'
            },
            getMoonPosition: {
                azimuth: 2.992947000203373,
                altitude: -1.0176929418337106,
                distance: 364372.5291288455,
                parallacticAngle: 0.09859352157717165
            },
            getMoonIllumination: {
                fraction: 0.9881967239707474,
                phase: 0.5346504979797585,
                angle: 1.3756723168181226
            },
            getMoonTimesUTC: {
                rise: '2093-07-09T21:00:53.359Z',
                set: '2093-07-09T04:43:05.221Z'
            },
            getMoonTimesNonUTC: {
                rise: '2093-07-09T21:00:53.359Z',
                set: '2093-07-09T04:43:05.221Z'
            }
        }
    },
    {
        input: {
            date: '2093-07-09T12:37:00.035Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.796091359096673,
                altitude: 0.34760966956262446
            },
            getTimes: {
                solarNoon: '2093-07-09T07:10:11.052Z',
                nadir: '2093-07-08T19:10:11.052Z',
                sunrise: '2093-07-08T23:39:38.988Z',
                sunset: '2093-07-09T14:40:43.116Z',
                sunriseEnd: '2093-07-08T23:42:56.204Z',
                sunsetStart: '2093-07-09T14:37:25.900Z',
                dawn: '2093-07-08T23:06:39.919Z',
                dusk: '2093-07-09T15:13:42.185Z',
                nauticalDawn: '2093-07-08T22:24:47.002Z',
                nauticalDusk: '2093-07-09T15:55:35.102Z',
                nightEnd: '2093-07-08T21:35:50.657Z',
                night: '2093-07-09T16:44:31.447Z',
                goldenHourEnd: '2093-07-09T00:20:33.557Z',
                goldenHour: '2093-07-09T13:59:48.547Z'
            },
            getMoonPosition: {
                azimuth: -1.515478240787743,
                altitude: -0.49320048354601653,
                distance: 364372.5291288455,
                parallacticAngle: -0.9409013526187914
            },
            getMoonIllumination: {
                fraction: 0.9881967239707474,
                phase: 0.5346504979797585,
                angle: 1.3756723168181226
            },
            getMoonTimesUTC: {
                rise: '2093-07-09T15:19:28.933Z',
                set: '2093-07-09T00:12:58.322Z'
            },
            getMoonTimesNonUTC: {
                rise: '2093-07-09T15:19:28.933Z',
                set: '2093-07-09T00:12:58.322Z'
            }
        }
    },
    {
        input: {
            date: '2093-07-09T12:37:00.035Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.5749887406613596,
                altitude: -0.42823575710296136
            },
            getTimes: {
                solarNoon: '2093-07-09T02:47:33.431Z',
                nadir: '2093-07-08T14:47:33.431Z',
                sunrise: '2093-07-08T19:31:52.665Z',
                sunset: '2093-07-09T10:03:14.197Z',
                sunriseEnd: '2093-07-08T19:34:52.371Z',
                sunsetStart: '2093-07-09T10:00:14.491Z',
                dawn: '2093-07-08T19:02:06.090Z',
                dusk: '2093-07-09T10:33:00.772Z',
                nauticalDawn: '2093-07-08T18:25:17.463Z',
                nauticalDusk: '2093-07-09T11:09:49.399Z',
                nightEnd: '2093-07-08T17:44:37.325Z',
                night: '2093-07-09T11:50:29.537Z',
                goldenHourEnd: '2093-07-08T20:09:25.687Z',
                goldenHour: '2093-07-09T09:25:41.175Z'
            },
            getMoonPosition: {
                azimuth: -0.7813069898917298,
                altitude: 0.33937467306498087,
                distance: 364372.5291288455,
                parallacticAngle: -0.6570869016533432
            },
            getMoonIllumination: {
                fraction: 0.9881967239707474,
                phase: 0.5346504979797585,
                angle: 1.3756723168181226
            },
            getMoonTimesUTC: {
                rise: '2093-07-09T10:34:36.506Z',
                set: '2093-07-09T20:59:53.523Z'
            },
            getMoonTimesNonUTC: {
                rise: '2093-07-09T10:34:36.506Z',
                set: '2093-07-09T20:59:53.523Z'
            }
        }
    },
    {
        input: {
            date: '2093-08-13T02:35:02.340Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.4294304662436823,
                altitude: -0.2945543706933241
            },
            getTimes: {
                solarNoon: '2093-08-13T11:56:58.231Z',
                nadir: '2093-08-12T23:56:58.231Z',
                sunrise: '2093-08-13T04:38:33.749Z',
                sunset: '2093-08-13T19:15:22.713Z',
                sunriseEnd: '2093-08-13T04:42:06.618Z',
                sunsetStart: '2093-08-13T19:11:49.844Z',
                dawn: '2093-08-13T04:03:02.202Z',
                dusk: '2093-08-13T19:50:54.260Z',
                nauticalDawn: '2093-08-13T03:18:01.157Z',
                nauticalDusk: '2093-08-13T20:35:55.305Z',
                nightEnd: '2093-08-13T02:25:13.585Z',
                night: '2093-08-13T21:28:42.877Z',
                goldenHourEnd: '2093-08-13T05:22:52.072Z',
                goldenHour: '2093-08-13T18:31:04.390Z'
            },
            getMoonPosition: {
                azimuth: -0.8864221220832584,
                altitude: 0.7073524807838507,
                distance: 389040.9972527412,
                parallacticAngle: -0.5440933247956786
            },
            getMoonIllumination: {
                fraction: 0.5854433970741146,
                phase: 0.7226683801846095,
                angle: 1.270557448219074
            },
            getMoonTimesUTC: {
                rise: '2093-08-13T22:36:17.351Z',
                set: '2093-08-13T12:15:48.435Z'
            },
            getMoonTimesNonUTC: {
                rise: '2093-08-12T22:09:11.359Z',
                set: '2093-08-13T12:15:48.435Z'
            }
        }
    },
    {
        input: {
            date: '2093-08-13T02:35:02.340Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.473573698077926,
                altitude: -0.27475669301131295
            },
            getTimes: {
                solarNoon: '2093-08-13T12:05:53.371Z',
                nadir: '2093-08-13T00:05:53.371Z',
                sunrise: '2093-08-13T04:39:43.253Z',
                sunset: '2093-08-13T19:32:03.490Z',
                sunriseEnd: '2093-08-13T04:43:31.028Z',
                sunsetStart: '2093-08-13T19:28:15.715Z',
                dawn: '2093-08-13T04:01:27.117Z',
                dusk: '2093-08-13T20:10:19.625Z',
                nauticalDawn: '2093-08-13T03:11:54.277Z',
                nauticalDusk: '2093-08-13T20:59:52.466Z',
                nightEnd: '2093-08-13T02:10:23.228Z',
                night: '2093-08-13T22:01:23.515Z',
                goldenHourEnd: '2093-08-13T05:26:54.444Z',
                goldenHour: '2093-08-13T18:44:52.299Z'
            },
            getMoonPosition: {
                azimuth: -0.8997327370862243,
                altitude: 0.658970124792873,
                distance: 389040.9972527412,
                parallacticAngle: -0.5178084951918283
            },
            getMoonIllumination: {
                fraction: 0.5854433970741146,
                phase: 0.7226683801846095,
                angle: 1.270557448219074
            },
            getMoonTimesUTC: {
                rise: '2093-08-13T22:38:46.029Z',
                set: '2093-08-13T12:31:10.936Z'
            },
            getMoonTimesNonUTC: {
                rise: '2093-08-12T22:13:59.651Z',
                set: '2093-08-13T12:31:10.936Z'
            }
        }
    },
    {
        input: {
            date: '2093-08-13T02:35:02.340Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.5258489058213445,
                altitude: 0.45834202868259766
            },
            getTimes: {
                solarNoon: '2093-08-13T07:10:24.133Z',
                nadir: '2093-08-12T19:10:24.133Z',
                sunrise: '2093-08-13T00:10:50.123Z',
                sunset: '2093-08-13T14:09:58.142Z',
                sunriseEnd: '2093-08-13T00:13:50.484Z',
                sunsetStart: '2093-08-13T14:06:57.781Z',
                dawn: '2093-08-12T23:41:07.123Z',
                dusk: '2093-08-13T14:39:41.142Z',
                nauticalDawn: '2093-08-12T23:04:51.749Z',
                nauticalDusk: '2093-08-13T15:15:56.516Z',
                nightEnd: '2093-08-12T22:25:38.148Z',
                night: '2093-08-13T15:55:10.117Z',
                goldenHourEnd: '2093-08-13T00:48:43.930Z',
                goldenHour: '2093-08-13T13:32:04.336Z'
            },
            getMoonPosition: {
                azimuth: 0.9587198648794375,
                altitude: 0.811224089749625,
                distance: 389040.9972527412,
                parallacticAngle: 0.6814052290773528
            },
            getMoonIllumination: {
                fraction: 0.5854433970741146,
                phase: 0.7226683801846095,
                angle: 1.270557448219074
            },
            getMoonTimesUTC: {
                rise: '2093-08-13T17:58:35.970Z',
                set: '2093-08-13T07:03:08.409Z'
            },
            getMoonTimesNonUTC: {
                rise: '2093-08-13T17:58:35.970Z',
                set: '2093-08-13T07:03:08.409Z'
            }
        }
    },
    {
        input: {
            date: '2093-08-13T02:35:02.340Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -0.1124089764026359,
                altitude: 1.2073473099423764
            },
            getTimes: {
                solarNoon: '2093-08-13T02:47:49.855Z',
                nadir: '2093-08-12T14:47:49.855Z',
                sunrise: '2093-08-12T19:57:29.220Z',
                sunset: '2093-08-13T09:38:10.490Z',
                sunriseEnd: '2093-08-12T20:00:15.970Z',
                sunsetStart: '2093-08-13T09:35:23.741Z',
                dawn: '2093-08-12T19:30:08.686Z',
                dusk: '2093-08-13T10:05:31.024Z',
                nauticalDawn: '2093-08-12T18:57:13.293Z',
                nauticalDusk: '2093-08-13T10:38:26.418Z',
                nightEnd: '2093-08-12T18:22:25.952Z',
                night: '2093-08-13T11:13:13.758Z',
                goldenHourEnd: '2093-08-12T20:32:39.344Z',
                goldenHour: '2093-08-13T09:03:00.367Z'
            },
            getMoonPosition: {
                azimuth: 1.8193249547213475,
                altitude: -0.03751995746242786,
                distance: 389040.9972527412,
                parallacticAngle: 0.9263930062087422
            },
            getMoonIllumination: {
                fraction: 0.5854433970741146,
                phase: 0.7226683801846095,
                angle: 1.270557448219074
            },
            getMoonTimesUTC: {
                rise: '2093-08-13T13:38:16.554Z',
                set: '2093-08-13T02:22:05.296Z'
            },
            getMoonTimesNonUTC: {
                rise: '2093-08-13T13:38:16.554Z',
                set: '2093-08-13T02:22:05.296Z'
            }
        }
    },
    {
        input: {
            date: '2094-06-01T22:15:19.457Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.7587291630044652,
                altitude: -0.2843609953558998
            },
            getTimes: {
                solarNoon: '2094-06-01T11:49:46.006Z',
                nadir: '2094-05-31T23:49:46.006Z',
                sunrise: '2094-06-01T03:51:10.479Z',
                sunset: '2094-06-01T19:48:21.533Z',
                sunriseEnd: '2094-06-01T03:55:10.417Z',
                sunsetStart: '2094-06-01T19:44:21.595Z',
                dawn: '2094-06-01T03:09:59.235Z',
                dusk: '2094-06-01T20:29:32.778Z',
                nauticalDawn: '2094-06-01T02:12:53.320Z',
                nauticalDusk: '2094-06-01T21:26:38.692Z',
                nightEnd: '2094-06-01T00:39:24.210Z',
                night: '2094-06-01T23:00:07.803Z',
                goldenHourEnd: '2094-06-01T04:40:02.691Z',
                goldenHour: '2094-06-01T18:59:29.322Z'
            },
            getMoonPosition: {
                azimuth: -0.9749368742394598,
                altitude: -0.026868092341646034,
                distance: 367502.5730703676,
                parallacticAngle: -0.634808360259721
            },
            getMoonIllumination: {
                fraction: 0.8934980883035629,
                phase: 0.6058175584330618,
                angle: 1.4584948860710083
            },
            getMoonTimesUTC: {
                rise: '2094-06-01T22:29:18.856Z',
                set: '2094-06-01T05:55:25.804Z'
            },
            getMoonTimesNonUTC: {
                rise: '2094-06-01T22:29:18.856Z',
                set: '2094-06-02T07:00:45.859Z'
            }
        }
    },
    {
        input: {
            date: '2094-06-01T22:15:19.457Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.7274990498646234,
                altitude: -0.23206783380661467
            },
            getTimes: {
                solarNoon: '2094-06-01T11:58:41.260Z',
                nadir: '2094-05-31T23:58:41.260Z',
                sunrise: '2094-06-01T03:47:23.127Z',
                sunset: '2094-06-01T20:09:59.394Z',
                sunriseEnd: '2094-06-01T03:51:45.130Z',
                sunsetStart: '2094-06-01T20:05:37.391Z',
                dawn: '2094-06-01T03:01:39.681Z',
                dusk: '2094-06-01T20:55:42.840Z',
                nauticalDawn: '2094-06-01T01:53:40.850Z',
                nauticalDusk: '2094-06-01T22:03:41.670Z',
                nightEnd: null,
                night: null,
                goldenHourEnd: '2094-06-01T04:40:11.782Z',
                goldenHour: '2094-06-01T19:17:10.739Z'
            },
            getMoonPosition: {
                azimuth: -1.0063008530690543,
                altitude: -0.0730688834649877,
                distance: 367502.5730703676,
                parallacticAngle: -0.6097560633970318
            },
            getMoonIllumination: {
                fraction: 0.8934980883035629,
                phase: 0.6058175584330618,
                angle: 1.4584948860710083
            },
            getMoonTimesUTC: {
                rise: '2094-06-01T22:51:16.965Z',
                set: '2094-06-01T05:51:00.706Z'
            },
            getMoonTimesNonUTC: {
                rise: '2094-06-01T22:51:16.965Z',
                set: '2094-06-02T06:56:56.606Z'
            }
        }
    },
    {
        input: {
            date: '2094-06-01T22:15:19.457Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.343778658173363,
                altitude: -0.21944264792995924
            },
            getTimes: {
                solarNoon: '2094-06-02T07:03:17.108Z',
                nadir: '2094-06-01T19:03:17.108Z',
                sunrise: '2094-06-01T23:34:29.199Z',
                sunset: '2094-06-02T14:32:05.016Z',
                sunriseEnd: '2094-06-01T23:37:45.262Z',
                sunsetStart: '2094-06-02T14:28:48.953Z',
                dawn: '2094-06-01T23:01:43.652Z',
                dusk: '2094-06-02T15:04:50.563Z',
                nauticalDawn: '2094-06-01T22:20:14.898Z',
                nauticalDusk: '2094-06-02T15:46:19.318Z',
                nightEnd: '2094-06-01T21:32:04.549Z',
                night: '2094-06-02T16:34:29.667Z',
                goldenHourEnd: '2094-06-02T00:15:11.397Z',
                goldenHour: '2094-06-02T13:51:22.818Z'
            },
            getMoonPosition: {
                azimuth: 0.1316811407583262,
                altitude: 0.44764684000278204,
                distance: 367502.5730703676,
                parallacticAngle: 0.10858539520140453
            },
            getMoonIllumination: {
                fraction: 0.8934980883035629,
                phase: 0.6058175584330618,
                angle: 1.4584948860710083
            },
            getMoonTimesUTC: {
                rise: '2094-06-01T16:58:12.953Z',
                set: '2094-06-01T01:28:34.623Z'
            },
            getMoonTimesNonUTC: {
                rise: '2094-06-02T17:53:49.362Z',
                set: '2094-06-02T02:31:13.843Z'
            }
        }
    },
    {
        input: {
            date: '2094-06-01T22:15:19.457Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.6650519493186329,
                altitude: 0.5602370690529396
            },
            getTimes: {
                solarNoon: '2094-06-02T02:40:39.472Z',
                nadir: '2094-06-01T14:40:39.472Z',
                sunrise: '2094-06-01T19:26:33.477Z',
                sunset: '2094-06-02T09:54:45.466Z',
                sunriseEnd: '2094-06-01T19:29:32.212Z',
                sunsetStart: '2094-06-02T09:51:46.731Z',
                dawn: '2094-06-01T18:56:57.879Z',
                dusk: '2094-06-02T10:24:21.064Z',
                nauticalDawn: '2094-06-01T18:20:27.112Z',
                nauticalDusk: '2094-06-02T11:00:51.831Z',
                nightEnd: '2094-06-01T17:40:15.337Z',
                night: '2094-06-02T11:41:03.606Z',
                goldenHourEnd: '2094-06-01T20:03:55.753Z',
                goldenHour: '2094-06-02T09:17:23.190Z'
            },
            getMoonPosition: {
                azimuth: 1.072950523499356,
                altitude: -0.0048410657610252535,
                distance: 367502.5730703676,
                parallacticAngle: 0.8901978816076612
            },
            getMoonIllumination: {
                fraction: 0.8934980883035629,
                phase: 0.6058175584330618,
                angle: 1.4584948860710083
            },
            getMoonTimesUTC: {
                rise: '2094-06-01T12:09:35.599Z',
                set: '2094-06-01T22:12:02.394Z'
            },
            getMoonTimesNonUTC: {
                rise: '2094-06-02T13:06:45.342Z',
                set: '2094-06-01T22:12:02.394Z'
            }
        }
    },
    {
        input: {
            date: '2094-07-21T10:43:11.817Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -0.5815276021423821,
                altitude: 1.0183564267453087
            },
            getTimes: {
                solarNoon: '2094-07-21T11:58:03.878Z',
                nadir: '2094-07-20T23:58:03.878Z',
                sunrise: '2094-07-21T04:07:26.785Z',
                sunset: '2094-07-21T19:48:40.972Z',
                sunriseEnd: '2094-07-21T04:11:20.230Z',
                sunsetStart: '2094-07-21T19:44:47.527Z',
                dawn: '2094-07-21T03:27:38.780Z',
                dusk: '2094-07-21T20:28:28.977Z',
                nauticalDawn: '2094-07-21T02:33:47.042Z',
                nauticalDusk: '2094-07-21T21:22:20.715Z',
                nightEnd: '2094-07-21T01:16:37.623Z',
                night: '2094-07-21T22:39:30.134Z',
                goldenHourEnd: '2094-07-21T04:55:13.696Z',
                goldenHour: '2094-07-21T19:00:54.061Z'
            },
            getMoonPosition: {
                azimuth: -1.7925995145162743,
                altitude: -0.42115298790458194,
                distance: 390833.50959067384,
                parallacticAngle: -0.71129816927201
            },
            getMoonIllumination: {
                fraction: 0.594564664024818,
                phase: 0.2802832698545884,
                angle: -1.2348504562820324
            },
            getMoonTimesUTC: {
                rise: '2094-07-21T13:20:10.131Z',
                set: '2094-07-21T23:50:42.409Z'
            },
            getMoonTimesNonUTC: {
                rise: '2094-07-21T13:20:10.131Z',
                set: '2094-07-20T23:28:07.029Z'
            }
        }
    },
    {
        input: {
            date: '2094-07-21T10:43:11.817Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -0.6035460484443621,
                altitude: 0.9660741154561483
            },
            getTimes: {
                solarNoon: '2094-07-21T12:06:59.101Z',
                nadir: '2094-07-21T00:06:59.101Z',
                sunrise: '2094-07-21T04:04:43.729Z',
                sunset: '2094-07-21T20:09:14.473Z',
                sunriseEnd: '2094-07-21T04:08:57.320Z',
                sunsetStart: '2094-07-21T20:05:00.882Z',
                dawn: '2094-07-21T03:20:53.907Z',
                dusk: '2094-07-21T20:53:04.295Z',
                nauticalDawn: '2094-07-21T02:18:20.969Z',
                nauticalDusk: '2094-07-21T21:55:37.234Z',
                nightEnd: null,
                night: null,
                goldenHourEnd: '2094-07-21T04:56:10.386Z',
                goldenHour: '2094-07-21T19:17:47.817Z'
            },
            getMoonPosition: {
                azimuth: -1.8462464634149436,
                altitude: -0.4339387789383794,
                distance: 390833.50959067384,
                parallacticAngle: -0.6550826000048854
            },
            getMoonIllumination: {
                fraction: 0.594564664024818,
                phase: 0.2802832698545884,
                angle: -1.2348504562820324
            },
            getMoonTimesUTC: {
                rise: '2094-07-21T13:35:15.210Z',
                set: '2094-07-21T23:53:42.137Z'
            },
            getMoonTimesNonUTC: {
                rise: '2094-07-21T13:35:15.210Z',
                set: '2094-07-20T23:33:29.741Z'
            }
        }
    },
    {
        input: {
            date: '2094-07-21T10:43:11.817Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.4466636622348525,
                altitude: 0.7072259203708441
            },
            getTimes: {
                solarNoon: '2094-07-21T07:11:27.134Z',
                nadir: '2094-07-20T19:11:27.134Z',
                sunrise: '2094-07-20T23:48:38.310Z',
                sunset: '2094-07-21T14:34:15.957Z',
                sunriseEnd: '2094-07-20T23:51:50.593Z',
                sunsetStart: '2094-07-21T14:31:03.674Z',
                dawn: '2094-07-20T23:16:36.940Z',
                dusk: '2094-07-21T15:06:17.327Z',
                nauticalDawn: '2094-07-20T22:36:26.050Z',
                nauticalDusk: '2094-07-21T15:46:28.217Z',
                nightEnd: '2094-07-20T21:50:38.703Z',
                night: '2094-07-21T16:32:15.564Z',
                goldenHourEnd: '2094-07-21T00:28:39.896Z',
                goldenHour: '2094-07-21T13:54:14.371Z'
            },
            getMoonPosition: {
                azimuth: -0.8496438824174999,
                altitude: 0.43189111736518676,
                distance: 390833.50959067384,
                parallacticAngle: -0.617476688547114
            },
            getMoonIllumination: {
                fraction: 0.594564664024818,
                phase: 0.2802832698545884,
                angle: -1.2348504562820324
            },
            getMoonTimesUTC: {
                rise: '2094-07-21T08:07:21.570Z',
                set: '2094-07-21T19:13:13.120Z'
            },
            getMoonTimesNonUTC: {
                rise: '2094-07-21T08:07:21.570Z',
                set: '2094-07-21T19:13:13.120Z'
            }
        }
    },
    {
        input: {
            date: '2094-07-21T10:43:11.817Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.167330789897127,
                altitude: -0.16804071553888653
            },
            getTimes: {
                solarNoon: '2094-07-21T02:48:50.433Z',
                nadir: '2094-07-20T14:48:50.433Z',
                sunrise: '2094-07-20T19:39:25.430Z',
                sunset: '2094-07-21T09:58:15.437Z',
                sunriseEnd: '2094-07-20T19:42:21.414Z',
                sunsetStart: '2094-07-21T09:55:19.453Z',
                dawn: '2094-07-20T19:10:20.871Z',
                dusk: '2094-07-21T10:27:19.995Z',
                nauticalDawn: '2094-07-20T18:34:40.241Z',
                nauticalDusk: '2094-07-21T11:03:00.626Z',
                nightEnd: '2094-07-20T17:55:46.736Z',
                night: '2094-07-21T11:41:54.131Z',
                goldenHourEnd: '2094-07-20T20:16:17.262Z',
                goldenHour: '2094-07-21T09:21:23.605Z'
            },
            getMoonPosition: {
                azimuth: 0.4908758611338133,
                altitude: 0.6896663689752814,
                distance: 390833.50959067384,
                parallacticAngle: 0.400050627783349
            },
            getMoonIllumination: {
                fraction: 0.594564664024818,
                phase: 0.2802832698545884,
                angle: -1.2348504562820324
            },
            getMoonTimesUTC: {
                rise: '2094-07-21T03:28:14.767Z',
                set: '2094-07-21T14:52:41.220Z'
            },
            getMoonTimesNonUTC: {
                rise: '2094-07-21T03:28:14.767Z',
                set: '2094-07-21T14:52:41.220Z'
            }
        }
    },
    {
        input: {
            date: '2095-03-01T14:03:50.666Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 0.6036532799278594,
                altitude: 0.4738697309829435
            },
            getTimes: {
                solarNoon: '2095-03-01T12:04:39.389Z',
                nadir: '2095-03-01T00:04:39.389Z',
                sunrise: '2095-03-01T06:34:19.246Z',
                sunset: '2095-03-01T17:34:59.531Z',
                sunriseEnd: '2095-03-01T06:37:37.373Z',
                sunsetStart: '2095-03-01T17:31:41.404Z',
                dawn: '2095-03-01T06:02:36.016Z',
                dusk: '2095-03-01T18:06:42.761Z',
                nauticalDawn: '2095-03-01T05:26:05.644Z',
                nauticalDusk: '2095-03-01T18:43:13.133Z',
                nightEnd: '2095-03-01T04:49:25.900Z',
                night: '2095-03-01T19:19:52.877Z',
                goldenHourEnd: '2095-03-01T07:17:20.195Z',
                goldenHour: '2095-03-01T16:51:58.582Z'
            },
            getMoonPosition: {
                azimuth: 1.3015747819733807,
                altitude: -0.339580520478892,
                distance: 378155.9163546603,
                parallacticAngle: 0.7746182086512139
            },
            getMoonIllumination: {
                fraction: 0.2583425968505807,
                phase: 0.8302836721804516,
                angle: 1.4874385056434396
            },
            getMoonTimesUTC: {
                rise: '2095-03-01T03:35:29.123Z',
                set: '2095-03-01T11:42:57.361Z'
            },
            getMoonTimesNonUTC: {
                rise: '2095-03-01T03:35:29.225Z',
                set: '2095-03-01T11:43:07.759Z'
            }
        }
    },
    {
        input: {
            date: '2095-03-01T14:03:50.666Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 0.5508198889374535,
                altitude: 0.44871607523351126
            },
            getTimes: {
                solarNoon: '2095-03-01T12:13:34.519Z',
                nadir: '2095-03-01T00:13:34.519Z',
                sunrise: '2095-03-01T06:46:28.586Z',
                sunset: '2095-03-01T17:40:40.452Z',
                sunriseEnd: '2095-03-01T06:49:58.458Z',
                sunsetStart: '2095-03-01T17:37:10.579Z',
                dawn: '2095-03-01T06:12:55.255Z',
                dusk: '2095-03-01T18:14:13.783Z',
                nauticalDawn: '2095-03-01T05:34:19.956Z',
                nauticalDusk: '2095-03-01T18:52:49.081Z',
                nightEnd: '2095-03-01T04:55:29.791Z',
                night: '2095-03-01T19:31:39.246Z',
                goldenHourEnd: '2095-03-01T07:32:10.268Z',
                goldenHour: '2095-03-01T16:54:58.769Z'
            },
            getMoonPosition: {
                azimuth: 1.2899497422232684,
                altitude: -0.32814532538323476,
                distance: 378155.9163546603,
                parallacticAngle: 0.7201840449965861
            },
            getMoonIllumination: {
                fraction: 0.2583425968505807,
                phase: 0.8302836721804516,
                angle: 1.4874385056434396
            },
            getMoonTimesUTC: {
                rise: '2095-03-01T03:58:20.907Z',
                set: '2095-03-01T11:37:16.964Z'
            },
            getMoonTimesNonUTC: {
                rise: '2095-03-01T03:58:16.004Z',
                set: '2095-03-01T11:37:26.076Z'
            }
        }
    },
    {
        input: {
            date: '2095-03-01T14:03:50.666Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.604721604948799,
                altitude: -0.2530961852338372
            },
            getTimes: {
                solarNoon: '2095-03-01T07:18:05.621Z',
                nadir: '2095-02-28T19:18:05.621Z',
                sunrise: '2095-03-01T01:39:47.493Z',
                sunset: '2095-03-01T12:56:23.750Z',
                sunriseEnd: '2095-03-01T01:42:38.784Z',
                sunsetStart: '2095-03-01T12:53:32.458Z',
                dawn: '2095-03-01T01:12:17.337Z',
                dusk: '2095-03-01T13:23:53.906Z',
                nauticalDawn: '2095-03-01T00:40:35.004Z',
                nauticalDusk: '2095-03-01T13:55:36.239Z',
                nightEnd: '2095-03-01T00:08:52.785Z',
                night: '2095-03-01T14:27:18.458Z',
                goldenHourEnd: '2095-03-01T02:16:45.961Z',
                goldenHour: '2095-03-01T12:19:25.282Z'
            },
            getMoonPosition: {
                azimuth: 2.352296184788276,
                altitude: -1.2009722978288622,
                distance: 378155.9163546603,
                parallacticAngle: 0.6351791181159634
            },
            getMoonIllumination: {
                fraction: 0.2583425968505807,
                phase: 0.8302836721804516,
                angle: 1.4874385056434396
            },
            getMoonTimesUTC: {
                rise: '2095-03-01T23:01:09.860Z',
                set: '2095-03-01T07:19:52.040Z'
            },
            getMoonTimesNonUTC: {
                set: '2095-03-01T07:19:52.231Z'
            }
        }
    },
    {
        input: {
            date: '2095-03-01T14:03:50.666Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.7133318155258053,
                altitude: -1.0503606008269502
            },
            getTimes: {
                solarNoon: '2095-03-01T02:55:31.647Z',
                nadir: '2095-02-28T14:55:31.647Z',
                sunrise: '2095-02-28T21:13:11.857Z',
                sunset: '2095-03-01T08:37:51.436Z',
                sunriseEnd: '2095-02-28T21:15:51.448Z',
                sunsetStart: '2095-03-01T08:35:11.846Z',
                dawn: '2095-02-28T20:47:32.576Z',
                dusk: '2095-03-01T09:03:30.718Z',
                nauticalDawn: '2095-02-28T20:17:56.584Z',
                nauticalDusk: '2095-03-01T09:33:06.709Z',
                nightEnd: '2095-02-28T19:48:23.371Z',
                night: '2095-03-01T10:02:39.923Z',
                goldenHourEnd: '2095-02-28T21:47:33.967Z',
                goldenHour: '2095-03-01T08:03:29.327Z'
            },
            getMoonPosition: {
                azimuth: -1.5716232059542332,
                altitude: -0.8001962884732037,
                distance: 378155.9163546603,
                parallacticAngle: -1.1101845233350158
            },
            getMoonIllumination: {
                fraction: 0.2583425968505807,
                phase: 0.8302836721804516,
                angle: 1.4874385056434396
            },
            getMoonTimesUTC: {
                rise: '2095-03-01T18:11:37.332Z',
                set: '2095-03-01T03:04:38.392Z'
            },
            getMoonTimesNonUTC: {
                rise: '2095-03-01T18:11:28.233Z',
                set: '2095-03-01T03:04:32.156Z'
            }
        }
    },
    {
        input: {
            date: '2095-05-24T14:52:47.605Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.2194373032790529,
                altitude: 0.7558192178205752
            },
            getTimes: {
                solarNoon: '2095-05-24T11:48:47.205Z',
                nadir: '2095-05-23T23:48:47.205Z',
                sunrise: '2095-05-24T03:58:32.397Z',
                sunset: '2095-05-24T19:39:02.012Z',
                sunriseEnd: '2095-05-24T04:02:25.554Z',
                sunsetStart: '2095-05-24T19:35:08.855Z',
                dawn: '2095-05-24T03:18:48.053Z',
                dusk: '2095-05-24T20:18:46.356Z',
                nauticalDawn: '2095-05-24T02:25:04.554Z',
                nauticalDusk: '2095-05-24T21:12:29.855Z',
                nightEnd: '2095-05-24T01:08:27.254Z',
                night: '2095-05-24T22:29:07.155Z',
                goldenHourEnd: '2095-05-24T04:46:16.403Z',
                goldenHour: '2095-05-24T18:51:18.007Z'
            },
            getMoonPosition: {
                azimuth: 2.3820667461725913,
                altitude: -0.9992403975520732,
                distance: 372415.1488778622,
                parallacticAngle: 0.5124212477970265
            },
            getMoonIllumination: {
                fraction: 0.713913302469146,
                phase: 0.6796396947115194,
                angle: 1.3428021875358356
            },
            getMoonTimesUTC: {
                set: '2095-05-24T08:15:18.270Z'
            },
            getMoonTimesNonUTC: {
                rise: '2095-05-23T23:52:04.729Z',
                set: '2095-05-24T08:15:18.270Z'
            }
        }
    },
    {
        input: {
            date: '2095-05-24T14:52:47.605Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.1400007060454171,
                altitude: 0.7612406009105603
            },
            getTimes: {
                solarNoon: '2095-05-24T11:57:42.438Z',
                nadir: '2095-05-23T23:57:42.438Z',
                sunrise: '2095-05-24T03:55:51.291Z',
                sunset: '2095-05-24T19:59:33.584Z',
                sunriseEnd: '2095-05-24T04:00:04.527Z',
                sunsetStart: '2095-05-24T19:55:20.349Z',
                dawn: '2095-05-24T03:12:06.209Z',
                dusk: '2095-05-24T20:43:18.666Z',
                nauticalDawn: '2095-05-24T02:09:46.004Z',
                nauticalDusk: '2095-05-24T21:45:38.871Z',
                nightEnd: null,
                night: null,
                goldenHourEnd: '2095-05-24T04:47:14.463Z',
                goldenHour: '2095-05-24T19:08:10.412Z'
            },
            getMoonPosition: {
                azimuth: 2.3731392125839643,
                altitude: -0.9485997376939934,
                distance: 372415.1488778622,
                parallacticAngle: 0.4872156997794765
            },
            getMoonIllumination: {
                fraction: 0.713913302469146,
                phase: 0.6796396947115194,
                angle: 1.3428021875358356
            },
            getMoonTimesUTC: {
                rise: '2095-05-24T00:15:03.235Z',
                set: '2095-05-24T08:11:27.694Z'
            },
            getMoonTimesNonUTC: {
                rise: '2095-05-24T00:15:03.235Z',
                set: '2095-05-24T08:11:27.694Z'
            }
        }
    },
    {
        input: {
            date: '2095-05-24T14:52:47.605Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 2.1670121670683606,
                altitude: -0.10973048027331689
            },
            getTimes: {
                solarNoon: '2095-05-24T07:02:10.148Z',
                nadir: '2095-05-23T19:02:10.148Z',
                sunrise: '2095-05-23T23:39:56.474Z',
                sunset: '2095-05-24T14:24:23.822Z',
                sunriseEnd: '2095-05-23T23:43:08.403Z',
                sunsetStart: '2095-05-24T14:21:11.893Z',
                dawn: '2095-05-23T23:07:59.230Z',
                dusk: '2095-05-24T14:56:21.065Z',
                nauticalDawn: '2095-05-23T22:27:55.532Z',
                nauticalDusk: '2095-05-24T15:36:24.763Z',
                nightEnd: '2095-05-23T21:42:21.021Z',
                night: '2095-05-24T16:21:59.274Z',
                goldenHourEnd: '2095-05-24T00:19:54.254Z',
                goldenHour: '2095-05-24T13:44:26.041Z'
            },
            getMoonPosition: {
                azimuth: -1.7320599750821215,
                altitude: -0.7895532893406674,
                distance: 372415.1488778622,
                parallacticAngle: -0.9434398686017118
            },
            getMoonIllumination: {
                fraction: 0.713913302469146,
                phase: 0.6796396947115194,
                angle: 1.3428021875358356
            },
            getMoonTimesUTC: {
                rise: '2095-05-24T19:08:54.754Z',
                set: '2095-05-24T03:47:19.085Z'
            },
            getMoonTimesNonUTC: {
                rise: '2095-05-24T19:08:54.754Z',
                set: '2095-05-24T03:47:19.085Z'
            }
        }
    },
    {
        input: {
            date: '2095-05-24T14:52:47.605Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -3.059668506511091,
                altitude: -0.5864746268417335
            },
            getTimes: {
                solarNoon: '2095-05-25T02:39:38.606Z',
                nadir: '2095-05-24T14:39:38.606Z',
                sunrise: '2095-05-24T19:30:17.028Z',
                sunset: '2095-05-25T09:49:00.184Z',
                sunriseEnd: '2095-05-24T19:33:12.980Z',
                sunsetStart: '2095-05-25T09:46:04.232Z',
                dawn: '2095-05-24T19:01:12.835Z',
                dusk: '2095-05-25T10:18:04.378Z',
                nauticalDawn: '2095-05-24T18:25:32.790Z',
                nauticalDusk: '2095-05-25T10:53:44.422Z',
                nightEnd: '2095-05-24T17:46:40.189Z',
                night: '2095-05-25T11:32:37.023Z',
                goldenHourEnd: '2095-05-24T20:07:08.502Z',
                goldenHour: '2095-05-25T09:12:08.710Z'
            },
            getMoonPosition: {
                azimuth: -1.012096186917402,
                altitude: 0.08404221146555574,
                distance: 372415.1488778622,
                parallacticAngle: -0.8411191155709691
            },
            getMoonIllumination: {
                fraction: 0.713913302469146,
                phase: 0.6796396947115194,
                angle: 1.3428021875358356
            },
            getMoonTimesUTC: {
                rise: '2095-05-24T14:24:20.406Z'
            },
            getMoonTimesNonUTC: {
                rise: '2095-05-24T14:24:20.406Z',
                set: '2095-05-23T23:27:51.677Z'
            }
        }
    },
    {
        input: {
            date: '2096-11-15T05:50:43.754Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.3005917305808117,
                altitude: -0.18968522158303736
            },
            getTimes: {
                solarNoon: '2096-11-15T11:36:32.363Z',
                nadir: '2096-11-14T23:36:32.363Z',
                sunrise: '2096-11-15T06:57:53.609Z',
                sunset: '2096-11-15T16:15:11.116Z',
                sunriseEnd: '2096-11-15T07:01:32.722Z',
                sunsetStart: '2096-11-15T16:11:32.003Z',
                dawn: '2096-11-15T06:23:30.388Z',
                dusk: '2096-11-15T16:49:34.337Z',
                nauticalDawn: '2096-11-15T05:45:16.323Z',
                nauticalDusk: '2096-11-15T17:27:48.403Z',
                nightEnd: '2096-11-15T05:08:08.923Z',
                night: '2096-11-15T18:04:55.802Z',
                goldenHourEnd: '2096-11-15T07:46:48.677Z',
                goldenHour: '2096-11-15T15:26:16.048Z'
            },
            getMoonPosition: {
                azimuth: -1.3365173008905007,
                altitude: -0.24557717989774075,
                distance: 405604.6643927716,
                parallacticAngle: -0.7475498951330904
            },
            getMoonIllumination: {
                fraction: 0.0013484734404669019,
                phase: 0.011691466238100079,
                angle: -1.250385253162556
            },
            getMoonTimesUTC: {
                rise: '2096-11-15T07:29:26.294Z',
                set: '2096-11-15T16:24:28.030Z'
            },
            getMoonTimesNonUTC: {
                rise: '2096-11-15T07:29:31.793Z',
                set: '2096-11-15T16:24:26.553Z'
            }
        }
    },
    {
        input: {
            date: '2096-11-15T05:50:43.754Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.3386205437178968,
                altitude: -0.2253297656320456
            },
            getTimes: {
                solarNoon: '2096-11-15T11:45:27.628Z',
                nadir: '2096-11-14T23:45:27.628Z',
                sunrise: '2096-11-15T07:15:36.166Z',
                sunset: '2096-11-15T16:15:19.091Z',
                sunriseEnd: '2096-11-15T07:19:31.439Z',
                sunsetStart: '2096-11-15T16:11:23.817Z',
                dawn: '2096-11-15T06:38:52.643Z',
                dusk: '2096-11-15T16:52:02.613Z',
                nauticalDawn: '2096-11-15T05:58:19.805Z',
                nauticalDusk: '2096-11-15T17:32:35.451Z',
                nightEnd: '2096-11-15T05:19:06.144Z',
                night: '2096-11-15T18:11:49.112Z',
                goldenHourEnd: '2096-11-15T08:08:38.225Z',
                goldenHour: '2096-11-15T15:22:17.032Z'
            },
            getMoonPosition: {
                azimuth: -1.37751189830032,
                altitude: -0.2797536357445537,
                distance: 405604.6643927716,
                parallacticAngle: -0.7061366441008271
            },
            getMoonIllumination: {
                fraction: 0.0013484734404669019,
                phase: 0.011691466238100079,
                angle: -1.250385253162556
            },
            getMoonTimesUTC: {
                rise: '2096-11-15T07:49:29.676Z',
                set: '2096-11-15T16:22:03.690Z'
            },
            getMoonTimesNonUTC: {
                rise: '2096-11-15T07:49:17.444Z',
                set: '2096-11-15T16:22:05.831Z'
            }
        }
    },
    {
        input: {
            date: '2096-11-15T05:50:43.754Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -0.2656502747234894,
                altitude: 0.5159042655248327
            },
            getTimes: {
                solarNoon: '2096-11-15T06:49:54.272Z',
                nadir: '2096-11-14T18:49:54.272Z',
                sunrise: '2096-11-15T01:49:23.718Z',
                sunset: '2096-11-15T11:50:24.825Z',
                sunriseEnd: '2096-11-15T01:52:27.979Z',
                sunsetStart: '2096-11-15T11:47:20.565Z',
                dawn: '2096-11-15T01:20:09.824Z',
                dusk: '2096-11-15T12:19:38.719Z',
                nauticalDawn: '2096-11-15T00:47:10.650Z',
                nauticalDusk: '2096-11-15T12:52:37.893Z',
                nightEnd: '2096-11-15T00:14:53.362Z',
                night: '2096-11-15T13:24:55.181Z',
                goldenHourEnd: '2096-11-15T02:29:47.890Z',
                goldenHour: '2096-11-15T11:10:00.653Z'
            },
            getMoonPosition: {
                azimuth: -0.3356826835104867,
                altitude: 0.476785966000203,
                distance: 405604.6643927716,
                parallacticAngle: -0.26843684093987336
            },
            getMoonIllumination: {
                fraction: 0.0013484734404669019,
                phase: 0.011691466238100079,
                angle: -1.250385253162556
            },
            getMoonTimesUTC: {
                rise: '2096-11-15T02:03:42.234Z',
                set: '2096-11-15T12:00:44.161Z'
            },
            getMoonTimesNonUTC: {
                rise: '2096-11-15T02:03:38.779Z',
                set: '2096-11-15T12:00:45.712Z'
            }
        }
    },
    {
        input: {
            date: '2096-11-15T05:50:43.754Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 0.8943365391126633,
                altitude: 0.2986905776027501
            },
            getTimes: {
                solarNoon: '2096-11-15T02:27:16.384Z',
                nadir: '2096-11-14T14:27:16.384Z',
                sunrise: '2096-11-14T21:15:54.755Z',
                sunset: '2096-11-15T07:38:38.014Z',
                sunriseEnd: '2096-11-14T21:18:44.614Z',
                sunsetStart: '2096-11-15T07:35:48.154Z',
                dawn: '2096-11-14T20:48:51.088Z',
                dusk: '2096-11-15T08:05:41.680Z',
                nauticalDawn: '2096-11-14T20:18:07.734Z',
                nauticalDusk: '2096-11-15T08:36:25.034Z',
                nightEnd: '2096-11-14T19:47:56.785Z',
                night: '2096-11-15T09:06:35.984Z',
                goldenHourEnd: '2096-11-14T21:52:54.883Z',
                goldenHour: '2096-11-15T07:01:37.885Z'
            },
            getMoonPosition: {
                azimuth: 0.8227168484601308,
                altitude: 0.3264180933713646,
                distance: 405604.6643927716,
                parallacticAngle: 0.6847699362391806
            },
            getMoonIllumination: {
                fraction: 0.0013484734404669019,
                phase: 0.011691466238100079,
                angle: -1.250385253162556
            },
            getMoonTimesUTC: {
                rise: '2096-11-15T22:17:36.536Z',
                set: '2096-11-15T07:44:48.262Z'
            },
            getMoonTimesNonUTC: {
                rise: '2096-11-15T22:17:25.641Z',
                set: '2096-11-15T07:44:59.173Z'
            }
        }
    },
    {
        input: {
            date: '2096-12-24T14:34:49.490Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 0.6660986038674761,
                altitude: 0.15186366757464598
            },
            getTimes: {
                solarNoon: '2096-12-24T11:51:12.306Z',
                nadir: '2096-12-23T23:51:12.306Z',
                sunrise: '2096-12-24T07:41:11.194Z',
                sunset: '2096-12-24T16:01:13.418Z',
                sunriseEnd: '2096-12-24T07:45:11.098Z',
                sunsetStart: '2096-12-24T15:57:13.514Z',
                dawn: '2096-12-24T07:04:05.504Z',
                dusk: '2096-12-24T16:38:19.108Z',
                nauticalDawn: '2096-12-24T06:23:46.578Z',
                nauticalDusk: '2096-12-24T17:18:38.035Z',
                nightEnd: '2096-12-24T05:45:21.166Z',
                night: '2096-12-24T17:57:03.446Z',
                goldenHourEnd: '2096-12-24T08:36:04.546Z',
                goldenHour: '2096-12-24T15:06:20.066Z'
            },
            getMoonPosition: {
                azimuth: -1.489214088747444,
                altitude: 0.31209754315328636,
                distance: 367971.37897457735,
                parallacticAngle: -0.7297378073931197
            },
            getMoonIllumination: {
                fraction: 0.7374150604295784,
                phase: 0.328745249421988,
                angle: -1.9397581251638418
            },
            getMoonTimesUTC: {
                rise: '2096-12-24T12:42:35.430Z',
                set: '2096-12-24T01:41:26.337Z'
            },
            getMoonTimesNonUTC: {
                rise: '2096-12-24T12:42:37.959Z',
                set: '2096-12-24T01:41:37.124Z'
            }
        }
    },
    {
        input: {
            date: '2096-12-24T14:34:49.490Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 0.629416591375081,
                altitude: 0.13002440892503203
            },
            getTimes: {
                solarNoon: '2096-12-24T12:00:07.685Z',
                nadir: '2096-12-24T00:00:07.685Z',
                sunrise: '2096-12-24T08:02:25.092Z',
                sunset: '2096-12-24T15:57:50.278Z',
                sunriseEnd: '2096-12-24T08:06:46.646Z',
                sunsetStart: '2096-12-24T15:53:28.724Z',
                dawn: '2096-12-24T07:22:21.461Z',
                dusk: '2096-12-24T16:37:53.909Z',
                nauticalDawn: '2096-12-24T06:39:21.407Z',
                nauticalDusk: '2096-12-24T17:20:53.964Z',
                nightEnd: '2096-12-24T05:58:39.971Z',
                night: '2096-12-24T18:01:35.400Z',
                goldenHourEnd: '2096-12-24T09:03:23.953Z',
                goldenHour: '2096-12-24T14:56:51.417Z'
            },
            getMoonPosition: {
                azimuth: -1.5055530972517466,
                altitude: 0.2839307485542733,
                distance: 367971.37897457735,
                parallacticAngle: -0.6834193895104113
            },
            getMoonIllumination: {
                fraction: 0.7374150604295784,
                phase: 0.328745249421988,
                angle: -1.9397581251638418
            },
            getMoonTimesUTC: {
                rise: '2096-12-24T12:46:41.479Z',
                set: '2096-12-24T01:54:56.726Z'
            },
            getMoonTimesNonUTC: {
                rise: '2096-12-24T12:46:48.936Z',
                set: '2096-12-24T01:55:01.913Z'
            }
        }
    },
    {
        input: {
            date: '2096-12-24T14:34:49.490Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.495202448800823,
                altitude: -0.5648815564248608
            },
            getTimes: {
                solarNoon: '2096-12-24T07:04:30.556Z',
                nadir: '2096-12-23T19:04:30.556Z',
                sunrise: '2096-12-24T02:24:48.464Z',
                sunset: '2096-12-24T11:44:12.648Z',
                sunriseEnd: '2096-12-24T02:28:04.770Z',
                sunsetStart: '2096-12-24T11:40:56.342Z',
                dawn: '2096-12-24T01:53:54.932Z',
                dusk: '2096-12-24T12:15:06.180Z',
                nauticalDawn: '2096-12-24T01:19:30.735Z',
                nauticalDusk: '2096-12-24T12:49:30.377Z',
                nightEnd: '2096-12-24T00:46:13.309Z',
                night: '2096-12-24T13:22:47.803Z',
                goldenHourEnd: '2096-12-24T03:08:21.511Z',
                goldenHour: '2096-12-24T11:00:39.601Z'
            },
            getMoonPosition: {
                azimuth: -0.10270329495542029,
                altitude: 1.0388825340629917,
                distance: 367971.37897457735,
                parallacticAngle: -0.07908014395741342
            },
            getMoonIllumination: {
                fraction: 0.7374150604295784,
                phase: 0.328745249421988,
                angle: -1.9397581251638418
            },
            getMoonTimesUTC: {
                rise: '2096-12-24T08:01:41.129Z',
                set: '2096-12-24T21:45:48.169Z'
            },
            getMoonTimesNonUTC: {
                rise: '2096-12-24T08:01:38.985Z',
                set: '2096-12-24T21:45:59.630Z'
            }
        }
    },
    {
        input: {
            date: '2096-12-24T14:34:49.490Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 3.068704511866482,
                altitude: -1.3565319553561248
            },
            getTimes: {
                solarNoon: '2096-12-24T02:41:49.287Z',
                nadir: '2096-12-23T14:41:49.287Z',
                sunrise: '2096-12-23T21:47:41.108Z',
                sunset: '2096-12-24T07:35:57.466Z',
                sunriseEnd: '2096-12-23T21:50:40.384Z',
                sunsetStart: '2096-12-24T07:32:58.189Z',
                dawn: '2096-12-23T21:19:17.459Z',
                dusk: '2096-12-24T08:04:21.114Z',
                nauticalDawn: '2096-12-23T20:47:22.176Z',
                nauticalDusk: '2096-12-24T08:36:16.397Z',
                nightEnd: '2096-12-23T20:16:16.876Z',
                night: '2096-12-24T09:07:21.698Z',
                goldenHourEnd: '2096-12-23T22:27:03.554Z',
                goldenHour: '2096-12-24T06:56:35.020Z'
            },
            getMoonPosition: {
                azimuth: 1.4365478911287872,
                altitude: 0.4923644260006998,
                distance: 367971.37897457735,
                parallacticAngle: 0.9585756945588784
            },
            getMoonIllumination: {
                fraction: 0.7374150604295784,
                phase: 0.328745249421988,
                angle: -1.9397581251638418
            },
            getMoonTimesUTC: {
                rise: '2096-12-24T03:39:37.918Z',
                set: '2096-12-24T17:03:03.357Z'
            },
            getMoonTimesNonUTC: {
                rise: '2096-12-24T03:39:44.014Z',
                set: '2096-12-24T17:02:58.386Z'
            }
        }
    },
    {
        input: {
            date: '2097-03-28T06:28:45.798Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.4866804021365336,
                altitude: 0.13498103617244298
            },
            getTimes: {
                solarNoon: '2097-03-28T11:57:04.282Z',
                nadir: '2097-03-27T23:57:04.282Z',
                sunrise: '2097-03-28T05:37:14.914Z',
                sunset: '2097-03-28T18:16:53.650Z',
                sunriseEnd: '2097-03-28T05:40:30.128Z',
                sunsetStart: '2097-03-28T18:13:38.436Z',
                dawn: '2097-03-28T05:05:28.302Z',
                dusk: '2097-03-28T18:48:40.262Z',
                nauticalDawn: '2097-03-28T04:27:38.447Z',
                nauticalDusk: '2097-03-28T19:26:30.117Z',
                nightEnd: '2097-03-28T03:47:58.649Z',
                night: '2097-03-28T20:06:09.915Z',
                goldenHourEnd: '2097-03-28T06:18:50.020Z',
                goldenHour: '2097-03-28T17:35:18.544Z'
            },
            getMoonPosition: {
                azimuth: 1.5478809540122616,
                altitude: -0.036079429640300614,
                distance: 391547.3798151958,
                parallacticAngle: 0.7190065668670114
            },
            getMoonIllumination: {
                fraction: 0.9951488192139153,
                phase: 0.5221883814550904,
                angle: 1.5819894144192714
            },
            getMoonTimesUTC: {
                rise: '2097-03-28T19:12:59.189Z',
                set: '2097-03-28T06:14:15.356Z'
            },
            getMoonTimesNonUTC: {
                rise: '2097-03-28T19:13:08.370Z',
                set: '2097-03-28T06:14:19.549Z'
            }
        }
    },
    {
        input: {
            date: '2097-03-28T06:28:45.798Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.5111943428414731,
                altitude: 0.10679254044672366
            },
            getTimes: {
                solarNoon: '2097-03-28T12:05:59.365Z',
                nadir: '2097-03-28T00:05:59.365Z',
                sunrise: '2097-03-28T05:44:29.587Z',
                sunset: '2097-03-28T18:27:29.143Z',
                sunriseEnd: '2097-03-28T05:47:56.058Z',
                sunsetStart: '2097-03-28T18:24:02.672Z',
                dawn: '2097-03-28T05:10:50.244Z',
                dusk: '2097-03-28T19:01:08.486Z',
                nauticalDawn: '2097-03-28T04:30:34.002Z',
                nauticalDusk: '2097-03-28T19:41:24.728Z',
                nightEnd: '2097-03-28T03:47:53.280Z',
                night: '2097-03-28T20:24:05.450Z',
                goldenHourEnd: '2097-03-28T06:28:27.467Z',
                goldenHour: '2097-03-28T17:43:31.263Z'
            },
            getMoonPosition: {
                azimuth: 1.5195329665939439,
                altitude: -0.012879078920221474,
                distance: 391547.3798151958,
                parallacticAngle: 0.6718458473529394
            },
            getMoonIllumination: {
                fraction: 0.9951488192139153,
                phase: 0.5221883814550904,
                angle: 1.5819894144192714
            },
            getMoonTimesUTC: {
                rise: '2097-03-28T19:25:26.368Z',
                set: '2097-03-28T06:22:04.679Z'
            },
            getMoonTimesNonUTC: {
                rise: '2097-03-28T19:25:34.452Z',
                set: '2097-03-28T06:22:03.120Z'
            }
        }
    },
    {
        input: {
            date: '2097-03-28T06:28:45.798Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -0.26893119488658246,
                altitude: 0.8896686399662582
            },
            getTimes: {
                solarNoon: '2097-03-28T07:10:32.046Z',
                nadir: '2097-03-27T19:10:32.046Z',
                sunrise: '2097-03-28T00:55:04.269Z',
                sunset: '2097-03-28T13:25:59.823Z',
                sunriseEnd: '2097-03-28T00:57:53.506Z',
                sunsetStart: '2097-03-28T13:23:10.586Z',
                dawn: '2097-03-28T00:27:36.286Z',
                dusk: '2097-03-28T13:53:27.806Z',
                nauticalDawn: '2097-03-27T23:55:14.857Z',
                nauticalDusk: '2097-03-28T14:25:49.235Z',
                nightEnd: '2097-03-27T23:22:02.083Z',
                night: '2097-03-28T14:59:02.009Z',
                goldenHourEnd: '2097-03-28T01:31:09.498Z',
                goldenHour: '2097-03-28T12:49:54.594Z'
            },
            getMoonPosition: {
                azimuth: 2.662967988608984,
                altitude: -0.8443688933456434,
                distance: 391547.3798151958,
                parallacticAngle: 0.3570648396671084
            },
            getMoonIllumination: {
                fraction: 0.9951488192139153,
                phase: 0.5221883814550904,
                angle: 1.5819894144192714
            },
            getMoonTimesUTC: {
                rise: '2097-03-28T14:06:55.044Z',
                set: '2097-03-28T01:26:08.749Z'
            },
            getMoonTimesNonUTC: {
                rise: '2097-03-28T14:06:48.559Z',
                set: '2097-03-28T01:26:17.870Z'
            }
        }
    },
    {
        input: {
            date: '2097-03-28T06:28:45.798Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 1.2363193907536851,
                altitude: 0.5016063216318872
            },
            getTimes: {
                solarNoon: '2097-03-28T02:47:59.496Z',
                nadir: '2097-03-27T14:47:59.496Z',
                sunrise: '2097-03-27T20:34:41.078Z',
                sunset: '2097-03-28T09:01:17.914Z',
                sunriseEnd: '2097-03-27T20:37:18.899Z',
                sunsetStart: '2097-03-28T08:58:40.093Z',
                dawn: '2097-03-27T20:09:06.113Z',
                dusk: '2097-03-28T09:26:52.879Z',
                nauticalDawn: '2097-03-27T19:39:05.261Z',
                nauticalDusk: '2097-03-28T09:56:53.731Z',
                nightEnd: '2097-03-27T19:08:31.307Z',
                night: '2097-03-28T10:27:27.685Z',
                goldenHourEnd: '2097-03-27T21:08:21.125Z',
                goldenHour: '2097-03-28T08:27:37.867Z'
            },
            getMoonPosition: {
                azimuth: -2.0118118285810853,
                altitude: -0.5997274216947073,
                distance: 391547.3798151958,
                parallacticAngle: -0.82644408245203
            },
            getMoonIllumination: {
                fraction: 0.9951488192139153,
                phase: 0.5221883814550904,
                angle: 1.5819894144192714
            },
            getMoonTimesUTC: {
                rise: '2097-03-28T09:31:09.926Z',
                set: '2097-03-28T21:25:02.678Z'
            },
            getMoonTimesNonUTC: {
                rise: '2097-03-28T09:31:20.828Z',
                set: '2097-03-28T21:25:12.816Z'
            }
        }
    },
    {
        input: {
            date: '2098-05-04T04:16:14.162Z',
            lat: 48.85,
            lon: 2.35,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.0404718270205358,
                altitude: -0.037582736229323836
            },
            getTimes: {
                solarNoon: '2098-05-04T11:48:42.303Z',
                nadir: '2098-05-03T23:48:42.303Z',
                sunrise: '2098-05-04T04:25:39.274Z',
                sunset: '2098-05-04T19:11:45.332Z',
                sunriseEnd: '2098-05-04T04:29:14.589Z',
                sunsetStart: '2098-05-04T19:08:10.016Z',
                dawn: '2098-05-04T03:49:37.628Z',
                dusk: '2098-05-04T19:47:46.977Z',
                nauticalDawn: '2098-05-04T03:03:38.307Z',
                nauticalDusk: '2098-05-04T20:33:46.299Z',
                nightEnd: '2098-05-04T02:08:47.896Z',
                night: '2098-05-04T21:28:36.710Z',
                goldenHourEnd: '2098-05-04T05:10:22.356Z',
                goldenHour: '2098-05-04T18:27:02.250Z'
            },
            getMoonPosition: {
                azimuth: -2.684552217861574,
                altitude: -0.1529047600938508,
                distance: 369182.24615929835,
                parallacticAngle: -0.3335466533939599
            },
            getMoonIllumination: {
                fraction: 0.1030835600117142,
                phase: 0.1040412311001061,
                angle: -1.7533617636645376
            },
            getMoonTimesUTC: {
                rise: '2098-05-04T05:53:03.924Z',
                set: '2098-05-04T23:42:02.984Z'
            },
            getMoonTimesNonUTC: {
                rise: '2098-05-04T05:53:03.924Z',
                set: '2098-05-03T22:29:09.657Z'
            }
        }
    },
    {
        input: {
            date: '2098-05-04T04:16:14.162Z',
            lat: 51.5,
            lon: 0.12,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -2.072360579519251,
                altitude: -0.03804422654086442
            },
            getTimes: {
                solarNoon: '2098-05-04T11:57:37.471Z',
                nadir: '2098-05-03T23:57:37.471Z',
                sunrise: '2098-05-04T04:26:15.925Z',
                sunset: '2098-05-04T19:28:59.017Z',
                sunriseEnd: '2098-05-04T04:30:06.723Z',
                sunsetStart: '2098-05-04T19:25:08.218Z',
                dawn: '2098-05-04T03:47:21.576Z',
                dusk: '2098-05-04T20:07:53.365Z',
                nauticalDawn: '2098-05-04T02:56:28.756Z',
                nauticalDusk: '2098-05-04T20:58:46.185Z',
                nightEnd: '2098-05-04T01:51:29.909Z',
                night: '2098-05-04T22:03:45.033Z',
                goldenHourEnd: '2098-05-04T05:13:57.104Z',
                goldenHour: '2098-05-04T18:41:17.837Z'
            },
            getMoonPosition: {
                azimuth: -2.72065052377836,
                altitude: -0.12163612728548757,
                distance: 369182.24615929835,
                parallacticAngle: -0.2908770061722376
            },
            getMoonIllumination: {
                fraction: 0.1030835600117142,
                phase: 0.1040412311001061,
                angle: -1.7533617636645376
            },
            getMoonTimesUTC: {
                rise: '2098-05-04T05:44:28.789Z'
            },
            getMoonTimesNonUTC: {
                rise: '2098-05-04T05:44:28.789Z',
                set: '2098-05-03T22:57:38.777Z'
            }
        }
    },
    {
        input: {
            date: '2098-05-04T04:16:14.162Z',
            lat: 40.71,
            lon: 74,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: -1.1609781400930765,
                altitude: 0.8177396664896572
            },
            getTimes: {
                solarNoon: '2098-05-04T07:02:07.349Z',
                nadir: '2098-05-03T19:02:07.349Z',
                sunrise: '2098-05-03T23:59:36.843Z',
                sunset: '2098-05-04T14:04:37.855Z',
                sunriseEnd: '2098-05-04T00:02:38.476Z',
                sunsetStart: '2098-05-04T14:01:36.222Z',
                dawn: '2098-05-03T23:29:39.089Z',
                dusk: '2098-05-04T14:34:35.609Z',
                nauticalDawn: '2098-05-03T22:52:59.024Z',
                nauticalDusk: '2098-05-04T15:11:15.674Z',
                nightEnd: '2098-05-03T22:13:06.337Z',
                night: '2098-05-04T15:51:08.361Z',
                goldenHourEnd: '2098-05-04T00:37:44.176Z',
                goldenHour: '2098-05-04T13:26:30.522Z'
            },
            getMoonPosition: {
                azimuth: -1.8388668186329329,
                altitude: 0.4453590671115102,
                distance: 369182.24615929835,
                parallacticAngle: -0.9686247288313876
            },
            getMoonIllumination: {
                fraction: 0.1030835600117142,
                phase: 0.1040412311001061,
                angle: -1.7533617636645376
            },
            getMoonTimesUTC: {
                rise: '2098-05-04T01:38:41.235Z',
                set: '2098-05-04T17:58:40.578Z'
            },
            getMoonTimesNonUTC: {
                rise: '2098-05-04T01:38:41.235Z',
                set: '2098-05-04T17:58:40.578Z'
            }
        }
    },
    {
        input: {
            date: '2098-05-04T04:16:14.162Z',
            lat: 35.67,
            lon: 139.65,
            elv: 100
        },
        output: {
            getPosition: {
                azimuth: 0.9516851094119784,
                altitude: 1.0472642096205966
            },
            getTimes: {
                solarNoon: '2098-05-04T02:39:32.327Z',
                nadir: '2098-05-03T14:39:32.327Z',
                sunrise: '2098-05-03T19:47:06.682Z',
                sunset: '2098-05-04T09:31:57.971Z',
                sunriseEnd: '2098-05-03T19:49:54.287Z',
                sunsetStart: '2098-05-04T09:29:10.366Z',
                dawn: '2098-05-03T19:19:36.484Z',
                dusk: '2098-05-04T09:59:28.169Z',
                nauticalDawn: '2098-05-03T18:46:25.832Z',
                nauticalDusk: '2098-05-04T10:32:38.822Z',
                nightEnd: '2098-05-03T18:11:16.369Z',
                night: '2098-05-04T11:07:48.285Z',
                goldenHourEnd: '2098-05-03T20:22:26.147Z',
                goldenHour: '2098-05-04T08:56:38.506Z'
            },
            getMoonPosition: {
                azimuth: -1.0096503967141235,
                altitude: 1.3276775646272225,
                distance: 369182.24615929835,
                parallacticAngle: -0.8874558898844119
            },
            getMoonIllumination: {
                fraction: 0.1030835600117142,
                phase: 0.1040412311001061,
                angle: -1.7533617636645376
            },
            getMoonTimesUTC: {
                rise: '2098-05-04T22:23:00.502Z',
                set: '2098-05-04T13:03:16.884Z'
            },
            getMoonTimesNonUTC: {
                set: '2098-05-04T13:03:16.884Z'
            }
        }
    }
];
