'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Loader2, Trash2, Pencil, Plus, Search, X, Coffee } from 'lucide-react';
import { menuService, MenuDB, MenuInput } from '@/services/menu.service';
import ToastContainer from '@/components/shared/ToastContainer';
import { useToast } from '@/hooks/useToast';
import { formatPrice } from '@/lib/utils';
import ImageUpload from '@/components/admin/ImageUpload';

const categories = [
  { value: 'kopi', label: 'Kopi' },
  { value: 'non-kopi', label: 'Non Kopi' },
  { value: 'makanan', label: 'Makanan' },
  { value: 'snack', label: 'Snack' },
];

const emptyForm: MenuInput = {
  name: '',
  category: 'kopi',
  price: 0,
  description: '',
  image: '',
  isFavorite: false,
};

export default function AdminMenuPage() {
  const [menus, setMenus] = useState<MenuDB[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<MenuInput>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { toasts, addToast, removeToast } = useToast();

  const fetchData = () => {
    setLoading(true);
    menuService
      .getAll()
      .then(setMenus)
      .catch(() => addToast('Gagal memuat data menu.', 'error'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (menu: MenuDB) => {
    setEditingId(menu.id);
    setForm({
      name: menu.name,
      category: menu.category,
      price: menu.price,
      description: menu.description,
      image: menu.image,
      isFavorite: menu.isFavorite,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.image || !form.description || form.price <= 0) {
      addToast('Lengkapi semua field dengan benar.', 'error');
      return;
    }
    setSubmitting(true);
    try {
      if (editingId) {
        const updated = await menuService.update(editingId, form);
        setMenus((prev) => prev.map((m) => (m.id === editingId ? updated : m)));
        addToast('Menu berhasil diperbarui.', 'success');
      } else {
        const created = await menuService.create(form);
        setMenus((prev) => [created, ...prev]);
        addToast('Menu berhasil ditambahkan.', 'success');
      }
      setShowModal(false);
    } catch {
      addToast('Gagal menyimpan menu.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus menu ini?')) return;
    setDeletingId(id);
    try {
      await menuService.delete(id);
      setMenus((prev) => prev.filter((m) => m.id !== id));
      addToast('Menu berhasil dihapus.', 'success');
    } catch {
      addToast('Gagal menghapus menu.', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = menus.filter((m) => m.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-800 mb-1">Kelola Menu</h1>
          <p className="text-gray-500 text-sm">Tambah, ubah, atau hapus menu yang tampil di website</p>
        </div>
        <button onClick={openCreateModal} className="btn-primary flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" /> Tambah Menu
        </button>
      </div>

      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Cari nama menu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#A92A35]/40 transition text-sm"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[#A92A35]" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
          <Coffee className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">Belum ada menu</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filtered.map((menu) => (
              <motion.div
                key={menu.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl shadow-sm overflow-hidden"
              >
                <div className="relative h-36">
                  <Image src={menu.image} alt={menu.name} fill className="object-cover" />
                  {menu.isFavorite && (
                    <span className="absolute top-2 left-2 bg-[#F4D3B0] text-[#A92A35] text-xs font-bold px-2 py-0.5 rounded-full">
                      ★ Favorit
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-gray-800 text-sm truncate">{menu.name}</p>
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full capitalize shrink-0 ml-2">
                      {menu.category}
                    </span>
                  </div>
                  <p className="text-[#A92A35] font-bold text-sm mb-3">{formatPrice(menu.price)}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(menu)}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium py-2 rounded-lg transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(menu.id)}
                      disabled={deletingId === menu.id}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-500 text-xs font-medium py-2 rounded-lg transition-colors disabled:opacity-50"
                    >
                      {deletingId === menu.id ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <><Trash2 className="w-3.5 h-3.5" /> Hapus</>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Modal Form */}
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
                <h2 className="font-semibold text-gray-800 text-lg">
                  {editingId ? 'Edit Menu' : 'Tambah Menu Baru'}
                </h2>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Menu *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Contoh: Es Kopi Susu"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#A92A35]/40"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Kategori *</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#A92A35]/40"
                    >
                      {categories.map((c) => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Harga (Rp) *</label>
                    <input
                      type="number"
                      value={form.price || ''}
                      onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                      placeholder="8000"
                      min={0}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#A92A35]/40"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Gambar Menu *</label>
                  <ImageUpload
                    value={form.image}
                    onChange={(url) => setForm({ ...form, image: url })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Deskripsi *</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Deskripsikan menu ini..."
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#A92A35]/40 resize-none"
                    required
                  />
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isFavorite}
                    onChange={(e) => setForm({ ...form, isFavorite: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300 text-[#A92A35] focus:ring-[#A92A35]"
                  />
                  <span className="text-sm text-gray-700">Tandai sebagai menu favorit</span>
                </label>

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
                    {editingId ? 'Simpan Perubahan' : 'Tambah Menu'}
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