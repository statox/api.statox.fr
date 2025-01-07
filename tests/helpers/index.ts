import { testHelper_ELK } from './elk/index.js';
import { testHelper_Mysql } from './mysql/index.js';
import { testHelper_PushNotifier } from './notifier/push.js';
import { testHelper_SlackNotifier } from './notifier/slack.js';
import { testHelper_S3 } from './s3/index.js';
import { testHelper_Slog } from './slog/index.js';
import { testHelper_Time } from './time/index.js';

export const th = {
    elk: testHelper_ELK,
    mysql: testHelper_Mysql,
    s3: testHelper_S3,
    slack: testHelper_SlackNotifier,
    push: testHelper_PushNotifier,
    slog: testHelper_Slog,
    time: testHelper_Time
};
