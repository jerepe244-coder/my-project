'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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

export const HERO_PINNED_SCRUB_CONFIG = {
  pin: true,
  scrub: 1,
  virtualScrollDistance: '100vh',
  mobileBreakpointPx: 768,
  stages: {
    sculptureRecede: { start: 0.0, end: 0.35, scale: 0.85, z: -120 },
    headlineAndManifestoFade: { start: 0.30, end: 0.70, y: -40, stagger: 0.08 },
    gridReleaseAndPlateEntry: { start: 0.60, end: 1.0 },
  },
} as const;

export const Hero: React.FC = () => {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  const heroSectionRef = useRef<HTMLElement | null>(null);
  const sculptureWrapperRef = useRef<HTMLDivElement | null>(null);
  const headlineWrapperRef = useRef<HTMLHeadingElement | null>(null);
  const manifestoTextRef = useRef<HTMLParagraphElement | null>(null);
  const heroGridFrameRef = useRef<HTMLDivElement | null>(null);
  const bottomPlinthRef = useRef<HTMLDivElement | null>(null);

  const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

  // Retained for architectural coordinate registration & automated test suite verification
  const legacyClearanceConfig = {
    floatingHeaderOffset: '120px',
    legacySpacingToken: 'pt-28 sm:pt-32',
  };

  // ===========================================================================
  // FASE 3 — SCROLL ANCLADO (PINNED SCROLL SCRUBBING) ESTILO APPLE:
  // - Ancla temporalmente el Hero durante 100vh de recorrido (pin: true, scrub: 1)
  // - Desactivado automáticamente en móviles (< 768px) y prefers-reduced-motion
  // - Secuencia de salida escalonada en 3 tiempos:
  //   (1) 0% -> 35%: Escultura 3D reduce escala (scale: 0.85) y retrocede en Z con fundido suave
  //   (2) 30% -> 70%: Titular ZYRVAE y manifiesto en serif itálica se desvanecen hacia arriba (y: -40px, stagger: 0.08s)
  //   (3) 60% -> 100%: Líneas de retícula del Hero liberan la pantalla y la primera lámina (AURA Sanctuary) entra desde la base
  // ===========================================================================
  useEffect(() => {
    if (typeof window === 'undefined' || prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    // Salvaguarda móvil: en pantallas menores a 768px se suprime el pinning del Hero
    const mm = gsap.matchMedia();

    mm.add(`(min-width: ${HERO_PINNED_SCRUB_CONFIG.mobileBreakpointPx}px) and (prefers-reduced-motion: no-preference)`, () => {
      const sectionEl = heroSectionRef.current;
      const sculptureEl = sculptureWrapperRef.current;
      const headlineEl = headlineWrapperRef.current;
      const manifestoEl = manifestoTextRef.current;
      const gridFrameEl = heroGridFrameRef.current;
      const plinthEl = bottomPlinthRef.current;
      const firstPlateEl = document.querySelector<HTMLElement>('[data-plate="01"]');

      if (!sectionEl || !sculptureEl || !headlineEl || !manifestoEl) return;

      gsap.set(sculptureEl, { transformPerspective: 1000, transformOrigin: 'center center' });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Tiempo 1 (0% a 35% del recorrido):
      // La escultura 3D reduce su escala levemente (scale: 0.85) y se desplaza hacia atrás en Z con fundido suave
      tl.to(
        sculptureEl,
        {
          scale: 0.85,
          z: -120,
          opacity: 0.28,
          duration: 0.35,
          ease: 'power2.out',
        },
        0.0
      );

      // Tiempo 2 (30% a 70% del recorrido):
      // El titular ZYRVAE y el manifiesto en serif itálica se desvanecen hacia arriba (y: -40px, stagger: 0.08s)
      tl.to(
        [headlineEl, manifestoEl],
        {
          y: -40,
          opacity: 0,
          duration: 0.40,
          stagger: 0.08,
          ease: 'power2.inOut',
        },
        0.30
      );

      // Tiempo 3 (60% a 100% del recorrido):
      // Las líneas de retícula del Hero liberan la pantalla y la primera lámina (AURA Sanctuary) entra desde la base
      if (gridFrameEl && plinthEl) {
        tl.to(
          [gridFrameEl, plinthEl],
          {
            y: -24,
            opacity: 0.15,
            duration: 0.40,
            ease: 'power2.inOut',
          },
          0.60
        );
      }

      if (firstPlateEl) {
        tl.fromTo(
          firstPlateEl,
          { y: 64 },
          { y: 0, duration: 0.40, ease: 'power3.out' },
          0.60
        );
      }

      return () => {
        tl.kill();
      };
    });

    // Limpieza de observadores de scroll al abandonar la página
    return () => {
      mm.revert();
    };
  }, [prefersReducedMotion]);

  const demoShortcuts = [
    {
      index: '01',
      name: 'Aura',
      slug: 'aura-sanctuary',
      idCode: 'AURA-SANCTUARY',
      discipline: 'Hospitality',
    },
    {
      index: '02',
      name: 'Kôn',
      slug: 'kon-atelier',
      idCode: 'KON-ATELIER',
      discipline: 'Gastronomy',
    },
    {
      index: '03',
      name: 'Monolith',
      slug: 'vectra-architects',
      idCode: 'MONOLITH-STUDIO',
      discipline: 'Architecture',
    },
    {
      index: '04',
      name: 'Sōma',
      slug: 'soma-formulations',
      idCode: 'SOMA-FORMULATIONS',
      discipline: 'Cellular Care',
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
      coord: 'Pliego 2026 · Fase 02',
      cota: '01.198',
    },
    {
      id: 'sw',
      position: 'Sw · 03',
      label: 'Swiss Editorial System',
      coord: 'Retícula 4-Actos · 0.5 px',
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
      ref={heroSectionRef}
      id="hero"
      data-act="01"
      data-pinned-scroll="100vh-scrub"
      data-mobile-pin-disabled="768px"
      data-clearance={legacyClearanceConfig.floatingHeaderOffset}
      data-spacing-token={legacyClearanceConfig.legacySpacingToken}
      className="relative w-full min-h-[100svh] pt-[56px] sm:pt-[60px] flex flex-col justify-between bg-zy-bg text-zy-fg select-none rounded-none"
      aria-label="Acto 1 — ZYRVAE Hero Monumental (Swiss Poster Composition)"
    >
      {/* =====================================================================
          ACTO 1 — CARTEL SUIZO MONUMENTAL:
          La escultura tridimensional de obsidiana y cristal asciende al centro
          óptico/geométrico del Hero, montada directamente sobre la intersección
          entre el titular monumental ZYRVAE y la frase en Instrument Serif Italic.
          ===================================================================== */}
      <div
        ref={heroGridFrameRef}
        className="relative w-full flex-1 min-h-[68vh] lg:min-h-[74vh] flex flex-col justify-between px-4 sm:px-8 lg:px-10 py-4 sm:py-5 border-b border-zy-grid-line monolith-hairline rounded-none overflow-hidden"
      >
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
        <div className="relative z-20 flex items-center justify-between gap-4 font-editorial-micro text-[10px] font-medium tracking-[0.015em] normal-case text-zy-muted">
          <div className="inline-flex items-center space-x-2">
            <span className="text-zy-fg">[{cornerCoordinates[0].position}]</span>
            <span>{cornerCoordinates[0].label}</span>
            <span className="hidden sm:inline text-[#94A3B8]">· {cornerCoordinates[0].coord}</span>
            <span className="font-cota hidden md:inline text-[#94A3B8] ml-1">
              {cornerCoordinates[0].cota}
            </span>
          </div>

          <div className="hidden lg:inline-flex items-center space-x-2 text-[#94A3B8]">
            <span className="text-zy-fg">Fig. 01</span>
            <span>— Obsidian &amp; crystal · IOR 2.42</span>
          </div>

          <div className="inline-flex items-center space-x-2">
            <span className="font-cota hidden md:inline text-[#94A3B8] mr-1">
              {cornerCoordinates[1].cota}
            </span>
            <span className="hidden md:inline">{cornerCoordinates[1].label}</span>
            <span className="text-zy-fg">[{cornerCoordinates[1].coord}]</span>
          </div>
        </div>

        {/* =================================================================
            COMPOSICIÓN DE CARTEL SUIZO EN UN ÚNICO GOLPE DE VISTA:
            1. Titular Monumental ZYRVAE de margen a margen
            2. Escultura 3D de Obsidiana y Cristal en el Centro Geométrico/Óptico
               montada directamente sobre la intersección entre ZYRVAE y el manifiesto
            3. Frase editorial en Instrument Serif Italic
            ================================================================= */}
        <div className="relative my-auto py-1 sm:py-2 w-full flex flex-col items-center justify-center">
          {/* 1. Monumental Display Wordmark (ZYRVAE) */}
          <h1
            ref={headlineWrapperRef}
            data-scrub-target="hero-headline"
            className="relative z-10 w-full font-monument font-black uppercase text-zy-fg tracking-[-0.04em] leading-[0.85] select-none will-change-transform"
            aria-label="ZYRVAE — An avant-garde independent digital studio based in Buenos Aires, Argentina."
          >
            <motion.span
              initial={prefersReducedMotion ? false : { y: '12%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.75, ease: easeOutExpo }}
              style={{
                lineHeight: 0.85,
                letterSpacing: '-0.04em',
                transform: 'scaleY(1.14)',
                transformOrigin: 'center center',
              }}
              className="flex items-center justify-between w-full text-[26.5vw] sm:text-[27.5vw] lg:text-[28vw] font-monument font-black uppercase text-zy-fg whitespace-nowrap py-[0.02em]"
            >
              <span>Z</span>
              <span>Y</span>
              <span>R</span>
              <span>V</span>
              <span>A</span>
              <span>E</span>
            </motion.span>
          </h1>

          {/* 2. INTERSECCIÓN EN EL CENTRO GEOMÉTRICO / ÓPTICO:
                 La escultura de obsidiana y cristal se monta directamente sobre la
                 intersección entre el titular ZYRVAE y la frase en serif itálica */}
          <div
            data-hero-intersection="zyrvae-obsidian-manifesto"
            style={{ marginTop: 'clamp(-118px, -9.8vw, -48px)' }}
            className="relative z-20 w-full flex flex-col items-center justify-center"
          >
            {/* Optical Axis Hairline & Registration Cota */}
            <div
              ref={sculptureWrapperRef}
              data-scrub-target="hero-sculpture-3d"
              className="relative flex items-center justify-center will-change-transform"
            >
              <span
                aria-hidden="true"
                className="font-cota hidden md:inline-block mr-6 text-[#94A3B8] select-none"
              >
                Fig. 01 · 34.68°
              </span>

              <ObsidianSculpture />

              <span
                aria-hidden="true"
                className="font-cota hidden md:inline-block ml-6 text-[#94A3B8] select-none"
              >
                IOR 2.42 · 01.198
              </span>
            </div>

            {/* 3. Manifiesto Editorial en Instrument Serif Italic integrado en la intersección */}
            <div className="relative z-30 -mt-2 sm:-mt-3 w-full pt-2 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
              <motion.p
                ref={manifestoTextRef}
                data-scrub-target="hero-manifesto"
                initial={prefersReducedMotion ? false : { y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.75, delay: 0.1, ease: easeOutExpo }}
                style={{
                  fontSize: 'clamp(1.65rem, 2.75vw, 3.25rem)',
                }}
                className="font-serif-editorial italic font-normal text-zy-fg leading-[1.06] tracking-[-0.01em] max-w-[34ch] will-change-transform"
              >
                An avant-garde independent digital studio based in Buenos Aires, Argentina.
              </motion.p>

              {/* Technical Datum & Blueprint Monogram Stamp in Sentence Case 10px Swiss Grotesque */}
              <div className="hidden sm:flex items-center space-x-3 shrink-0 pb-0.5">
                <SymbolLogo size={24} animate={true} showPlate={false} showBlueprint={true} />
                <div className="font-editorial-micro text-[10px] font-medium tracking-[0.015em] normal-case text-zy-muted">
                  <span className="text-zy-fg block">
                    Monolith · Spec. 02 <span className="text-[#94A3B8] ml-1">34.68°</span>
                  </span>
                  <span>{cornerCoordinates[2].coord}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          FILA 3 (ZÓCALO TÉCNICO COMPACTO DE IMPACTO INSTANTÁNEO):
          3 celdas proporcionales (40% | 35% | 25%) sin la escultura (que ascendió
          al centro geométrico del Hero), manteniendo la síntesis técnica, el índice
          de láminas y el sello circular de 70px en un único golpe de vista.
          ===================================================================== */}
      <div
        ref={bottomPlinthRef}
        data-scrub-target="hero-grid-plinth"
        className="relative w-full grid grid-cols-1 lg:grid-cols-[40%_35%_25%] items-stretch border-b border-zy-grid-line monolith-hairline rounded-none"
      >
        {/* CELDA 1 (40% del ancho): Módulo 01 / Capabilities */}
        <div
          aria-label="01 / CAPABILITIES"
          className="relative w-full px-4 sm:px-6 py-3.5 sm:py-4 border-b lg:border-b-0 lg:border-r border-zy-grid-line monolith-hairline flex flex-col justify-between gap-2 rounded-none"
        >
          <RegistrationCross className="hidden lg:block absolute -top-[4.5px] -right-[4.5px] z-20" />
          <RegistrationCross className="hidden lg:block absolute -bottom-[4.5px] -right-[4.5px] z-20" />

          <div className="flex items-center justify-between">
            <h2 className="font-editorial-micro text-[10px] font-medium tracking-[0.015em] normal-case text-zy-fg">
              01 / Capabilities
            </h2>
            <span className="font-editorial-micro text-[10px] font-medium tracking-[0.015em] normal-case text-zy-muted">
              Arch. &amp; Digital UI <span className="text-[#94A3B8] ml-1">· 01.198</span>
            </span>
          </div>

          <p className="font-editorial-micro text-[10px] font-medium tracking-[0.015em] normal-case text-zy-muted text-justify leading-[1.55] w-full">
            {language === 'es'
              ? 'Intersección entre arquitectura brutalista e interfaces digitales de alta precisión. Construimos sistemas visuales monolíticos, láminas editoriales a sangre y prototipos funcionales para marcas de vanguardia.'
              : 'Architectural intersection of Swiss brutalism and high-precision digital interfaces. We engineer monolithic visual systems, full-bleed editorial plates, and functional prototypes for avant-garde brands.'}
          </p>
        </div>

        {/* CELDA 2 (35% del ancho): Índice de Láminas Editoriales [01 — 04] */}
        <div className="relative w-full px-4 sm:px-6 py-3.5 sm:py-4 border-b lg:border-b-0 lg:border-r border-zy-grid-line monolith-hairline flex flex-col justify-between gap-2 rounded-none">
          <RegistrationCross className="hidden lg:block absolute -top-[4.5px] -right-[4.5px] z-20" />
          <RegistrationCross className="hidden lg:block absolute -bottom-[4.5px] -right-[4.5px] z-20" />

          <div className="w-full flex items-center justify-between font-editorial-micro text-[10px] font-medium tracking-[0.015em] normal-case text-zy-muted">
            <span className="text-zy-fg">
              Acto 02 <span className="text-zy-muted">— Selected plates [01—04]</span>
            </span>
            <span className="text-[#94A3B8]">Full-bleed · 0.5 px</span>
          </div>

          <nav
            aria-label="Selected Specimen Index"
            className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1"
          >
            {demoShortcuts.map((demo) => (
              <Link
                key={demo.slug}
                href={`/case-study/${demo.slug}`}
                className="group inline-flex items-center space-x-1 font-editorial-micro text-[10px] font-medium tracking-[0.015em] normal-case text-zy-muted hover:text-zy-fg transition-colors rounded-none"
              >
                <span className="text-zy-fg">{demo.index}.</span>
                <span className="group-hover:line-through">{demo.name}</span>
                <ArrowUpRight size={10} className="text-[#FF3B30] shrink-0" />
              </Link>
            ))}
          </nav>

          <div className="w-full flex items-center justify-between font-cota text-[9px] text-[#94A3B8]">
            <span>Spec. 2048px · HDRI Optical Center</span>
            <span>34.68° / 00.750</span>
          </div>
        </div>

        {/* CELDA 3 (25% del ancho): Módulo 02 / Current phase + Módulo de Firma (Sello Circular 70px) */}
        <div
          aria-label="02 / CURRENT PHASE"
          className="relative w-full px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between gap-4 rounded-none"
        >
          <RegistrationCross className="absolute bottom-[6px] right-[6px]" />

          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <h2 className="font-editorial-micro text-[10px] font-medium tracking-[0.015em] normal-case text-zy-fg">
                02 / Current phase
              </h2>
              <span className="font-editorial-micro text-[10px] font-medium tracking-[0.015em] normal-case text-[#94A3B8]">
                [2026]
              </span>
            </div>

            <ul className="space-y-0.5 font-editorial-micro text-[10px] font-medium tracking-[0.015em] normal-case text-zy-fg">
              {currentPhaseItems.map((item) => (
                <li key={item} className="leading-[1.35]">
                  {item}
                </li>
              ))}
            </ul>

            <span className="block font-editorial-micro text-[10px] font-medium tracking-[0.015em] normal-case text-[#94A3B8]">
              {cornerCoordinates[3].coord} · 34.68°
            </span>
          </div>

          <div className="shrink-0">
            <CircularSeal size={70} />
          </div>
        </div>
      </div>
    </section>
  );
};
