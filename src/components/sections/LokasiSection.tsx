'use client';

import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Navigation } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';

export default function LokasiSection() {
  return (
    <section className="py-20 bg-[#F4D3B0] dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="Lokasi"
          title="Temukan Kami di Sini"
          description="Kami berlokasi di pusat Kota Slawi, mudah dijangkau dari berbagai penjuru Kabupaten Tegal."
        />
        <div className="mt-14 grid md:grid-cols-2 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-lg h-80 md:h-full min-h-[320px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.123456789!2d109.1397!3d-6.9933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTknMzYuMCJTIDEwOcKwMDgnMjIuOSJF!5e0!3m2!1sid!2sid!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '320px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Warkop Semesta Bahagia"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-md p-6 space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#A92A35] rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-1">Alamat</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    Jl. Merpati No.4, Slawi Kulon, Kec. Slawi,<br />
                    Kabupaten Tegal, Jawa Tengah 52419
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#51716E] rounded-xl flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-1">Jam Operasional</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Buka 24 Jam, 7 Hari Seminggu</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#A92A35] rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-1">Hubungi Kami</h4>
                  <a href="https://wa.me/6289999999999" className="text-sm text-[#A92A35] hover:underline">
                    +62 899-9999-999 (WhatsApp)
                  </a>
                </div>
              </div>
            </div>

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Jl.+Merpati+No.4+Slawi+Tegal"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <Navigation className="w-4 h-4" />
              Petunjuk Arah
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
