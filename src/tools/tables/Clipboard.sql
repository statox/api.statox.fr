CREATE TABLE IF NOT EXISTS `Clipboard` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(400) NOT NULL,
    `content`varchar(400) NOT NULL,
    `creationDateUnix` int(11) unsigned NOT NULL,
    `ttl` int(11) NOT NULL,
    `isPublic` tinyint NOT NULL DEFAULT 0,
    `linkId` varchar(16) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `name_uniq` (`name`),
    UNIQUE KEY `linkId_uniq` (`linkId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
