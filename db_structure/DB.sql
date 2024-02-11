-- MySQL dump 10.13  Distrib 8.0.27, for Linux (x86_64)
--
-- Host: localhost    Database: base_ecommerce
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `ADDRESS`
--

DROP TABLE IF EXISTS `ADDRESS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ADDRESS` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `street` varchar(120) NOT NULL,
  `number` varchar(10) NOT NULL,
  `complement` varchar(120) DEFAULT NULL,
  `district` varchar(80) NOT NULL,
  `city` varchar(180) NOT NULL,
  `state` varchar(2) NOT NULL,
  `zip_code` varchar(8) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_ADDRESS_USERS` (`id_user`),
  CONSTRAINT `FK_ADDRESS_USERS` FOREIGN KEY (`id_user`) REFERENCES `USERS` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ADDRESS`
--

LOCK TABLES `ADDRESS` WRITE;
/*!40000 ALTER TABLE `ADDRESS` DISABLE KEYS */;
INSERT INTO `ADDRESS` VALUES (1,1,'Antônio Martins','14','Apto 101','Centro','Nova Serrana','MG','35519000','2024-02-10 15:29:12',NULL),(2,2,'Vital Paulino','320','Casa','Laranjeiras','Nova Serrana','MG','35519000','2024-02-10 15:29:12',NULL);
/*!40000 ALTER TABLE `ADDRESS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CARTS`
--

DROP TABLE IF EXISTS `CARTS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CARTS` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_CARTS_USERS` (`id_user`),
  CONSTRAINT `FK_CARTS_USERS` FOREIGN KEY (`id_user`) REFERENCES `USERS` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CARTS`
--

LOCK TABLES `CARTS` WRITE;
/*!40000 ALTER TABLE `CARTS` DISABLE KEYS */;
/*!40000 ALTER TABLE `CARTS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PHONES`
--

DROP TABLE IF EXISTS `PHONES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PHONES` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `phone` varchar(12) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_PHONES_USERS` (`id_user`),
  CONSTRAINT `FK_PHONES_USERS` FOREIGN KEY (`id_user`) REFERENCES `USERS` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PHONES`
--

LOCK TABLES `PHONES` WRITE;
/*!40000 ALTER TABLE `PHONES` DISABLE KEYS */;
INSERT INTO `PHONES` VALUES (1,1,'37999783780','2024-02-10 15:30:40',NULL),(2,1,'37999784040','2024-02-10 15:30:40',NULL),(3,1,'3732263226','2024-02-10 15:30:40',NULL),(4,2,'37988887777','2024-02-10 15:30:40',NULL),(5,1,'3732253225','2024-02-10 15:30:40',NULL);
/*!40000 ALTER TABLE `PHONES` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PRODUCTS`
--

DROP TABLE IF EXISTS `PRODUCTS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PRODUCTS` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(180) NOT NULL,
  `brand` varchar(45) NOT NULL,
  `color` varchar(80) NOT NULL,
  `size` varchar(5) DEFAULT NULL,
  `price` decimal(10,0) NOT NULL,
  `stock` int DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PRODUCTS`
--

LOCK TABLES `PRODUCTS` WRITE;
/*!40000 ALTER TABLE `PRODUCTS` DISABLE KEYS */;
/*!40000 ALTER TABLE `PRODUCTS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PRODUCT_LIST`
--

DROP TABLE IF EXISTS `PRODUCT_LIST`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PRODUCT_LIST` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_cart` int NOT NULL,
  `id_product` int NOT NULL,
  `QUANTITY` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_PRODUCT_LIST_CARTS_idx` (`id_cart`),
  KEY `FK_PRODUCTS_LIST_PRODUCTS_idx` (`id_product`),
  CONSTRAINT `FK_PRODUCTS_LIST_CARTS` FOREIGN KEY (`id_cart`) REFERENCES `CARTS` (`id`),
  CONSTRAINT `FK_PRODUCTS_LIST_PRODUCTS` FOREIGN KEY (`id_product`) REFERENCES `PRODUCTS` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PRODUCT_LIST`
--

LOCK TABLES `PRODUCT_LIST` WRITE;
/*!40000 ALTER TABLE `PRODUCT_LIST` DISABLE KEYS */;
/*!40000 ALTER TABLE `PRODUCT_LIST` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USERS`
--

DROP TABLE IF EXISTS `USERS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `USERS` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userName` varchar(120) NOT NULL,
  `cpf_cnpj` varchar(14) NOT NULL,
  `email` varchar(80) NOT NULL,
  `type_user` int NOT NULL,
  `theme` varchar(5) DEFAULT NULL,
  `userPassword` varchar(120) NOT NULL,
  `userStatus` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ID_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USERS`
--

LOCK TABLES `USERS` WRITE;
/*!40000 ALTER TABLE `USERS` DISABLE KEYS */;
INSERT INTO `USERS` VALUES (1,'Alex Amaral','11122233344','alexsamaralns@gmail.com',1,'dark','$2a$12$PdUTZdwQhd/xMfbft5teves1.5VaE4tGzyUQgo5U6OqX9sMDcvZBK',1,'2024-02-10 15:25:06',NULL),(2,'Lorena Amélia','22333444000155','lorenaamelia@gmail.com',2,'light','$2a$12$DV.8ZDpJo59OATBni20iwOrw1xQdNyrNId.bzgc7cGS6OE/zlSpMm',1,'2024-02-10 15:27:04',NULL);
/*!40000 ALTER TABLE `USERS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USER_TYPE`
--

DROP TABLE IF EXISTS `USER_TYPE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `USER_TYPE` (
  `id` int NOT NULL,
  `description` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USER_TYPE`
--

LOCK TABLES `USER_TYPE` WRITE;
/*!40000 ALTER TABLE `USER_TYPE` DISABLE KEYS */;
INSERT INTO `USER_TYPE` VALUES (1,'SELLER'),(2,'CUSTOMER');
/*!40000 ALTER TABLE `USER_TYPE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'base_ecommerce'
--
/*!50003 DROP PROCEDURE IF EXISTS `PR_CREATE_USER` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `PR_CREATE_USER`(
    IN p_name VARCHAR(120),
    IN p_cpf_cnpj VARCHAR(14),
    IN p_email VARCHAR(80),
    IN p_password VARCHAR(120),
    IN p_type_user INT,
    IN p_status INT,
    IN p_theme VARCHAR(5),
    IN p_addresses JSON,
    IN p_phones JSON
)
BEGIN
    DECLARE user_id INT;

    -- Inserir dados na tabela USERS
    INSERT INTO USERS (userName, cpf_cnpj, email, type_user, userStatus, theme, userPassword)
    VALUES (p_name, p_cpf_cnpj, p_email, p_type_user, p_status, p_theme, p_password);

    -- Obter o ID do usuário recém-inserido
    SET user_id = LAST_INSERT_ID();

    -- Inserir dados na tabela ADDRESS
    INSERT INTO ADDRESS (id_user, street, number, complement, district, city, state, zip_code)
    SELECT user_id, address.street, address.number, address.complement, address.district, address.city, address.state, address.zip_code
    FROM JSON_TABLE(p_addresses, "$[*]" COLUMNS (
        street VARCHAR(120) PATH "$.street",
        number VARCHAR(10) PATH "$.number",
        complement VARCHAR(120) PATH "$.complement",
        district VARCHAR(80) PATH "$.district",
        city VARCHAR(180) PATH "$.city",
        state VARCHAR(2) PATH "$.state",
        zip_code VARCHAR(8) PATH "$.zip_code"
    )) AS address;

    -- Inserir dados na tabela PHONES
    INSERT INTO PHONES (id_user, phone)
    SELECT user_id, phone
    FROM JSON_TABLE(p_phones, "$[*]" COLUMNS (
        phone VARCHAR(12) PATH "$"
    )) AS phone;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `PR_GET_USER_BY_ID` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `PR_GET_USER_BY_ID`(IN idUser INT)
BEGIN
    SELECT
    U.*,
    (
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', A.id,
                'street', A.street,
                'number', A.number,
                'complement', A.complement,
                'district', A.district,
                'city', A.city,
                'state', A.state,
                'zip_code', A.zip_code
            )
        ) 
        FROM ADDRESS A
        WHERE A.id_user = U.id
    ) AS addresses,
    (
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', P.id,
                'phone', P.phone
            )
        ) 
        FROM PHONES P
        WHERE P.id_user = U.id
    ) AS phones
FROM USERS U
WHERE U.id = idUser;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-11 15:33:26
