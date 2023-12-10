import { Request, Response } from "express";
import pool from "../db/db";
import { IRequestAcessBody, IRequestParams } from "../types/types";

export class AccessController{
    async GetRightsById(req: Request<IRequestParams, {}, IRequestAcessBody>, res: Response){
        try {
            const rights = await pool.query(`select * from get_access_rights_by_id(${req.params.id});`);
            return res.status(200).json(rights.rows);
        } catch (e) {
            console.log(e);
            return res.status(400).json({message : "error during getting rights"})
        }
    }

    async CreateAcess(req: Request<IRequestParams, {}, IRequestAcessBody>, res: Response){
        try {
            const {user_id, room_id, access_id, enter_time, exit_time} = req.body;
            console.log(enter_time);
            console.log(exit_time);
            const access_right = await pool.query('select * from add_access($1, $2, $3, $4, $5);',[user_id, room_id, access_id, enter_time, exit_time])
            return res.status(200).json(access_right.rows[0]);
        } catch (e) {
            console.log(e);
            return res.status(400).json({message : "error during "})
        }
    }

    async DeleteAcess(req: Request<IRequestParams, {}, IRequestAcessBody>, res: Response){
        try {
            const access_right = await pool.query(`SELECT * FROM delete_access(${req.params.id});`)
            return res.status(200).json(access_right.rows[0]);
        } catch (e) {
            console.log(e);
            return res.status(400).json({message : "error during "})
        }
    }

    async CreateAcessRequest(req: Request<IRequestParams, {}, IRequestAcessBody>, res: Response){
        try {
            const {user_id, room_id, access_id, enter_time, exit_time} = req.body;
            const access_right = await pool.query('select * from add_access_req($1, $2, $3, $4, $5);',[user_id, room_id, access_id, enter_time, exit_time])
            return res.status(200).json(access_right.rows[0]);
        } catch (e) {
            console.log(e);
            return res.status(400).json({message : "error during "})
        }
    }

    async DeleteAcessRequest(req: Request<IRequestParams, {}, IRequestAcessBody>, res: Response){
        try {
            const access_right = await pool.query(`SELECT * FROM delete_access_req(${req.params.id});`)
            return res.status(200).json(access_right.rows[0]);
        } catch (e) {
            console.log(e);
            return res.status(400).json({message : "error during "})
        }
    }

    async GetAcessRequest(req: Request<IRequestParams, {}, IRequestAcessBody>, res: Response){
        try {
            const requests = await pool.query(`select * from get_access_requests();`);
            return res.status(200).json(requests.rows);
        } catch (e) {
            console.log(e);
            return res.status(400).json({message : "error during penis getting rights"})
        }
    }

    
}