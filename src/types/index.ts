export interface MenuItem {
  id: number;
  name: string;
  category: 'kopi' | 'non-kopi' | 'makanan' | 'snack';
  price: number;
  description: string;
  image: string;
  isFavorite?: boolean;
}

export interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  category: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export interface ReviewForm {
  name: string;
  rating: number;
  comment: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
