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
      className="py-20 sm:py-28 lg:py-36 px-5 sm:px-8 lg:px-12 max-w-[1720px] mx-auto scroll-mt-20 border-t border-zy-border-subtle"
      aria-label="About the Studio — Architectural Identity & Ethos"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Monumental Headline & Technical Specification Dossier */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 space-y-6"
        >
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-zy-blue font-semibold block">
              // {t.label}
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-medium tracking-tight text-zy-fg leading-[1.05]">
              {t.headline}
            </h2>
          </div>

          {/* Architectural Practice Specification Module */}
          <div className="pt-2">
            <div className="p-6 bg-zy-card border border-zy-border space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-zy-border-subtle">
                <div className="flex items-center space-x-3.5">
                  <SymbolLogo size={36} showPlate={true} showBlueprint={true} />
                  <div>
                    <span className="font-sans font-medium tracking-[0.16em] text-sm text-zy-fg block">
                      ZYRVAE
                    </span>
                    <span className="font-mono text-[10px] text-zy-muted uppercase tracking-widest block">
                      STUDIO SPEC // DOSSIER
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
                    <dd className="text-zy-fg font-sans font-normal text-xs">
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
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-10 lg:pt-8"
        >
          <div className="space-y-5 text-lg sm:text-xl text-zy-fg font-sans leading-relaxed max-w-2xl">
            <p className="font-normal">{t.paragraph1}</p>
            <p className="text-zy-muted text-base sm:text-lg font-normal">{t.paragraph2}</p>
          </div>

          {/* 3 Core Principles Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2">
            {t.principles.map((principle, idx) => (
              <div
                key={idx}
                className="p-5 border border-zy-border-subtle hover:border-zy-border bg-zy-card/60 space-y-2.5 transition-colors"
              >
                <span className="font-mono text-xs text-zy-blue font-semibold block">
                  0{idx + 1} //
                </span>
                <h3 className="text-base font-sans font-medium text-zy-fg leading-snug">
                  {principle.title}
                </h3>
                <p className="text-xs sm:text-sm text-zy-muted font-sans leading-relaxed">
                  {principle.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Direct Collaboration Footer Strip */}
          <div className="p-5 border border-zy-border bg-zy-surface flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
            <div className="space-y-1">
              <span className="text-zy-blue uppercase tracking-widest block font-semibold">
                // {language === 'es' ? 'TRATO DIRECTO' : 'DIRECT PARTNERSHIP'}
              </span>
              <p className="font-sans text-xs sm:text-sm text-zy-fg-secondary">
                {language === 'es'
                  ? '¿Buscás elevar la presencia digital de tu marca con criterio y solidez técnica?'
                  : 'Looking to elevate your brand’s digital presence with intention and engineering rigor?'}
              </p>
            </div>

            <Link
              href="/#contact"
              className="inline-flex items-center space-x-1.5 text-zy-fg hover:text-zy-blue underline underline-offset-4 decoration-zy-blue transition-colors shrink-0 self-start sm:self-center"
            >
              <span>{language === 'es' ? 'Iniciar consulta' : 'Start an inquiry'}</span>
              <ArrowUpRight size={13} className="text-zy-blue" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
