-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: localhost    Database: battleship
-- ------------------------------------------------------
-- Server version	8.0.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP DATABASE IF EXISTS battleship;
CREATE DATABASE battleship;
USE battleship;

--
-- Table structure for table `board1`
--

DROP TABLE IF EXISTS `board1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `board1` (
  `board1ID` int(11) NOT NULL,
  `width` int(11) NOT NULL,
  `height` int(11) NOT NULL,
  PRIMARY KEY (`board1ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board1`
--

LOCK TABLES `board1` WRITE;
/*!40000 ALTER TABLE `board1` DISABLE KEYS */;
INSERT INTO `board1` VALUES (1,10,10);
/*!40000 ALTER TABLE `board1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `board2`
--

DROP TABLE IF EXISTS `board2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `board2` (
  `board2ID` int(11) NOT NULL,
  `width` int(11) NOT NULL,
  `height` int(11) NOT NULL,
  PRIMARY KEY (`board2ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board2`
--

LOCK TABLES `board2` WRITE;
/*!40000 ALTER TABLE `board2` DISABLE KEYS */;
INSERT INTO `board2` VALUES (1,10,10);
/*!40000 ALTER TABLE `board2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `board_ships`
--

DROP TABLE IF EXISTS `board_ships`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `board_ships` (
  `shipName` varchar(45) NOT NULL,
  `board1ID` int(11) NOT NULL,
  `board2ID` int(11) NOT NULL,
  PRIMARY KEY (`shipName`,`board1ID`,`board2ID`),
  KEY `fk_Board_Ships_Board11_idx` (`board1ID`),
  KEY `fk_Board_Ships_Board21_idx` (`board2ID`),
  CONSTRAINT `fk_Board_Ships_Board11` FOREIGN KEY (`board1ID`) REFERENCES `board1` (`board1id`),
  CONSTRAINT `fk_Board_Ships_Board21` FOREIGN KEY (`board2ID`) REFERENCES `board2` (`board2id`),
  CONSTRAINT `fk_Board_Ships_Ships1` FOREIGN KEY (`shipName`) REFERENCES `ships` (`shipname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board_ships`
--

LOCK TABLES `board_ships` WRITE;
/*!40000 ALTER TABLE `board_ships` DISABLE KEYS */;
INSERT INTO `board_ships` VALUES ('Battleship',1,1),('Carrier',1,1),('Destroyer',1,1),('Patrol Boat',1,1),('Submarine',1,1);
/*!40000 ALTER TABLE `board_ships` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `challenge`
--

DROP TABLE IF EXISTS `challenge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `challenge` (
  `challengeID` int(11) NOT NULL AUTO_INCREMENT,
  `challengerID` int(11) NOT NULL,
  `challengerUsername` varchar(45) DEFAULT NULL,
  `challengedID` int(11) NOT NULL,
  `challengedUsername` varchar(45) DEFAULT NULL,
  `result` enum('Accepted','Declined','Pending') NOT NULL,
  PRIMARY KEY (`challengeID`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `challenge`
--

LOCK TABLES `challenge` WRITE;
/*!40000 ALTER TABLE `challenge` DISABLE KEYS */;
INSERT INTO `challenge` VALUES (1,6,'bryanp21',7,'bryP22','Accepted'),(2,6,'bryanp21',7,'bryP22','Declined'),(3,6,'bryanp21',7,'bryP22','Declined'),(4,6,'bryanp21',7,'bryP22','Accepted'),(5,7,'bryP22',6,'bryanp21','Declined'),(6,7,'bryP22',6,'bryanp21','Declined'),(7,6,'bryanp21',7,'bryP22','Declined'),(8,6,'bryanp21',7,'bryP22','Accepted'),(9,6,'bryanp21',7,'bryP22','Accepted'),(10,6,'bryanp21',7,'bryP22','Accepted'),(11,7,'bryP22',6,'bryanp21','Accepted'),(12,6,'bryanp21',7,'bryP22','Accepted'),(13,6,'bryanp21',7,'bryP22','Accepted'),(14,6,'bryanp21',7,'bryP22','Accepted'),(15,6,'bryanp21',7,'bryP22','Accepted'),(16,7,'bryP22',6,'bryanp21','Accepted'),(17,6,'bryanp21',7,'bryP22','Accepted'),(18,6,'bryanp21',7,'bryP22','Accepted'),(19,6,'bryanp21',7,'bryP22','Accepted'),(20,6,'bryanp21',7,'bryP22','Accepted'),(21,6,'bryanp21',7,'bryP22','Accepted'),(22,6,'bryanp21',7,'bryP22','Accepted'),(23,6,'bryanp21',7,'bryP22','Accepted'),(24,6,'bryanp21',7,'bryP22','Accepted'),(25,6,'bryanp21',7,'bryP22','Accepted'),(26,6,'bryanp21',7,'bryP22','Accepted'),(27,6,'bryanp21',7,'bryP22','Accepted'),(28,7,'bryP22',6,'bryanp21','Accepted'),(29,6,'bryanp21',7,'bryP22','Accepted'),(30,6,'bryanp21',7,'bryP22','Accepted'),(31,6,'bryanp21',7,'bryP22','Accepted'),(32,6,'bryanp21',7,'bryP22','Accepted'),(33,6,'bryanp21',7,'bryP22','Accepted'),(34,6,'bryanp21',7,'bryP22','Accepted'),(35,6,'bryanp21',7,'bryP22','Accepted'),(36,6,'bryanp21',7,'bryP22','Accepted'),(37,6,'bryanp21',7,'bryP22','Accepted'),(38,6,'bryanp21',7,'bryP22','Accepted'),(39,6,'bryanp21',7,'bryP22','Accepted'),(40,6,'bryanp21',7,'bryP22','Accepted'),(41,6,'bryanp21',7,'bryP22','Accepted'),(42,6,'bryanp21',7,'bryP22','Accepted'),(43,6,'bryanp21',7,'bryP22','Accepted'),(44,6,'bryanp21',7,'bryP22','Accepted'),(45,6,'bryanp21',7,'bryP22','Accepted'),(46,6,'bryanp21',7,'bryP22','Accepted'),(47,6,'bryanp21',7,'bryP22','Accepted'),(48,6,'bryanp21',7,'bryP22','Accepted'),(49,6,'bryanp21',7,'bryP22','Declined'),(50,6,'bryanp21',7,'bryP22','Accepted'),(51,6,'bryanp21',7,'bryP22','Accepted'),(52,6,'bryanp21',7,'bryP22','Accepted'),(53,6,'bryanp21',7,'bryP22','Declined'),(54,6,'bryanp21',7,'bryP22','Accepted'),(55,6,'bryanp21',7,'bryP22','Declined'),(56,6,'bryanp21',7,'bryP22','Accepted'),(57,6,'bryanp21',7,'bryP22','Accepted'),(58,6,'bryanp21',7,'bryP22','Declined'),(59,6,'bryanp21',7,'bryP22','Accepted'),(60,6,'bryanp21',7,'bryP22','Accepted'),(61,7,'bryP22',6,'bryanp21','Accepted'),(62,7,'bryP22',6,'bryanp21','Accepted'),(63,7,'bryP22',6,'bryanp21','Declined'),(64,7,'bryP22',6,'bryanp21','Declined'),(65,7,'bryP22',6,'bryanp21','Accepted'),(66,7,'bryP22',6,'bryanp21','Accepted'),(67,7,'bryP22',6,'bryanp21','Declined'),(68,7,'bryP22',6,'bryanp21','Declined'),(69,6,'bryanp21',7,'bryP22','Declined'),(70,6,'bryanp21',7,'bryP22','Accepted'),(71,6,'bryanp21',7,'bryP22','Accepted'),(72,6,'bryanp21',7,'bryP22','Accepted'),(73,6,'bryanp21',7,'bryP22','Accepted'),(74,6,'bryanp21',7,'bryP22','Accepted'),(75,6,'bryanp21',7,'bryP22','Accepted'),(76,6,'bryanp21',7,'bryP22','Accepted'),(77,6,'bryanp21',7,'bryP22','Accepted'),(78,6,'bryanp21',7,'bryP22','Accepted');
/*!40000 ALTER TABLE `challenge` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game`
--

DROP TABLE IF EXISTS `game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `game` (
  `gameID` int(11) NOT NULL,
  `player1ID` int(11) NOT NULL,
  `player2ID` int(11) NOT NULL,
  `board1ID` int(11) NOT NULL,
  `board2ID` int(11) NOT NULL,
  `board1PlayerID` int(11) DEFAULT NULL,
  `board2PlayerID` int(11) DEFAULT NULL,
  `currentPlayersTurn` enum('Player1','Player2') DEFAULT NULL,
  `currentPlayersGuess` varchar(45) DEFAULT NULL,
  `player1SetupStatus` enum('Ready','Setting Up') DEFAULT NULL,
  `player2SetupStatus` enum('Ready','Setting Up') DEFAULT NULL,
  `gameStatus` enum('Started','Finished','Setting Up','Cancelled') NOT NULL,
  `winner` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`gameID`),
  KEY `fk_Game_Board11_idx` (`board1ID`),
  KEY `fk_Game_Board21_idx` (`board2ID`),
  CONSTRAINT `fk_Game_Board11` FOREIGN KEY (`board1ID`) REFERENCES `board1` (`board1id`),
  CONSTRAINT `fk_Game_Board21` FOREIGN KEY (`board2ID`) REFERENCES `board2` (`board2id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game`
--

LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
INSERT INTO `game` VALUES (78,6,7,1,1,6,7,NULL,NULL,NULL,NULL,'Started',NULL);
/*!40000 ALTER TABLE `game` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gamechat`
--

DROP TABLE IF EXISTS `gamechat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `gamechat` (
  `gameID` int(11) NOT NULL,
  `playerID` int(11) NOT NULL,
  `msg` varchar(100) NOT NULL,
  `timeOfMsg` datetime NOT NULL,
  PRIMARY KEY (`gameID`),
  CONSTRAINT `fk_GameChat_Game1` FOREIGN KEY (`gameID`) REFERENCES `game` (`gameid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gamechat`
--

LOCK TABLES `gamechat` WRITE;
/*!40000 ALTER TABLE `gamechat` DISABLE KEYS */;
/*!40000 ALTER TABLE `gamechat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lobbychat`
--

DROP TABLE IF EXISTS `lobbychat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `lobbychat` (
  `userID` int(11) NOT NULL,
  `username` varchar(45) NOT NULL,
  `message` varchar(100) NOT NULL,
  `timeOfMsg` datetime NOT NULL,
  PRIMARY KEY (`userID`,`timeOfMsg`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lobbychat`
--

LOCK TABLES `lobbychat` WRITE;
/*!40000 ALTER TABLE `lobbychat` DISABLE KEYS */;
INSERT INTO `lobbychat` VALUES (6,'bryanp21','hi','2018-11-25 10:21:41'),(6,'bryanp21','Hey!','2018-11-27 01:25:35'),(6,'bryanp21','Heyyyyyy','2018-12-05 20:41:59'),(6,'bryanp21','Whatup','2018-12-05 20:42:05'),(6,'bryanp21','Kewl','2018-12-05 20:42:23'),(6,'bryanp21','Still works','2018-12-05 21:36:11'),(6,'bryanp21','Still works bby','2018-12-06 03:04:05'),(6,'bryanp21','woot','2018-12-06 23:20:10'),(6,'bryanp21','woot','2018-12-06 23:20:12'),(6,'bryanp21','Hi','2018-12-06 23:35:20'),(6,'bryanp21','How are you?','2018-12-06 23:35:26'),(7,'bryP22','yo','2018-11-25 10:21:44'),(7,'bryP22','Yo','2018-11-27 01:25:39'),(7,'bryP22','Yo','2018-12-05 20:41:54'),(7,'bryP22','Nothing much','2018-12-05 20:42:14'),(7,'bryP22','ya ya','2018-12-06 03:04:07'),(7,'bryP22','It still works bbabby','2018-12-06 23:20:07'),(7,'bryP22','Hey','2018-12-06 23:35:18'),(7,'bryP22','Pretty good','2018-12-06 23:35:30');
/*!40000 ALTER TABLE `lobbychat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ships`
--

DROP TABLE IF EXISTS `ships`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `ships` (
  `shipName` varchar(45) NOT NULL,
  `length` int(11) NOT NULL,
  PRIMARY KEY (`shipName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ships`
--

LOCK TABLES `ships` WRITE;
/*!40000 ALTER TABLE `ships` DISABLE KEYS */;
INSERT INTO `ships` VALUES ('Battleship',4),('Carrier',5),('Destroyer',3),('Patrol Boat',2),('Submarine',3);
/*!40000 ALTER TABLE `ships` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usericon`
--

DROP TABLE IF EXISTS `usericon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `usericon` (
  `iconName` varchar(45) NOT NULL,
  `imageURL` varchar(45) NOT NULL,
  PRIMARY KEY (`iconName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usericon`
--

LOCK TABLES `usericon` WRITE;
/*!40000 ALTER TABLE `usericon` DISABLE KEYS */;
INSERT INTO `usericon` VALUES ('anchor.svg','svg/anchor.svg');
/*!40000 ALTER TABLE `usericon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `userID` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `salt` varchar(100) NOT NULL,
  `winCount` int(11) DEFAULT '0',
  `lossCount` int(11) DEFAULT '0',
  `iconName` varchar(45) NOT NULL,
  `loggedIn` enum('Yes','No') NOT NULL,
  `role` varchar(45) NOT NULL,
  PRIMARY KEY (`userID`,`iconName`),
  KEY `fk_User_UserIcon_idx` (`iconName`),
  CONSTRAINT `fk_User_UserIcon` FOREIGN KEY (`iconName`) REFERENCES `usericon` (`iconname`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (6,'bryanp21','9c55a8391001993159daaf55f336a8921f8535bbc558ff74ffbafaa7688a4b6d','2d6fe41912ac73cb5ddd14',0,0,'anchor.svg','Yes','admin'),(7,'bryP22','497688fc98771d40386d10b13a7a0c4a38094018d09d5190bb90e15dce40aaae','4e01432b132d1802218757',0,0,'anchor.svg','Yes','user');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-12-07  2:44:16
