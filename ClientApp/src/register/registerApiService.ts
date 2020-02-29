import axios from "axios";
import { RegisterModel } from "./registerModel";

const apiUriBase = "http://localhost:5000";

export const register = (registerModel: RegisterModel): Promise<any> => {
    return axios.post(`${apiUriBase}/register`, registerModel);
}
