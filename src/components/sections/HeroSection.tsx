'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Clock, Star, ArrowRight, Coffee } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#A92A35]">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#8a2029] rounded-full -translate-y-1/3 translate-x-1/3 opacity-60" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#7a1f28] rounded-full translate-y-1/3 -translate-x-1/3 opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#F4D3B0]/5 rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 grid md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/15 text-[#F4D3B0] px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-white/20"
          >
            <Coffee className="w-4 h-4" />
            Buka 24 Jam Non-Stop
          </motion.div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Tempat Nongkrong{' '}
            <span className="text-[#F4D3B0]">Paling Nyaman</span>{' '}
            di Slawi
          </h1>

          <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-lg">
            Kopi enak, harga merakyat, Wi-Fi kencang, dan suasana santai yang bikin betah.
            Cocok untuk nongkrong, ngerjain tugas, dan berkumpul bersama.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <div className="flex items-center gap-1.5 text-sm text-white bg-white/15 border border-white/20 px-3 py-1.5 rounded-lg">
              <Star className="w-4 h-4 fill-[#F4D3B0] text-[#F4D3B0]" />
              <span className="font-semibold">4.3</span>
              <span className="text-white/70">Rating</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-white bg-white/15 border border-white/20 px-3 py-1.5 rounded-lg">
              <Clock className="w-4 h-4 text-[#F4D3B0]" />
              <span>24 Jam</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-white bg-white/15 border border-white/20 px-3 py-1.5 rounded-lg">
              <span className="text-[#F4D3B0] font-semibold">Rp1.000</span>
              <span className="text-white/70">– Rp25.000</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/menu" className="bg-[#F4D3B0] hover:bg-[#ecc898] text-[#A92A35] font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg hover:shadow-xl active:scale-95">
              Lihat Menu <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/kontak" className="border-2 border-white/40 hover:border-white text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-xl flex items-center gap-2 transition-all">
              Hubungi Kami
            </Link>
          </div>

          <div className="mt-8 flex items-start gap-2 text-sm text-white/60">
            <MapPin className="w-4 h-4 text-[#F4D3B0] mt-0.5 shrink-0" />
            <span>Jl. Merpati No.4, Slawi Kulon, Kec. Slawi, Kabupaten Tegal</span>
          </div>
        </motion.div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative"
        >
          <div className="relative w-full aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 bg-[#F4D3B0]/20 rounded-[40%_60%_60%_40%/40%_40%_60%_60%] border border-[#F4D3B0]/30" />
            <div className="absolute inset-8 bg-white/10 rounded-[40%_60%_60%_40%/40%_40%_60%_60%] flex items-center justify-center backdrop-blur-sm overflow-hidden">
              <Image
                src="/logo.png"
                alt="Logo Warkop Semesta Bahagia"
                width={180}
                height={180}
                className="object-contain opacity-90"
              />
            </div>
            {/* Floating cards */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 text-center"
            >
              <p className="text-2xl font-bold text-[#A92A35]">4.3★</p>
              <p className="text-xs text-gray-500">Rating Google</p>
            </motion.div>
            <motion.div
              animate={{ y: [8, -8, 8] }}
              transition={{ repeat: Infinity, duration: 3.5 }}
              className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4"
            >
              <p className="text-2xl font-bold text-[#51716E]">24 Jam</p>
              <p className="text-xs text-gray-500">Selalu Buka</p>
            </motion.div>
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="absolute top-1/2 -right-8 bg-[#F4D3B0] rounded-2xl shadow-xl p-3"
            >
              <p className="text-lg font-bold text-[#A92A35]">20+</p>
              <p className="text-xs text-[#A92A35]/70">Menu</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 80L60 69.3C120 58.7 240 37.3 360 32C480 26.7 600 37.3 720 42.7C840 48 960 48 1080 42.7C1200 37.3 1320 26.7 1380 21.3L1440 16V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}