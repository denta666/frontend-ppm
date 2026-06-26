import api from './api';
import { ContactForm, ApiResponse } from '@/types';

export const ContactService = {
  async send(data: ContactForm): Promise<ApiResponse<unknown>> {
    const response = await api.post('/contact', data);
    return response.data;
  },

  async getAll() {
    const response = await api.get('/contact');
    return response.data.data;
  },

  async delete(id: string) {
    const response = await api.delete(`/contact/${id}`);
    return response.data;
  },
};

export default ContactService;