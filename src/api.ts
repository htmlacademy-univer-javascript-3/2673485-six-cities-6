import axios, {AxiosInstance, AxiosRequestHeaders} from 'axios';

import {getToken} from './services/token.ts';

const BASE_URL = 'https://16.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

export function createAPI(): AxiosInstance {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      const headers: AxiosRequestHeaders = config.headers ?? {};
      headers['X-Token'] = token;
      config.headers = headers;
    }
    return config;
  });

  return api;
}
