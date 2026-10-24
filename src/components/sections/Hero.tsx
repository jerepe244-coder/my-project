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
      className="relative min-h-[92vh] flex flex-col justify-between pt-36 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
      aria-label="ZYRVAE Hero Section"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#0a5cff]/8 rounded-full blur-[140px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-[#1a2333]/20 rounded-full blur-[100px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Top Badge: Studio Position */}
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-[#101216] border border-[#1e232d] shadow-sm mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#0a5cff] animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#8b92a5]">
            {t.badge}
          </span>
          <span className="font-mono text-[10px] text-[#515768]">| BUENOS AIRES // GLOBAL</span>
        </motion.div>

        {/* Monumental Headline */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-sans font-bold tracking-tight text-white leading-[1.05] max-w-5xl">
          <motion.span
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="block text-white"
          >
            {t.headlinePart1}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="block bg-gradient-to-r from-white via-[#cbd4e6] to-[#0a5cff] bg-clip-text text-transparent"
          >
            {t.headlinePart2}
          </motion.span>
        </h1>

        {/* Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-base sm:text-xl text-[#8b92a5] font-sans max-w-2xl leading-relaxed font-normal"
        >
          {t.subhead}
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Link
            href="/#contact"
            className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-full bg-[#0a5cff] hover:bg-[#2672ff] text-white text-sm font-medium tracking-wide transition-all duration-200 shadow-[0_0_25px_rgba(10,92,255,0.4)] hover:shadow-[0_0_35px_rgba(10,92,255,0.6)] outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060709] focus-visible:ring-[#0a5cff]"
          >
            <span>{t.ctaPrimary}</span>
          </Link>

          <Link
            href="/#work"
            className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-full bg-[#101216] hover:bg-[#151922] border border-[#1e232d] text-[#cbd4e6] hover:text-white text-sm font-mono transition-all duration-200 outline-none focus-visible:ring-1 focus-visible:ring-[#0a5cff]"
          >
            <span>{t.ctaSecondary}</span>
          </Link>
        </motion.div>
      </div>

      {/* Distinctive Graphic Element Associated with the Symbol */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none select-none"
        aria-hidden="true"
      >
        <div className="relative w-80 h-80 flex items-center justify-center">
          {/* Subtle concentric hairline rings */}
          <div className="absolute inset-0 rounded-full border border-[#1e232d]/40" />
          <div className="absolute inset-8 rounded-full border border-[#1e232d]/30 border-dashed" />
          <div className="absolute inset-16 rounded-full border border-[#0a5cff]/20" />
          
          {/* Center architectural symbol */}
          <SymbolLogo size={120} animate={true} />
        </div>
      </motion.div>

      {/* Bottom Footer Bar of Hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="pt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-mono text-[#515768] border-t border-[#161a22] gap-4"
      >
        <div className="flex items-center space-x-6">
          <span>// 001. INDEPENDENT STUDIO</span>
          <span>EST. 2025</span>
          <span className="text-[#0a5cff]">AVAILABLE FOR NEW PROJECTS</span>
        </div>

        <Link
          href="/#work"
          className="inline-flex items-center space-x-2 text-[#8b92a5] hover:text-white transition-colors"
        >
          <span>{t.scrollPrompt}</span>
          <ArrowDown size={13} className="animate-bounce" />
        </Link>
      </motion.div>
    </section>
  );
};
