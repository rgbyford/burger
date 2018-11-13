CREATE SCHEMA `burgers_db` ;
USE burgers_db;
CREATE TABLE burgers (
id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
burger_name VARCHAR(30),
devoured INTEGER
);
