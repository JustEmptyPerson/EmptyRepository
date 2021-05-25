#CREATE TABLE posts ( id INT, discount INT, description VARCHAR(128),author VARCHAR(128), photoLink VARCHAR(128), createdAt DATE, likes VARCHAR(128),  hashtags VARCHAR(128));
Use dr;
SELECT*FROM posts WHERE rate>3;
#SELECT name,description, createdAt as date
#FROM posts inner join users on users.id=user
#ORDER BY createdAt ASC