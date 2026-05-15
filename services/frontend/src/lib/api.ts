import axios, { AxiosInstance } from 'axios';
import { useAuthStore } from './auth-store';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

let apiInstance: AxiosInstance;

export function initializeApi() {
  apiInstance = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Add authorization header to all requests
  apiInstance.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Handle auth errors
  apiInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        useAuthStore.getState().clearAuth();
        window.location.href = '/auth/login';
      }
      return Promise.reject(error);
    }
  );

  return apiInstance;
}

export function getApi(): AxiosInstance {
  if (!apiInstance) {
    initializeApi();
  }
  return apiInstance;
}

// API functions
export const authApi = {
  register: (email: string, password: string) =>
    getApi().post('/auth/register', { email, password }),
  login: (email: string, password: string) =>
    getApi().post('/auth/login', { email, password }),
  me: () => getApi().get('/auth/me'),
};

export const projectsApi = {
  list: () => getApi().get('/projects'),
  create: (name: string, description?: string) =>
    getApi().post('/projects', { name, description }),
  get: (id: string) => getApi().get(`/projects/${id}`),
  delete: (id: string) => getApi().delete(`/projects/${id}`),
};

export const nodesApi = {
  list: (projectId: string) => getApi().get(`/projects/${projectId}/nodes`),
  create: (projectId: string, data: any) =>
    getApi().post(`/projects/${projectId}/nodes`, data),
  update: (projectId: string, nodeId: string, data: any) =>
    getApi().patch(`/projects/${projectId}/nodes/${nodeId}`, data),
  delete: (projectId: string, nodeId: string) =>
    getApi().delete(`/projects/${projectId}/nodes/${nodeId}`),
};
