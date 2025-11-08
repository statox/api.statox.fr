CREATE TABLE IF NOT EXISTS `User` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `username` varchar(400) NOT NULL,
    `hashedPassword` BLOB NOT NULL,
    `salt` BLOB NOT NULL,
    `scopes` JSON NOT NULL DEFAULT (JSON_ARRAY()),
    PRIMARY KEY (`id`),
    UNIQUE KEY `username_uniq` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
