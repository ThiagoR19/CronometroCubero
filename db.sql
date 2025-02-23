drop database if exists timer;
create database timer;
use timer;

CREATE TABLE times (
    timeId INT AUTO_INCREMENT PRIMARY KEY,
	  timeValue VARCHAR(15) NOT NULL,
    scramble TEXT not null
);