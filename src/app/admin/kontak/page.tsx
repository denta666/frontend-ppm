'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Trash2, Mail, Search } from 'lucide-react';
import { ContactService} from '@/services/contact.service';
import ToastContainer from '@/components/shared/ToastContainer';
import { useToast } from '@/hooks/useToast';
import { formatDate } from '@/lib/utils';


export default function AdminKontakPage() {
  const [contacts, setContacts] = useState<{
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}[]>([]);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { toasts, addToast, removeToast } = useToast();

const fetchData = () => {
  setLoading(true);

ContactService.getAll()
  .then((res) => {
    setContacts(res.data);
  })
    .catch(() => addToast('Gagal memuat data kontak.', 'error'))
    .finally(() => setLoading(false));
};

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus pesan ini?')) return;
    setDeletingId(id);
    try {
      await ContactService.delete(id);
      setContacts((prev) => prev.filter((c) => c.id !== id));
      addToast('Pesan berhasil dihapus.', 'success');
    } catch {
      addToast('Gagal menghapus pesan.', 'error');
    } finally {
      setDeletingId(null);
    }
  };

const filtered = Array.isArray(contacts)
  ? contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(search.toLowerCase()) ||
        contact.email.toLowerCase().includes(search.toLowerCase()) ||
        contact.message.toLowerCase().includes(search.toLowerCase())
    )
  : [];


  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-gray-800 mb-1">Pesan Kontak</h1>
      <p className="text-gray-500 text-sm mb-6">Daftar pesan yang dikirim pengunjung melalui form kontak</p>

      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Cari nama, email, atau pesan..."
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
          <Mail className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">Belum ada pesan kontak</p>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {filtered.map((contact) => (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-2xl shadow-sm p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-gray-800">{contact.name}</p>
                      <span className="text-xs text-gray-400">•</span>
                      <p className="text-xs text-gray-400">{formatDate(contact.createdAt)}</p>
                    </div>
                    <a href={`mailto:${contact.email}`} className="text-sm text-[#A92A35] hover:underline">
                      {contact.email}
                    </a>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">{contact.message}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(contact.id)}
                    disabled={deletingId === contact.id}
                    className="shrink-0 w-9 h-9 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl flex items-center justify-center transition-colors disabled:opacity-50"
                  >
                    {deletingId === contact.id ? (
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

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
