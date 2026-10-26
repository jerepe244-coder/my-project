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
      <div className="min-h-screen bg-zy-bg text-zy-fg pt-20 pb-20">
        {/* 1. HOTEL HEADER: AURA Identity, In-Page Navigation & Booking CTA */}
        <div className="sticky top-16 z-30 bg-zy-bg/90 backdrop-blur-md border-b border-zy-border-subtle transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Link
                href="/#work"
                className="inline-flex items-center space-x-1.5 text-xs font-mono text-zy-muted hover:text-zy-fg transition-colors pr-3 border-r border-zy-border"
              >
                <ArrowLeft size={13} />
                <span>{language === 'es' ? 'ZYRVAE' : 'ZYRVAE'}</span>
              </Link>

              <a
                href="#aura-hero"
                onClick={(e) => scrollToSection(e, 'aura-hero')}
                className="flex items-baseline space-x-2 group"
              >
                <span className="font-sans font-bold tracking-[0.22em] text-sm sm:text-base text-zy-fg">
                  AURA
                </span>
                <span className="font-mono text-[10px] tracking-[0.2em] text-zy-muted uppercase hidden sm:inline">
                  Sanctuary · Patagonia
                </span>
              </a>
            </div>

            {/* Hotel Navigation Links (Accessible on Desktop & Mobile) */}
            <nav
              aria-label={language === 'es' ? 'Navegación de AURA Sanctuary' : 'AURA Sanctuary navigation'}
              className="flex items-center space-x-4 sm:space-x-7 text-xs font-mono text-zy-muted overflow-x-auto py-1"
            >
              <a
                href="#aura-suites"
                onClick={(e) => scrollToSection(e, 'aura-suites')}
                className="hover:text-zy-fg transition-colors whitespace-nowrap"
              >
                {language === 'es' ? 'Suites' : 'Suites'}
              </a>
              <a
                href="#aura-experiences"
                onClick={(e) => scrollToSection(e, 'aura-experiences')}
                className="hover:text-zy-fg transition-colors whitespace-nowrap"
              >
                {language === 'es' ? 'Experiencias' : 'Experiences'}
              </a>
              <a
                href="#aura-booking"
                onClick={(e) => scrollToSection(e, 'aura-booking')}
                className="hover:text-zy-fg transition-colors whitespace-nowrap"
              >
                {language === 'es' ? 'Reserva' : 'Booking'}
              </a>
              <a
                href="#aura-info"
                onClick={(e) => scrollToSection(e, 'aura-info')}
                className="hover:text-zy-fg transition-colors whitespace-nowrap"
              >
                {language === 'es' ? 'Información' : 'Info'}
              </a>
            </nav>

            <div className="flex items-center space-x-2.5">
              <span className="hidden lg:inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-zy-surface border border-zy-border text-[10px] font-mono text-zy-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-zy-blue" />
                <span>{language === 'es' ? 'Proyecto conceptual' : 'Concept project'}</span>
              </span>

              <a
                href="#aura-booking"
                onClick={(e) => scrollToSection(e, 'aura-booking')}
                className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-zy-blue hover:bg-zy-blue-hover text-white text-xs font-mono tracking-wider transition-colors"
              >
                <span>{language === 'es' ? 'Reservar estadía' : 'Book a stay'}</span>
              </a>
            </div>
          </div>
        </div>

        {/* 2. CINEMATIC HERO */}
        <section
          id="aura-hero"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8"
          aria-label="AURA Sanctuary Hero"
        >
          <div className="relative min-h-[68vh] sm:min-h-[76vh] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-zy-border bg-[#080a0e] shadow-2xl flex flex-col justify-between p-6 sm:p-12 lg:p-16">
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-center scale-[1.01]"
            />

            {/* Layered dark cinematic gradient so typography over photography is crisp in both themes */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#060709]/92 via-[#060709]/35 to-[#060709]/30" />

            {/* Top Hero Metadata Bar */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
              <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0a0c10]/75 backdrop-blur-md border border-white/15 font-mono text-[10px] sm:text-xs text-[#e2e8f0] uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-zy-blue" />
                <span>
                  {language === 'es'
                    ? 'REFUGIO DE ALTA MONTAÑA · PATAGONIA ANDINA'
                    : 'HIGH-ALTITUDE SANCTUARY · ANDEAN PATAGONIA'}
                </span>
              </span>

              <span className="px-3 py-1 rounded-full bg-[#0a0c10]/75 backdrop-blur-md border border-white/15 font-mono text-[10px] text-[#cbd4e6] tracking-wider uppercase">
                41°08&apos;S · 71°18&apos;W // 1,640 M
              </span>
            </div>

            {/* Bottom Hero Editorial Headline & CTAs */}
            <div className="relative z-10 max-w-3xl space-y-5 pt-24">
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-6xl lg:text-7xl font-sans font-bold tracking-[-0.03em] leading-[1.02] text-white"
              >
                {project.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-base sm:text-xl text-[#e2e8f0] font-sans leading-relaxed max-w-2xl"
              >
                {language === 'es'
                  ? 'Arquitectura silenciosa en basalto y cedro natural sobre el valle glaciar. Tres refugios privados diseñados para la pausa contemplativa.'
                  : 'Silent architecture in dark basalt and natural cedar overlooking the glacial valley. Three private shelters crafted for contemplative rest.'}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap items-center gap-3 pt-2"
              >
                <a
                  href="#aura-suites"
                  onClick={(e) => scrollToSection(e, 'aura-suites')}
                  className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-zy-blue hover:bg-zy-blue-hover text-white text-xs sm:text-sm font-mono tracking-wider transition-all shadow-[0_0_24px_rgba(10,92,255,0.4)]"
                >
                  <span>{language === 'es' ? 'Explorar suites' : 'Explore suites'}</span>
                  <ArrowDown size={14} />
                </a>

                <a
                  href="#aura-booking"
                  onClick={(e) => scrollToSection(e, 'aura-booking')}
                  className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-mono tracking-wider transition-all"
                >
                  <span>{language === 'es' ? 'Planificar estadía' : 'Plan your stay'}</span>
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 3. SUITES SECTION */}
        <section
          id="aura-suites"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 scroll-mt-28"
          aria-label={language === 'es' ? 'Suites y Refugios' : 'Suites & Shelters'}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-10 border-b border-zy-border-subtle">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-zy-blue">
                {language === 'es' ? '01 // ALOJAMIENTO PRIVADO' : '01 // PRIVATE ACCOMMODATIONS'}
              </span>
              <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-zy-fg mt-2">
                {language === 'es' ? 'Tres refugios en la montaña.' : 'Three mountain shelters.'}
              </h2>
            </div>
            <p className="text-sm text-zy-muted font-sans max-w-md">
              {language === 'es'
                ? 'Cada unidad ofrece privacidad absoluta, vistas abiertas a la cordillera y acceso a las termas minerales.'
                : 'Each shelter offers complete privacy, unobstructed mountain views, and access to the mineral thermal baths.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 pt-10">
            {AURA_SUITES.map((suite, idx) => {
              const isSelected = selectedAuraSuite === idx;
              return (
                <article
                  key={suite.id}
                  className={`rounded-2xl bg-zy-card border transition-all overflow-hidden flex flex-col justify-between shadow-sm ${
                    isSelected
                      ? 'border-zy-blue ring-1 ring-zy-blue/30'
                      : 'border-zy-border-card hover:border-zy-border-strong'
                  }`}
                >
                  <div>
                    {/* Suite Image */}
                    <div className="relative aspect-[16/10] w-full bg-[#090b0f] overflow-hidden">
                      <Image
                        src={suite.image}
                        alt={suite.name[language]}
                        fill
                        sizes="(max-width: 1024px) 100vw, 400px"
                        className="object-cover object-center"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090b0f]/70 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-md bg-[#0a0c10]/80 backdrop-blur-md border border-white/10 font-mono text-[10px] text-[#cbd4e6] uppercase">
                          {suite.elevation}
                        </span>
                        <span className="px-2.5 py-1 rounded-md bg-[#0a0c10]/80 backdrop-blur-md border border-white/15 font-mono text-[10px] text-white font-semibold">
                          {suite.area}
                        </span>
                      </div>
                    </div>

                    {/* Suite Card Content */}
                    <div className="p-6 space-y-4">
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="text-xl sm:text-2xl font-sans font-bold text-zy-fg">
                          {suite.name[language]}
                        </h3>
                        <div className="text-right shrink-0">
                          <span className="text-lg font-bold font-sans text-zy-fg">${suite.baseRate}</span>
                          <span className="text-[11px] font-mono text-zy-muted">
                            /{language === 'es' ? 'noche' : 'night'}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-zy-muted font-sans leading-relaxed">
                        {suite.summary[language]}
                      </p>

                      {/* Scannable Specs (Always visible on mobile & desktop) */}
                      <div className="pt-3 border-t border-zy-border-subtle flex items-center justify-between text-xs font-mono text-zy-fg-secondary">
                        <span className="inline-flex items-center space-x-1.5">
                          <Users size={13} className="text-zy-blue" />
                          <span>
                            {language === 'es'
                              ? `Hasta ${suite.capacity} adultos`
                              : `Up to ${suite.capacity} adults`}
                          </span>
                        </span>
                        <span className="text-zy-muted truncate max-w-[170px]">
                          {suite.view[language]}
                        </span>
                      </div>

                      <ul className="space-y-1.5 pt-1 text-xs text-zy-muted">
                        {suite.amenities.slice(0, 3).map((am, i) => (
                          <li key={i} className="flex items-center space-x-2">
                            <Check size={12} className="text-zy-blue shrink-0" />
                            <span>{am[language]}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2">
                    <button
                      type="button"
                      onClick={() => handleSelectSuiteFromCard(idx)}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-mono transition-all flex items-center justify-center space-x-1.5 ${
                        isSelected
                          ? 'bg-zy-blue text-white font-semibold shadow-sm'
                          : 'bg-zy-surface hover:bg-zy-surface-hover text-zy-fg border border-zy-border'
                      }`}
                    >
                      <span>
                        {isSelected
                          ? language === 'es'
                            ? '✓ Suite seleccionada · Configurar estadía ↓'
                            : '✓ Suite selected · Configure stay ↓'
                          : language === 'es'
                            ? 'Seleccionar esta suite ↓'
                            : 'Select this suite ↓'}
                      </span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* 4. EXPERIENCES & VISUAL GALLERY */}
        <section
          id="aura-experiences"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 scroll-mt-28"
          aria-label={language === 'es' ? 'Experiencias y Galería' : 'Experiences & Gallery'}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-10 border-b border-zy-border-subtle">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-zy-blue">
                {language === 'es' ? '02 // BIENESTAR & ENTORNO' : '02 // WELLNESS & NATURE'}
              </span>
              <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-zy-fg mt-2">
                {language === 'es' ? 'Materia, agua termal y calma.' : 'Stone, thermal water & stillness.'}
              </h2>
            </div>
            <p className="text-sm text-zy-muted font-sans max-w-md">
              {language === 'es'
                ? 'Experiencias sensoriales integradas en el paisaje patagónico.'
                : 'Sensory rituals integrated into the Patagonian landscape.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10">
            {experiences.map((exp, idx) => (
              <figure
                key={idx}
                className="group rounded-2xl overflow-hidden bg-zy-card border border-zy-border-card shadow-sm flex flex-col"
              >
                <div className="relative aspect-[4/3] w-full bg-[#0b0d10] overflow-hidden">
                  <Image
                    src={exp.image}
                    alt={exp.title[language]}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#060709]/60 via-transparent to-transparent" />
                </div>

                <figcaption className="p-6 space-y-2">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-zy-blue block">
                    {exp.tag[language]}
                  </span>
                  <h3 className="text-xl font-sans font-bold text-zy-fg">
                    {exp.title[language]}
                  </h3>
                  <p className="text-xs sm:text-sm text-zy-muted font-sans leading-relaxed">
                    {exp.desc[language]}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* 5. INTEGRATED RESERVATION EXPERIENCE */}
        <section
          id="aura-booking"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 scroll-mt-28"
          aria-label={language === 'es' ? 'Reserva de estadía' : 'Stay reservation'}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-zy-blue">
                {language === 'es' ? '03 // PLANIFICAR ESTADÍA' : '03 // PLAN YOUR STAY'}
              </span>
              <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-zy-fg mt-2">
                {language === 'es' ? 'Personalizá tu reserva.' : 'Customize your stay.'}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zy-muted font-sans max-w-md">
              {language === 'es'
                ? 'Seleccioná tu suite, duración y experiencias opcionales para calcular tu estadía estimada.'
                : 'Select your suite, duration, and optional experiences to calculate your estimated stay.'}
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
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 scroll-mt-28"
          aria-label={language === 'es' ? 'Información práctica' : 'Practical information'}
        >
          <div className="pb-8 border-b border-zy-border-subtle">
            <span className="font-mono text-xs uppercase tracking-widest text-zy-blue">
              {language === 'es' ? '04 // INFORMACIÓN PRÁCTICA' : '04 // PRACTICAL INFORMATION'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-sans font-bold tracking-tight text-zy-fg mt-2">
              {language === 'es' ? 'Detalles de estadía y ubicación.' : 'Location & stay details.'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
            <div className="p-5 rounded-xl bg-zy-card border border-zy-border-card space-y-2">
              <div className="flex items-center space-x-2 text-xs font-mono text-zy-blue uppercase">
                <MapPin size={14} />
                <span>{language === 'es' ? 'Ubicación conceptual' : 'Conceptual location'}</span>
              </div>
              <p className="text-sm font-sans font-semibold text-zy-fg">
                Patagonia Andina · 1,640 m
              </p>
              <p className="text-xs text-zy-muted font-mono">
                41°08&apos;S · 71°18&apos;W
              </p>
              <p className="text-xs text-zy-muted leading-relaxed">
                {language === 'es'
                  ? 'Entorno alpino conceptual de bosque de alerces y valle glaciar.'
                  : 'Conceptual alpine setting surrounded by native larch forest and glacial valley.'}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-zy-card border border-zy-border-card space-y-2">
              <div className="flex items-center space-x-2 text-xs font-mono text-zy-blue uppercase">
                <Compass size={14} />
                <span>{language === 'es' ? 'Refugios y capacidad' : 'Shelters & capacity'}</span>
              </div>
              <p className="text-sm font-sans font-semibold text-zy-fg">
                {language === 'es' ? '3 suites independientes' : '3 independent suites'}
              </p>
              <p className="text-xs text-zy-muted leading-relaxed">
                {language === 'es'
                  ? 'Superficies de 68 m², 84 m² y 110 m². Capacidad de 1 a 4 adultos por suite.'
                  : 'Floor areas of 68 m², 84 m², and 110 m². Accommodates 1 to 4 adults per suite.'}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-zy-card border border-zy-border-card space-y-2">
              <div className="flex items-center space-x-2 text-xs font-mono text-zy-blue uppercase">
                <Sparkles size={14} />
                <span>{language === 'es' ? 'Servicios en propiedad' : 'Property services'}</span>
              </div>
              <p className="text-sm font-sans font-semibold text-zy-fg">
                {language === 'es' ? 'Bienestar y gastronomía' : 'Wellness & dining'}
              </p>
              <p className="text-xs text-zy-muted leading-relaxed">
                {language === 'es'
                  ? 'Termas de basalto, sauna de cedro, cava de altura, desayuno botánico ($35) y circuito termal ($85).'
                  : 'Basalt thermal tubs, cedar sauna, wine cellar, botanical breakfast ($35), and thermal spa ($85).'}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-zy-benefits-bg border border-zy-benefits-border space-y-2">
              <div className="flex items-center space-x-2 text-xs font-mono text-zy-blue uppercase">
                <ShieldCheck size={14} />
                <span>{language === 'es' ? 'Alcance conceptual' : 'Conceptual scope'}</span>
              </div>
              <p className="text-sm font-sans font-semibold text-zy-fg">
                ZYRVAE Digital Studio
              </p>
              <p className="text-xs text-zy-fg-secondary leading-relaxed">
                {t.conceptNotice}
              </p>
            </div>
          </div>
        </section>

        {/* 7. CLOSING & COHERENT FOOTER */}
        <section
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20"
          aria-label={language === 'es' ? 'Cierre y contacto' : 'Closing & contact'}
        >
          <div className="p-8 sm:p-12 rounded-2xl bg-zy-card border border-zy-border flex flex-col lg:flex-row lg:items-center justify-between gap-8 shadow-sm">
            <div className="space-y-2 max-w-xl">
              <span className="font-mono text-xs text-zy-blue uppercase tracking-widest">
                AURA SANCTUARY // PATAGONIA
              </span>
              <h3 className="text-2xl sm:text-4xl font-sans font-bold text-zy-fg">
                {language === 'es'
                  ? '¿Listo para experimentar la estadía?'
                  : 'Ready to experience the stay?'}
              </h3>
              <p className="text-xs sm:text-sm text-zy-muted leading-relaxed">
                {language === 'es'
                  ? 'Probá la solicitud de reserva demostrativa o contactá a ZYRVAE para diseñar una experiencia digital a medida para tu marca de hospitalidad.'
                  : 'Try the demonstration reservation request or reach out to ZYRVAE to craft a bespoke digital experience for your hospitality brand.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setShowBookingModal(true)}
                className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-zy-blue hover:bg-zy-blue-hover text-white text-xs font-mono tracking-wider transition-all shadow-[0_0_20px_rgba(10,92,255,0.35)]"
              >
                <span>
                  {language === 'es' ? 'Reservar estadía (Demo) ↗' : 'Book stay (Demo) ↗'}
                </span>
              </button>

              <Link
                href="/#contact"
                className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-xl bg-zy-surface hover:bg-zy-surface-hover border border-zy-border text-xs font-mono text-zy-fg transition-colors"
              >
                <span>{t.ctaButton}</span>
                <ArrowUpRight size={14} className="text-zy-blue" />
              </Link>

              <Link
                href="/#work"
                className="inline-flex items-center space-x-1.5 px-4 py-3.5 rounded-xl text-xs font-mono text-zy-muted hover:text-zy-fg transition-colors"
              >
                <span>{t.back}</span>
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
    <div className="min-h-screen bg-zy-bg text-zy-fg pt-28 pb-20">
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
                // {language === 'es' ? 'Flujos & Microinteracción' : 'Interactions'}
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
                // {language === 'es' ? 'Capacidades Técnicas' : 'Capabilities'}
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

        {/* Section 06: LIVE INTERACTIVE FUNCTIONAL DEMO */}
        <section className="space-y-4 pt-8 border-t border-zy-border-subtle">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h2 className="font-mono text-xs text-zy-blue uppercase tracking-wider">
              {t.demoTitle}
            </h2>
            <span className="font-mono text-[11px] text-zy-dim">
              {t.demoNotice}
            </span>
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
                ? 'Diseñemos una solución personalizada con la misma precisión para tu marca.'
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
