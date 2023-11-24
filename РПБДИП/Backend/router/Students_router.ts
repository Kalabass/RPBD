import { Router } from "express";
import { StudentController } from "../controller/Students_controller";

const students_router = Router();
const controller = new StudentController();

students_router.get('/students', controller.GetStudents);
students_router.get('/students/:n_z', controller.GetOneStudents);

students_router.post('/students', controller.CreateStudent);

students_router.put('/students/:n_z', controller.UpdateStudent);

students_router.delete('/students/:n_z', controller.DeleteStudent);

students_router.get('/jija', controller.jija);

export default students_router;