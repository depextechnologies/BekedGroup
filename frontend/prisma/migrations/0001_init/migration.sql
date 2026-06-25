-- CreateTable
CREATE TABLE `AdminUser` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL DEFAULT 'Admin',
    `role` VARCHAR(191) NOT NULL DEFAULT 'admin',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `AdminUser_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SiteSettings` (
    `id` INTEGER NOT NULL DEFAULT 1,
    `companyName` VARCHAR(191) NOT NULL DEFAULT 'bakēd Group',
    `contactEmail` VARCHAR(191) NOT NULL DEFAULT 'contact@baked.group',
    `contactPhone` VARCHAR(191) NOT NULL DEFAULT '',
    `contactAddress` VARCHAR(191) NOT NULL DEFAULT '',
    `googleMapsUrl` VARCHAR(191) NOT NULL DEFAULT '',
    `facebookUrl` VARCHAR(191) NOT NULL DEFAULT '',
    `linkedinUrl` VARCHAR(191) NOT NULL DEFAULT '',
    `instagramUrl` VARCHAR(191) NOT NULL DEFAULT '',
    `tiktokUrl` VARCHAR(191) NOT NULL DEFAULT '',
    `youtubeUrl` VARCHAR(191) NOT NULL DEFAULT '',
    `footerTextFr` TEXT NOT NULL DEFAULT 'Simplifier la vie des gens et les connecter ensemble.',
    `footerTextEn` TEXT NOT NULL DEFAULT 'Simplifying people''s lives and connecting them together.',
    `copyrightText` TEXT NOT NULL DEFAULT '© 2025 bakēd Group. Tous droits réservés.',
    `logoUrl` VARCHAR(191) NOT NULL DEFAULT '/logos/baked.jpeg',
    `faviconUrl` VARCHAR(191) NOT NULL DEFAULT '',
    `appStoreUrl` VARCHAR(191) NOT NULL DEFAULT '',
    `playStoreUrl` VARCHAR(191) NOT NULL DEFAULT '',
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HomepageContent` (
    `id` INTEGER NOT NULL DEFAULT 1,
    `heroTitleFr` TEXT NOT NULL DEFAULT 'SIMPLIFIER LA VIE DES GENS ET LES CONNECTER ENSEMBLE',
    `heroTitleEn` TEXT NOT NULL DEFAULT 'SIMPLIFYING PEOPLE''S LIVES AND CONNECTING THEM TOGETHER',
    `heroHighlightFr` VARCHAR(191) NOT NULL DEFAULT 'CONNECTER',
    `heroHighlightEn` VARCHAR(191) NOT NULL DEFAULT 'CONNECTING',
    `heroSubFr` TEXT NOT NULL DEFAULT 'Une seule application. Plusieurs services. Une expérience connectée.',
    `heroSubEn` TEXT NOT NULL DEFAULT 'One application. Multiple services. One connected experience.',
    `heroCta1Fr` VARCHAR(191) NOT NULL DEFAULT 'Découvrir les Services',
    `heroCta1En` VARCHAR(191) NOT NULL DEFAULT 'Discover Services',
    `heroCta2Fr` VARCHAR(191) NOT NULL DEFAULT 'Nous Rejoindre',
    `heroCta2En` VARCHAR(191) NOT NULL DEFAULT 'Join Us',
    `heroBgImage` TEXT NOT NULL DEFAULT 'https://images.pexels.com/photos/1787044/pexels-photo-1787044.jpeg',
    `heroForegroundImage` TEXT NOT NULL DEFAULT 'https://images.pexels.com/photos/4963439/pexels-photo-4963439.jpeg',
    `aboutTitleFr` VARCHAR(191) NOT NULL DEFAULT 'À PROPOS DE bakēd',
    `aboutTitleEn` VARCHAR(191) NOT NULL DEFAULT 'ABOUT bakēd',
    `aboutBodyFr` TEXT NOT NULL DEFAULT 'bakēd Group développe un écosystème unifié d''applications digitales pensé pour simplifier le quotidien grâce à la technologie. Notre mission est de connecter les personnes, les entreprises, les services, la mobilité, le commerce, la restauration et l''immobilier dans une expérience fluide et unique.',
    `aboutBodyEn` TEXT NOT NULL DEFAULT 'bakēd Group builds a unified ecosystem of digital applications designed to simplify everyday life through technology. Our mission is to connect people, businesses, services, mobility, commerce, food, and real estate into one seamless experience.',
    `careersImage` TEXT NOT NULL DEFAULT 'https://images.pexels.com/photos/7109013/pexels-photo-7109013.jpeg',
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Application` (
    `id` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `prefix` VARCHAR(191) NOT NULL,
    `brandName` VARCHAR(191) NOT NULL DEFAULT 'bakēd',
    `color` VARCHAR(191) NOT NULL,
    `colorKey` VARCHAR(191) NOT NULL,
    `titleFr` VARCHAR(191) NOT NULL DEFAULT '',
    `titleEn` VARCHAR(191) NOT NULL DEFAULT '',
    `descFr` TEXT NOT NULL,
    `descEn` TEXT NOT NULL,
    `illustration` TEXT NOT NULL,
    `logoImage` TEXT NOT NULL DEFAULT '',
    `icon` VARCHAR(191) NOT NULL DEFAULT 'Package',
    `enabled` BOOLEAN NOT NULL DEFAULT true,
    `order` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Application_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContactMessage` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `company` VARCHAR(191) NULL,
    `message` TEXT NOT NULL,
    `read` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JobOpening` (
    `id` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `titleFr` VARCHAR(191) NOT NULL,
    `titleEn` VARCHAR(191) NOT NULL,
    `departmentFr` VARCHAR(191) NOT NULL,
    `departmentEn` VARCHAR(191) NOT NULL,
    `locationFr` VARCHAR(191) NOT NULL DEFAULT 'Remote',
    `locationEn` VARCHAR(191) NOT NULL DEFAULT 'Remote',
    `typeFr` VARCHAR(191) NOT NULL DEFAULT 'Temps plein',
    `typeEn` VARCHAR(191) NOT NULL DEFAULT 'Full-time',
    `descFr` TEXT NOT NULL,
    `descEn` TEXT NOT NULL,
    `published` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `JobOpening_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JobApplication` (
    `id` VARCHAR(191) NOT NULL,
    `jobId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `resumeUrl` TEXT NULL,
    `message` TEXT NOT NULL,
    `read` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BlogPost` (
    `id` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `titleFr` VARCHAR(191) NOT NULL,
    `titleEn` VARCHAR(191) NOT NULL,
    `excerptFr` TEXT NOT NULL,
    `excerptEn` TEXT NOT NULL,
    `contentFr` LONGTEXT NOT NULL,
    `contentEn` LONGTEXT NOT NULL,
    `featuredImage` TEXT NOT NULL DEFAULT '',
    `category` VARCHAR(191) NOT NULL DEFAULT 'News',
    `metaTitleFr` VARCHAR(191) NOT NULL DEFAULT '',
    `metaTitleEn` VARCHAR(191) NOT NULL DEFAULT '',
    `metaDescFr` TEXT NOT NULL DEFAULT '',
    `metaDescEn` TEXT NOT NULL DEFAULT '',
    `published` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `BlogPost_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NewsArticle` (
    `id` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `titleFr` VARCHAR(191) NOT NULL,
    `titleEn` VARCHAR(191) NOT NULL,
    `bodyFr` LONGTEXT NOT NULL,
    `bodyEn` LONGTEXT NOT NULL,
    `image` TEXT NOT NULL DEFAULT '',
    `published` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `NewsArticle_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AdvertisingLead` (
    `id` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL DEFAULT '',
    `company` VARCHAR(191) NOT NULL DEFAULT '',
    `country` VARCHAR(191) NOT NULL DEFAULT '',
    `message` TEXT NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'new',
    `read` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SupportTicket` (
    `id` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL DEFAULT '',
    `orderNumber` VARCHAR(191) NOT NULL DEFAULT '',
    `service` VARCHAR(191) NOT NULL DEFAULT '',
    `subject` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `attachmentUrl` TEXT NOT NULL DEFAULT '',
    `status` VARCHAR(191) NOT NULL DEFAULT 'open',
    `read` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PartnerApplication` (
    `id` VARCHAR(191) NOT NULL,
    `companyName` VARCHAR(191) NOT NULL,
    `activityType` VARCHAR(191) NOT NULL,
    `cityRegion` VARCHAR(191) NOT NULL DEFAULT '',
    `contactName` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `website` VARCHAR(191) NOT NULL DEFAULT '',
    `partnerType` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'new',
    `read` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PageContent` (
    `pageKey` VARCHAR(191) NOT NULL,
    `data` JSON NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`pageKey`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `JobApplication` ADD CONSTRAINT `JobApplication_jobId_fkey` FOREIGN KEY (`jobId`) REFERENCES `JobOpening`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

