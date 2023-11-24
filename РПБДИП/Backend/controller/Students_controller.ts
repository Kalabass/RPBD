import { Request, Response } from "express";
import pool from "../db/db";

interface IRequestBody{
    n_z?: number,
    f_name?: string,
    s_name?: string,
    data_b?: string,
    n_gr?: string,
    ball?: number,
}

interface IRequestParams{
    n_z: number
}



export class StudentController{
    async GetStudents(req: Request, res: Response){
        try {
            const students = await pool.query(`select * from "Students" order by n_z`);
            return res.status(200).json(students.rows);
        } catch (e) {
            console.log(e);
            return res.status(400).json({message : "pzdc"});

        }
    }

    async GetOneStudents(req: Request<IRequestParams,{},IRequestBody>, res: Response){
        try {
            const student = await pool.query(`select * from "Students" where n_z = ${req.params.n_z}`);
            return res.status(200).json(student.rows[0]);
        } catch (e) {
            console.log(e);
            return res.status(400).json({message : "pzdc"});

        }
    }

    async CreateStudent(req: Request<IRequestParams,{},IRequestBody>, res: Response){
        try {
            const {n_z, ball, data_b, f_name, n_gr, s_name} = req.body;
            const student = await pool.query(`insert into "Students"(n_z, f_name, s_name, data_b, n_gr, ball) values(${n_z}, '${f_name}', '${s_name}', '${data_b}', '${n_gr}', ${ball}) returning *`);
            return res.status(200).json(student.rows[0]);
        } catch (e) {
            console.log(e);
            return res.status(400).json({message : "pzdc"});
        }
    }

    async UpdateStudent(req: Request<IRequestParams,{},IRequestBody>, res: Response){
        try {
            const SetString:string = Object.keys(req.body).map((key) => `${key} = '${req.body[key]}'`).join(', ');

            const student = await pool.query(`update "Students" set ${SetString} where n_z =  ${req.params.n_z}  returning *`);
            return res.status(200).json(student.rows[0]);
        } catch (e) {
            console.log(e);
            return res.status(400).json({message : "pzdc"});
        }
    }

    async DeleteStudent(req: Request<IRequestParams,{},IRequestBody>, res: Response){
        try {
            const student = await pool.query(`delete from "Students" where n_z =  ${req.params.n_z} returning *`);
            return res.status(200).json(student.rows[0]);
        } catch (e) {
            console.log(e);
            return res.status(400).json({message : "pzdc"});
        }
    }

    async jija(req: Request<IRequestParams,{},IRequestBody>, res: Response){
        console.log('1');
        try {
            const student = await pool.query(`select * from users;`); 
            return res.status(200).json(student.rows[0]);
        } catch (e) {
            console.log(e);
            return res.status(400).json({message : "pzdc"});
        }
    }
}