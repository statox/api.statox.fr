CREATE TABLE IF NOT EXISTS `S3Files` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `bucket` varchar(128) NOT NULL,
    `s3Key` varchar(400) NOT NULL,
    `creationDateUnix` int(11) unsigned NOT NULL,
    `deleteionDateUnix` int(11) DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `s3Key` (`s3Key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
