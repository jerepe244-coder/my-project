'use client';

import React from 'react';
import Link from 'next/link';
import { SymbolLogo } from '@/components/ui/SymbolLogo';
import { Wordmark } from '@/components/ui/Wordmark';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import { ArrowUp, ArrowUpRight, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const currentYear = 2025;

  const scrollToTop = () => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <footer className="relative bg-zy-bg border-t border-zy-border-subtle pt-14 sm:pt-20 pb-10 sm:pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Closing Statement / Banner */}
        <div className="pb-12 sm:pb-16 border-b border-zy-border-subtle">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-widest text-zy-blue font-semibold">
                // {t.closing.ctaTitle}
              </span>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-bold tracking-tight text-zy-fg mt-3 text-balance">
                {t.closing.ctaAction}
              </h2>
              <p className="text-sm sm:text-base text-zy-muted mt-3 sm:mt-4 font-sans max-w-xl leading-relaxed">
                {t.closing.copy}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5">
              <Link
                href="/#contact"
                className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-zy-blue hover:bg-zy-blue-hover active:scale-[0.98] text-white text-xs sm:text-sm font-mono tracking-wider transition-all outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-zy-bg focus-visible:ring-zy-blue"
              >
                <span>{t.closing.button}</span>
              </Link>

              <a
                href="mailto:zyrvae.co@gmail.com"
                className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-xl bg-zy-card hover:bg-zy-surface-hover active:scale-[0.98] border border-zy-border text-zy-fg-secondary hover:text-zy-fg text-xs sm:text-sm font-mono transition-all outline-none focus-visible:ring-1 focus-visible:ring-zy-blue"
              >
                <Mail size={15} className="text-zy-blue" />
                <span>zyrvae.co@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Middle Information Bar */}
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 border-b border-zy-border-subtle">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <SymbolLogo size={28} />
              <Wordmark showDescriptor={true} />
            </div>
            <p className="text-xs text-zy-muted max-w-sm leading-relaxed">
              {t.footer.description}
            </p>
            <div className="font-mono text-[10px] text-zy-dim uppercase tracking-widest pt-1">
              BUENOS AIRES [34°36′S 58°22′W] // GLOBAL
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-2">
            <h3 className="font-mono text-xs uppercase tracking-widest text-zy-dim mb-4">
              // {language === 'es' ? 'Navegación' : 'Navigation'}
            </h3>
            <ul className="space-y-2.5 text-xs font-sans text-zy-muted">
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

          {/* Concept Demos Index */}
          <div className="lg:col-span-3">
            <h3 className="font-mono text-xs uppercase tracking-widest text-zy-dim mb-4">
              // {language === 'es' ? 'Demos Interactivas' : 'Interactive Demos'}
            </h3>
            <ul className="space-y-2.5 text-xs font-sans text-zy-muted">
              <li>
                <Link
                  href="/case-study/aura-sanctuary"
                  className="inline-flex items-center space-x-1 hover:text-zy-blue transition-colors"
                >
                  <span>01. AURA Sanctuary</span>
                  <ArrowUpRight size={12} />
                </Link>
              </li>
              <li>
                <Link
                  href="/case-study/kon-atelier"
                  className="inline-flex items-center space-x-1 hover:text-zy-blue transition-colors"
                >
                  <span>02. KÔN Atelier</span>
                  <ArrowUpRight size={12} />
                </Link>
              </li>
              <li>
                <Link
                  href="/case-study/vectra-architects"
                  className="inline-flex items-center space-x-1 hover:text-zy-blue transition-colors"
                >
                  <span>03. MONOLITH Studio</span>
                  <ArrowUpRight size={12} />
                </Link>
              </li>
              <li>
                <Link
                  href="/case-study/soma-formulations"
                  className="inline-flex items-center space-x-1 hover:text-zy-blue transition-colors"
                >
                  <span>04. SŌMA Formulations</span>
                  <ArrowUpRight size={12} />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Language & Theme */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-widest text-zy-dim">
              // {language === 'es' ? 'Preferencias' : 'Preferences'}
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
            className="inline-flex items-center space-x-1.5 text-zy-muted hover:text-zy-fg transition-colors py-1.5 px-3 rounded-lg hover:bg-zy-control border border-transparent hover:border-zy-border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zy-blue"
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
};
