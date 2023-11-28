--CRUD--LOGGER 
--Create
drop function add_new_log
CREATE OR REPLACE FUNCTION add_new_log
(
	new_user_id integer,
	new_room_id integer,
	new_enter_time timestamp 
)
RETURNS Table (
	id int,
	user_id integer,
	room_id integer,
	enter_time timestamp,
	exit_time timestamp
)
AS $$
BEGIN
	RETURN QUERY
	INSERT INTO user_action_logs (user_id, room_id, enter_time) 
		VALUES (new_user_id, new_room_id, new_enter_time)
	RETURNING *;
END;
$$ LANGUAGE plpgsql;

select * from add_new_log(26, 7, current_timestamp::timestamp without time zone);

--Update

drop function add_exit_log

CREATE OR REPLACE FUNCTION add_exit_log
(
	new_user_id integer,
	new_exit_time timestamp 
)
RETURNS Table (
	id int,
	user_id integer,
	room_id integer,
	enter_time timestamp,
	exit_time timestamp
)
AS $$
BEGIN
	RETURN QUERY
	UPDATE user_action_logs 
	SET
		exit_time = new_exit_time
	WHERE 
		user_action_logs.id = (SELECT ual.id FROM user_action_logs ual WHERE ual.user_id  = new_user_id ORDER BY id DESC LIMIT 1)
	RETURNING *;
END;
$$ LANGUAGE plpgsql;

select * from add_exit_log(21, current_timestamp::timestamp without time zone);

--READ
drop function getLogs

CREATE OR REPLACE FUNCTION getLogs()
RETURNS Table (
	id int,
	user_id integer,
	user_name varchar,
	room_id integer,
	room_name varchar,
	enter_time timestamp,
	exit_time timestamp
)
AS $$
BEGIN
  RETURN query 
  select ual.id, ual.user_id, u.name user_name, ual.room_id, r.name room_name, ual.enter_time, ual.exit_time 
  from user_action_logs ual
  join users u on u.id = ual.user_id
  join rooms r on r.id = ual.room_id
  order by ual.id;
END;
$$ LANGUAGE plpgsql;

select * from getLogs()

drop table user_action_logs

