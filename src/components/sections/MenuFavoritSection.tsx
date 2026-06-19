'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { menuItems } from '@/data/menu';
import { formatPrice } from '@/lib/utils';
import SectionHeader from '@/components/shared/SectionHeader';

const favorites = menuItems.filter((m) => m.isFavorite).slice(0, 6);

export default function MenuFavoritSection() {
  return (
    <section className="py-20 bg-[#F4D3B0] dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="Menu Pilihan"
          title="Favorit Pelanggan Kami"
          description="Dari sekian banyak menu, inilah yang paling sering dipesan dan disukai pengunjung setia Warkop Semesta Bahagia."
        />
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-gray-700 rounded-2xl overflow-hidden group shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-[#A92A35] text-white text-xs font-semibold px-2.5 py-1 rounded-full capitalize">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-1">{item.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{item.description}</p>
                <p className="text-[#A92A35] font-bold text-lg">{formatPrice(item.price)}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/menu" className="btn-primary inline-flex items-center gap-2">
            Lihat Semua Menu <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
