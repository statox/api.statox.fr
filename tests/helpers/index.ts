import { testHelper_ELK } from './elk';
import { testHelper_SlackNotifier } from './notifier/slack';
import { testHelper_S3 } from './s3';
import { testHelper_Slog } from './slog';

export const th = {
    elk: testHelper_ELK,
    s3: testHelper_S3,
    slack: testHelper_SlackNotifier,
    slog: testHelper_Slog
};
