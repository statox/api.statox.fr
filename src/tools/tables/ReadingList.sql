CREATE TABLE IF NOT EXISTS `ReadingList` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `creationDateUnix` int(11) unsigned NOT NULL,
    `name` varchar(400) NOT NULL,
    `comment`text,          -- Free form text so I can add details to the entry
    `link` varchar(2048),   -- 2048 is the max URL size in Chrome
    `s3Key` varchar(400),   -- Probably don't need more
    `tags`varchar(400) NOT NULL, -- Not null even with not tags we'll store "[]"
    PRIMARY KEY (`id`),
    UNIQUE KEY `name_uniq` (`name`),
    UNIQUE INDEX `s3Key` (`s3Key`)
    -- UNIQUE INDEX `link_uniq` (`link`) -- We can't make an index on varchar(2048)
                                         -- TODO add some logic to keep the hash of the URL
                                         -- and use this hash for the unique constraint
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

