import asyncStore from './asyncStore';
import axios from 'axios';

const API_BASE_URL = 'http://192.168.0.126:4000/api/';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await asyncStore.getItem<string>('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(
      '[Request]',
      config.url,
      config.method?.toUpperCase(),
      config.data
    );
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (res) => {
    res.data = {
      message: res.data?.message,
      data: res.data?.data,
      extra: res.data?.extra,
      status: res.status,
    };
    console.log('[Response]', res.data);
    return res;
  },
  (error) => {
    const err = error.response?.data;
    console.log(err);
    console.log(
      '[Response Failed]',
      error.config?.method?.toUpperCase(),
      error.config?.url,
      err
    );
    return Promise.reject({
      message: err?.message || error.message || 'Something went wrong',
      status: error.response?.status,
      extra: err?.extra,
    });
  }
);
