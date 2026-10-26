'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import { SymbolLogo } from '@/components/ui/SymbolLogo';
import { ArrowDown, ArrowUpRight, ShieldCheck } from 'lucide-react';

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

  const pillars =
    language === 'es'
      ? [
          { code: '01', label: 'Dirección de Arte & Sistemas Visuales' },
          { code: '02', label: 'Ingeniería Frontend (Next.js / TS)' },
          { code: '03', label: 'Experiencias & Demos Interactivas' },
          { code: '04', label: 'Arquitectura Orientada a Conversión' },
        ]
      : [
          { code: '01', label: 'Art Direction & Visual Systems' },
          { code: '02', label: 'Frontend Engineering (Next.js / TS)' },
          { code: '03', label: 'Interactive Demos & Simulators' },
          { code: '04', label: 'Conversion-Focused Architecture' },
        ];

  return (
    <section
      className="relative min-h-[93vh] flex flex-col justify-between pt-24 sm:pt-32 pb-10 sm:pb-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-label="ZYRVAE Hero Section"
    >
      {/* Subtle architectural perimeter crosshairs (pure structural marks, no decorative blur blobs) */}
      <div
        className="hidden sm:block absolute top-28 left-4 sm:left-6 lg:left-8 font-mono text-[10px] text-zy-crosshair select-none pointer-events-none"
        aria-hidden="true"
      >
        +
      </div>
      <div
        className="hidden sm:block absolute top-28 right-4 sm:right-6 lg:right-8 font-mono text-[10px] text-zy-crosshair select-none pointer-events-none"
        aria-hidden="true"
      >
        +
      </div>

      {/* Top Technical Metadata Bar */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeOutExpo }}
        className="flex flex-wrap items-center justify-between gap-3 pb-5 sm:pb-6 border-b border-zy-border-subtle text-[11px] font-mono text-zy-muted uppercase tracking-wider"
      >
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          <span className="text-zy-fg font-semibold tracking-widest">// ZYRVAE</span>
          <span className="text-zy-border-strong">/</span>
          <span className="text-zy-muted">{t.badge}</span>
        </div>

        <div className="flex items-center space-x-4 text-zy-dim">
          <span className="hidden md:inline">BUENOS AIRES [34°36′S 58°22′W] // GLOBAL</span>
          <Link
            href="/#contact"
            className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-zy-surface border border-zy-border hover:border-zy-blue/50 text-zy-fg-secondary hover:text-zy-fg transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-zy-blue" />
            <span className="text-[10px] tracking-widest uppercase">
              {language === 'es' ? 'DISPONIBLE PARA PROYECTOS' : 'AVAILABLE FOR PROJECTS'}
            </span>
          </Link>
        </div>
      </motion.div>

      {/* Main Architectural Hero Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center my-auto py-8 sm:py-12">
        {/* Left Col: Monumental Editorial Typography & Commercial Proposition */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6 sm:space-y-8">
          {/* Mobile Identity Anchor: Prominent geometric monogram specimen on smaller viewports */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.04, ease: easeOutExpo }}
            className="flex lg:hidden items-center justify-between p-3.5 rounded-xl bg-zy-bg-elevated border border-zy-border-card"
          >
            <div className="flex items-center space-x-3.5">
              <SymbolLogo size={44} animate={true} showPlate={true} showBlueprint={true} />
              <div className="font-mono text-[10px] uppercase tracking-widest text-zy-muted border-l border-zy-border pl-3 py-0.5">
                <span className="text-zy-fg block font-semibold">ZYRVAE // MONOGRAM</span>
                <span className="text-zy-dim">
                  {language === 'es' ? 'DISEÑO & INGENIERÍA WEB' : 'WEB DESIGN & ENGINEERING'}
                </span>
              </div>
            </div>
            <span className="font-mono text-[10px] text-zy-blue uppercase tracking-widest pr-1">
              [48×48]
            </span>
          </motion.div>

          {/* Editorial Kicker */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.06, ease: easeOutExpo }}
            className="hidden sm:inline-flex items-center space-x-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-zy-dim"
          >
            <span className="text-zy-blue font-semibold">00 //</span>
            <span>
              {language === 'es'
                ? 'DIRECCIÓN DE ARTE, DISEÑO INTERACTIVO E INGENIERÍA FRONTEND'
                : 'ART DIRECTION, INTERACTIVE DESIGN & FRONTEND ENGINEERING'}
            </span>
          </motion.div>

          {/* Monumental Headline: Pure, disciplined contrast */}
          <h1 className="text-[2.85rem] sm:text-6xl md:text-7xl lg:text-[5.35rem] xl:text-[6.1rem] font-sans font-bold tracking-[-0.035em] text-zy-fg leading-[0.95] sm:leading-[0.93]">
            <motion.span
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: easeOutExpo }}
              className="block text-zy-fg"
            >
              {t.headlinePart1}
            </motion.span>
            <motion.span
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18, ease: easeOutExpo }}
              className="block text-zy-fg-hero-sub mt-1 sm:mt-0"
            >
              {t.headlinePart2.replace('.', '')}
              <span className="text-zy-blue">.</span>
            </motion.span>
          </h1>

          {/* Supporting Copy: Architectural editorial density & commercial clarity */}
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.28, ease: easeOutExpo }}
            className="text-base sm:text-lg lg:text-xl text-zy-fg-secondary/90 font-sans max-w-2xl leading-relaxed font-normal"
          >
            {t.subhead}
          </motion.p>

          {/* Action CTAs + Direct Collaboration Guarantee */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.38, ease: easeOutExpo }}
            className="space-y-4 pt-1"
          >
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                href="/#contact"
                className="group inline-flex items-center space-x-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl bg-zy-blue hover:bg-zy-blue-hover text-white text-xs sm:text-sm font-mono font-medium tracking-wider transition-all duration-150 shadow-[0_0_24px_rgba(10,92,255,0.28)] outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-zy-bg focus-visible:ring-zy-blue"
              >
                <span>{t.ctaPrimary}</span>
              </Link>

              <Link
                href="/#work"
                className="inline-flex items-center space-x-2 px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl bg-zy-card hover:bg-zy-card-hover border border-zy-border hover:border-zy-border-strong text-zy-fg-secondary hover:text-zy-fg text-xs sm:text-sm font-mono tracking-wider transition-all duration-150 outline-none focus-visible:ring-1 focus-visible:ring-zy-blue"
              >
                <span>{t.ctaSecondary}</span>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[11px] font-mono text-zy-dim pt-1">
              <span className="inline-flex items-center space-x-1.5 text-zy-muted">
                <ShieldCheck size={13} className="text-zy-blue shrink-0" />
                <span>
                  {language === 'es'
                    ? 'Trato directo sin intermediarios'
                    : 'Direct founder-to-studio collaboration'}
                </span>
              </span>
              <span className="hidden sm:inline text-zy-border-strong">·</span>
              <span>
                {language === 'es'
                  ? 'Alcance y entregables definidos antes de iniciar'
                  : 'Defined scope & deliverables before kickoff'}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right Col: Architectural Geometric Specimen Module (Desktop) */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: easeOutExpo }}
          className="hidden lg:flex lg:col-span-5 xl:col-span-4 flex-col justify-between relative p-6 xl:p-7 rounded-2xl bg-zy-bg-elevated border border-zy-border-card shadow-sm"
        >
          {/* Specimen Header */}
          <div className="w-full flex items-center justify-between pb-4 border-b border-zy-border-subtle font-mono text-[10px] text-zy-dim uppercase tracking-widest">
            <span className="text-zy-fg-secondary font-medium">SPEC // ZYRVAE MONOGRAM</span>
            <span className="text-zy-blue">GRID 48×48 [1:1]</span>
          </div>

          {/* Geometric Monogram Stage with Precision Construction Frame */}
          <div className="py-9 flex items-center justify-center relative my-2 bg-zy-card/60 rounded-xl border border-zy-border-subtle overflow-hidden">
            {/* Corner coordinate readouts inside stage */}
            <span className="absolute top-2.5 left-3 font-mono text-[9px] text-zy-dim uppercase tracking-widest">
              ORIGIN [11,14]
            </span>
            <span className="absolute top-2.5 right-3 font-mono text-[9px] text-zy-blue uppercase tracking-widest">
              DATUM [28,24]
            </span>
            <span className="absolute bottom-2.5 left-3 font-mono text-[9px] text-zy-dim uppercase tracking-widest">
              VECTOR Z-01
            </span>
            <span className="absolute bottom-2.5 right-3 font-mono text-[9px] text-zy-dim uppercase tracking-widest">
              #0A5CFF
            </span>

            {/* Subtle hairline framing rings */}
            <div className="absolute w-40 h-40 rounded-full border border-zy-border pointer-events-none" />
            <div className="absolute w-52 h-52 rounded-full border border-zy-border-subtle border-dashed pointer-events-none" />

            <SymbolLogo size={118} animate={true} showPlate={false} showBlueprint={true} />
          </div>

          {/* Direct Demo Index inside Specimen Module */}
          <div className="space-y-2.5 pt-3 border-t border-zy-border-subtle">
            <div className="flex items-center justify-between font-mono text-[10px] text-zy-dim uppercase tracking-wider">
              <span>
                {language === 'es' ? '// CASOS DEMO INTERACTIVOS' : '// LIVE INTERACTIVE DEMOS'}
              </span>
              <span className="text-zy-fg-secondary">04 SYSTEMS</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {demoShortcuts.map((item) => (
                <Link
                  key={item.slug}
                  href={`/case-study/${item.slug}`}
                  className="group flex items-center justify-between px-3 py-2 rounded-lg bg-zy-card hover:bg-zy-card-hover border border-zy-border-subtle hover:border-zy-blue/50 transition-all text-[11px] font-mono"
                >
                  <div className="truncate pr-1">
                    <span className="text-zy-fg group-hover:text-zy-blue font-semibold block truncate transition-colors">
                      {item.label}
                    </span>
                    <span className="text-[9px] text-zy-dim block truncate">{item.domain}</span>
                  </div>
                  <ArrowUpRight
                    size={12}
                    className="text-zy-dim group-hover:text-zy-blue shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Architectural Capabilities Strip & Scroll Prompt */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.65, delay: 0.48 }}
        className="pt-6 sm:pt-7 border-t border-zy-border-subtle flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-xs font-mono"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 flex-grow">
          {pillars.map((pillar) => (
            <div key={pillar.code} className="flex items-start space-x-2">
              <span className="text-zy-blue font-semibold text-[11px]">{pillar.code} //</span>
              <span className="text-[11px] text-zy-muted leading-snug">{pillar.label}</span>
            </div>
          ))}
        </div>

        <Link
          href="/#work"
          className="inline-flex items-center space-x-2 text-zy-fg-secondary hover:text-zy-blue transition-colors shrink-0 self-start lg:self-center py-1"
        >
          <span>{t.scrollPrompt}</span>
          <ArrowDown size={13} className="text-zy-blue" />
        </Link>
      </motion.div>
    </section>
  );
};
