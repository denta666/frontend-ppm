import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { headers } from 'next/headers';

export const metadata: Metadata = {
  title: {
    default: 'Warkop Semesta Bahagia – Kopi Enak, Harga Merakyat, Buka 24 Jam',
    template: '%s | Warkop Semesta Bahagia',
  },
  description: 'Warkop Semesta Bahagia adalah cafe dan warkop modern di Slawi, Tegal. Nikmati kopi enak, suasana nyaman, Wi-Fi kencang, buka 24 jam. Harga Rp1.000–Rp25.000.',
  keywords: ['warkop', 'cafe', 'kopi', 'slawi', 'tegal', 'nongkrong', '24 jam', 'murah'],
  authors: [{ name: 'Warkop Semesta Bahagia' }],
  openGraph: {
    title: 'Warkop Semesta Bahagia – Kopi Enak, Harga Merakyat',
    description: 'Cafe & Warkop modern di Slawi, Tegal. Buka 24 jam, harga terjangkau, suasana nyaman.',
    type: 'website',
    locale: 'id_ID',
    siteName: 'Warkop Semesta Bahagia',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') ?? '';
  const isAdmin = pathname.startsWith('/admin');

  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          try {
            const theme = localStorage.getItem('theme');
            if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
              document.documentElement.classList.add('dark');
            }
          } catch(e) {}
        `}} />
      </head>
      <body>
        {!isAdmin && <Navbar />}
        <main>{children}</main>
        {!isAdmin && <Footer />}
      </body>
    </html>
  );
}