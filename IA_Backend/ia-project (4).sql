-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 08, 2023 at 05:43 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ia-project`
--

-- --------------------------------------------------------

--
-- Table structure for table `book`
--

CREATE TABLE `book` (
  `Id` int(11) NOT NULL,
  `Title` varchar(100) NOT NULL,
  `Author` varchar(100) NOT NULL,
  `Category` varchar(100) NOT NULL,
  `ISBN` int(11) NOT NULL,
  `RankNumber` int(11) NOT NULL,
  `Photo_URL` varchar(255) NOT NULL,
  `Book_Price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `book`
--

INSERT INTO `book` (`Id`, `Title`, `Author`, `Category`, `ISBN`, `RankNumber`, `Photo_URL`, `Book_Price`) VALUES
(33, 'ahmmmmmmmmmmed', 'ahmeeeed', 'ssssssssssssss', 66666, 55555, '1682635137292.png', 2000),
(34, 'ia', 'zzzzzzzzzzzz', 'action233333', 0, 66666, '1682272734172.jpg', 105),
(35, 'iaaaaaaaaaaaaaa', 'zzzzzzzzzzzz', 'action233333', 0, 66666, '1682272765426.jpg', 105),
(36, 'iaaaaaaaaaaaaaa', 'zzzzzzzzzzzz', 'action233333', 0, 44444, '1682279129853.jpg', 105),
(37, 'ahmmmmmmmmmmed', 'ahmeeeed', 'ssssssssssssss', 66666, 55555, '1683551689885.png', 2000),
(38, 'izzzzzzzzzz', 'zzzzzzzzzzzz', 'action233333', 0, 44444, '1683497065460.jpg', 105),
(40, 'In Search of Lost Time', 'Marcel Proust', 'Drama', 1506, 623, '1683559618019.jpeg', 105),
(43, 'Swann\'s Way', 'Audio CD	', 'Drama', 2056, 483263, '1683559865001.jpeg', 105),
(44, 'In Search of Lost Time (6 Volumes)', 'Hardcover	', 'Drama', 35698, 4434848, '1683559945257.jpeg', 105),
(45, 'Swann\'s Way', 'Hardcover	', 'Drama', 65985, 42566, '1683560150691.jpeg', 105),
(46, 'In Search Of Lost Time', 'Hardcover	', 'Drama', 5645, 3118849, '1683560267734.jpeg', 105);

-- --------------------------------------------------------

--
-- Table structure for table `borrow_books`
--

CREATE TABLE `borrow_books` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'rejected =>0\r\naccpect =>1',
  `date` date DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `borrow_books`
--

INSERT INTO `borrow_books` (`id`, `user_id`, `book_id`, `status`, `date`) VALUES
(1, 46, 34, 1, '2023-05-08'),
(2, 47, 35, 1, '2023-05-08'),
(4, 48, 35, 0, '2023-05-08'),
(5, 48, 36, 1, '2023-05-08');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `Id` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `Phone` int(15) NOT NULL,
  `Type` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0 => normal user\r\n1 => librarian',
  `Status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0 => in-active\r\n1 => active',
  `token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`Id`, `Name`, `Email`, `Password`, `Phone`, `Type`, `Status`, `token`) VALUES
(6, 'ahmedalaa', 'ahmed@gmail.com', '$2b$10$aOvpYsqj1gMTydKcVe1GNubFP8FfyiWZ2c0Vfxdu1G62/xuShV0Ja', 2147483647, 1, 1, '7cbe4c9f0470a23103e9a2b91f4bd7c3'),
(7, 'ahmedalaa', 'ahmed1@gmail.com', '$2b$10$6.H63.bio9wb0IfjAqcS3OrkB6p6FoPIzMBQTvbxRL6GuHuIiOGbW', 2147483647, 1, 1, '270f7c1b1f8bd1314eae6d5e05b5d752'),
(27, 'ahmed ', 'ahmedalaa9@gmail.com', '$2b$10$VouWljf47jrtUwVwCQFbceZ8rC2DJgKDRC1w4Zopf0dmT7vw0JmH6', 1122222222, 0, 1, '2c7f8b555e3db68817fb4e8cf9d0654c'),
(28, 'ahmed ', 'ahmedalaa10@gmail.com', '$2b$10$shBXFxnOeRxVoxjMSHTlHOznZCC2buSZd8Z.4JCS71VOqkFJuCToq', 1122222222, 0, 0, 'a42461b01d2eb2e36d36652984231e18'),
(29, 'ahmed ', 'ahmedalaa11@gmail.com', '$2b$10$NBjwpUmDmva71sEpuJPDV.epyYcNyN8VVWXIGNI.dvCyasuSibFtq', 1122222222, 0, 0, '3ef96ee01ecd2e575a67972977dcb8f7'),
(44, 'ahmed ', 'ahmedalaa24@gmail.com', '$2b$10$SfH5F3Qjqh2O2lwNU/99jeNIyvCu8x.yoMT6A9wFL65S6E9KrNi9m', 1122222222, 0, 1, '0cf902e1e5a1e5b5a688698c76c9303a'),
(45, 'ahmed ', 'ahmedalaa25@gmail.com', '$2b$10$aFZu46tWSMxRxlq5WM51geDmGfZ7FB7zYa9m4Aun7Z.PUnXPYxCVW', 1122222222, 0, 0, 'b1fc2ce7ddb72ff2f1512e6791506c95'),
(46, 'ahmed ', 'ahmedalaa26@gmail.com', '$2b$10$mDZ2JeG0zx601rZKNCDkbuRviZuUaCnczDCbfH.MMjh0lhj09QaPG', 1122222222, 0, 0, 'eb436820be8cd4a88895e3fe5de96dc3'),
(47, 'ahmed ', 'ahmedalaa27@gmail.com', '$2b$10$907RcPCP9yTrZt6qNRAAXO34WGkyLs31eD2..o.jMpS0Y1NXF0LhG', 1122222222, 0, 0, 'da9ec2610dd7d4e979246d9079e0c231'),
(48, 'Ahmed Alaa ', 'ahmedalaa30@gmail.com', '$2b$10$xh5KXWzFAuo04Abwyyog0ePmxrjFbAl7mCt6Bq2bOgjRraroLjMJa', 1122222222, 0, 1, '4f13964e0bd13bbb3f452c1c994bcc49'),
(49, 'Ahmed Alaaaaaaa ', 'ahmedalaa33@gmail.com', '$2b$10$D1knzSoYOS1l9oxfQGPxiOHzqfHP8zcojRsMO4DAVEkgdjkq6L2pm', 1122222222, 0, 1, '1bf3b6f343b1fd17ccd3d6f8cecd285e'),
(50, 'Ahmed Alaaaaaaa ', 'ahmedalaa330@gmail.com', '$2b$10$S5DB5Lzq8BZoJ/rle8wx2OKPtPzbz1MF9VDeYDyGtMnAXxTuguc9m', 1122222222, 0, 1, 'd742718c8e442d36a435097e9958d542');

-- --------------------------------------------------------

--
-- Table structure for table `user_account`
--

CREATE TABLE `user_account` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `Status` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_account`
--

INSERT INTO `user_account` (`id`, `user_id`, `Status`) VALUES
(18, 28, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `borrow_books`
--
ALTER TABLE `borrow_books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_const_id` (`user_id`),
  ADD KEY `book_const_id` (`book_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `user_account`
--
ALTER TABLE `user_account`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `book`
--
ALTER TABLE `book`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `borrow_books`
--
ALTER TABLE `borrow_books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `user_account`
--
ALTER TABLE `user_account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `borrow_books`
--
ALTER TABLE `borrow_books`
  ADD CONSTRAINT `book_const_id` FOREIGN KEY (`book_id`) REFERENCES `book` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_const_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
