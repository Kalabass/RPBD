import axios from "axios";
import { IAccess, IAccessBody } from "../interfaces/app.interfaces";

class AccessService{

    private URL = 'http://localhost:9009/api/access'

    async getAllById(id:number){
        return axios.get<IAccess[]>(`${this.URL}/${id}`);
    }

    async getAllREquests(){
        return axios.get<IAccess[]>('http://localhost:9009/api/requests');
    }

    async AddAccess(access: IAccessBody){
        return axios.post<IAccess>(this.URL, access)
    }

    async DeleteAxess(id:number){
        return axios.delete<IAccess>(`${this.URL}/${id}`);
    }

    async AddAccessReq(access: IAccessBody){
        return axios.post<IAccess>('http://localhost:9009/api/requests', access)
    }

    async DeleteAxessReq(id:number){
        return axios.delete<IAccess>(`http://localhost:9009/api/requests/${id}`);
    }

}

export default new AccessService();