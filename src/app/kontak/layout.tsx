import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kontak',
  description: 'Hubungi Warkop Semesta Bahagia melalui WhatsApp, Instagram, atau form kontak kami.',
};

export default function KontakLayout({ children }: { children: React.ReactNode }) {
  return children;
}
