CREATE TABLE IF NOT EXISTS `WebWatcher` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(400) NOT NULL,
    `notificationMessage` varchar(400) NOT NULL,
    `url`varchar(400) NOT NULL,
    `cssSelector`varchar(400) NOT NULL,
    `lastContent`varchar(400) NOT NULL DEFAULT '',
    `lastCheckDateUnix` int(11) unsigned NOT NULL DEFAULT 0,
    `lastUpdateDateUnix` int(11) unsigned NOT NULL DEFAULT 0,
    `checkIntervalSeconds` int(11) unsigned NOT NULL,
    `lastErrorDateUnix` int(11) unsigned,
    `lastErrorMessage` varchar(400),
    PRIMARY KEY (`id`),
    UNIQUE KEY `name_uniq` (`name`),
    UNIQUE KEY `url_selector_uniq` (`url`, `cssSelector`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- INSERT INTO WebWatcher
--     ( name, notificationMessage, url, cssSelector, checkIntervalSeconds)
-- VALUES
-- ('kimsufi', 'New KS-4 server available! https://eco.ovhcloud.com/fr/?display=list&range=kimsufi', 'https://eco.ovhcloud.com/fr/?display=list&range=kimsufi', '.ods-all-servers > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > details:nth-child(1) > div:nth-child(2) > div:nth-child(4) > div:nth-child(12) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > span:nth-child(2) > div:nth-child(5) > div:nth-child(1)', 850),
-- ('adafruit', 'New message in Adafruit support thread https://forums.adafruit.com/viewtopic.php?p=1016286', 'https://forums.adafruit.com/viewtopic.php?p=1016286', '#page-body > div.action-bar.bar-top > div.pagination', 21600)
-- ON DUPLICATE KEY UPDATE name = name;
