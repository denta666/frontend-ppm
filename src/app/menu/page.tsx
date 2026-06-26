'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Search, X } from 'lucide-react';
import { menuService, MenuDB } from '@/services/menu.service';
import { formatPrice, cn } from '@/lib/utils';

const menuCategories = [
  { value: 'semua', label: 'Semua' },
  { value: 'kopi', label: 'Kopi' },
  { value: 'non-kopi', label: 'Non Kopi' },
  { value: 'makanan', label: 'Makanan' },
  { value: 'snack', label: 'Snack' },
];

export default function MenuPage() {
  const [menus, setMenus] = useState<MenuDB[]>([]);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('semua');

  useEffect(() => {
    menuService.getAll().then(setMenus).catch(() => {});
  }, []);

  const filtered = useMemo(() => {
    return menus.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());
      const matchCat = activeCategory === 'semua' || item.category === activeCategory;
      return matchSearch && matchCat;
    });
  }, [menus, search, activeCategory]);

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 bg-[#A92A35] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#8a2029] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#7a1f28] rounded-full -translate-x-1/3 translate-y-1/3" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <p className="text-[#F4D3B0] font-semibold text-sm uppercase tracking-widest mb-3">Pilihan Kami</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Menu Warkop</h1>
          <p className="text-white/70">Temukan menu favoritmu dengan harga yang selalu ramah di kantong.</p>
        </div>
      </section>

      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari menu..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A92A35]/40 transition"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="flex gap-2 flex-wrap">
              {menuCategories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={cn(
                    'px-4 py-2.5 rounded-xl text-sm font-semibold transition-all',
                    activeCategory === cat.value
                      ? 'bg-[#A92A35] text-white shadow-md'
                      : 'bg-[#F4D3B0] text-[#A92A35] hover:bg-[#A92A35] hover:text-white'
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Menampilkan <span className="font-semibold text-[#A92A35]">{filtered.length}</span> menu
          </p>

          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-24">
                <p className="text-5xl mb-4">☕</p>
                <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">Menu tidak ditemukan</p>
                <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Coba kata kunci atau kategori lain</p>
                <button
                  onClick={() => { setSearch(''); setActiveCategory('semua'); }}
                  className="mt-4 text-[#A92A35] text-sm font-medium hover:underline"
                >
                  Reset Filter
                </button>
              </motion.div>
            ) : (
              <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filtered.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl overflow-hidden group transition-shadow duration-300"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-2 left-2">
                        <span className="bg-[#A92A35] text-white text-xs font-semibold px-2 py-0.5 rounded-full capitalize">{item.category}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 dark:text-white mb-1 truncate">{item.name}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2 leading-relaxed">{item.description}</p>
                      <p className="text-[#A92A35] font-bold">{formatPrice(item.price)}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
