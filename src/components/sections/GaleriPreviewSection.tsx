'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { galleryItems } from '@/data/gallery';
import SectionHeader from '@/components/shared/SectionHeader';

export default function GaleriPreviewSection() {
  const preview = galleryItems.slice(0, 6);

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="Galeri"
          title="Intip Suasana Warkop Kami"
          description="Temukan keindahan dan kenyamanan Warkop Semesta Bahagia melalui foto-foto pilihan kami."
        />
        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-4">
          {preview.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`relative overflow-hidden rounded-2xl group ${i === 0 ? 'row-span-2' : ''}`}
              style={{ aspectRatio: i === 0 ? '1/2' : '1/1' }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[#A92A35]/0 group-hover:bg-[#A92A35]/50 transition-colors duration-300 flex items-end">
                <p className="text-white text-sm font-medium px-4 py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  {item.alt}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/galeri" className="btn-primary inline-flex items-center gap-2">
            Lihat Galeri Lengkap <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
