-- IMPORTANTISIMO PARA IMPLEMENTAR MYSQL EN PRODUCCIÓN!
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

-- Creo mi Base de Datos.
CREATE DATABASE database_links;

-- Uso mi BD.
USE database_links;

-- Creo mi Tablas.
CREATE TABLE users (
    id INT NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);
-- Actualizo mi tabla "users".
ALTER TABLE users
    -- Creo una Primary Key.
    ADD PRIMARY KEY (id);

ALTER TABLE users
    MODIFY id INT NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

-- Creo la tabla de Enlaces.
CREATE TABLE links (
	id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    url VARCHAR(255) NOT NULL,
    description TEXT,
    user_id INT,
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Altero mi tabla "links" para agregar mi PK.
ALTER TABLE links
	ADD PRIMARY KEY (id);

ALTER TABLE links
    MODIFY id INT NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

-- Muestro mis tablas.
DESCRIBE users;
DESCRIBE links;

-- Inserto datos en mi tabla Links.
INSERT INTO links
	(title, url, description, user_id, created_at) VALUES
		('Mixcloud', 'https://www.mixcloud.com/joeeriquelme/', 'Joel Riquelme perfil en Mixcloud', 5, '2020-02-27 18:23:59' ),
        ('SoundCloud', 'https://soundcloud.com/joelriquelme', 'Joel Riquelme perfil en Soundcloud',	5,	'2020-02-27 18:21:32');

SELECT * FROM users;
SELECT * FROM links;
