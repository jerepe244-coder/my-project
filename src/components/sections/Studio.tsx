'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import { SymbolLogo } from '@/components/ui/SymbolLogo';
import { ArrowUpRight } from 'lucide-react';

export const Studio: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].studio;
  const prefersReducedMotion = useReducedMotion();

  const studioSpecs =
    language === 'es'
      ? [
          { label: 'MODELO', value: 'Estudio independiente · Trato directo' },
          { label: 'SEDE & ALCANCE', value: 'Buenos Aires [UTC-3] // Global' },
          { label: 'ARQUITECTURA', value: 'Next.js · TypeScript · Tailwind · Motion' },
          { label: 'IDIOMAS', value: 'Español & Inglés (Bilingüe)' },
        ]
      : [
          { label: 'PRACTICE MODEL', value: 'Independent studio · Direct collaboration' },
          { label: 'BASE & REACH', value: 'Buenos Aires [UTC-3] // Global remote' },
          { label: 'ARCHITECTURE', value: 'Next.js · TypeScript · Tailwind · Motion' },
          { label: 'LANGUAGES', value: 'Spanish & English (Bilingual)' },
        ];

  return (
    <section
      id="studio"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 border-t border-zy-border-subtle"
      aria-label="About the Studio"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left Column: Headline and Architectural Studio Dossier */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 space-y-6"
        >
          <div className="flex items-center space-x-3">
            <span className="font-mono text-xs uppercase tracking-widest text-zy-blue font-semibold">
              {t.label}
            </span>
            <span className="text-zy-border-strong font-mono text-xs">//</span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-zy-dim">
              IDENTITY &amp; ETHOS
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-zy-fg leading-[1.08]">
            {t.headline}
          </h2>

          {/* Architectural Practice Specification Card */}
          <div className="pt-2">
            <div className="p-5 sm:p-6 bg-zy-bg-elevated border border-zy-border-card rounded-2xl shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-zy-border-subtle">
                <div className="flex items-center space-x-3.5">
                  <SymbolLogo size={38} showPlate={true} showBlueprint={true} />
                  <div>
                    <span className="font-sans font-bold tracking-[0.18em] text-sm text-zy-fg block">
                      ZYRVAE
                    </span>
                    <span className="font-mono text-[10px] text-zy-muted uppercase tracking-widest block">
                      DIGITAL STUDIO // SPEC
                    </span>
                  </div>
                </div>
                <span className="w-2 h-2 rounded-full bg-zy-blue" aria-hidden="true" />
              </div>

              <dl className="space-y-3 text-xs font-mono">
                {studioSpecs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2.5 border-b border-zy-border-subtle last:border-0 last:pb-0"
                  >
                    <dt className="text-[10px] text-zy-dim uppercase tracking-wider">
                      // {spec.label}
                    </dt>
                    <dd className="text-zy-fg-secondary font-sans font-medium text-xs">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Editorial Paragraphs and 3 Core Principles */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-8 lg:pt-8"
        >
          <div className="space-y-5 text-base sm:text-lg text-zy-fg-secondary font-sans leading-relaxed">
            <p className="text-zy-fg font-medium">{t.paragraph1}</p>
            <p className="text-zy-muted">{t.paragraph2}</p>
          </div>

          {/* 3 Core Principles Cards */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {t.principles.map((principle, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-zy-card border border-zy-border-card hover:border-zy-border-strong transition-colors flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2.5">
                  <span className="inline-block font-mono text-xs text-zy-blue font-semibold">
                    0{idx + 1} //
                  </span>
                  <h3 className="text-base font-sans font-bold text-zy-fg leading-snug">
                    {principle.title}
                  </h3>
                  <p className="text-xs text-zy-muted font-sans leading-relaxed">
                    {principle.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Direct Studio Collaboration Bar */}
          <div className="p-5 rounded-xl bg-zy-surface border border-zy-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <span className="font-mono text-[10px] text-zy-blue uppercase tracking-widest block">
                {language === 'es' ? '// COLABORACIÓN DIRECTA' : '// DIRECT COLLABORATION'}
              </span>
              <p className="text-xs sm:text-sm text-zy-fg-secondary font-sans">
                {language === 'es'
                  ? '¿Buscás un socio técnico y visual para definir o renovar la presencia web de tu marca?'
                  : 'Looking for a technical and visual partner to define or elevate your brand’s digital presence?'}
              </p>
            </div>

            <Link
              href="/#contact"
              className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-lg bg-zy-blue hover:bg-zy-blue-hover text-white text-xs font-mono tracking-wider transition-colors shrink-0 self-start sm:self-center"
            >
              <span>
                {language === 'es' ? 'Iniciar consulta' : 'Start an inquiry'}
              </span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
