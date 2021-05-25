Use dr;
#CREATE TABLE posts( ID INT AUTO_INCREMENT  PRIMARY KEY, discount INT, description text, fkuser INT, photoLink NVARCHAR(256), createdAt DATE );
#SHOW TABLES;
#SELECT*FROM posts;
#SELECT*FROM users;
#ALTER TABLE posts ADD COLUMN rate INT NOT NULL;
#SELECT*FROM posts;
SELECT *FROM posts as createdAt ORDER BY createdAt ASC;