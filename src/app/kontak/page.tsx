'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Instagram, MessageCircle, Loader2, Send } from 'lucide-react';
import { contactService } from '@/services/contact.service';
import ToastContainer from '@/components/shared/ToastContainer';
import { useToast } from '@/hooks/useToast';

export default function KontakPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const { toasts, addToast, removeToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      addToast('Semua field wajib diisi.', 'error');
      return;
    }
    setLoading(true);
    try {
      await contactService.send(form);
      addToast('Pesan berhasil dikirim! Kami akan segera menghubungi Anda.', 'success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      addToast('Gagal mengirim pesan. Silakan coba lagi.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 bg-[#A92A35] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#8a2029] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#7a1f28] rounded-full -translate-x-1/3 translate-y-1/3" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <p className="text-[#F4D3B0] font-semibold text-sm uppercase tracking-widest mb-3">Hubungi Kami</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Ada Yang Bisa Kami Bantu?</h1>
          <p className="text-white/70">Jangan ragu untuk menghubungi kami melalui form di bawah atau media sosial kami.</p>
        </div>
      </section>

      <section className="py-14 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="font-display text-2xl font-bold text-gray-800 dark:text-white mb-6">Kirim Pesan</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Nama Lengkap *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Masukkan nama Anda"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#A92A35]/40 transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="email@contoh.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#A92A35]/40 transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Pesan *</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tuliskan pesan, pertanyaan, atau saran Anda..."
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#A92A35]/40 transition resize-none"
                    required
                  />
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
                  {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Mengirim...</> : <><Send className="w-4 h-4" /> Kirim Pesan</>}
                </button>
              </form>
            </motion.div>

            {/* Info */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <h2 className="font-display text-2xl font-bold text-gray-800 dark:text-white mb-6">Informasi Kontak</h2>

              <div className="bg-[#F4D3B0]/40 dark:bg-gray-800 rounded-2xl p-6 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#A92A35] rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white text-sm mb-1">Alamat</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                      Jl. Merpati No.4, Slawi Kulon, Kec. Slawi,<br />Kabupaten Tegal, Jawa Tengah 52419
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#51716E] rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white text-sm mb-1">Jam Operasional</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Buka 24 Jam, 7 Hari Seminggu</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#A92A35] rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white text-sm mb-1">Telepon / WA</p>
                    <a href="https://wa.me/6289999999999" className="text-sm text-[#A92A35] hover:underline">+62 899-9999-999</a>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <a
                  href="https://wa.me/6289999999999?text=Halo+Warkop+Semesta+Bahagia!"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white font-semibold py-3 rounded-xl transition-colors"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
                <a
                  href="https://instagram.com/warkopsemesta"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white font-semibold py-3 rounded-xl transition-opacity"
                >
                  <Instagram className="w-4 h-4" /> Instagram
                </a>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-md h-56">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.123456789!2d109.1397!3d-6.9933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTknMzYuMCJTIDEwOcKwMDgnMjIuOSJF!5e0!3m2!1sid!2sid!4v1234567890"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                  title="Peta Lokasi Warkop Semesta Bahagia"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
