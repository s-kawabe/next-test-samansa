import type { Metadata } from 'next';
import { LINE_Seed_JP, Manrope } from 'next/font/google';
import { Providers } from '@/providers';
import { TopBar } from '@/components/features/navigation/TopBar';
import { Footer } from '@/components/features/navigation/Footer';
import '@/styles/globals.css';

const lineSeedJP = LINE_Seed_JP({
  variable: '--font-line-seed-jp',
  subsets: ['latin'],
  weight: ['100', '400', '700', '800'],
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
