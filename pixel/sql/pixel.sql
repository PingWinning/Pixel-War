-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3307
-- Généré le : sam. 30 nov. 2024 à 02:40
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `pixelgrid`
--

-- --------------------------------------------------------

--
-- Structure de la table `pixels`
--

CREATE TABLE `pixels` (
  `position` varchar(20) NOT NULL,
  `color` varchar(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `pixels`
--

INSERT INTO `pixels` (`position`, `color`) VALUES
('25-41', '#000000'),
('25-42', '#000000'),
('25-46', '#000000'),
('25-47', '#000000'),
('25-51', '#000000'),
('25-54', '#000000'),
('25-55', '#000000'),
('25-56', '#000000'),
('25-57', '#000000'),
('25-58', '#000000'),
('25-59', '#000000'),
('25-60', '#000000'),
('26-41', '#000000'),
('26-42', '#000000'),
('26-43', '#000000'),
('26-45', '#000000'),
('26-46', '#000000'),
('26-47', '#000000'),
('26-50', '#000000'),
('26-51', '#000000'),
('26-54', '#000000'),
('26-55', '#000000'),
('26-56', '#000000'),
('26-57', '#000000'),
('26-58', '#000000'),
('26-59', '#000000'),
('26-60', '#000000'),
('27-41', '#000000'),
('27-43', '#000000'),
('27-44', '#000000'),
('27-45', '#000000'),
('27-47', '#000000'),
('27-49', '#000000'),
('27-50', '#000000'),
('27-51', '#000000'),
('27-59', '#000000'),
('27-60', '#000000'),
('28-41', '#000000'),
('28-44', '#000000'),
('28-47', '#000000'),
('28-51', '#000000'),
('28-58', '#000000'),
('28-59', '#000000'),
('29-41', '#000000'),
('29-47', '#000000'),
('29-51', '#000000'),
('29-57', '#000000'),
('29-58', '#000000'),
('30-41', '#000000'),
('30-47', '#000000'),
('30-51', '#000000'),
('30-56', '#000000'),
('30-57', '#000000'),
('31-41', '#000000'),
('31-47', '#000000'),
('31-51', '#000000'),
('31-55', '#000000'),
('31-56', '#000000'),
('32-41', '#000000'),
('32-47', '#000000'),
('32-49', '#000000'),
('32-50', '#000000'),
('32-51', '#000000'),
('32-52', '#000000'),
('32-53', '#000000'),
('32-55', '#000000'),
('32-56', '#000000');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `pixels`
--
ALTER TABLE `pixels`
  ADD PRIMARY KEY (`position`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
