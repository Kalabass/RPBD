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
---------------TRIGGERS-----------------------------
---------------B4-Indest----------------------------
drop function access_check() cascade
drop trigger acess_check_trigger on user_action_logs


CREATE OR REPLACE FUNCTION access_check()
RETURNS TRIGGER AS $$
DECLARE
    new_user_id INTEGER;
    new_room_id INTEGER;
    new_access_type INTEGER;
    new_start_time TIMESTAMP;
    new_end_time TIMESTAMP;
BEGIN
    new_user_id := NEW.user_id;
    new_room_id := NEW.room_id;

    SELECT ua.access_id, ua.start_time, ua.end_time
    INTO new_access_type, new_start_time, new_end_time
    FROM useraccess ua
    WHERE ua.user_id = new_user_id AND ua.room_id = new_room_id;
	
    IF NOT FOUND THEN
		call penis();
        RAISE EXCEPTION 'User does not have access to the room';
    END IF;
	

    CASE
        WHEN new_access_type = 1 THEN
        WHEN new_access_type = 2 THEN
            IF NOT (CURRENT_DATE BETWEEN new_start_time AND new_end_time) THEN
				INSERT INTO incidents(user_id, room_id, timestamp, is_resolved, comment)
        		VALUES(new_user_id, new_room_id, current_date, false, 'попытка входа с истёкшим разрешением');
				
                RAISE EXCEPTION 'Access time is not valid for the room';
            END IF;
        WHEN new_access_type = 3 THEN
            DELETE FROM useraccess WHERE user_id = new_user_id AND room_id = new_room_id;
        ELSE
            RAISE EXCEPTION 'Unknown access type';
    END CASE;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER acess_check_trigger
BEFORE INSERT ON user_action_logs
FOR EACH ROW 
EXECUTE FUNCTION access_check();

---------------B4-UPDATE----------------------------

CREATE OR REPLACE FUNCTION time_check()
RETURNS TRIGGER AS $$
DECLARE
    new_enter_time TIMESTAMP;
    new_exit_time TIMESTAMP;
    new_max_duration_hours integer; 
BEGIN
    new_enter_time := NEW.enter_time;
    new_exit_time := NEW.exit_time;

    SELECT max_duration INTO new_max_duration_hours FROM rooms r WHERE r.id = NEW.room_id;

    IF (SELECT EXTRACT(EPOCH FROM (new_exit_time - new_enter_time)) / 3600 >= new_max_duration_hours) THEN
        INSERT INTO incidents(user_id, room_id, timestamp, is_resolved, comment)
            VALUES(NEW.user_id, NEW.room_id, current_timestamp, false, 'Провёл времени больше положенного');
    END IF;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER time_check_trigger
AFTER UPDATE ON user_action_logs
FOR EACH ROW 
EXECUTE FUNCTION time_check();

SELECT * FROM pg_trigger where oid = 28164;





