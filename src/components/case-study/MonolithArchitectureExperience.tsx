'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectDetail } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import {
  MONOLITH_STUDIO_META,
  MONOLITH_PILLARS,
  MONOLITH_PROJECTS,
  MONOLITH_MATERIALS,
  MONOLITH_GALLERY,
  MonolithProject,
  MonolithGalleryFrame,
} from '@/data/architecture';
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowDown,
  Check,
  Layers,
  Box,
  Download,
  X,
  Maximize2,
  Sun,
  Moon,
  ChevronRight,
  ShieldCheck,
  MapPin,
  Grid,
} from 'lucide-react';

interface MonolithArchitectureExperienceProps {
  project: ProjectDetail;
}

export const MonolithArchitectureExperience: React.FC<MonolithArchitectureExperienceProps> = ({ project }) => {
  const { language } = useLanguage();

  // Active Project Category Filter
  const [activeCategory, setActiveCategory] = useState<'all' | 'residential' | 'cultural' | 'commercial'>('all');

  // Active Project for Spatial Case Study
  const [selectedProjectId, setSelectedProjectId] = useState<string>('casa-bruma');
  const activeProject = MONOLITH_PROJECTS.find((p) => p.id === selectedProjectId) || MONOLITH_PROJECTS[0];

  // Plan / Drafting Inspector View Mode
  const [activeDraftingView, setActiveDraftingView] = useState<'axonometric' | 'section' | 'plan'>('axonometric');

  // Solar Light Simulation: Dawn (08:00), Zenith (12:30), Dusk (18:45)
  const [solarTime, setSolarTime] = useState<'dawn' | 'zenith' | 'dusk'>('dawn');

  // Active Tectonic Material
  const [activeMaterialId, setActiveMaterialId] = useState<string>('concrete-board');
  const activeMaterial = MONOLITH_MATERIALS.find((m) => m.id === activeMaterialId) || MONOLITH_MATERIALS[0];

  // Gallery Lightbox Modal
  const [lightboxFrame, setLightboxFrame] = useState<MonolithGalleryFrame | null>(null);

  // Project Drawer Detail Modal
  const [inspectProject, setInspectProject] = useState<MonolithProject | null>(null);

  // Commission Simulator State
  const [commissionType, setCommissionType] = useState<string>('residential');
  const [commissionSite, setCommissionSite] = useState<string>('cliff');
  const [commissionScale, setCommissionScale] = useState<string>('medium');
  const [commissionName, setCommissionName] = useState<string>('');
  const [commissionEmail, setCommissionEmail] = useState<string>('');
  const [commissionBrief, setCommissionBrief] = useState<string>('');
  const [simulationConfirmed, setSimulationConfirmed] = useState<boolean>(false);
  const [simulationCode, setSimulationCode] = useState<string>('');
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxFrame(null);
        setInspectProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredProjects = MONOLITH_PROJECTS.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  const handleConfirmSimulation = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = `MN-REQ-${Math.floor(1000 + Math.random() * 9000)}`;
    setSimulationCode(randomCode);
    setSimulationConfirmed(true);
  };

  const handleDownloadSpec = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3500);
  };

  return (
    <div className="min-h-screen bg-zy-bg text-zy-fg transition-colors duration-200">
      {/* 1. STUDIO MINIMALIST HEADER & ANCHOR NAVIGATION */}
      <header className="sticky top-16 z-30 bg-zy-bg/95 backdrop-blur-md border-b border-zy-border-subtle transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-3 sm:space-x-5">
            <Link
              href="/#work"
              className="inline-flex items-center space-x-1.5 text-xs font-mono text-zy-muted hover:text-zy-fg transition-colors pr-3 border-r border-zy-border"
              aria-label="Return to ZYRVAE portfolio"
            >
              <ArrowLeft size={13} />
              <span>ZYRVAE</span>
            </Link>

            <a
              href="#monolith-hero"
              onClick={(e) => scrollToSection(e, 'monolith-hero')}
              className="flex items-baseline space-x-2 text-zy-fg group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zy-blue rounded"
            >
              <span className="font-sans font-extrabold text-base tracking-widest uppercase">
                MONOLITH
              </span>
              <span className="font-mono text-[11px] text-zy-muted tracking-widest uppercase hidden sm:inline">
                // STUDIO
              </span>
            </a>
          </div>

          {/* In-page navigation links */}
          <nav
            aria-label="Studio Navigation"
            className="hidden md:flex items-center space-x-6 text-xs font-mono text-zy-muted"
          >
            <a
              href="#monolith-philosophy"
              onClick={(e) => scrollToSection(e, 'monolith-philosophy')}
              className="hover:text-zy-fg transition-colors"
            >
              {language === 'es' ? '01 // FILOSOFÍA' : '01 // PHILOSOPHY'}
            </a>
            <a
              href="#monolith-works"
              onClick={(e) => scrollToSection(e, 'monolith-works')}
              className="hover:text-zy-fg transition-colors"
            >
              {language === 'es' ? '02 // OBRAS' : '02 // WORKS'}
            </a>
            <a
              href="#monolith-study"
              onClick={(e) => scrollToSection(e, 'monolith-study')}
              className="hover:text-zy-fg transition-colors"
            >
              {language === 'es' ? '03 // CASO DE ESTUDIO' : '03 // STUDY'}
            </a>
            <a
              href="#monolith-tectonics"
              onClick={(e) => scrollToSection(e, 'monolith-tectonics')}
              className="hover:text-zy-fg transition-colors"
            >
              {language === 'es' ? '04 // MATERIA' : '04 // TECTONICS'}
            </a>
            <a
              href="#monolith-gallery"
              onClick={(e) => scrollToSection(e, 'monolith-gallery')}
              className="hover:text-zy-fg transition-colors"
            >
              {language === 'es' ? '05 // GALERÍA' : '05 // GALLERY'}
            </a>
          </nav>

          {/* Action & Concept Badge */}
          <div className="flex items-center space-x-2.5">
            <span className="hidden xl:inline-flex items-center px-2 py-0.5 rounded bg-zy-surface border border-zy-border text-[10px] font-mono text-zy-dim uppercase tracking-wider">
              [ CONCEPT PROJECT ]
            </span>
            <a
              href="#monolith-contact"
              onClick={(e) => scrollToSection(e, 'monolith-contact')}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-zy-fg text-zy-bg font-mono text-xs font-semibold hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zy-blue"
            >
              <span>{language === 'es' ? 'INICIAR ENCARGO' : 'START COMMISSION'}</span>
              <ArrowDown size={12} />
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* 2. HERO FOTOGRÁFICO A GRAN ESCALA: "Spaces shaped by light." */}
        <section
          id="monolith-hero"
          className="relative min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-between overflow-hidden border-b border-zy-border-subtle"
          aria-label="Monolith Studio Hero"
        >
          {/* Monumental Architectural Photographic Backdrop */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/monolith-hero.webp"
              alt="Monolith Studio - Spaces shaped by light - Board-formed concrete residence in nature"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            {/* Atmospheric gradient overlay respecting light/dark mode readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/35" />
          </div>

          {/* Top Hero Coordinate & Datum Bar */}
          <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#cbd4e6]">
              <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded bg-[#0b0e14]/75 backdrop-blur-md border border-white/15">
                <span className="w-1.5 h-1.5 rounded-full bg-zy-blue animate-pulse" />
                <span className="tracking-wider uppercase">
                  {language === 'es' ? 'ESTUDIO DE ARQUITECTURA CONCEPTUAL' : 'CONCEPTUAL ARCHITECTURE STUDIO'}
                </span>
              </div>
              <div className="px-2.5 py-1 rounded bg-[#0b0e14]/75 backdrop-blur-md border border-white/15 text-[11px] tracking-wider uppercase">
                LAT 49°18&apos;S · ELEV +48M · REF. MN-2025
              </div>
            </div>
          </div>

          {/* Hero Center Editorial Typography */}
          <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="max-w-4xl space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="font-mono text-xs text-[#9ba3b8] tracking-widest uppercase flex items-center space-x-2"
              >
                <span>MONOLITH ARCHITECTURAL PRACTICE</span>
                <span>—</span>
                <span>BASEL · OSLO · PATAGONIA</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-sans font-bold tracking-tight text-white leading-[1.05]"
              >
                Spaces shaped by light.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-base sm:text-xl text-[#d4dae8] font-sans max-w-2xl leading-relaxed"
              >
                {MONOLITH_STUDIO_META.heroTagline[language]}
              </motion.p>
            </div>
          </div>

          {/* Bottom Hero Anchor Bar */}
          <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 border-t border-white/10">
            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-[#a6b1c6]">
              <div className="flex items-center space-x-4">
                <span>VOLUMEN PURO</span>
                <span className="text-white/40">/</span>
                <span>HORMIGÓN VISTO</span>
                <span className="text-white/40">/</span>
                <span>PIEDRA NATURAL</span>
                <span className="text-white/40">/</span>
                <span>LUZ CENITAL</span>
              </div>

              <a
                href="#monolith-philosophy"
                onClick={(e) => scrollToSection(e, 'monolith-philosophy')}
                className="inline-flex items-center space-x-2 text-white hover:text-zy-blue transition-colors"
              >
                <span>{language === 'es' ? 'DESCUBRIR FILOSOFÍA' : 'EXPLORE PHILOSOPHY'}</span>
                <ArrowDown size={13} />
              </a>
            </div>
          </div>
        </section>

        {/* 3. PRESENTACIÓN BREVE DE LA FILOSOFÍA ARQUITECTÓNICA & ESTUDIO SOLAR */}
        <section
          id="monolith-philosophy"
          className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-zy-border-subtle scroll-mt-20"
          aria-label="Monolith Architectural Philosophy"
        >
          {/* Editorial Section Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 items-baseline pb-14 border-b border-zy-border-subtle">
            <div className="lg:col-span-4 space-y-2">
              <span className="font-mono text-xs uppercase tracking-widest text-zy-blue">
                {language === 'es' ? '01 // MANIFIESTO TECTÓNICO' : '01 // TECTONIC MANIFESTO'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-zy-fg">
                {language === 'es' ? 'La materia, el silencio y el horizonte.' : 'Matter, silence, and horizon.'}
              </h2>
            </div>

            <div className="lg:col-span-8 space-y-5">
              <p className="text-lg sm:text-2xl font-sans font-light text-zy-fg leading-relaxed">
                {language === 'es'
                  ? '«No añadimos formas innecesarias: sustraemos el ruido visual hasta que solo permanecen la luz, la masa mineral y la quietud del territorio.»'
                  : '“We do not add superfluous shapes: we subtract visual noise until only light, mineral mass, and the stillness of territory remain.”'}
              </p>
              <p className="text-sm sm:text-base text-zy-muted font-sans leading-relaxed">
                {MONOLITH_STUDIO_META.philosophyShort[language]}
              </p>
            </div>
          </div>

          {/* 4 Architectural Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-14 pb-16">
            {MONOLITH_PILLARS.map((pillar) => (
              <div
                key={pillar.number}
                className="p-6 rounded-xl bg-zy-card border border-zy-border-card flex flex-col justify-between space-y-6 transition-colors hover:border-zy-border-strong shadow-sm"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between font-mono text-xs text-zy-dim border-b border-zy-border-subtle pb-2">
                    <span className="text-zy-blue font-semibold">{pillar.code}</span>
                    <span>{pillar.number} / 04</span>
                  </div>

                  <h3 className="text-lg font-sans font-bold text-zy-fg">
                    {pillar.title[language]}
                  </h3>

                  <p className="text-xs sm:text-sm text-zy-muted font-sans leading-relaxed">
                    {pillar.desc[language]}
                  </p>
                </div>

                <div className="pt-3 border-t border-zy-border-subtle text-[11px] font-mono text-zy-fg-secondary">
                  {pillar.metric}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Daylight & Shadow Simulation Widget */}
          <div className="rounded-2xl border border-zy-border bg-zy-card overflow-hidden p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zy-border-subtle pb-5">
              <div className="space-y-1">
                <span className="font-mono text-xs text-zy-blue uppercase tracking-wider">
                  {language === 'es' ? 'HERRAMIENTA ESPACIAL // ESTUDIO SOLAR' : 'SPATIAL SIMULATOR // SOLAR CYCLE'}
                </span>
                <h4 className="font-sans font-bold text-lg text-zy-fg">
                  {language === 'es' ? 'Incidencia de luz rasante y sombras volumétricas' : 'Raking daylight incidence & volumetric shadow study'}
                </h4>
              </div>

              {/* Time of Day Switcher */}
              <div
                role="group"
                aria-label="Solar time of day"
                className="inline-flex rounded-lg bg-zy-surface p-1 border border-zy-border self-start sm:self-auto"
              >
                <button
                  type="button"
                  onClick={() => setSolarTime('dawn')}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-mono transition-all ${
                    solarTime === 'dawn'
                      ? 'bg-zy-blue text-white font-semibold'
                      : 'text-zy-muted hover:text-zy-fg'
                  }`}
                >
                  <Sun size={13} />
                  <span>{language === 'es' ? 'Amanecer 08:00' : 'Dawn 08:00'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSolarTime('zenith')}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-mono transition-all ${
                    solarTime === 'zenith'
                      ? 'bg-zy-blue text-white font-semibold'
                      : 'text-zy-muted hover:text-zy-fg'
                  }`}
                >
                  <Sun size={13} />
                  <span>{language === 'es' ? 'Cenit 12:30' : 'Zenith 12:30'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSolarTime('dusk')}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-mono transition-all ${
                    solarTime === 'dusk'
                      ? 'bg-zy-blue text-white font-semibold'
                      : 'text-zy-muted hover:text-zy-fg'
                  }`}
                >
                  <Moon size={13} />
                  <span>{language === 'es' ? 'Ocaso 18:45' : 'Dusk 18:45'}</span>
                </button>
              </div>
            </div>

            {/* Visual Solar Projection Canvas */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 bg-zy-surface rounded-xl border border-zy-border p-6 min-h-[260px] flex flex-col justify-between">
                <div className="flex justify-between items-center text-[11px] font-mono text-zy-muted border-b border-zy-border-subtle pb-3">
                  <span>
                    {solarTime === 'dawn' && (language === 'es' ? 'ÁNGULO SOLAR: 16° ESTE · LUZ RASANTE DORADA' : 'SOLAR ELEVATION: 16° EAST · GOLDEN RAKING LIGHT')}
                    {solarTime === 'zenith' && (language === 'es' ? 'ÁNGULO SOLAR: 74° CENITAL · ALTO CONTRASTE' : 'SOLAR ELEVATION: 74° ZENITH · HIGH MONOCHROME CONTRAST')}
                    {solarTime === 'dusk' && (language === 'es' ? 'ÁNGULO SOLAR: 8° OESTE · SOMBRAS PROFUNDAS' : 'SOLAR ELEVATION: 8° WEST · DEEP ELONGATED SHADOWS')}
                  </span>
                  <span className="text-zy-blue font-semibold">CASA BRUMA</span>
                </div>

                {/* SVG Geometric Shadow Visualizer */}
                <svg viewBox="0 0 500 200" className="w-full h-40 my-2" aria-hidden="true">
                  {/* Horizon ground datum line */}
                  <line x1="20" y1="160" x2="480" y2="160" stroke="var(--zy-border-strong)" strokeWidth="1" strokeDasharray="4,4" />

                  {/* Cast shadow polygon dynamically reacting to solar angle */}
                  {solarTime === 'dawn' && (
                    <polygon
                      points="180,160 380,160 450,178 260,178"
                      fill="var(--zy-blue)"
                      opacity="0.18"
                    />
                  )}
                  {solarTime === 'zenith' && (
                    <polygon
                      points="180,160 380,160 395,166 195,166"
                      fill="var(--zy-blue)"
                      opacity="0.30"
                    />
                  )}
                  {solarTime === 'dusk' && (
                    <polygon
                      points="180,160 380,160 110,185 40,185"
                      fill="var(--zy-blue)"
                      opacity="0.22"
                    />
                  )}

                  {/* Monolithic architectural massing box */}
                  {/* Cantilever roof plane */}
                  <polygon
                    points="180,90 280,50 380,90 280,130"
                    fill={solarTime === 'zenith' ? 'var(--zy-card-alt)' : 'var(--zy-card)'}
                    stroke="var(--zy-fg)"
                    strokeWidth="1.5"
                  />
                  {/* West Facade */}
                  <polygon
                    points="180,90 280,130 280,160 180,120"
                    fill={solarTime === 'dusk' ? 'var(--zy-card-alt)' : 'var(--zy-surface)'}
                    stroke="var(--zy-fg)"
                    strokeWidth="1.5"
                  />
                  {/* South Facade */}
                  <polygon
                    points="280,130 380,90 380,160 280,160"
                    fill={solarTime === 'dawn' ? 'var(--zy-card-alt)' : 'var(--zy-card)'}
                    stroke="var(--zy-fg)"
                    strokeWidth="1.5"
                  />

                  {/* Zenith skylight slit */}
                  <line x1="260" y1="60" x2="310" y2="80" stroke="var(--zy-blue)" strokeWidth="2.5" />

                  {/* Solar ray indicator */}
                  {solarTime === 'dawn' && (
                    <g stroke="var(--zy-blue)" strokeWidth="1" strokeDasharray="3,3" opacity="0.7">
                      <line x1="80" y1="30" x2="260" y2="100" />
                      <line x1="120" y1="20" x2="300" y2="90" />
                    </g>
                  )}
                  {solarTime === 'zenith' && (
                    <g stroke="var(--zy-blue)" strokeWidth="1" strokeDasharray="3,3" opacity="0.7">
                      <line x1="280" y1="10" x2="280" y2="50" />
                      <line x1="330" y1="10" x2="330" y2="70" />
                    </g>
                  )}
                  {solarTime === 'dusk' && (
                    <g stroke="var(--zy-blue)" strokeWidth="1" strokeDasharray="3,3" opacity="0.7">
                      <line x1="440" y1="40" x2="320" y2="110" />
                      <line x1="400" y1="30" x2="280" y2="100" />
                    </g>
                  )}
                </svg>

                <div className="flex justify-between items-center text-[10px] font-mono text-zy-dim">
                  <span>DATUM +14.4M // ESTUDIO DE ENVOLVENTE</span>
                  <span>ESTÁNDAR PASIVO PASSIVHAUS</span>
                </div>
              </div>

              {/* Solar readout notes */}
              <div className="lg:col-span-5 space-y-4 text-xs font-mono">
                <div className="p-4 bg-zy-surface rounded-xl border border-zy-border space-y-2">
                  <span className="text-zy-blue block uppercase font-semibold">
                    {language === 'es' ? 'Comportamiento Tectónico' : 'Tectonic Behavior'}
                  </span>
                  <p className="text-zy-muted font-sans text-xs leading-relaxed">
                    {solarTime === 'dawn' && (language === 'es'
                      ? 'La luz a 16° ingresa horizontalmente por el lucernario este, revelando las rugosidades del encofrado de alerce y calentando térmicamente el núcleo de hormigón.'
                      : 'Low 16° morning light penetrates horizontally through the east fissure, highlighting the rough timber grain and conductively preheating the concrete core.')}
                    {solarTime === 'zenith' && (language === 'es'
                      ? 'La radiación cenital es amortiguada por los aleros volados de 3.2m, manteniendo las estancias en sombra fresca sin carga térmica artificial.'
                      : 'Zenith overhead glare is naturally intercepted by 3.2m cantilevers, preserving temperate ambient coolness without air conditioning.')}
                    {solarTime === 'dusk' && (language === 'es'
                      ? 'Al caer la tarde, el muro de inercia libera el calor acumulado y la iluminación interior cálida transforma el monolito en una linterna sobre el paisaje.'
                      : 'At dusk, the thermal mass gently dissipates stored warmth while warm low-contrast lighting turns the residence into a lantern.')}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 bg-zy-surface rounded-lg border border-zy-border">
                    <span className="text-zy-dim block text-[10px] uppercase">
                      {language === 'es' ? 'Ahorro Lumínico' : 'Daylight Factor'}
                    </span>
                    <span className="text-zy-fg font-bold text-sm">94% Natural</span>
                  </div>
                  <div className="p-3 bg-zy-surface rounded-lg border border-zy-border">
                    <span className="text-zy-dim block text-[10px] uppercase">
                      {language === 'es' ? 'Inercia Térmica' : 'Thermal Lag'}
                    </span>
                    <span className="text-zy-blue font-bold text-sm">11.4 Horas</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. PORTFOLIO VISUAL DE PROYECTOS (RESIDENCIALES, CULTURALES, COMERCIALES) */}
        <section
          id="monolith-works"
          className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-zy-border-subtle scroll-mt-20"
          aria-label="Monolith Selected Works"
        >
          {/* Section Header with Typological Filter Tabs */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6 border-b border-zy-border-subtle pb-8">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-zy-blue">
                {language === 'es' ? '02 // PROYECTOS CONCEPTUALES' : '02 // CONCEPT PROJECTS'}
              </span>
              <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-zy-fg mt-2">
                {language === 'es' ? 'Obras seleccionadas.' : 'Selected works.'}
              </h2>
              <p className="text-sm sm:text-base text-zy-muted font-sans max-w-xl mt-3">
                {language === 'es'
                  ? 'Catálogo riguroso de proyectos residenciales, culturales y comerciales concebidos como ejercicios de pureza mineral y espacial.'
                  : 'A disciplined index of residential, cultural, and commercial projects engineered as studies in mineral mass and spatial clarity.'}
              </p>
            </div>

            {/* Typology Filters */}
            <div
              role="tablist"
              aria-label="Filter works by typology"
              className="flex flex-wrap items-center gap-1.5 p-1 bg-zy-control border border-zy-border rounded-lg self-start md:self-end"
            >
              {[
                { id: 'all' as const, label: language === 'es' ? 'TODAS (06)' : 'ALL (06)' },
                { id: 'residential' as const, label: language === 'es' ? 'RESIDENCIAL (03)' : 'RESIDENTIAL (03)' },
                { id: 'cultural' as const, label: language === 'es' ? 'CULTURAL (02)' : 'CULTURAL (02)' },
                { id: 'commercial' as const, label: language === 'es' ? 'COMERCIAL (01)' : 'COMMERCIAL (01)' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeCategory === tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-3 sm:px-3.5 py-1.5 rounded-md text-xs font-mono transition-colors duration-150 outline-none focus-visible:ring-1 focus-visible:ring-zy-blue ${
                    activeCategory === tab.id
                      ? 'bg-zy-control-active text-zy-fg font-semibold border border-zy-border shadow-sm'
                      : 'text-zy-muted hover:text-zy-fg'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Visual Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((proj) => (
                <motion.article
                  layout
                  key={proj.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="group rounded-xl bg-zy-card border border-zy-border-card hover:border-zy-border-strong transition-colors overflow-hidden flex flex-col justify-between shadow-sm"
                >
                  {/* Project Image Aspect Container */}
                  <div className="relative w-full aspect-[16/11] overflow-hidden bg-zy-surface">
                    <Image
                      src={proj.coverImage}
                      alt={`${proj.title[language]} - ${proj.subtitle[language]}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Subtle photographic vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                    {/* Metadata Badges Over Image */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono pointer-events-none">
                      <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-white/15 text-white uppercase tracking-wider">
                        {proj.code}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-white/15 text-zy-blue font-semibold uppercase">
                        [ CONCEPT ]
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-mono flex justify-between items-baseline">
                      <span className="text-[#cbd4e6]">{proj.location}</span>
                      <span className="text-white/80">{proj.year}</span>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6 flex flex-col justify-between flex-grow space-y-6">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-xs font-mono text-zy-muted">
                        <span className="text-zy-blue">{proj.categoryLabel[language]}</span>
                        <span>{proj.area}</span>
                      </div>

                      <h3 className="text-2xl font-sans font-bold text-zy-fg group-hover:text-zy-blue transition-colors">
                        {proj.title[language]}
                      </h3>

                      <p className="text-xs font-mono text-zy-dim uppercase">
                        {proj.primaryMaterial[language]}
                      </p>

                      <p className="text-xs sm:text-sm text-zy-muted font-sans leading-relaxed line-clamp-3">
                        {proj.concept[language]}
                      </p>
                    </div>

                    {/* Card Actions: Trigger deep case study or detail modal */}
                    <div className="pt-4 border-t border-zy-border-subtle flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedProjectId(proj.id);
                          const studyEl = document.getElementById('monolith-study');
                          if (studyEl) studyEl.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="inline-flex items-center space-x-1 text-xs font-mono text-zy-blue hover:underline"
                      >
                        <span>{language === 'es' ? 'Ficha técnica' : 'Spatial specs'}</span>
                        <ChevronRight size={13} />
                      </button>

                      <button
                        type="button"
                        onClick={() => setInspectProject(proj)}
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-zy-control hover:bg-zy-control-hover border border-zy-border text-xs font-mono text-zy-fg transition-colors"
                        aria-label={`Open detailed overview of ${proj.title[language]}`}
                      >
                        <span>{language === 'es' ? 'Ver proyecto' : 'Inspect project'}</span>
                        <ArrowUpRight size={13} />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* 5. CASO DE ESTUDIO PROFUNDO (FEATURED SPATIAL STUDY & PLAN DRAFTING INSPECTOR) */}
        <section
          id="monolith-study"
          className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-zy-border-subtle scroll-mt-20"
          aria-label="Monolith Deep Spatial Case Study"
        >
          <div className="space-y-12">
            {/* Header of Active Study Project */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-zy-border-subtle pb-8">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 font-mono text-xs text-zy-blue">
                  <span className="w-1.5 h-1.5 rounded-full bg-zy-blue" />
                  <span className="uppercase tracking-widest">
                    {language === 'es' ? '03 // CASO DE ESTUDIO TECTÓNICO' : '03 // TECTONIC CASE STUDY'}
                  </span>
                  <span className="text-zy-dim">| {activeProject.code}</span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-zy-fg">
                  {activeProject.title[language]}
                </h2>
                <p className="text-base sm:text-xl text-zy-muted font-sans max-w-2xl">
                  {activeProject.subtitle[language]}
                </p>
              </div>

              {/* Geographic & Structural Metadata Drawer */}
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                <span className="px-3 py-1.5 rounded-lg bg-zy-surface border border-zy-border text-zy-fg-secondary">
                  <MapPin size={12} className="inline mr-1 text-zy-blue" />
                  {activeProject.coordinates}
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-zy-surface border border-zy-border text-zy-fg-secondary">
                  {activeProject.elevation}
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-zy-surface border border-zy-border text-zy-fg-secondary">
                  {activeProject.area}
                </span>
              </div>
            </div>

            {/* Main Spatial Study Layout: Image + Spatial Decisions */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left Column: Visual Photography of Active Project */}
              <div className="lg:col-span-7 space-y-4">
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-zy-border bg-zy-surface shadow-sm">
                  <Image
                    src={activeProject.coverImage}
                    alt={activeProject.title[language]}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover"
                  />
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-baseline text-white text-xs font-mono bg-black/70 backdrop-blur-md px-3.5 py-2 rounded-lg border border-white/10">
                    <span>{activeProject.title[language]} // VISTA EXTERIOR</span>
                    <span className="text-[#a6b1c6]">{activeProject.location}</span>
                  </div>
                </div>

                {/* Sub-gallery of detail images */}
                <div className="grid grid-cols-3 gap-3">
                  {activeProject.detailImages.slice(0, 3).map((img, i) => (
                    <div
                      key={i}
                      className="relative aspect-video rounded-lg overflow-hidden border border-zy-border bg-zy-surface"
                    >
                      <Image
                        src={img}
                        alt={`${activeProject.title[language]} detail ${i + 1}`}
                        fill
                        sizes="25vw"
                        className="object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Spatial Decisions & Concept Commentary */}
              <div className="lg:col-span-5 space-y-6">
                <div className="p-6 bg-zy-card rounded-xl border border-zy-border space-y-4 shadow-sm">
                  <span className="text-xs font-mono uppercase text-zy-blue block">
                    {language === 'es' ? 'CONCEPTO ESPACIAL' : 'SPATIAL CONCEPT'}
                  </span>
                  <p className="text-sm font-sans text-zy-fg-secondary leading-relaxed">
                    {activeProject.concept[language]}
                  </p>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-mono uppercase text-zy-muted block">
                    {language === 'es' ? 'DECISIONES ESPACIALES CLAVE:' : 'KEY SPATIAL DECISIONS:'}
                  </span>

                  {activeProject.spatialDecisions.map((decision) => (
                    <div
                      key={decision.num}
                      className="p-4 bg-zy-surface rounded-xl border border-zy-border-subtle space-y-1.5"
                    >
                      <div className="flex items-center space-x-2 font-mono text-xs">
                        <span className="text-zy-blue font-bold">{decision.num}</span>
                        <span className="font-sans font-semibold text-zy-fg">
                          {decision.title[language]}
                        </span>
                      </div>
                      <p className="text-xs font-sans text-zy-muted leading-relaxed pl-5">
                        {decision.desc[language]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Plan & Drafting Inspector (Axonometric, Section AA, Level 01 Plan) */}
            <div className="rounded-2xl border border-zy-border bg-zy-card overflow-hidden shadow-sm">
              <div className="bg-zy-surface px-6 py-4 border-b border-zy-border flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center space-x-2 text-zy-blue">
                  <Layers size={14} />
                  <span className="font-semibold uppercase tracking-wider">
                    {language === 'es' ? 'DOCUMENTACIÓN PLANIMÉTRICA' : 'TECHNICAL DRAFTING SUITE'}
                  </span>
                  <span className="text-zy-dim">| {activeProject.code}</span>
                </div>

                {/* Drafting View Switcher */}
                <div
                  role="group"
                  aria-label="Drafting view modes"
                  className="inline-flex rounded-lg bg-zy-card p-1 border border-zy-border"
                >
                  <button
                    type="button"
                    onClick={() => setActiveDraftingView('axonometric')}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-mono transition-all ${
                      activeDraftingView === 'axonometric'
                        ? 'bg-zy-blue text-white font-semibold'
                        : 'text-zy-muted hover:text-zy-fg'
                    }`}
                  >
                    <Box size={13} />
                    <span>{language === 'es' ? 'Axonometría 3D' : 'Axonometric'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveDraftingView('section')}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-mono transition-all ${
                      activeDraftingView === 'section'
                        ? 'bg-zy-blue text-white font-semibold'
                        : 'text-zy-muted hover:text-zy-fg'
                    }`}
                  >
                    <Layers size={13} />
                    <span>{language === 'es' ? 'Sección AA' : 'Section AA'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveDraftingView('plan')}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-mono transition-all ${
                      activeDraftingView === 'plan'
                        ? 'bg-zy-blue text-white font-semibold'
                        : 'text-zy-muted hover:text-zy-fg'
                    }`}
                  >
                    <Grid size={13} />
                    <span>{language === 'es' ? 'Planta Nivel 01' : 'Level 01 Plan'}</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Drafting Canvas */}
              <div className="p-6 sm:p-8 bg-zy-surface/60">
                {activeDraftingView === 'axonometric' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs font-mono text-zy-muted">
                      <span>{language === 'es' ? 'ESTUDIO VOLUMÉTRICO ISOMÉTRICO (30° / 30°)' : 'ISOMETRIC VOLUMETRIC MASSING (30° / 30°)'}</span>
                      <span className="text-zy-blue">DATUM +48.0M</span>
                    </div>

                    <div className="bg-zy-card rounded-xl border border-zy-border p-6 flex flex-col items-center justify-center">
                      <svg viewBox="0 0 500 240" className="w-full max-w-xl h-56" aria-hidden="true">
                        {/* Coordinate axes */}
                        <line x1="250" y1="20" x2="250" y2="220" stroke="var(--zy-border)" strokeDasharray="3,3" />
                        <line x1="50" y1="120" x2="450" y2="120" stroke="var(--zy-border)" strokeDasharray="3,3" />

                        {/* Cantilever Monolith Mass */}
                        {/* Upper Roof */}
                        <polygon
                          points="250,40 370,100 250,160 130,100"
                          fill="var(--zy-surface)"
                          stroke="var(--zy-blue)"
                          strokeWidth="2"
                        />
                        {/* South Face */}
                        <polygon
                          points="250,160 370,100 370,190 250,220"
                          fill="var(--zy-card-alt)"
                          stroke="var(--zy-border-strong)"
                          strokeWidth="1.5"
                        />
                        {/* West Cantilever Face */}
                        <polygon
                          points="130,100 250,160 250,220 130,160"
                          fill="var(--zy-surface)"
                          stroke="var(--zy-fg)"
                          strokeWidth="1.5"
                        />

                        {/* Cliff Bedrock Strata */}
                        <path
                          d="M40,210 Q140,215 250,220 T460,205 L460,235 L40,235 Z"
                          fill="var(--zy-surface)"
                          stroke="var(--zy-dim)"
                          strokeWidth="1"
                        />

                        {/* Annotations */}
                        <text x="135" y="90" fill="var(--zy-muted)" fontSize="10" fontFamily="monospace">
                          VOLADIZO 6.0M
                        </text>
                        <text x="310" y="70" fill="var(--zy-blue)" fontSize="10" fontFamily="monospace">
                          EJE ESTRUCTURAL VIERENDEEL
                        </text>
                      </svg>
                      <p className="font-mono text-xs text-zy-dim text-center mt-2">
                        {language === 'es'
                          ? 'Diagrama de masa: equilibrio entre el empotramiento en roca y el voladizo sobre el acantilado'
                          : 'Massing balance: granite bedrock anchoring counterbalancing the oceanic cliff cantilever'}
                      </p>
                    </div>
                  </div>
                )}

                {activeDraftingView === 'section' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs font-mono text-zy-muted">
                      <span>{language === 'es' ? 'CORTE TRANSVERSAL AA ESTE-OESTE' : 'EAST-WEST TRANSVERSE SECTION AA'}</span>
                      <span className="text-zy-blue">ESCALA 1:100</span>
                    </div>

                    <div className="p-6 bg-zy-card rounded-xl border border-zy-border font-mono text-xs space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-zy-border-subtle">
                        <span className="font-bold text-zy-fg">NIVEL +14.40M</span>
                        <span className="text-zy-blue">{language === 'es' ? 'Lucernario cenital rasante & cubierta vegetal' : 'Linear zenith skylight & sedum green roof'}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-zy-border-subtle">
                        <span className="font-bold text-zy-fg">NIVEL +10.80M</span>
                        <span className="text-zy-fg-secondary">{language === 'es' ? 'Estudio privado, biblioteca y mirador suspendido' : 'Private studio, spatial library & suspended overlook'}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-zy-border-subtle">
                        <span className="font-bold text-zy-fg">NIVEL +7.20M</span>
                        <span className="text-zy-fg-secondary">{language === 'es' ? 'Salón diáfano continuo, hogar y terraza en voladizo' : 'Open living pavilion, central hearth & cantilever terrace'}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-zy-border-subtle">
                        <span className="font-bold text-zy-fg">NIVEL ±0.00M</span>
                        <span className="text-zy-muted">{language === 'es' ? 'Patio sotaventado de abrigo y estanque de basalto' : 'Sheltered leeward courtyard & basalt reflecting pool'}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="font-bold text-zy-dim">NIVEL -3.60M</span>
                        <span className="text-zy-dim">{language === 'es' ? 'Cimentación directa sobre estrato de roca granítica' : 'Direct bedrock anchorage on solid granite strata'}</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeDraftingView === 'plan' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs font-mono text-zy-muted">
                      <span>{language === 'es' ? 'PLANTA GENERAL // NIVEL 01 (+7.20M)' : 'GENERAL FLOOR PLAN // LEVEL 01 (+7.20M)'}</span>
                      <span className="text-zy-blue">ÁREA 440 M²</span>
                    </div>

                    <div className="p-6 bg-zy-card rounded-xl border border-zy-border font-mono text-xs space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-3 bg-zy-surface rounded border border-zy-border-subtle space-y-1">
                          <span className="text-zy-blue block font-semibold">ZONA 01 // PABELLÓN DE ESTAR</span>
                          <span className="text-zy-muted text-[11px] block">160 m² · Techo a 4.2m · Suelo de caliza fósil continua</span>
                        </div>
                        <div className="p-3 bg-zy-surface rounded border border-zy-border-subtle space-y-1">
                          <span className="text-zy-blue block font-semibold">ZONA 02 // PATIO CONTEMPLATIVO</span>
                          <span className="text-zy-muted text-[11px] block">85 m² · Estanque de basalto · Abierto al cielo</span>
                        </div>
                        <div className="p-3 bg-zy-surface rounded border border-zy-border-subtle space-y-1">
                          <span className="text-zy-blue block font-semibold">ZONA 03 // ALAS DE DESCANSO</span>
                          <span className="text-zy-muted text-[11px] block">120 m² · Aislamiento acústico Rw 51 dB · Vista este</span>
                        </div>
                        <div className="p-3 bg-zy-surface rounded border border-zy-border-subtle space-y-1">
                          <span className="text-zy-blue block font-semibold">ZONA 04 // VOLADIZO MIRADOR</span>
                          <span className="text-zy-muted text-[11px] block">75 m² · Vuelo libre de 6m sobre el océano</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Technical Download Bar */}
                <div className="mt-6 pt-5 border-t border-zy-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs font-mono text-zy-dim text-center sm:text-left">
                    {language === 'es'
                      ? 'Documentación técnica completa disponible para comisiones de arquitectura y concursos.'
                      : 'Comprehensive technical documentation available for commissions and institutional competitions.'}
                  </span>

                  <button
                    type="button"
                    onClick={handleDownloadSpec}
                    className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-zy-fg text-zy-bg font-mono text-xs font-semibold hover:opacity-90 transition-opacity"
                  >
                    <Download size={13} />
                    <span>
                      {downloadSuccess
                        ? language === 'es' ? '✓ Monografía generada (Demo)' : '✓ Monograph generated (Demo)'
                        : language === 'es' ? 'Descargar monografía técnica (PDF)' : 'Download technical monograph (PDF)'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. MATRIZ TECTÓNICA Y MATERIA (CONCRETE, LIMESTONE, WOOD, GLASS) */}
        <section
          id="monolith-tectonics"
          className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-zy-border-subtle scroll-mt-20"
          aria-label="Monolith Tectonic Material Matrix"
        >
          <div className="space-y-12">
            <div className="max-w-3xl space-y-2">
              <span className="font-mono text-xs uppercase tracking-widest text-zy-blue">
                {language === 'es' ? '04 // HONESTIDAD MATERIAL' : '04 // MATERIAL HONESTY'}
              </span>
              <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-zy-fg">
                {language === 'es' ? 'La matriz tectónica.' : 'The tectonic matrix.'}
              </h2>
              <p className="text-sm sm:text-base text-zy-muted font-sans mt-3">
                {language === 'es'
                  ? 'Cada material es elegido por su peso, su capacidad de envejecimiento noble y su interacción táctil con la luz y la sombra.'
                  : 'Every material is specified for its mass, noble weathering capacity, and tactile interaction with light and shadow.'}
              </p>
            </div>

            {/* Material Selector Buttons */}
            <div
              role="tablist"
              aria-label="Material types"
              className="flex flex-wrap gap-2 pb-2"
            >
              {MONOLITH_MATERIALS.map((mat) => (
                <button
                  key={mat.id}
                  type="button"
                  role="tab"
                  aria-selected={activeMaterialId === mat.id}
                  onClick={() => setActiveMaterialId(mat.id)}
                  className={`px-4 py-2.5 rounded-lg text-xs font-mono transition-all flex items-center space-x-2 border ${
                    activeMaterialId === mat.id
                      ? 'bg-zy-blue text-white border-zy-blue font-semibold shadow-sm'
                      : 'bg-zy-card border-zy-border text-zy-muted hover:text-zy-fg'
                  }`}
                >
                  <span className="opacity-75">{mat.code}</span>
                  <span>//</span>
                  <span>{mat.name[language].split(' ')[0]}</span>
                </button>
              ))}
            </div>

            {/* Active Material Detail Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-2xl bg-zy-card border border-zy-border p-6 sm:p-10 shadow-sm">
              {/* Macro Texture Photo */}
              <div className="lg:col-span-5 space-y-3">
                <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square rounded-xl overflow-hidden border border-zy-border bg-zy-surface shadow-sm">
                  <Image
                    src={activeMaterial.image}
                    alt={activeMaterial.name[language]}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded border border-white/10 text-[10px] font-mono text-white">
                    {activeMaterial.code}
                  </div>
                </div>
                <div className="text-[11px] font-mono text-zy-dim text-center">
                  {language === 'es' ? 'FOTOGRAFÍA MACRO DE TEXTURA SUPERFICIAL' : 'SURFACE TEXTURE MACRO PHOTOGRAPHY'}
                </div>
              </div>

              {/* Technical Spec Matrix */}
              <div className="lg:col-span-7 space-y-6">
                <div className="border-b border-zy-border-subtle pb-4 space-y-1">
                  <span className="text-xs font-mono text-zy-blue uppercase tracking-wider">
                    {activeMaterial.category[language]}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-sans font-bold text-zy-fg">
                    {activeMaterial.name[language]}
                  </h3>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-3 bg-zy-surface rounded-lg border border-zy-border-subtle">
                    <span className="text-zy-dim block text-[10px] uppercase">
                      {language === 'es' ? 'Densidad aparente:' : 'Apparent density:'}
                    </span>
                    <span className="text-zy-fg font-semibold mt-0.5 block">
                      {activeMaterial.properties.density}
                    </span>
                  </div>

                  <div className="p-3 bg-zy-surface rounded-lg border border-zy-border-subtle">
                    <span className="text-zy-dim block text-[10px] uppercase">
                      {language === 'es' ? 'Comportamiento acústico:' : 'Acoustic rating:'}
                    </span>
                    <span className="text-zy-fg font-semibold mt-0.5 block">
                      {activeMaterial.properties.acoustic}
                    </span>
                  </div>

                  <div className="p-3 bg-zy-surface rounded-lg border border-zy-border-subtle sm:col-span-2">
                    <span className="text-zy-dim block text-[10px] uppercase">
                      {language === 'es' ? 'Tratamiento superficial y acabado:' : 'Surface finish & treatment:'}
                    </span>
                    <span className="text-zy-fg font-sans text-xs mt-1 block">
                      {activeMaterial.properties.finish[language]}
                    </span>
                  </div>

                  <div className="p-3 bg-zy-surface rounded-lg border border-zy-border-subtle sm:col-span-2">
                    <span className="text-zy-dim block text-[10px] uppercase">
                      {language === 'es' ? 'Criterio sostenible y huella de carbono:' : 'Sustainability & embodied carbon:'}
                    </span>
                    <span className="text-zy-blue font-sans text-xs mt-1 block">
                      {activeMaterial.properties.sustainability[language]}
                    </span>
                  </div>
                </div>

                {/* Tectonic Notes */}
                <div className="p-4 bg-zy-surface/50 rounded-xl border border-zy-border text-xs font-mono text-zy-muted space-y-1">
                  <span className="text-zy-fg font-semibold block uppercase text-[10px]">
                    {language === 'es' ? 'NOTA DE ENSAMBLE TECTÓNICO' : 'TECTONIC DETAILING NOTE'}
                  </span>
                  <p className="font-sans leading-relaxed">
                    {activeMaterial.tectonicNotes[language]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. GALERÍA EDITORIAL CINEMATOGRÁFICA CON LIGHTBOX ACCESIBLE */}
        <section
          id="monolith-gallery"
          className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-zy-border-subtle scroll-mt-20"
          aria-label="Monolith Editorial Gallery"
        >
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zy-border-subtle pb-8">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-zy-blue">
                  {language === 'es' ? '05 // REGISTRO EDITORIAL' : '05 // EDITORIAL MONOGRAPH'}
                </span>
                <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-zy-fg mt-2">
                  {language === 'es' ? 'Atmósferas y sombras.' : 'Atmospheres & shadow.'}
                </h2>
                <p className="text-sm sm:text-base text-zy-muted font-sans max-w-xl mt-3">
                  {language === 'es'
                    ? 'Fotografía arquitectónica cinematográfica de patios minerales, escaleras monumentales y encuentros tectónicos.'
                    : 'Cinematic architectural photography of mineral courtyards, monumental stairs, and tectonic junctions.'}
                </p>
              </div>

              <span className="text-xs font-mono text-zy-dim self-start md:self-end">
                {language === 'es' ? 'HACÉ CLIC PARA AMPLIAR EN ALTA RESOLUCIÓN' : 'CLICK TO EXPAND HIGH-RESOLUTION VIEW'}
              </span>
            </div>

            {/* Asymmetric Architectural Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {MONOLITH_GALLERY.map((frame, index) => {
                const isWide = index === 0 || index === 4;
                return (
                  <div
                    key={frame.id}
                    onClick={() => setLightboxFrame(frame)}
                    className={`${
                      isWide ? 'sm:col-span-2' : 'sm:col-span-1'
                    } group relative aspect-[16/11] rounded-xl overflow-hidden border border-zy-border-card bg-zy-surface cursor-pointer shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zy-blue`}
                    tabIndex={0}
                    role="button"
                    aria-label={`Open photography: ${frame.title[language]}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setLightboxFrame(frame);
                      }
                    }}
                  >
                    <Image
                      src={frame.image}
                      alt={frame.title[language]}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                    {/* Frame Badges */}
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-center text-[10px] font-mono text-white/90">
                      <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/10 uppercase">
                        {frame.meta.focalLength} · {frame.meta.aperture}
                      </span>
                      <span className="p-1 rounded bg-black/70 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 size={12} />
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white space-y-1">
                      <span className="font-mono text-[10px] text-[#9ba3b8] block uppercase">
                        {frame.location}
                      </span>
                      <h4 className="font-sans font-semibold text-sm line-clamp-1">
                        {frame.title[language]}
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 8. CTA DE ENCARGO ARQUITECTÓNICO & CONTACTO HONESTO */}
        <section
          id="monolith-contact"
          className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20"
          aria-label="Commission Monolith Architecture"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Studio Intent & Practice Colophon */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <span className="font-mono text-xs uppercase tracking-widest text-zy-blue">
                  {language === 'es' ? '06 // COMISIONES & CONTACTO' : '06 // COMMISSIONS & CONTACT'}
                </span>
                <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-zy-fg">
                  {language === 'es' ? 'Iniciar diálogo espacial.' : 'Begin spatial dialogue.'}
                </h2>
                <p className="text-sm sm:text-base text-zy-muted font-sans leading-relaxed">
                  {language === 'es'
                    ? 'Aceptamos un número limitado de encargos privados e institucionales por año para garantizar un rigor tectónico exhaustivo en cada fase de proyecto.'
                    : 'We accept a limited number of private and institutional commissions annually to ensure exhaustive tectonic rigor across every project phase.'}
                </p>
              </div>

              {/* Studio Offices */}
              <div className="space-y-4 pt-4 border-t border-zy-border-subtle">
                <span className="text-xs font-mono text-zy-dim uppercase block">
                  {language === 'es' ? 'SEDES CONCEPTUALES:' : 'STUDIO LOCATIONS:'}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                  {MONOLITH_STUDIO_META.offices.map((office) => (
                    <div
                      key={office.city}
                      className="p-3 bg-zy-card rounded-lg border border-zy-border space-y-1"
                    >
                      <span className="text-zy-blue font-bold block">{office.city}</span>
                      <span className="text-zy-dim text-[10px] block">{office.coords}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Honest Concept Notice */}
              <div className="p-4 rounded-xl bg-zy-surface border border-zy-border text-xs font-mono space-y-2 text-zy-muted">
                <div className="flex items-center space-x-2 text-zy-fg font-semibold">
                  <ShieldCheck size={14} className="text-zy-blue" />
                  <span>{language === 'es' ? 'Declaración de Proyecto Conceptual' : 'Conceptual Project Declaration'}</span>
                </div>
                <p className="leading-relaxed">
                  {language === 'es'
                    ? `${project.title} es una experiencia web conceptual desarrollada por ZYRVAE Digital Studio. Todos los planos, proyectos, fotografías y especificaciones se presentan con fines demostrativos de diseño y arquitectura digital.`
                    : `${project.title} is a conceptual architectural web experience crafted by ZYRVAE Digital Studio. All blueprints, projects, photography, and specifications are presented for digital design demonstration.`}
                </p>
              </div>
            </div>

            {/* Right: Architectural Commission Simulator Form */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-zy-card border border-zy-border p-6 sm:p-10 shadow-sm">
                {simulationConfirmed ? (
                  <div className="space-y-6 text-center py-8">
                    <div className="w-14 h-14 mx-auto rounded-full bg-zy-blue/10 border border-zy-blue flex items-center justify-center text-zy-blue">
                      <Check size={28} />
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-mono text-zy-blue uppercase tracking-widest">
                        {language === 'es' ? 'REGISTRO DE DEMOSTRACIÓN EXITOSO' : 'DEMO INQUIRY REGISTERED'}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-sans font-bold text-zy-fg">
                        {language === 'es' ? 'Encargo Registrado' : 'Commission Registered'}
                      </h3>
                      <p className="font-mono text-xs text-zy-muted">
                        EXPEDIENTE: <span className="text-zy-blue font-bold">{simulationCode}</span>
                      </p>
                    </div>

                    <p className="text-sm text-zy-muted font-sans max-w-md mx-auto leading-relaxed">
                      {language === 'es'
                        ? 'Esta simulación confirma el flujo de consulta arquitectónica de MONOLITH STUDIO. Ninguna comisión real ha sido contratada.'
                        : 'This simulation confirms MONOLITH STUDIO’s commission funnel. No real contractual commitment has been incurred.'}
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setSimulationConfirmed(false);
                        setSimulationCode('');
                      }}
                      className="px-5 py-2.5 rounded-lg bg-zy-control hover:bg-zy-control-hover border border-zy-border text-xs font-mono text-zy-fg transition-colors"
                    >
                      {language === 'es' ? 'Simular otra consulta' : 'Simulate another inquiry'}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleConfirmSimulation} className="space-y-6">
                    <div className="border-b border-zy-border-subtle pb-4">
                      <h3 className="text-xl font-sans font-bold text-zy-fg">
                        {language === 'es' ? 'Simular solicitud de encargo' : 'Simulate project commission'}
                      </h3>
                      <p className="text-xs font-mono text-zy-muted mt-1">
                        {language === 'es'
                          ? 'Completá los parámetros del proyecto para generar el expediente demostrativo.'
                          : 'Complete architectural project parameters to generate simulated record.'}
                      </p>
                    </div>

                    {/* Typology Select */}
                    <div className="space-y-2">
                      <label className="block text-xs font-mono text-zy-muted uppercase">
                        {language === 'es' ? '1. Tipología de proyecto:' : '1. Project typology:'}
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
                        {[
                          { id: 'residential', label: language === 'es' ? 'Residencial' : 'Residential' },
                          { id: 'cultural', label: language === 'es' ? 'Cultural' : 'Cultural' },
                          { id: 'commercial', label: language === 'es' ? 'Pabellón' : 'Pavilion' },
                        ].map((typ) => (
                          <button
                            key={typ.id}
                            type="button"
                            onClick={() => setCommissionType(typ.id)}
                            className={`p-2.5 rounded-lg border text-center transition-all ${
                              commissionType === typ.id
                                ? 'bg-zy-blue text-white border-zy-blue font-semibold shadow-sm'
                                : 'bg-zy-surface border-zy-border text-zy-muted hover:text-zy-fg'
                            }`}
                          >
                            {typ.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Site Context Select */}
                    <div className="space-y-2">
                      <label className="block text-xs font-mono text-zy-muted uppercase">
                        {language === 'es' ? '2. Contexto geográfico del terreno:' : '2. Site geography:'}
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
                        {[
                          { id: 'cliff', label: language === 'es' ? 'Acantilado / Costa' : 'Coast / Cliff' },
                          { id: 'alpine', label: language === 'es' ? 'Montaña / Nieve' : 'Alpine / Snow' },
                          { id: 'forest', label: language === 'es' ? 'Bosque / Selva' : 'Forest / Woods' },
                        ].map((site) => (
                          <button
                            key={site.id}
                            type="button"
                            onClick={() => setCommissionSite(site.id)}
                            className={`p-2.5 rounded-lg border text-center transition-all ${
                              commissionSite === site.id
                                ? 'bg-zy-blue text-white border-zy-blue font-semibold shadow-sm'
                                : 'bg-zy-surface border-zy-border text-zy-muted hover:text-zy-fg'
                            }`}
                          >
                            {site.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Scale Select */}
                    <div className="space-y-2">
                      <label className="block text-xs font-mono text-zy-muted uppercase">
                        {language === 'es' ? '3. Escala estimada:' : '3. Estimated scale:'}
                      </label>
                      <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                        {[
                          { id: 'small', label: '< 400 m²' },
                          { id: 'medium', label: '400–1,200 m²' },
                          { id: 'monumental', label: '> 1,200 m²' },
                        ].map((sc) => (
                          <button
                            key={sc.id}
                            type="button"
                            onClick={() => setCommissionScale(sc.id)}
                            className={`p-2.5 rounded-lg border text-center transition-all ${
                              commissionScale === sc.id
                                ? 'bg-zy-blue text-white border-zy-blue font-semibold shadow-sm'
                                : 'bg-zy-surface border-zy-border text-zy-muted hover:text-zy-fg'
                            }`}
                          >
                            {sc.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Client Name & Contact */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-mono text-zy-muted uppercase">
                          {language === 'es' ? 'Comitente / Nombre:' : 'Client Name:'}
                        </label>
                        <input
                          type="text"
                          required
                          value={commissionName}
                          onChange={(e) => setCommissionName(e.target.value)}
                          placeholder="Elena Vance"
                          className="w-full px-3.5 py-2 rounded-lg bg-zy-surface border border-zy-border text-zy-fg text-xs font-mono focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zy-blue"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-mono text-zy-muted uppercase">
                          {language === 'es' ? 'Correo electrónico:' : 'Email:'}
                        </label>
                        <input
                          type="email"
                          required
                          value={commissionEmail}
                          onChange={(e) => setCommissionEmail(e.target.value)}
                          placeholder="vance@studio.ch"
                          className="w-full px-3.5 py-2 rounded-lg bg-zy-surface border border-zy-border text-zy-fg text-xs font-mono focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zy-blue"
                        />
                      </div>
                    </div>

                    {/* Brief Note */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono text-zy-muted uppercase">
                        {language === 'es' ? 'Aspiraciones arquitectónicas / Brief:' : 'Architectural aspirations / Brief:'}
                      </label>
                      <textarea
                        rows={3}
                        value={commissionBrief}
                        onChange={(e) => setCommissionBrief(e.target.value)}
                        placeholder={
                          language === 'es'
                            ? 'Buscamos una residencia de hormigón en voladizo con luz cenital rasante...'
                            : 'We seek a cantilevered concrete retreat with continuous zenith raking light...'
                        }
                        className="w-full px-3.5 py-2 rounded-lg bg-zy-surface border border-zy-border text-zy-fg text-xs font-mono focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zy-blue resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full py-3 rounded-lg bg-zy-fg text-zy-bg font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zy-blue"
                    >
                      {language === 'es' ? 'Registrar consulta (Simulación)' : 'Submit commission (Simulation)'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 9. STUDIO MINIMALIST FOOTER & RETURN TO ZYRVAE */}
      <footer className="border-t border-zy-border-subtle bg-zy-surface py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-zy-muted">
          <div className="flex items-center space-x-3">
            <span className="font-sans font-bold text-sm text-zy-fg tracking-widest uppercase">
              MONOLITH
            </span>
            <span className="text-zy-dim">/</span>
            <span>{MONOLITH_STUDIO_META.descriptor[language]}</span>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href="#monolith-hero"
              onClick={(e) => scrollToSection(e, 'monolith-hero')}
              className="hover:text-zy-fg transition-colors"
            >
              {language === 'es' ? '↑ Volver arriba' : '↑ Back to top'}
            </a>
            <Link
              href="/#work"
              className="text-zy-blue hover:underline flex items-center space-x-1"
            >
              <span>{language === 'es' ? 'Explorar ZYRVAE' : 'Explore ZYRVAE'}</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>
      </footer>

      {/* 10. LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxFrame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={lightboxFrame.title[language]}
          >
            {/* Top Lightbox Bar */}
            <div className="flex items-center justify-between text-xs font-mono text-white/80 border-b border-white/10 pb-4">
              <div className="flex items-center space-x-3">
                <span className="text-zy-blue font-bold">MONOLITH // REGISTRO</span>
                <span>—</span>
                <span className="uppercase">{lightboxFrame.location}</span>
              </div>

              <button
                type="button"
                onClick={() => setLightboxFrame(null)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
                aria-label="Close image modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Lightbox Center Image */}
            <div className="relative flex-grow my-4 flex items-center justify-center min-h-[300px]">
              <div className="relative w-full h-full max-h-[75vh] aspect-[16/10]">
                <Image
                  src={lightboxFrame.image}
                  alt={lightboxFrame.title[language]}
                  fill
                  sizes="95vw"
                  className="object-contain"
                />
              </div>
            </div>

            {/* Bottom Lightbox Meta Bar */}
            <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-white/80">
              <div>
                <h4 className="font-sans font-bold text-base text-white">
                  {lightboxFrame.title[language]}
                </h4>
                <p className="text-white/60 font-sans text-xs mt-0.5">
                  {lightboxFrame.subject[language]}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#a6b1c6]">
                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">
                  {lightboxFrame.meta.focalLength}
                </span>
                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">
                  {lightboxFrame.meta.aperture}
                </span>
                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">
                  {lightboxFrame.meta.orientation}
                </span>
                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">
                  {lightboxFrame.meta.lightCondition[language]}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 11. PROJECT INSPECT DRAWER / MODAL */}
      <AnimatePresence>
        {inspectProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={inspectProject.title[language]}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-zy-card border border-zy-border rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl text-zy-fg"
            >
              <div className="flex items-start justify-between border-b border-zy-border-subtle pb-4">
                <div>
                  <div className="flex items-center space-x-2 text-xs font-mono text-zy-blue mb-1">
                    <span>{inspectProject.code}</span>
                    <span>//</span>
                    <span>{inspectProject.categoryLabel[language]}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-sans font-bold">
                    {inspectProject.title[language]}
                  </h3>
                  <p className="text-sm font-sans text-zy-muted">
                    {inspectProject.subtitle[language]}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setInspectProject(null)}
                  className="p-2 rounded-lg bg-zy-control hover:bg-zy-control-hover border border-zy-border text-zy-fg transition-colors"
                  aria-label="Close project modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Cover in Modal */}
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-zy-border bg-zy-surface">
                <Image
                  src={inspectProject.coverImage}
                  alt={inspectProject.title[language]}
                  fill
                  sizes="80vw"
                  className="object-cover"
                />
              </div>

              <div className="space-y-4">
                <span className="text-xs font-mono text-zy-blue uppercase tracking-wider block">
                  {language === 'es' ? 'MEMORIA ARQUITECTÓNICA' : 'ARCHITECTURAL MEMORANDUM'}
                </span>
                <p className="text-sm font-sans text-zy-fg-secondary leading-relaxed">
                  {inspectProject.concept[language]}
                </p>
              </div>

              {/* Specifications List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono pt-4 border-t border-zy-border-subtle">
                {inspectProject.specifications.map((spec, i) => (
                  <div key={i} className="p-3 bg-zy-surface rounded-lg border border-zy-border-subtle">
                    <span className="text-zy-dim block text-[10px] uppercase">
                      {spec.label[language]}
                    </span>
                    <span className="text-zy-fg font-semibold mt-0.5 block">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-zy-border-subtle flex justify-end">
                <button
                  type="button"
                  onClick={() => setInspectProject(null)}
                  className="px-5 py-2 rounded-lg bg-zy-fg text-zy-bg font-mono text-xs font-semibold hover:opacity-90 transition-opacity"
                >
                  {language === 'es' ? 'Cerrar ficha' : 'Close project'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
