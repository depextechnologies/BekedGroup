-- =====================================================================
-- bakēd Group — Database bootstrap script (MySQL / MariaDB)
-- Creates the database and a dedicated application user.
-- Run as a privileged MySQL user (root) BEFORE importing the schema.
--
-- Usage:
--   mysql -u root -p < prisma/migrations/0000_create_database.sql
--
-- Customize the values below before running in production.
-- =====================================================================

CREATE DATABASE IF NOT EXISTS `baked_group`
  CHARACTER SET utf8mb4
  COLLATE       utf8mb4_unicode_ci;

-- App user (change the password in production!)
CREATE USER IF NOT EXISTS 'baked_user'@'%'         IDENTIFIED BY 'CHANGE_ME';
CREATE USER IF NOT EXISTS 'baked_user'@'localhost' IDENTIFIED BY 'CHANGE_ME';

GRANT ALL PRIVILEGES ON `baked_group`.* TO 'baked_user'@'%';
GRANT ALL PRIVILEGES ON `baked_group`.* TO 'baked_user'@'localhost';

FLUSH PRIVILEGES;

-- Next steps:
--   1) Import the schema:
--        mysql -u baked_user -p baked_group < prisma/migrations/0001_init/migration.sql
--   2) (Optional) Import the seed data dump for a populated install:
--        mysql -u baked_user -p baked_group < prisma/migrations/baked_growth_seed.sql
--   3) Update DATABASE_URL in `.env` accordingly.
