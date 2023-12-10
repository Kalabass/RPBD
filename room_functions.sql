--CRUD ROOMS
--CREATE
--READ
drop function getRooms()
CREATE OR REPLACE FUNCTION getRooms()
RETURNS Table (
	id int,
	name varchar,
	max_duration numeric
)
AS $$
BEGIN
  RETURN query 
  select *
  from rooms 
  order by rooms.id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION getRooms(room_id integer)
RETURNS Table (
	id int,
	name varchar,
	max_duration int
)
AS $$
BEGIN
  RETURN query 
  select *
  from rooms 
  where rooms.id = room_id
  order by rooms.id;
END;
$$ LANGUAGE plpgsql;

select * from getRooms();
select * from getRooms(1);

--UPDATE
--DELETE