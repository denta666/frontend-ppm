import type { Metadata } from 'next';
import { Target, Eye, Heart, Shield, Users, Coffee } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';

export const metadata: Metadata = {
  title: 'Tentang Kami',
  description: 'Kenali lebih dalam tentang Warkop Semesta Bahagia — sejarah, visi, misi, dan nilai-nilai kami.',
};

const visiMisi = [
  {
    icon: Eye,
    title: 'Visi',
    bg: 'bg-[#A92A35]',
    content: 'Menjadi warkop modern paling dicintai di Kabupaten Tegal yang menghadirkan pengalaman ngopi berkualitas dengan harga yang terjangkau untuk semua kalangan masyarakat.',
  },
  {
    icon: Target,
    title: 'Misi',
    bg: 'bg-[#51716E]',
    content: [
      'Menyajikan kopi dan minuman berkualitas dengan bahan pilihan terbaik.',
      'Menciptakan suasana yang nyaman, bersih, dan kondusif untuk berbagai aktivitas.',
      'Memberikan pelayanan yang ramah, cepat, dan profesional kepada setiap pelanggan.',
      'Menjaga harga tetap terjangkau tanpa mengorbankan kualitas produk.',
      'Berinovasi secara berkelanjutan mengikuti tren dan kebutuhan pelanggan.',
    ],
  },
];

const nilaiPerusahaan = [
  { icon: Heart, title: 'Ketulusan', desc: 'Kami melayani dengan hati, bukan sekadar transaksi.' },
  { icon: Shield, title: 'Kualitas', desc: 'Standar mutu kami tidak pernah berkompromi untuk kepuasan pelanggan.' },
  { icon: Users, title: 'Kebersamaan', desc: 'Kami percaya bahwa warkop adalah ruang sosial yang menyatukan semua.' },
  { icon: Coffee, title: 'Inovasi', desc: 'Terus berinovasi menghadirkan pengalaman baru yang lebih baik.' },
];

export default function TentangPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-20 bg-[#A92A35] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#8a2029] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#7a1f28] rounded-full -translate-x-1/3 translate-y-1/3" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <p className="text-[#F4D3B0] font-semibold text-sm uppercase tracking-widest mb-3">Tentang Kami</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            Warkop Semesta Bahagia
          </h1>
          <p className="text-white/70 text-lg leading-relaxed">
            Lebih dari sekadar tempat minum kopi — kami adalah ruang ketiga yang hangat untuk semua orang.
          </p>
        </div>
      </section>

      {/* Profil */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeader subtitle="Profil" title="Siapa Kami?" />
          <div className="mt-8 space-y-4 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            <p className="leading-relaxed">
              <strong className="text-[#A92A35]">Warkop Semesta Bahagia</strong> adalah cafe dan warkop modern yang
              berlokasi di Jl. Merpati No.4, Slawi Kulon, Kecamatan Slawi, Kabupaten Tegal, Jawa Tengah.
              Kami hadir sebagai tempat nongkrong yang nyaman, terjangkau, dan buka 24 jam penuh.
            </p>
            <p className="leading-relaxed">
              Didirikan dengan semangat membangun ruang sosial yang inklusif, kami menggabungkan konsep
              warkop tradisional yang hangat dengan fasilitas modern. Wi-Fi kencang, colokan di setiap meja,
              suasana bersih dan nyaman — semua tersedia dengan harga yang benar-benar merakyat.
            </p>
            <p className="leading-relaxed">
              Dengan rating Google <strong className="text-[#A92A35]">4.3</strong> dan rentang harga{' '}
              <strong className="text-[#A92A35]">Rp1.000 – Rp25.000</strong>,
              kami berkomitmen untuk terus menjadi pilihan utama warga Slawi dan sekitarnya ketika ingin
              menikmati kopi, mengerjakan tugas, berdiskusi bisnis, atau sekadar menghabiskan waktu santai.
            </p>
          </div>
        </div>
      </section>

      {/* Visi & Misi */}
      <section className="py-20 bg-[#F4D3B0] dark:bg-gray-800">
        <div className="max-w-5xl mx-auto px-4">
          <SectionHeader subtitle="Arah Kami" title="Visi & Misi" />
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            {visiMisi.map((item) => (
              <div key={item.title} className="bg-white dark:bg-gray-700 rounded-2xl shadow-md p-8">
                <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center mb-5`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display text-2xl font-bold text-gray-800 dark:text-white mb-4">{item.title}</h3>
                {typeof item.content === 'string' ? (
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{item.content}</p>
                ) : (
                  <ul className="space-y-2">
                    {item.content.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-500 dark:text-gray-400 text-sm">
                        <span className="text-[#A92A35] font-bold mt-0.5">•</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nilai */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4">
          <SectionHeader subtitle="Nilai Kami" title="Prinsip yang Kami Pegang" />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {nilaiPerusahaan.map((item, i) => (
              <div key={i} className="bg-white dark:bg-gray-700 rounded-2xl shadow-md p-6 text-center group hover:shadow-xl transition-all border border-transparent hover:border-[#A92A35]/20">
                <div className="w-14 h-14 bg-[#A92A35] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="font-bold text-gray-800 dark:text-white mb-2">{item.title}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
