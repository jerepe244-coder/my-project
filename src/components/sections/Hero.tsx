'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import { SymbolLogo } from '@/components/ui/SymbolLogo';
import { Magnetic } from '@/components/ui/Magnetic';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].hero;
  const prefersReducedMotion = useReducedMotion();

  const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

  const demoShortcuts = [
    {
      index: '01',
      name: 'Aura',
      slug: 'aura-sanctuary',
      idCode: 'AURA-SANCTUARY',
      domain: language === 'es' ? 'Hospitalidad' : 'Hospitality',
    },
    {
      index: '02',
      name: 'Kôn',
      slug: 'kon-atelier',
      idCode: 'KON-ATELIER',
      domain: language === 'es' ? 'Gastronomía' : 'Gastronomy',
    },
    {
      index: '03',
      name: 'Monolith',
      slug: 'vectra-architects',
      idCode: 'MONOLITH-STUDIO',
      domain: language === 'es' ? 'Arquitectura' : 'Architecture',
    },
    {
      index: '04',
      name: 'Sōma',
      slug: 'soma-formulations',
      idCode: 'SOMA-FORMULATIONS',
      domain: 'Commerce',
    },
  ];

  const cornerCoordinates = [
    {
      id: 'nw',
      position: 'NW // 01',
      label: 'Buenos Aires',
      coord: '[34°36′S 58°22′W]',
    },
    {
      id: 'ne',
      position: 'NE // 02',
      label: 'Next.js + TypeScript',
      coord: 'SYS.2025',
    },
    {
      id: 'sw',
      position: 'SW // 03',
      label: language === 'es' ? 'Retícula modular' : 'Modular grid',
      coord: '12-COL · 1PX',
    },
    {
      id: 'se',
      position: 'SE // 04',
      label: language === 'es' ? 'Práctica global' : 'Global practice',
      coord: 'UTC-3',
    },
  ];

  return (
    <section
      id="hero"
      style={{ paddingTop: '120px' }}
      className="relative min-h-[96svh] sm:min-h-[100svh] w-full flex flex-col justify-between pt-28 sm:pt-32 pb-8 sm:pb-12 px-5 sm:px-8 lg:px-12 max-w-[1720px] mx-auto select-none"
      aria-label="ZYRVAE Hero — Architectural Digital Studio"
    >
      {/* Top Architectural Bar: Corner Coordinates (NW / NE) + Direct Specimen Index */}
      <div className="space-y-4 pt-2 sm:pt-3">
        {/* Top Two Viewport Corner Micro-Labels (Technical Monospace for Coordinates, Swiss Sans for Place/Stack) */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: easeOutExpo }}
          className="flex items-center justify-between text-xs text-zy-muted pb-3 border-b border-neutral-800/80 dark:border-neutral-800"
        >
          <div className="inline-flex items-center space-x-2">
            <span className="font-mono text-[11px] text-zy-blue font-semibold">
              [{cornerCoordinates[0].position}]
            </span>
            <span className="font-swiss font-medium tracking-wide text-zy-fg">ZYRVAE</span>
            <span className="text-zy-border-strong">/</span>
            <span className="font-swiss tracking-wide text-zy-fg-secondary">
              {cornerCoordinates[0].label}
            </span>
            <span className="font-mono text-[11px] text-zy-muted">
              {cornerCoordinates[0].coord}
            </span>
          </div>

          <div className="hidden sm:inline-flex items-center space-x-2">
            <span className="font-mono text-[11px] text-zy-muted">
              {cornerCoordinates[1].coord}
            </span>
            <span className="text-zy-border-strong">·</span>
            <span className="font-swiss tracking-wide text-zy-fg-secondary">
              {cornerCoordinates[1].label}
            </span>
            <span className="font-mono text-[11px] text-zy-blue font-semibold">
              [{cornerCoordinates[1].position}]
            </span>
          </div>
        </motion.div>

        {/* Studio Datum + 4 Case Studies Index + Availability Pill */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.06, ease: easeOutExpo }}
          className="flex flex-wrap items-center justify-between gap-4 pt-1 text-xs text-zy-muted"
        >
          <div className="flex items-center space-x-3.5">
            <SymbolLogo size={32} animate={true} showPlate={false} showBlueprint={true} />
            <div className="flex items-center space-x-2.5 font-swiss tracking-wide">
              <span className="text-zy-blue font-medium">{t.badge}</span>
              <span className="text-zy-border-strong hidden md:inline">·</span>
              <span className="text-zy-muted hidden md:inline">
                {language === 'es'
                  ? 'Dirección de arte e ingeniería web'
                  : 'Art direction & web engineering'}
              </span>
            </div>
          </div>

          {/* 4 Case Studies Index + Availability Action */}
          <div className="flex items-center flex-wrap gap-2 sm:gap-3">
            <nav
              aria-label="Concept demo shortcuts"
              className="hidden lg:flex items-center space-x-1 bg-zy-surface/80 border border-zy-border rounded-full p-1"
            >
              {demoShortcuts.map((demo) => (
                <Link
                  key={demo.slug}
                  href={`/case-study/${demo.slug}`}
                  data-cursor="true"
                  data-cursor-text={language === 'es' ? 'EXPLORAR' : 'EXPLORE'}
                  className="group min-h-[34px] px-3 py-1 rounded-full hover:bg-zy-card hover:text-zy-fg text-zy-muted text-xs transition-colors inline-flex items-center space-x-1.5"
                >
                  <span className="font-mono text-[10px] text-zy-blue">{demo.index}</span>
                  <span className="font-swiss tracking-wide font-medium">{demo.name}</span>
                  <ArrowUpRight
                    size={11}
                    className="text-zy-blue transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              ))}
            </nav>

            <Link
              href="/#contact"
              className="group min-h-[38px] inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-zy-surface border border-zy-border hover:border-zy-blue/60 text-zy-fg-secondary hover:text-zy-fg transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-swiss text-xs tracking-wide font-medium">
                {language === 'es' ? 'Disponible' : 'Available'}
              </span>
              <span className="font-mono text-[11px] text-zy-muted">Q2–Q3</span>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Monumental Single-Line & Calculated Scale Headline (Zero Overlap) */}
      <div className="my-auto py-10 sm:py-14 lg:py-16">
        <div className="space-y-6 sm:space-y-8">
          <h1
            className="font-monument font-medium text-left tracking-[-0.04em] leading-[0.9] select-none"
            aria-label="ZYRVAE — Digital Studio"
          >
            {/* Primary Single-Line Monumental Wordmark without layer collision */}
            <span className="overflow-hidden block pb-2">
              <motion.span
                initial={prefersReducedMotion ? false : { y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.85, ease: easeOutExpo }}
                className="block text-[18.5vw] sm:text-[15.8vw] lg:text-[14.2vw] xl:text-[196px] font-medium tracking-[-0.04em] leading-[0.9]"
              >
                <span className="text-zy-fg">ZYR</span>
                <span className="text-zy-fg-secondary">VAE</span>
                <span className="text-zy-blue">.</span>
              </motion.span>
            </span>

            {/* Secondary Calculated Typographic Scale Line — Cleanly Separated */}
            <span className="overflow-hidden block pt-2 sm:pt-4">
              <motion.span
                initial={prefersReducedMotion ? false : { y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.85, delay: 0.1, ease: easeOutExpo }}
                className="block text-2xl sm:text-4xl lg:text-5xl font-sans font-normal tracking-[-0.025em] leading-[1.1] text-zy-muted"
              >
                <span className="text-zy-fg font-medium">{t.headlinePart1}</span>{' '}
                <span>{t.headlinePart2}</span>
              </motion.span>
            </span>
          </h1>
        </div>
      </div>

      {/* Bottom Grid: Supporting Sentence, Magnetic CTAs & SW/SE Corner Coordinates */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.22, ease: easeOutExpo }}
        className="space-y-6"
      >
        <div className="pt-6 border-t border-neutral-800/80 dark:border-neutral-800 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          {/* Left / Columns 1-6: Editorial Datum & Scroll Prompt */}
          <div className="md:col-span-6 lg:col-span-6 space-y-3">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs">
              <span className="font-mono text-[11px] text-zy-blue font-semibold">00 //</span>
              <span className="font-swiss font-medium tracking-wide text-zy-fg-secondary">
                {language === 'es' ? 'Propuesta editorial' : 'Editorial proposition'}
              </span>
              <span className="text-zy-border-strong">·</span>
              <span className="font-swiss tracking-wide text-zy-muted">
                {language === 'es'
                  ? 'Sistemas visuales y arquitectura frontend'
                  : 'Visual systems & frontend architecture'}
              </span>
            </div>

            <div className="hidden sm:flex items-center space-x-4 pt-1 text-xs text-zy-muted">
              <Link
                href="/#work"
                className="inline-flex items-center space-x-2 font-swiss tracking-wide text-zy-fg-secondary hover:text-zy-blue transition-colors group"
              >
                <span>{t.scrollPrompt}</span>
                <ArrowDown
                  size={13}
                  className="text-zy-blue transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-y-0.5"
                />
              </Link>

              <span className="text-zy-border-strong">/</span>

              <span className="inline-flex items-center space-x-1.5">
                <span className="font-mono text-[11px] text-zy-fg-secondary">04</span>
                <span className="font-swiss tracking-wide">
                  {language === 'es' ? 'Simuladores en vivo' : 'Live simulators'}
                </span>
              </span>

              <span className="text-zy-border-strong">/</span>

              <span className="font-mono text-[11px]">WCAG 2.1 AA</span>
            </div>
          </div>

          {/* Right / Columns 7-12: Supporting Sentence & Kinetic Magnetic Actions */}
          <div className="md:col-span-6 lg:col-span-6 md:text-right space-y-5">
            <p className="text-base sm:text-lg text-zy-fg-secondary font-sans leading-relaxed md:ml-auto max-w-[42ch] font-normal">
              {t.subhead}
            </p>

            <div className="flex flex-wrap items-center md:justify-end gap-3 pt-1">
              <Magnetic>
                <Link
                  href="/#contact"
                  className="group min-h-[44px] px-5 py-2.5 rounded-full bg-zy-blue hover:bg-zy-blue-hover active:scale-[0.97] text-white inline-flex items-center space-x-2 text-xs sm:text-[13px] font-swiss tracking-wide font-medium transition-all"
                >
                  <span>{t.ctaPrimary}</span>
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </Magnetic>

              <Magnetic>
                <Link
                  href="/#work"
                  className="group min-h-[44px] px-5 py-2.5 rounded-full bg-zy-surface hover:bg-zy-card border border-zy-border hover:border-zy-border-strong active:scale-[0.97] text-xs sm:text-[13px] font-swiss tracking-wide font-medium text-zy-fg-secondary hover:text-zy-fg inline-flex items-center space-x-2 transition-all"
                >
                  <span>{t.ctaSecondary}</span>
                  <ArrowDown
                    size={13}
                    className="text-zy-blue transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-y-0.5"
                  />
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>

        {/* Bottom Two Viewport Corner Micro-Labels (SW / SE Synchronized Entrance) */}
        <div className="pt-3 border-t border-zy-border-subtle flex items-center justify-between text-xs text-zy-muted">
          <div className="inline-flex items-center space-x-2">
            <span className="font-mono text-[11px] text-zy-blue font-semibold">
              [{cornerCoordinates[2].position}]
            </span>
            <span className="font-swiss tracking-wide text-zy-fg-secondary">
              {cornerCoordinates[2].label}
            </span>
            <span className="font-mono text-[11px] text-zy-muted">
              {cornerCoordinates[2].coord}
            </span>
          </div>

          <div className="inline-flex items-center space-x-2">
            <span className="font-mono text-[11px] text-zy-muted">
              {cornerCoordinates[3].coord}
            </span>
            <span className="text-zy-border-strong">·</span>
            <span className="font-swiss tracking-wide text-zy-fg-secondary">
              {cornerCoordinates[3].label}
            </span>
            <span className="font-mono text-[11px] text-zy-blue font-semibold">
              [{cornerCoordinates[3].position}]
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
