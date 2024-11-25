CREATE TABLE IF NOT EXISTS `Cookbook_Recipe` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(400) NOT NULL,
    `content` longtext NOT NULL,
    `creationDateUnix` int(11) unsigned NOT NULL,
    `updateDateUnix` int(11) unsigned NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `name_uniq` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
