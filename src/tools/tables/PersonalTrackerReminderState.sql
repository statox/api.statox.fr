CREATE TABLE IF NOT EXISTS `PersonalTrackerReminderState` (
    `userId` int(11) NOT NULL,
    `lastReminderDateUnix` int(11) unsigned NOT NULL,
    PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
