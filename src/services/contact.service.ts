import api from './api';
import { ContactForm, ApiResponse } from '@/types';

export const contactService = {
  async send(data: ContactForm): Promise<ApiResponse<unknown>> {
    const response = await api.post('/contact', data);
    return response.data;
  },
};
