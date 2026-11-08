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
    if (!reduced && typeof window !== 'undefined' && window.__zyrvaeLenis) {
      window.__zyrvaeLenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    }
  };

  return (
    <footer
      className="relative bg-zy-bg text-zy-fg border-t border-zy-border-subtle pt-16 sm:pt-24 pb-8 sm:pb-12 px-5 sm:px-8 lg:px-12 max-w-[1720px] mx-auto min-h-[90svh] sm:min-h-[96svh] flex flex-col justify-between select-none overflow-hidden"
      aria-label="ZYRVAE Footer — Columns above, Wordmark below"
    >
      {/* Top Row: Four Columns on 12-Column Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 pb-12 border-b border-zy-border-subtle">
        {/* Col 1: Studio Identity (cols 1-4) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center space-x-3">
            <SymbolLogo size={28} showPlate={false} showBlueprint={true} />
            <span className="font-sans font-medium text-lg tracking-[0.16em] text-zy-fg">
              ZYRVAE
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zy-muted font-sans max-w-sm leading-relaxed">
            {t.footer.description}
          </p>
          <div className="text-xs text-zy-dim pt-1 inline-flex items-center space-x-1.5">
            <span className="font-swiss tracking-wide">Buenos Aires</span>
            <span className="font-mono text-[11px]">[34°36′S 58°22′W]</span>
            <span>·</span>
            <span className="font-swiss tracking-wide">
              {language === 'es' ? 'Alcance global' : 'Global practice'}
            </span>
          </div>
        </div>

        {/* Col 2: Navigation (cols 5-6) */}
        <div className="lg:col-span-2 space-y-3">
          <span className="font-swiss text-xs font-medium tracking-wide text-zy-dim block">
            {language === 'es' ? 'Navegación' : 'Navigation'}
          </span>
          <ul className="space-y-2 text-xs font-swiss tracking-wide text-zy-muted">
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
          <span className="font-swiss text-xs font-medium tracking-wide text-zy-dim block">
            {language === 'es' ? 'Casos interactivos' : 'Case studies'}
          </span>
          <ul className="space-y-2 text-xs text-zy-muted">
            <li>
              <Link
                href="/case-study/aura-sanctuary"
                className="inline-flex items-center space-x-1.5 hover:text-zy-blue transition-colors"
              >
                <span className="font-mono text-[11px] text-zy-blue">01</span>
                <span className="font-swiss tracking-wide">AURA Sanctuary</span>
                <ArrowUpRight size={11} className="text-zy-blue" />
              </Link>
            </li>
            <li>
              <Link
                href="/case-study/kon-atelier"
                className="inline-flex items-center space-x-1.5 hover:text-zy-blue transition-colors"
              >
                <span className="font-mono text-[11px] text-zy-blue">02</span>
                <span className="font-swiss tracking-wide">KÔN Atelier</span>
                <ArrowUpRight size={11} className="text-zy-blue" />
              </Link>
            </li>
            <li>
              <Link
                href="/case-study/vectra-architects"
                className="inline-flex items-center space-x-1.5 hover:text-zy-blue transition-colors"
              >
                <span className="font-mono text-[11px] text-zy-blue">03</span>
                <span className="font-swiss tracking-wide">MONOLITH Studio</span>
                <ArrowUpRight size={11} className="text-zy-blue" />
              </Link>
            </li>
            <li>
              <Link
                href="/case-study/soma-formulations"
                className="inline-flex items-center space-x-1.5 hover:text-zy-blue transition-colors"
              >
                <span className="font-mono text-[11px] text-zy-blue">04</span>
                <span className="font-swiss tracking-wide">SŌMA Formulations</span>
                <ArrowUpRight size={11} className="text-zy-blue" />
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Preferences & Contact (cols 10-12) */}
        <div className="lg:col-span-3 space-y-4">
          <span className="font-swiss text-xs font-medium tracking-wide text-zy-dim block">
            {language === 'es' ? 'Preferencias y contacto' : 'Preferences & contact'}
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle showLabels={true} />
          </div>

          <div className="pt-1 space-y-1">
            <span className="text-xs font-swiss tracking-wide text-zy-dim block">
              {t.footer.directContact}
            </span>
            <a
              href="mailto:zyrvae.co@gmail.com"
              className="inline-flex items-center space-x-1.5 text-xs font-swiss tracking-wide text-zy-fg hover:text-zy-blue transition-colors"
            >
              <Mail size={12} className="text-zy-blue" />
              <span>zyrvae.co@gmail.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Middle Row: Generous Architectural Emptiness */}
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
        <div className="pt-3 border-t border-zy-border-subtle flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zy-dim">
          <p className="font-swiss tracking-wide">
            © <span className="font-mono">{currentYear}</span> ZYRVAE Digital Studio. {t.footer.rights}
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="group min-h-[44px] inline-flex items-center space-x-1.5 font-swiss tracking-wide text-zy-muted hover:text-zy-fg transition-colors py-2 px-3.5 rounded-full hover:bg-zy-surface border border-transparent hover:border-zy-border"
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp
              size={12}
              className="text-zy-blue transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-0.5"
            />
          </button>
        </div>
      </div>
    </footer>
  );
};
