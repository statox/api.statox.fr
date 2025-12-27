CREATE TABLE IF NOT EXISTS `PersonalTracker` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `userId` int(11) NOT NULL,
    `eventDateUnix` int(11) unsigned NOT NULL,
    `salt` BINARY(16) NOT NULL,
    `nonce`  BINARY(24) NOT NULL,
    `ciphertext` BLOB  NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `user_date_uniq` (`userId`, `eventDateUnix`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
