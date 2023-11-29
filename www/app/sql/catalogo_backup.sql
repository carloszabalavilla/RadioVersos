-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 28-11-2023 a las 20:16:22
-- Versión del servidor: 8.1.0
-- Versión de PHP: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `catalogo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `artists`
--

CREATE TABLE `artists` (
  `artist_id` int NOT NULL,
  `artist_name` varchar(50) NOT NULL,
  `genre` varchar(50) NOT NULL,
  `nationality` varchar(50) NOT NULL,
  `album` varchar(50) NOT NULL,
  `award` varchar(50) NOT NULL,
  `biography` varchar(400) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `artists`
--

INSERT INTO `artists` (`artist_id`, `artist_name`, `genre`, `nationality`, `album`, `award`, `biography`) VALUES
(1, 'Beyoncé', 'R&B', 'Estadounidense', 'Lemonade', 'Premio Grammy', 'Beyoncé Giselle Knowles-Carter es una cantante, compositora y actriz estadounidense.'),
(2, 'Ed Sheeran', 'Pop', 'Británico', '÷ (Divide)', 'Premio Grammy', 'Edward Christopher Sheeran es un cantante, compositor y músico inglés.'),
(3, 'Rihanna', 'R&B', 'Barbadense', 'Anti', 'Premio Grammy', 'Robyn Rihanna Fenty es una cantante, actriz y empresaria de Barbados.'),
(4, 'Kendrick Lamar', 'Hip Hop', 'Estadounidense', 'DAMN.', 'Premio Pulitzer', 'Kendrick Lamar Duckworth es un rapero, compositor y productor discográfico estadounidense.'),
(5, 'Taylor Swift', 'Pop', 'Estadounidense', '1989', 'Premio Grammy', 'Taylor Alison Swift es una cantante y compositora estadounidense.'),
(6, 'Shakira', 'Pop Latino', 'Colombiana', 'El Dorado', 'Premio Grammy', 'Shakira Isabel Mebarak Ripoll es una cantante, compositora y bailarina colombiana.'),
(7, 'Drake', 'Hip Hop', 'Canadiense', 'Views', 'Premio Grammy', 'Aubrey Drake Graham es un rapero, cantante y actor canadiense.'),
(8, 'Adele', 'Pop', 'Británica', '21', 'Premio Grammy', 'Adele Laurie Blue Adkins es una cantante y compositora británica.'),
(9, 'Bruno Mars', 'Pop', 'Estadounidense', '24K Magic', 'Premio Grammy', 'Peter Gene Hernandez, conocido profesionalmente como Bruno Mars, es un cantante, compositor y productor discográfico estadounidense.'),
(10, 'The Weeknd', 'R&B', 'Canadiense', 'After Hours', 'Premio Grammy', 'Abel Makkonen Tesfaye, conocido profesionalmente como The Weeknd, es un cantante, compositor y productor discográfico canadiense.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `songs`
--

CREATE TABLE `songs` (
  `song_id` int NOT NULL,
  `song_title` varchar(50) NOT NULL,
  `duration` varchar(50) NOT NULL,
  `release_year` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `album` varchar(50) NOT NULL,
  `lyric` varchar(400) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `videoUrl` varchar(50) NOT NULL,
  `artist_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `songs`
--

INSERT INTO `songs` (`song_id`, `song_title`, `duration`, `release_year`, `album`, `lyric`, `videoUrl`, `artist_id`) VALUES
(1, 'Halo', '4:22', '2008', 'I Am... Sasha Fierce', 'Remember those walls I built? Well, baby, theyre tumbling down...', 'url_video_halo', 1),
(2, 'Shape of You', '3:53', '2017', '÷ (Divide)', 'The club isn’t the best place to find a lover, so the bar is where I go...', 'url_video_shape_of_you', 2),
(3, 'Work', '3:39', '2016', 'Anti', 'Work, work, work, work, work, work...', 'url_video_work', 3),
(4, 'HUMBLE.', '2:57', '2017', 'DAMN.', 'Nobody pray for me, even a day for me...', 'url_video_humble', 4),
(5, 'Blank Space', '3:51', '2014', '1989', 'Nice to meet you, where you been? I could show you incredible things...', 'url_video_blank_space', 5),
(6, 'La Tortura', '3:35', '2005', 'Fijación Oral Vol. 1', 'Eres como el agua bendita...', 'url_video_la_tortura', 6),
(7, 'Hotline Bling', '4:27', '2015', 'Views', 'You used to call me on my cell phone...', 'url_video_hotline_bling', 7),
(8, 'Someone Like You', '4:45', '2011', '21', 'I heard that youre settled down, that you found a girl and youre married now...', 'url_video_someone_like_you', 8),
(9, '24K Magic', '3:46', '2016', '24K Magic', 'Tonight, I just want to take you higher...', 'url_video_24k_magic', 9),
(10, 'Blinding Lights', '3:20', '2019', 'After Hours', 'Im running out of time, cause I can see the sunlight up the sky...', 'url_video_blinding_lights', 10),
(11, 'Crazy in Love', '3:56', '2003', 'Dangerously in Love', 'Got me looking so crazy right now, your love’s got me looking so crazy right now...', 'url_video_crazy_in_love', 1),
(12, 'Perfect', '4:23', '2017', '÷ (Divide)', 'I found a love for me, darling just dive right in...', 'url_video_perfect', 2),
(13, 'Diamonds', '3:45', '2012', 'Unapologetic', 'Shine bright like a diamond...', 'url_video_diamonds', 3),
(14, 'DNA.', '3:05', '2017', 'DAMN.', 'I got, I got, I got, I got loyalty, got royalty inside my DNA...', 'url_video_dna', 4),
(15, 'Shake It Off', '3:39', '2014', '1989', 'I shake it off, I shake it off...', 'url_video_shake_it_off', 5),
(16, 'Waka Waka (This Time for Africa)', '3:22', '2010', 'Sale el Sol', 'Youre a good soldier, choosing your battles...', 'url_video_waka_waka', 6),
(17, 'Gods Plan', '3:19', '2018', 'Scorpion', 'I only love my bed and my momma, I’m sorry...', 'url_video_gods_plan', 7),
(18, 'Rolling in the Deep', '3:54', '2010', '21', 'Theres a fire starting in my heart...', 'url_video_rolling_in_the_deep', 8),
(19, 'Thats What I Like', '3:26', '2016', '24K Magic', 'Lucky for you, thats what I like, thats what I like...', 'url_video_thats_what_i_like', 9),
(20, 'Save Your Tears', '3:35', '2020', 'After Hours', 'I saw you dancing in a crowded room...', 'url_video_save_your_tears', 10);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `artists`
--
ALTER TABLE `artists`
  ADD PRIMARY KEY (`artist_id`);

--
-- Indices de la tabla `songs`
--
ALTER TABLE `songs`
  ADD PRIMARY KEY (`song_id`),
  ADD KEY `artist_id_fk` (`artist_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `artists`
--
ALTER TABLE `artists`
  MODIFY `artist_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT de la tabla `songs`
--
ALTER TABLE `songs`
  MODIFY `song_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `songs`
--
ALTER TABLE `songs`
  ADD CONSTRAINT `artist_id_fk` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`artist_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
