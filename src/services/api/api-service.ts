import axiosInstance from './interceptor';
import type { InternalAxiosRequestConfig } from 'axios';

class ApiService {
    async get<T>(url: string, config?: InternalAxiosRequestConfig): Promise<T> {
        const response = await axiosInstance.get<T>(url, config);
        return response.data;
    }

    async post<T, D>(url: string, data: D, config?: InternalAxiosRequestConfig): Promise<T> {
        return await axiosInstance.post<T>(url, data, config)
            .then((res) => {
                return Promise.resolve(res.data);
            })
            .catch((err) => {
                return Promise.reject(err.error);
            });
    }

    async put<T, D>(url: string, data: D, config?: InternalAxiosRequestConfig): Promise<T> {
        const response = await axiosInstance.put<T>(url, data, config);
        return response.data;
    }

    async delete<T>(url: string, config?: InternalAxiosRequestConfig): Promise<T> {
        const response = await axiosInstance.delete<T>(url, config);
        return response.data;
    }
}

const apiService = new ApiService();
export default apiService;
