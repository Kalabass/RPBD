export interface IRequestUserBody{
    id?: number,
    role_id?: number,
    name?: string,
    is_active?: boolean, 
    mail?: string,
    password?: string
}

export interface IRequestRoomBody{
    id?: number,
    name?: string,
    max_duration?: number, 
}

export interface IRequestLoggerBody{
    user_id?: number,
    room_id?: number,
    enter_time: Date,
    exit_time: Date, 
}

export interface IRequestAcessBody{
    user_id?: number,
    room_id?: number,
    access_id?: number,
    enter_time: Date,
    exit_time: Date, 
}

export interface IRequestParams{
    id: number,
}

export interface IRequestIncidentBody{
    user_id?: number,
    room_id?: number,
    access_id?: number,
    timestamp: Date,
    is_resolved: Date,
    comment?: string 
}

export interface IRequestParams{
    id: number,
}