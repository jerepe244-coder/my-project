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
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 border-t border-zy-border-subtle"
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
          <span className="font-mono text-xs uppercase tracking-widest text-zy-blue">
            {t.label}
          </span>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-zy-fg leading-tight">
            {t.headline}
          </h2>

          <div className="pt-2">
            <div className="inline-flex items-center space-x-3 p-3 bg-zy-card border border-zy-border-card rounded-lg shadow-sm">
              <SymbolLogo size={28} showPlate={false} />
              <div className="font-mono text-xs text-zy-muted">
                <span className="text-zy-fg font-semibold">ZYRVAE</span> // INDEPENDENT STUDIO
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
          <div className="space-y-5 text-base sm:text-lg text-zy-muted font-sans leading-relaxed">
            <p>{t.paragraph1}</p>
            <p>{t.paragraph2}</p>
          </div>

          {/* 3 Core Principles */}
          <div className="pt-8 border-t border-zy-border grid grid-cols-1 sm:grid-cols-3 gap-6">
            {t.principles.map((principle, idx) => (
              <div key={idx} className="space-y-2">
                <span className="font-mono text-xs text-zy-blue">0{idx + 1} //</span>
                <h3 className="text-base font-sans font-bold text-zy-fg">
                  {principle.title}
                </h3>
                <p className="text-xs text-zy-muted font-sans leading-relaxed">
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
