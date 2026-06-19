'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Quote } from 'lucide-react';
import { staticTestimonials } from '@/data/testimonials';
import StarRating from '@/components/shared/StarRating';
import SectionHeader from '@/components/shared/SectionHeader';

export default function TestimoniSection() {
  const preview = staticTestimonials.slice(0, 3);

  return (
    <section className="py-20 bg-[#51716E] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="Testimoni"
          title="Kata Mereka Tentang Kami"
          description="Ratusan pelanggan telah merasakan kenyamanan Warkop Semesta Bahagia. Inilah cerita mereka."
          titleClass="text-white"
          descClass="text-white/70"
        />
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {preview.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-white/10 hover:bg-white/15 border border-white/20 rounded-2xl p-6 relative transition-all duration-300"
            >
              <Quote className="w-8 h-8 text-[#F4D3B0]/30 absolute top-4 right-4" />
              <StarRating rating={t.rating} size="sm" />
              <p className="text-white/80 text-sm leading-relaxed mt-3 mb-4">
                &ldquo;{t.comment}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#F4D3B0] rounded-full flex items-center justify-center text-[#A92A35] font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <p className="font-semibold text-white text-sm">{t.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/testimoni" className="border-2 border-[#F4D3B0] text-[#F4D3B0] hover:bg-[#F4D3B0] hover:text-[#51716E] font-semibold px-6 py-3 rounded-xl transition-all inline-flex items-center gap-2">
            Lihat Semua Testimoni <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
