import axios from "axios";
import {  IIncident, IIncidentBody } from "../interfaces/app.interfaces";

class IncidentsService{

    private URL = 'http://localhost:9009/api/incidents'

    async getAll(){
        return axios.get<IIncident[]>(this.URL);
    }

    async CreateIncident(incident: IIncidentBody){
        return axios.post<IIncident>(this.URL, incident)
    }

    async UpdateIncident(id:number, incident: IIncidentBody){
        return axios.put<IIncident>(`${this.URL}/${id}`, incident);
    }

    async DeleteIncident(id:number){
        return axios.delete<IIncident>(`${this.URL}/${id}`);
    }
}

export default new IncidentsService();