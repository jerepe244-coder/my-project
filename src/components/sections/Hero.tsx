'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import { SymbolLogo } from '@/components/ui/SymbolLogo';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].hero;
  const prefersReducedMotion = useReducedMotion();

  const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

  const demoShortcuts = [
    { label: '01 / AURA', slug: 'aura-sanctuary', domain: language === 'es' ? 'Hospitalidad' : 'Hospitality' },
    { label: '02 / KÔN', slug: 'kon-atelier', domain: language === 'es' ? 'Gastronomía' : 'Gastronomy' },
    { label: '03 / MONOLITH', slug: 'vectra-architects', domain: language === 'es' ? 'Arquitectura' : 'Architecture' },
    { label: '04 / SŌMA', slug: 'soma-formulations', domain: 'Commerce' },
  ];

  return (
    <section
      className="relative min-h-[96svh] sm:min-h-[100svh] w-full flex flex-col justify-between pt-24 sm:pt-28 pb-8 sm:pb-12 px-5 sm:px-8 lg:px-12 max-w-[1720px] mx-auto select-none"
      aria-label="ZYRVAE Hero — The Name as a Monument"
    >
      {/* Top Architectural Metadata & Direct Concept Navigation */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeOutExpo }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zy-border-subtle font-mono text-[11px] uppercase tracking-wider text-zy-muted"
      >
        {/* Monogram Specimen + Studio Datum */}
        <div className="flex items-center space-x-3.5">
          <SymbolLogo size={32} animate={true} showPlate={false} showBlueprint={true} />
          <div className="flex items-center space-x-2.5">
            <span className="text-zy-fg font-semibold tracking-widest">ZYRVAE</span>
            <span className="text-zy-border-strong">/</span>
            <span className="text-zy-dim hidden sm:inline">BUENOS AIRES [34°36′S 58°22′W]</span>
            <span className="text-zy-border-strong hidden sm:inline">/</span>
            <span className="text-zy-blue font-medium">{t.badge}</span>
          </div>
        </div>

        {/* 4 Case Studies Index + Availability Action */}
        <div className="flex items-center flex-wrap gap-2 sm:gap-3 text-zy-dim">
          <nav
            aria-label="Concept demo shortcuts"
            className="hidden md:flex items-center space-x-1.5 bg-zy-surface/60 border border-zy-border-subtle rounded-full px-2 py-1"
          >
            {demoShortcuts.map((demo) => (
              <Link
                key={demo.slug}
                href={`/case-study/${demo.slug}`}
                className="px-2.5 py-0.5 rounded-full hover:bg-zy-card hover:text-zy-fg text-zy-muted text-[10px] tracking-widest transition-colors inline-flex items-center space-x-1"
              >
                <span>{demo.label}</span>
                <ArrowUpRight size={10} className="text-zy-blue opacity-75" />
              </Link>
            ))}
          </nav>

          <Link
            href="/#contact"
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-zy-surface border border-zy-border hover:border-zy-blue/60 text-zy-fg-secondary hover:text-zy-fg transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-zy-blue animate-pulse" />
            <span className="text-[10px] tracking-widest uppercase">
              {language === 'es' ? 'DISPONIBLE // Q2-Q3' : 'AVAILABLE // Q2-Q3'}
            </span>
          </Link>
        </div>
      </motion.div>

      {/* Monumental Stacked Headline: "ZYR" / "VAE." */}
      <div className="my-auto py-8 sm:py-12 lg:py-16">
        <h1
          className="font-monument font-medium text-left tracking-[-0.055em] leading-[0.82] select-none text-balance"
          aria-label="ZYRVAE — Digital Studio"
        >
          {/* Line 1: Light Ink (White in dark, jet in light) */}
          <div className="overflow-hidden block">
            <motion.span
              initial={prefersReducedMotion ? false : { y: '102%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.9, ease: easeOutExpo }}
              className="block text-[23vw] sm:text-[18vw] lg:text-[16.5vw] xl:text-[210px] text-zy-fg font-medium tracking-[-0.06em]"
            >
              ZYR
            </motion.span>
          </div>

          {/* Line 2: Dark Ink / Secondary Graphite Tone with Electric Blue Period */}
          <div className="overflow-hidden block -mt-[1.5vw] sm:-mt-[2vw]">
            <motion.span
              initial={prefersReducedMotion ? false : { y: '102%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.9, delay: 0.11, ease: easeOutExpo }}
              className="block text-[23vw] sm:text-[18vw] lg:text-[16.5vw] xl:text-[210px] text-zy-dim font-medium tracking-[-0.06em]"
            >
              VAE<span className="text-zy-blue">.</span>
            </motion.span>
          </div>
        </h1>
      </div>

      {/* Bottom Grid: Supporting Sentence in Columns 9-12 & Strategic Anchors */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35, ease: easeOutExpo }}
        className="pt-6 border-t border-zy-border-subtle grid grid-cols-1 md:grid-cols-12 gap-6 items-end"
      >
        {/* Left / Bottom-Left: Technical Datum & Specimen Details */}
        <div className="md:col-span-6 lg:col-span-7 space-y-3">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-zy-dim uppercase tracking-wider">
            <span className="text-zy-blue font-semibold">00 // EDITORIAL PROPOSITION</span>
            <span>·</span>
            <span className="text-zy-muted">
              {language === 'es'
                ? 'DIRECCIÓN DE ARTE & INGENIERÍA FRONTEND'
                : 'ART DIRECTION & FRONTEND ENGINEERING'}
            </span>
          </div>

          <div className="hidden sm:flex items-center space-x-6 pt-1 font-mono text-[11px] text-zy-dim">
            <Link
              href="/#work"
              className="inline-flex items-center space-x-2 text-zy-fg-secondary hover:text-zy-blue transition-colors group"
            >
              <span>{t.scrollPrompt}</span>
              <ArrowDown size={13} className="text-zy-blue transition-transform group-hover:translate-y-0.5" />
            </Link>

            <span className="text-zy-border-strong">/</span>

            <span>BUENOS AIRES // GLOBAL</span>

            <span className="text-zy-border-strong">/</span>

            <span>NEXT.JS · TYPESCRIPT</span>
          </div>
        </div>

        {/* Right / Columns 8-12: Supporting Sentence & Primary Action */}
        <div className="md:col-span-6 lg:col-span-5 md:text-right space-y-4">
          <p className="text-base sm:text-lg text-zy-fg-secondary font-sans leading-snug md:ml-auto max-w-[34ch] font-normal">
            {t.subhead}
          </p>

          <div className="flex flex-wrap items-center md:justify-end gap-4 pt-1">
            <Link
              href="/#contact"
              className="inline-flex items-center space-x-1.5 text-xs font-mono uppercase tracking-wider text-zy-fg hover:text-zy-blue underline underline-offset-8 decoration-zy-blue/60 transition-colors"
            >
              <span>{t.ctaPrimary}</span>
              <ArrowUpRight size={13} className="text-zy-blue" />
            </Link>

            <span className="text-zy-border-strong">·</span>

            <Link
              href="/#work"
              className="text-xs font-mono uppercase tracking-wider text-zy-dim hover:text-zy-fg transition-colors"
            >
              {t.ctaSecondary}
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
