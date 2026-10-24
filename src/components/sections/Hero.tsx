'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import { SymbolLogo } from '@/components/ui/SymbolLogo';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].hero;

  return (
    <section
      className="relative min-h-[92vh] flex flex-col justify-between pt-28 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-label="ZYRVAE Hero Section"
    >
      {/* Subtle architectural perimeter crosshairs and framing (pure lines, no blur balls) */}
      <div className="absolute top-28 left-4 sm:left-8 font-mono text-[10px] text-[#2c3340] select-none pointer-events-none" aria-hidden="true">+</div>
      <div className="absolute top-28 right-4 sm:right-8 font-mono text-[10px] text-[#2c3340] select-none pointer-events-none" aria-hidden="true">+</div>

      {/* Top Technical Metadata Bar */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap items-center justify-between gap-3 pb-6 sm:pb-8 border-b border-[#161a22] text-[11px] font-mono text-[#8b92a5] uppercase tracking-wider"
      >
        <div className="flex items-center space-x-3">
          <span className="text-white font-semibold tracking-widest">// ZYRVAE</span>
          <span className="text-[#323946]">/</span>
          <span className="text-[#8b92a5]">{t.badge}</span>
        </div>

        <div className="flex items-center space-x-4 text-[#515768]">
          <span className="hidden sm:inline">BUENOS AIRES [34°36′S 58°22′W] // GLOBAL</span>
          <span className="inline-flex items-center space-x-1.5 text-[#0a5cff]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0a5cff]" />
            <span className="text-[10px] tracking-widest uppercase">AVAILABLE 2025</span>
          </span>
        </div>
      </motion.div>

      {/* Main Architectural Hero Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto py-8 sm:py-12">
        {/* Left Col: Monumental Editorial Typography */}
        <div className="lg:col-span-8 space-y-6 sm:space-y-8">
          {/* Mobile Identity Anchor: Visible strictly on smaller screens so the symbol is prominent */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="flex lg:hidden items-center space-x-3.5 pb-2"
          >
            <SymbolLogo size={42} animate={true} showPlate={true} />
            <div className="font-mono text-[10px] uppercase tracking-widest text-[#8b92a5] border-l border-[#1e232d] pl-3 py-1">
              <span className="text-white block font-semibold">STUDIO MONOGRAM</span>
              <span className="text-[#515768]">SYSTEM 01 // BESPOKE WEB</span>
            </div>
          </motion.div>

          {/* Monumental Headline: Pure, disciplined contrast — NO generic text gradient */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-sans font-bold tracking-tight text-white leading-[0.98] sm:leading-[0.96]">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="block text-white"
            >
              {t.headlinePart1}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="block text-[#d0d7e6]"
            >
              {t.headlinePart2.replace('.', '')}
              <span className="text-[#0a5cff]">.</span>
            </motion.span>
          </h1>

          {/* Supporting Copy: Architectural editorial density */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg lg:text-xl text-[#8b92a5] font-sans max-w-2xl leading-relaxed font-normal"
          >
            {t.subhead}
          </motion.p>

          {/* Action CTAs: Structured, architectural buttons (no fuzzy neon drop shadow blobs) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2"
          >
            <Link
              href="/#contact"
              className="inline-flex items-center space-x-2 px-6 sm:px-7 py-3.5 rounded-lg bg-[#0a5cff] hover:bg-[#1f6bff] text-white text-xs sm:text-sm font-mono tracking-wider transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060709] focus-visible:ring-[#0a5cff]"
            >
              <span>{t.ctaPrimary}</span>
            </Link>

            <Link
              href="/#work"
              className="inline-flex items-center space-x-2 px-5 sm:px-6 py-3.5 rounded-lg bg-[#0c0e12] hover:bg-[#141720] border border-[#1e232d] hover:border-[#2f3747] text-[#cbd4e6] hover:text-white text-xs sm:text-sm font-mono tracking-wider transition-all duration-150 outline-none focus-visible:ring-1 focus-visible:ring-[#0a5cff]"
            >
              <span>{t.ctaSecondary}</span>
            </Link>
          </motion.div>
        </div>

        {/* Right Col: Geometric Identity Module (Desktop) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:flex lg:col-span-4 flex-col items-center justify-center relative p-8 rounded-2xl bg-[#090b0e] border border-[#181c24]"
        >
          {/* Subtle architectural hairline grid inside card */}
          <div className="w-full flex items-center justify-between pb-6 border-b border-[#141820] font-mono text-[10px] text-[#515768] uppercase tracking-widest">
            <span>SPEC: GEOMETRIC MONOGRAM</span>
            <span className="text-[#0a5cff]">AXIS // 48PX</span>
          </div>

          <div className="py-10 flex items-center justify-center relative">
            {/* Subtle hairline framing circle */}
            <div className="absolute w-44 h-44 rounded-full border border-[#181d26] pointer-events-none" />
            <div className="absolute w-56 h-56 rounded-full border border-[#141720] border-dashed pointer-events-none" />
            <SymbolLogo size={112} animate={true} showPlate={false} />
          </div>

          <div className="w-full pt-6 border-t border-[#141820] flex items-center justify-between font-mono text-[10px] text-[#515768]">
            <span>ZYRVAE ARCHIVE</span>
            <span className="text-[#cbd4e6]">EDITION 2025.1</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom Editorial Coordinates & Scroll Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.65 }}
        className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-mono text-[#515768] border-t border-[#161a22] gap-4"
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <span>// 001. PRACTICE</span>
          <span className="text-[#cbd4e6]">DIGITAL DESIGN &amp; FRONTEND ENGINEERING</span>
        </div>

        <Link
          href="/#work"
          className="inline-flex items-center space-x-2 text-[#8b92a5] hover:text-white transition-colors"
        >
          <span>{t.scrollPrompt}</span>
          <ArrowDown size={13} className="text-[#0a5cff]" />
        </Link>
      </motion.div>
    </section>
  );
};