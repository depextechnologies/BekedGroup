/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.11.14-MariaDB, for debian-linux-gnu (aarch64)
--
-- Host: localhost    Database: baked_growth
-- ------------------------------------------------------
-- Server version	10.11.14-MariaDB-0+deb12u2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `AdminUser`
--

DROP TABLE IF EXISTS `AdminUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `AdminUser` (
  `id` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL DEFAULT 'Admin',
  `role` varchar(191) NOT NULL DEFAULT 'admin',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `AdminUser_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AdminUser`
--

/*!40000 ALTER TABLE `AdminUser` DISABLE KEYS */;
INSERT INTO `AdminUser` VALUES
('cmqtsrtax0000b0ac0ew1bv8h','admin@baked.group','$2a$10$wLQlKzKMcIVznj61t4Y2peYcs9.ancR7wlCnX0OiCEGtO9yCR6CZe','bakēd Admin','admin','2026-06-25 17:49:56.889','2026-06-25 17:51:12.733');
/*!40000 ALTER TABLE `AdminUser` ENABLE KEYS */;

--
-- Table structure for table `AdvertisingLead`
--

DROP TABLE IF EXISTS `AdvertisingLead`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `AdvertisingLead` (
  `id` varchar(191) NOT NULL,
  `firstName` varchar(191) NOT NULL,
  `lastName` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `phone` varchar(191) NOT NULL DEFAULT '',
  `company` varchar(191) NOT NULL DEFAULT '',
  `country` varchar(191) NOT NULL DEFAULT '',
  `message` text NOT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'new',
  `read` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AdvertisingLead`
--

/*!40000 ALTER TABLE `AdvertisingLead` DISABLE KEYS */;
INSERT INTO `AdvertisingLead` VALUES
('cmqtswayi0002oscnp2be3wb1','My','SQL','mysql@adv.com','1','x','FR','Testing the MySQL migration end to end.','new',0,'2026-06-25 17:53:26.395');
/*!40000 ALTER TABLE `AdvertisingLead` ENABLE KEYS */;

--
-- Table structure for table `Application`
--

DROP TABLE IF EXISTS `Application`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Application` (
  `id` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `prefix` varchar(191) NOT NULL,
  `brandName` varchar(191) NOT NULL DEFAULT 'bakēd',
  `color` varchar(191) NOT NULL,
  `colorKey` varchar(191) NOT NULL,
  `titleFr` varchar(191) NOT NULL DEFAULT '',
  `titleEn` varchar(191) NOT NULL DEFAULT '',
  `descFr` text NOT NULL,
  `descEn` text NOT NULL,
  `illustration` text NOT NULL,
  `logoImage` text NOT NULL DEFAULT '',
  `icon` varchar(191) NOT NULL DEFAULT 'Package',
  `enabled` tinyint(1) NOT NULL DEFAULT 1,
  `order` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Application_slug_key` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Application`
--

/*!40000 ALTER TABLE `Application` DISABLE KEYS */;
INSERT INTO `Application` VALUES
('cmqtsshaj0001sfyk4pocxwdj','express','EXPRESS','bakēd','#F7A500','gold','','','Livraison express pour les entreprises et les particuliers.','Express delivery for businesses and individuals.','https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800','/logos/express.jpeg','Truck',1,1,'2026-06-25 17:50:27.980','2026-06-25 17:51:12.745'),
('cmqtsshal0002sfykrcvlekwt','food','FOOD','bakēd','#32CD32','green','','','Commandez vos repas auprès des meilleurs restaurants locaux.','Order meals from your favorite local restaurants.','https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800','/logos/food.jpeg','UtensilsCrossed',1,2,'2026-06-25 17:50:27.982','2026-06-25 17:51:12.752'),
('cmqtsshap0003sfykh6trzr5c','mart','MART','bakēd','#32CD32','green','','','Vos courses livrées à votre porte en quelques minutes.','Groceries and essentials delivered to your door in minutes.','https://images.unsplash.com/photo-1542838132-92c53300491e?w=800','/logos/mart.jpeg','ShoppingCart',1,3,'2026-06-25 17:50:27.985','2026-06-25 17:51:12.754'),
('cmqtsshar0004sfykjwq9tgmx','shop','SHOP','bakēd','#F7A500','gold','','','La plateforme de shopping moderne pour tous vos achats.','The modern marketplace for all your shopping needs.','https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800','/logos/shop.jpeg','ShoppingBag',1,4,'2026-06-25 17:50:27.987','2026-06-25 17:51:12.756'),
('cmqtsshat0005sfyk0oijs99j','auto','AUTO','bakēd','#E5484D','red','','','Le marché automobile le plus populaire pour les voitures neuves et d\'occasion.','The leading marketplace to buy and sell new and used vehicles.','https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800','/logos/auto.jpeg','Car',1,5,'2026-06-25 17:50:27.989','2026-06-25 17:51:12.759'),
('cmqtsshau0006sfykivjsusve','immo','IMMO','bakēd','#7A3CFF','purple','','','Nous contribuons à façonner le marché de l\'immobilier nouvelle génération.','Buy, rent, sell properties and connect with verified agents.','https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800','/logos/immo.jpeg','Home',1,6,'2026-06-25 17:50:27.991','2026-06-25 17:51:12.763');
/*!40000 ALTER TABLE `Application` ENABLE KEYS */;

--
-- Table structure for table `BlogPost`
--

DROP TABLE IF EXISTS `BlogPost`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `BlogPost` (
  `id` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `titleFr` varchar(191) NOT NULL,
  `titleEn` varchar(191) NOT NULL,
  `excerptFr` text NOT NULL,
  `excerptEn` text NOT NULL,
  `contentFr` longtext NOT NULL,
  `contentEn` longtext NOT NULL,
  `featuredImage` text NOT NULL DEFAULT '',
  `category` varchar(191) NOT NULL DEFAULT 'News',
  `metaTitleFr` varchar(191) NOT NULL DEFAULT '',
  `metaTitleEn` varchar(191) NOT NULL DEFAULT '',
  `metaDescFr` text NOT NULL DEFAULT '',
  `metaDescEn` text NOT NULL DEFAULT '',
  `published` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `BlogPost_slug_key` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BlogPost`
--

/*!40000 ALTER TABLE `BlogPost` DISABLE KEYS */;
INSERT INTO `BlogPost` VALUES
('cmqtsshb00009sfykkzztfraj','launch-super-app','Lancement officiel de la Super App bakēd','Official launch of the bakēd Super App','bakēd Group dévoile sa Super App unifiée — livraison, restauration, marché, immobilier et automobile dans une seule expérience connectée.','bakēd Group unveils its unified Super App — delivery, food, market, real-estate and auto in one connected experience.','## Une vision unifiée\n\nbakēd Group annonce aujourd\'hui le **lancement officiel** de sa Super App. Conçue pour simplifier le quotidien des utilisateurs africains, l\'application réunit six services essentiels en un seul écosystème connecté.\n\n### Les services intégrés\n\n- **EXPRESSbakēd** — livraison express avec suivi GPS\n- **FOODbakēd** — commande de repas\n- **MARTbakēd** — courses et supermarchés\n- **SHOPbakēd** — e-commerce\n- **AUTObakēd** — marketplace automobile\n- **IMMObakēd** — immobilier\n\n> \"Nous voulons offrir une expérience fluide, rapide et locale.\"\n\n### Et ensuite ?\n\nLa version v1 est désormais disponible sur iOS et Android.','## A unified vision\n\nbakēd Group today announces the **official launch** of its Super App. Built to simplify daily life across Africa, the app brings six essential services together into a single connected ecosystem.\n\n### Integrated services\n\n- **EXPRESSbakēd** — express delivery with GPS tracking\n- **FOODbakēd** — meal ordering\n- **MARTbakēd** — grocery & supermarkets\n- **SHOPbakēd** — e-commerce\n- **AUTObakēd** — automotive marketplace\n- **IMMObakēd** — real estate\n\n> \"We want every user to enjoy a fast, frictionless, local experience.\"\n\n### What\'s next?\n\nThe v1 release is now available on iOS and Android.','https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=85','Product','Lancement Super App bakēd','bakēd Super App Launch','Découvrez le lancement officiel de la Super App bakēd Group.','Discover the official launch of the bakēd Group Super App.',1,'2026-06-25 17:50:27.996','2026-06-25 17:51:12.000'),
('cmqtsshb3000asfykyyvfx9li','design-system','Construire un design system Pan-Africain','Building a Pan-African design system','Comment notre équipe design a façonné un langage visuel cohérent pour six produits.','How our design team shaped a coherent visual language across six products.','## Pourquoi un design system ?\n\nUn design system, c\'est la **fondation** d\'une expérience cohérente. Pour bakēd, cela voulait dire concevoir un langage qui parle à des dizaines de millions d\'utilisateurs francophones et anglophones.\n\n### Les piliers\n\n1. **Tokens** — couleurs, espacement, typographie\n2. **Composants** — boutons, cards, modals\n3. **Patterns** — paiement, recherche, listings\n\nNotre couleur signature ? Le doré, évidemment.','## Why a design system?\n\nA design system is the **foundation** of a coherent experience. For bakēd, that meant crafting a language that speaks to tens of millions of French- and English-speaking users.\n\n### The pillars\n\n1. **Tokens** — colors, spacing, typography\n2. **Components** — buttons, cards, modals\n3. **Patterns** — checkout flows, search, listings\n\nOur signature color? Gold, obviously.','https://images.unsplash.com/photo-1561070791-2526d30994b8?w=1600&q=85','Design','','','','',1,'2026-06-25 17:50:27.999','2026-06-25 17:50:27.999');
/*!40000 ALTER TABLE `BlogPost` ENABLE KEYS */;

--
-- Table structure for table `ContactMessage`
--

DROP TABLE IF EXISTS `ContactMessage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `ContactMessage` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `phone` varchar(191) DEFAULT NULL,
  `company` varchar(191) DEFAULT NULL,
  `message` text NOT NULL,
  `read` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ContactMessage`
--

/*!40000 ALTER TABLE `ContactMessage` DISABLE KEYS */;
INSERT INTO `ContactMessage` VALUES
('cmqtsvwll0000oscn3cxwz9kp','MySQL Test','mysql@test.com','123',NULL,'Hello MySQL',0,'2026-06-25 17:53:07.785');
/*!40000 ALTER TABLE `ContactMessage` ENABLE KEYS */;

--
-- Table structure for table `HomepageContent`
--

DROP TABLE IF EXISTS `HomepageContent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `HomepageContent` (
  `id` int(11) NOT NULL DEFAULT 1,
  `heroTitleFr` text NOT NULL DEFAULT 'SIMPLIFIER LA VIE DES GENS ET LES CONNECTER ENSEMBLE',
  `heroTitleEn` text NOT NULL DEFAULT 'SIMPLIFYING PEOPLE\'S LIVES AND CONNECTING THEM TOGETHER',
  `heroHighlightFr` varchar(191) NOT NULL DEFAULT 'CONNECTER',
  `heroHighlightEn` varchar(191) NOT NULL DEFAULT 'CONNECTING',
  `heroSubFr` text NOT NULL DEFAULT 'Une seule application. Plusieurs services. Une expérience connectée.',
  `heroSubEn` text NOT NULL DEFAULT 'One application. Multiple services. One connected experience.',
  `heroCta1Fr` varchar(191) NOT NULL DEFAULT 'Découvrir les Services',
  `heroCta1En` varchar(191) NOT NULL DEFAULT 'Discover Services',
  `heroCta2Fr` varchar(191) NOT NULL DEFAULT 'Nous Rejoindre',
  `heroCta2En` varchar(191) NOT NULL DEFAULT 'Join Us',
  `heroBgImage` text NOT NULL DEFAULT 'https://images.pexels.com/photos/1787044/pexels-photo-1787044.jpeg',
  `heroForegroundImage` text NOT NULL DEFAULT 'https://images.pexels.com/photos/4963439/pexels-photo-4963439.jpeg',
  `aboutTitleFr` varchar(191) NOT NULL DEFAULT 'À PROPOS DE bakēd',
  `aboutTitleEn` varchar(191) NOT NULL DEFAULT 'ABOUT bakēd',
  `aboutBodyFr` text NOT NULL DEFAULT 'bakēd Group développe un écosystème unifié d\'applications digitales pensé pour simplifier le quotidien grâce à la technologie. Notre mission est de connecter les personnes, les entreprises, les services, la mobilité, le commerce, la restauration et l\'immobilier dans une expérience fluide et unique.',
  `aboutBodyEn` text NOT NULL DEFAULT 'bakēd Group builds a unified ecosystem of digital applications designed to simplify everyday life through technology. Our mission is to connect people, businesses, services, mobility, commerce, food, and real estate into one seamless experience.',
  `careersImage` text NOT NULL DEFAULT 'https://images.pexels.com/photos/7109013/pexels-photo-7109013.jpeg',
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HomepageContent`
--

/*!40000 ALTER TABLE `HomepageContent` DISABLE KEYS */;
INSERT INTO `HomepageContent` VALUES
(1,'SIMPLIFIER LA VIE DES GENS ET LES CONNECTER ENSEMBLE','SIMPLIFYING PEOPLE\'S LIVES AND CONNECTING THEM TOGETHER','CONNECTER','CONNECTING','Une seule application. Plusieurs services. Une expérience connectée.','One application. Multiple services. One connected experience.','Découvrir les Services','Discover Services','Nous Rejoindre','Join Us','https://images.pexels.com/photos/1787044/pexels-photo-1787044.jpeg','https://images.pexels.com/photos/4963439/pexels-photo-4963439.jpeg','À PROPOS DE bakēd','ABOUT bakēd','bakēd Group développe un écosystème unifié d\'applications digitales pensé pour simplifier le quotidien grâce à la technologie. Notre mission est de connecter les personnes, les entreprises, les services, la mobilité, le commerce, la restauration et l\'immobilier dans une expérience fluide et unique.','bakēd Group builds a unified ecosystem of digital applications designed to simplify everyday life through technology. Our mission is to connect people, businesses, services, mobility, commerce, food, and real estate into one seamless experience.','https://images.pexels.com/photos/7109013/pexels-photo-7109013.jpeg','2026-06-25 17:49:56.894');
/*!40000 ALTER TABLE `HomepageContent` ENABLE KEYS */;

--
-- Table structure for table `JobApplication`
--

DROP TABLE IF EXISTS `JobApplication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `JobApplication` (
  `id` varchar(191) NOT NULL,
  `jobId` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `phone` varchar(191) DEFAULT NULL,
  `resumeUrl` text DEFAULT NULL,
  `message` text NOT NULL,
  `read` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`),
  KEY `JobApplication_jobId_fkey` (`jobId`),
  CONSTRAINT `JobApplication_jobId_fkey` FOREIGN KEY (`jobId`) REFERENCES `JobOpening` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `JobApplication`
--

/*!40000 ALTER TABLE `JobApplication` DISABLE KEYS */;
INSERT INTO `JobApplication` VALUES
('cmqtswb8i0005oscni9wopt5r','cmqtsshaz0008sfyktnqixv5v','MySQL Tester','my@sql.com','123',NULL,'Testing the MySQL migration end to end.',0,'2026-06-25 17:53:26.755');
/*!40000 ALTER TABLE `JobApplication` ENABLE KEYS */;

--
-- Table structure for table `JobOpening`
--

DROP TABLE IF EXISTS `JobOpening`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `JobOpening` (
  `id` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `titleFr` varchar(191) NOT NULL,
  `titleEn` varchar(191) NOT NULL,
  `departmentFr` varchar(191) NOT NULL,
  `departmentEn` varchar(191) NOT NULL,
  `locationFr` varchar(191) NOT NULL DEFAULT 'Remote',
  `locationEn` varchar(191) NOT NULL DEFAULT 'Remote',
  `typeFr` varchar(191) NOT NULL DEFAULT 'Temps plein',
  `typeEn` varchar(191) NOT NULL DEFAULT 'Full-time',
  `descFr` text NOT NULL,
  `descEn` text NOT NULL,
  `published` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `JobOpening_slug_key` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `JobOpening`
--

/*!40000 ALTER TABLE `JobOpening` DISABLE KEYS */;
INSERT INTO `JobOpening` VALUES
('cmqtsshaw0007sfyk2tlz44ne','senior-product-designer','Designer Produit Senior','Senior Product Designer','Design','Design','Paris / Remote','Paris / Remote','Temps plein','Full-time','Rejoignez notre équipe design et façonnez l\'avenir de l\'écosystème bakēd.','Join our design team and shape the future of the bakēd ecosystem.',1,'2026-06-25 17:50:27.993','2026-06-25 17:51:12.766'),
('cmqtsshaz0008sfyktnqixv5v','senior-fullstack-engineer','Ingénieur·e Full-Stack Senior','Senior Full-Stack Engineer','Ingénierie','Engineering','Remote','Remote','Temps plein','Full-time','Construisez les API et les expériences qui propulsent l\'écosystème bakēd à grande échelle.','Build the APIs and experiences that power the bakēd ecosystem at scale.',1,'2026-06-25 17:50:27.995','2026-06-25 17:51:12.769');
/*!40000 ALTER TABLE `JobOpening` ENABLE KEYS */;

--
-- Table structure for table `NewsArticle`
--

DROP TABLE IF EXISTS `NewsArticle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `NewsArticle` (
  `id` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `titleFr` varchar(191) NOT NULL,
  `titleEn` varchar(191) NOT NULL,
  `bodyFr` longtext NOT NULL,
  `bodyEn` longtext NOT NULL,
  `image` text NOT NULL DEFAULT '',
  `published` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `NewsArticle_slug_key` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `NewsArticle`
--

/*!40000 ALTER TABLE `NewsArticle` DISABLE KEYS */;
INSERT INTO `NewsArticle` VALUES
('cmqtstfuz000baz3bi337q0v0','series-a-2026','bakēd Group annonce une levée de Série A','bakēd Group announces Series A round','## Paris — Février 2026\n\nbakēd Group annonce aujourd\'hui la clôture de sa Série A pour accélérer le déploiement de sa Super App à travers le continent africain.\n\n### Les chiffres clés\n\n- Tour mené par un consortium d\'investisseurs régionaux\n- Expansion prévue dans 4 nouveaux pays sur 18 mois\n- Recrutement de 80 talents en ingénierie et produit\n\n### À propos de bakēd Group\n\nbakēd Group est la Super App africaine.','## Paris — February 2026\n\nbakēd Group announces today the closing of its Series A round to accelerate the Super App\'s rollout across Africa.\n\n### Key figures\n\n- Round led by a consortium of regional investors\n- Expansion to 4 new countries planned over 18 months\n- 80 engineering and product hires\n\n### About bakēd Group\n\nbakēd Group is the African Super App.','https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=85',1,'2026-06-25 17:51:12.780','2026-06-25 17:51:12.780'),
('cmqtstfv3000caz3byg0pgmcb','africa-tech-awards-finalist','bakēd Group finaliste des Africa Tech Awards','bakēd Group named Africa Tech Awards finalist','## Une reconnaissance pour l\'écosystème\n\nbakēd Group figure parmi les finalistes des **Africa Tech Awards 2026**, dans la catégorie *Super App de l\'Année*.','## Recognition for the ecosystem\n\nbakēd Group has been named a finalist at the **Africa Tech Awards 2026**, in the *Super App of the Year* category.','https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1600&q=85',1,'2026-06-25 17:51:12.783','2026-06-25 17:51:12.783');
/*!40000 ALTER TABLE `NewsArticle` ENABLE KEYS */;

--
-- Table structure for table `PageContent`
--

DROP TABLE IF EXISTS `PageContent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `PageContent` (
  `pageKey` varchar(191) NOT NULL,
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`data`)),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`pageKey`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PageContent`
--

/*!40000 ALTER TABLE `PageContent` DISABLE KEYS */;
INSERT INTO `PageContent` VALUES
('about','{}','2026-06-25 17:53:39.259');
/*!40000 ALTER TABLE `PageContent` ENABLE KEYS */;

--
-- Table structure for table `PartnerApplication`
--

DROP TABLE IF EXISTS `PartnerApplication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `PartnerApplication` (
  `id` varchar(191) NOT NULL,
  `companyName` varchar(191) NOT NULL,
  `activityType` varchar(191) NOT NULL,
  `cityRegion` varchar(191) NOT NULL DEFAULT '',
  `contactName` varchar(191) NOT NULL,
  `phone` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `website` varchar(191) NOT NULL DEFAULT '',
  `partnerType` varchar(191) NOT NULL,
  `description` text NOT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'new',
  `read` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PartnerApplication`
--

/*!40000 ALTER TABLE `PartnerApplication` DISABLE KEYS */;
INSERT INTO `PartnerApplication` VALUES
('cmqtsvxq30001oscnd4xwdib4','MyCo','restaurant','','Jane','+22500','jane@myco.com','','merchant','interested','new',0,'2026-06-25 17:53:09.243');
/*!40000 ALTER TABLE `PartnerApplication` ENABLE KEYS */;

--
-- Table structure for table `SiteSettings`
--

DROP TABLE IF EXISTS `SiteSettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `SiteSettings` (
  `id` int(11) NOT NULL DEFAULT 1,
  `companyName` varchar(191) NOT NULL DEFAULT 'bakēd Group',
  `contactEmail` varchar(191) NOT NULL DEFAULT 'contact@baked.group',
  `contactPhone` varchar(191) NOT NULL DEFAULT '',
  `contactAddress` varchar(191) NOT NULL DEFAULT '',
  `googleMapsUrl` varchar(191) NOT NULL DEFAULT '',
  `facebookUrl` varchar(191) NOT NULL DEFAULT '',
  `linkedinUrl` varchar(191) NOT NULL DEFAULT '',
  `instagramUrl` varchar(191) NOT NULL DEFAULT '',
  `tiktokUrl` varchar(191) NOT NULL DEFAULT '',
  `youtubeUrl` varchar(191) NOT NULL DEFAULT '',
  `footerTextFr` text NOT NULL DEFAULT 'Simplifier la vie des gens et les connecter ensemble.',
  `footerTextEn` text NOT NULL DEFAULT 'Simplifying people\'s lives and connecting them together.',
  `copyrightText` text NOT NULL DEFAULT '© 2025 bakēd Group. Tous droits réservés.',
  `logoUrl` varchar(191) NOT NULL DEFAULT '/logos/baked.jpeg',
  `faviconUrl` varchar(191) NOT NULL DEFAULT '',
  `appStoreUrl` varchar(191) NOT NULL DEFAULT '',
  `playStoreUrl` varchar(191) NOT NULL DEFAULT '',
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SiteSettings`
--

/*!40000 ALTER TABLE `SiteSettings` DISABLE KEYS */;
INSERT INTO `SiteSettings` VALUES
(1,'bakēd Group','contact@baked.group','+33 1 23 45 67 89','Paris, France','https://maps.google.com/?q=Paris,France','https://facebook.com/bakedgroup','https://linkedin.com/company/bakedgroup','https://instagram.com/bakedgroup','https://tiktok.com/@bakedgroup','https://youtube.com/@bakedgroup','Simplifier la vie des gens et les connecter ensemble.','Simplifying people\'s lives and connecting them together.','© 2025 bakēd Group. Tous droits réservés.','/logos/baked.jpeg','','','','2026-06-25 17:51:12.736');
/*!40000 ALTER TABLE `SiteSettings` ENABLE KEYS */;

--
-- Table structure for table `SupportTicket`
--

DROP TABLE IF EXISTS `SupportTicket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `SupportTicket` (
  `id` varchar(191) NOT NULL,
  `fullName` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `phone` varchar(191) NOT NULL DEFAULT '',
  `orderNumber` varchar(191) NOT NULL DEFAULT '',
  `service` varchar(191) NOT NULL DEFAULT '',
  `subject` varchar(191) NOT NULL,
  `description` text NOT NULL,
  `attachmentUrl` text NOT NULL DEFAULT '',
  `status` varchar(191) NOT NULL DEFAULT 'open',
  `read` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SupportTicket`
--

/*!40000 ALTER TABLE `SupportTicket` DISABLE KEYS */;
INSERT INTO `SupportTicket` VALUES
('cmqtswb1p0003oscnq6fdj761','MySQL Tester','my@sql.com','1','','food','MySQL test','Testing the MySQL migration end to end.','','open',0,'2026-06-25 17:53:26.509');
/*!40000 ALTER TABLE `SupportTicket` ENABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-25 17:54:08
