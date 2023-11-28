import { Router } from "express";
import { RoomsController } from "../controller/rooms_controller";

const rooms_router = Router();
const controller = new RoomsController();

rooms_router.get('/rooms', controller.GetRooms);
rooms_router.get('/rooms/:id', controller.GetRoomById);

export default rooms_router;