--CRUD - READ
drop function getUsers()
CREATE OR REPLACE FUNCTION getUsers()
RETURNS Table (
	id int,
	role_id int,
	name varchar,
	mail varchar,
	role_name varchar
)
AS $$
BEGIN
  RETURN query 
  select u.id, u.role_id, u.name, u.mail, r.role_name from users u
  join roles r on u.role_id = r.id
  order by u.id;
END;
$$ LANGUAGE plpgsql;

drop function  getUsers(user_id integer)
 
CREATE OR REPLACE FUNCTION getUsers(user_id integer)
RETURNS Table (
	id int,
	role_id int,
	name varchar,
	mail varchar,
	role_name varchar
)
AS $$
BEGIN
  RETURN query 
  select u.id, u.role_id, u.name, u.mail, r.role_name 
  	from users u
	join roles r on u.role_id = r.id
	where u.id = user_id
	order by id;
END;
$$ LANGUAGE plpgsql;

drop function get_user_by_token

CREATE OR REPLACE FUNCTION get_user_by_token(new_token VARCHAR)
RETURNS Table (
	id int,
	role_id int,
	name varchar,
	mail varchar,
	password varchar
)
AS $$
BEGIN
  RETURN query 
  select *
  	from users u
	where u.id = (select user_id from users_tokens where token = new_token)
	order by id;
END;
$$ LANGUAGE plpgsql;

select * from getUsers();
select * from getUsers(2); 
select * from get_user_by_token('$2b$04$DNGnQStdFADOVv1sKjCvpeJhbfHH1lDmFkgpZsrNTcwKBeOaXn2Nq');

--CRUD - Create

drop function addUser(
    user_role_id INT,
    user_name VARCHAR,
	user_mail VARCHAR,
	user_password VARCHAR
)

CREATE OR REPLACE FUNCTION addUser(
    user_role_id INT,
    user_name VARCHAR,
	user_mail VARCHAR,
	user_password VARCHAR
)
RETURNS TABLE (
    id INT,
    role_id INT,
    name VARCHAR,
    mail VARCHAR,
	password VARCHAR
) AS $$
BEGIN
    RETURN QUERY 
    INSERT INTO users (role_id, name, mail, password)
    VALUES (user_role_id, user_name, user_mail, user_password)
    RETURNING *;
END;
$$ LANGUAGE plpgsql;

select * from addUser(1, 'ВАСИЛИЙ ЖОПОВ', 'penis@detrov.ru', '123123');

--CRUD - DELETE
drop function deleteUser

CREATE OR REPLACE function deleteUser(
	delete_user_id int
)
RETURNS TABLE(
	user_id int,
	role_id int,
	name varchar, 
	mail VARCHAR
)
AS $$
BEGIN
	DELETE FROM useraccess ua WHERE ua.user_id = delete_user_id;
	DELETE FROM users_tokens ut WHERE ut.user_id = delete_user_id; 
	DELETE FROM access_requests ua WHERE ua.user_id = delete_user_id;
	
	RETURN QUERY
	DELETE  FROM users u  WHERE id = delete_user_id
	RETURNING u.id, u.role_id, u.name, u.mail;
END;
$$ LANGUAGE plpgsql;

SELECT * FROM deleteUser(43);

--CRUD - UPDATE
drop function update_user

CREATE OR REPLACE FUNCTION update_user(
	user_id INT,
	new_user_id INT,
	new_user_role_id INT,
    new_user_name VARCHAR,
    new_user_mail VARCHAR
)
RETURNS TABLE(
	id int,
	role_id int,
	name varchar, 
	mail VARCHAR
)
AS $$
BEGIN
	RETURN QUERY
	UPDATE users set
		id = new_user_id,
		role_id = new_user_role_id,
		name = new_user_name,
		mail = new_user_mail
		where users.id = user_id
	RETURNING *;
END;
$$ LANGUAGE plpgsql;

select * from update_user(23, 228, 2, 'Гена Моча', 54);




