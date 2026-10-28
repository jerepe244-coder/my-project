'use client';

import React from 'react';
import Link from 'next/link';
import { SymbolLogo } from '@/components/ui/SymbolLogo';
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
    <footer
      className="relative bg-zy-bg text-zy-fg border-t border-zy-border-subtle pt-16 sm:pt-24 pb-8 sm:pb-12 px-5 sm:px-8 lg:px-12 max-w-[1720px] mx-auto min-h-[90svh] sm:min-h-[96svh] flex flex-col justify-between select-none overflow-hidden"
      aria-label="ZYRVAE Footer — Columns above, Wordmark below"
    >
      {/* Top Row: Four Columns on 12-Column Grid (Taste: footer-columns-then-wordmark) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 pb-12 border-b border-zy-border-subtle">
        {/* Col 1: Studio Identity (cols 1-4) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center space-x-3">
            <SymbolLogo size={28} showPlate={false} showBlueprint={true} />
            <span className="font-sans font-medium text-lg tracking-[0.18em] text-zy-fg">
              ZYRVAE
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zy-muted font-sans max-w-sm leading-relaxed">
            {t.footer.description}
          </p>
          <div className="font-mono text-[11px] text-zy-dim uppercase tracking-widest pt-1">
            BUENOS AIRES [34°36′S 58°22′W] // GLOBAL
          </div>
        </div>

        {/* Col 2: Navigation (cols 5-6) */}
        <div className="lg:col-span-2 space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-zy-dim block">
            // {language === 'es' ? 'Navegación' : 'Navigation'}
          </span>
          <ul className="space-y-2 text-xs font-mono text-zy-muted">
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
            <li>
              <Link href="/#contact" className="hover:text-zy-fg transition-colors">
                {language === 'es' ? 'Contacto' : 'Contact'}
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Concept Demos Index (cols 7-9) */}
        <div className="lg:col-span-3 space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-zy-dim block">
            // {language === 'es' ? 'Casos Interactivos' : 'Case Studies'}
          </span>
          <ul className="space-y-2 text-xs font-mono text-zy-muted">
            <li>
              <Link
                href="/case-study/aura-sanctuary"
                className="inline-flex items-center space-x-1.5 hover:text-zy-blue transition-colors"
              >
                <span>01. AURA Sanctuary</span>
                <ArrowUpRight size={11} className="text-zy-blue" />
              </Link>
            </li>
            <li>
              <Link
                href="/case-study/kon-atelier"
                className="inline-flex items-center space-x-1.5 hover:text-zy-blue transition-colors"
              >
                <span>02. KÔN Atelier</span>
                <ArrowUpRight size={11} className="text-zy-blue" />
              </Link>
            </li>
            <li>
              <Link
                href="/case-study/vectra-architects"
                className="inline-flex items-center space-x-1.5 hover:text-zy-blue transition-colors"
              >
                <span>03. MONOLITH Studio</span>
                <ArrowUpRight size={11} className="text-zy-blue" />
              </Link>
            </li>
            <li>
              <Link
                href="/case-study/soma-formulations"
                className="inline-flex items-center space-x-1.5 hover:text-zy-blue transition-colors"
              >
                <span>04. SŌMA Formulations</span>
                <ArrowUpRight size={11} className="text-zy-blue" />
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Preferences & Contact (cols 10-12) */}
        <div className="lg:col-span-3 space-y-4">
          <span className="font-mono text-xs uppercase tracking-widest text-zy-dim block">
            // {language === 'es' ? 'Preferencias & Contacto' : 'Preferences & Contact'}
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle showLabels={true} />
          </div>

          <div className="pt-1 space-y-1">
            <span className="text-[11px] font-mono text-zy-dim uppercase block">
              {t.footer.directContact}
            </span>
            <a
              href="mailto:zyrvae.co@gmail.com"
              className="inline-flex items-center space-x-1.5 text-xs font-mono text-zy-fg hover:text-zy-blue transition-colors"
            >
              <Mail size={12} className="text-zy-blue" />
              <span>zyrvae.co@gmail.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Middle Row: Generous Architectural Emptiness (Taste: "Middle row: empty") */}
      <div className="my-auto py-12 sm:py-16" aria-hidden="true" />

      {/* Bottom Row: Monumental Full-Width Wordmark + Legal Bar */}
      <div className="space-y-4">
        {/* Full-bleed inline SVG Wordmark scaled from margin to margin */}
        <div className="w-full overflow-hidden select-none text-zy-fg">
          <svg
            viewBox="0 0 1000 160"
            className="w-full h-auto max-h-[22vw] block text-zy-fg"
            preserveAspectRatio="xMidYMid meet"
            aria-label="ZYRVAE Wordmark Monument"
          >
            <text
              x="500"
              y="138"
              textAnchor="middle"
              fill="currentColor"
              className="font-monument"
              style={{
                fontFamily: "'Hanken Grotesk', var(--font-geist-sans), sans-serif",
                fontWeight: 600,
                fontSize: '185px',
                letterSpacing: '-0.065em',
              }}
            >
              ZYRVAE
            </text>
          </svg>
        </div>

        {/* Legal Text & Back to Top Strip */}
        <div className="pt-3 border-t border-zy-border-subtle flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-zy-dim">
          <p>© {currentYear} ZYRVAE DIGITAL STUDIO. {t.footer.rights}</p>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center space-x-1.5 text-zy-muted hover:text-zy-fg transition-colors py-1 px-2.5 rounded-sm hover:bg-zy-surface border border-transparent hover:border-zy-border"
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
};
