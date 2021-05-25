CREATE TABLE posts ( id INT, discount INT, description VARCHAR(128),author VARCHAR(128), photoLink VARCHAR(128), createdAt DATE, likes VARCHAR(128),  hashtags VARCHAR(128));
Use dr;
SELECT name,createdAt FROM posts  inner join users on users.id=user where  LENGTH(description)>100;

#SELECT name,description, createdAt as date
#FROM posts inner join users on users.id=user
#ORDER BY createdAt ASC