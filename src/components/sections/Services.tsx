'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';

/**
 * Configuración de Fase 3 para el Trazado Vivo de Líneas de Retícula en CAD (Acto 03):
 * - Líneas divisorias de 0.5 px dibujadas progresivamente al entrar en el Acto 03
 * - Líneas horizontales: scaleX: 0 -> 1 con transformOrigin: 'left'
 * - Líneas verticales: scaleY: 0 -> 1 con transformOrigin: 'top'
 * - Duración: 0.6 segundos con desfase progresivo de 0.05 s por celda
 */
export const GRID_CAD_DRAWING_CONFIG = {
  hairlineThickness: '0.5px',
  durationSec: 0.6,
  cellStaggerSec: 0.05,
  horizontal: {
    initialScaleX: 0,
    targetScaleX: 1,
    transformOrigin: 'left',
  },
  vertical: {
    initialScaleY: 0,
    targetScaleY: 1,
    transformOrigin: 'top',
  },
} as const;

/**
 * Cruz de registro tipográfica fina de imprenta suiza para intersecciones de retícula
 */
const RegistrationCross: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 9 9"
    className={`pointer-events-none w-[9px] h-[9px] text-[#94A3B8] select-none ${className}`}
  >
    <path d="M4.5 0V9M0 4.5H9" stroke="currentColor" strokeWidth="0.75" />
  </svg>
);

export const Services: React.FC = () => {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  const cadEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

  const columns =
    language === 'es'
      ? [
          {
            num: '01',
            cota: '34.68° · C-01',
            tag: 'Disciplina I',
            title: 'Dirección de Arte & Sistemas Visuales',
            synthesis:
              'Retículas suizas modulares, tipografía editorial de alto contraste, identidad digital y dirección estética CGI concebidas sin plantillas prefabricadas.',
            items: [
              '— Sistemas visuales monolíticos',
              '— Tipografía & jerarquía editorial',
              '— Dirección de arte & activos CGI 2K',
              '— Diseño 100% a medida de autor',
            ],
          },
          {
            num: '02',
            cota: '01.198 · C-02',
            tag: 'Disciplina II',
            title: 'Ingeniería Web & Arquitectura Frontend',
            synthesis:
              'Construcción de plataformas en Next.js y TypeScript con carga instantánea, precisión milimétrica en cada breakpoint y propiedad total del código.',
            items: [
              '— Next.js · TypeScript · Tailwind',
              '— Core Web Vitals & fluidez a 60fps',
              '— Arquitectura bilingüe (ES / EN) & WCAG',
              '— Repositorio limpio sin vendor lock-in',
            ],
          },
          {
            num: '03',
            cota: '58.38° · C-03',
            tag: 'Disciplina III',
            title: 'Laboratorio Técnico & Motores Interactivos',
            synthesis:
              'Ingeniería de prototipos funcionales a medida: simuladores solares, cotizadores de hospitalidad, configuradores gastronómicos y comercio reactivo.',
            items: [
              '— Simuladores solares y planimétricos',
              '— Cotizadores de estadía en tiempo real',
              '— Catálogos bioactivos y checkout reactivo',
              '— Integración de APIs, webhooks y SEO',
            ],
          },
          {
            num: '04',
            cota: '02.410 · C-04',
            tag: 'Filosofía & Cadencia',
            title: 'Manifiesto de Estudio & Método en 5 Hitos',
            synthesis:
              'Trato directo de fundador a fundador desde Buenos Aires hacia el mundo. Cinco etapas condensadas en un flujo continuo, honesto y sin intermediarios.',
            items: [
              '— I & II: Diagnóstico & Dirección Visual',
              '— III: Diseño & Construcción en Código',
              '— IV: Validación Interactiva & Auditoría',
              '— V: Despliegue Seguro & Evolución',
            ],
          },
        ]
      : [
          {
            num: '01',
            cota: '34.68° · C-01',
            tag: 'Discipline I',
            title: 'Art Direction & Visual Systems',
            synthesis:
              'Modular Swiss grids, high-contrast editorial typography, digital identity, and bespoke CGI art direction architected with zero off-the-shelf templates.',
            items: [
              '— Monolithic visual systems',
              '— Editorial typography & hierarchy',
              '— Bespoke CGI & 2K studio assets',
              '— 100% authorial custom design',
            ],
          },
          {
            num: '02',
            cota: '01.198 · C-02',
            tag: 'Discipline II',
            title: 'Web Engineering & Frontend Architecture',
            synthesis:
              'High-precision Next.js and TypeScript platforms engineered for instantaneous load times, responsive rigor across viewports, and full code ownership.',
            items: [
              '— Next.js · TypeScript · Tailwind',
              '— Core Web Vitals & 60fps motion',
              '— Bilingual (ES / EN) & WCAG accessible',
              '— Clean handover with zero lock-in',
            ],
          },
          {
            num: '03',
            cota: '58.38° · C-03',
            tag: 'Discipline III',
            title: 'Technical Lab & Interactive Engines',
            synthesis:
              'Custom functional prototypes: volumetric solar simulators, live hospitality rate estimators, culinary configurators, and reactive digital commerce.',
            items: [
              '— Solar & architectural drafting engines',
              '— Live hospitality stay estimators',
              '— Reactive catalogs & bespoke checkout',
              '— APIs, webhooks & technical SEO',
            ],
          },
          {
            num: '04',
            cota: '02.410 · C-04',
            tag: 'Ethos & Cadence',
            title: 'Studio Manifesto & 5-Stage Cadence',
            synthesis:
              'Direct founder-to-founder collaboration from Buenos Aires to global markets. Five transparent stages condensed into a single frictionless cadence.',
            items: [
              '— I & II: Diagnosis & Visual Direction',
              '— III: Engineering & Live Prototyping',
              '— IV: Interactive QA & WCAG Audit',
              '— V: Production Handover & Evolution',
            ],
          },
        ];

  return (
    <section
      id="capabilities"
      data-act="03"
      data-cad-grid="0.5px-progressive"
      style={{ scrollMarginTop: '90px' }}
      className="relative w-full bg-zy-bg text-zy-fg border-b border-zy-grid-line monolith-hairline rounded-none scroll-mt-24"
      aria-label="Acto 3 — Capacidades y Filosofía del Estudio (Retícula Suiza de 4 Columnas)"
    >
      {/* Anchors for legacy references (services, studio, process) fused into Acto 3 */}
      <span id="services" className="absolute -top-24 left-0 pointer-events-none" aria-hidden="true" />
      <span id="studio" className="absolute -top-24 left-0 pointer-events-none" aria-hidden="true" />
      <span id="process" className="absolute -top-24 left-0 pointer-events-none" aria-hidden="true" />

      {/* =====================================================================
          CABECERA EDITORIAL DEL ACTO 3: CAPACIDADES Y FILOSOFÍA (MANIFIESTO CONCISO)
          ===================================================================== */}
      <div className="relative px-4 sm:px-8 lg:px-10 py-8 sm:py-10 border-b border-zy-grid-line monolith-hairline grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
        <RegistrationCross className="absolute top-[6px] left-[6px]" />
        <RegistrationCross className="absolute top-[6px] right-[6px]" />
        <RegistrationCross className="absolute bottom-[6px] left-[6px]" />
        <RegistrationCross className="absolute bottom-[6px] right-[6px]" />

        {/* Línea horizontal CAD de cabecera (scaleX: 0 -> 1, origin: left, 0.6s) */}
        <motion.span
          aria-hidden="true"
          data-cad-line="horizontal"
          initial={prefersReducedMotion ? { opacity: 0 } : { scaleX: 0 }}
          whileInView={prefersReducedMotion ? { opacity: 1 } : { scaleX: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{
            duration: GRID_CAD_DRAWING_CONFIG.durationSec,
            delay: 0,
            ease: cadEase,
          }}
          style={{
            height: GRID_CAD_DRAWING_CONFIG.hairlineThickness,
            transformOrigin: GRID_CAD_DRAWING_CONFIG.horizontal.transformOrigin,
          }}
          className="pointer-events-none absolute left-0 right-0 bottom-0 bg-zy-fg/35 z-20"
        />

        <div className="lg:col-span-6 space-y-2">
          <div className="inline-flex items-center space-x-2 font-editorial-micro text-[10px] font-medium tracking-[0.015em] normal-case text-zy-muted">
            <span className="text-[#FF3B30]">
              {language === 'es'
                ? '[Acto 03 // Capacidades & Filosofía]'
                : '[Acto 03 // Capabilities & Philosophy]'}
            </span>
            <span className="text-[#94A3B8]">· Retícula Suiza 4-Columnas</span>
          </div>

          <h2 className="font-monument font-black uppercase text-4xl sm:text-6xl lg:text-7xl tracking-[-0.04em] leading-[0.88] text-zy-fg">
            {language === 'es' ? 'CAPACIDADES & FILOSOFÍA' : 'CAPABILITIES & ETHOS'}
          </h2>
        </div>

        <div className="lg:col-span-6 flex flex-col justify-end space-y-3">
          <p className="font-serif-editorial italic text-xl sm:text-2xl lg:text-[1.7rem] text-zy-fg leading-[1.18] tracking-[-0.01em]">
            {language === 'es'
              ? '«Independientes por diseño. Condensamos dirección de arte, arquitectura web e ingeniería interactiva en una práctica de autor sin intermediarios.»'
              : '“Independent by design. We condense art direction, web architecture, and interactive engineering into an authorial practice with zero middlemen.”'}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-2 font-editorial-micro text-[10px] font-medium tracking-[0.015em] normal-case text-zy-muted pt-1">
            <span>Buenos Aires, Argentina · 34°36′S 58°22′W [UTC-3]</span>
            <span className="font-cota text-[#94A3B8]">Pliego Técnico · 4 Disciplinas</span>
          </div>
        </div>
      </div>

      {/* =====================================================================
          RETÍCULA SUIZA LIMPIA DE 4 COLUMNAS CON TRAZADO VIVO DE LÍNEAS CAD (0.5 PX):
          - Líneas horizontales: scaleX: 0 -> 1 (transformOrigin: 'left')
          - Líneas verticales: scaleY: 0 -> 1 (transformOrigin: 'top')
          - Duración: 0.6s con desfase progresivo de 0.05s por celda
          ===================================================================== */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full border-b border-zy-grid-line monolith-hairline rounded-none">
        {columns.map((col, idx) => {
          const borderClasses =
            idx < 3
              ? 'border-b md:border-b lg:border-b-0 md:odd:border-r lg:border-r border-zy-grid-line monolith-hairline'
              : '';
          const cellDelay = prefersReducedMotion
            ? 0
            : idx * GRID_CAD_DRAWING_CONFIG.cellStaggerSec;

          return (
            <motion.div
              key={col.num}
              data-cad-cell={col.num}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: GRID_CAD_DRAWING_CONFIG.durationSec,
                delay: cellDelay,
                ease: cadEase,
              }}
              className={`relative p-5 sm:p-6 lg:p-8 flex flex-col justify-between gap-8 bg-zy-bg text-zy-fg rounded-none overflow-hidden ${borderClasses}`}
            >
              {/* Línea vertical divisoria CAD de 0.5px (scaleY: 0 -> 1 con origen en top, 0.6s, stagger 0.05s) */}
              {idx < 3 && (
                <motion.span
                  aria-hidden="true"
                  data-cad-line="vertical"
                  initial={prefersReducedMotion ? { opacity: 0 } : { scaleY: 0 }}
                  whileInView={prefersReducedMotion ? { opacity: 1 } : { scaleY: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: GRID_CAD_DRAWING_CONFIG.durationSec,
                    delay: cellDelay,
                    ease: cadEase,
                  }}
                  style={{
                    width: GRID_CAD_DRAWING_CONFIG.hairlineThickness,
                    transformOrigin: GRID_CAD_DRAWING_CONFIG.vertical.transformOrigin,
                  }}
                  className="hidden lg:block pointer-events-none absolute top-0 bottom-0 right-0 bg-zy-fg/40 z-20"
                />
              )}

              {/* Línea horizontal inferior CAD de 0.5px (scaleX: 0 -> 1 con origen en left, 0.6s, stagger 0.05s) */}
              <motion.span
                aria-hidden="true"
                data-cad-line="horizontal"
                initial={prefersReducedMotion ? { opacity: 0 } : { scaleX: 0 }}
                whileInView={prefersReducedMotion ? { opacity: 1 } : { scaleX: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: GRID_CAD_DRAWING_CONFIG.durationSec,
                  delay: cellDelay,
                  ease: cadEase,
                }}
                style={{
                  height: GRID_CAD_DRAWING_CONFIG.hairlineThickness,
                  transformOrigin: GRID_CAD_DRAWING_CONFIG.horizontal.transformOrigin,
                }}
                className="pointer-events-none absolute left-0 right-0 bottom-0 bg-zy-fg/35 z-20"
              />

              {idx < 3 && (
                <>
                  <RegistrationCross className="hidden lg:block absolute -top-[4.5px] -right-[4.5px] z-20" />
                  <RegistrationCross className="hidden lg:block absolute -bottom-[4.5px] -right-[4.5px] z-20" />
                </>
              )}

              {/* Subtle low-contrast platinum column watermark */}
              <span
                aria-hidden="true"
                className="pointer-events-none select-none absolute -bottom-3 right-3 font-monument font-black text-[5.5rem] leading-[0.8] tracking-[-0.05em] text-[#94A3B8]/[0.11] dark:text-[#94A3B8]/[0.07] z-0"
              >
                {col.num}
              </span>

              <div className="relative z-10 space-y-5">
                {/* Column Top Bar con trazo horizontal CAD de 0.5px (scaleX: 0 -> 1, origin: left) */}
                <div className="relative pb-3 flex items-center justify-between font-editorial-micro text-[10px] font-medium tracking-[0.015em] normal-case">
                  <span className="text-zy-fg">
                    <strong className="text-[#FF3B30] font-semibold">{col.num}</strong> / {col.tag}
                  </span>
                  <span className="font-cota text-[#94A3B8]">{col.cota}</span>

                  <motion.span
                    aria-hidden="true"
                    data-cad-line="horizontal"
                    initial={prefersReducedMotion ? { opacity: 0 } : { scaleX: 0 }}
                    whileInView={prefersReducedMotion ? { opacity: 1 } : { scaleX: 1 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{
                      duration: GRID_CAD_DRAWING_CONFIG.durationSec,
                      delay: cellDelay,
                      ease: cadEase,
                    }}
                    style={{
                      height: GRID_CAD_DRAWING_CONFIG.hairlineThickness,
                      transformOrigin: GRID_CAD_DRAWING_CONFIG.horizontal.transformOrigin,
                    }}
                    className="pointer-events-none absolute left-0 right-0 bottom-0 bg-zy-grid-line"
                  />
                </div>

                {/* Column Title */}
                <h3 className="text-lg sm:text-xl font-sans font-medium tracking-tight text-zy-fg leading-[1.2]">
                  {col.title}
                </h3>

                {/* Column Editorial Synthesis */}
                <p className="text-xs sm:text-sm text-zy-muted font-sans leading-relaxed">
                  {col.synthesis}
                </p>
              </div>

              {/* Column Technical Deliverables / Cadence List con trazo horizontal CAD de 0.5px */}
              <div className="relative z-10 pt-4">
                <motion.span
                  aria-hidden="true"
                  data-cad-line="horizontal"
                  initial={prefersReducedMotion ? { opacity: 0 } : { scaleX: 0 }}
                  whileInView={prefersReducedMotion ? { opacity: 1 } : { scaleX: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: GRID_CAD_DRAWING_CONFIG.durationSec,
                    delay: cellDelay,
                    ease: cadEase,
                  }}
                  style={{
                    height: GRID_CAD_DRAWING_CONFIG.hairlineThickness,
                    transformOrigin: GRID_CAD_DRAWING_CONFIG.horizontal.transformOrigin,
                  }}
                  className="pointer-events-none absolute left-0 right-0 top-0 bg-zy-grid-line"
                />

                <ul className="space-y-1.5 font-editorial-micro text-[10px] font-medium tracking-[0.015em] normal-case text-zy-fg">
                  {col.items.map((item) => (
                    <li key={item} className="leading-[1.45]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* =====================================================================
          ZÓCALO TÉCNICO DE ACTO 3: SÍNTESIS DEL ESTUDIO & ENLACE A CONTACTO
          ===================================================================== */}
      <div className="px-4 sm:px-8 lg:px-10 py-3.5 flex flex-wrap items-center justify-between gap-4 font-editorial-micro text-[10px] font-medium tracking-[0.015em] normal-case">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-zy-muted">
          <span>
            <strong className="text-zy-fg font-medium">
              {language === 'es' ? 'Modelo operativo:' : 'Practice model:'}
            </strong>{' '}
            {language === 'es'
              ? 'Estudio independiente · Colaboración global remota'
              : 'Independent studio · Global remote collaboration'}
          </span>
          <span className="hidden sm:inline text-[#94A3B8]">|</span>
          <span>
            <strong className="text-zy-fg font-medium">Stack:</strong> Next.js · TypeScript · Tailwind · Motion
          </span>
        </div>

        <Link
          href="/#contact"
          className="min-w-[44px] min-h-[44px] -my-2 inline-flex items-center space-x-1.5 text-zy-fg hover:text-[#FF3B30] transition-colors rounded-none"
        >
          <span>
            {language === 'es' ? 'INICIAR PROYECTO EN ACTO 04 ↗' : 'INITIATE PROJECT IN ACT 04 ↗'}
          </span>
        </Link>
      </div>
    </section>
  );
};
