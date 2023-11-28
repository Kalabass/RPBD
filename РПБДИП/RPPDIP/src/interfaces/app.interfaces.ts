export interface IUser{
    id?: number;
    role_id?: number;
    name?: string;
    is_active?: boolean;
    role_name?: string;
}

export interface IUserBody extends Omit<IUser, 'id'>{}

export interface IRoom{
    id?: number,
    name?: string,
    max_duration?: number,
}

export interface IRoomBody extends Omit<IRoom, 'id'>{}

export interface ILog{
    id?: number,
    user_id?: number,
    room_id?: number,
    exit_time?: Date,
    enter_time?: Date,
}

export interface ILogBody extends Omit<ILog, 'id'>{}

export interface ILogComponent extends ILog{
    user_name?: string,
    room_name?: string,
}
