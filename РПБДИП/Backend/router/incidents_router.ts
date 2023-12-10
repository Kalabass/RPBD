import { Router } from "express";
import { IncidentsController } from "../controller/incidents_controller";

const incidents_router = Router();
const controller = new IncidentsController();

incidents_router.get('/incidents', controller.GetIncidents);

incidents_router.post('/incidents', controller.CreateIncident);

incidents_router.put('/incidents/:id', controller.UpdateIncident);

incidents_router.delete('/incidents/:id', controller.DeleteIncident);

export default incidents_router;