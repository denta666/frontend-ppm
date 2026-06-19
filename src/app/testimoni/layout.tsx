import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Testimoni',
  description: 'Baca ulasan pelanggan setia Warkop Semesta Bahagia dan bagikan pengalaman Anda.',
};

export default function TestimoniLayout({ children }: { children: React.ReactNode }) {
  return children;
}
