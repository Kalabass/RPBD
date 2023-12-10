import { Router } from "express";
import {UsersController} from "../controller/users_controller"

const users_router = Router();
const controller = new UsersController();

users_router.get('/users', controller.GetUsers);             //good
users_router.get('/users/:id', controller.GetUsersById); 
users_router.get('/userstokens', controller.GetAuthorizedUser);

users_router.delete('/users/:id', controller.DeleteUser);    //good   

users_router.put('/users/:id', controller.UpdateUser);

users_router.post('/users', controller.CreateUser);          //good
users_router.post('/users/registration', controller.Registration);
users_router.post('/users/login', controller.Login);

export default users_router;