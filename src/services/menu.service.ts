import api from './api';
import { ApiResponse } from '@/types';

export interface MenuDB {
  id: string;
  name: string;
  category: 'kopi' | 'non-kopi' | 'makanan' | 'snack';
  price: number;
  description: string;
  image: string;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MenuInput {
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  isFavorite?: boolean;
}

export const menuService = {
  async getAll(): Promise<MenuDB[]> {
    const response = await api.get<ApiResponse<MenuDB[]>>('/menus');
    return response.data.data || [];
  },

  async create(data: MenuInput): Promise<MenuDB> {
    const response = await api.post<ApiResponse<MenuDB>>('/menus', data);
    return response.data.data as MenuDB;
  },

  async update(id: string, data: Partial<MenuInput>): Promise<MenuDB> {
    const response = await api.put<ApiResponse<MenuDB>>(`/menus/${id}`, data);
    return response.data.data as MenuDB;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/menus/${id}`);
  },
};
