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

    async registration(user: IUserBody){
        return axios.post(`${this.URL}/registration`, user, { withCredentials: true })
    }

    async login(user: IUserBody){
        return axios.post(`${this.URL}/login`, user, { withCredentials: true })
    }

    async GetByToken(){
        return axios.get<IUser>('http://localhost:9009/api/userstokens', { withCredentials: true });
    }

}

export default new UsersService()