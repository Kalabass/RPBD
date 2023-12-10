--INCIDENTS-CRUD
--read

drop function get_incidents()

CREATE OR REPLACE FUNCTION get_incidents()
RETURNS Table (
	id int,
	user_id int,
	room_id int,
	"timestamp" TIMESTAMP,
	is_resolved boolean,
	comment text
)
AS $$
BEGIN
  RETURN query 
  select * from incidents i
  order by i.id;
END;
$$ LANGUAGE plpgsql;

select * from get_incidents();

--CREATE--

drop function create_incident()

CREATE OR REPLACE FUNCTION create_incident(
	new_user_id int,
	new_room_id int,
	new_timestamp TIMESTAMP,
	new_is_resolved boolean,
	new_comment text
)
RETURNS Table (
	id int,
	user_id int,
	room_id int,
	"timestamp" TIMESTAMP,
	is_resolved boolean,
	comment text
)
AS $$
BEGIN
  RETURN query 
  INSERT INTO incidents (user_id, room_id, timestamp, is_resolved, comment)
    VALUES (new_user_id, new_room_id, new_timestamp, new_is_resolved, new_comment)
    RETURNING *;
END;
$$ LANGUAGE plpgsql;

select * from create_incident(2, 5, '05-10-2003', false, 'penis');

--UPDATE
drop function update_incident()

CREATE OR REPLACE FUNCTION update_incident(
	new_id int,
	new_is_resolved boolean,
	new_comment text
)
RETURNS Table (
	id int,
	user_id int,
	room_id int,
	"timestamp" TIMESTAMP,
	is_resolved boolean,
	comment text
)
AS $$
BEGIN
  RETURN QUERY
	UPDATE incidents set
		is_resolved = new_is_resolved,
		comment = new_comment
	WHERE incidents.id = new_id
	RETURNING *;
END;
$$ LANGUAGE plpgsql;

select * from update_incident(57, true, 'pipis');

--Delete
drop function delete_incident(new_id int)

CREATE OR REPLACE FUNCTION delete_incident(
	new_id int
)
RETURNS Table (
	id int,
	user_id int,
	room_id int,
	"timestamp" TIMESTAMP,
	is_resolved boolean,
	comment text
)
AS $$
BEGIN
  RETURN QUERY
	DELETE  FROM incidents i  WHERE i.id = new_id
	RETURNING *;
END;
$$ LANGUAGE plpgsql;

select * from delete_incident(57);
