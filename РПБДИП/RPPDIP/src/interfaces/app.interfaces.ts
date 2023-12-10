export interface IUser{
    id?: number;
    mail?: string;
    role_id?: number;
    name?: string;
    is_active?: boolean;
    role_name?: string;
    password?: string;
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

export interface IAccess{
    id?: number,
    user_id?: number,
    room_id?: number,
    room_name?:number,
    access_id?: number,
    access_name?:string,
    start_time?: Date | null,
    end_time?: Date | null,
}

export interface IAccessBody extends Omit<IAccess, 'id'>{}

export interface IIncident{
    id?:number,
    user_id?: number,
    room_id?: number,
    timestamp?: Date,
    is_resolved?: boolean,
    comment?: string 
    enter_time?: Date,
    exit_time?: Date,
}

export interface IIncidentBody extends Omit<IIncident, 'id'>{}
