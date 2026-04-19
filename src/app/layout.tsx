import type { Metadata } from 'next';
import { Geist_Mono, Playfair_Display } from 'next/font/google';
import { Providers } from '@/providers';
import '@/styles/globals.css';

const playfairDisplay = Playfair_Display({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '700', '900'],
});

const geistMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'samansa',
  description: '厳選された短編映画をカテゴリ別に楽しめる映画情報サービス',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" data-theme="dark" className={`${playfairDisplay.variable} ${geistMono.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
