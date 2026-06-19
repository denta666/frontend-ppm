'use client';

import { motion } from 'framer-motion';
import { Wifi, Clock, Zap, DollarSign, MapPin, Users } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';

const keunggulan = [
  { icon: Clock, title: 'Buka 24 Jam', desc: 'Kapan pun kamu butuh tempat, kami selalu ada.' },
  { icon: Wifi, title: 'Wi-Fi Kencang', desc: 'Koneksi internet cepat dan stabil untuk kerja atau belajar.' },
  { icon: DollarSign, title: 'Harga Terjangkau', desc: 'Mulai dari Rp1.000 saja. Ramah di kantong semua kalangan.' },
  { icon: Zap, title: 'Colokan Banyak', desc: 'Outlet listrik tersedia di setiap meja, nggak perlu rebutan.' },
  { icon: MapPin, title: 'Lokasi Strategis', desc: 'Mudah dijangkau di pusat Kota Slawi, Tegal.' },
  { icon: Users, title: 'Suasana Nyaman', desc: 'Cocok untuk santai, kerja, diskusi, atau kumpul bareng.' },
];

export default function KeunggulanSection() {
  return (
    <section className="py-20 bg-[#A92A35] relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="Mengapa Kami"
          title="Keunggulan Warkop Semesta Bahagia"
          description="Kami hadir bukan hanya sebagai tempat minum kopi, tapi sebagai ruang ketiga yang nyaman untuk semua."
          titleClass="text-white"
          descClass="text-white/70"
        />
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {keunggulan.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-2xl p-6 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-[#F4D3B0] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <item.icon className="w-6 h-6 text-[#A92A35]" />
              </div>
              <h3 className="font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-white/70 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
