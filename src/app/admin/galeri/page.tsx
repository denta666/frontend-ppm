'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Loader2, Trash2, Plus, X, Images } from 'lucide-react';
import { galleryService, GalleryDB, GalleryInput } from '@/services/gallery.service';
import ToastContainer from '@/components/shared/ToastContainer';
import { useToast } from '@/hooks/useToast';
import ImageUpload from '@/components/admin/ImageUpload';

const categories = ['Suasana', 'Minuman', 'Makanan', 'Fasilitas'];

const emptyForm: GalleryInput = {
  title: '',
  category: 'Suasana',
  image: '',
};

export default function AdminGaleriPage() {
  const [galleries, setGalleries] = useState<GalleryDB[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<GalleryInput>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { toasts, addToast, removeToast } = useToast();

  const fetchData = () => {
    setLoading(true);
    galleryService
      .getAll()
      .then(setGalleries)
      .catch(() => addToast('Gagal memuat data galeri.', 'error'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.image || !form.category) {
      addToast('Lengkapi semua field.', 'error');
      return;
    }
    setSubmitting(true);
    try {
      const created = await galleryService.create(form);
      setGalleries((prev) => [created, ...prev]);
      addToast('Foto berhasil ditambahkan.', 'success');
      setShowModal(false);
      setForm(emptyForm);
    } catch {
      addToast('Gagal menambahkan foto.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus foto ini?')) return;
    setDeletingId(id);
    try {
      await galleryService.delete(id);
      setGalleries((prev) => prev.filter((g) => g.id !== id));
      addToast('Foto berhasil dihapus.', 'success');
    } catch {
      addToast('Gagal menghapus foto.', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-800 mb-1">Kelola Galeri</h1>
          <p className="text-gray-500 text-sm">Tambah atau hapus foto yang tampil di galeri website</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" /> Tambah Foto
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[#A92A35]" />
        </div>
      ) : galleries.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
          <Images className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">Belum ada foto di galeri</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {galleries.map((gallery) => (
              <motion.div
                key={gallery.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl shadow-sm overflow-hidden group"
              >
                <div className="relative h-48">
                  <Image src={gallery.image} alt={gallery.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800 text-sm truncate">{gallery.title}</p>
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                      {gallery.category}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDelete(gallery.id)}
                    disabled={deletingId === gallery.id}
                    className="w-9 h-9 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl flex items-center justify-center transition-colors disabled:opacity-50 shrink-0"
                  >
                    {deletingId === gallery.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="font-semibold text-gray-800 text-lg">Tambah Foto Baru</h2>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Judul Foto *</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Contoh: Area duduk outdoor"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#A92A35]/40"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Kategori *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#A92A35]/40"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Foto *</label>
                  <ImageUpload
                    value={form.image}
                    onChange={(url) => setForm({ ...form, image: url })}
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 btn-primary flex items-center justify-center gap-2"
                  >
                    {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                    Tambah Foto
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}