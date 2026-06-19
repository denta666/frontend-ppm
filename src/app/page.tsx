import type { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import TentangSingkatSection from '@/components/sections/TentangSingkatSection';
import KeunggulanSection from '@/components/sections/KeunggulanSection';
import MenuFavoritSection from '@/components/sections/MenuFavoritSection';
import TestimoniSection from '@/components/sections/TestimoniSection';
import GaleriPreviewSection from '@/components/sections/GaleriPreviewSection';
import LokasiSection from '@/components/sections/LokasiSection';
import CTASection from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'Warkop Semesta Bahagia – Kopi Enak, Harga Merakyat, Buka 24 Jam',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TentangSingkatSection />
      <KeunggulanSection />
      <MenuFavoritSection />
      <TestimoniSection />
      <GaleriPreviewSection />
      <LokasiSection />
      <CTASection />
    </>
  );
}
