import { Router } from "express";
import { AccessController } from "../controller/acess_controller";

const access_router = Router();
const controller = new AccessController();

access_router.get('/access/:id', controller.GetRightsById);
access_router.get('/requests', controller.GetAcessRequest);

access_router.post('/access', controller.CreateAcess);

access_router.delete('/access/:id', controller.DeleteAcess);

access_router.post('/requests', controller.CreateAcessRequest);

access_router.delete('/requests/:id', controller.DeleteAcessRequest);

export default access_router;