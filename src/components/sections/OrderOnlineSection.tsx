'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const platforms = [
  {
    name: 'GoFood',
    description: 'Pesan lewat Gojek',
    color: '#E4333A',
    bg: '#FFF0F0',
    logo: (
      <svg viewBox="0 0 60 60" className="w-10 h-10" fill="none">
        <circle cx="30" cy="30" r="30" fill="#E4333A" />
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="22" fontWeight="bold" fontFamily="Arial">Go</text>
      </svg>
    ),
    link: 'https://gofood.link/a/S1Umk9d',
  },
  {
    name: 'GrabFood',
    description: 'Pesan lewat Grab',
    color: '#00B14F',
    bg: '#F0FFF6',
    logo: (
      <svg viewBox="0 0 60 60" className="w-10 h-10" fill="none">
        <circle cx="30" cy="30" r="30" fill="#00B14F" />
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" fontFamily="Arial">Grab</text>
      </svg>
    ),
    link: 'https://food.grab.com/id/en/restaurant/online-delivery/6-C7WBLBTBC2DXC2?sourceID=20260629_165303_A371996386474B609DB83E2162D865C6_MEXMPS',
  },
  {
    name: 'ShopeeFood',
    description: 'Pesan lewat Shopee',
    color: '#EE4D2D',
    bg: '#FFF3F0',
    logo: (
      <svg viewBox="0 0 60 60" className="w-10 h-10" fill="none">
        <circle cx="30" cy="30" r="30" fill="#EE4D2D" />
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold" fontFamily="Arial">SPF</text>
      </svg>
    ),
    link: 'https://shopee.co.id/universal-link/now-food/shop/22593289?deep_and_deferred=1&shareChannel=copy_link',
  },
];

export default function OrderOnlineSection() {
  return (
    <section className="py-16 bg-[#F4D3B0]/20 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-[#A92A35] font-semibold text-sm uppercase tracking-widest mb-3">
            Tanpa Perlu Keluar Rumah
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Pesan Online, Antar ke Pintu Kamu
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Nikmati kopi dan makanan favorit dari Warkop Semesta Bahagia langsung di rumah.
            Tersedia di berbagai platform pengiriman makanan.
          </p>
        </motion.div>

        {/* Platform Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {platforms.map((platform, i) => (
            <motion.a
              key={platform.name}
              href={platform.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex flex-col items-center text-center border border-gray-100 dark:border-gray-700"
            >
              <div className="mb-4 rounded-2xl p-3" style={{ background: platform.bg }}>
                {platform.logo}
              </div>
              <h3 className="font-bold text-gray-800 dark:text-white text-lg mb-1">
                {platform.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {platform.description}
              </p>
              <span
                className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
                style={{ color: platform.color, background: platform.bg }}
              >
                Pesan Sekarang
                <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </motion.a>
          ))}
        </div>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#A92A35] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-white"
        >
          <div>
            <p className="font-bold text-lg mb-1">⏰ Buka 24 Jam, Setiap Hari</p>
            <p className="text-white/80 text-sm">
              Pesan kapan saja — tengah malam pun kami siap antarkan.
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-white/70 text-xs uppercase tracking-wide mb-1">Mulai dari</p>
            <p className="font-display text-3xl font-bold">Rp 15.000</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}