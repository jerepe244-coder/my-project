'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import { SymbolLogo } from '@/components/ui/SymbolLogo';

export const Studio: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].studio;

  return (
    <section
      id="studio"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 border-t border-[#161a22]"
      aria-label="About the Studio"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left Column: Headline and Positioning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 space-y-6"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-[#0a5cff]">
            {t.label}
          </span>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-white leading-tight">
            {t.headline}
          </h2>

          <div className="pt-2">
            <div className="inline-flex items-center space-x-3 p-3 bg-[#0c0e12] border border-[#1a1f29] rounded-lg">
              <SymbolLogo size={28} showPlate={false} />
              <div className="font-mono text-xs text-[#8b92a5]">
                <span className="text-white font-semibold">ZYRVAE</span> // INDEPENDENT STUDIO
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Editorial Paragraphs and Core Principles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-8"
        >
          <div className="space-y-5 text-base sm:text-lg text-[#8b92a5] font-sans leading-relaxed">
            <p>{t.paragraph1}</p>
            <p>{t.paragraph2}</p>
          </div>

          {/* 3 Core Principles */}
          <div className="pt-8 border-t border-[#1e232d] grid grid-cols-1 sm:grid-cols-3 gap-6">
            {t.principles.map((principle, idx) => (
              <div key={idx} className="space-y-2">
                <span className="font-mono text-xs text-[#0a5cff]">0{idx + 1} //</span>
                <h3 className="text-base font-sans font-bold text-white">
                  {principle.title}
                </h3>
                <p className="text-xs text-[#8b92a5] font-sans leading-relaxed">
                  {principle.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};