import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Manrope } from 'next/font/google';
import { Providers } from '@/providers';
import { TopBar } from '@/components/features/navigation/TopBar';
import { Footer } from '@/components/features/navigation/Footer';
import '@/styles/globals.css';

// LINE Seed JP A — download from https://seed.line.me/index_jp.html#seed-font
// Place woff2 files in src/app/fonts/
const lineSeedJP = localFont({
  src: [
    { path: './fonts/LINESeedJP_A_Th.woff2', weight: '100', style: 'normal' },
    { path: './fonts/LINESeedJP_A_Rg.woff2', weight: '400', style: 'normal' },
    { path: './fonts/LINESeedJP_A_Bd.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-line-seed-jp',
  display: 'swap',
});

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SAMANSA Test',
  description: '厳選された短編映画をカテゴリ別に楽しめる映画情報サービス',
  icons: {
    icon: '/favicon.ico',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${lineSeedJP.variable} ${manrope.variable}`}
    >
      <body>
        <Providers>
          <TopBar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
