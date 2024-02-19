CREATE TABLE IF NOT EXISTS `Reactor` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(400) NOT NULL,
    `tags`varchar(400) NOT NULL,
    `creationDateUnix` int(11) unsigned NOT NULL,
    `linkId` varchar(16) NOT NULL,
    `s3Key` varchar(400) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `name_uniq` (`name`),
    UNIQUE KEY `linkId_uniq` (`linkId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
