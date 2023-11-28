import axios from "axios";
import { IRoom } from "../interfaces/app.interfaces";

class RoomsService {
    private URL = 'http://localhost:9009/api/rooms';

    async getAll(){
        return axios.get<IRoom[]>(this.URL);
    }
}

export default new RoomsService