-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : sam. 17 fév. 2024 à 16:51
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `stock_management`
--

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`id`, `name`, `created_date`) VALUES
(1, 'infos Cat', '2024-01-15'),
(3, 'new cat', '2024-01-18'),
(8, 'testing cat', '2024-02-01'),
(9, 'doc category', '2024-02-13');

-- --------------------------------------------------------

--
-- Structure de la table `employes`
--

CREATE TABLE `employes` (
  `Code_Employee` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Phone` varchar(20) DEFAULT NULL,
  `Adresse` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `login`
--

CREATE TABLE `login` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `login`
--

INSERT INTO `login` (`id`, `name`, `email`, `password`) VALUES
(1, 'aa', 'aa@x.x', '$2b$10$J0mydRcl21ze57VumUtKCusynBnjiafOtiWP5v6L95sj5fiF.7pqO'),
(2, 'admin', 'admin@admin.com', '$2b$10$UUGKVtEAYeH9yLd1WTDO7uo26MR7UvDIPDtG/oIqojHmdi/NgpOGm'),
(3, 'test', 'test@test.com', '$2b$10$3NkWq1uEkt4R8jNvTNQTpegSm8BDpXFZGaIOn.sXIfuNG6OcPHjx6'),
(4, 'a', 'a@a.a', '$2b$10$da7hL7eaLYmwwbRr.VabSOvZ5iJpyz4BhYM2AUo0qtZhIAP1kScQO');

-- --------------------------------------------------------

--
-- Structure de la table `products`
--

CREATE TABLE `products` (
  `Code_Product` int(11) NOT NULL,
  `Categorie` varchar(50) NOT NULL,
  `Prix` decimal(10,2) NOT NULL,
  `Quantite` int(11) NOT NULL,
  `Date_Ajout` date NOT NULL,
  `Code_Supplier` int(11) DEFAULT NULL,
  `Product_Image` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `products`
--

INSERT INTO `products` (`Code_Product`, `Categorie`, `Prix`, `Quantite`, `Date_Ajout`, `Code_Supplier`, `Product_Image`, `name`) VALUES
(0, 'doc category', 11.00, 12, '2024-02-16', 1, 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'prd 22'),
(1, 'infos Cat', 33.00, 99, '2024-02-15', 2, 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg', 'prd11');

-- --------------------------------------------------------

--
-- Structure de la table `suppliers`
--

CREATE TABLE `suppliers` (
  `Code_Supplier` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Phone` varchar(20) DEFAULT NULL,
  `Email` varchar(255) NOT NULL,
  `Adresse` varchar(255) DEFAULT NULL,
  `Company` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `suppliers`
--

INSERT INTO `suppliers` (`Code_Supplier`, `Name`, `Phone`, `Email`, `Adresse`, `Company`) VALUES
(1, 'nokia', '0000000', 'nokia@n.c', 'nnnnnnnnn', 'nokia phones'),
(2, 'apple', '022222222', 'apple@n.c', 'wdfggrtt', 'apple tech'),
(3, 'sumsung', '098888888', 'sumsung@n.m', 'asjjax asxjsa', 'sumsung company'),
(6, 'kk', '0000000', 'lll@jjj.cc', 'wdfggrtt', 'sumsung company');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_name` (`name`);

--
-- Index pour la table `employes`
--
ALTER TABLE `employes`
  ADD PRIMARY KEY (`Code_Employee`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- Index pour la table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`Code_Product`),
  ADD KEY `Code_Supplier` (`Code_Supplier`),
  ADD KEY `Categorie` (`Categorie`);

--
-- Index pour la table `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`Code_Supplier`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `login`
--
ALTER TABLE `login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `Code_Supplier` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`Code_Supplier`) REFERENCES `suppliers` (`Code_Supplier`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`Categorie`) REFERENCES `categories` (`name`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
