import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { IntroAnimation } from '@/components/layout/IntroAnimation';
import { CustomCursor } from '@/components/ui/CustomCursor';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const themeInitScript = `
(function() {
  try {
    var saved = localStorage.getItem('zyrvae_theme');
    var theme = (saved === 'light' || saved === 'dark')
      ? saved
      : (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    var root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    root.setAttribute('data-theme', theme);
    root.style.colorScheme = theme;
  } catch (e) {
    document.documentElement.classList.add('dark');
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`;

export const metadata: Metadata = {
  title: 'ZYRVAE — Digital Studio | Diseño y Desarrollo Web',
  description:
    'Estudio digital independiente orientado al diseño y desarrollo web para marcas que buscan diferenciarse, comunicar mejor su propuesta de valor y generar oportunidades comerciales.',
  keywords: [
    'ZYRVAE',
    'Digital Studio',
    'Diseño web',
    'Desarrollo web',
    'Web design',
    'Web development',
    'Next.js',
    'TypeScript',
    'Buenos Aires',
    'Boutique agency',
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
    title: 'ZYRVAE — Digital Studio | Digital, with intention.',
    description:
      'We design and build distinctive websites that help ambitious businesses communicate their value and move forward.',
    url: 'https://zyrvae.com',
    siteName: 'ZYRVAE Digital Studio',
    images: [
      {
        url: '/images/aura-cover.svg',
        width: 1200,
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
      'Estudio digital independiente. Diseño y desarrollo web con criterio y rigor técnico.',
    images: ['/images/aura-cover.svg'],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-zy-bg text-zy-fg-soft font-sans selection:bg-zy-blue/30 selection:text-zy-fg">
        <ThemeProvider>
          <LanguageProvider>
            <IntroAnimation />
            <CustomCursor />
            <Header />
            <main id="main-content" className="flex-grow">
              {children}
            </main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
