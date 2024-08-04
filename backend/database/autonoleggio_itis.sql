-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Giu 02, 2024 alle 18:36
-- Versione del server: 10.4.32-MariaDB
-- Versione PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `autonoleggio_itis`
--
CREATE DATABASE IF NOT EXISTS `autonoleggio_itis` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `autonoleggio_itis`;

-- --------------------------------------------------------

--
-- Struttura della tabella `cartadicredito`
--

CREATE TABLE `cartadicredito` (
  `id_cartadicredito` int(11) NOT NULL,
  `id_cliente` int(11) DEFAULT NULL,
  `numero_carta` varchar(20) DEFAULT NULL,
  `scadenza` date DEFAULT NULL,
  `ccv` varchar(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `cartadicredito`
--

INSERT INTO `cartadicredito` (`id_cartadicredito`, `id_cliente`, `numero_carta`, `scadenza`, `ccv`) VALUES
(2, 2, '2345678923456789', '2026-11-30', '234'),
(3, 3, '3456789034567890', '2027-10-31', '345'),
(4, 4, '4567890145678901', '2028-09-30', '456'),
(5, 5, '5678901256789012', '2029-08-31', '567'),
(6, 6, '6789012367890123', '2030-07-31', '678'),
(7, 7, '7890123478901234', '2031-06-30', '789'),
(8, 8, '8901234589012345', '2032-05-31', '890'),
(9, 9, '9012345690123456', '2033-04-30', '901'),
(10, 10, '0123456701234567', '2034-03-31', '012');

-- --------------------------------------------------------

--
-- Struttura della tabella `cliente`
--

CREATE TABLE `cliente` (
  `id_cliente` int(11) NOT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `cognome` varchar(100) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `data_di_nascita` date DEFAULT NULL,
  `admin` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `cliente`
--

INSERT INTO `cliente` (`id_cliente`, `nome`, `cognome`, `email`, `password`, `telefono`, `data_di_nascita`, `admin`) VALUES
(2, 'Luca', 'Bianchi', 'luca.bianchi@example.com', 'password123', '1234567891', '1990-02-20', 0),
(3, 'Giulia', 'Verdi', 'giulia.verdi@example.com', 'password123', '1234567892', '1988-03-25', 0),
(4, 'Anna', 'Neri', 'anna.neri@example.com', 'password123', '1234567893', '1982-04-30', 0),
(5, 'Paolo', 'Gialli', 'paolo.gialli@example.com', 'password123', '1234567894', '1980-05-10', 0),
(6, 'Chiara', 'Blu', 'chiara.blu@example.com', 'password123', '1234567895', '1995-06-15', 0),
(7, 'Francesco', 'Rosa', 'francesco.rosa@example.com', 'password123', '1234567896', '1978-07-20', 0),
(8, 'Sara', 'Marroni', 'sara.marroni@example.com', 'password123', '1234567897', '1992-08-25', 0),
(9, 'Lorenzo', 'Viola', 'lorenzo.viola@example.com', 'password123', '1234567898', '1984-09-30', 0),
(10, 'Valentina', 'Grigi', 'valentina.grigi@example.com', 'password123', '1234567899', '1986-10-05', 0),
(11, 'Paolo', 'Rossini', 'paolo@admin.com', '$2y$10$eXmKVrhAqt.DaD0r2Ursge85V1eKcDJ/GJXTRqDoCAsHa/GDVjKGK', '+39', '2019-12-31', 1),
(12, 'Paolo', 'Rossini', 'paolo@notadmin.com', '$2y$10$nVxXxpJYR/C1V7j0maDEkuCoBye0Gj88ALNFCun/o2.6FvoinL9US', '+39', '2019-12-31', 0),
(13, 'Halid', 'Cisse', 'halidcisse@gmail.com', '$2y$10$5fCwoTe7sOUsQwIOQNA1COBHWlgnm5ZUybM7D6SAaT72sXkwwF9Ky', '+393512784563', '2004-04-30', 1),
(14, 'Lovedeep', 'Singh', 'lovedeepSingh@gmail.com', '$2y$10$lvyiMkgksxo.dAjswlWWmea9Okag0qtyvYpG9JbK9b8QAV5DzT8ea', '+393278953421', '2005-10-06', 1),
(15, 'Mohammad', 'Haseeb', 'mohammadHaseeb@gmail.com', '$2y$10$yNbhYbfGML9FiCvOkQ1Bm.PlUYbadrwW5iNsFhsCsaM7YWWig3FMe', '+393726784530', '2005-09-05', 1),
(16, 'Tommaso', 'Bertozzi', 'tommasobertozzi@gmail.com', '$2y$10$SNQrUggs7CqM7kttinDJX.NdK3IAKAQKk40qQ1Lgp4VoPnKmQSwbm', '+393198751745', '2005-11-24', 1),
(17, 'Kwaw', 'Adzakey', 'adzakeykwaw@gmail.com', '$2y$10$qdNq66zWIpYt0ex6iok3Oe3ih6xk/ksGWBc32zkoGaJqnjSOBubkm', '+393642895467', '2005-09-15', 1),
(18, 'Halidou', 'Cisse', 'halidcisse346@gmail.com', '$2y$10$x8m6JpPYzPmh1Ue2wyT8i.OIzSCJ3fb9pDx7Sq8EkfxJ.gHwb/Dx2', '+393908754532', '2004-04-30', 0);

-- --------------------------------------------------------

--
-- Struttura della tabella `codiceotp`
--

CREATE TABLE `codiceotp` (
  `id_codiceotp` int(11) NOT NULL,
  `codice` char(60) DEFAULT NULL,
  `id_transazionefinanziaria` int(11) DEFAULT NULL,
  `data_generazione` datetime DEFAULT NULL,
  `data_scadenza` datetime DEFAULT NULL,
  `stato` enum('pending','failed','successful','expired','used','void') DEFAULT NULL,
  `id_cliente` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `codiceotp`
--

INSERT INTO `codiceotp` (`id_codiceotp`, `codice`, `id_transazionefinanziaria`, `data_generazione`, `data_scadenza`, `stato`, `id_cliente`) VALUES
(2, 'TRX002', 2, '2024-05-02 13:00:00', '2024-06-02 13:00:00', 'pending', NULL),
(3, 'TRX003', 3, '2024-05-03 14:00:00', '2024-06-03 14:00:00', 'pending', NULL),
(4, 'TRX004', 4, '2024-05-04 15:00:00', '2024-06-04 15:00:00', 'pending', NULL),
(5, 'TRX005', 5, '2024-05-05 16:00:00', '2024-06-05 16:00:00', 'pending', NULL),
(6, 'TRX006', 6, '2024-05-06 17:00:00', '2024-06-06 17:00:00', 'pending', NULL),
(7, 'TRX007', 7, '2024-05-07 18:00:00', '2024-06-07 18:00:00', 'pending', NULL),
(8, 'TRX008', 8, '2024-05-08 19:00:00', '2024-06-08 19:00:00', 'pending', NULL),
(9, 'TRX009', 9, '2024-05-09 20:00:00', '2024-06-09 20:00:00', 'pending', NULL),
(10, 'TRX010', 10, '2024-05-10 21:00:00', '2024-06-10 21:00:00', 'pending', NULL),
(11, '069846', NULL, '2024-05-29 18:07:58', '2024-05-29 18:09:58', 'pending', 11),
(12, '753158', NULL, '2024-05-29 18:08:49', '2024-05-29 18:10:49', 'pending', 11),
(13, '910830', NULL, '2024-05-29 18:09:23', '2024-05-29 18:11:23', 'pending', 11),
(14, '910830', NULL, '2024-05-29 18:09:52', '2024-05-29 18:11:52', 'pending', 11),
(15, '626908', NULL, '2024-05-29 18:10:13', '2024-05-29 18:12:13', 'pending', 11),
(16, '626908', NULL, '2024-05-29 18:10:32', '2024-05-29 18:12:32', 'pending', 11),
(17, '840351', NULL, '2024-05-29 18:11:05', '2024-05-29 18:13:05', 'pending', 11),
(18, '291633', NULL, '2024-05-29 18:12:18', '2024-05-29 18:14:18', 'pending', 11),
(19, '407808', NULL, '2024-05-29 18:13:06', '2024-05-29 18:15:06', 'pending', 11),
(20, '407808', NULL, '2024-05-29 18:13:37', '2024-05-29 18:15:37', 'pending', 11),
(21, '407808', NULL, '2024-05-29 18:13:48', '2024-05-29 18:15:48', 'pending', 11),
(22, '674758', NULL, '2024-05-29 18:14:38', '2024-05-29 18:16:38', 'pending', 11),
(23, '674758', NULL, '2024-05-29 18:14:51', '2024-05-29 18:16:51', 'pending', 11),
(24, '350203', NULL, '2024-05-29 18:15:20', '2024-05-29 18:17:20', 'pending', 11),
(25, '350203', NULL, '2024-05-29 18:15:39', '2024-05-29 18:17:39', 'pending', 11),
(26, '350203', NULL, '2024-05-29 18:15:46', '2024-05-29 18:17:46', 'pending', 11),
(27, '350203', NULL, '2024-05-29 18:15:59', '2024-05-29 18:17:59', 'pending', 11),
(28, '986307', NULL, '2024-05-29 18:18:01', '2024-05-29 18:20:01', 'pending', 11),
(29, '986307', NULL, '2024-05-29 18:18:05', '2024-05-29 18:20:05', 'void', 11),
(30, '097738', NULL, '2024-05-29 20:16:11', '2024-05-29 20:18:11', 'successful', 17),
(31, '370764', NULL, '2024-05-29 21:34:28', '2024-05-29 21:36:28', 'successful', 16),
(32, '$2y$10$VcBliKbzaMf3m3LXbuc/w.UZym20hZ201sIlY3gj9B4.mhxV/99Aa', NULL, '2024-05-29 21:37:49', '2024-05-29 21:39:49', 'pending', 16),
(33, '$2y$10$oPgakyFlYlFDQjxUQYqUA.bNDmV8LQ3IfiCY3ykcmvLwkzSccjSdm', NULL, '2024-05-29 21:38:22', '2024-05-29 21:40:22', 'successful', 16),
(34, '$2y$10$9qeLGMc2hLgMh3aOvM4QpeNF.4R90v6ZlxnrplnJEOFXwP69dH3T.', NULL, '2024-05-30 10:29:07', '2024-05-30 10:31:07', 'pending', NULL),
(35, '$2y$10$Apr/xtgzQcsoEbvJNfLpEOXNliXp7Zn36qCUwIzCHJBfrYdbiEvJq', NULL, '2024-05-30 10:29:11', '2024-05-30 10:31:11', 'pending', NULL),
(36, '$2y$10$6bL/bDD94iks5T49Hoiyv.3uqXPmY4Fbzpl.c1Xdp6ks8K7TaeVRe', NULL, '2024-05-30 10:39:22', '2024-05-30 10:41:22', 'failed', 17),
(37, '$2y$10$hz2T1IUtPSLA3qFDjiaWq.kKwTOb5oqN4sQDM3X6aaMswpp8s5UXK', NULL, '2024-05-30 11:20:31', '2024-05-30 11:22:31', 'expired', 17),
(38, '$2y$10$lj5aYvmLo7bGgU.BrApUCu9jY62YcVN6oMa3kQZsgfHjBuuzBfHte', NULL, '2024-05-30 11:29:17', '2024-05-30 11:31:17', 'expired', 17),
(39, '$2y$10$UO2anrHQVoz7OObbAtbyx.WW9/jsoWhRB2rrL66zdmzPSFQiAqULi', NULL, '2024-05-30 17:20:51', '2024-05-30 17:22:51', 'expired', 17),
(40, '$2y$10$r9y3pbPKAS8pHyRPCs4HMeUGTAM2/DmBLOollW.ASjYGqK2Knd11a', NULL, '2024-05-31 18:08:03', '2024-05-31 18:10:03', 'pending', 17),
(41, '$2y$10$0svpwTtQCEwhrAWMcLbgXOjmBzPx.j3DJfzRXhvIh4oxHL7gvo2UG', NULL, '2024-06-02 18:26:52', '2024-06-02 18:28:52', 'pending', 18);

-- --------------------------------------------------------

--
-- Struttura della tabella `dispositivogps`
--

CREATE TABLE `dispositivogps` (
  `id_dispositivogps` int(11) NOT NULL,
  `longitudine` decimal(10,6) DEFAULT NULL,
  `latitudine` decimal(10,6) DEFAULT NULL,
  `timestamp` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `dispositivogps`
--

INSERT INTO `dispositivogps` (`id_dispositivogps`, `longitudine`, `latitudine`, `timestamp`) VALUES
(1, 12.496400, 41.902800, '2024-05-01 12:00:00'),
(2, 9.189500, 45.464200, '2024-05-02 13:00:00'),
(3, 14.268100, 40.851800, '2024-05-03 14:00:00'),
(4, 12.315500, 45.440800, '2024-05-04 15:00:00'),
(5, 8.946300, 44.405600, '2024-05-05 16:00:00'),
(6, 13.776800, 45.649500, '2024-05-06 17:00:00'),
(7, 7.686900, 45.070300, '2024-05-07 18:00:00'),
(8, 16.871900, 41.117100, '2024-05-08 19:00:00'),
(9, 13.361500, 38.115700, '2024-05-09 20:00:00'),
(10, 11.255800, 43.769600, '2024-05-10 21:00:00'),
(11, 10.863100, 45.406400, '2024-05-11 22:00:00'),
(12, 12.238900, 41.748600, '2024-05-12 23:00:00'),
(13, 9.210600, 44.801500, '2024-05-13 00:00:00'),
(14, 14.782800, 40.682400, '2024-05-14 01:00:00'),
(15, 9.211400, 45.476200, '2024-05-15 02:00:00'),
(16, 11.342600, 44.494900, '2024-05-16 03:00:00'),
(17, 15.647700, 38.210500, '2024-05-17 04:00:00'),
(18, 10.403600, 43.722800, '2024-05-18 05:00:00'),
(19, 9.690200, 45.465400, '2024-05-19 06:00:00'),
(20, 13.506600, 43.617200, '2024-05-20 07:00:00'),
(21, 8.614100, 44.285600, '2024-05-21 08:00:00'),
(22, 12.564500, 44.646900, '2024-05-22 09:00:00'),
(23, 13.630200, 45.634000, '2024-05-23 10:00:00'),
(24, 14.150800, 42.461800, '2024-05-24 11:00:00'),
(25, 15.560000, 41.216200, '2024-05-25 12:00:00'),
(26, 12.452200, 43.100000, '2024-05-26 13:00:00'),
(27, 8.962100, 45.636100, '2024-05-27 14:00:00'),
(28, 11.097500, 46.066100, '2024-05-28 15:00:00'),
(29, 11.878100, 45.406400, '2024-05-29 16:00:00'),
(30, 8.516700, 40.900600, '2024-05-30 17:00:00'),
(31, 8.878600, 40.720700, '2024-05-31 18:00:00'),
(32, 9.190000, 45.479100, '2024-06-01 19:00:00'),
(33, 12.315500, 45.440800, '2024-06-02 20:00:00'),
(34, 12.496400, 41.902800, '2024-06-03 21:00:00'),
(35, 8.946300, 44.405600, '2024-06-04 22:00:00'),
(36, 13.776800, 45.649500, '2024-06-05 23:00:00'),
(37, 7.686900, 45.070300, '2024-06-06 00:00:00'),
(38, 16.871900, 41.117100, '2024-06-07 01:00:00'),
(39, 13.361500, 38.115700, '2024-06-08 02:00:00');

-- --------------------------------------------------------

--
-- Struttura della tabella `fotoveicolo`
--

CREATE TABLE `fotoveicolo` (
  `id_fotoveicolo` int(11) NOT NULL,
  `id_veicolo` int(11) DEFAULT NULL,
  `nome_foto` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `fotoveicolo`
--

INSERT INTO `fotoveicolo` (`id_fotoveicolo`, `id_veicolo`, `nome_foto`) VALUES
(1, 1, 'AudiQ31'),
(2, 1, 'AudiQ32'),
(3, 1, 'AudiQ33'),
(4, 1, 'AudiQ34'),
(5, 2, 'AudiS41'),
(6, 2, 'AudiS42'),
(7, 2, 'AudiS43'),
(8, 2, 'AudiS44'),
(9, 3, 'BMWSeries51'),
(10, 3, 'BMWSeries52'),
(11, 3, 'BMWSeries53'),
(12, 3, 'BMWSeries54'),
(13, 4, 'BMWI4M50Sport1'),
(14, 4, 'BMWI4M50Sport2'),
(15, 4, 'BMWI4M50Sport3'),
(16, 4, 'BMWI4M50Sport4'),
(17, 5, 'BMWiX401'),
(18, 5, 'BMWiX402'),
(19, 5, 'BMWiX403'),
(20, 5, 'BMWiX404'),
(21, 6, 'BMWSerie2MCoupe240ixDrive1'),
(22, 6, 'BMWSerie2MCoupe240ixDrive2'),
(23, 6, 'BMWSerie2MCoupe240ixDrive3'),
(24, 6, 'BMWSerie2MCoupe240ixDrive4'),
(25, 7, 'BMWSerie4GranCoupe1'),
(26, 7, 'BMWSerie4GranCoupe2'),
(27, 7, 'BMWSerie4GranCoupe3'),
(28, 7, 'BMWSerie4GranCoupe4'),
(29, 8, 'BugattiChiron1'),
(30, 8, 'BugattiChiron2'),
(31, 8, 'BugattiChiron3'),
(32, 8, 'BugattiChiron4'),
(33, 9, 'Fiat500X1'),
(34, 9, 'Fiat500X2'),
(35, 9, 'Fiat500X3'),
(36, 9, 'Fiat500X4'),
(37, 10, 'FordFiesta1'),
(38, 10, 'FordFiesta2'),
(39, 10, 'FordFiesta3'),
(40, 10, 'FordFiesta4'),
(41, 11, 'FordPuma1'),
(42, 11, 'FordPuma2'),
(43, 11, 'FordPuma3'),
(44, 11, 'FordPuma4'),
(45, 12, 'JeepRenegade1'),
(46, 12, 'JeepRenegade2'),
(47, 12, 'JeepRenegade3'),
(48, 12, 'JeepRenegade4'),
(49, 13, 'LamborghiniAventador1'),
(50, 13, 'LamborghiniAventador2'),
(51, 13, 'LamborghiniAventador3'),
(52, 13, 'LamborghiniAventador4'),
(53, 14, 'LamborghiniHuracan1'),
(54, 14, 'LamborghiniHuracan2'),
(55, 14, 'LamborghiniHuracan3'),
(56, 14, 'LamborghiniHuracan4'),
(57, 15, 'LamborghiniUrus1'),
(58, 15, 'LamborghiniUrus2'),
(59, 15, 'LamborghiniUrus3'),
(60, 15, 'LamborghiniUrus4'),
(61, 16, 'LandLoverDefender1'),
(62, 16, 'LandLoverDefender2'),
(63, 16, 'LandLoverDefender3'),
(64, 16, 'LandLoverDefender4'),
(65, 17, 'LexusNx1'),
(66, 17, 'LexusNx2'),
(67, 17, 'LexusNx3'),
(68, 17, 'LexusNx4'),
(69, 18, 'MadzaCX90PHEV1'),
(70, 18, 'MadzaCX90PHEV2'),
(71, 18, 'MadzaCX90PHEV3'),
(72, 18, 'MadzaCX90PHEV4'),
(73, 19, 'MaseratiQuattroPorte1'),
(74, 19, 'MaseratiQuattroPorte2'),
(75, 19, 'MaseratiQuattroPorte3'),
(76, 19, 'MaseratiQuattroPorte4'),
(77, 20, 'McLarenArtura1'),
(78, 20, 'McLarenArtura2'),
(79, 20, 'McLarenArtura3'),
(80, 20, 'McLarenArtura4'),
(81, 21, 'McLarenGT1'),
(82, 21, 'McLarenGT2'),
(83, 21, 'McLarenGT3'),
(84, 21, 'McLarenGT4'),
(85, 22, 'MercedesBenzE1'),
(86, 22, 'MercedesBenzE2'),
(87, 22, 'MercedesBenzE3'),
(88, 22, 'MercedesBenzE4'),
(89, 23, 'MercedesGLE1'),
(90, 23, 'MercedesGLE2'),
(91, 23, 'MercedesGLE3'),
(92, 23, 'MercedesGLE4'),
(93, 24, 'MercedesGLC1'),
(94, 24, 'MercedesGLC2'),
(95, 24, 'MercedesGLC3'),
(96, 24, 'MercedesGLC4'),
(97, 25, 'MiniCooperTurbo1'),
(98, 25, 'MiniCooperTurbo2'),
(99, 25, 'MiniCooperTurbo3'),
(100, 25, 'MiniCooperTurbo4'),
(101, 26, 'NissanRogue1'),
(102, 26, 'NissanRogue2'),
(103, 26, 'NissanRogue3'),
(104, 26, 'NissanRogue4'),
(105, 27, 'Polestar21'),
(106, 27, 'Polestar22'),
(107, 27, 'Polestar23'),
(108, 27, 'Polestar24'),
(109, 28, 'Porsce9111'),
(110, 28, 'Porsce9112'),
(111, 28, 'Porsce9113'),
(112, 28, 'Porsce9114'),
(113, 29, 'RangeRoverLover1'),
(114, 29, 'RangeRoverLover2'),
(115, 29, 'RangeRoverLover3'),
(116, 29, 'RangeRoverLover4'),
(121, 30, 'ToyotaAygoX1'),
(122, 30, 'ToyotaAygoX2'),
(123, 30, 'ToyotaAygoX3'),
(124, 30, 'ToyotaAygoX4'),
(125, 31, 'ToyotaCorolla1'),
(126, 31, 'ToyotaCorolla2'),
(127, 31, 'ToyotaCorolla3'),
(128, 31, 'ToyotaCorolla4'),
(129, 32, 'ToyotaGT861'),
(130, 32, 'ToyotaGT862'),
(131, 32, 'ToyotaGT863'),
(132, 32, 'ToyotaGT864'),
(133, 33, 'ToyotaLandCruiser1'),
(134, 33, 'ToyotaLandCruiser2'),
(135, 33, 'ToyotaLandCruiser3'),
(136, 33, 'ToyotaLandCruiser4'),
(137, 34, 'ToyotaRav41'),
(138, 34, 'ToyotaRav42'),
(139, 34, 'ToyotaRav43'),
(140, 34, 'ToyotaRav44'),
(141, 35, 'ToyotaTundra1'),
(142, 35, 'ToyotaTundra2'),
(143, 35, 'ToyotaTundra3'),
(144, 35, 'ToyotaTundra4'),
(145, 36, 'FerrariRoma1'),
(146, 36, 'FerrariRoma2'),
(147, 36, 'FerrariRoma3'),
(148, 36, 'FerrariRoma4');

-- --------------------------------------------------------

--
-- Struttura della tabella `noleggiare`
--

CREATE TABLE `noleggiare` (
  `id_cliente` int(11) NOT NULL,
  `id_veicolo` int(11) NOT NULL,
  `data_inizio` datetime DEFAULT NULL,
  `data_fine` datetime DEFAULT NULL,
  `somma_bloccata` decimal(10,2) DEFAULT NULL,
  `id_transazionefinanziaria` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `noleggiare`
--

INSERT INTO `noleggiare` (`id_cliente`, `id_veicolo`, `data_inizio`, `data_fine`, `somma_bloccata`, `id_transazionefinanziaria`) VALUES
(2, 2, '2024-05-02 11:00:00', '2024-05-06 11:00:00', 150.00, NULL),
(3, 3, '2024-05-03 12:00:00', '2024-05-07 12:00:00', 200.00, NULL),
(4, 4, '2024-05-04 13:00:00', '2024-05-08 13:00:00', 250.00, NULL),
(5, 5, '2024-05-05 14:00:00', '2024-05-09 14:00:00', 300.00, NULL),
(6, 6, '2024-05-06 15:00:00', '2024-05-10 15:00:00', 350.00, NULL),
(7, 7, '2024-05-07 16:00:00', '2024-05-11 16:00:00', 400.00, NULL),
(8, 8, '2024-05-08 17:00:00', '2024-05-12 17:00:00', 450.00, NULL),
(9, 9, '2024-05-09 18:00:00', '2024-05-13 18:00:00', 500.00, NULL),
(10, 10, '2024-05-10 19:00:00', '2024-05-14 19:00:00', 550.00, NULL);

-- --------------------------------------------------------

--
-- Struttura della tabella `preferire`
--

CREATE TABLE `preferire` (
  `id_cliente` int(11) NOT NULL,
  `id_veicolo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `preferire`
--

INSERT INTO `preferire` (`id_cliente`, `id_veicolo`) VALUES
(13, 1),
(13, 4),
(17, 2),
(17, 3),
(17, 4),
(17, 5),
(17, 6),
(17, 7),
(17, 8),
(17, 9),
(17, 10),
(17, 16),
(17, 22),
(17, 23),
(17, 24),
(17, 25),
(17, 26),
(17, 27),
(17, 28),
(17, 29),
(17, 30);

-- --------------------------------------------------------

--
-- Struttura della tabella `sede`
--

CREATE TABLE `sede` (
  `id_sede` int(11) NOT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `indirizzo` varchar(255) DEFAULT NULL,
  `città` varchar(100) DEFAULT NULL,
  `cap` varchar(10) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `latitudine` decimal(10,6) DEFAULT NULL,
  `longitudine` decimal(10,6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `sede`
--

INSERT INTO `sede` (`id_sede`, `nome`, `indirizzo`, `città`, `cap`, `telefono`, `email`, `latitudine`, `longitudine`) VALUES
(0, 'Azienda Brescia', 'Via Roma 1', 'Brescia', '25121', '030123456', 'azienda.brescia@example.com', 45.541500, 10.211800),
(1, 'Azienda Milano', 'Corso Buenos Aires 2', 'Milano', '20124', '022345678', 'azienda.milano@example.com', 45.478900, 9.206700),
(2, 'Azienda Torino', 'Via Po 3', 'Torino', '10100', '011456789', 'azienda.torino@example.com', 45.070300, 7.686900),
(3, 'Azienda Napoli', 'Via Toledo 4', 'Napoli', '80134', '081567890', 'azienda.napoli@example.com', 40.835400, 14.246600),
(4, 'Azienda Venezia', 'Piazza San Marco 5', 'Venezia', '30124', '041678901', 'azienda.venezia@example.com', 45.434200, 12.338800),
(5, 'Azienda Sicilia', 'Via Etnea 6', 'Catania', '95131', '095789012', 'azienda.sicilia@example.com', 37.502700, 15.087300);

-- --------------------------------------------------------

--
-- Struttura della tabella `transazionefinanziaria`
--

CREATE TABLE `transazionefinanziaria` (
  `id_transazionefinanziaria` int(11) NOT NULL,
  `id_cartadicredito` int(11) DEFAULT NULL,
  `importo` decimal(10,2) DEFAULT NULL,
  `stato` varchar(50) DEFAULT NULL,
  `data_transazione` datetime DEFAULT NULL,
  `id_cliente` int(11) DEFAULT NULL,
  `id_veicolo` int(11) DEFAULT NULL,
  `data_inizio` datetime DEFAULT current_timestamp(),
  `data_fine` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `transazionefinanziaria`
--

INSERT INTO `transazionefinanziaria` (`id_transazionefinanziaria`, `id_cartadicredito`, `importo`, `stato`, `data_transazione`, `id_cliente`, `id_veicolo`, `data_inizio`, `data_fine`) VALUES
(2, 2, 150.00, 'completata', '2024-05-02 13:00:00', NULL, NULL, '2024-05-31 17:34:59', '2024-05-31 17:35:50'),
(3, 3, 200.00, 'completata', '2024-05-03 14:00:00', NULL, NULL, '2024-05-31 17:34:59', '2024-05-31 17:35:50'),
(4, 4, 250.00, 'completata', '2024-05-04 15:00:00', NULL, NULL, '2024-05-31 17:34:59', '2024-05-31 17:35:50'),
(5, 5, 300.00, 'completata', '2024-05-05 16:00:00', NULL, NULL, '2024-05-31 17:34:59', '2024-05-31 17:35:50'),
(6, 6, 350.00, 'completata', '2024-05-06 17:00:00', NULL, NULL, '2024-05-31 17:34:59', '2024-05-31 17:35:50'),
(7, 7, 400.00, 'completata', '2024-05-07 18:00:00', NULL, NULL, '2024-05-31 17:34:59', '2024-05-31 17:35:50'),
(8, 8, 450.00, 'completata', '2024-05-08 19:00:00', NULL, NULL, '2024-05-31 17:34:59', '2024-05-31 17:35:50'),
(9, 9, 500.00, 'completata', '2024-05-09 20:00:00', NULL, NULL, '2024-05-31 17:34:59', '2024-05-31 17:35:50'),
(10, 10, 550.00, 'completata', '2024-05-10 21:00:00', NULL, NULL, '2024-05-31 17:34:59', '2024-05-31 17:35:50');

-- --------------------------------------------------------

--
-- Struttura della tabella `veicolo`
--

CREATE TABLE `veicolo` (
  `id_veicolo` int(11) NOT NULL,
  `targa` varchar(20) DEFAULT NULL,
  `modello` varchar(100) DEFAULT NULL,
  `marca` varchar(100) DEFAULT NULL,
  `anno_immatricolazione` int(11) DEFAULT NULL,
  `chilometraggio` decimal(10,2) DEFAULT NULL,
  `numero_posti` int(11) DEFAULT NULL,
  `tipo_carburazione` varchar(50) DEFAULT NULL,
  `id_dispositivogps` int(11) DEFAULT NULL,
  `id_sede` int(11) DEFAULT NULL,
  `costo_giornaliero` decimal(6,2) DEFAULT NULL,
  `tipo_veicolo` varchar(40) DEFAULT NULL,
  `colore_veicolo` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `veicolo`
--

INSERT INTO `veicolo` (`id_veicolo`, `targa`, `modello`, `marca`, `anno_immatricolazione`, `chilometraggio`, `numero_posti`, `tipo_carburazione`, `id_dispositivogps`, `id_sede`, `costo_giornaliero`, `tipo_veicolo`, `colore_veicolo`) VALUES
(1, 'AB123CD', 'Q3', 'Audi', 2020, 15000.00, 5, 'Benzina', 1, 1, 50.00, 'SUV', 'Blu'),
(2, 'AB234CD', 'S4', 'Audi', 2019, 20000.00, 5, 'Diesel', 2, 2, 60.00, 'SUV', 'Bianco'),
(3, 'AB345CD', 'Series5', 'BMW', 2021, 10000.00, 5, 'Benzina', 3, 3, 70.00, 'SUV', 'Rosso'),
(4, 'AB456CD', 'I4M50 Sport', 'BMW', 2022, 5000.00, 5, 'Benzina', 4, 1, 80.00, 'SUV', 'Grigio'),
(5, 'AB567CD', 'iX40', 'BMW', 2020, 12000.00, 5, 'Benzina', 5, 2, 75.00, 'SUV', 'Grigio'),
(6, 'SB678CD', 'Serie2M Coupe240 ixDrive', 'BMW', 1999, 80000.00, 2, 'Benzina', 6, 3, 30.00, 'Coupé', 'Azzurro'),
(7, 'AB789CD', 'Serie4 GranCoupe', 'BMW', 2018, 30000.00, 5, 'Benzina', 7, 1, 45.00, 'Utilitaria', 'Blu'),
(8, 'AB890CD', 'Chiron', 'Bugatti', 2021, 5000.00, 3, 'Elettrico', 8, 2, 500.00, 'Pickup', 'Oro'),
(9, 'AB901CD', '500 X', 'Fiat', 2020, 15000.00, 5, 'Benzina', 9, 3, 25.00, 'Berlina', 'Grigio Scuro'),
(10, 'AB012CD', 'Fiesta', 'Ford', 2017, 25000.00, 2, 'Benzina', 10, 1, 20.00, 'Coupé', 'Blu'),
(11, 'AB123DE', 'Puma', 'Ford', 2022, 10000.00, 5, 'Elettrico', 11, 2, 40.00, 'Berlina', 'Blu'),
(12, 'AB234DE', 'Renegade', 'Jeep', 2023, 5000.00, 5, 'Elettrico', 12, 3, 55.00, 'SUV', 'Bianco'),
(13, 'AB345DE', 'Aventador', 'Lamborghini', 2022, 7000.00, 4, 'Benzina', 13, 1, 300.00, 'Coupé', 'Oro'),
(14, 'AB456DE', 'Huracan', 'Lamborghini', 2021, 8000.00, 5, 'Benzina', 14, 2, 280.00, 'Berlina', 'Oro'),
(15, 'AB567DE', 'Urus', 'Lamborghini', 2020, 12000.00, 5, 'Diesel', 15, 3, 250.00, 'SUV', 'Blu'),
(16, 'AB678DE', 'Defender', 'Land Rover', 2022, 6000.00, 5, 'Ibrido', 16, 1, 90.00, 'SUV', 'Grigio Scuro'),
(17, 'AB789DE', 'NX', 'Lexus', 2023, 4000.00, 2, 'Benzina', 17, 2, 60.00, 'Roadster', 'Marrone'),
(18, 'AB890DE', '90 PHEV', 'MazdaCX', 2019, 20000.00, 5, 'Benzina', 18, 3, 55.00, 'SUV', 'Blu'),
(19, 'AB901DE', 'Quattro Porte', 'Maserati', 2020, 15000.00, 5, 'Benzina', 19, 1, 150.00, 'Utilitaria', 'Grigio'),
(20, 'AB012DE', 'Artura', 'McLaren', 2021, 10000.00, 5, 'Benzina', 20, 2, 350.00, 'SUV', 'Azzurro'),
(21, 'AB123EF', 'GT', 'McLaren', 2020, 15000.00, 5, 'Diesel', 21, 3, 330.00, 'SUV', 'Grigio'),
(22, 'AB234EF', 'Benz E', 'Mercedes', 2021, 5000.00, 2, 'Benzina', 22, 1, 120.00, 'Coupé', 'Blu'),
(23, 'AB345EF', 'GLE', 'Mercedes', 2022, 4000.00, 5, 'Diesel', 23, 2, 180.00, 'SUV', 'Rosso'),
(24, 'AB678EF', 'GLC', 'Mercedes', 2021, 5000.00, 5, 'Benzina', 24, 1, 160.00, 'Berlina', 'Grigio'),
(25, 'AB789EF', 'Cooper Turbo', 'Mini', 2020, 10000.00, 5, 'Benzina', 25, 2, 80.00, 'SUV', 'Bianco'),
(26, 'AB890EF', 'Rogue', 'Nissan', 2022, 3000.00, 5, 'Benzina', 26, 3, 70.00, 'Berlina', 'Marrone'),
(27, 'AB901EF', '2', 'Polestar', 2023, 2000.00, 5, 'Benzina', 27, 1, 65.00, 'Berlina', 'Grigio'),
(28, 'AB012FG', '911', 'Porsche', 2022, 4000.00, 5, 'Benzina', 28, 2, 300.00, 'SUV', 'Nero'),
(29, 'AB123FG', 'Lover', 'Range Rover', 2021, 7000.00, 5, 'Benzina', 29, 3, 200.00, 'Berlina', 'Bianco'),
(30, 'AB345FG', 'Aygo X', 'Toyota', 2023, 1000.00, 2, 'Benzina', 31, 2, 40.00, 'Coupé', 'Verde'),
(31, 'AB456FG', 'Corolla', 'Toyota', 2022, 5000.00, 5, 'Diesel', 32, 3, 50.00, 'SUV', 'Grigio Scuro'),
(32, 'AB567FG', 'GT86', 'Toyota', 2023, 2000.00, 2, 'Elettrico', 33, 1, 55.00, 'Utilitaria', 'Bianco'),
(33, 'AB678GH', 'Land Cruiser', 'Toyota', 2021, 8000.00, 2, 'Elettrico', 34, 2, 80.00, 'Citycar', 'Nero'),
(34, 'AB789GH', 'Rav 4', 'Toyota', 2022, 6000.00, 4, 'Benzina', 35, 3, 90.00, 'Citycar', 'Bianco'),
(35, 'AB890GH', 'Tundra', 'Toyota', 2023, 4000.00, 5, 'Benzina', 36, 1, 100.00, 'SUV', 'Nero'),
(36, 'AB719GH', 'Roma', 'Ferrari', 2022, 6000.00, 4, 'Benzina', 35, 3, 400.00, 'Citycar', 'Nero');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `cartadicredito`
--
ALTER TABLE `cartadicredito`
  ADD PRIMARY KEY (`id_cartadicredito`),
  ADD KEY `id_cliente` (`id_cliente`);

--
-- Indici per le tabelle `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id_cliente`);

--
-- Indici per le tabelle `codiceotp`
--
ALTER TABLE `codiceotp`
  ADD PRIMARY KEY (`id_codiceotp`),
  ADD KEY `id_transazionefinanziaria` (`id_transazionefinanziaria`),
  ADD KEY `id_cliente_fk` (`id_cliente`);

--
-- Indici per le tabelle `dispositivogps`
--
ALTER TABLE `dispositivogps`
  ADD PRIMARY KEY (`id_dispositivogps`);

--
-- Indici per le tabelle `fotoveicolo`
--
ALTER TABLE `fotoveicolo`
  ADD PRIMARY KEY (`id_fotoveicolo`),
  ADD KEY `id_veicolo` (`id_veicolo`);

--
-- Indici per le tabelle `noleggiare`
--
ALTER TABLE `noleggiare`
  ADD PRIMARY KEY (`id_cliente`,`id_veicolo`),
  ADD KEY `id_veicolo` (`id_veicolo`),
  ADD KEY `id_transazionefinanziaria_fk` (`id_transazionefinanziaria`);

--
-- Indici per le tabelle `preferire`
--
ALTER TABLE `preferire`
  ADD PRIMARY KEY (`id_cliente`,`id_veicolo`),
  ADD KEY `id_veicolo` (`id_veicolo`);

--
-- Indici per le tabelle `sede`
--
ALTER TABLE `sede`
  ADD PRIMARY KEY (`id_sede`);

--
-- Indici per le tabelle `transazionefinanziaria`
--
ALTER TABLE `transazionefinanziaria`
  ADD PRIMARY KEY (`id_transazionefinanziaria`),
  ADD KEY `id_cartadicredito` (`id_cartadicredito`),
  ADD KEY `id_client_fk` (`id_cliente`);

--
-- Indici per le tabelle `veicolo`
--
ALTER TABLE `veicolo`
  ADD PRIMARY KEY (`id_veicolo`),
  ADD KEY `veicolo_ibfk_1` (`id_dispositivogps`),
  ADD KEY `veicolo_ibfk_2` (`id_sede`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `cartadicredito`
--
ALTER TABLE `cartadicredito`
  MODIFY `id_cartadicredito` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT per la tabella `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT per la tabella `codiceotp`
--
ALTER TABLE `codiceotp`
  MODIFY `id_codiceotp` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT per la tabella `dispositivogps`
--
ALTER TABLE `dispositivogps`
  MODIFY `id_dispositivogps` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT per la tabella `fotoveicolo`
--
ALTER TABLE `fotoveicolo`
  MODIFY `id_fotoveicolo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=153;

--
-- AUTO_INCREMENT per la tabella `transazionefinanziaria`
--
ALTER TABLE `transazionefinanziaria`
  MODIFY `id_transazionefinanziaria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT per la tabella `veicolo`
--
ALTER TABLE `veicolo`
  MODIFY `id_veicolo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `cartadicredito`
--
ALTER TABLE `cartadicredito`
  ADD CONSTRAINT `cartadicredito_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `codiceotp`
--
ALTER TABLE `codiceotp`
  ADD CONSTRAINT `codiceotp_ibfk_1` FOREIGN KEY (`id_transazionefinanziaria`) REFERENCES `transazionefinanziaria` (`id_transazionefinanziaria`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `id_cliente_fk` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`);

--
-- Limiti per la tabella `fotoveicolo`
--
ALTER TABLE `fotoveicolo`
  ADD CONSTRAINT `fotoveicolo_ibfk_1` FOREIGN KEY (`id_veicolo`) REFERENCES `veicolo` (`id_veicolo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `noleggiare`
--
ALTER TABLE `noleggiare`
  ADD CONSTRAINT `id_transazionefinanziaria_fk` FOREIGN KEY (`id_transazionefinanziaria`) REFERENCES `transazionefinanziaria` (`id_transazionefinanziaria`),
  ADD CONSTRAINT `noleggiare_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `noleggiare_ibfk_2` FOREIGN KEY (`id_veicolo`) REFERENCES `veicolo` (`id_veicolo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `preferire`
--
ALTER TABLE `preferire`
  ADD CONSTRAINT `preferire_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `preferire_ibfk_2` FOREIGN KEY (`id_veicolo`) REFERENCES `veicolo` (`id_veicolo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `transazionefinanziaria`
--
ALTER TABLE `transazionefinanziaria`
  ADD CONSTRAINT `id_client_fk` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`),
  ADD CONSTRAINT `transazionefinanziaria_ibfk_1` FOREIGN KEY (`id_cartadicredito`) REFERENCES `cartadicredito` (`id_cartadicredito`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `veicolo`
--
ALTER TABLE `veicolo`
  ADD CONSTRAINT `veicolo_ibfk_1` FOREIGN KEY (`id_dispositivogps`) REFERENCES `dispositivogps` (`id_dispositivogps`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `veicolo_ibfk_2` FOREIGN KEY (`id_sede`) REFERENCES `sede` (`id_sede`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
