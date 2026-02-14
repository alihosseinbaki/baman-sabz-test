import type { InternalAxiosRequestConfig } from 'axios';
import apiService from "..//api-service";
import type {IResponseApis} from "../../../types/IResponseApis";
import type {IGetAllUsers} from "../../../types/models/user-model.ts";

class UserService {
    // getUsers Method
    async getUsers(data= {}, config?: InternalAxiosRequestConfig): Promise<IResponseApis<IGetAllUsers>> {
        return await apiService.post<IResponseApis<IGetAllUsers>, {}>("/users", data, config)
            .then((res) => {
                return Promise.resolve(res);
            })
            .catch((err) => {
                return Promise.reject(err);
            })
    }
}

const userService = new UserService();
export default userService;
