import axios from "axios";
import { ILog, ILogBody, ILogComponent } from "../interfaces/app.interfaces";

class LogsService{

    private URL = 'http://localhost:9009/api/logger'

    async getAll(){
        return axios.get<ILogComponent[]>(this.URL);
    }

    async AddLog(log: ILogBody){
        return axios.post<ILog>(this.URL, log)
    }

    async AddExitLog(log: ILogBody){
        return axios.put<ILog>(this.URL, log);
    }

}

export default new LogsService();