CREATE TABLE IF NOT EXISTS `HomeTrackerSensor` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(50) NOT NULL,
    `lastSyncDateUnix` int(11) unsigned NOT NULL default 0,
    `hexColor`varchar(10) NOT NULL default "#FF00FF",
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- INSERT INTO HomeTrackerSensor (name, hexColor)
-- VALUES
-- ( 'salon', '#8C003C' ),
-- ( 'chambre', '#005095' ),
-- ( 'jardiniere', '#008c00' ),
-- ( 'sdb', '#6E6E14' )
-- ON DUPLICATE KEY UPDATE name = name;
