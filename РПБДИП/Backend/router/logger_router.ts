import { Router } from "express";
import { LoggerController } from "../controller/logger_controller";

const logger_router = Router();
const controller = new LoggerController();

logger_router.get('/logger', controller.GetLogs);

logger_router.post('/logger', controller.AddLog);

logger_router.put('/logger', controller.AddExitLog);

export default logger_router;