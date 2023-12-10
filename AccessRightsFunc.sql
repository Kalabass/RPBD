--crud acessRights
--CREATE
drop function add_access;

CREATE OR REPLACE FUNCTION add_access(
	acess_user_id integer, 
	access_room_id integer,
	new_acess_id integer,
	acess_d_from timestamp without time zone,
	acess_d_to timestamp without time zone
)
RETURNS TABLE (
    id INT,
    user_id INT,
	room_id INT, 
    access_id INT,
    start_time timestamp without time zone,
	end_time timestamp without time zone
) AS $$
BEGIN
    RETURN QUERY 
    INSERT INTO useraccess (user_id, room_id, access_id, start_time, end_time)
    VALUES (acess_user_id, access_room_id, new_acess_id, acess_d_from, acess_d_to)
    RETURNING *;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION add_access(
	acess_user_id integer, 
	access_room_id integer,
	new_acess_id integer
)
RETURNS TABLE (
    id INT,
    user_id INT,
	room_id INT, 
    access_id INT,
    start_time timestamp without time zone,
	end_time timestamp without time zone
) AS $$
BEGIN
    RETURN QUERY 
    INSERT INTO useraccess (user_id, room_id, access_id, start_time, end_time)
    VALUES (acess_user_id, access_room_id, new_acess_id, NULL, NULL)
    RETURNING *;
END;
$$ LANGUAGE plpgsql;

select * from add_access(2, 5, 2);

--READ 
drop function get_access_rights_by_id

CREATE OR REPLACE FUNCTION get_access_rights_by_id(
	new_user_id int
)
RETURNS Table (
	id INT,
    user_id INT,
	room_id INT, 
	room_name varchar,
    access_id INT,
	access_name varchar,
    start_time timestamp without time zone,
	end_time timestamp without time zone
)
AS $$
BEGIN
  RETURN query 
  select ua.id, ua.user_id, ua.room_id, r.name, ua.access_id, ar.type, ua.start_time, ua.end_time
  from useraccess ua
  join rooms r on ua.room_id = r.id
  join accessrights ar on ua.access_id = ar.id
  where ua.user_id = new_user_id
  order by ua.id;
END;
$$ LANGUAGE plpgsql;

select * from get_access_rights_by_id(2);

--delete 

drop function delete_access

CREATE OR REPLACE function delete_access(
	delete_acess_id int
)
RETURNS TABLE(
	id INT,
    user_id INT,
	room_id INT, 
    access_id INT,
    start_time timestamp without time zone,
	end_time timestamp without time zone
)
AS $$
BEGIN
	RETURN QUERY
	DELETE  FROM useraccess ua WHERE ua.id = delete_acess_id
	RETURNING *;
END;
$$ LANGUAGE plpgsql;

SELECT * FROM delete_access(4);

--CRUDACESS_REQUESTS
--CREATE
drop function add_access;

CREATE OR REPLACE FUNCTION add_access_req(
	acess_user_id integer, 
	access_room_id integer,
	new_acess_id integer,
	acess_d_from timestamp without time zone,
	acess_d_to timestamp without time zone
)
RETURNS TABLE (
    id INT,
    user_id INT,
	room_id INT, 
    access_id INT,
    start_time timestamp without time zone,
	end_time timestamp without time zone
) AS $$
BEGIN
    RETURN QUERY 
    INSERT INTO access_requests (user_id, room_id, access_id, start_time, end_time)
    VALUES (acess_user_id, access_room_id, new_acess_id, acess_d_from, acess_d_to)
    RETURNING *;
END;
$$ LANGUAGE plpgsql;

SELECT * FROM add_access_req(2,5,1, null, null);

-----delete
drop function delete_access

CREATE OR REPLACE function delete_access_req(
	delete_acess_id int
)
RETURNS TABLE(
	id INT,
    user_id INT,
	room_id INT, 
    access_id INT,
    start_time timestamp without time zone,
	end_time timestamp without time zone
)
AS $$
BEGIN
	RETURN QUERY
	DELETE  FROM access_requests ua WHERE ua.id = delete_acess_id
	RETURNING *;
END;
$$ LANGUAGE plpgsql;

SELECT * FROM delete_access_req(1);
SELECT * FROM get_access_requests()
--READ

drop function get_access_rights_by_id

CREATE OR REPLACE FUNCTION get_access_requests()
RETURNS Table (
	id INT,
    user_id INT,
	room_id INT, 
	room_name varchar,
    access_id INT,
	access_name varchar,
    start_time timestamp without time zone,
	end_time timestamp without time zone
)
AS $$
BEGIN
  RETURN query 
  select ua.id, ua.user_id, ua.room_id, r.name, ua.access_id, ar.type, ua.start_time, ua.end_time
  from access_requests ua
  join rooms r on ua.room_id = r.id
  join accessrights ar on ua.access_id = ar.id
  order by ua.id;
END;
$$ LANGUAGE plpgsql;
SELECT * FROM get_access_requests()
 	