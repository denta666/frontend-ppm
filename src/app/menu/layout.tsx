import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Menu',
  description: 'Daftar lengkap menu Warkop Semesta Bahagia — kopi, non-kopi, makanan, dan snack dengan harga Rp1.000 – Rp25.000.',
};

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return children;
}
