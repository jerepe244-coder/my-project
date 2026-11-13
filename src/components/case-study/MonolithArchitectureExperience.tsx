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
  MonolithGalleryFrame,
} from '@/data/architecture';
import {
  ArrowLeft,
  ArrowDown,
  Check,
  X,
  Maximize2,
  Sun,
  Moon,
  ShieldCheck,
} from 'lucide-react';

interface MonolithArchitectureExperienceProps {
  project: ProjectDetail;
}

// Solar Light Simulation Anchor Minutes (08:00 to 18:45)
const DAWN_MIN = 480; // 08:00
const ZENITH_MIN = 750; // 12:30
const SUNSET_MIN = 1125; // 18:45

export const MonolithArchitectureExperience: React.FC<MonolithArchitectureExperienceProps> = ({ project }) => {
  const { language } = useLanguage();

  // Active Project Category Filter
  const [activeCategory, setActiveCategory] = useState<'all' | 'residential' | 'cultural' | 'commercial'>('all');

  // Active Project for Spatial Case Study (Default to Casa Bruma)
  const [selectedProjectId, setSelectedProjectId] = useState<string>('casa-bruma');
  const activeProject = MONOLITH_PROJECTS.find((p) => p.id === selectedProjectId) || MONOLITH_PROJECTS[0];

  // Continuous Solar Simulation (08:00 to 18:45) — FASE 2 PREPARATION
  const [solarMinutes, setSolarMinutes] = useState<number>(750); // Default to Zenith (12:30)

  // Solar Crossfade Calculation across 3 Photorealistic Render Layers
  let opacityDawn = 0;
  let opacityZenith = 0;
  let opacitySunset = 0;

  if (solarMinutes <= ZENITH_MIN) {
    const alpha = (solarMinutes - DAWN_MIN) / (ZENITH_MIN - DAWN_MIN);
    opacityDawn = Math.max(0, Math.min(1, 1 - alpha));
    opacityZenith = Math.max(0, Math.min(1, alpha));
    opacitySunset = 0;
  } else {
    const beta = (solarMinutes - ZENITH_MIN) / (SUNSET_MIN - ZENITH_MIN);
    opacityDawn = 0;
    opacityZenith = Math.max(0, Math.min(1, 1 - beta));
    opacitySunset = Math.max(0, Math.min(1, beta));
  }

  // Normalized Solar Progress (0.0 to 1.0)
  const solarProgress = (solarMinutes - DAWN_MIN) / (SUNSET_MIN - DAWN_MIN);

  // Time String: HH:MM hs
  const hours = Math.floor(solarMinutes / 60);
  const mins = Math.round(solarMinutes % 60);
  const timeStr = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')} hs`;

  // Solar Altitude & Azimuth Metrics (Parabolic Arc & Linear Azimuth Path)
  const solarAltitude = Math.round(16 + 58 * Math.sin(solarProgress * Math.PI));
  const solarAzimuth = Math.round(102 + solarProgress * (276 - 102));
  const solarLux = Math.round(190 + Math.sin(solarProgress * Math.PI) * 1230);

  // Solar Preset Buttons Handlers
  const handleSolarPreset = (preset: 'dawn' | 'zenith' | 'sunset') => {
    if (preset === 'dawn') setSolarMinutes(DAWN_MIN);
    else if (preset === 'zenith') setSolarMinutes(ZENITH_MIN);
    else setSolarMinutes(SUNSET_MIN);
  };

  // Active Tectonic Material
  const [activeMaterialId, setActiveMaterialId] = useState<string>('concrete-board');
  const activeMaterial = MONOLITH_MATERIALS.find((m) => m.id === activeMaterialId) || MONOLITH_MATERIALS[0];

  // Gallery Lightbox Modal
  const [lightboxFrame, setLightboxFrame] = useState<MonolithGalleryFrame | null>(null);

  // Commission Simulator State
  const [commissionType, setCommissionType] = useState<string>('residential');
  const [commissionSite, setCommissionSite] = useState<string>('cliff');
  const [commissionScale, setCommissionScale] = useState<string>('medium');
  const [commissionName, setCommissionName] = useState<string>('');
  const [commissionEmail, setCommissionEmail] = useState<string>('');
  const [commissionBrief, setCommissionBrief] = useState<string>('');
  const [simulationConfirmed, setSimulationConfirmed] = useState<boolean>(false);
  const [simulationCode, setSimulationCode] = useState<string>('');

  // Keyboard navigation for modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxFrame(null);
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

  return (
    <div className="min-h-screen min-h-svh bg-[#0C0B0A] text-[#F4F1EA] pt-16 sm:pt-20 pb-16 sm:pb-20 font-swiss selection:bg-[#FF3B30]/30 selection:text-white">
      {/* 1. ARCHITECTURAL EXPEDIENT HEADER: Swiss 0.5px Continuous Folio Bar */}
      <header className="sticky top-16 z-30 bg-[#121110]/95 backdrop-blur-md border-b border-white/10 text-[#F4F1EA] font-swiss">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0 flex items-stretch justify-between h-12 gap-2">
          {/* Izquierda: Volver a Zyrvae */}
          <div className="flex items-center shrink-0">
            <Link
              href="/#work"
              className="inline-flex items-center space-x-2 text-xs font-mono text-[#94A3B8] hover:text-white transition-colors pr-3 sm:pr-4 border-r border-white/10 h-full whitespace-nowrap"
            >
              <ArrowLeft size={13} />
              <span>{language === 'es' ? 'Volver a Zyrvae' : 'Back to Zyrvae'}</span>
            </Link>
          </div>

          {/* Centro: 03 / Monolith Studio — Arquitectura Tectónica */}
          <div className="hidden md:flex items-center px-2 lg:px-4 font-swiss text-xs font-medium text-[#F4F1EA]/90 tracking-[0.015em] truncate">
            <span>03 / Monolith Studio — Arquitectura Tectónica</span>
          </div>

          {/* Navegación Interior Limpia (Sin prefijos 01 // ni badges) */}
          <nav
            aria-label={language === 'es' ? 'Navegación de Monolith Studio' : 'Monolith Studio navigation'}
            className="hidden lg:flex items-center space-x-6 text-xs text-[#94A3B8] font-swiss whitespace-nowrap"
          >
            <a
              href="#monolith-philosophy"
              onClick={(e) => scrollToSection(e, 'monolith-philosophy')}
              className="hover:text-white transition-colors"
            >
              {language === 'es' ? 'Manifiesto' : 'Manifesto'}
            </a>
            <a
              href="#monolith-shadows"
              onClick={(e) => scrollToSection(e, 'monolith-shadows')}
              className="hover:text-white transition-colors"
            >
              {language === 'es' ? 'Simulador solar' : 'Solar simulator'}
            </a>
            <a
              href="#monolith-works"
              onClick={(e) => scrollToSection(e, 'monolith-works')}
              className="hover:text-white transition-colors"
            >
              {language === 'es' ? 'Obra & Materia' : 'Works & Matter'}
            </a>
            <a
              href="#monolith-contact"
              onClick={(e) => scrollToSection(e, 'monolith-contact')}
              className="hover:text-white transition-colors"
            >
              {language === 'es' ? 'Encargos' : 'Commissions'}
            </a>
          </nav>

          {/* Derecha: Iniciar diálogo en bloque sólido rectangular (0px de radio) */}
          <div className="flex items-stretch shrink-0">
            <a
              href="#monolith-contact"
              onClick={(e) => scrollToSection(e, 'monolith-contact')}
              className="inline-flex items-center px-4 sm:px-5 bg-[#F5F5F0] hover:bg-white text-[#0C0B0A] text-xs font-swiss font-medium tracking-wider transition-colors border-l border-white/10 whitespace-nowrap shrink-0 rounded-none"
            >
              <span>{language === 'es' ? 'Iniciar diálogo ↓' : 'Start dialogue ↓'}</span>
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* 2. HERO MONUMENTAL DE ARQUITECTURA: "Espacios esculpidos por la luz." */}
        <section
          id="monolith-hero"
          className="relative min-h-[82svh] sm:min-h-[88svh] flex flex-col justify-between overflow-hidden border-b border-white/10 bg-[#0C0B0A]"
          aria-label="Monolith Studio Hero"
        >
          {/* Fotografía de Fondo Arquitectónica a Gran Escala */}
          <motion.div
            layoutId={`case-study-image-${project.slug}`}
            style={{ viewTransitionName: `case-study-image-${project.slug}` }}
            className="absolute inset-0 z-0"
          >
            <Image
              src="/images/monolith-hero.webp"
              alt="Monolith Studio - Espacios esculpidos por la luz - Residencia en hormigón visto y silencio mineral"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center grayscale contrast-105"
            />
            {/* Velo atmosférico de carbón mineral */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C0B0A] via-[#0C0B0A]/55 to-black/40" />
          </motion.div>

          {/* Cota Superior: Datos de Posicionamiento Geográfico impresos sobre la retícula (Sin pills) */}
          <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#94A3B8] border-b border-white/10 pb-3">
              <div className="flex items-center space-x-2 text-[#F4F1EA]">
                <span className="w-1.5 h-1.5 bg-[#FF3B30] inline-block" />
                <span className="tracking-widest uppercase font-swiss text-[11px] font-medium">
                  {language === 'es' ? 'Práctica Arquitectónica Tectónica' : 'Tectonic Architectural Practice'}
                </span>
              </div>
              <div className="text-[11px] tracking-wider text-[#94A3B8]">
                49°18′S · 72°53′W · ELEV +48M // REF. MN-2025
              </div>
            </div>
          </div>

          {/* Título Monumental con Tensión Tipográfica: Grotesca Monumental + Serif Itálica */}
          <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="max-w-4xl space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="font-swiss text-xs text-[#94A3B8] tracking-widest uppercase flex items-center space-x-2"
              >
                <span>MONOLITH ARCHITECTURAL PRACTICE</span>
                <span>—</span>
                <span className="text-[#F4F1EA]">BASEL · OSLO · PATAGONIA</span>
              </motion.div>

              <motion.h1
                layoutId={`case-study-title-${project.slug}`}
                style={{ viewTransitionName: `case-study-title-${project.slug}` }}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-white leading-[1.02] tracking-tight"
              >
                <span className="block text-5xl sm:text-7xl lg:text-9xl font-display-zyrvae font-extrabold uppercase">
                  MONOLITH
                </span>
                <span className="block text-2xl sm:text-4xl lg:text-5xl font-serif italic text-[#EAEAE6] font-normal mt-2">
                  {language === 'es' ? '«Espacios esculpidos por la luz.»' : '“Spaces shaped by light.”'}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-base sm:text-lg text-[#CBD5E1] font-swiss max-w-2xl leading-relaxed font-light"
              >
                {language === 'es'
                  ? 'Arquitectura del silencio: volúmenes puros de hormigón visto, luz rasante y roca fósil en simbiosis con el territorio andino.'
                  : 'Architecture of stillness: pure board-formed concrete volumes, raking daylight, and fossil stone in symbiosis with Andean topography.'}
              </motion.p>
            </div>
          </div>

          {/* Fila Inferior de Retícula: Sedes Tectónicas & Botón Rectangular */}
          <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8 border-t border-white/10">
            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-swiss text-[#94A3B8]">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <span className="text-white font-medium">Sedes:</span>
                <span>Basel (CH)</span>
                <span className="text-white/20">/</span>
                <span>Oslo (NO)</span>
                <span className="text-white/20">/</span>
                <span>Patagonia (AR)</span>
                <span className="text-white/20">|</span>
                <span className="text-[#94A3B8] font-mono text-[11px]">Hormigón Visto · Piedra Fósil · Passivhaus</span>
              </div>

              <a
                href="#monolith-philosophy"
                onClick={(e) => scrollToSection(e, 'monolith-philosophy')}
                className="inline-flex items-center space-x-2 text-white hover:text-[#FF3B30] transition-colors font-swiss"
              >
                <span>{language === 'es' ? 'Descubrir manifiesto ↓' : 'Explore manifesto ↓'}</span>
                <ArrowDown size={13} />
              </a>
            </div>
          </div>
        </section>

        {/* 3. MANIFIESTO TECTÓNICO (Sin duplicación de párrafos, matriz modular continua 0.5px) */}
        <section
          id="monolith-philosophy"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 border-b border-white/10 scroll-mt-20 font-swiss"
          aria-label="Monolith Architectural Philosophy"
        >
          {/* Cabecera Editorial */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 items-baseline pb-14 border-b border-white/10">
            <div className="lg:col-span-4 space-y-2">
              <span className="font-swiss text-xs uppercase tracking-widest text-[#94A3B8]">
                {language === 'es' ? 'Manifiesto Tectónico' : 'Tectonic Manifesto'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-swiss font-medium tracking-tight text-white">
                {language === 'es' ? 'La materia, el silencio y el horizonte.' : 'Matter, silence, and horizon.'}
              </h2>
            </div>

            <div className="lg:col-span-8 space-y-5">
              <blockquote className="text-xl sm:text-2xl font-serif italic text-[#F4F1EA] leading-relaxed">
                {language === 'es'
                  ? '«No añadimos formas innecesarias: sustraemos el ruido visual hasta que solo permanecen la luz, la masa mineral y la quietud del territorio.»'
                  : '“We do not add superfluous shapes: we subtract visual noise until only light, mineral mass, and the stillness of territory remain.”'}
              </blockquote>
              <p className="text-sm sm:text-base text-[#94A3B8] font-swiss leading-relaxed">
                {language === 'es'
                  ? 'Cada proyecto es una pausa espacial duradera concebida para envejecer con dignidad geológica, donde el hormigón visto y la roca fósil absorben la cadencia de las estaciones sin afectación formal.'
                  : 'Every project is an enduring spatial pause conceived to age with geological dignity, where board-formed concrete and fossil stone quietly register the shifting seasons.'}
              </p>
            </div>
          </div>

          {/* Matriz Modular Continua de 4 Pilares Tectónicos (Retícula 0.5 px) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-b border-l border-white/10 pt-0">
            {MONOLITH_PILLARS.map((pillar) => (
              <div
                key={pillar.number}
                className="p-6 sm:p-8 border-r border-t border-white/10 bg-[#141517] flex flex-col justify-between space-y-8"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8] border-b border-white/10 pb-2">
                    <span className="text-white font-medium">{pillar.code}</span>
                    <span>{pillar.number} / 04</span>
                  </div>

                  <h3 className="text-lg font-swiss font-medium text-white">
                    {pillar.title[language]}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#94A3B8] font-swiss leading-relaxed">
                    {pillar.desc[language]}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 text-[11px] font-mono text-[#CBD5E1]">
                  {pillar.metric}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. LABORATORIO TÉCNICO & PROTOTIPO FUNCIONAL: SIMULADOR SOLAR INTERPOLADO (#monolith-shadows y #monolith-study) */}
        <section
          id="monolith-shadows"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 border-b border-white/10 scroll-mt-20 font-swiss"
          aria-label={language === 'es' ? 'Simulador solar de Casa Bruma' : 'Bruma Residence solar simulator'}
        >
          {/* Target secundario para compatibilidad de suite de tests y anclas */}
          <div id="monolith-study" className="scroll-mt-20" />

          {/* Sello Oficial Fase 2: Laboratorio Técnico & Prototipo Funcional */}
          <div
            data-lab-seal="Laboratorio Técnico & Prototipo Funcional"
            className="border border-white/10 bg-[#121110] p-6 sm:p-10 space-y-8 rounded-none"
          >
            {/* Folio Técnico Superior */}
            <div className="p-3.5 sm:p-4 bg-[#0C0B0A] border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="inline-flex items-center space-x-2.5">
                <span className="w-2 h-2 bg-[#FF3B30]" aria-hidden="true" />
                <span className="font-swiss text-[11px] font-medium tracking-wider uppercase text-white">
                  Laboratorio Técnico & Prototipo Funcional
                </span>
              </div>
              <span className="font-mono text-[11px] text-[#94A3B8]">
                SPEC // MN-SOLAR-03 · AZIMUT {solarAzimuth}° · ELEVACIÓN {solarAltitude}° · {solarLux} LUX
              </span>
            </div>

            {/* Cabecera del Simulador */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-6">
              <div className="space-y-2 max-w-2xl">
                <span className="font-swiss text-xs text-[#94A3B8] uppercase tracking-widest block">
                  {language === 'es' ? 'Simulador Solar & Heliodón Digital' : 'Solar Simulator & Digital Heliodon'}
                </span>
                <h3 className="text-2xl sm:text-4xl font-swiss font-medium text-white tracking-tight">
                  {language === 'es' ? 'Incidencia rasante, azimut y sombras volumétricas' : 'Raking daylight incidence, azimuth & volumetric shadow study'}
                </h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] font-swiss leading-relaxed">
                  {language === 'es'
                    ? 'Interpolación fotométrica continua sobre el núcleo de hormigón encofrado de Casa Bruma (08:00 a 18:45).'
                    : 'Continuous photometric crossfade over the board-formed concrete mass of Bruma Residence (08:00 to 18:45).'}
                </p>
              </div>

              {/* Botones Preset de Aristas Vivas (0px) */}
              <div
                role="group"
                aria-label="Solar time presets"
                className="flex items-center gap-1.5 p-1 bg-[#0C0B0A] border border-white/10 self-start lg:self-end rounded-none shrink-0"
              >
                <button
                  type="button"
                  onClick={() => handleSolarPreset('dawn')}
                  className={`px-3 py-1.5 text-xs font-swiss transition-colors rounded-none ${
                    solarMinutes <= 540
                      ? 'bg-[#F5F5F0] text-[#0C0B0A] font-semibold'
                      : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  <Sun size={12} className="inline mr-1" />
                  <span>{language === 'es' ? 'Amanecer · 08:00' : 'Dawn · 08:00'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSolarPreset('zenith')}
                  className={`px-3 py-1.5 text-xs font-swiss transition-colors rounded-none ${
                    solarMinutes > 540 && solarMinutes < 950
                      ? 'bg-[#F5F5F0] text-[#0C0B0A] font-semibold'
                      : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  <Sun size={12} className="inline mr-1" />
                  <span>{language === 'es' ? 'Cenit · 12:30' : 'Zenith · 12:30'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSolarPreset('sunset')}
                  className={`px-3 py-1.5 text-xs font-swiss transition-colors rounded-none ${
                    solarMinutes >= 950
                      ? 'bg-[#F5F5F0] text-[#0C0B0A] font-semibold'
                      : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  <Moon size={12} className="inline mr-1" />
                  <span>{language === 'es' ? 'Ocaso · 18:45' : 'Sunset · 18:45'}</span>
                </button>
              </div>
            </div>

            {/* Slider Continuo de Tiempo Solar con Regla Graduada (type="range") */}
            <div className="p-4 sm:p-5 bg-[#0C0B0A] border border-white/10 space-y-3 rounded-none">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-swiss">
                <div className="flex items-center space-x-3 text-white">
                  <Sun size={14} className="text-[#FF3B30] shrink-0" />
                  <span className="font-medium">
                    {language === 'es' ? 'Hora solar activa:' : 'Active solar time:'}
                  </span>
                  <span className="font-mono text-[#F4F1EA] text-sm bg-white/10 px-2 py-0.5 border border-white/15">
                    {timeStr}
                  </span>
                </div>

                <div className="flex items-center space-x-4 text-[11px] font-mono text-[#94A3B8]">
                  <span>AZIMUT: {solarAzimuth}°</span>
                  <span>ALTITUD: {solarAltitude}°</span>
                  <span className="text-[#F4F1EA] font-semibold">{solarLux} LUX</span>
                </div>
              </div>

              {/* Control Deslizante de Rango */}
              <div className="relative pt-2 pb-1">
                <input
                  type="range"
                  min={DAWN_MIN}
                  max={SUNSET_MIN}
                  step={1}
                  value={solarMinutes}
                  aria-label={language === 'es' ? 'Ajustar hora solar continua (08:00 a 18:45)' : 'Adjust solar time (08:00 to 18:45)'}
                  onChange={(e) => setSolarMinutes(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#1E2024] appearance-none cursor-ew-resize accent-[#F5F5F0] rounded-none outline-none focus-visible:ring-1 focus-visible:ring-white"
                />

                {/* Marcas de Regla Horaria Graduada */}
                <div className="flex justify-between items-center text-[10px] font-mono text-[#94A3B8] pt-2 select-none">
                  <span>08:00</span>
                  <span className="hidden sm:inline">10:00</span>
                  <span className="text-white font-medium">12:30 CENIT</span>
                  <span className="hidden sm:inline">15:00</span>
                  <span className="hidden sm:inline">17:00</span>
                  <span>18:45 OCASO</span>
                </div>
              </div>
            </div>

            {/* Escenario Fotográfico Multicapa con Interpolación Continua (Fase 2 Crossfade) */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9] overflow-hidden bg-[#0A0A0C] border border-white/10 select-none">
              {/* Capa 1: Amanecer (08:00) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/monolith-dawn.webp"
                alt="Casa Bruma al Amanecer (08:00) - Luz rasante este"
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-75"
                style={{ opacity: opacityDawn }}
              />

              {/* Capa 2: Cenit (12:30) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/monolith-zenith.webp"
                alt="Casa Bruma al Cenit (12:30) - Luz vertical cenital"
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-75"
                style={{ opacity: opacityZenith }}
              />

              {/* Capa 3: Ocaso (18:45) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/monolith-sunset.webp"
                alt="Casa Bruma al Ocaso (18:45) - Sombras alargadas oeste"
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-75"
                style={{ opacity: opacitySunset }}
              />

              {/* Velo de Tonalidad Térmica Dinámica */}
              <div
                className="absolute inset-0 pointer-events-none transition-colors duration-200"
                style={{
                  backgroundColor:
                    solarMinutes <= 600
                      ? 'rgba(217, 119, 6, 0.12)' // Calidez matinal ambarina
                      : solarMinutes >= 950
                      ? 'rgba(180, 83, 9, 0.16)' // Terracota cálido de ocaso
                      : 'rgba(255, 255, 255, 0.04)', // Neutralidad cenital
                }}
              />

              {/* Mira de Cota Arquitectónica & Retículo Técnico en 0.5px Líneas Blancas */}
              <div className="absolute inset-0 pointer-events-none p-4 sm:p-6 flex flex-col justify-between">
                {/* Cotas Superiores en Esquinas */}
                <div className="flex items-start justify-between font-mono text-[10px] text-white/90">
                  <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-md px-3 py-1 border border-white/10">
                    <span className="w-1.5 h-1.5 bg-[#FF3B30] inline-block" />
                    <span>DATUM ±0.00M // CASA BRUMA</span>
                  </div>
                  <div className="bg-black/60 backdrop-blur-md px-3 py-1 border border-white/10">
                    49°18′S · 72°53′W · EL CHALTÉN
                  </div>
                </div>

                {/* Retículo Central Sutil con Vector de Incidencia Solar */}
                <div className="flex items-center justify-center">
                  <svg viewBox="0 0 120 120" className="w-20 h-20 text-white/40" aria-hidden="true">
                    {/* Círculo graduado de heliodón */}
                    <circle cx="60" cy="60" r="38" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="2,2" />
                    <line x1="60" y1="12" x2="60" y2="108" stroke="currentColor" strokeWidth="0.5" />
                    <line x1="12" y1="60" x2="108" y2="60" stroke="currentColor" strokeWidth="0.5" />
                    {/* Vector de Rayo Solar */}
                    <line
                      x1="60"
                      y1="60"
                      x2={60 + 36 * Math.cos((solarAzimuth - 90) * (Math.PI / 180))}
                      y2={60 + 36 * Math.sin((solarAzimuth - 90) * (Math.PI / 180))}
                      stroke="#FF3B30"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>

                {/* HUD de Información Inferior */}
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 font-mono text-[11px] text-white">
                  <div className="bg-black/75 backdrop-blur-md p-3 border border-white/10 space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-[#FF3B30] font-bold">AZIMUT:</span>
                      <span>{solarAzimuth}°</span>
                      <span className="text-white/30">|</span>
                      <span className="text-[#FF3B30] font-bold">ELEVACIÓN:</span>
                      <span>{solarAltitude}°</span>
                      <span className="text-white/30">|</span>
                      <span className="text-white font-bold">{solarLux} LUX</span>
                    </div>
                    <div className="text-[10px] text-[#CBD5E1] font-swiss">
                      {thermalMassReadout[language]}
                    </div>
                  </div>

                  <div className="bg-black/75 backdrop-blur-md px-3 py-1.5 border border-white/10 text-[10px] text-[#94A3B8]">
                    Crossfade interpolado: {Math.round(opacityDawn * 100)}% Amanecer / {Math.round(opacityZenith * 100)}% Cenit / {Math.round(opacitySunset * 100)}% Ocaso
                  </div>
                </div>
              </div>
            </div>

            {/* Ficha de Comportamiento Térmico & Tectónico en 3 Celdas Continuas */}
            <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-white/10">
              <div className="p-5 border-r border-b border-white/10 bg-[#0C0B0A] space-y-2">
                <span className="text-[11px] font-swiss text-[#94A3B8] uppercase block">
                  {language === 'es' ? 'Comportamiento de la Envolvente' : 'Envelope Performance'}
                </span>
                <p className="text-xs text-white font-swiss leading-relaxed">
                  {solarMinutes < 600 && (language === 'es'
                    ? 'La luz baja a 16° penetra horizontalmente por el lucernario rasante este, calentando el muro entablillado de hormigón.'
                    : 'Low 16° morning light rakes horizontally through the east fissure, conductively preheating the concrete core.')}
                  {solarMinutes >= 600 && solarMinutes <= 850 && (language === 'es'
                    ? 'La radiación cenital de mediodía es interceptada por los aleros voladizos de 3.2m, protegiendo las estancias del sobrecalentamiento.'
                    : 'Zenith overhead glare is naturally intercepted by 3.2m cantilevers, preserving temperate ambient coolness.')}
                  {solarMinutes > 850 && (language === 'es'
                    ? 'La luz crepuscular del oeste alarga las sombras minerales y proyecta el calor acumulado hacia el interior durante la noche andina.'
                    : 'Dusk light elongates shadow cast while the accumulated concrete core radiates stored thermal warmth into living spaces.')}
                </p>
              </div>

              <div className="p-5 border-r border-b border-white/10 bg-[#0C0B0A] space-y-2">
                <span className="text-[11px] font-swiss text-[#94A3B8] uppercase block">
                  {language === 'es' ? 'Inercia Térmica Passivhaus' : 'Passivhaus Thermal Inertia'}
                </span>
                <p className="text-xs text-white font-swiss leading-relaxed">
                  {language === 'es'
                    ? 'Masa mineral de 45 cm de espesor con desfase térmico de 9.4 horas. Coeficiente de transmitancia global U = 0.12 W/(m²K).'
                    : '45 cm thick mineral mass yielding a 9.4-hour thermal phase shift. Global thermal transmittance U = 0.12 W/(m²K).'}
                </p>
              </div>

              <div className="p-5 border-r border-b border-white/10 bg-[#0C0B0A] space-y-2">
                <span className="text-[11px] font-swiss text-[#94A3B8] uppercase block">
                  {language === 'es' ? 'Materialidad de Fachada' : 'Facade Materiality'}
                </span>
                <p className="text-xs text-white font-swiss leading-relaxed">
                  {language === 'es'
                    ? 'Hormigón visto con textura de alerce rugoso + carpinterías de triple vidrio con control solar inteligente Low-E 92%.'
                    : 'Board-formed concrete cast with rough larch grain + triple acoustic glazing with Low-E 92% solar control.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. OBRAS SELECCIONADAS: PROTAGONISMO DE CASA BRUMA & MATRIZ DE PLANOS (#monolith-works) */}
        <section
          id="monolith-works"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 border-b border-white/10 scroll-mt-20 font-swiss"
          aria-label="Monolith Selected Works"
        >
          {/* Cabecera y Filtros */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6 border-b border-white/10 pb-8">
            <div className="space-y-2">
              <span className="font-swiss text-xs uppercase tracking-widest text-[#94A3B8]">
                {language === 'es' ? 'Proyectos Seleccionados' : 'Selected Projects'}
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-swiss font-medium tracking-tight text-white">
                {language === 'es' ? 'Obras y práctica territorial.' : 'Selected works & territorial practice.'}
              </h2>
              <p className="text-sm sm:text-base text-[#94A3B8] font-swiss max-w-xl">
                {language === 'es'
                  ? 'Catálogo riguroso de proyectos residenciales, culturales y de pabellón concebidos como ejercicios de masa mineral pura.'
                  : 'A disciplined index of residential, cultural, and pavilion projects engineered as studies in mineral mass.'}
              </p>
            </div>

            {/* Filtros Tipológicos en Línea Continua */}
            <div
              role="tablist"
              aria-label="Filter works by typology"
              className="flex flex-wrap items-center gap-1.5 p-1 bg-[#121110] border border-white/10 self-start md:self-end rounded-none"
            >
              {[
                { id: 'all' as const, label: language === 'es' ? 'Todas (06)' : 'All (06)' },
                { id: 'residential' as const, label: language === 'es' ? 'Residencial (03)' : 'Residential (03)' },
                { id: 'cultural' as const, label: language === 'es' ? 'Cultural (02)' : 'Cultural (02)' },
                { id: 'commercial' as const, label: language === 'es' ? 'Pabellones (01)' : 'Pavilions (01)' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeCategory === tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-3 py-1.5 text-xs font-swiss transition-colors rounded-none ${
                    activeCategory === tab.id
                      ? 'bg-[#F5F5F0] text-[#0C0B0A] font-medium'
                      : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* LÁMINA MONUMENTAL PROTAGONISTA: CASA BRUMA (MN-01) */}
          <div className="border border-white/10 bg-[#121110] mb-12 rounded-none overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Fotografía a Gran Escala */}
              <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto min-h-[380px] sm:min-h-[460px] border-b lg:border-b-0 lg:border-r border-white/10 bg-[#0C0B0A]">
                <Image
                  src={activeProject.coverImage}
                  alt={activeProject.title[language]}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center"
                />
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 border border-white/10 text-xs font-mono text-white">
                  {activeProject.code} · {activeProject.title[language]}
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-baseline text-white text-xs font-mono bg-black/75 backdrop-blur-md px-4 py-2 border border-white/10">
                  <span>{activeProject.location}</span>
                  <span className="text-[#94A3B8]">{activeProject.area}</span>
                </div>
              </div>

              {/* Ficha Técnica de Replanteo y Decisiones Espaciales */}
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[#141517]">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-xs font-mono text-[#FF3B30] uppercase font-semibold">
                      {activeProject.code} // {activeProject.categoryLabel[language]}
                    </span>
                    <span className="text-xs font-mono text-[#94A3B8]">{activeProject.year}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-swiss font-medium text-white">
                    {activeProject.title[language]}
                  </h3>
                  <p className="text-sm font-serif italic text-[#EAEAE6]">
                    {activeProject.subtitle[language]}
                  </p>

                  <p className="text-xs sm:text-sm text-[#94A3B8] font-swiss leading-relaxed">
                    {activeProject.concept[language]}
                  </p>
                </div>

                {/* Especificaciones Técnicas */}
                <div className="space-y-2 border-t border-white/10 pt-4 font-mono text-xs">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-[#94A3B8] font-swiss">{language === 'es' ? 'Coordenadas:' : 'Coordinates:'}</span>
                    <span className="text-white">{activeProject.coordinates}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-[#94A3B8] font-swiss">{language === 'es' ? 'Superficie:' : 'Floor Area:'}</span>
                    <span className="text-white">{activeProject.area}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-[#94A3B8] font-swiss">{language === 'es' ? 'Elevación:' : 'Elevation:'}</span>
                    <span className="text-white">{activeProject.elevation}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#94A3B8] font-swiss">{language === 'es' ? 'Materia prima:' : 'Primary material:'}</span>
                    <span className="text-white">{activeProject.primaryMaterial[language]}</span>
                  </div>
                </div>

                {/* Decisiones Clave */}
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-swiss uppercase text-[#94A3B8] block">
                    {language === 'es' ? 'Criterios de implantación:' : 'Implantation criteria:'}
                  </span>
                  <div className="space-y-1.5 text-xs font-swiss text-[#CBD5E1]">
                    {activeProject.spatialDecisions.slice(0, 2).map((d) => (
                      <div key={d.num} className="p-2.5 bg-[#0C0B0A] border border-white/5">
                        <span className="text-[#FF3B30] font-mono mr-1.5">{d.num}.</span>
                        <strong className="text-white font-medium">{d.title[language]}:</strong> {d.desc[language]}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Selector de Catálogo de Proyectos (Obras en Retícula Continua 0.5px) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-l border-b border-white/10">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                onClick={() => setSelectedProjectId(proj.id)}
                className={`p-6 border-r border-t border-white/10 cursor-pointer transition-colors space-y-4 ${
                  selectedProjectId === proj.id ? 'bg-[#1C1D21]' : 'bg-[#121110] hover:bg-[#18191D]'
                }`}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#0C0B0A] border border-white/10">
                  <Image
                    src={proj.coverImage}
                    alt={proj.title[language]}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-black/75 px-2 py-0.5 text-[10px] font-mono text-white border border-white/10">
                    {proj.code}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-baseline text-xs font-mono text-[#94A3B8]">
                    <span>{proj.location}</span>
                    <span>{proj.year}</span>
                  </div>
                  <h4 className="font-swiss font-medium text-lg text-white">
                    {proj.title[language]}
                  </h4>
                  <p className="text-xs text-[#94A3B8] font-swiss line-clamp-2 leading-relaxed">
                    {proj.concept[language]}
                  </p>
                </div>

                <div className="pt-2 flex justify-between items-center text-xs font-swiss text-[#CBD5E1]">
                  <span>{proj.area}</span>
                  <span className="text-[#FF3B30] font-mono text-[11px]">
                    {selectedProjectId === proj.id ? '● Activo en visor' : 'Inspeccionar →'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. HONESTIDAD MATERIAL: MATRIZ TECTÓNICA (#monolith-tectonics) */}
        <section
          id="monolith-tectonics"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 border-b border-white/10 scroll-mt-20 font-swiss"
          aria-label="Monolith Tectonic Material Matrix"
        >
          <div className="space-y-12">
            <div className="max-w-3xl space-y-2">
              <span className="font-swiss text-xs uppercase tracking-widest text-[#94A3B8]">
                {language === 'es' ? 'Honestidad Material' : 'Material Honesty'}
              </span>
              <h2 className="text-3xl sm:text-5xl font-swiss font-medium tracking-tight text-white">
                {language === 'es' ? 'La matriz tectónica.' : 'The tectonic matrix.'}
              </h2>
              <p className="text-sm sm:text-base text-[#94A3B8] font-swiss">
                {language === 'es'
                  ? 'Cada material es especificado por su masa, noble envejecimiento y diálogo táctil con la luz y la sombra.'
                  : 'Every material is specified for its mass, noble weathering capacity, and tactile interaction with light and shadow.'}
              </p>
            </div>

            {/* Selector de Materiales en Bloques Rectangulares */}
            <div
              role="tablist"
              aria-label="Material types"
              className="flex flex-wrap gap-2"
            >
              {MONOLITH_MATERIALS.map((mat) => (
                <button
                  key={mat.id}
                  type="button"
                  role="tab"
                  aria-selected={activeMaterialId === mat.id}
                  onClick={() => setActiveMaterialId(mat.id)}
                  className={`px-4 py-2 text-xs font-swiss transition-colors border rounded-none ${
                    activeMaterialId === mat.id
                      ? 'bg-[#F5F5F0] text-[#0C0B0A] border-white font-medium'
                      : 'bg-[#121110] border-white/10 text-[#94A3B8] hover:text-white'
                  }`}
                >
                  <span className="font-mono mr-1.5">{mat.code}</span>
                  <span>{mat.name[language].split(' ')[0]}</span>
                </button>
              ))}
            </div>

            {/* Ficha Técnica de Material en Retícula Continua 0.5px */}
            <div className="border border-white/10 bg-[#121110] p-6 sm:p-10 rounded-none">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Probeta Macrofotográfica */}
                <div className="lg:col-span-5 space-y-3">
                  <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square overflow-hidden border border-white/10 bg-[#0C0B0A]">
                    <Image
                      src={activeMaterial.image}
                      alt={activeMaterial.name[language]}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-black/80 px-2.5 py-1 border border-white/10 text-[10px] font-mono text-white">
                      {activeMaterial.code}
                    </div>
                  </div>
                  <div className="text-[11px] font-mono text-[#94A3B8] text-center">
                    {language === 'es' ? 'PROBETA MACRO DE TEXTURA SUPERFICIAL' : 'SURFACE TEXTURE MACRO SPECIMEN'}
                  </div>
                </div>

                {/* Matriz de Especificaciones Físicas */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="border-b border-white/10 pb-4 space-y-1">
                    <span className="text-xs font-mono text-[#FF3B30] uppercase">
                      {activeMaterial.category[language]}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-swiss font-medium text-white">
                      {activeMaterial.name[language]}
                    </h3>
                  </div>

                  {/* Tabla Suiza */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-swiss">
                    <div className="p-3 bg-[#0C0B0A] border border-white/10 space-y-1">
                      <span className="text-[#94A3B8] block text-[10px] uppercase">
                        {language === 'es' ? 'Densidad aparente:' : 'Apparent density:'}
                      </span>
                      <span className="text-white font-mono font-medium block">
                        {activeMaterial.properties.density}
                      </span>
                    </div>

                    <div className="p-3 bg-[#0C0B0A] border border-white/10 space-y-1">
                      <span className="text-[#94A3B8] block text-[10px] uppercase">
                        {language === 'es' ? 'Comportamiento acústico:' : 'Acoustic rating:'}
                      </span>
                      <span className="text-white font-mono font-medium block">
                        {activeMaterial.properties.acoustic}
                      </span>
                    </div>

                    <div className="p-3 bg-[#0C0B0A] border border-white/10 space-y-1 sm:col-span-2">
                      <span className="text-[#94A3B8] block text-[10px] uppercase">
                        {language === 'es' ? 'Tratamiento superficial y acabado:' : 'Surface finish & treatment:'}
                      </span>
                      <span className="text-white block">
                        {activeMaterial.properties.finish[language]}
                      </span>
                    </div>

                    <div className="p-3 bg-[#0C0B0A] border border-white/10 space-y-1 sm:col-span-2">
                      <span className="text-[#94A3B8] block text-[10px] uppercase">
                        {language === 'es' ? 'Criterio sostenible y huella de carbono:' : 'Sustainability & embodied carbon:'}
                      </span>
                      <span className="text-[#EAEAE6] block">
                        {activeMaterial.properties.sustainability[language]}
                      </span>
                    </div>
                  </div>

                  {/* Nota de Ensamble Tectónico */}
                  <div className="p-4 bg-[#0C0B0A] border border-white/10 text-xs font-swiss text-[#CBD5E1] space-y-1">
                    <span className="text-white font-medium block uppercase text-[10px] font-mono">
                      {language === 'es' ? 'NOTA DE ENSAMBLE TECTÓNICO' : 'TECTONIC DETAILING NOTE'}
                    </span>
                    <p className="leading-relaxed">
                      {activeMaterial.tectonicNotes[language]}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. REGISTRO EDITORIAL CINEMATOGRÁFICO: GALERÍA DE LÁMINAS (#monolith-gallery) */}
        <section
          id="monolith-gallery"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 border-b border-white/10 scroll-mt-20 font-swiss"
          aria-label="Monolith Editorial Gallery"
        >
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
              <div className="space-y-2">
                <span className="font-swiss text-xs uppercase tracking-widest text-[#94A3B8]">
                  {language === 'es' ? 'Registro Monográfico' : 'Editorial Monograph'}
                </span>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-swiss font-medium tracking-tight text-white">
                  {language === 'es' ? 'Atmósferas y sombras.' : 'Atmospheres & shadow.'}
                </h2>
                <p className="text-sm sm:text-base text-[#94A3B8] font-swiss max-w-xl">
                  {language === 'es'
                    ? 'Registro fotográfico arquitectónico de patios minerales, escaleras monumentales y encuentros tectónicos.'
                    : 'Cinematic architectural photography of mineral courtyards, monumental stairs, and tectonic junctions.'}
                </p>
              </div>

              <span className="text-xs font-mono text-[#94A3B8] self-start md:self-end">
                {language === 'es' ? 'HACÉ CLIC PARA AMPLIAR EN ALTA RESOLUCIÓN' : 'CLICK TO EXPAND HIGH-RESOLUTION VIEW'}
              </span>
            </div>

            {/* Galería en Retícula Continua 0.5px */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-l border-b border-white/10">
              {MONOLITH_GALLERY.map((frame, index) => {
                const isWide = index === 0 || index === 4;
                return (
                  <div
                    key={frame.id}
                    onClick={() => setLightboxFrame(frame)}
                    className={`${
                      isWide ? 'sm:col-span-2' : 'sm:col-span-1'
                    } group relative aspect-[16/11] border-r border-t border-white/10 bg-[#0C0B0A] cursor-pointer overflow-hidden rounded-none`}
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

                    {/* Velo Cinematográfico */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                    {/* Metadatos EXIF */}
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-center text-[10px] font-mono text-white/90">
                      <span className="px-2 py-0.5 bg-black/80 border border-white/10 uppercase">
                        {frame.meta.focalLength} · {frame.meta.aperture}
                      </span>
                      <span className="p-1 bg-black/80 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 size={12} />
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white space-y-1">
                      <span className="font-mono text-[10px] text-[#94A3B8] block uppercase">
                        {frame.location}
                      </span>
                      <h4 className="font-swiss font-medium text-sm line-clamp-1">
                        {frame.title[language]}
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 8. COMISIONES ARQUITECTÓNICAS & CONTACTO (#monolith-contact) */}
        <section
          id="monolith-contact"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 border-b border-white/10 scroll-mt-20 font-swiss"
          aria-label="Commission Monolith Architecture"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Columna Izquierda: Intención y Sedes */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <span className="font-swiss text-xs uppercase tracking-widest text-[#94A3B8]">
                  {language === 'es' ? 'Comisiones & Contacto' : 'Commissions & Contact'}
                </span>
                <h2 className="text-3xl sm:text-5xl font-swiss font-medium tracking-tight text-white">
                  {language === 'es' ? 'Iniciar diálogo espacial.' : 'Begin spatial dialogue.'}
                </h2>
                <p className="text-sm sm:text-base text-[#94A3B8] font-swiss leading-relaxed">
                  {language === 'es'
                    ? 'Aceptamos un número limitado de encargos privados e institucionales por año para garantizar un rigor tectónico exhaustivo en cada fase de obra.'
                    : 'We accept a limited number of private and institutional commissions annually to ensure exhaustive tectonic rigor across every project phase.'}
                </p>
              </div>

              {/* Sedes Físicas */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <span className="text-xs font-swiss text-[#94A3B8] uppercase block">
                  {language === 'es' ? 'Sedes del estudio:' : 'Studio locations:'}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                  {MONOLITH_STUDIO_META.offices.map((office) => (
                    <div
                      key={office.city}
                      className="p-3 bg-[#121110] border border-white/10 space-y-1 rounded-none"
                    >
                      <span className="text-white font-bold block">{office.city}</span>
                      <span className="text-[#94A3B8] text-[10px] block">{office.coords}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Declaración de Proyecto Conceptual */}
              <div className="p-4 bg-[#121110] border border-white/10 text-xs font-swiss space-y-2 text-[#94A3B8] rounded-none">
                <div className="flex items-center space-x-2 text-white font-medium">
                  <ShieldCheck size={14} className="text-[#FF3B30]" />
                  <span>{language === 'es' ? 'Declaración de Proyecto Conceptual' : 'Conceptual Project Declaration'}</span>
                </div>
                <p className="leading-relaxed">
                  {language === 'es'
                    ? `${project.title} es una experiencia web conceptual desarrollada por ZYRVAE Digital Studio. Todos los planos, proyectos, fotografías y especificaciones se presentan con fines demostrativos de diseño y arquitectura digital.`
                    : `${project.title} is a conceptual architectural web experience crafted by ZYRVAE Digital Studio. All blueprints, projects, photography, and specifications are presented for digital design demonstration.`}
                </p>
              </div>
            </div>

            {/* Columna Derecha: Formulario de Encargo */}
            <div className="lg:col-span-7">
              <div className="bg-[#121110] border border-white/10 p-6 sm:p-10 rounded-none">
                {simulationConfirmed ? (
                  <div className="space-y-6 text-center py-8">
                    <div className="w-14 h-14 mx-auto bg-white/5 border border-white/20 flex items-center justify-center text-white rounded-none">
                      <Check size={28} />
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-swiss text-[#FF3B30] uppercase tracking-widest">
                        {language === 'es' ? 'Registro demostrativo exitoso' : 'Demo inquiry registered'}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-swiss font-medium text-white">
                        {language === 'es' ? 'Encargo Registrado' : 'Commission Registered'}
                      </h3>
                      <p className="font-mono text-xs text-[#94A3B8]">
                        EXPEDIENTE: <span className="text-white font-bold">{simulationCode}</span>
                      </p>
                    </div>

                    <p className="text-sm text-[#94A3B8] font-swiss max-w-md mx-auto leading-relaxed">
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
                      className="px-6 py-3 bg-[#0C0B0A] hover:bg-white/10 border border-white/10 text-xs font-swiss text-white transition-colors rounded-none"
                    >
                      {language === 'es' ? 'Simular otra consulta' : 'Simulate another inquiry'}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleConfirmSimulation} className="space-y-6">
                    <div className="border-b border-white/10 pb-4">
                      <h3 className="text-xl font-swiss font-medium text-white">
                        {language === 'es' ? 'Simular solicitud de encargo' : 'Simulate project commission'}
                      </h3>
                      <p className="text-xs font-swiss text-[#94A3B8] mt-1">
                        {language === 'es'
                          ? 'Completá los parámetros del proyecto para generar el expediente demostrativo.'
                          : 'Complete architectural project parameters to generate simulated record.'}
                      </p>
                    </div>

                    {/* Selección de Tipología */}
                    <div className="space-y-2">
                      <label className="block text-xs font-swiss text-[#CBD5E1]">
                        {language === 'es' ? '1. Tipología de proyecto:' : '1. Project typology:'}
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-swiss">
                        {[
                          { id: 'residential', label: language === 'es' ? 'Residencial' : 'Residential' },
                          { id: 'cultural', label: language === 'es' ? 'Cultural' : 'Cultural' },
                          { id: 'commercial', label: language === 'es' ? 'Pabellón' : 'Pavilion' },
                        ].map((typ) => (
                          <button
                            key={typ.id}
                            type="button"
                            onClick={() => setCommissionType(typ.id)}
                            className={`p-3 border text-center transition-colors rounded-none ${
                              commissionType === typ.id
                                ? 'bg-[#F5F5F0] text-[#0C0B0A] border-white font-medium'
                                : 'bg-[#0C0B0A] border-white/10 text-[#94A3B8] hover:text-white'
                            }`}
                          >
                            {typ.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Contexto Geográfico */}
                    <div className="space-y-2">
                      <label className="block text-xs font-swiss text-[#CBD5E1]">
                        {language === 'es' ? '2. Contexto geográfico del terreno:' : '2. Site geography:'}
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-swiss">
                        {[
                          { id: 'cliff', label: language === 'es' ? 'Acantilado / Costa' : 'Coast / Cliff' },
                          { id: 'alpine', label: language === 'es' ? 'Montaña / Nieve' : 'Alpine / Snow' },
                          { id: 'forest', label: language === 'es' ? 'Bosque / Selva' : 'Forest / Woods' },
                        ].map((site) => (
                          <button
                            key={site.id}
                            type="button"
                            onClick={() => setCommissionSite(site.id)}
                            className={`p-3 border text-center transition-colors rounded-none ${
                              commissionSite === site.id
                                ? 'bg-[#F5F5F0] text-[#0C0B0A] border-white font-medium'
                                : 'bg-[#0C0B0A] border-white/10 text-[#94A3B8] hover:text-white'
                            }`}
                          >
                            {site.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Escala Estimada */}
                    <div className="space-y-2">
                      <label className="block text-xs font-swiss text-[#CBD5E1]">
                        {language === 'es' ? '3. Escala estimada:' : '3. Estimated scale:'}
                      </label>
                      <div className="grid grid-cols-3 gap-2 text-xs font-swiss">
                        {[
                          { id: 'small', label: '< 400 m²' },
                          { id: 'medium', label: '400–1.200 m²' },
                          { id: 'monumental', label: '> 1.200 m²' },
                        ].map((sc) => (
                          <button
                            key={sc.id}
                            type="button"
                            onClick={() => setCommissionScale(sc.id)}
                            className={`p-3 border text-center transition-colors rounded-none ${
                              commissionScale === sc.id
                                ? 'bg-[#F5F5F0] text-[#0C0B0A] border-white font-medium'
                                : 'bg-[#0C0B0A] border-white/10 text-[#94A3B8] hover:text-white'
                            }`}
                          >
                            {sc.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Datos de Contacto */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-swiss text-[#CBD5E1]">
                          {language === 'es' ? 'Comitente / Nombre:' : 'Client Name:'}
                        </label>
                        <input
                          type="text"
                          required
                          value={commissionName}
                          onChange={(e) => setCommissionName(e.target.value)}
                          placeholder="Elena Vance"
                          className="w-full px-3.5 py-2.5 bg-[#0C0B0A] border border-white/10 text-white text-xs font-swiss focus:outline-none focus:border-white rounded-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-swiss text-[#CBD5E1]">
                          {language === 'es' ? 'Correo electrónico:' : 'Email:'}
                        </label>
                        <input
                          type="email"
                          required
                          value={commissionEmail}
                          onChange={(e) => setCommissionEmail(e.target.value)}
                          placeholder="vance@studio.ch"
                          className="w-full px-3.5 py-2.5 bg-[#0C0B0A] border border-white/10 text-white text-xs font-swiss focus:outline-none focus:border-white rounded-none"
                        />
                      </div>
                    </div>

                    {/* Memoria de Aspiraciones */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-swiss text-[#CBD5E1]">
                        {language === 'es' ? 'Aspiraciones arquitectónicas / Memoria:' : 'Architectural aspirations / Brief:'}
                      </label>
                      <textarea
                        rows={3}
                        value={commissionBrief}
                        onChange={(e) => setCommissionBrief(e.target.value)}
                        placeholder={
                          language === 'es'
                            ? 'Buscamos una residencia de hormigón visto con luz cenital rasante en Patagonia...'
                            : 'We seek a cantilevered concrete retreat with continuous zenith raking light in Patagonia...'
                        }
                        className="w-full px-3.5 py-2.5 bg-[#0C0B0A] border border-white/10 text-white text-xs font-swiss focus:outline-none focus:border-white rounded-none resize-none"
                      />
                    </div>

                    {/* Botón de Envío en Bloque Sólido */}
                    <button
                      type="submit"
                      className="w-full py-4 bg-[#F5F5F0] hover:bg-white text-[#0C0B0A] font-swiss text-xs font-semibold uppercase tracking-wider transition-colors rounded-none"
                    >
                      {language === 'es' ? 'Registrar consulta (Simulación) ↗' : 'Submit commission (Simulation) ↗'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 9. TRANSICIÓN MONOLÍTICA AL SIGUIENTE CASO DE ESTUDIO: 04 / SŌMA FORMULATIONS */}
        <section
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 font-swiss"
          aria-label={language === 'es' ? 'Transición de proyecto' : 'Project transition'}
        >
          <div className="border border-white/10 bg-[#121110] p-8 sm:p-14 flex flex-col lg:flex-row lg:items-center justify-between gap-8 rounded-none">
            <div className="space-y-3 max-w-xl">
              <span className="font-swiss text-xs text-[#94A3B8] uppercase tracking-widest block">
                {language === 'es' ? 'Siguiente caso de estudio' : 'Next case study'}
              </span>
              <h3 className="text-3xl sm:text-5xl font-swiss font-medium text-white tracking-tight">
                04 / Sōma Formulations
              </h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed font-swiss">
                {language === 'es'
                  ? 'Laboratorio de perfumería molecular, biobotánica y comercio digital de lujo.'
                  : 'Cellular skincare apothecary, biophotonic commerce, and sustainable formulation matrix.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/case-study/soma-formulations"
                className="inline-flex items-center space-x-2.5 px-7 py-4 bg-[#F4F1EA] hover:bg-white text-[#121110] text-xs font-swiss font-semibold tracking-wider uppercase transition-colors rounded-none"
              >
                <span>{language === 'es' ? 'Explorar Sōma Formulations →' : 'Explore Sōma Formulations →'}</span>
              </Link>

              <Link
                href="/#work"
                className="inline-flex items-center space-x-2 px-6 py-4 bg-transparent hover:bg-white/5 border border-white/15 text-xs font-mono text-[#94A3B8] hover:text-white transition-colors rounded-none"
              >
                <span>{language === 'es' ? '← Volver al portafolio' : '← Back to portfolio'}</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* 10. MODAL LIGHTBOX DE FOTOGRAFÍA ARQUITECTÓNICA */}
      <AnimatePresence>
        {lightboxFrame && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={lightboxFrame.title[language]}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8 font-swiss"
          >
            {/* Barra Superior del Lightbox */}
            <div className="flex items-center justify-between text-xs font-mono text-white/80 border-b border-white/10 pb-4">
              <div className="flex items-center space-x-3">
                <span className="text-white font-bold">MONOLITH // REGISTRO</span>
                <span>—</span>
                <span className="uppercase text-[#94A3B8]">{lightboxFrame.location}</span>
              </div>

              <button
                type="button"
                onClick={() => setLightboxFrame(null)}
                className="p-2 bg-white/10 hover:bg-white/20 text-white transition-colors rounded-none"
                aria-label="Cerrar modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Imagen Central */}
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

            {/* Pie del Lightbox */}
            <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-swiss text-[#94A3B8]">
              <div>
                <h4 className="font-swiss font-medium text-base text-white">
                  {lightboxFrame.title[language]}
                </h4>
                <p className="text-xs text-[#94A3B8]">
                  {lightboxFrame.subject[language]}
                </p>
              </div>

              <div className="font-mono text-xs text-white">
                {lightboxFrame.meta.focalLength} · {lightboxFrame.meta.aperture} · {lightboxFrame.meta.orientation} · {lightboxFrame.meta.lightCondition[language]}
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
