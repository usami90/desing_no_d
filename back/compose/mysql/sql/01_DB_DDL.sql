DROP DATABASE IF EXISTS `library`;


CREATE DATABASE `library` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;

CREATE TABLE library.user(
    user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR(100) NOT NULL,
    books VARCHAR(1000),
    skills VARCHAR(1000)
);

INSERT INTO library.user ( user_id, user_name, books, skills )
VALUES (
    '0001',
    '田中太郎',
    'アジャイル開発について:良かった,Githubについて:初心者向け',
    'アジャイル,Github'
);

