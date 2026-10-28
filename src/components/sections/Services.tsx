'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import { services } from '@/data/services';
import { ArrowUpRight, Check } from 'lucide-react';

export const Services: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].services;
  const prefersReducedMotion = useReducedMotion();
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  const baselineStandards =
    language === 'es'
      ? [
          {
            title: 'Diseño 100% a medida',
            desc: 'Sin plantillas prefabricadas. Sistemas visuales creados para la identidad de tu negocio.',
          },
          {
            title: 'Ingeniería de alto rendimiento',
            desc: 'Next.js, TypeScript y optimización de Core Web Vitals para carga instantánea.',
          },
          {
            title: 'Responsive & Accesible (WCAG)',
            desc: 'Experiencia calibrada en móvil, tablet y escritorio con navegación por teclado.',
          },
          {
            title: 'Propiedad total y autonomía',
            desc: 'Repositorio limpio, documentado y sin ataduras forzadas a plataformas cerradas.',
          },
        ]
      : [
          {
            title: '100% Bespoke Design',
            desc: 'Zero off-the-shelf templates. Visual systems architected specifically for your brand.',
          },
          {
            title: 'High-Performance Engineering',
            desc: 'Next.js, TypeScript, and Core Web Vitals optimization for instantaneous load times.',
          },
          {
            title: 'Responsive & Accessible (WCAG)',
            desc: 'Calibrated across mobile, tablet, and desktop with full keyboard navigation.',
          },
          {
            title: 'Full Code Ownership',
            desc: 'Clean, documented repository handover with zero vendor lock-in.',
          },
        ];

  return (
    <section
      id="services"
      className="py-14 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 border-t border-zy-border-subtle"
      aria-label="Capabilities & Services"
    >
      {/* Header with progressive reveal */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 sm:mb-20 gap-6"
      >
        <div className="max-w-3xl">
          <div className="flex items-center space-x-3">
            <span className="font-mono text-xs uppercase tracking-widest text-zy-blue font-semibold">
              {t.label}
            </span>
            <span className="text-zy-border-strong font-mono text-xs">//</span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-zy-dim">
              {language === 'es' ? '05 ÁREAS DE PRÁCTICA' : '05 PRACTICE AREAS'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-zy-fg mt-2.5">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-zy-muted font-sans mt-3.5 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <Link
          href="/#contact"
          className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-zy-card hover:bg-zy-card-hover border border-zy-border hover:border-zy-blue/50 text-xs font-mono text-zy-fg transition-all self-start lg:self-end shrink-0"
        >
          <span>{t.cta}</span>
        </Link>
      </motion.div>

      {/* Editorial Numbered Index with staggered scroll motion */}
      <div className="divide-y divide-zy-border border-t border-b border-zy-border">
        {services.map((service, idx) => {
          const isHovered = hoveredService === service.id;

          return (
            <motion.div
              key={service.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
              className={`relative py-8 sm:py-10 transition-colors duration-200 group ${
                isHovered ? 'bg-zy-surface/65' : 'bg-transparent'
              }`}
            >
              {/* Subtle vertical active accent indicator */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-0.5 bg-zy-blue transition-opacity duration-200 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-start px-3 sm:px-6">
                {/* Number */}
                <div className="md:col-span-2 font-mono text-xs sm:text-sm text-zy-dim group-hover:text-zy-blue transition-colors pt-1">
                  <span className="font-semibold">// {service.number}</span>
                  <span className="block text-[10px] text-zy-dim mt-1 uppercase tracking-widest hidden md:block">
                    CAPABILITY
                  </span>
                </div>

                {/* Title */}
                <div className="md:col-span-4">
                  <h3 className="text-xl sm:text-2xl lg:text-[1.65rem] font-sans font-bold text-zy-fg group-hover:text-zy-blue transition-colors leading-snug">
                    {service.title[language]}
                  </h3>
                </div>

                {/* Description & Tags */}
                <div className="md:col-span-5 space-y-4">
                  <p className="text-sm sm:text-base text-zy-muted leading-relaxed font-sans">
                    {service.description[language]}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-0.5">
                    {service.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="font-mono text-[11px] text-zy-fg-secondary bg-zy-card border border-zy-border px-2.5 py-1 rounded-md"
                      >
                        {tag[language]}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Link Arrow */}
                <div className="md:col-span-1 flex md:justify-end pt-2 md:pt-0">
                  <Link
                    href="/#contact"
                    className="inline-flex items-center space-x-1.5 md:space-x-0 p-2.5 rounded-lg bg-zy-control hover:bg-zy-blue border border-zy-border hover:border-zy-blue text-zy-muted hover:text-white active:scale-[0.98] transition-all duration-150 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zy-blue"
                    aria-label={`${
                      language === 'es' ? 'Consultar por' : 'Inquire about'
                    } ${service.title[language]}`}
                  >
                    <span className="md:hidden font-mono text-xs">
                      {language === 'es' ? 'Solicitar propuesta' : 'Request proposal'}
                    </span>
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Architectural Baseline Guarantees Grid */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mt-12 p-6 sm:p-8 rounded-2xl bg-zy-bg-elevated border border-zy-border-card"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 mb-6 border-b border-zy-border-subtle">
          <span className="font-mono text-xs text-zy-blue uppercase tracking-wider font-semibold">
            {language === 'es'
              ? '// ESTÁNDARES TÉCNICOS EN CADA PROYECTO'
              : '// ENGINEERING BASELINE INCLUDED IN EVERY PROJECT'}
          </span>
          <span className="font-mono text-[11px] text-zy-dim uppercase">
            {language === 'es'
              ? 'ALCANCE DEFINIDO ANTES DE IMPLEMENTAR'
              : 'SCOPE DEFINED BEFORE IMPLEMENTATION'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {baselineStandards.map((std, i) => (
            <div key={i} className="space-y-2">
              <div className="flex items-center space-x-2 text-xs font-sans font-bold text-zy-fg">
                <Check size={14} className="text-zy-blue shrink-0" />
                <span>{std.title}</span>
              </div>
              <p className="text-sm text-zy-muted font-sans leading-relaxed pl-5">
                {std.desc}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
