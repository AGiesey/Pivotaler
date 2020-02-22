import axios from 'axios';
import { LoginModel } from './loginModel';

const apiUriBase = "http://localhost:5000";

export const login = (model: LoginModel): Promise<any> => {
  return axios.post<any>(`${apiUriBase}/login`, model, {withCredentials: true})
    .then(response => {
      return response.data;
    })
}