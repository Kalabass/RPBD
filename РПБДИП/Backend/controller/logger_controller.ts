import { Request, Response } from "express";
import pool from "../db/db";
import { IRequestLoggerBody, IRequestParams } from "../types/types";

export class LoggerController{
    async GetLogs(req: Request<IRequestParams, {}, IRequestLoggerBody>, res: Response){
        try {
            const logs = await pool.query('select * from getLogs();');
            return res.status(200).json(logs.rows);
        } catch (e) {
            console.log(e);
            return res.status(400).json({message : "error during getting logs"})
        }
    }

    async AddLog(req: Request<IRequestParams, {}, IRequestLoggerBody>, res: Response){
        try {
            const {user_id, room_id, enter_time} = req.body;
            const log = await pool.query('select * from add_new_log($1, $2, $3);', [user_id, room_id, enter_time]);
            return res.status(200).json(log.rows[0]);
        } catch (e) {
            if(e.message === "User does not have access to the room"){
                return res.status(403).json({message : "User does not have access to the room"})
            }
            return res.status(400).json({message : "error during creating log"})
        }
    }

    async AddExitLog(req: Request<IRequestParams, {}, IRequestLoggerBody>, res: Response){
        try {
            const {user_id, exit_time} = req.body;
            const log = await pool.query(`select * from add_exit_log($1, $2);`, [user_id, exit_time]);
            return res.status(200).json(log.rows[0]);
        } catch (e) {
            console.log(e);
            return res.status(400).json({message : "error during updating log"})
        }
    }
}