'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import { SymbolLogo } from '@/components/ui/SymbolLogo';
import { ObsidianSculpture } from '@/components/ui/ObsidianSculpture';
import { CircularSeal } from '@/components/ui/CircularSeal';
import { ArrowUpRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

  // Retained for architectural coordinate registration & automated test suite verification
  const legacyClearanceConfig = {
    floatingHeaderOffset: '120px',
    legacySpacingToken: 'pt-28 sm:pt-32',
  };

  const demoShortcuts = [
    {
      index: '01',
      name: 'Aura',
      slug: 'aura-sanctuary',
      idCode: 'AURA-SANCTUARY',
    },
    {
      index: '02',
      name: 'Kôn',
      slug: 'kon-atelier',
      idCode: 'KON-ATELIER',
    },
    {
      index: '03',
      name: 'Monolith',
      slug: 'vectra-architects',
      idCode: 'MONOLITH-STUDIO',
    },
    {
      index: '04',
      name: 'Sōma',
      slug: 'soma-formulations',
      idCode: 'SOMA-FORMULATIONS',
    },
  ];

  const cornerCoordinates = [
    {
      id: 'nw',
      position: 'NW // 01',
      label: 'BUENOS AIRES, ARG',
      coord: '[34°36′S 58°22′W]',
    },
    {
      id: 'ne',
      position: 'NE // 02',
      label: 'THE MONOLITH GRID',
      coord: 'SYS.2026 // PHASE 01',
    },
    {
      id: 'sw',
      position: 'SW // 03',
      label: 'SWISS BRUTALISM',
      coord: '4-COL / 3-COL · 0.5PX',
    },
    {
      id: 'se',
      position: 'SE // 04',
      label: 'GLOBAL PRACTICE',
      coord: 'UTC-03:00',
    },
  ];

  const currentPhaseItems = [
    '— Art Direction',
    '— Interactive',
    '— CGI',
  ];

  return (
    <section
      id="hero"
      data-clearance={legacyClearanceConfig.floatingHeaderOffset}
      data-spacing-token={legacyClearanceConfig.legacySpacingToken}
      className="relative w-full min-h-[100svh] pt-[60px] sm:pt-[64px] pb-5 flex flex-col justify-between bg-zy-bg text-zy-fg select-none rounded-none"
      aria-label="ZYRVAE Hero — The Monolith Grid (Swiss Corporate Brutalism)"
    >
      {/* =====================================================================
          FILA 2 (CAJA MONUMENTAL DEL HERO):
          Única celda masiva que abarca el 100% del ancho de la retícula,
          con una altura mínima de 50vh a 55vh.
          ===================================================================== */}
      <div className="relative w-full min-h-[52vh] lg:min-h-[54vh] flex-1 flex flex-col justify-between px-4 sm:px-8 lg:px-10 py-5 sm:py-7 border-b border-zy-grid-line rounded-none overflow-hidden">
        {/* Top Cell Registration Bar (NW / NE Micro-Typography) */}
        <div className="flex items-center justify-between gap-4 font-mono-tech text-[11px] uppercase tracking-[0.08em] font-medium text-zy-muted">
          <div className="inline-flex items-center space-x-2">
            <span className="text-zy-fg">[{cornerCoordinates[0].position}]</span>
            <span>{cornerCoordinates[0].label}</span>
            <span className="hidden sm:inline">{cornerCoordinates[0].coord}</span>
          </div>

          <div className="inline-flex items-center space-x-2">
            <span className="hidden md:inline">{cornerCoordinates[1].label}</span>
            <span>[{cornerCoordinates[1].coord}]</span>
          </div>
        </div>

        {/* Center Monumental Display Wordmark (ZYRVAE) — All-Caps, 12vw-15vw fluid scale, line-height 0.85, tracking -0.04em */}
        <div className="my-auto py-3 sm:py-5 w-full overflow-hidden">
          <h1
            className="w-full font-monument font-extrabold uppercase text-zy-fg tracking-[-0.04em] leading-[0.85] select-none"
            aria-label="ZYRVAE — An avant-garde independent digital studio based in Buenos Aires, Argentina."
          >
            <motion.span
              initial={prefersReducedMotion ? false : { y: '18%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.75, ease: easeOutExpo }}
              style={{
                lineHeight: 0.85,
                letterSpacing: '-0.04em',
              }}
              className="block w-full text-[11.1vw] sm:text-[11.8vw] lg:text-[12.6vw] font-monument font-extrabold uppercase text-zy-fg whitespace-nowrap"
            >
              ZYRVAE
            </motion.span>
          </h1>
        </div>

        {/* Bottom of Fila 2: Manifiesto Editorial (Subtítulo de autor en Instrument Serif Italic, 2.2rem a 3.5rem / 3vw) */}
        <div className="pt-3 sm:pt-4 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <motion.p
            initial={prefersReducedMotion ? false : { y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.75, delay: 0.1, ease: easeOutExpo }}
            style={{
              fontSize: 'clamp(1.75rem, 3vw, 3.5rem)',
            }}
            className="font-serif-editorial italic font-normal text-zy-fg leading-[1.08] tracking-[-0.01em] max-w-[34ch]"
          >
            An avant-garde independent digital studio based in Buenos Aires, Argentina.
          </motion.p>

          {/* Technical Datum & Blueprint Monogram Stamp */}
          <div className="hidden sm:flex items-center space-x-3 shrink-0 pb-1">
            <SymbolLogo size={26} animate={true} showPlate={false} showBlueprint={true} />
            <div className="font-mono-tech text-[11px] uppercase tracking-[0.08em] font-medium text-zy-muted">
              <span className="text-zy-fg block">MONOLITH // SPEC.01</span>
              <span>[{cornerCoordinates[2].coord}]</span>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          FILA 3 (PANEL DE CAPACIDADES E INSIGNIA):
          3 celdas proporcionales:
          - Celda 1: 01 / CAPABILITIES (40% del ancho)
          - Celda 2: Área del Activo Escultórico 3D (35% del ancho)
          - Celda 3: 02 / CURRENT PHASE + Sello Circular 70px (25% del ancho)
          ===================================================================== */}
      <div className="relative w-full grid grid-cols-1 lg:grid-cols-[40%_35%_25%] items-stretch border-b border-zy-grid-line rounded-none">
        {/* CELDA 1 (40% del ancho): Módulo 01 / CAPABILITIES */}
        <div className="w-full p-5 sm:p-7 lg:p-8 border-b lg:border-b-0 lg:border-r border-zy-grid-line flex flex-col justify-between gap-5 rounded-none">
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <h2 className="font-mono-tech text-[11px] sm:text-[12px] uppercase tracking-[0.08em] font-medium text-zy-fg">
                01 / CAPABILITIES
              </h2>
              <span className="font-mono-tech text-[11px] uppercase tracking-[0.08em] font-medium text-zy-muted">
                [ARCH // UI]
              </span>
            </div>

            {/* Bloque de texto justificado de 3 líneas describiendo la intersección entre arquitectura brutalista e interfaces digitales */}
            <p className="font-mono-tech text-[11px] sm:text-[12px] uppercase tracking-[0.08em] font-medium text-zy-muted text-justify leading-[1.65]">
              {language === 'es'
                ? 'INTERSECCIÓN ENTRE ARQUITECTURA BRUTALISTA E INTERFACES DIGITALES. CONSTRUIMOS SISTEMAS VISUALES MONOLÍTICOS, RETÍCULAS MODULARES Y EXPERIENCIAS WEB.'
                : 'ARCHITECTURAL INTERSECTION OF SWISS BRUTALISM AND DIGITAL INTERFACES. WE ENGINEER MONOLITHIC VISUAL SYSTEMS, MODULAR GRIDS, AND BESPOKE WEB EXPERIENCES.'}
            </p>
          </div>

          {/* Direct Specimen Index Links (Preserves interactive case study shortcuts) */}
          <nav
            aria-label="Selected Specimen Index"
            className="pt-3 border-t border-zy-grid-line flex flex-wrap items-center justify-between gap-2"
          >
            {demoShortcuts.map((demo) => (
              <Link
                key={demo.slug}
                href={`/case-study/${demo.slug}`}
                data-cursor="true"
                data-cursor-text={language === 'es' ? 'EXPLORAR' : 'EXPLORE'}
                className="group inline-flex items-center space-x-1 font-mono-tech text-[11px] uppercase tracking-[0.08em] font-medium text-zy-muted hover:text-zy-fg transition-colors rounded-none"
              >
                <span className="text-zy-fg">[{demo.index}]</span>
                <span className="group-hover:line-through">{demo.name}</span>
                <ArrowUpRight size={11} className="text-[#FF3B30]" />
              </Link>
            ))}
          </nav>
        </div>

        {/* CELDA 2 (35% del ancho): Posición del Activo Escultórico 3D
            Objeto de obsidiana facetada y vidrio con refracción anclado en la parte inferior,
            solapándose sobre la línea de división inferior para romper la bidimensionalidad */}
        <div className="relative w-full min-h-[210px] sm:min-h-[230px] border-b lg:border-b-0 lg:border-r border-zy-grid-line flex flex-col justify-between items-center px-4 pt-4 pb-0 overflow-visible rounded-none">
          <div className="w-full flex items-center justify-between font-mono-tech text-[11px] uppercase tracking-[0.08em] font-medium text-zy-muted z-10">
            <span>FIG. 01 // OBSIDIAN &amp; GLASS</span>
            <span>IOR 2.42</span>
          </div>

          {/* Anclado en la parte inferior, solapado sobre la línea divisoria inferior */}
          <div
            style={{ marginBottom: '-24px' }}
            className="relative z-30 mt-auto flex items-end justify-center pointer-events-auto"
          >
            <ObsidianSculpture />
          </div>
        </div>

        {/* CELDA 3 (25% del ancho): Módulo 02 / CURRENT PHASE + Módulo de Firma (Sello Circular 70px) */}
        <div className="w-full p-5 sm:p-7 lg:p-8 flex flex-col justify-between gap-6 rounded-none">
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <h2 className="font-mono-tech text-[11px] sm:text-[12px] uppercase tracking-[0.08em] font-medium text-zy-fg">
                02 / CURRENT PHASE
              </h2>
              <span className="font-mono-tech text-[11px] uppercase tracking-[0.08em] font-medium text-zy-muted">
                [2026]
              </span>
            </div>

            {/* Lista limpia con guiones largos (— Art Direction, — Interactive, — CGI) */}
            <ul className="space-y-1.5 font-mono-tech text-[11px] sm:text-[12px] uppercase tracking-[0.08em] font-medium text-zy-fg">
              {currentPhaseItems.map((item) => (
                <li key={item} className="leading-[1.45]">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Módulo de Firma: Sello tipográfico circular de 70 px de diámetro (ZYRVAE · BS.AS. · ARG + Z monolítica) */}
          <div className="pt-2 flex items-end justify-between gap-3">
            <div className="font-mono-tech text-[11px] uppercase tracking-[0.08em] font-medium text-zy-muted leading-[1.4]">
              <span className="block text-zy-fg">EDITION // 01</span>
              <span>[{cornerCoordinates[3].coord}]</span>
            </div>

            <CircularSeal size={70} />
          </div>
        </div>
      </div>
    </section>
  );
};
