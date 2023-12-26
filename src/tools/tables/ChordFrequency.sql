CREATE TABLE IF NOT EXISTS `ChordFrequency` (
    `url` varchar(400) NOT NULL,
    `count` int NOT NULL,
    `lastAccessDateUnix` int(11) unsigned NOT NULL,
    PRIMARY KEY (`url`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
