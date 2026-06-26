import api from './api';
import { ReviewForm, Testimonial, ApiResponse } from '@/types';

export const reviewService = {
  async getAll(): Promise<Testimonial[]> {
    const response = await api.get<ApiResponse<Testimonial[]>>('/reviews');
    return response.data.data || [];
  },

  async create(data: ReviewForm): Promise<ApiResponse<Testimonial>> {
    const response = await api.post('/reviews', data);
    return response.data;
  },

  async delete(id: string): Promise<ApiResponse<unknown>> {
    const response = await api.delete(`/reviews/${id}`);
    return response.data;
  },
};
