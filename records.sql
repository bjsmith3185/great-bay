DROP DATABASE IF EXISTS records_db;

CREATE DATABASE records_db;

USE records_db;

CREATE TABLE post (
  id INT NOT NULL AUTO_INCREMENT,
  post_title VARCHAR(45) NOT NULL,
  post_category VARCHAR(45) NOT NULL,
  post_price INT(20) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO post (post_title, post_category, post_price)
VALUES ("lawn mower", "home", 100);

INSERT INTO post (post_title, post_category, post_price)
VALUES ("1999 ford ranger", "trucks", 1999);

INSERT INTO post (post_title, post_category, post_price)
VALUES ("laptop", "electronics", 56);

CREATE TABLE bid (
  id INT NOT NULL AUTO_INCREMENT,
  post_title VARCHAR(45) NOT NULL,
  bid_category VARCHAR(45) NOT NULL,
  bid_price INT(20) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO post (post_title, bid_category, bid_price)
VALUES ("lawn mower", "home", 100);

INSERT INTO post (post_title, bid_category, bid_price)
VALUES ("1999 ford ranger", "trucks", 1999);

INSERT INTO post (post_title, bid_category, bid_price)
VALUES ("laptop", "electronics", 56);