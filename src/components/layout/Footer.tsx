import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Clock, Phone, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-14 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-gray-800">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.png"
                alt="Logo Warkop Semesta Bahagia"
                width={36}
                height={36}
                className="rounded-xl object-cover"
              />
              <div>
                <p className="font-display font-bold text-white text-sm">Warkop Semesta Bahagia</p>
                <p className="text-xs text-[#7aaba7]">Kopi Enak, Harga Merakyat</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Tempat nongkrong, ngerjain tugas, dan berkumpul dengan suasana santai dan harga terjangkau di Slawi, Tegal.
            </p>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Informasi</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#A92A35] mt-0.5 shrink-0" />
                <span>Jl. Merpati No.4, Slawi Kulon, Kec. Slawi, Kabupaten Tegal, Jawa Tengah 52419</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#A92A35] shrink-0" />
                <span>Buka 24 Jam</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#A92A35] shrink-0" />
                <a href="https://wa.me/6282262752221" className="hover:text-white transition-colors">+62 822-6275-2221</a>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Navigasi</h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/', label: 'Home' },
                { href: '/tentang', label: 'Tentang Kami' },
                { href: '/menu', label: 'Menu' },
                { href: '/galeri', label: 'Galeri' },
                { href: '/testimoni', label: 'Testimoni' },
                { href: '/kontak', label: 'Kontak' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white hover:translate-x-1 transition-all inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex gap-3">
              <a
                href="https://www.instagram.com/warkopsemestabahagia?igsh=NGMzYXZweDY5dzN3"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 hover:bg-[#A92A35] rounded-lg flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/6282262752221"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 hover:bg-[#25D366] rounded-lg flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Warkop Semesta Bahagia. Semua hak dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
