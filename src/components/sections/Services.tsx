'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import { services } from '@/data/services';
import { Magnetic } from '@/components/ui/Magnetic';
import { BorderBeamOverlay } from '@/components/ui/BorderBeamCard';
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
            title: 'Responsive y accesible (WCAG)',
            desc: 'Experiencia calibrada en móvil, tablet y escritorio con navegación por teclado.',
          },
          {
            title: 'Propiedad total y autonomía',
            desc: 'Repositorio limpio, documentado y sin ataduras forzadas a plataformas cerradas.',
          },
        ]
      : [
          {
            title: '100% bespoke design',
            desc: 'Zero off-the-shelf templates. Visual systems architected specifically for your brand.',
          },
          {
            title: 'High-performance engineering',
            desc: 'Next.js, TypeScript, and Core Web Vitals optimization for instantaneous load times.',
          },
          {
            title: 'Responsive & accessible (WCAG)',
            desc: 'Calibrated across mobile, tablet, and desktop with full keyboard navigation.',
          },
          {
            title: 'Full code ownership',
            desc: 'Clean, documented repository handover with zero vendor lock-in.',
          },
        ];

  return (
    <section
      id="services"
      className="py-20 sm:py-28 lg:py-36 px-5 sm:px-8 lg:px-12 max-w-[1720px] mx-auto scroll-mt-20 border-t border-zy-border-subtle"
      aria-label="Capabilities & Services — Line-up at one type size"
    >
      {/* Section Header */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 sm:mb-20 gap-6 border-b border-zy-border-subtle pb-6"
      >
        <div>
          <div className="inline-flex items-center space-x-2 mb-2">
            <span className="font-mono text-xs text-zy-blue font-semibold">02 //</span>
            <span className="font-swiss text-xs sm:text-sm tracking-wide text-zy-fg-secondary font-medium">
              {language === 'es' ? 'Capacidades' : 'Capabilities'}
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-sans font-medium tracking-tight text-zy-fg">
            {language === 'es' ? 'SERVICIOS' : 'SERVICES'}
          </h2>
          <p className="text-sm sm:text-base text-zy-muted font-sans mt-2 max-w-xl">
            {t.subtitle}
          </p>
        </div>

        <Magnetic>
          <Link
            href="/#contact"
            className="group min-h-[44px] px-4 py-2 rounded-full bg-zy-surface hover:bg-zy-card border border-zy-border inline-flex items-center space-x-2 text-xs font-swiss tracking-wide font-medium text-zy-fg hover:text-zy-blue transition-colors self-start lg:self-end"
          >
            <span>{t.cta}</span>
            <ArrowUpRight
              size={13}
              className="text-zy-blue transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </Magnetic>
      </motion.div>

      {/* Sticky Table Strip */}
      <div className="sticky top-16 z-20 py-2.5 px-4 bg-zy-bg/95 backdrop-blur-md border-y border-zy-border flex items-center justify-between text-xs">
        <span className="font-swiss font-medium tracking-wide text-zy-blue">
          {language === 'es' ? 'Práctica y capacidades técnicas' : 'Practice & technical capabilities'}
        </span>
        <span className="text-zy-dim inline-flex items-center space-x-1.5">
          <span className="font-mono text-[11px] text-zy-fg-secondary">05</span>
          <span className="font-swiss tracking-wide">
            {language === 'es' ? 'áreas' : 'areas'}
          </span>
        </span>
      </div>

      {/* Disciplined Four-Column Table Line-Up */}
      <div className="divide-y divide-zy-border-subtle border-b border-zy-border-subtle">
        {services.map((service, idx) => {
          const isHovered = hoveredService === service.id;

          return (
            <motion.div
              key={service.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.07, ease: [0.23, 1, 0.32, 1] }}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
              className={`relative py-8 sm:py-10 transition-colors duration-150 group ${
                isHovered ? 'bg-zy-surface/50' : 'bg-transparent'
              }`}
            >
              {/* Electric blue hairline active bar */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-1 bg-zy-blue transition-opacity duration-150 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start px-2 sm:px-6">
                {/* Col 1: Number & Title */}
                <div className="md:col-span-5 space-y-1">
                  <span className="font-mono text-xs text-zy-blue font-semibold block">
                    {service.number} //
                  </span>
                  <h3 className="text-xl sm:text-2xl lg:text-[1.75rem] font-sans font-medium text-zy-fg group-hover:text-zy-blue transition-colors tracking-tight leading-snug">
                    {service.title[language]}
                  </h3>
                </div>

                {/* Col 2: Strategic description */}
                <div className="md:col-span-4">
                  <p className="text-sm sm:text-base text-zy-muted font-sans leading-relaxed">
                    {service.description[language]}
                  </p>
                </div>

                {/* Col 3: Deliverable tags in Swiss Sans Sentence case */}
                <div className="md:col-span-2 space-y-1.5 pt-1">
                  <div className="flex flex-wrap gap-1.5">
                    {service.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="font-swiss tracking-wide text-xs text-zy-fg-secondary bg-zy-surface border border-zy-border px-2.5 py-0.5 rounded-sm"
                      >
                        {tag[language]}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Col 4: Action link right-aligned */}
                <div className="md:col-span-1 flex md:justify-end pt-1">
                  <Link
                    href="/#contact"
                    className="p-2 rounded-sm border border-transparent group-hover:border-zy-border text-zy-dim group-hover:text-zy-blue transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zy-blue"
                    aria-label={`${
                      language === 'es' ? 'Consultar' : 'Inquire'
                    } ${service.title[language]}`}
                  >
                    <ArrowUpRight size={18} />
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Engineering Baseline Standards Row with Reactive Border Beam */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
        className="relative overflow-hidden mt-14 p-6 sm:p-8 bg-zy-card border border-zy-border"
      >
        <BorderBeamOverlay size={420} showSurfaceGlow={true} />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-6 border-b border-zy-border-subtle text-xs">
          <span className="font-swiss tracking-wide text-zy-blue font-semibold">
            {language === 'es' ? 'Estándares en cada entrega' : 'Baseline in every delivery'}
          </span>
          <span className="font-swiss tracking-wide text-zy-dim">
            {language === 'es' ? 'Definidos antes de iniciar' : 'Defined before kickoff'}
          </span>
        </div>

        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {baselineStandards.map((std, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex items-center space-x-2 text-xs font-swiss tracking-wide font-semibold text-zy-fg">
                <Check size={13} className="text-zy-blue shrink-0" />
                <span>{std.title}</span>
              </div>
              <p className="text-xs sm:text-sm text-zy-muted font-sans leading-relaxed pl-5">
                {std.desc}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
