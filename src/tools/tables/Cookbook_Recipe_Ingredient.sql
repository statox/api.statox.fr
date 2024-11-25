CREATE TABLE IF NOT EXISTS `Cookbook_Recipe_Ingredient` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `recipeId` int(11) NOT NULL,
    `ingredientId` int(11) NOT NULL,
    `quantity` int(5),
    `unit` varchar(20),
    PRIMARY KEY (`id`),
    UNIQUE KEY `recipe_ingredient_uniq` (`recipeId`, `ingredientId`),
    INDEX `idx_recipeId` (`recipeId`),
    INDEX `idx_ingredientId` (`ingredientId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
