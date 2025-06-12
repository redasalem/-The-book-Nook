-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 12, 2025 at 04:32 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `book_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `category` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `pdf_url` varchar(255) DEFAULT NULL,
  `is_new` tinyint(1) DEFAULT 0,
  `classroom_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `title`, `author`, `category`, `description`, `price`, `image_url`, `pdf_url`, `is_new`, `classroom_id`, `created_at`) VALUES
(1, 'مع النبى', 'ادهم شرقاوي', 'الفلسفة', '', 0.00, '../images/book_1.jpg', '../books_pdf/1pLsqNJHRw9gTw7fOoBPnhRwmgetOF_4q.pdf', 1, 1, '2025-06-12 11:35:16'),
(2, 'ليطمئن قلبى', 'ادهم شرقاوي', 'الروايات', '', 0.00, '../images/book_2.jpg', '../books_pdf/bnr141-1.pdf', 1, 2, '2025-06-12 11:35:16'),
(3, 'ابق قويا', 'ديمي لوفاتو', 'تنمية ذاتية', '', 0.00, '../images/book_3.jpg', '../books_pdf/bnr21-1.pdf', 1, 3, '2025-06-12 11:35:16'),
(4, 'كن لنفسك', 'عمار الشمري', 'الروايات', '', 0.00, '../images/book_4.jpg', '../books_pdf/bnr21-1.pdf', 1, 2, '2025-06-12 11:35:16'),
(5, 'ما بين الوحده واحلام الهدر', 'رغد نايف الحربي', 'الشعر', '', 0.00, '../images/book_5.jpg', '../books_pdf/bnr21-1.pdf', 1, 4, '2025-06-12 11:35:16'),
(6, 'السيدة التي حسبت نفسها سوسة', 'شيماء هشام سعد', 'الروايات', '', 0.00, '../images/book_8.jpg', '../books_pdf/bnr21-1.pdf', 1, 2, '2025-06-12 11:35:16'),
(7, 'كبرت و نسيت ان انسى', 'بثينه العيسي', 'الروايات', '', 0.00, '../images/book_7.jpg', '../books_pdf/bnr21-1.pdf', 1, 2, '2025-06-12 11:35:16'),
(8, 'مكتبة ساحة الاعشاب', 'ايريك دو كيرميل', 'الفلسفة', '', 0.00, '../images/book_6.jpg', '../books_pdf/bnr21-1.pdf', 1, 1, '2025-06-12 11:35:16');

-- --------------------------------------------------------

--
-- Table structure for table `classrooms`
--

CREATE TABLE `classrooms` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `classrooms`
--

INSERT INTO `classrooms` (`id`, `name`) VALUES
(1, 'الفلسفة'),
(2, 'الروايات'),
(3, 'تنمية ذاتية'),
(4, 'الشعر');

-- --------------------------------------------------------

--
-- Table structure for table `subscriptions`
--

CREATE TABLE `subscriptions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `plan` varchar(50) NOT NULL,
  `payment_method` varchar(50) NOT NULL,
  `start_date` datetime DEFAULT current_timestamp(),
  `end_date` datetime DEFAULT NULL,
  `status` varchar(20) DEFAULT 'active',
  `service_number` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subscriptions`
--

INSERT INTO `subscriptions` (`id`, `user_id`, `plan`, `payment_method`, `start_date`, `end_date`, `status`, `service_number`) VALUES
(1, 1, 'basic', 'credit', '2025-06-12 15:04:53', '2025-07-12 15:04:53', 'active', NULL),
(2, 1, 'pro', 'credit', '2025-06-12 15:08:07', '2025-07-12 15:08:07', 'active', ''),
(3, 1, 'pro', 'fawry', '2025-06-12 15:08:15', '2025-07-12 15:08:15', 'active', '255665566'),
(4, 1, 'premium', 'vodafone', '2025-06-12 15:09:17', '2025-07-12 15:09:17', 'active', '4445454487');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `created_at`) VALUES
(1, 'بنهاوي 1', 'Mohamedibrahim@gmail.com', '$2y$10$PrBtqltMtJ4Lm.85lqa87.pbuafM6MBv.SDYUPqJfEl8RiXJy/3TS', '2025-06-12 11:55:12');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_classroom` (`classroom_id`);

--
-- Indexes for table `classrooms`
--
ALTER TABLE `classrooms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `classrooms`
--
ALTER TABLE `classrooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `subscriptions`
--
ALTER TABLE `subscriptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `fk_classroom` FOREIGN KEY (`classroom_id`) REFERENCES `classrooms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD CONSTRAINT `subscriptions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
