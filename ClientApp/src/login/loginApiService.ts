import axios from 'axios';
import { LoginModel } from './loginModel';

const apiUriBase = "http://localhost:5000/api";

export const login = (model: LoginModel): Promise<any> => {
  return axios.post<any>(`${apiUriBase}/login`, model)
    .then(response => response.data)
}