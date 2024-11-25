CREATE TABLE IF NOT EXISTS `Cookbook_Ingredient` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(400) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `name_uniq` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
