-- Creo mi Base de Datos.
CREATE DATABASE database_links;

-- Uso mi BD.
USE database_links;

-- Creo mi Tablas
CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
)

-- Actualizo mi tabla "users"
ALTER TABLE users
    -- Creo una Primary Key
    ADD PRIMARY KEY (id);

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

-- Muestro mi tabla "users"
DESCRIBE users;
37.36