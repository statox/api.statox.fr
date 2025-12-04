CREATE TABLE IF NOT EXISTS `PersonalTracker` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `eventDateUnix` int(11) unsigned NOT NULL,
    `type` varchar(100) NOT NULL,
    `value`int(10),
    `data` json NOT NULL DEFAULT (JSON_OBJECT()),
    PRIMARY KEY (`id`),
    UNIQUE KEY `type_date_uniq` (`type`, `eventDateUnix`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
