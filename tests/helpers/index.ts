import { testHelper_ELK } from './elk';
import { testHelper_Mysql } from './mysql';
import { testHelper_SlackNotifier } from './notifier/slack';
import { testHelper_S3 } from './s3';
import { testHelper_Slog } from './slog';
import { testHelper_Time } from './time';

export const th = {
    elk: testHelper_ELK,
    mysql: testHelper_Mysql,
    s3: testHelper_S3,
    slack: testHelper_SlackNotifier,
    slog: testHelper_Slog,
    time: testHelper_Time
};
