'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ZoomIn, Loader2 } from 'lucide-react';
import { galleryService, GalleryDB } from '@/services/gallery.service';
import { galleryItems as staticGalleryItems } from '@/data/gallery';

const categories = ['Semua', 'Suasana', 'Minuman', 'Makanan', 'Fasilitas'];

export default function GaleriPage() {
  const [items, setItems] = useState<GalleryDB[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<GalleryDB | null>(null);
  const [activeCategory, setActiveCategory] = useState('Semua');

  useEffect(() => {
    galleryService
      .getAll()
      .then((data) => {
        if (data.length > 0) {
          setItems(data);
        } else {
          setItems(
            staticGalleryItems.map((g) => ({
              id: String(g.id),
              alt: g.alt,
              category: g.category,
              image: g.src,
              createdAt: '',
              updatedAt: '',
            }))
          );
        }
      })
      .catch(() => {
        setItems(
          staticGalleryItems.map((g) => ({
            id: String(g.id),
            alt: g.alt,
            category: g.category,
            image: g.src,
            createdAt: '',
            updatedAt: '',
          }))
        );
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeCategory === 'Semua'
    ? items
    : items.filter(item => item.category === activeCategory);

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 bg-[#A92A35] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#8a2029] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#7a1f28] rounded-full -translate-x-1/3 translate-y-1/3" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <p className="text-[#F4D3B0] font-semibold text-sm uppercase tracking-widest mb-3">Visual</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Galeri Foto</h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Sekilas pandang suasana, menu, dan fasilitas Warkop Semesta Bahagia.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-14 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-10 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-[#A92A35] text-white shadow-md'
                    : 'bg-[#F4D3B0] text-[#A92A35] hover:bg-[#A92A35] hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-[#A92A35]" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-4xl mb-3">🖼️</p>
              <p className="text-gray-500 font-medium">Tidak ada foto di kategori ini</p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="relative overflow-hidden rounded-2xl group cursor-pointer break-inside-avoid"
                  onClick={() => setSelected(item)}
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={600}
                    height={400}
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[#A92A35]/0 group-hover:bg-[#A92A35]/60 transition-colors duration-300 flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/70 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-sm font-medium">{item.alt}</p>
                    <span className="text-[#F4D3B0] text-xs">{item.category}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute -top-4 -right-4 z-10 w-10 h-10 bg-[#F4D3B0] rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
              >
                <X className="w-5 h-5 text-[#A92A35]" />
              </button>
              <Image src={selected.image} alt={selected.alt} width={900} height={600} className="w-full rounded-2xl object-cover" />
              <div className="mt-4 text-center">
                <p className="text-white font-medium">{selected.alt}</p>
                <span className="text-[#F4D3B0] text-sm">{selected.category}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}