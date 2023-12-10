import { Request, Response } from "express";
import pool from "../db/db";
import { IRequestIncidentBody, IRequestParams } from "../types/types";

export class IncidentsController{
    async GetIncidents(req: Request<IRequestParams, {}, IRequestIncidentBody>, res: Response){
        try {
            const incidents = await pool.query('select * from get_incidents();');
            return res.status(200).json(incidents.rows);
        } catch (e) {
            console.log(e);
            return res.status(400).json({message : "error during getting rights"})
        }
    }

    async CreateIncident(req: Request<IRequestParams, {}, IRequestIncidentBody>, res: Response){
        try {
            const {user_id, room_id, timestamp, is_resolved, comment} = req.body;
            const incident = await pool.query('select * from create_incident($1, $2, $3, $4, $5);', [user_id, room_id, timestamp,is_resolved,comment]);
            return res.status(200).json(incident.rows[0]);
        } catch (e) {
            console.log(e);
            return res.status(400).json({message : "error during getting rights"})
        }
    }
x
    async UpdateIncident(req: Request<IRequestParams, {}, IRequestIncidentBody>, res: Response){
        try {
            const {is_resolved, comment} = req.body;
            const incident = await pool.query('select * from update_incident($1, $2, $3);', [req.params.id, is_resolved,comment]);
            return res.status(200).json(incident.rows[0]);
        } catch (e) {
            console.log(e);
            return res.status(400).json({message : "error during getting rights"})
        }
    }

    async DeleteIncident(req: Request<IRequestParams, {}, IRequestIncidentBody>, res: Response){
        try {
            const incident = await pool.query(`select * from delete_incident(${req.params.id});`);
            return res.status(200).json(incident.rows[0]);
        } catch (e) {
            console.log(e);
            return res.status(400).json({message : "error during getting rights"})
        }
    }
}