import type { Metadata } from 'next';
import {
  Geist,
  Geist_Mono,
  Hanken_Grotesk,
  Syne,
  Plus_Jakarta_Sans,
  Instrument_Serif,
  JetBrains_Mono,
} from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { IntroAnimation } from '@/components/layout/IntroAnimation';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { PerimeterMargins } from '@/components/layout/PerimeterMargins';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { NoiseOverlay } from '@/components/ui/NoiseOverlay';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const hankenGrotesk = Hanken_Grotesk({
  variable: '--font-hanken',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
});

const syneDisplay = Syne({
  variable: '--font-syne',
  subsets: ['latin'],
  weight: ['700', '800'],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  weight: ['700', '800'],
});

const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

const themeInitScript = `
(function() {
  try {
    var saved = localStorage.getItem('zyrvae_theme');
    var systemLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    var theme = (saved === 'light' || saved === 'dark')
      ? saved
      : (systemLight ? 'light' : 'light');
    var root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    root.setAttribute('data-theme', theme);
    root.style.colorScheme = theme;
  } catch (e) {
    document.documentElement.classList.add('light');
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
`;

export const metadata: Metadata = {
  title: 'ZYRVAE — Digital Studio | An avant-garde independent digital studio',
  description:
    'An avant-garde independent digital studio based in Buenos Aires, Argentina. Swiss corporate brutalism, web architecture, interactive systems, and CGI.',
  keywords: [
    'ZYRVAE',
    'Digital Studio',
    'Swiss Brutalism',
    'Diseño web',
    'Desarrollo web',
    'Web design',
    'Web development',
    'Next.js',
    'TypeScript',
    'Buenos Aires',
    'Avant-garde digital studio',
    'Independent studio',
  ],
  authors: [{ name: 'ZYRVAE Digital Studio' }],
  creator: 'ZYRVAE',
  metadataBase: new URL('https://zyrvae.com'),
  alternates: {
    canonical: '/',
    languages: {
      'es-AR': '/',
      'en-US': '/',
    },
  },
  openGraph: {
    title: 'ZYRVAE — Digital Studio | Buenos Aires, Argentina',
    description:
      'An avant-garde independent digital studio based in Buenos Aires, Argentina.',
    url: 'https://zyrvae.com',
    siteName: 'ZYRVAE Digital Studio',
    images: [
      {
        url: '/images/aura-cover.webp',
        width: 1280,
        height: 800,
        alt: 'ZYRVAE Digital Studio',
      },
    ],
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZYRVAE — Digital Studio',
    description:
      'An avant-garde independent digital studio based in Buenos Aires, Argentina.',
    images: ['/images/aura-cover.webp'],
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
    ],
    apple: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`light ${hankenGrotesk.variable} ${geistSans.variable} ${geistMono.variable} ${syneDisplay.variable} ${plusJakarta.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-zy-bg text-zy-fg font-sans selection:bg-[#FF3B30]/20 selection:text-zy-fg rounded-none">
        <ThemeProvider>
          <LanguageProvider>
            <SmoothScroll />
            <NoiseOverlay />
            <IntroAnimation />
            <CustomCursor />
            <PerimeterMargins />
            <Header />
            <main id="main-content" className="flex-grow px-[28px] sm:px-[40px]">
              {children}
            </main>
            <div className="px-[28px] sm:px-[40px]">
              <Footer />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
