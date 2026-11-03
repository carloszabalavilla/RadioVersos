CREATE DATABASE IF NOT EXISTS catalogo CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE catalogo;
CREATE TABLE artists (artist_id INT PRIMARY KEY AUTO_INCREMENT, artist_name VARCHAR(50) NOT NULL, genre VARCHAR(50) NOT NULL, nationality VARCHAR(50) NOT NULL, album VARCHAR(50) NOT NULL, award VARCHAR(50) NOT NULL, biography VARCHAR(400) NOT NULL);
CREATE TABLE songs (song_id INT PRIMARY KEY AUTO_INCREMENT, song_title VARCHAR(50) NOT NULL, duration VARCHAR(50) NOT NULL, release_year VARCHAR(50) NOT NULL, album VARCHAR(50) NOT NULL, lyric VARCHAR(400) NOT NULL, videoUrl VARCHAR(50) NOT NULL, artist_id INT NOT NULL, FOREIGN KEY (artist_id) REFERENCES artists(artist_id));
INSERT INTO artists (artist_name,genre,nationality,album,award,biography) VALUES ('Demo Ensemble','Jazz','Ficticia','Local Sessions','Ninguno','Artista ficticio para la demostración');
INSERT INTO songs (song_title,duration,release_year,album,lyric,videoUrl,artist_id) VALUES ('Local Session','03:30','2026','Local Sessions','Texto ficticio de demostración','',1);
