import { Request, Response } from "express";
import pool from "../db/db";
import { IRequestBody, IRequestParams } from "../types/types";

export class UsersController{
    async GetUsers(req: Request<IRequestParams, {}, IRequestBody>, res: Response){
        try {
            const users = await pool.query(`select * from getUsers();`);
            return res.status(200).json(users.rows);
        } catch (e) {
            console.log(e);
            return res.status(400).json({message: "error during getting users"})
        }
    }

    async GetUsersById(req: Request<IRequestParams, {}, IRequestBody>, res: Response){
        try {
            const user = await pool.query(`select * from getUsers(${req.params.id})`)
            return res.status(200).json(user.rows[0]);
        } catch (e) {
            console.log(e);
            return res.status(400).json({message: "error during getting user by id"})
        }
    }

    async UpdateUser(req: Request<IRequestParams, {}, IRequestBody>, res: Response){
        try {
            const {id, is_active, name, role_id} = req.body;
            const updatedUser = await pool.query('select * from update_user($1, $2, $3, $4, $5)', [req.params.id, id, role_id, name, is_active]);
            return res.status(200).json(updatedUser.rows[0])
        } catch (e) {
            console.log(e);
            return res.status(400).json({messge: "error during updating user"})
        }
    }

    async DeleteUser(req: Request<IRequestParams, {}, IRequestBody>, res: Response){
        try {
            const deletedUser = await pool.query(`select * from deleteUser(${req.params.id})`);
            return res.status(200).json(deletedUser.rows[0]);
        } catch (e) {
            console.log(e);
            return res.status(400).json({message : "error during deleting user"})
        }
    }

    async CreateUser(req: Request<IRequestParams, {}, IRequestBody>, res: Response){
        try {
            const { role_id, name, is_active } = req.body;
            console.log(req.body);
            
            const newUser = await pool.query({
                text: 'SELECT * FROM addUser($1, $2, $3)',
                values: [role_id, name, is_active]
            });
    
            return res.status(200).json(newUser.rows[0]);
        } catch (e) {
            console.log(e);
            return res.status(400).json({ message: "error during creating user" });
        }
    }
    

    async popa(req: Request<IRequestParams, {}, IRequestBody>, res: Response){
        try {
            
        } catch (e) {
            console.log(e);
            return res.status(400).json({message : "error during"})
        }
    }
}