import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Galeri',
  description: 'Galeri foto suasana, menu, dan fasilitas Warkop Semesta Bahagia di Slawi, Tegal.',
};

export default function GaleriLayout({ children }: { children: React.ReactNode }) {
  return children;
}
