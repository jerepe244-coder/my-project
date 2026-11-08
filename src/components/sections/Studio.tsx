'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import { SymbolLogo } from '@/components/ui/SymbolLogo';
import { BorderBeamOverlay } from '@/components/ui/BorderBeamCard';
import { ArrowUpRight } from 'lucide-react';

export const Studio: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].studio;
  const prefersReducedMotion = useReducedMotion();

  const studioSpecs =
    language === 'es'
      ? [
          { label: 'Modelo', value: 'Estudio independiente · Trato directo', monoValue: false },
          { label: 'Sede y alcance', value: 'Buenos Aires · Global', code: '[UTC-3]', monoValue: false },
          { label: 'Arquitectura', value: 'Next.js · TypeScript · Tailwind · Motion', monoValue: false },
          { label: 'Idiomas', value: 'Español e Inglés (Bilingüe)', monoValue: false },
        ]
      : [
          { label: 'Practice model', value: 'Independent studio · Direct collaboration', monoValue: false },
          { label: 'Base & reach', value: 'Buenos Aires · Global remote', code: '[UTC-3]', monoValue: false },
          { label: 'Architecture', value: 'Next.js · TypeScript · Tailwind · Motion', monoValue: false },
          { label: 'Languages', value: 'Spanish & English (Bilingual)', monoValue: false },
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
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="lg:col-span-5 space-y-6"
        >
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2">
              <span className="font-mono text-xs text-zy-blue font-semibold">04 //</span>
              <span className="font-swiss text-xs sm:text-sm tracking-wide text-zy-fg-secondary font-medium">
                {language === 'es' ? 'Sobre el estudio' : 'About the studio'}
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-medium tracking-tight text-zy-fg leading-[1.05]">
              {t.headline}
            </h2>
          </div>

          {/* Architectural Practice Specification Module with Reactive Border Beam */}
          <div className="pt-2">
            <div className="relative overflow-hidden p-6 bg-zy-card border border-zy-border space-y-5">
              <BorderBeamOverlay size={360} showSurfaceGlow={true} />
              <div className="relative z-10 flex items-center justify-between pb-4 border-b border-zy-border-subtle">
                <div className="flex items-center space-x-3.5">
                  <SymbolLogo size={36} showPlate={true} showBlueprint={true} />
                  <div>
                    <span className="font-sans font-medium tracking-[0.14em] text-sm text-zy-fg block">
                      ZYRVAE
                    </span>
                    <span className="font-swiss text-xs text-zy-muted tracking-wide block">
                      {language === 'es' ? 'Ficha del estudio' : 'Studio dossier'}
                    </span>
                  </div>
                </div>
                <span className="w-2 h-2 rounded-full bg-zy-blue" aria-hidden="true" />
              </div>

              <dl className="relative z-10 space-y-3 text-xs">
                {studioSpecs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2.5 border-b border-zy-border-subtle last:border-0 last:pb-0"
                  >
                    <dt className="font-swiss text-xs text-zy-dim tracking-wide">
                      {spec.label}
                    </dt>
                    <dd className="text-zy-fg font-sans font-normal text-xs inline-flex items-center space-x-1.5">
                      <span>{spec.value}</span>
                      {spec.code && (
                        <span className="font-mono text-[11px] text-zy-blue">{spec.code}</span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Editorial Paragraphs and 3 Core Principles */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
          className="lg:col-span-7 space-y-10 lg:pt-8"
        >
          <div className="space-y-5 text-lg sm:text-xl text-zy-fg font-sans leading-relaxed max-w-2xl">
            <p className="font-normal">{t.paragraph1}</p>
            <p className="text-zy-muted text-base sm:text-lg font-normal">{t.paragraph2}</p>
          </div>

          {/* 3 Core Principles Cards with Staggered Reveal & Reactive Border Beam */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2">
            {t.principles.map((principle, idx) => (
              <motion.div
                key={idx}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: idx * 0.09, ease: [0.23, 1, 0.32, 1] }}
                className="relative overflow-hidden p-5 border border-zy-border-subtle hover:border-zy-border bg-zy-card/60 space-y-2.5 transition-colors"
              >
                <BorderBeamOverlay size={260} showSurfaceGlow={true} />
                <span className="relative z-10 font-mono text-xs text-zy-blue font-semibold block">
                  0{idx + 1} //
                </span>
                <h3 className="relative z-10 text-base font-sans font-medium text-zy-fg leading-snug">
                  {principle.title}
                </h3>
                <p className="relative z-10 text-xs sm:text-sm text-zy-muted font-sans leading-relaxed">
                  {principle.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Direct Collaboration Footer Strip */}
          <div className="relative overflow-hidden p-5 border border-zy-border bg-zy-surface flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <BorderBeamOverlay size={360} showSurfaceGlow={false} />
            <div className="relative z-10 space-y-1">
              <span className="font-swiss text-zy-blue tracking-wide block font-semibold">
                {language === 'es' ? 'Trato directo' : 'Direct partnership'}
              </span>
              <p className="font-sans text-xs sm:text-sm text-zy-fg-secondary">
                {language === 'es'
                  ? '¿Buscás elevar la presencia digital de tu marca con criterio y solidez técnica?'
                  : 'Looking to elevate your brand’s digital presence with intention and engineering rigor?'}
              </p>
            </div>

            <Link
              href="/#contact"
              className="relative z-10 group min-h-[44px] px-4 py-2 rounded-full bg-zy-card hover:bg-zy-bg border border-zy-border inline-flex items-center space-x-2 font-swiss tracking-wide font-medium text-zy-fg hover:text-zy-blue transition-colors shrink-0 self-start sm:self-center"
            >
              <span>{language === 'es' ? 'Iniciar consulta' : 'Start an inquiry'}</span>
              <ArrowUpRight
                size={13}
                className="text-zy-blue transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
