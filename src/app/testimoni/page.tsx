'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Quote, Plus, Loader2 } from 'lucide-react';
import { reviewService } from '@/services/review.service';
import { staticTestimonials } from '@/data/testimonials';
import { Testimonial } from '@/types';
import StarRating from '@/components/shared/StarRating';
import ToastContainer from '@/components/shared/ToastContainer';
import { useToast } from '@/hooks/useToast';
import { formatDate } from '@/lib/utils';

export default function TestimoniPage() {
  const [reviews, setReviews] = useState<Testimonial[]>(staticTestimonials);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', rating: 5, comment: '' });
  const { toasts, addToast, removeToast } = useToast();

  useEffect(() => {
    reviewService
      .getAll()
      .then((data) => { if (data.length > 0) setReviews(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.comment.trim()) {
      addToast('Nama dan komentar wajib diisi.', 'error');
      return;
    }
    setSubmitting(true);
    try {
      await reviewService.create(form);
      addToast('Terima kasih atas testimoni Anda!', 'success');
      setForm({ name: '', rating: 5, comment: '' });
      setShowForm(false);
      const data = await reviewService.getAll();
      if (data.length > 0) setReviews(data);
    } catch {
      addToast('Gagal mengirim testimoni. Coba lagi.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const avgRating = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 bg-[#A92A35] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#8a2029] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#7a1f28] rounded-full -translate-x-1/3 translate-y-1/3" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <p className="text-[#F4D3B0] font-semibold text-sm uppercase tracking-widest mb-3">Ulasan</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">Testimoni Pelanggan</h1>
          <div className="inline-flex items-center gap-3 bg-white/15 border border-white/20 rounded-2xl px-6 py-3">
            <StarRating rating={Math.round(avgRating)} size="md" />
            <span className="font-bold text-2xl text-[#F4D3B0]">{avgRating.toFixed(1)}</span>
            <span className="text-white/70 text-sm">dari {reviews.length} ulasan</span>
          </div>
        </div>
      </section>

      <section className="py-14 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <p className="text-gray-500 dark:text-gray-400 text-sm">{reviews.length} ulasan ditemukan</p>
            <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2 text-sm">
              <Plus className="w-4 h-4" />
              {showForm ? 'Tutup' : 'Tambah Ulasan'}
            </button>
          </div>

          {showForm && (
            <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="bg-[#F4D3B0]/40 dark:bg-gray-800 rounded-2xl p-6 mb-10 border border-[#A92A35]/20">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-6 text-lg">Tulis Ulasan Anda</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Nama Anda"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#A92A35]/40"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rating *</label>
                  <StarRating rating={form.rating} size="lg" interactive onRate={(r) => setForm({ ...form, rating: r })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Komentar *</label>
                  <textarea
                    value={form.comment}
                    onChange={(e) => setForm({ ...form, comment: e.target.value })}
                    placeholder="Ceritakan pengalaman Anda di Warkop Semesta Bahagia..."
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#A92A35]/40 resize-none"
                    required
                  />
                </div>
                <button type="submit" disabled={submitting} className="btn-primary flex items-center gap-2">
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {submitting ? 'Mengirim...' : 'Kirim Ulasan'}
                </button>
              </form>
            </motion.div>
          )}

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-[#A92A35]" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((review, i) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 relative"
                >
                  <Quote className="w-7 h-7 text-[#A92A35]/15 absolute top-4 right-4" />
                  <StarRating rating={review.rating} size="sm" />
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mt-3 mb-4">&ldquo;{review.comment}&rdquo;</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-[#A92A35] rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {review.name.charAt(0)}
                      </div>
                      <p className="font-semibold text-gray-800 dark:text-white text-sm">{review.name}</p>
                    </div>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{formatDate(review.createdAt)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
