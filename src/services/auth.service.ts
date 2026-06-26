import api from './api';
import { ApiResponse } from '@/types';

export interface LoginInput {
  username: string;
  password: string;
}

export interface AdminData {
  id: string;
  username: string;
}

export interface LoginResponse {
  token: string;
  admin: AdminData;
}

export const authService = {
  async login(data: LoginInput): Promise<LoginResponse> {
    const response = await api.post<ApiResponse<LoginResponse>>('/auth/login', data);
    return response.data.data as LoginResponse;
  },

  saveToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_token', token);
    }
  },

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('admin_token');
    }
    return null;
  },

  removeToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_token');
    }
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  logout() {
    this.removeToken();
  },
};
