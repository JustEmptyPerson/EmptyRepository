#CREATE TABLE posts ( id INT, discount INT, description VARCHAR(128),author VARCHAR(128), photoLink VARCHAR(128), createdAt DATE, likes VARCHAR(128),  hashtags VARCHAR(128));
Use dr;
SELECT DATEDIFF(CURDATE(),createdAt) FROM posts order by DATEDIFF(CURDATE(),createdAt) desc limit 1;
#SELECT name,description, createdAt as date
#FROM posts inner join users on users.id=user
#ORDER BY createdAt ASC