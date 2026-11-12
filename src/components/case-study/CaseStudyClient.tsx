'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ProjectDetail } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import { HospitalityDemo, AURA_SUITES } from '@/components/demos/HospitalityDemo';
import { GastronomyDemo } from '@/components/demos/GastronomyDemo';
import { KonRestaurantExperience } from '@/components/case-study/KonRestaurantExperience';
import { ArchitectureDemo } from '@/components/demos/ArchitectureDemo';
import { MonolithArchitectureExperience } from '@/components/case-study/MonolithArchitectureExperience';
import { SomaCommerceExperience } from '@/components/case-study/SomaCommerceExperience';
import { EcommerceDemo } from '@/components/demos/EcommerceDemo';
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowDown,
  Sparkles,
  Check,
  Compass,
  Layers,
  Zap,
  MapPin,
  Users,
  ShieldCheck,
} from 'lucide-react';

interface CaseStudyClientProps {
  project: ProjectDetail;
}

export const CaseStudyClient: React.FC<CaseStudyClientProps> = ({ project }) => {
  const { language } = useLanguage();
  const t = translations[language].caseStudy;
  const isAura = project.slug === 'aura-sanctuary';

  const [selectedAuraSuite, setSelectedAuraSuite] = useState(0);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleSelectSuiteFromCard = (index: number) => {
    setSelectedAuraSuite(index);
    const bookingEl = document.getElementById('aura-booking');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isAura) {
    const experiences = [
      {
        tag: { es: '01 // TERMAS & MINERALIDAD', en: '01 // THERMAL WATERS & STONE' },
        title: {
          es: 'Termas minerales de basalto y cedro natural',
          en: 'Basalt mineral thermal bath & natural cedar',
        },
        desc: {
          es: 'Aguas termorreguladas frente al glaciar, vapor botánico de pino y sauna finlandés.',
          en: 'Thermoregulated waters facing the glacier, pine steam shower, and cedar Finnish sauna.',
        },
        image: project.galleryImages[1] ?? '/images/aura-detail-1.webp',
      },
      {
        tag: { es: '02 // COCINA DE ESTACIÓN', en: '02 // SEASONAL TABLE' },
        title: {
          es: 'Gastronomía botánica de estación en suite',
          en: 'Seasonal botanical gastronomy in suite',
        },
        desc: {
          es: 'Recolección andina diaria, desayuno botánico servido en privado y cava de altura.',
          en: 'Daily Andean foraging, private in-suite botanical breakfast, and high-altitude cellar.',
        },
        image: project.galleryImages[2] ?? '/images/aura-detail-2.webp',
      },
    ];

    return (
      <div className="min-h-screen min-h-svh bg-[#070D09] text-white pt-16 sm:pt-20 pb-16 sm:pb-20 font-swiss">
        {/* 1. HOTEL EXPEDIENT HEADER: Swiss 0.5px Continuous Folio Bar */}
        <div className="sticky top-16 z-30 bg-[#0A0A0C]/95 backdrop-blur-md border-b border-white/10 text-white font-swiss">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0 flex items-stretch justify-between h-12">
            {/* Izquierda: Volver a Zyrvae */}
            <div className="flex items-center">
              <Link
                href="/#work"
                className="inline-flex items-center space-x-2 text-xs font-mono text-[#94A3B8] hover:text-white transition-colors pr-4 border-r border-white/10 h-full"
              >
                <ArrowLeft size={13} />
                <span>{language === 'es' ? 'Volver a Zyrvae' : 'Back to Zyrvae'}</span>
              </Link>
            </div>

            {/* Centro: 01 / Aura Sanctuary — Patagonia */}
            <div className="hidden md:flex items-center px-4 font-swiss text-xs font-medium text-white/90 tracking-[0.015em]">
              <span>01 / Aura Sanctuary — Patagonia</span>
            </div>

            {/* Navegación Interior */}
            <nav
              aria-label={language === 'es' ? 'Navegación de AURA Sanctuary' : 'AURA Sanctuary navigation'}
              className="hidden lg:flex items-center space-x-6 text-xs text-[#94A3B8] font-swiss"
            >
              <a href="#aura-suites" onClick={(e) => scrollToSection(e, 'aura-suites')} className="hover:text-white transition-colors">
                {language === 'es' ? 'Suites' : 'Suites'}
              </a>
              <a href="#aura-experiences" onClick={(e) => scrollToSection(e, 'aura-experiences')} className="hover:text-white transition-colors">
                {language === 'es' ? 'Bienestar' : 'Wellness'}
              </a>
              <a href="#aura-booking" onClick={(e) => scrollToSection(e, 'aura-booking')} className="hover:text-white transition-colors">
                {language === 'es' ? 'Pliego de Reserva' : 'Folio'}
              </a>
              <a href="#aura-info" onClick={(e) => scrollToSection(e, 'aura-info')} className="hover:text-white transition-colors">
                {language === 'es' ? 'Detalles' : 'Details'}
              </a>
            </nav>

            {/* Derecha: Reservar estadía en bloque sólido rectangular sin redondeo */}
            <div className="flex items-stretch">
              <a
                href="#aura-booking"
                onClick={(e) => scrollToSection(e, 'aura-booking')}
                className="inline-flex items-center px-5 bg-[#1E2B22] hover:bg-white hover:text-black text-white text-xs font-swiss font-medium tracking-wider transition-colors border-l border-white/10"
              >
                <span>{language === 'es' ? 'Reservar estadía ↓' : 'Book a stay ↓'}</span>
              </a>
            </div>
          </div>
        </div>

        {/* 2. CINEMATIC HERO: Swiss Monumental Architectural Sheet */}
        <section
          id="aura-hero"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8"
          aria-label="AURA Sanctuary Hero"
        >
          <motion.div
            layoutId={`case-study-image-${project.slug}`}
            style={{ viewTransitionName: `case-study-image-${project.slug}` }}
            className="relative min-h-[68svh] sm:min-h-[76svh] w-full rounded-none overflow-hidden border border-white/10 bg-[#080a0e] flex flex-col justify-between p-6 sm:p-12 lg:p-16"
          >
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-center scale-[1.01]"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#060709]/95 via-[#060709]/40 to-[#060709]/30" />

            {/* Top Hero Datum: Impreso directamente en la retícula */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#E2E8F0]/80">
              <span className="tracking-widest uppercase">
                {language === 'es'
                  ? 'REFUGIO DE ALTA MONTAÑA · PATAGONIA ANDINA'
                  : 'HIGH-ALTITUDE SANCTUARY · ANDEAN PATAGONIA'}
              </span>
              <span className="tracking-wider">
                41°08′S · 71°18′W // 1.640 M
              </span>
            </div>

            {/* Bottom Hero Editorial Headline & CTAs */}
            <div className="relative z-10 max-w-3xl space-y-6 pt-16 sm:pt-24">
              <motion.h1
                layoutId={`case-study-title-${project.slug}`}
                style={{ viewTransitionName: `case-study-title-${project.slug}` }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-white"
              >
                <span className="font-bold font-sans tracking-[-0.04em]">AURA </span>
                <span className="font-serif-editorial italic font-normal text-white/90">Sanctuary</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif-editorial italic text-lg sm:text-2xl text-[#E2E8F0]/90 leading-relaxed max-w-2xl font-normal"
              >
                {language === 'es'
                  ? 'Arquitectura silenciosa en basalto y cedro natural sobre el valle glaciar. Tres refugios privados diseñados para la pausa contemplativa.'
                  : 'Silent architecture in dark basalt and natural cedar overlooking the glacial valley. Three private shelters crafted for contemplative rest.'}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <a
                  href="#aura-suites"
                  onClick={(e) => scrollToSection(e, 'aura-suites')}
                  className="inline-flex items-center space-x-2 px-6 py-3.5 bg-[#EFEFEA] hover:bg-white text-[#0A0A0C] text-xs sm:text-sm font-swiss font-medium tracking-wider rounded-none transition-colors"
                >
                  <span>{language === 'es' ? 'Explorar suites ↓' : 'Explore suites ↓'}</span>
                </a>

                <a
                  href="#aura-booking"
                  onClick={(e) => scrollToSection(e, 'aura-booking')}
                  className="inline-flex items-center space-x-2 px-6 py-3.5 bg-black/40 hover:bg-white/10 border border-white/20 text-white text-xs sm:text-sm font-swiss font-medium tracking-wider rounded-none transition-colors"
                >
                  <span>{language === 'es' ? 'Planificar estadía' : 'Plan your stay'}</span>
                </a>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* 3. SUITES: Architectural Catalogue Folio Sheet */}
        <section
          id="aura-suites"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 scroll-mt-28"
          aria-label={language === 'es' ? 'Suites y Refugios' : 'Suites & Shelters'}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-white/10">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#94A3B8]">
                {language === 'es' ? 'Lámina 01 — Alojamiento' : 'Plate 01 — Accommodations'}
              </span>
              <h2 className="text-3xl sm:text-5xl font-swiss font-medium tracking-tight text-white mt-1.5 text-balance">
                {language === 'es' ? 'Tres refugios en la montaña.' : 'Three mountain shelters.'}
              </h2>
            </div>
            <p className="text-sm text-[#94A3B8] font-swiss max-w-md">
              {language === 'es'
                ? 'Privacidad absoluta, vistas abiertas a la cordillera y acceso a las termas minerales de basalto.'
                : 'Complete privacy, unobstructed mountain horizons, and private basalt thermal bath access.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 border-b border-l border-white/10 pt-0">
            {AURA_SUITES.map((suite, idx) => {
              const isSelected = selectedAuraSuite === idx;
              return (
                <article
                  key={suite.id}
                  className={`border-r border-t border-white/10 bg-[#0B130E] rounded-none flex flex-col justify-between transition-colors ${
                    isSelected ? 'bg-[#0E1712]' : 'hover:bg-[#0E1712]/50'
                  }`}
                >
                  <div>
                    <div className="relative aspect-[16/10] w-full bg-[#050907] overflow-hidden">
                      <Image
                        src={suite.image}
                        alt={suite.name[language]}
                        fill
                        sizes="(max-width: 1024px) 100vw, 400px"
                        className="object-cover object-center"
                      />
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="flex items-baseline justify-between gap-2 border-b border-white/10 pb-3">
                        <h3 className="text-xl font-swiss font-medium text-white">
                          {suite.name[language]}
                        </h3>
                        <div className="text-right shrink-0">
                          <span className="text-lg font-serif-editorial italic text-white">${suite.baseRate}</span>
                          <span className="text-[11px] font-mono text-[#94A3B8] ml-1">
                            /{language === 'es' ? 'noche' : 'night'}
                          </span>
                        </div>
                      </div>

                      {/* Especificaciones Técnicas en Tabla */}
                      <div className="grid grid-cols-2 gap-2 text-xs font-mono text-[#94A3B8] border-b border-white/10 pb-3">
                        <div>
                          <span className="block text-[10px] uppercase text-white/50">{language === 'es' ? 'Superficie' : 'Area'}</span>
                          <span className="text-white">{suite.area}</span>
                        </div>
                        <div>
                          <span className="block text-[10px] uppercase text-white/50">{language === 'es' ? 'Cota' : 'Elevation'}</span>
                          <span className="text-white">{suite.elevation.split('·')[0]}</span>
                        </div>
                      </div>

                      <p className="text-xs text-[#94A3B8] font-sans leading-relaxed">
                        {suite.summary[language]}
                      </p>

                      <div className="space-y-1.5 pt-1 text-xs text-[#94A3B8]">
                        {suite.amenities.slice(0, 3).map((am, i) => (
                          <div key={i} className="flex items-center space-x-2">
                            <span className="text-white/30">—</span>
                            <span className="text-white/80">{am[language]}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      type="button"
                      onClick={() => handleSelectSuiteFromCard(idx)}
                      className={`w-full py-3 px-4 rounded-none text-xs font-swiss font-medium tracking-wider uppercase transition-colors cursor-pointer flex items-center justify-center space-x-2 ${
                        isSelected
                          ? 'bg-white text-black font-semibold'
                          : 'bg-[#1E2B22] hover:bg-white hover:text-black text-white'
                      }`}
                    >
                      <span>
                        {isSelected
                          ? language === 'es'
                            ? 'Refugio seleccionado'
                            : 'Selected shelter'
                          : language === 'es'
                            ? 'Configurar estadía ↓'
                            : 'Configure stay ↓'}
                      </span>
                      <ArrowDown size={13} />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* 4. EXPERIENCES: Wellness & Nature Folio */}
        <section
          id="aura-experiences"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 scroll-mt-28"
          aria-label={language === 'es' ? 'Experiencias y Bienestar' : 'Wellness & Nature'}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-white/10">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#94A3B8]">
                {language === 'es' ? 'Lámina 02 — Bienestar' : 'Plate 02 — Wellness'}
              </span>
              <h2 className="text-3xl sm:text-5xl font-swiss font-medium tracking-tight text-white mt-1.5 text-balance">
                {language === 'es' ? 'Materia, agua termal y silencio.' : 'Stone, thermal water & stillness.'}
              </h2>
            </div>
            <p className="text-sm text-[#94A3B8] font-swiss max-w-md">
              {language === 'es'
                ? 'Experiencias sensoriales integradas en el paisaje patagónico.'
                : 'Sensory rituals integrated into the Patagonian landscape.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 border-b border-l border-white/10 pt-0">
            {experiences.map((exp, idx) => (
              <figure
                key={idx}
                className="group border-r border-t border-white/10 bg-[#0B130E] rounded-none overflow-hidden flex flex-col"
              >
                <div className="relative aspect-[16/10] w-full bg-[#050907] overflow-hidden">
                  <Image
                    src={exp.image}
                    alt={exp.title[language]}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                </div>

                <figcaption className="p-6 sm:p-8 space-y-2.5">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-[#94A3B8] block">
                    {exp.tag[language]}
                  </span>
                  <h3 className="text-xl font-swiss font-medium text-white">
                    {exp.title[language]}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#94A3B8] font-sans leading-relaxed">
                    {exp.desc[language]}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* 5. INTEGRATED RESERVATION EXPERIENCE — LABORATORIO TÉCNICO & PROTOTIPO FUNCIONAL */}
        <section
          id="aura-booking"
          data-lab-seal="Laboratorio Técnico & Prototipo Funcional"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 scroll-mt-28"
          aria-label={language === 'es' ? 'Laboratorio Técnico & Prototipo Funcional — Cotizador de estadía AURA' : 'Technical Laboratory & Functional Prototype — AURA Stay Estimator'}
        >
          {/* Sello Oficial Fase 2: Laboratorio Técnico & Prototipo Funcional */}
          <div className="mb-6 p-4 sm:p-5 bg-[#0E1712] border border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center space-x-2.5">
              <span className="w-2 h-2 bg-[#FF3B30]" aria-hidden="true" />
              <span className="font-swiss text-[11px] font-medium tracking-[0.04em] uppercase text-white">
                Laboratorio Técnico & Prototipo Funcional
              </span>
            </div>
            <span className="font-mono text-[11px] text-[#94A3B8]">
              SPEC // AURA-ENGINE-01 · COTIZADOR INTERACTIVO EN VIVO
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#94A3B8]">
                {language === 'es' ? 'Lámina 03 — Reserva' : 'Plate 03 — Folio'}
              </span>
              <h2 className="text-3xl sm:text-5xl font-swiss font-medium tracking-tight text-white mt-1.5 text-balance">
                {language === 'es' ? 'Personalizá tu estadía.' : 'Customize your stay.'}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#94A3B8] font-swiss max-w-md">
              {language === 'es'
                ? 'Seleccioná tu refugio, duración y experiencias opcionales para calcular tu estadía.'
                : 'Select your shelter, duration, and optional experiences to estimate your stay.'}
            </p>
          </div>

          <HospitalityDemo
            selectedSuiteIndex={selectedAuraSuite}
            onSelectSuite={setSelectedAuraSuite}
            showModal={showBookingModal}
            onShowModalChange={setShowBookingModal}
          />
        </section>

        {/* 6. PRACTICAL INFORMATION & HONEST CONCEPTUAL IDENTIFICATION */}
        <section
          id="aura-info"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 scroll-mt-28"
          aria-label={language === 'es' ? 'Información práctica' : 'Practical information'}
        >
          <div className="pb-8 border-b border-white/10">
            <span className="font-mono text-xs uppercase tracking-widest text-[#94A3B8]">
              {language === 'es' ? '04 // INFORMACIÓN PRÁCTICA' : '04 // PRACTICAL INFORMATION'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-swiss font-medium tracking-tight text-white mt-1.5">
              {language === 'es' ? 'Detalles de estadía y ubicación.' : 'Location & stay details.'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-b border-l border-white/10 pt-0">
            <div className="p-6 border-r border-t border-white/10 bg-[#0B130E] space-y-2">
              <span className="block text-[11px] font-mono text-[#94A3B8] uppercase">
                {language === 'es' ? 'Ubicación' : 'Location'}
              </span>
              <p className="text-sm font-swiss font-medium text-white">
                Patagonia Andina · 1.640 m
              </p>
              <p className="text-xs text-[#94A3B8] font-mono">
                41°08′S · 71°18′W
              </p>
            </div>

            <div className="p-6 border-r border-t border-white/10 bg-[#0B130E] space-y-2">
              <span className="block text-[11px] font-mono text-[#94A3B8] uppercase">
                {language === 'es' ? 'Refugios' : 'Shelters'}
              </span>
              <p className="text-sm font-swiss font-medium text-white">
                {language === 'es' ? '3 suites independientes' : '3 independent suites'}
              </p>
              <p className="text-xs text-[#94A3B8] font-mono">
                68 m² · 84 m² · 110 m²
              </p>
            </div>

            <div className="p-6 border-r border-t border-white/10 bg-[#0B130E] space-y-2">
              <span className="block text-[11px] font-mono text-[#94A3B8] uppercase">
                {language === 'es' ? 'Bienestar' : 'Wellness'}
              </span>
              <p className="text-sm font-swiss font-medium text-white">
                {language === 'es' ? 'Termas & Silencio' : 'Thermal & Stillness'}
              </p>
              <p className="text-xs text-[#94A3B8]">
                {language === 'es' ? 'Basalto, cedro y vapor botánico' : 'Basalt, cedar & botanical steam'}
              </p>
            </div>

            <div className="p-6 border-r border-t border-white/10 bg-[#0B130E] space-y-2">
              <span className="block text-[11px] font-mono text-[#94A3B8] uppercase">
                {language === 'es' ? 'Alcance' : 'Scope'}
              </span>
              <p className="text-sm font-swiss font-medium text-white">
                ZYRVAE Digital Studio
              </p>
              <p className="text-xs text-[#94A3B8]">
                {t.conceptNotice}
              </p>
            </div>
          </div>
        </section>

        {/* 7. TRANSICIÓN MONOLÍTICA AL SIGUIENTE CASO DE ESTUDIO */}
        <section
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12"
          aria-label={language === 'es' ? 'Transición de proyecto' : 'Project transition'}
        >
          <div className="border border-white/10 bg-[#0B130E] p-8 sm:p-14 flex flex-col lg:flex-row lg:items-center justify-between gap-8 rounded-none">
            <div className="space-y-3 max-w-xl">
              <span className="font-mono text-xs text-[#94A3B8] uppercase tracking-widest block">
                {language === 'es' ? 'Siguiente caso de estudio' : 'Next case study'}
              </span>
              <h3 className="text-3xl sm:text-5xl font-swiss font-medium text-white tracking-tight">
                02 / Kôn Atelier
              </h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed font-sans">
                {language === 'es'
                  ? 'Explora el pliego de alta cocina experimental y gastronomía contemporánea.'
                  : 'Explore the experimental gastronomy portfolio and contemporary dining reservation system.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/case-study/kon-atelier"
                className="inline-flex items-center space-x-2.5 px-7 py-4 bg-[#EFEFEA] hover:bg-white text-[#0A0A0C] text-xs font-swiss font-semibold tracking-wider uppercase transition-colors rounded-none"
              >
                <span>{language === 'es' ? 'Explorar Kôn Atelier →' : 'Explore Kôn Atelier →'}</span>
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
      </div>
    );
  }
  const isKon = project.slug === 'kon-atelier';
  if (isKon) {
    return <KonRestaurantExperience project={project} />;
  }

  const isMonolith = project.slug === 'vectra-architects' || project.slug === 'monolith-studio';
  if (isMonolith) {
    return <MonolithArchitectureExperience project={project} />;
  }

  const isSoma = project.slug === 'soma-formulations';
  if (isSoma) {
    return <SomaCommerceExperience project={project} />;
  }

  const renderDemo = () => {
    switch (project.demoType) {
      case 'hospitality':
        return <HospitalityDemo />;
      case 'gastronomy':
        return <GastronomyDemo />;
      case 'architecture':
        return <ArchitectureDemo />;
      case 'ecommerce':
        return <EcommerceDemo />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen min-h-svh bg-zy-bg text-zy-fg pt-20 sm:pt-28 pb-16 sm:pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Back Link */}
        <div>
          <Link
            href="/#work"
            className="inline-flex items-center space-x-2 text-xs font-mono text-zy-muted hover:text-zy-fg transition-colors p-1"
          >
            <ArrowLeft size={14} />
            <span>{t.back}</span>
          </Link>
        </div>

        {/* Case Study Header & Honest Concept Notice */}
        <header className="space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-zy-surface border border-zy-border text-xs font-mono text-zy-fg-secondary">
            <span className="w-1.5 h-1.5 rounded-full bg-zy-blue" />
            <span>{t.conceptNotice}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-sans font-bold tracking-tight text-zy-fg">
            {project.title}
          </h1>

          <p className="text-lg sm:text-2xl text-zy-fg-secondary font-sans leading-relaxed">
            {project.tagline[language]}
          </p>

          {/* Metadata Grid */}
          <div className="pt-6 border-t border-zy-border-subtle grid grid-cols-2 sm:grid-cols-4 gap-6 font-mono text-xs">
            <div>
              <span className="text-zy-dim block uppercase">// {t.clientLabel}</span>
              <span className="text-zy-fg mt-1.5 block font-medium">ZYRVAE Lab</span>
            </div>
            <div>
              <span className="text-zy-dim block uppercase">// {t.categoryLabel}</span>
              <span className="text-zy-fg mt-1.5 block font-medium">{project.categoryLabel[language]}</span>
            </div>
            <div>
              <span className="text-zy-dim block uppercase">// {t.yearLabel}</span>
              <span className="text-zy-fg mt-1.5 block font-medium">{project.year}</span>
            </div>
            <div>
              <span className="text-zy-dim block uppercase">// STATUS</span>
              <span className="text-zy-blue mt-1.5 block font-semibold">CONCEPT</span>
            </div>
          </div>
        </header>

        {/* Primary Visual Cover Asset */}
        <figure className="space-y-3">
          <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-zy-border bg-[#0c0d10] shadow-xl">
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
              priority
            />
          </div>
        </figure>

        {/* Section 01: Client Context & Design Goal */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 border-t border-zy-border-subtle">
          <div className="md:col-span-4">
            <h2 className="font-mono text-xs text-zy-blue uppercase tracking-wider">
              {t.objectiveTitle}
            </h2>
          </div>
          <div className="md:col-span-8 space-y-6 text-sm sm:text-base text-zy-muted font-sans leading-relaxed">
            <p className="text-zy-fg font-medium">
              {project.designGoal[language]}
            </p>
            <p>{project.clientContext[language]}</p>
          </div>
        </section>

        {/* Section 02: Visual & Typographic Decisions */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 border-t border-zy-border-subtle">
          <div className="md:col-span-4">
            <h2 className="font-mono text-xs text-zy-blue uppercase tracking-wider">
              {t.visualDecisionsTitle}
            </h2>
          </div>
          <div className="md:col-span-8 space-y-4">
            {project.visualDecisions.map((decision, i) => (
              <div key={i} className="p-4 rounded-xl bg-zy-card-alt border border-zy-border-card flex items-start space-x-3">
                <Compass size={16} className="text-zy-blue shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-zy-fg-secondary font-sans leading-relaxed">
                  {decision[language]}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Detail Images Carousel / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {project.galleryImages.slice(1).map((img, i) => (
            <figure key={i} className="group space-y-3">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-zy-border bg-[#0b0d10] shadow-lg">
                <Image
                  src={img}
                  alt={`${project.title} detail ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </figure>
          ))}
        </div>

        {/* Section 03 & 04: Interactions & Engineered Features */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 border-t border-zy-border-subtle">
          <div className="md:col-span-4 space-y-6">
            <div>
              <h2 className="font-mono text-xs text-zy-blue uppercase tracking-wider">
                {t.interactionsTitle}
              </h2>
            </div>
            <div>
              <h2 className="font-mono text-xs text-zy-blue uppercase tracking-wider">
                {t.featuresTitle}
              </h2>
            </div>
          </div>
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-3">
              <span className="font-mono text-xs text-zy-dim uppercase block">
                // {language === 'es' ? 'Flujos & MicrointeracciÃ³n' : 'Interactions'}
              </span>
              {project.interactions.map((int, i) => (
                <div key={i} className="p-3.5 bg-zy-card-alt border border-zy-border-card rounded-xl text-xs text-zy-fg-secondary flex items-start space-x-2">
                  <Layers size={14} className="text-zy-blue shrink-0 mt-0.5" />
                  <span>{int[language]}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <span className="font-mono text-xs text-zy-dim uppercase block">
                // {language === 'es' ? 'Capacidades TÃ©cnicas' : 'Capabilities'}
              </span>
              {project.features.map((feat, i) => (
                <div key={i} className="p-3.5 bg-zy-card-alt border border-zy-border-card rounded-xl text-xs text-zy-fg-secondary flex items-start space-x-2">
                  <Zap size={14} className="text-zy-blue shrink-0 mt-0.5" />
                  <span>{feat[language]}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 05: Hypothetical Potential Commercial Benefits */}
        <section className="p-6 sm:p-8 rounded-2xl bg-zy-benefits-bg border border-zy-benefits-border space-y-4">
          <div className="flex items-center space-x-2 text-xs font-mono text-zy-blue">
            <Sparkles size={14} />
            <h2 className="uppercase tracking-wider">{t.benefitsTitle}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {project.potentialBenefits.map((benefit, i) => (
              <div key={i} className="flex items-start space-x-3 text-xs sm:text-sm text-zy-fg-secondary font-sans">
                <Check size={16} className="text-zy-blue shrink-0 mt-0.5" />
                <p>{benefit[language]}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 06: LIVE INTERACTIVE FUNCTIONAL DEMO â€” LABORATORIO TÃ‰CNICO & PROTOTIPO FUNCIONAL */}
        <section className="space-y-4 pt-8 border-t border-zy-border-subtle">
          <div className="p-4 bg-zy-surface border border-zy-grid-line monolith-hairline flex flex-wrap items-center justify-between gap-2">
            <div className="inline-flex items-center space-x-2">
              <span className="w-2 h-2 bg-[#FF3B30]" aria-hidden="true" />
              <span className="font-editorial-micro text-[10px] font-semibold uppercase tracking-[0.04em] text-zy-fg">
                Laboratorio TÃ©cnico &amp; Prototipo Funcional
              </span>
            </div>
            <span className="font-mono text-[11px] text-zy-dim">
              {t.demoNotice}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h2 className="font-mono text-xs text-zy-blue uppercase tracking-wider">
              {t.demoTitle}
            </h2>
          </div>

          {/* Render corresponding interactive demo */}
          {renderDemo()}
        </section>

        {/* CTA to start a similar project */}
        <div className="pt-16 pb-8 border-t border-zy-border-subtle flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-sans font-bold text-zy-fg">
              {t.ctaTitle}
            </h3>
            <p className="text-xs sm:text-sm text-zy-muted">
              {language === 'es'
                ? 'DiseÃ±emos una soluciÃ³n personalizada con la misma precisiÃ³n para tu marca.'
                : 'Let us engineer a custom solution with the same precision for your brand.'}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/#contact"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-zy-blue hover:bg-zy-blue-hover text-white text-xs font-medium tracking-wide shadow-[0_0_20px_rgba(10,92,255,0.4)] transition-all"
            >
              <span>{t.ctaButton}</span>
              <ArrowUpRight size={14} />
            </Link>

            <Link
              href="/#work"
              className="px-5 py-3 rounded-full bg-zy-surface hover:bg-zy-surface-hover border border-zy-border text-xs font-mono text-zy-fg-secondary hover:text-zy-fg transition-colors"
            >
              {t.back}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
