import { Request, Response } from "express";
import pool from "../db/db";
import { IRequestRoomBody, IRequestParams } from "../types/types";

export class RoomsController{
    async GetRooms(req: Request<IRequestParams, {}, IRequestRoomBody>, res: Response){
        try {
            const rooms = await pool.query('select * from getRooms();');
            return res.status(200).json(rooms.rows);
        } catch (e) {
            console.log(e);
            return res.status(400).json({message : "error during getting rooms"})
        }
    }

    async GetRoomById(req: Request<IRequestParams, {}, IRequestRoomBody>, res: Response){
        try {
            const room = await pool.query(`select * from getRooms(${req.params.id});`);
            return res.status(200).json(room.rows[0]);
        } catch (e) {
            console.log(e);
            return res.status(400).json({message : "error during getting rooms"})
        }
    }
}