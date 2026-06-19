'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MessageCircle, Instagram, ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-20 bg-[#A92A35] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F4D3B0]/10 rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#F4D3B0]/10 rounded-full -translate-x-1/3 translate-y-1/3" />
      </div>
      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-block bg-[#F4D3B0]/20 border border-[#F4D3B0]/30 text-[#F4D3B0] text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            ☕ Yuk Mampir!
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
            Kopi Enak Menunggu Kamu di Slawi
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
            Datang kapan saja — kami buka 24 jam. Mulai dari Rp1.000 sudah bisa menikmati suasana yang nyaman.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/6289999999999?text=Halo+Warkop+Semesta+Bahagia!+Saya+ingin+bertanya."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#F4D3B0] hover:bg-[#ecc898] text-[#A92A35] font-bold px-6 py-3 rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" /> Chat WhatsApp
            </a>
            <a
              href="https://instagram.com/warkopsemesta"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/15 hover:bg-white/25 border border-white/30 text-white font-semibold px-6 py-3 rounded-xl transition-all flex items-center gap-2"
            >
              <Instagram className="w-4 h-4" /> Follow Instagram
            </a>
            <Link
              href="/menu"
              className="bg-white/15 hover:bg-white/25 border border-white/30 text-white font-semibold px-6 py-3 rounded-xl transition-all flex items-center gap-2"
            >
              Lihat Menu <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
