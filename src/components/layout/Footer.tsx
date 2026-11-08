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
  const currentYear = 2026;

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
      data-act="04-signature"
      className="relative w-full bg-zy-bg text-zy-fg border-b border-zy-grid-line monolith-hairline pt-10 sm:pt-12 pb-6 sm:pb-8 px-4 sm:px-8 lg:px-10 flex flex-col justify-between select-none overflow-hidden rounded-none"
      aria-label="Acto 4 — Firma Editorial y Colofón de ZYRVAE"
    >
      {/* Top Row: Four Architectural Columns on 12-Column Swiss Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 pb-8 border-b border-zy-grid-line monolith-hairline">
        {/* Col 1: Studio Identity (cols 1-4) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center space-x-3">
            <SymbolLogo size={24} showPlate={false} showBlueprint={true} />
            <span className="font-sans font-semibold text-base tracking-[0.16em] text-zy-fg">
              ZYRVAE
            </span>
          </div>
          <p className="font-editorial-micro text-[10px] font-medium tracking-[0.015em] normal-case text-zy-muted max-w-sm leading-[1.6]">
            {t.footer.description}
          </p>
          <div className="font-editorial-micro text-[10px] font-medium tracking-[0.015em] normal-case text-[#94A3B8] pt-0.5 inline-flex items-center space-x-1.5">
            <span className="text-zy-fg">Buenos Aires</span>
            <span>[34°36′S 58°22′W]</span>
            <span>·</span>
            <span>{language === 'es' ? 'Práctica de autor global' : 'Global authorial practice'}</span>
          </div>
        </div>

        {/* Col 2: 4-Act Navigation (cols 5-6) — FAQ removed per Fase 2 */}
        <div className="lg:col-span-2 space-y-2.5">
          <span className="font-editorial-micro text-[10px] font-medium tracking-[0.015em] normal-case text-[#94A3B8] block">
            {language === 'es' ? 'Estructura (4 Actos)' : 'Structure (4 Acts)'}
          </span>
          <ul className="space-y-1.5 font-editorial-micro text-[10px] font-medium tracking-[0.015em] normal-case text-zy-muted">
            <li>
              <Link href="/#hero" className="hover:text-zy-fg transition-colors">
                01. Hero Monumental
              </Link>
            </li>
            <li>
              <Link href="/#work" className="hover:text-zy-fg transition-colors">
                02. {t.nav.work}
              </Link>
            </li>
            <li>
              <Link href="/#services" className="hover:text-zy-fg transition-colors">
                03. {language === 'es' ? 'Capacidades & Filosofía' : 'Capabilities & Ethos'}
              </Link>
            </li>
            <li>
              <Link href="/#contact" className="hover:text-zy-fg transition-colors">
                04. {language === 'es' ? 'Contacto Directo' : 'Direct Contact'}
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Case Studies & Technical Prototypes (cols 7-9) */}
        <div className="lg:col-span-3 space-y-2.5">
          <span className="font-editorial-micro text-[10px] font-medium tracking-[0.015em] normal-case text-[#94A3B8] block">
            {language === 'es'
              ? 'Laboratorio Técnico & Casos [01—04]'
              : 'Technical Lab & Case Studies [01—04]'}
          </span>
          <ul className="space-y-1.5 font-editorial-micro text-[10px] font-medium tracking-[0.015em] normal-case text-zy-muted">
            <li>
              <Link
                href="/case-study/aura-sanctuary"
                className="inline-flex items-center space-x-1.5 hover:text-zy-fg transition-colors"
              >
                <span className="text-[#FF3B30]">01</span>
                <span>AURA Sanctuary</span>
                <ArrowUpRight size={10} className="text-[#FF3B30]" />
              </Link>
            </li>
            <li>
              <Link
                href="/case-study/kon-atelier"
                className="inline-flex items-center space-x-1.5 hover:text-zy-fg transition-colors"
              >
                <span className="text-[#FF3B30]">02</span>
                <span>KÔN Atelier</span>
                <ArrowUpRight size={10} className="text-[#FF3B30]" />
              </Link>
            </li>
            <li>
              <Link
                href="/case-study/vectra-architects"
                className="inline-flex items-center space-x-1.5 hover:text-zy-fg transition-colors"
              >
                <span className="text-[#FF3B30]">03</span>
                <span>MONOLITH Studio</span>
                <ArrowUpRight size={10} className="text-[#FF3B30]" />
              </Link>
            </li>
            <li>
              <Link
                href="/case-study/soma-formulations"
                className="inline-flex items-center space-x-1.5 hover:text-zy-fg transition-colors"
              >
                <span className="text-[#FF3B30]">04</span>
                <span>SŌMA Formulations</span>
                <ArrowUpRight size={10} className="text-[#FF3B30]" />
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: System Preferences & Direct Inbox (cols 10-12) */}
        <div className="lg:col-span-3 space-y-3">
          <span className="font-editorial-micro text-[10px] font-medium tracking-[0.015em] normal-case text-[#94A3B8] block">
            {language === 'es' ? 'Preferencias y firma' : 'Preferences & colophon'}
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle showLabels={true} />
          </div>

          <div className="pt-1 space-y-0.5 font-editorial-micro text-[10px] font-medium tracking-[0.015em] normal-case">
            <span className="text-zy-muted block">{t.footer.directContact}</span>
            <a
              href="mailto:zyrvae.co@gmail.com"
              className="inline-flex items-center space-x-1.5 text-zy-fg hover:text-[#FF3B30] transition-colors"
            >
              <Mail size={11} className="text-[#FF3B30]" />
              <span>zyrvae.co@gmail.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Row: Firma Editorial Monumental a Sangre + Colofón Legal */}
      <div className="pt-6 space-y-4">
        <div className="w-full overflow-hidden select-none text-zy-fg">
          <svg
            viewBox="0 0 1000 152"
            className="w-full h-auto max-h-[19vw] block text-zy-fg"
            preserveAspectRatio="xMidYMid meet"
            aria-label="ZYRVAE Editorial Signature Monument"
          >
            <text
              x="500"
              y="134"
              textAnchor="middle"
              fill="currentColor"
              className="font-monument"
              style={{
                fontWeight: 900,
                fontSize: '182px',
                letterSpacing: '-0.04em',
              }}
            >
              ZYRVAE
            </text>
          </svg>
        </div>

        {/* Legal Text & Back to Top Strip */}
        <div className="pt-3 border-t border-zy-grid-line monolith-hairline flex flex-col sm:flex-row items-center justify-between gap-3 font-editorial-micro text-[10px] font-medium tracking-[0.015em] normal-case text-zy-muted">
          <p>
            © {currentYear} ZYRVAE Digital Studio · Buenos Aires, Argentina. {t.footer.rights}
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="group min-h-[44px] -my-2 inline-flex items-center space-x-1.5 text-zy-fg hover:text-[#FF3B30] transition-colors px-2"
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp
              size={11}
              className="text-[#FF3B30] transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-0.5"
            />
          </button>
        </div>
      </div>
    </footer>
  );
};
