CREATE TABLE IF NOT EXISTS `HomeTrackerSensor` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(50) NOT NULL,
    `lastSyncDateUnix` int(11) unsigned NOT NULL default 0,
    `hexColor`varchar(10) NOT NULL default "#FF00FF",
    `isMonitored` tinyint NOT NULL DEFAULT 0,
    `lastAlertDateUnix` int(11) unsigned default null,
    `tempOffset` float default 0.0,
    `sleepTimeSec` int(5) default 596, -- The default if 10 minutes minutes 4 seconds to try to reduce drift due to sensors restarting
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- INSERT INTO HomeTrackerSensor (name, hexColor, isMonitored)
-- VALUES
-- ( 'salon', '#8C003C', 1 ),
-- ( 'chambre', '#005095', 1 ),
-- ( 'jardiniere', '#008c00', 1 ),
-- ( 'sdb', '#6E6E14', 1 ),
-- ( 'colonne', '#b4b4c1', 1 )
-- ON DUPLICATE KEY UPDATE name = name;
