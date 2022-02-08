DROP DATABASE IF EXISTS `library`;


CREATE DATABASE `library` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;

CREATE TABLE library.user(
    user_id VARCHAR(4) NOT NULL PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    book VARCHAR(1000),
    skill VARCHAR(1000)
);

INSERT INTO library.user ( user_id, user_name, book, skill )
VALUES (
    '0001',
    '田中太郎',
    'アジャイル開発について,Githubについて',
    'アジャイル,Github'
);

