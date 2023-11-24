--CRUD - READ
CREATE OR REPLACE FUNCTION getUsers()
RETURNS Table (
	id int,
	role_id int,
	name varchar,
	is_active boolean
)
AS $$
BEGIN
  RETURN query select * from users order by id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION getUsers(user_id integer)
RETURNS Table (
	id int,
	role_id int,
	name varchar,
	is_active boolean
)
AS $$
BEGIN
  RETURN query select * 
  	from users
	where users.id = user_id
	order by id;
END;
$$ LANGUAGE plpgsql;

select * from getUsers();
select * from getUsers(1);

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

select * from addUser(1, 'ВАСИЛИЙ ПЕТРОВ', false);

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
