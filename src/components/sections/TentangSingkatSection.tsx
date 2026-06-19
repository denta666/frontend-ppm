'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Coffee, Heart, Star } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';

export default function TentangSingkatSection() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { icon: Coffee, value: '20+', label: 'Pilihan Menu', bg: 'bg-[#A92A35]', text: 'text-white' },
              { icon: Star, value: '4.3', label: 'Rating Google', bg: 'bg-[#F4D3B0]', text: 'text-[#A92A35]' },
              { icon: Heart, value: '500+', label: 'Pelanggan Setia', bg: 'bg-[#F4D3B0]', text: 'text-[#A92A35]' },
              { icon: Coffee, value: '24 Jam', label: 'Selalu Buka', bg: 'bg-[#A92A35]', text: 'text-white' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`${stat.bg} rounded-2xl p-6 text-center shadow-md`}
              >
                <div className={`w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  <stat.icon className={`w-6 h-6 ${stat.text}`} />
                </div>
                <p className={`text-2xl font-bold ${stat.text}`}>{stat.value}</p>
                <p className={`text-sm ${stat.text} opacity-80`}>{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeader subtitle="Tentang Kami" title="Lebih dari Sekadar Warkop" center={false} />
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed mt-4 mb-6">
              Warkop Semesta Bahagia hadir dengan konsep modern yang tetap mempertahankan kehangatan warkop tradisional.
              Kami percaya bahwa setiap orang berhak mendapatkan tempat yang nyaman untuk berkreasi, berdiskusi,
              dan menikmati waktu santai — tanpa harus menguras kantong.
            </p>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
              Berlokasi strategis di Slawi, Tegal, kami menyajikan kopi pilihan berkualitas dengan harga yang bersahabat,
              dilengkapi fasilitas modern seperti Wi-Fi kencang dan colokan listrik di setiap meja.
            </p>
            <Link href="/tentang" className="btn-primary inline-flex items-center gap-2">
              Pelajari Lebih Lanjut <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
