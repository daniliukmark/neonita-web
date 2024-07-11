-- MySQL dump 10.13  Distrib 8.2.0, for macos14.0 (arm64)
--
-- Host: aws.connect.psdb.cloud    Database: neonita
-- ------------------------------------------------------
-- Server version	8.0.34-PlanetScale

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '35719923-9562-11ee-a772-fe20fd055b65:1-59,
3777dbb6-32ed-11ef-b138-e2d66cbf4c8a:1-81,
64325638-847b-11ee-a28b-c23fb6cc6ceb:1-159,
68b68e50-70b9-11ee-bc8c-a615595c9723:1-58,
69aee8ce-70b9-11ee-955e-ea7e5be4fa15:1-213,
9282064c-7dcc-11ee-ba12-9a552e341599:1-206';

--
-- Table structure for table `NeonSign`
--

DROP TABLE IF EXISTS `NeonSign`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `NeonSign` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `inStock` tinyint(1) NOT NULL,
  `quantity` smallint unsigned NOT NULL,
  `currency` enum('EURO','USD') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'EURO',
  PRIMARY KEY (`id`),
  KEY `NeonSign_name_idx` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `NeonSign`
--

LOCK TABLES `NeonSign` WRITE;
/*!40000 ALTER TABLE `NeonSign` DISABLE KEYS */;
INSERT INTO `NeonSign` VALUES (1,'\"Boston Briuns\" Neon Logo',299.99,'\"Boston Briuns\" Neon Logo.jpg',1,999,'EURO'),(2,'\"1664\" Neon Decoration',299.99,'\"1664\" Neon Decoration.jpg',1,999,'EURO'),(3,'\"Bacadi Breezer\" Neon Logo',299.99,'\"Bacadi Breezer\" Neon Logo.jpg',1,999,'EURO'),(4,'\"2 Barai\" Shore Town Neon Logo',299.99,'\"2 Barai\" Shore Town Neon Logo.jpg',1,999,'EURO'),(5,'\"Falken Turm\" Neon Logo',299.99,'\"Falken Turm\" Neon Logo.jpg',1,999,'EURO'),(6,'\"Bar\" White Neon Decoration',299.99,'\"Bat\" White Neon Decoration.jpg',1,999,'EURO'),(7,'\"No Risk, No Magic\" Pink Neon',299.99,'\"No Risk, No Magic\" Pink Neon.jpg',1,999,'EURO'),(8,'Beer Brewery Logo Sign',299.99,'Beer Brewery Logo Sign.jpg',1,999,'EURO'),(9,'\"Open\" Rectangular Neon Sign',299.99,'\"Open\" Rectangular Neon Sign.jpg',1,999,'EURO'),(10,'\"Thunder\" Neon Logo',299.99,'\"Thunder\" Neon Logo.jpg',1,999,'EURO'),(11,'\"Draught Guinness\"  Neon Logo',299.99,'\"Draught Guinness\"  Neon Logo.jpg',1,999,'EURO'),(12,'\"Brinkhoff\'s No',299.99,'\"Brinkhoff\'s No.1\" Green Neon Logo.jpg',1,999,'EURO'),(13,'\"At Symbol\" Violet Neon SIgn',299.99,'\"At Symbol\" Violet Neon SIgn.jpg',1,999,'EURO'),(14,'\"Harley-Davidson\" Long Neon Logo',299.99,'\"Harley-Davidson\" Long Neon Logo.jpg',1,999,'EURO'),(15,'\"Švyturys\" Round Neon Logo',299.99,'\"Švyturys\" Round Neon Logo.jpg',1,999,'EURO'),(16,'\"Music Boom Box\" White Neon Decoration',299.99,'\"Music Boom Box\" White Neon Decoration.jpg',1,999,'EURO'),(17,'\"Ergoline\"  Elegant Red Neon Logo',299.99,'\"Ergoline\"  Elegant Red Neon Logo.jpg',1,999,'EURO'),(18,'Goog Food Sign',299.99,'Goog Food Sign.jpeg',1,999,'EURO'),(19,'\"Apollo Karaoke\" Neon Logo',299.99,'\"Apollo Karaoke\" Neon Logo.jpg',1,999,'EURO'),(20,'\"Capitain Morgan\" Neon Logo',299.99,'\"Capitain Morgan\" Neon Logo.jpg',1,999,'EURO'),(21,'\"Europa Park\" Amusement Park Neon Logo',299.99,'\"Europa Park\" Amusement Park Neon Logo.jpg',1,999,'EURO'),(22,'\"Smile\" White Neon Logo',299.99,'\"Smile\" White Neon Logo.jpg',1,999,'EURO'),(23,'\"Show Room\" Miami Style Neon Sign',299.99,'\"Show Room\" Miami Style Neon Sign.jpg',1,999,'EURO'),(24,'\"Flamingo\" Pink Neon Table Stand',299.99,'\"Flamingo\" Pink Neon Table Stand.jpg',1,999,'EURO'),(25,'\"Luxura gold\" Neon Sign',299.99,'\"Luxura gold\" Neon Sign.jpg',1,999,'EURO'),(26,'Neon Table Stands',299.99,'Neon Table Stands.jpg',1,999,'EURO'),(27,'\"Beauty Salon\" Red White Sign',299.99,'\"Beauty Salon\" Red White Sign.jpg',1,999,'EURO'),(28,'\"Lone Star\" Neon Table Stand',299.99,'\"Lone Star\" Neon Table Stand.jpg',1,999,'EURO'),(29,'\"Cafe\" Neon Logo',299.99,'\"Cafe\" Neon Logo.jpg',1,999,'EURO'),(30,'\"Tattoo & Piercing\" Salon Multicolor Logo',299.99,'\"Tattoo & Piercing\" Salon Multicolor Logo.jpg',1,999,'EURO'),(31,'\"Budweiser\" Neon',299.99,'\"Budweiser\" Neon.jpg',1,999,'EURO'),(32,'\"Bitcoin\" Information Sign',299.99,'\"Bitcoin\" Information Sign.jpg',1,999,'EURO'),(33,'\"Elegant Woman\" White Neon',299.99,'\"Elegant Woman\" White Neon.jpeg',1,999,'EURO'),(34,'\"Metelica\" Blue Neon Logo',299.99,'\"Metelica\" Blue Neon Logo.jpg',1,999,'EURO'),(35,'\"The End\" Red Neon Sign',299.99,'\"The End\" Red Neon Sign.jpg',1,999,'EURO'),(36,'\"Open\" Multicolor Neon Sign',299.99,'\"Open\" Multicolor Neon Sign.jpg',1,999,'EURO'),(37,'\"Flower\" Red Neon',299.99,'\"Flower\" Red Neon.jpeg',1,999,'EURO'),(38,'\"Uraban\" Yellow Neon Sign Table Stand',299.99,'\"Uraban\" Yellow Neon Sign Table Stand.jpg',1,999,'EURO'),(39,'\"Brooklyn Brewery\" Round Neon Sign',299.99,'\"Brooklyn Brewery\" Round Neon Sign.jpg',1,999,'EURO'),(40,'\"Lay\'s Crisps\" Multicolor Neon Logo',299.99,'\"Lay\'s Crisps\" Multicolor Neon Logo.jpg',1,999,'EURO'),(41,'\"Nitro Coffee\" Orange Neon Logo',299.99,'\"Nitro Coffee\" Orange Neon Logo.jpg',1,999,'EURO'),(42,'\"Chaipur\" Indian Style Neon Logo',299.99,'\"Chaipur\" Indian Style Neon Logo.jpg',1,999,'EURO'),(43,'\"Fire\" Neon Table Stands',299.99,'\"Fire\" Neon Table Stands.jpg',1,999,'EURO'),(44,'\"Coordinates\" White Neon Decoration',299.99,'\"Coordinates\" White Neon Decoration.jpg',1,999,'EURO'),(45,'\"Toks Stilius\" Western Style Neon SIgn',299.99,'\"Toks Stilius\" Western Style Neon SIgn.jpg',1,999,'EURO'),(46,'\"Restaurant\" Green Neon Logo',299.99,'\"Restaurant\" Green Neon Logo.jpg',1,999,'EURO'),(47,'\"It\'s 5AM Somewhere\"  Hawaii Style Neon Decoration',299.99,'\"It\'s 5AM Somewhere\"  Hawaii Style Neon Decoration.jpg',1,999,'EURO'),(48,'\"Xenta Absenta\" 2-Color Neon Logo',299.99,'\"Xenta Absenta\" 2-Color Neon Logo.jpg',1,999,'EURO'),(49,'\"Smoking Neon Man\" ',299.99,'\"Smoking Neon Man\" .jpg',1,999,'EURO'),(50,'\"Hacker-Dschoorr\" Neon Blue Logo',299.99,'\"Hacker-Dschoorr\" Neon Blue Logo.jpg',1,999,'EURO'),(51,'\"Bull\" Red Neon Decoration',299.99,'\"Bull\" Red Neon Decoration.jpg',1,999,'EURO'),(52,'Neon Installations',299.99,'Neon Installations.jpg',1,999,'EURO'),(53,'\"Zippo\" Neon Logo',299.99,'\"Zippo\" Neon Logo.jpg',1,999,'EURO'),(54,'\"Getting High, Sitting Low\" Blue Neon Logo',299.99,'\"Getting High, Sitting Low\" Blue Neon Logo.jpg',1,999,'EURO'),(55,'\"Lovely Hearts\" Table Red Neon Figures',299.99,'\"Lovely Hearts\" Table Red Neon Figures.jpg',1,999,'EURO'),(56,'\"Pepsi-Cola\" Hanging Blue Neon Logo',299.99,'\"Pepsi-Cola\" Hanging Blue Neon Logo.jpg',1,999,'EURO'),(57,'Slogan White Neon Sign',299.99,'Slogan White Neon Sign.jpg',1,999,'EURO'),(58,'\"Sexually Liberated Woman\" Warm Colored Neon Decoration',299.99,'\"Sexually Liberated Woman\" Warm Colored Neon Decoration.jpg',1,999,'EURO'),(59,'\"Heineken\" Long Neon Logo',299.99,'\"Heineken\" Long Neon Logo.jpg',1,999,'EURO'),(60,'\"Coca-Cola\" Neon Table Stand',299.99,'\"Coca-Cola\" Neon Table Stand.jpg',1,999,'EURO'),(61,'\"Playboy\" Neon Logo',299.99,'\"Playboy\" Neon Logo.jpg',1,999,'EURO'),(62,'\"Elixyr\" Sky Blue Neon Logo',299.99,'\"Elixyr\" Sky Blue Neon Logo.jpg',1,999,'EURO'),(63,'\"Energy\" Sign',299.99,'\"Energy\" Sign.jpeg',1,999,'EURO'),(64,'\"Red Bull\" Orange Neon',299.99,'\"Red Bull\" Orange Neon.jpg',1,999,'EURO'),(65,'\"Loud 50\'s\" Multicolor Neon Sign',299.99,'\"Loud 50\'s\" Multicolor Neon Sign.jpg',1,999,'EURO'),(66,'\"Futuristic Chandelier\" Neon Light Style',299.99,'\"Futuristic Chandelier\" Neon Light Style.jpeg',1,999,'EURO'),(67,'\"Highway Route\" Neon Sign',299.99,'\"Highway Route\".jpg',1,999,'EURO'),(68,'\"Heineken\" Green Neon Logo',299.99,'\"Heineken\" Green Neon Logo.jpg',1,999,'EURO'),(69,'\"Eickholter\" Blue Neon Logo',299.99,'\"Eickholter\" Blue Neon Logo.jpg',1,999,'EURO'),(70,'\"Tycoon\" Neon Logo',299.99,'\"Tycoon\" Neon Logo.jpg',1,999,'EURO'),(71,'\"Carlsberg\" Green Neon Log',299.99,'\"Carlsberg\" Green Neon Log.jpg',1,999,'EURO'),(72,'\"Beissdorf Rolsch\" Multicolor Neon Logo',299.99,'\"Beissdorf Rolsch\" Multicolor Neon Logo.jpg',1,999,'EURO'),(73,'\"W. Lawson Whisky\" White Neon Logo',299.99,'\"W. Lawson Whisky\" White Neon Logo.jpg',1,999,'EURO'),(74,'World Map Neon Yellow',299.99,'World Map Neon Yellow.jpeg',1,999,'EURO'),(75,'\"Power Horse\" Minimalistic Neon Logo',299.99,'\"Power Horse\" Minimalistic Neon Logo.jpg',1,999,'EURO'),(76,'\"Geralda\" Haunted Neon Logo',299.99,'\"Geralda\" Haunted Neon Logo.jpg',1,999,'EURO'),(77,'Pizzeria Style Sign',299.99,'Pizzeria Style Sign.jpeg',1,999,'EURO'),(78,'Playful Neon Logo',299.99,'Playful Neon Logo.jpg',1,999,'EURO'),(79,'\"TOP PILSNER\" Neon Logo',299.99,'\"TOP PILSNER\" Neon Logo.jpg',1,999,'EURO'),(80,'\"Open\" Neon Sign',299.99,'\"Open\" Neon Sign.jpg',1,999,'EURO'),(81,'\"Extravagant Lady\" Neon Decoration',299.99,'\"Extravagant Lady\" Neon Decoration.jpg',1,999,'EURO'),(82,'\"Rhodius\" Contrast Font Neon Logo',299.99,'\"Rhodius\" Contrast Font Neon Logo.jpg',1,999,'EURO'),(83,'Floating Numbers Decoration',299.99,'Floating Numbers Decoration.jpeg',1,999,'EURO'),(84,'\"Motorcycle\" White Neon Wall Decoration',299.99,'\"Motorcycle\" White Neon Wall Decoration.jpg',1,999,'EURO'),(85,'\"Espresso\" Cafe Playful Neon',299.99,'\"Espresso\" Cafe Playful Neon.jpg',1,999,'EURO'),(86,'\"Miller Beer\" Neon Logo',299.99,'\"Miller Beer\" Neon Logo.jpg',1,999,'EURO'),(87,'\"Football Mouse\" Multicolor Neon Decoration',299.99,'\"Football Mouse\" Multicolor Neon Decoration.jpg',1,999,'EURO');
/*!40000 ALTER TABLE `NeonSign` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-25 15:28:21
