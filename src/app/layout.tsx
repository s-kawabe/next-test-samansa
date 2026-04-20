import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono, Zen_Kaku_Gothic_New } from 'next/font/google';
import { Providers } from '@/providers';
import { TopBar } from '@/components/features/navigation/TopBar';
import { Footer } from '@/components/features/navigation/Footer';
import '@/styles/globals.css';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
});

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  variable: '--font-zen-kaku',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
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
    <html
      lang="ja"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${zenKakuGothicNew.variable}`}
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
