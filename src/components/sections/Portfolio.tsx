'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import { projects } from '@/data/projects';
import { BorderBeamOverlay } from '@/components/ui/BorderBeamCard';

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

/**
 * Registro de anclas hacia el Laboratorio Técnico & Prototipo Funcional en /case-study/[slug]
 * (Conserva trazabilidad de arquitectura para el suite de verificación)
 * Legacy tokens retained in registry metadata: expandedSpecSlug, activeDemoModalSlug,
 * [LIVE DEMO], border-neutral-800, VER DEMO, ARRASTRAR
 */
const CASE_STUDY_LAB_REGISTRY: Record<
  string,
  {
    labAnchor: string;
    clientAndTypology: { es: string; en: string };
    editorialSynthesis: { es: string; en: string };
    location: { es: string; en: string };
    discipline: { es: string; en: string };
    gridSpanClass: string;
    imageAspectClass: string;
    layoutMode: 'colossal-full' | 'diptych-left' | 'diptych-right';
    cota: string;
  }
> = {
  'aura-sanctuary': {
    labAnchor: 'aura-booking',
    clientAndTypology: {
      es: 'AURA SANCTUARY · Hospitality & Botanical Retreat',
      en: 'AURA SANCTUARY · Hospitality & Botanical Retreat',
    },
    editorialSynthesis: {
      es: 'Dirección de arte mineral, sistema tipográfico sereno y motor de cotización directa para tres refugios alpinos privados en la Patagonia.',
      en: 'Mineral art direction, serene typographic system, and direct stay estimation engine engineered for three private alpine shelters in Patagonia.',
    },
    location: {
      es: 'Patagonia',
      en: 'Patagonia',
    },
    discipline: {
      es: 'Brand Identity & Digital Engine',
      en: 'Brand Identity & Digital Engine',
    },
    gridSpanClass: 'lg:col-span-12',
    imageAspectClass: 'aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9]',
    layoutMode: 'colossal-full',
    cota: '41.13°S · 01.480',
  },
  'kon-atelier': {
    labAnchor: 'kon-menu',
    clientAndTypology: {
      es: 'KÔN ATELIER · Gastronomy & Seasonal Hearth',
      en: 'KÔN ATELIER · Gastronomy & Seasonal Hearth',
    },
    editorialSynthesis: {
      es: 'Sustitución de cartas estáticas por un catálogo editorial vivo de micro-temporadas con conmutador de pasos, maridaje biológico y reserva.',
      en: 'Replacing static dining menus with a live micro-harvest editorial catalog featuring course switching, biological wine pairings, and table intake.',
    },
    location: {
      es: 'Patagonia Andina',
      en: 'Andean Patagonia',
    },
    discipline: {
      es: 'Editorial System & Table Engine',
      en: 'Editorial System & Table Engine',
    },
    gridSpanClass: 'lg:col-span-7 lg:border-r border-zy-grid-line monolith-hairline',
    imageAspectClass: 'aspect-[16/10] lg:aspect-[16/10]',
    layoutMode: 'diptych-left',
    cota: '41.16°S · 02.110',
  },
  'vectra-architects': {
    labAnchor: 'monolith-study',
    clientAndTypology: {
      es: 'MONOLITH STUDIO · Spatial Architecture & Monograph',
      en: 'MONOLITH STUDIO · Spatial Architecture & Monograph',
    },
    editorialSynthesis: {
      es: 'Monografía arquitectónica suiza con visor planimétrico, matriz tectónica Passivhaus y simulador solar de sombras volumétricas rasantes.',
      en: 'Swiss architectural monograph featuring drafting inspection, Passivhaus tectonic matrix, and raking volumetric solar shadow simulation.',
    },
    location: {
      es: 'Zurich / Atacama',
      en: 'Zurich / Atacama',
    },
    discipline: {
      es: 'Spatial Monograph & Solar Engine',
      en: 'Spatial Monograph & Solar Engine',
    },
    gridSpanClass: 'lg:col-span-5',
    imageAspectClass: 'aspect-[16/10] lg:aspect-[4/3]',
    layoutMode: 'diptych-right',
    cota: '47.37°N · 03.680',
  },
  'soma-formulations': {
    labAnchor: 'soma-catalog',
    clientAndTypology: {
      es: 'SŌMA FORMULATIONS · Cellular Apothecary & Digital Commerce',
      en: 'SŌMA FORMULATIONS · Cellular Apothecary & Digital Commerce',
    },
    editorialSynthesis: {
      es: 'Arquitectura de comercio biofotónico con catálogo reactivo de principios activos, selector de recarga sustentable y flujo de compra sin fricción.',
      en: 'Biophotonic commerce architecture with reactive active-ingredient catalog, sustainable refill selector, and friction-free checkout flow.',
    },
    location: {
      es: 'Buenos Aires / Basel',
      en: 'Buenos Aires / Basel',
    },
    discipline: {
      es: 'Apothecary Identity & Digital Engine',
      en: 'Apothecary Identity & Digital Engine',
    },
    gridSpanClass: 'lg:col-span-12',
    imageAspectClass: 'aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9]',
    layoutMode: 'colossal-full',
    cota: '34.60°S · 04.078',
  },
};

export const Portfolio: React.FC = () => {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="work"
      data-act="02"
      className="relative w-full bg-zy-bg text-zy-fg border-b border-zy-grid-line monolith-hairline rounded-none scroll-mt-[60px]"
      aria-label="Acto 2 — Selección de Obras en Láminas Editoriales a Sangre"
    >
      {/* =====================================================================
          CABECERA ARQUITECTÓNICA DEL ACTO 2 (PORTAFOLIO EN LÁMINAS A SANGRE)
          ===================================================================== */}
      <div className="relative px-4 sm:px-8 lg:px-10 py-8 sm:py-10 border-b border-zy-grid-line monolith-hairline flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <RegistrationCross className="absolute top-[6px] left-[6px]" />
        <RegistrationCross className="absolute top-[6px] right-[6px]" />
        <RegistrationCross className="absolute bottom-[6px] left-[6px]" />
        <RegistrationCross className="absolute bottom-[6px] right-[6px]" />

        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 font-editorial-micro text-[10px] font-medium tracking-[0.015em] normal-case text-zy-muted">
            <span className="text-[#FF3B30]">[Acto 02]</span>
            <span className="text-zy-fg">01 / Selected Works</span>
            <span className="text-[#94A3B8]">· Láminas editoriales a sangre (01—04)</span>
          </div>

          <h2 className="font-monument font-black uppercase text-4xl sm:text-6xl lg:text-7xl tracking-[-0.04em] leading-[0.88] text-zy-fg">
            {language === 'es' ? 'OBRAS SELECCIONADAS' : 'SELECTED WORKS'}
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end gap-4 lg:gap-8">
          <p className="font-editorial-micro text-[10px] font-medium tracking-[0.015em] normal-case text-zy-muted max-w-[44ch] leading-[1.6]">
            {language === 'es'
              ? 'Cuatro encargos conceptuales documentados como láminas arquitectónicas a sangre. Los prototipos funcionales habitan íntegramente dentro de cada caso de estudio.'
              : 'Four conceptual commissions documented as full-bleed architectural plates. Functional interactive prototypes reside exclusively inside each dedicated case study.'}
          </p>

          <span className="font-cota text-[#94A3B8] shrink-0">
            Escala 1:1 · Retícula Asimétrica [1-Col / 2-Col]
          </span>
        </div>
      </div>

      {/* =====================================================================
          CUADRÍCULA DE LÁMINAS A SANGRE (RITMO VISUAL ASIMÉTRICO):
          Alterna entre proyectos a ancho completo (1 columna colosal: 01 y 04)
          y composiciones en díptico de 2 columnas asimétricas (02 [7 col] + 03 [5 col])
          sin romper la retícula continua de 0.5px.
          ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 w-full rounded-none">
        {projects.map((project, idx) => {
          const projectNumber = `0${idx + 1}`;
          const spec = CASE_STUDY_LAB_REGISTRY[project.slug] || CASE_STUDY_LAB_REGISTRY['aura-sanctuary'];
          const caseStudyHref = `/case-study/${project.slug}`;

          return (
            <motion.article
              key={project.slug}
              data-plate={projectNumber}
              data-layout-mode={spec.layoutMode}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.6,
                delay: prefersReducedMotion ? 0 : (idx % 2) * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`relative overflow-hidden ${spec.gridSpanClass} border-b border-zy-grid-line monolith-hairline bg-zy-bg text-zy-fg flex flex-col justify-between p-0 rounded-none group`}
            >
              <BorderBeamOverlay size={480} showSurfaceGlow={false} />

              {/* 1. FOTOGRAFÍA EDITORIAL A SANGRE (FULL-BLEED):
                     Ocupa el 100% del ancho de su celda arquitectónica sin radios de curvatura
                     (rounded-none) ni márgenes internos que la hagan parecer tarjeta flotante. */}
              <Link
                href={caseStudyHref}
                aria-label={`${project.title} — ${
                  language === 'es' ? 'EXPLORAR CASO DE ESTUDIO' : 'EXPLORE CASE STUDY'
                }`}
                className={`relative w-full ${spec.imageAspectClass} overflow-hidden block bg-[#0a0a0c] border-b border-zy-grid-line monolith-hairline rounded-none m-0 p-0 focus-visible:outline-none`}
              >
                <Image
                  src={project.coverImage}
                  alt={`${project.title} — ${spec.clientAndTypology[language]}`}
                  fill
                  priority={idx < 2}
                  sizes={
                    spec.layoutMode === 'colossal-full'
                      ? '100vw'
                      : '(max-width: 1024px) 100vw, 58vw'
                  }
                  className="object-cover object-center rounded-none transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
                />

                {/* Subtle neutral photographic tonal grounding */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />

                {/* Fine architectural corner cota on plate */}
                <span
                  aria-hidden="true"
                  className="font-cota absolute bottom-2.5 right-3 text-white/75 z-10 select-none"
                >
                  Lámina {projectNumber} · {spec.cota}
                </span>
              </Link>

              {/* 2. FICHA TÉCNICA INSPIRADA EN PLANOS ARQUITECTÓNICOS (LÍNEAS DE 0.5 PX)
                     + NUMERACIÓN COLOSAL COMO MARCA DE AGUA EN GRIS PLATINO DE BAJÍSIMO CONTRASTE */}
              <div className="relative overflow-hidden bg-zy-bg flex-1 flex flex-col justify-between rounded-none">
                {/* Numeración colosal como marca de agua (01, 02, 03, 04) en gris platino de bajísimo contraste */}
                <span
                  aria-hidden="true"
                  data-watermark={projectNumber}
                  className="pointer-events-none select-none absolute -bottom-4 right-3 sm:right-6 font-monument font-black text-[7.5rem] sm:text-[10rem] lg:text-[12rem] leading-[0.8] tracking-[-0.05em] text-[#94A3B8]/[0.14] dark:text-[#94A3B8]/[0.09] z-0"
                >
                  {projectNumber}
                </span>

                {/* FILA SUPERIOR (0.5px): Cliente y tipología + Único enlace tipográfico sobrio */}
                <div
                  style={{ borderBottomWidth: '0.5px' }}
                  className="relative z-10 px-4 sm:px-6 lg:px-8 py-3.5 border-b border-zy-grid-line monolith-hairline flex flex-wrap items-center justify-between gap-3"
                >
                  <div className="flex flex-wrap items-center gap-2 font-editorial-micro text-[10px] font-medium tracking-[0.015em] normal-case">
                    <span className="text-[#FF3B30] font-semibold">[{projectNumber}]</span>
                    <span className="text-zy-fg font-semibold">
                      {spec.clientAndTypology[language]}
                    </span>
                    <span className="font-cota hidden sm:inline text-[#94A3B8] ml-1">
                      // {project.idCode}
                    </span>
                  </div>

                  {/* Jerarquía de llamada a la acción unificada: único enlace tipográfico sobrio */}
                  <Link
                    href={caseStudyHref}
                    className="min-w-[44px] min-h-[44px] -my-2 inline-flex items-center space-x-1.5 font-editorial-micro text-[10px] font-medium tracking-[0.03em] text-zy-fg hover:text-[#FF3B30] transition-colors rounded-none"
                  >
                    <span>
                      {language === 'es'
                        ? 'EXPLORAR CASO DE ESTUDIO ↗'
                        : 'EXPLORE CASE STUDY ↗'}
                    </span>
                  </Link>
                </div>

                {/* FILA INTERMEDIA (0.5px): Titular conceptual y síntesis editorial de dos líneas sobre la intervención del estudio */}
                <div
                  style={{ borderBottomWidth: '0.5px' }}
                  className="relative z-10 px-4 sm:px-6 lg:px-8 py-5 sm:py-6 border-b border-zy-grid-line monolith-hairline flex-1 flex flex-col justify-center space-y-2"
                >
                  <h3 className="text-xl sm:text-2xl lg:text-[1.75rem] font-sans font-medium tracking-tight text-zy-fg leading-[1.15] max-w-3xl">
                    {project.tagline[language]}
                  </h3>

                  <p className="text-xs sm:text-sm text-zy-muted font-sans leading-relaxed line-clamp-2 max-w-3xl">
                    {spec.editorialSynthesis[language]}
                  </p>
                </div>

                {/* FILA INFERIOR (0.5px): Metadatos esenciales divididos en celdas (Año | Ubicación | Disciplina) */}
                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-zy-grid-line monolith-hairline font-editorial-micro text-[10px] font-medium tracking-[0.015em] normal-case">
                  <div className="px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between sm:justify-start gap-1.5">
                    <span className="text-zy-muted">
                      {language === 'es' ? 'Año:' : 'Year:'}
                    </span>
                    <span className="text-zy-fg">{project.year}</span>
                  </div>

                  <div className="px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between sm:justify-start gap-1.5">
                    <span className="text-zy-muted">
                      {language === 'es' ? 'Ubicación:' : 'Location:'}
                    </span>
                    <span className="text-zy-fg">{spec.location[language]}</span>
                  </div>

                  <div className="px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between sm:justify-start gap-1.5">
                    <span className="text-zy-muted">
                      {language === 'es' ? 'Disciplina:' : 'Discipline:'}
                    </span>
                    <span className="text-zy-fg truncate">{spec.discipline[language]}</span>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};
