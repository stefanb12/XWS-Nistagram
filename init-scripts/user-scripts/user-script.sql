-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: usermicroservicedb
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `__efmigrationshistory`
--

DROP TABLE IF EXISTS `__efmigrationshistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `__efmigrationshistory` (
  `MigrationId` varchar(95) NOT NULL,
  `ProductVersion` varchar(32) NOT NULL,
  PRIMARY KEY (`MigrationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `__efmigrationshistory`
--

LOCK TABLES `__efmigrationshistory` WRITE;
/*!40000 ALTER TABLE `__efmigrationshistory` DISABLE KEYS */;
INSERT INTO `__efmigrationshistory` VALUES ('20210606011755_NewMig','3.1.15');
/*!40000 ALTER TABLE `__efmigrationshistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `followrequests`
--

DROP TABLE IF EXISTS `followrequests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followrequests` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Accepted` tinyint(1) NOT NULL,
  `Processed` tinyint(1) NOT NULL,
  `ReceiverId` int NOT NULL,
  `SenderId` int NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_FollowRequests_ReceiverId` (`ReceiverId`),
  KEY `IX_FollowRequests_SenderId` (`SenderId`),
  CONSTRAINT `FK_FollowRequests_Profiles_ReceiverId` FOREIGN KEY (`ReceiverId`) REFERENCES `profiles` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_FollowRequests_Profiles_SenderId` FOREIGN KEY (`SenderId`) REFERENCES `profiles` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followrequests`
--

LOCK TABLES `followrequests` WRITE;
/*!40000 ALTER TABLE `followrequests` DISABLE KEYS */;
INSERT INTO `followrequests` VALUES (1,0,0,2,5),(2,0,0,3,5);
/*!40000 ALTER TABLE `followrequests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profileblockedprofiles`
--

DROP TABLE IF EXISTS `profileblockedprofiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profileblockedprofiles` (
  `ProfileSettingsId` int NOT NULL,
  `BlockedProfileId` int NOT NULL,
  PRIMARY KEY (`ProfileSettingsId`,`BlockedProfileId`),
  KEY `IX_ProfileBlockedProfiles_BlockedProfileId` (`BlockedProfileId`),
  CONSTRAINT `FK_ProfileBlockedProfiles_Profiles_BlockedProfileId` FOREIGN KEY (`BlockedProfileId`) REFERENCES `profiles` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_ProfileBlockedProfiles_ProfileSettings_ProfileSettingsId` FOREIGN KEY (`ProfileSettingsId`) REFERENCES `profilesettings` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profileblockedprofiles`
--

LOCK TABLES `profileblockedprofiles` WRITE;
/*!40000 ALTER TABLE `profileblockedprofiles` DISABLE KEYS */;
INSERT INTO `profileblockedprofiles` VALUES (1,4);
/*!40000 ALTER TABLE `profileblockedprofiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profileclosefriends`
--

DROP TABLE IF EXISTS `profileclosefriends`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profileclosefriends` (
  `ProfileId` int NOT NULL,
  `CloseFriendId` int NOT NULL,
  PRIMARY KEY (`ProfileId`,`CloseFriendId`),
  KEY `IX_ProfileCloseFriends_CloseFriendId` (`CloseFriendId`),
  CONSTRAINT `FK_ProfileCloseFriends_Profiles_CloseFriendId` FOREIGN KEY (`CloseFriendId`) REFERENCES `profiles` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_ProfileCloseFriends_Profiles_ProfileId` FOREIGN KEY (`ProfileId`) REFERENCES `profiles` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profileclosefriends`
--

LOCK TABLES `profileclosefriends` WRITE;
/*!40000 ALTER TABLE `profileclosefriends` DISABLE KEYS */;
INSERT INTO `profileclosefriends` VALUES (1,2),(3,2),(2,3);
/*!40000 ALTER TABLE `profileclosefriends` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profilefollowers`
--

DROP TABLE IF EXISTS `profilefollowers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profilefollowers` (
  `ProfileId` int NOT NULL,
  `FollowerId` int NOT NULL,
  PRIMARY KEY (`ProfileId`,`FollowerId`),
  KEY `IX_ProfileFollowers_FollowerId` (`FollowerId`),
  CONSTRAINT `FK_ProfileFollowers_Profiles_FollowerId` FOREIGN KEY (`FollowerId`) REFERENCES `profiles` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_ProfileFollowers_Profiles_ProfileId` FOREIGN KEY (`ProfileId`) REFERENCES `profiles` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profilefollowers`
--

LOCK TABLES `profilefollowers` WRITE;
/*!40000 ALTER TABLE `profilefollowers` DISABLE KEYS */;
INSERT INTO `profilefollowers` VALUES (2,1),(3,1),(5,1),(1,2),(4,2),(1,3),(2,3);
/*!40000 ALTER TABLE `profilefollowers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profilefollowings`
--

DROP TABLE IF EXISTS `profilefollowings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profilefollowings` (
  `ProfileId` int NOT NULL,
  `FollowingId` int NOT NULL,
  PRIMARY KEY (`ProfileId`,`FollowingId`),
  KEY `IX_ProfileFollowings_FollowingId` (`FollowingId`),
  CONSTRAINT `FK_ProfileFollowings_Profiles_FollowingId` FOREIGN KEY (`FollowingId`) REFERENCES `profiles` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_ProfileFollowings_Profiles_ProfileId` FOREIGN KEY (`ProfileId`) REFERENCES `profiles` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profilefollowings`
--

LOCK TABLES `profilefollowings` WRITE;
/*!40000 ALTER TABLE `profilefollowings` DISABLE KEYS */;
INSERT INTO `profilefollowings` VALUES (2,1),(3,1),(1,2),(3,2),(1,3),(2,4),(1,5);
/*!40000 ALTER TABLE `profilefollowings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profilemutedprofiles`
--

DROP TABLE IF EXISTS `profilemutedprofiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profilemutedprofiles` (
  `ProfileSettingsId` int NOT NULL,
  `MutedProfileId` int NOT NULL,
  PRIMARY KEY (`ProfileSettingsId`,`MutedProfileId`),
  KEY `IX_ProfileMutedProfiles_MutedProfileId` (`MutedProfileId`),
  CONSTRAINT `FK_ProfileMutedProfiles_Profiles_MutedProfileId` FOREIGN KEY (`MutedProfileId`) REFERENCES `profiles` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_ProfileMutedProfiles_ProfileSettings_ProfileSettingsId` FOREIGN KEY (`ProfileSettingsId`) REFERENCES `profilesettings` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profilemutedprofiles`
--

LOCK TABLES `profilemutedprofiles` WRITE;
/*!40000 ALTER TABLE `profilemutedprofiles` DISABLE KEYS */;
INSERT INTO `profilemutedprofiles` VALUES (1,2);
/*!40000 ALTER TABLE `profilemutedprofiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profiles`
--

DROP TABLE IF EXISTS `profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profiles` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Username` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Password` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `FullName` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Email` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `MobilePhone` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `DateOfBirth` datetime(6) NOT NULL,
  `Gender` int NOT NULL,
  `UserRole` int NOT NULL,
  `IsPrivate` tinyint(1) NOT NULL,
  `Website` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Biography` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Deactivated` tinyint(1) NOT NULL,
  `Category` int NOT NULL,
  `ProfileSettingsId` int NOT NULL,
  `ImageName` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`Id`),
  KEY `IX_Profiles_ProfileSettingsId` (`ProfileSettingsId`),
  CONSTRAINT `FK_Profiles_ProfileSettings_ProfileSettingsId` FOREIGN KEY (`ProfileSettingsId`) REFERENCES `profilesettings` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profiles`
--

LOCK TABLES `profiles` WRITE;
/*!40000 ALTER TABLE `profiles` DISABLE KEYS */;
INSERT INTO `profiles` VALUES (1,'stefanb','pass','Stefan Beljic','stefanb@gmail.com','+381 60 15 88 444','1998-11-25 00:00:00.000000',0,0,0,'WebSite1','bio',0,0,1,'user1213352029.jpg'),(2,'matijam','pass','Matija Mijalkovic','matijam@gmail.com','+381 20 55 88 444','1998-10-24 00:00:00.000000',0,0,1,'WebSite2','bio',0,0,2,'user2213352029.jpg'),(3,'aleksai','pass','Aleksa Ivanic','aleksai@gmail.com','+381 60 35 88 444','1998-09-23 00:00:00.000000',0,1,1,'WebSite3','bio',0,0,3,'user3213352029.png'),(4,'stefans','pass','Stefan Savic','stefans@gmail.com','+381 60 45 88 444','1998-08-22 00:00:00.000000',0,1,0,'WebSite4','bio',0,0,4,'user4213352029.png'),(5,'majam','pass','Maja Majkic','majam@gmail.com','+381 60 55 58 444','1998-07-21 00:00:00.000000',1,1,0,'WebSite4','bio',0,0,5,'user5213352029.jpg');
/*!40000 ALTER TABLE `profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profilesettings`
--

DROP TABLE IF EXISTS `profilesettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profilesettings` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `ReceiveAllMessages` tinyint(1) NOT NULL,
  `TagAllowed` tinyint(1) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profilesettings`
--

LOCK TABLES `profilesettings` WRITE;
/*!40000 ALTER TABLE `profilesettings` DISABLE KEYS */;
INSERT INTO `profilesettings` VALUES (1,1,1),(2,1,1),(3,1,1),(4,1,1),(5,1,1);
/*!40000 ALTER TABLE `profilesettings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profileverificationrequests`
--

DROP TABLE IF EXISTS `profileverificationrequests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profileverificationrequests` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `FirstName` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `LastName` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Category` int NOT NULL,
  `DocumentPicture` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Accepted` tinyint(1) NOT NULL,
  `Processed` tinyint(1) NOT NULL,
  `ProfileId` int NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_ProfileVerificationRequests_ProfileId` (`ProfileId`),
  CONSTRAINT `FK_ProfileVerificationRequests_Profiles_ProfileId` FOREIGN KEY (`ProfileId`) REFERENCES `profiles` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profileverificationrequests`
--

LOCK TABLES `profileverificationrequests` WRITE;
/*!40000 ALTER TABLE `profileverificationrequests` DISABLE KEYS */;
/*!40000 ALTER TABLE `profileverificationrequests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registrationrequests`
--

DROP TABLE IF EXISTS `registrationrequests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registrationrequests` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `ValidEmail` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `WebsiteLink` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Accepted` tinyint(1) NOT NULL,
  `Processed` tinyint(1) NOT NULL,
  `AgentId` int NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_RegistrationRequests_AgentId` (`AgentId`),
  CONSTRAINT `FK_RegistrationRequests_Profiles_AgentId` FOREIGN KEY (`AgentId`) REFERENCES `profiles` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registrationrequests`
--

LOCK TABLES `registrationrequests` WRITE;
/*!40000 ALTER TABLE `registrationrequests` DISABLE KEYS */;
/*!40000 ALTER TABLE `registrationrequests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'usermicroservicedb'
--

--
-- Dumping routines for database 'usermicroservicedb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-06 16:19:00
