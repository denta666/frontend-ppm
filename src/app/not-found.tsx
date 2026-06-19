import Link from 'next/link';
import { Coffee, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4D3B0] dark:bg-gray-900 px-4">
      <div className="text-center">
        <div className="w-24 h-24 bg-[#A92A35] rounded-3xl flex items-center justify-center mx-auto mb-6">
          <Coffee className="w-12 h-12 text-white" />
        </div>
        <h1 className="font-display text-6xl font-bold text-[#A92A35] mb-2">404</h1>
        <h2 className="font-display text-2xl font-bold text-gray-800 dark:text-white mb-4">Halaman Tidak Ditemukan</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm mx-auto">
          Sepertinya kamu nyasar! Tapi tenang, kopi kami tetap siap menyambutmu di halaman utama.
        </p>
        <Link href="/" className="btn-primary inline-flex items-center gap-2">
          <Home className="w-4 h-4" /> Kembali ke Home
        </Link>
      </div>
    </div>
  );
}
