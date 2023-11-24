import { Router } from "express";
import {UsersController} from "../controller/users_controller"

const users_router = Router();
const controller = new UsersController();

users_router.get('/users', controller.GetUsers);             //good
users_router.get('/users/:id', controller.GetUsersById);     //good

users_router.delete('/users/:id', controller.DeleteUser);    //good   

users_router.put('/users/:id', controller.UpdateUser);

users_router.post('/users', controller.CreateUser);          //good

export default users_router;