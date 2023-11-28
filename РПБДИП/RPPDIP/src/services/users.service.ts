import axios from "axios"
import { IUser, IUserBody } from "../interfaces/app.interfaces";

class UsersService {
    private URL = 'http://localhost:9009/api/users';

    async getAll(){
        return axios.get<IUser[]>(this.URL);
    }

    async getById(id : number){
        return axios.get<IUser>(`${this.URL}/${id}`);
    }

    async delete(id: number){
        return axios.delete<IUser>(`${this.URL}/${id}`);
    }

    async update(id: number, user: IUserBody){
        return axios.put<IUser>(`${this.URL}/${id}`, user);
    }

    async create(user: IUserBody){
        return axios.post<IUser>(this.URL, user);
    }
}

export default new UsersService()