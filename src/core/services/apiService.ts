// src/services/ApiService.ts
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ResponseModel } from '../model/responseModel';

export interface ApiServiceConfig {
  baseURL: string;
  headers?: Record<string, string>;
}

export class ApiService {
  private axiosInstance: AxiosInstance;

  constructor(config?: ApiServiceConfig) {
    this.axiosInstance = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/api`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...config?.headers,
      },
    });
  }

  public async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<ResponseModel<T>> {
    const response = await this.axiosInstance.get<ResponseModel<T>>(endpoint, config);
    return response.data;
  }

  public async post<T>(endpoint: string, body: unknown, config?: AxiosRequestConfig): Promise<ResponseModel<T>> {
    const response = await this.axiosInstance.post<ResponseModel<T>>(endpoint, body, config);
    return response.data;
  }

  public async put<T>(endpoint: string, body: unknown, config?: AxiosRequestConfig): Promise<ResponseModel<T>> {
    const response = await this.axiosInstance.put<ResponseModel<T>>(endpoint, body, config);
    return response.data;
  }

  public async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<ResponseModel<T>> {
    const response = await this.axiosInstance.delete<ResponseModel<T>>(endpoint, config);
    return response.data;
  }
}
