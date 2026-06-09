-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 03, 2026 at 05:27 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wspeedrun_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `games`
--

CREATE TABLE `games` (
  `game_id` varchar(36) NOT NULL,
  `title` varchar(100) NOT NULL,
  `genre` varchar(55) NOT NULL,
  `release_year` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `games`
--

INSERT INTO `games` (`game_id`, `title`, `genre`, `release_year`) VALUES
('3b489475-e2db-4966-a1fb-a24191655a71', 'Only Up!', 'Vertical Platformer', 2023),
('7c70f362-a41a-4d8c-876b-e0dd773e82c8', 'Celeste', '2D Platformer', 2018),
('9cf7c21b-fd99-447c-950e-51dd6162ff49', 'Mirror\'s Edge', '3D Action Parkour', 2008),
('cc0a5947-ac27-4ebe-b72c-a48c1e3e2cf4', 'Mirror\'s Edge', '3D Action Parkour', 2008);

-- --------------------------------------------------------

--
-- Table structure for table `runs`
--

CREATE TABLE `runs` (
  `run_id` varchar(36) NOT NULL,
  `time_in_seconds` int(11) NOT NULL,
  `video_url` varchar(255) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `game_id` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `runs`
--

INSERT INTO `runs` (`run_id`, `time_in_seconds`, `video_url`, `user_id`, `game_id`) VALUES
('e5b1708f-f364-48d7-84de-44926b47f347', 1850, 'https://youtube.com/watch?v=speedrun_buktiku', '446ab476-a541-47a6-a22e-c0b6a98a6ddd', 'cc0a5947-ac27-4ebe-b72c-a48c1e3e2cf4');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` varchar(36) NOT NULL,
  `username` varchar(55) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `country` varchar(55) NOT NULL,
  `role` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `country`, `role`) VALUES
('446ab476-a541-47a6-a22e-c0b6a98a6ddd', 'naufaltester', 'naufal@contoh.com', '$2b$10$HHYCrTES8iRlgwAQpXFe/eJ/cRPmDy.TSBEfUhqurDw.kUYhfdp0a', 'Indonesia', 'USER');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`game_id`);

--
-- Indexes for table `runs`
--
ALTER TABLE `runs`
  ADD PRIMARY KEY (`run_id`),
  ADD KEY `runs_user_id_fkey` (`user_id`),
  ADD KEY `runs_game_id_fkey` (`game_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `users_email_key` (`email`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `runs`
--
ALTER TABLE `runs`
  ADD CONSTRAINT `runs_game_id_fkey` FOREIGN KEY (`game_id`) REFERENCES `games` (`game_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `runs_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
