'use client';

import React from 'react';
import Link from 'next/link';
import { SymbolLogo } from '@/components/ui/SymbolLogo';
import { Wordmark } from '@/components/ui/Wordmark';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import { ArrowUp, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [currentYear, setCurrentYear] = React.useState(2025);

  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-zy-bg border-t border-zy-border-subtle pt-20 pb-12 overflow-hidden">
      {/* Subtle blue gradient accent at bottom */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[150px] bg-zy-blue/5 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Closing Statement / Banner */}
        <div className="pb-16 border-b border-zy-border-subtle">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-widest text-zy-blue">
                // {t.closing.ctaTitle}
              </span>
              <h2 className="text-4xl sm:text-6xl font-sans font-bold tracking-tight text-zy-fg mt-3">
                {t.closing.ctaAction}
              </h2>
              <p className="text-sm sm:text-base text-zy-muted mt-4 font-sans max-w-xl">
                {t.closing.copy}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                href="/#contact"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg bg-zy-blue hover:bg-zy-blue-hover text-white text-xs sm:text-sm font-mono tracking-wider transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-zy-bg focus-visible:ring-zy-blue"
              >
                <span>{t.closing.button}</span>
              </Link>

              <a
                href="mailto:zyrvae.co@gmail.com"
                className="inline-flex items-center space-x-2 px-5 py-3 rounded-lg bg-zy-card hover:bg-zy-surface-hover border border-zy-border text-zy-fg-secondary hover:text-zy-fg text-xs sm:text-sm font-mono transition-colors outline-none focus-visible:ring-1 focus-visible:ring-zy-blue"
              >
                <Mail size={15} className="text-zy-blue" />
                <span>zyrvae.co@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Middle Information Bar */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-zy-border-subtle">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <SymbolLogo size={28} />
              <Wordmark showDescriptor={true} />
            </div>
            <p className="text-xs text-zy-muted max-w-sm leading-relaxed">
              {t.footer.description}
            </p>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-zy-dim mb-4">
              // Navigation
            </h3>
            <ul className="space-y-2 text-xs font-sans text-zy-muted">
              <li>
                <Link href="/#work" className="hover:text-zy-fg transition-colors">
                  {t.nav.work}
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-zy-fg transition-colors">
                  {t.nav.services}
                </Link>
              </li>
              <li>
                <Link href="/#process" className="hover:text-zy-fg transition-colors">
                  {t.nav.process}
                </Link>
              </li>
              <li>
                <Link href="/#studio" className="hover:text-zy-fg transition-colors">
                  {t.nav.studio}
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-zy-fg transition-colors">
                  {t.nav.faq}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Language & Theme */}
          <div className="space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-widest text-zy-dim">
              // Preferences
            </h3>
            <div className="flex flex-wrap items-center gap-2">
              <LanguageSwitcher />
              <ThemeToggle showLabels={true} />
            </div>

            <div className="pt-2">
              <p className="text-[11px] font-mono text-zy-dim uppercase">
                {t.footer.directContact}
              </p>
              <a
                href="mailto:zyrvae.co@gmail.com"
                className="text-xs font-mono text-zy-fg-secondary hover:text-zy-blue transition-colors"
              >
                zyrvae.co@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zy-dim font-mono gap-4">
          <p>© {currentYear} ZYRVAE DIGITAL STUDIO. {t.footer.rights}</p>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center space-x-1.5 text-zy-muted hover:text-zy-fg transition-colors py-1 px-2 rounded hover:bg-zy-control focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zy-blue"
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
};
