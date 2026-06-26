import api from './api';
import { ApiResponse } from '@/types';

export interface GalleryDB {
  id: string;
  title: string;
  category: string;
  image: string;
  createdAt: string;
}

export interface GalleryInput {
  title: string;
  category: string;
  image: string;
}

export const galleryService = {
  async getAll(): Promise<GalleryDB[]> {
    const response = await api.get<ApiResponse<GalleryDB[]>>('/galleries');
    return response.data.data || [];
  },

  async create(data: GalleryInput): Promise<GalleryDB> {
    const response = await api.post<ApiResponse<GalleryDB>>('/galleries', data);
    return response.data.data as GalleryDB;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/galleries/${id}`);
  },
};