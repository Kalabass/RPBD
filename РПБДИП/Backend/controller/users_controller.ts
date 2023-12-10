import { Request, Response } from "express";
import pool from "../db/db";
import { IRequestParams, IRequestUserBody } from "../types/types";
import * as bcrypt from "bcrypt";

export interface IRequestCookies{
    token?: string,
}

export class UsersController{
    async GetUsers(req: Request<IRequestParams, {}, IRequestUserBody>, res: Response){
        try {
            const users = await pool.query(`select * from getUsers();`);
            return res.status(200).json(users.rows);
        } catch (e) {
            console.log(e);
            return res.status(400).json({message: "error during getting users"})
        }
    }

    async GetUsersById(req: Request<IRequestParams, {}, IRequestUserBody>, res: Response){
        try {
            const user = await pool.query(`select * from getUsers(${req.params.id})`)
            return res.status(200).json(user.rows[0]);
        } catch (e) {
            console.log(e);
            return res.status(400).json({message: "error during getting user by id"})
        }
    }

    async UpdateUser(req: Request<IRequestParams, {}, IRequestUserBody>, res: Response){
        try {
            const {id, is_active, name, role_id} = req.body;
            const updatedUser = await pool.query('select * from update_user($1, $2, $3, $4, $5)', [req.params.id, id, role_id, name, is_active]);
            return res.status(200).json(updatedUser.rows[0])
        } catch (e) {
            console.log(e);
            return res.status(400).json({messge: "error during updating user"})
        }
    }

    async DeleteUser(req: Request<IRequestParams, {}, IRequestUserBody>, res: Response){
        try {
            const deletedUser = await pool.query(`select * from deleteUser(${req.params.id})`);
            return res.status(200).json(deletedUser.rows[0]);
        } catch (e) {
            console.log(e);
            return res.status(400).json({message : "error during deleting user"})
        }
    }

    async CreateUser(req: Request<IRequestParams, {}, IRequestUserBody>, res: Response){
        try {
            const { role_id, name, mail, password } = req.body;
            const hashPassword = bcrypt.hashSync(password, 6);
            
            const newUser = await pool.query({
                text: 'SELECT * FROM addUser($1, $2, $3, $4)',
                values: [role_id, name, mail, hashPassword]
            });
    
            return res.status(200).json(newUser.rows[0]);
        } catch (e) {
            console.log(e);
            return res.status(400).json({ message: "error during creating user" });
        }
    }

    async Registration(req: Request<IRequestParams, {}, IRequestUserBody>, res: Response){
        try {
            const { mail, name, password } = req.body;
            const user = await pool.query('select * from users where mail = $1', [mail]);
            if(user.rowCount > 0){
                return res.status(400).json({ message: "Пользователь с такой почтой уже существет" });
            }
            
            const hashPassword = bcrypt.hashSync(password, 6);

            const newUser = await pool.query({
                text: 'SELECT * FROM addUser($1, $2, $3, $4)',
                values: [2, name, mail, hashPassword]
            });

            const token = bcrypt.hashSync(name + password + mail, 4);

            res.cookie('token', token);

            await pool.query('insert into users_tokens (user_id, token) values($1, $2)', [newUser.rows[0].id, token]);

            return res.status(200).json(newUser.rows[0]);
        } catch (e) {
            console.log(e);
            return res.status(400).json({ message: "error during creating user" });
        }
    }

    async Login(req: Request<IRequestParams, {}, IRequestUserBody>, res: Response){
        try {
            const {mail, password } = req.body;
            
            const user = await pool.query('select * from users where mail = $1', [mail]);

            if(user.rowCount == 0){
                return res.status(400).json({ message: "такого пользователя не существет" });
            }

            if(!bcrypt.compareSync(password, user.rows[0].password)){
                return res.status(400).json({ message: "неверный пароль" });
            }

            await pool.query('delete from users_tokens where user_id = $1', [user.rows[0].id])

            const token = bcrypt.hashSync( password + mail, 4);

            await pool.query('insert into users_tokens (user_id, token) values($1, $2)', [user.rows[0].id, token]);

            res.cookie('token', token);
            return res.status(200).json({message: 'Set Cookie'});
        } catch (e) {
            console.log(e);
            return res.status(400).json({ message: "error during creating user" });
        }
    }

    async GetAuthorizedUser(req: Request<IRequestParams, {}, IRequestUserBody, IRequestCookies>, res: Response){
        try {
            const cookies: IRequestCookies = req.cookies;

            const user = await pool.query('select * from get_user_by_token($1)', [cookies.token]);

            return res.status(200).json(user.rows[0]);
        } catch (e) {
            console.log(e);
            return res.status(400).json({ message: "error during creating user" });
        }
    }
}