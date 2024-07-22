-- In real life we would also have
-- - `secretKey` varchar(128) NOT NULL
--      But for now we only check that the IOT objects send the access key
--      and consider that as good enough
-- - `valid` tinyint(1) NOT NULL
--      To easily disable the key but that's too serious for what we are doing here

CREATE TABLE IF NOT EXISTS `ApiKeys` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `accessKey` varchar(128) NOT NULL,
    `description` varchar(128) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
