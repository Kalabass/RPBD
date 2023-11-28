--CRUD - READ
drop function getUsers()

CREATE OR REPLACE FUNCTION getUsers()
RETURNS Table (
	id int,
	role_id int,
	name varchar,
	is_active boolean,
	role_name varchar
)
AS $$
BEGIN
  RETURN query 
  select u.*, r.role_name from users u
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
	is_active boolean,
	role_name varchar
)
AS $$
BEGIN
  RETURN query 
  select u.*, r.role_name 
  	from users u
	join roles r on u.role_id = r.id
	where u.id = user_id
	order by id;
END;
$$ LANGUAGE plpgsql;

select * from getUsers();
select * from getUsers(2);

--CRUD - Create
drop function addUser
CREATE OR REPLACE FUNCTION addUser(
    user_role_id INT,
    user_name VARCHAR,
    user_is_active BOOLEAN
)
RETURNS TABLE (
    id INT,
    role_id INT,
    name VARCHAR,
    active BOOLEAN
) AS $$
BEGIN
    RETURN QUERY 
    INSERT INTO users (role_id, name, is_active)
    VALUES (user_role_id, user_name, user_is_active)
    RETURNING *;
END;
$$ LANGUAGE plpgsql;

select * from addUser(1, 'ВАСИЛИЙ ЖОПОВ', false);

--CRUD - DELETE
drop function deleteUser
CREATE OR REPLACE function deleteUser(
	delete_user_id int
)
RETURNS TABLE(
	user_id int,
	role_id int,
	name varchar, 
	is_active boolean
)
AS $$
BEGIN
	RETURN QUERY
	DELETE  FROM users WHERE id = delete_user_id
	RETURNING *;
END;
$$ LANGUAGE plpgsql;

SELECT * FROM deleteUser(7);

--CRUD - UPDATE
drop function update_user

CREATE OR REPLACE FUNCTION update_user(
	user_id INT,
	new_user_id INT,
	new_user_role_id INT,
    new_user_name VARCHAR,
    new_user_is_active BOOLEAN
)
RETURNS TABLE(
	id int,
	role_id int,
	name varchar, 
	is_active boolean
)
AS $$
BEGIN
	RETURN QUERY
	UPDATE users set
		id = new_user_id,
		role_id = new_user_role_id,
		name = new_user_name,
		is_active = new_user_is_active
		where users.id = user_id
	RETURNING *;
END;
$$ LANGUAGE plpgsql;

select * from update_user(1, 12, 2, 'Василий пидорович', true);
