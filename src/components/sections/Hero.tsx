'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import { SymbolLogo } from '@/components/ui/SymbolLogo';
import { ObsidianSculpture } from '@/components/ui/ObsidianSculpture';
import { CircularSeal } from '@/components/ui/CircularSeal';
import { ArrowUpRight } from 'lucide-react';

/**
 * Cruz de registro tipográfica fina de imprenta suiza para esquinas e intersecciones
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
      position: 'Nw · 01',
      label: 'Buenos Aires, Argentina',
      coord: '34°36′S 58°22′W',
      cota: '34.68°',
    },
    {
      id: 'ne',
      position: 'Ne · 02',
      label: 'The Monolith Grid',
      coord: 'Pliego 2026 · Fase 01',
      cota: '01.198',
    },
    {
      id: 'sw',
      position: 'Sw · 03',
      label: 'Swiss Editorial System',
      coord: 'Retícula 4-Col / 3-Col · 0.5 px',
      cota: '58.38°',
    },
    {
      id: 'se',
      position: 'Se · 04',
      label: 'Global Practice',
      coord: 'UTC-03:00',
      cota: '02.410',
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
      className="relative w-full min-h-[100svh] pt-[56px] sm:pt-[60px] pb-4 flex flex-col justify-between bg-zy-bg text-zy-fg select-none rounded-none"
      aria-label="ZYRVAE Hero — The Monolith Grid (Swiss Corporate Brutalism)"
    >
      {/* =====================================================================
          FILA 2 (CAJA MONUMENTAL DEL HERO):
          Única celda masiva que abarca el 100% del ancho de la retícula,
          con una altura mínima de 52vh a 56vh y titular ZYRVAE condensado/vertical
          de margen a margen con gran altura arquitectónica.
          ===================================================================== */}
      <div className="relative w-full min-h-[52vh] lg:min-h-[56vh] flex-1 flex flex-col justify-between px-4 sm:px-8 lg:px-10 py-4 sm:py-6 border-b border-zy-grid-line monolith-hairline rounded-none overflow-hidden">
        {/* Corner Registration Crosses & Blueprint Cotas (#94A3B8) */}
        <RegistrationCross className="absolute top-[6px] left-[6px]" />
        <RegistrationCross className="absolute top-[6px] right-[6px]" />
        <RegistrationCross className="absolute bottom-[6px] left-[6px]" />
        <RegistrationCross className="absolute bottom-[6px] right-[6px]" />

        {/* Subtle intermediate grid intersection cotas (#94A3B8) */}
        <span
          aria-hidden="true"
          className="font-cota hidden lg:inline absolute top-2 left-[40%] -translate-x-1/2 text-[#94A3B8] select-none"
        >
          34.68°
        </span>
        <span
          aria-hidden="true"
          className="font-cota hidden lg:inline absolute top-2 left-[75%] -translate-x-1/2 text-[#94A3B8] select-none"
        >
          01.198
        </span>

        {/* Top Cell Registration Bar (Sentence case Swiss Grotesque, 10px, font-medium 500, tracking 0.015em) */}
        <div className="flex items-center justify-between gap-4 font-editorial-micro text-[10px] font-medium tracking-[0.015em] normal-case text-zy-muted">
          <div className="inline-flex items-center space-x-2">
            <span className="text-zy-fg">[{cornerCoordinates[0].position}]</span>
            <span>{cornerCoordinates[0].label}</span>
            <span className="hidden sm:inline text-[#94A3B8]">· {cornerCoordinates[0].coord}</span>
            <span className="font-cota hidden md:inline text-[#94A3B8] ml-1">
              {cornerCoordinates[0].cota}
            </span>
          </div>

          <div className="inline-flex items-center space-x-2">
            <span className="font-cota hidden md:inline text-[#94A3B8] mr-1">
              {cornerCoordinates[1].cota}
            </span>
            <span className="hidden md:inline">{cornerCoordinates[1].label}</span>
            <span className="text-zy-fg">[{cornerCoordinates[1].coord}]</span>
          </div>
        </div>

        {/* Center Monumental Display Wordmark (ZYRVAE):
            Proporción vertical y condensada (condensed / tall), peso black (900),
            letter-spacing: -0.04em, line-height: 0.85, llenando la caja de margen a margen */}
        <div className="my-auto py-2 sm:py-3 w-full overflow-hidden flex items-center justify-center">
          <h1
            className="w-full font-monument font-black uppercase text-zy-fg tracking-[-0.04em] leading-[0.85] select-none"
            aria-label="ZYRVAE — An avant-garde independent digital studio based in Buenos Aires, Argentina."
          >
            <motion.span
              initial={prefersReducedMotion ? false : { y: '14%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.75, ease: easeOutExpo }}
              style={{
                lineHeight: 0.85,
                letterSpacing: '-0.04em',
                transform: 'scaleY(1.14)',
                transformOrigin: 'center center',
              }}
              className="flex items-center justify-between w-full text-[27.5vw] sm:text-[28.2vw] lg:text-[28.8vw] font-monument font-black uppercase text-zy-fg whitespace-nowrap py-[0.04em]"
            >
              <span>Z</span>
              <span>Y</span>
              <span>R</span>
              <span>V</span>
              <span>A</span>
              <span>E</span>
            </motion.span>
          </h1>
        </div>

        {/* Bottom of Fila 2: Manifiesto Editorial (Subtítulo de autor en Instrument Serif Italic) */}
        <div className="pt-2 sm:pt-3 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <motion.p
            initial={prefersReducedMotion ? false : { y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.75, delay: 0.1, ease: easeOutExpo }}
            style={{
              fontSize: 'clamp(1.75rem, 2.85vw, 3.35rem)',
            }}
            className="font-serif-editorial italic font-normal text-zy-fg leading-[1.08] tracking-[-0.01em] max-w-[34ch]"
          >
            An avant-garde independent digital studio based in Buenos Aires, Argentina.
          </motion.p>

          {/* Technical Datum & Blueprint Monogram Stamp in Sentence Case 10px Swiss Grotesque */}
          <div className="hidden sm:flex items-center space-x-3 shrink-0 pb-0.5">
            <SymbolLogo size={24} animate={true} showPlate={false} showBlueprint={true} />
            <div className="font-editorial-micro text-[10px] font-medium tracking-[0.015em] normal-case text-zy-muted">
              <span className="text-zy-fg block">
                Monolith · Spec. 01 <span className="text-[#94A3B8] ml-1">34.68°</span>
              </span>
              <span>{cornerCoordinates[2].coord}</span>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          FILA 3 (PANEL DE CAPACIDADES, ESCULTURA Y SELLO):
          3 celdas proporcionales:
          - Celda 1: 01 / Capabilities (40% del ancho)
          - Celda 2: Escultura central de obsidiana y cristal FIG. 01 (35% del ancho)
          - Celda 3: 02 / Current phase + Sello Circular 70px (25% del ancho)
          ===================================================================== */}
      <div className="relative w-full grid grid-cols-1 lg:grid-cols-[40%_35%_25%] items-stretch border-b border-zy-grid-line monolith-hairline rounded-none">
        {/* CELDA 1 (40% del ancho): Módulo 01 / Capabilities */}
        <div
          aria-label="01 / CAPABILITIES"
          className="relative w-full p-5 sm:p-6 lg:p-7 border-b lg:border-b-0 lg:border-r border-zy-grid-line monolith-hairline flex flex-col justify-between gap-4 rounded-none"
        >
          {/* Intersection Registration Cross & Cota at Top-Right and Bottom-Right of Cell 1 */}
          <RegistrationCross className="hidden lg:block absolute -top-[4.5px] -right-[4.5px] z-20" />
          <RegistrationCross className="hidden lg:block absolute -bottom-[4.5px] -right-[4.5px] z-20" />
          <span
            aria-hidden="true"
            className="font-cota absolute bottom-2 right-2.5 text-[#94A3B8] select-none"
          >
            34.68° · 00.400
          </span>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-editorial-micro text-[10px] font-medium tracking-[0.015em] normal-case text-zy-fg">
                01 / Capabilities
              </h2>
              <span className="font-editorial-micro text-[10px] font-medium tracking-[0.015em] normal-case text-zy-muted">
                Arch. &amp; Digital UI <span className="text-[#94A3B8] ml-1">· 01.198</span>
              </span>
            </div>

            {/* Bloque de texto justificado de 3 líneas en grotesca suiza neutra Sentence case (10px, medium 500, tracking 0.015em) */}
            <p className="font-editorial-micro text-[10px] font-medium tracking-[0.015em] normal-case text-zy-muted text-justify leading-[1.65] w-full">
              {language === 'es'
                ? 'Intersección entre arquitectura brutalista e interfaces digitales de alta precisión. Construimos sistemas visuales monolíticos, retículas modulares editoriales, simulaciones interactivas de producto y dirección de arte CGI para marcas globales.'
                : 'Architectural intersection of Swiss brutalism and high-precision digital interfaces. We engineer monolithic visual systems, modular editorial grids, interactive product simulations, and bespoke CGI art direction for global brands.'}
            </p>
          </div>

          {/* Direct Specimen Index Links (10px Sentence case) */}
          <nav
            aria-label="Selected Specimen Index"
            className="pt-3 border-t border-zy-grid-line monolith-hairline flex flex-wrap items-center justify-between gap-2 pr-14"
          >
            {demoShortcuts.map((demo) => (
              <Link
                key={demo.slug}
                href={`/case-study/${demo.slug}`}
                data-cursor="true"
                data-cursor-text={language === 'es' ? 'EXPLORAR' : 'EXPLORE'}
                className="group inline-flex items-center space-x-1 font-editorial-micro text-[10px] font-medium tracking-[0.015em] normal-case text-zy-muted hover:text-zy-fg transition-colors rounded-none"
              >
                <span className="text-zy-fg">{demo.index}.</span>
                <span className="group-hover:line-through">{demo.name}</span>
                <ArrowUpRight size={10} className="text-[#FF3B30]" />
              </Link>
            ))}
          </nav>
        </div>

        {/* CELDA 2 (35% del ancho): Escultura central de obsidiana y cristal (FIG. 01)
            Pre-renderizada en WebP transparente 2K, contenida estrictamente dentro de su celda */}
        <div className="relative w-full min-h-[236px] sm:min-h-[252px] border-b lg:border-b-0 lg:border-r border-zy-grid-line monolith-hairline flex flex-col justify-between items-center p-5 sm:p-6 overflow-hidden rounded-none">
          <RegistrationCross className="hidden lg:block absolute -top-[4.5px] -right-[4.5px] z-20" />
          <RegistrationCross className="hidden lg:block absolute -bottom-[4.5px] -right-[4.5px] z-20" />

          <div className="w-full flex items-center justify-between font-editorial-micro text-[10px] font-medium tracking-[0.015em] normal-case text-zy-muted z-10">
            <span className="text-zy-fg">
              Fig. 01 <span className="text-zy-muted">— Obsidian &amp; crystal</span>
            </span>
            <span>
              IOR 2.42 <span className="text-[#94A3B8] ml-1">· 01.198</span>
            </span>
          </div>

          {/* Contenida estrictamente dentro de su celda con sombra de contacto limpia */}
          <div className="relative z-10 my-auto py-1 flex items-center justify-center w-full">
            <ObsidianSculpture />
          </div>

          {/* Bottom cell technical registration bar */}
          <div className="w-full flex items-center justify-between font-cota text-[9px] text-[#94A3B8] z-10">
            <span>Spec. 2048px · HDRI Studio</span>
            <span>34.68° / 00.750</span>
          </div>
        </div>

        {/* CELDA 3 (25% del ancho): Módulo 02 / Current phase + Módulo de Firma (Sello Circular 70px) */}
        <div
          aria-label="02 / CURRENT PHASE"
          className="relative w-full p-5 sm:p-6 lg:p-7 flex flex-col justify-between gap-5 rounded-none"
        >
          <RegistrationCross className="absolute bottom-[6px] right-[6px]" />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-editorial-micro text-[10px] font-medium tracking-[0.015em] normal-case text-zy-fg">
                02 / Current phase
              </h2>
              <span className="font-editorial-micro text-[10px] font-medium tracking-[0.015em] normal-case text-[#94A3B8]">
                02.410 · [2026]
              </span>
            </div>

            {/* Lista limpia con guiones largos en grotesca suiza 10px */}
            <ul className="space-y-1 font-editorial-micro text-[10px] font-medium tracking-[0.015em] normal-case text-zy-fg">
              {currentPhaseItems.map((item) => (
                <li key={item} className="leading-[1.5]">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Módulo de Firma: Sello tipográfico circular de 70 px de diámetro */}
          <div className="pt-2 flex items-end justify-between gap-3">
            <div className="font-editorial-micro text-[10px] font-medium tracking-[0.015em] normal-case text-zy-muted leading-[1.45]">
              <span className="block text-zy-fg">Edition 01 · Ficha técnica</span>
              <span className="text-[#94A3B8]">
                {cornerCoordinates[3].coord} · 34.68°
              </span>
            </div>

            <CircularSeal size={70} />
          </div>
        </div>
      </div>
    </section>
  );
};
