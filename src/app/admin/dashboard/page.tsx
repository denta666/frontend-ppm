'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Coffee, Star, Loader2 } from 'lucide-react';
import { reviewService } from '@/services/review.service';
import { menuService } from '@/services/menu.service';
import { ContactService } from '@/services/contact.service';

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    contacts: 0,
    reviews: 0,
    menus: 0,
    avgRating: 0,
  });

  useEffect(() => {
    Promise.all([
      reviewService.getAll(),
      menuService.getAll(),
      ContactService.getAll(), // Assuming you have a ContactService to fetch contacts
    ])
      .then(([reviews, menus, contacts]) => {
        const avgRating =
          reviews.length > 0
            ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            : 0;
        setStats({
          contacts: contacts.length,
          reviews: reviews.length,
          menus: menus.length,
          avgRating,
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    { icon: Mail, label: 'Pesan Kontak', value: stats.contacts, color: 'bg-[#A92A35]' },
    { icon: MessageSquare, label: 'Total Testimoni', value: stats.reviews, color: 'bg-[#51716E]' },
    { icon: Coffee, label: 'Total Menu', value: stats.menus, color: 'bg-[#A92A35]' },
    { icon: Star, label: 'Rating Rata-rata', value: stats.avgRating.toFixed(1), color: 'bg-[#51716E]' },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-gray-800 mb-1">Dashboard</h1>
      <p className="text-gray-500 text-sm mb-8">Ringkasan data Warkop Semesta Bahagia</p>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[#A92A35]" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl shadow-sm p-6"
            >
              <div className={`w-11 h-11 ${card.color} rounded-xl flex items-center justify-center mb-4`}>
                <card.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{card.value}</p>
              <p className="text-sm text-gray-500">{card.label}</p>
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-8 bg-white rounded-2xl shadow-sm p-6">
        <h2 className="font-semibold text-gray-800 mb-2">Selamat datang di Admin Panel 👋</h2>
        <p className="text-sm text-gray-500 leading-relaxed">
          Gunakan menu di samping untuk mengelola pesan kontak yang masuk, melihat dan menghapus
          testimoni pelanggan, serta menambah, mengubah, atau menghapus menu yang ditampilkan di website.
        </p>
      </div>
    </div>
  );
}
