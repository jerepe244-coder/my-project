'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectDetail } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import {
  KON_CATEGORIES,
  KON_DISHES,
  KON_SIGNATURE_DISHES,
  KON_AMBIENCE_SPACES,
  KON_TABLE_ZONES,
  DishItem,
} from '@/data/gastronomy';
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowDown,
  Sparkles,
  Check,
  Wine,
  Flame,
  Clock,
  MapPin,
  ShieldCheck,
  X,
  ChevronRight,
} from 'lucide-react';

interface KonRestaurantExperienceProps {
  project: ProjectDetail;
}

const ALLOWED_GUESTS_BY_ZONE: Record<string, number[]> = {
  hearth: [1, 2],
  stone: [2, 4],
  alcove: [2, 4, 6],
  vault: [4, 6],
};

export const KonRestaurantExperience: React.FC<KonRestaurantExperienceProps> = ({ project }) => {
  const { language } = useLanguage();

  // Menu State
  const [courseCount, setCourseCount] = useState<7 | 11>(7);
  const [pairingActive, setPairingActive] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'plant-forward' | 'pescatarian' | 'gluten-free'>('all');

  // Dish Detail Modal State
  const [inspectDish, setInspectDish] = useState<DishItem | null>(null);

  // Reservation Simulator State
  const [selectedZone, setSelectedZone] = useState<string>('hearth');
  const [selectedTurn, setSelectedTurn] = useState<'early' | 'late'>('early');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [selectedDate, setSelectedDate] = useState<string>('2026-11-14');
  const [guestName, setGuestName] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [dietaryNotes, setDietaryNotes] = useState<string>('');
  const [simulationConfirmed, setSimulationConfirmed] = useState<boolean>(false);
  const [simulationCode, setSimulationCode] = useState<string>('');

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleZoneChange = (zoneId: string) => {
    setSelectedZone(zoneId);
    const allowed = ALLOWED_GUESTS_BY_ZONE[zoneId] || [1, 2, 4, 6];
    if (!allowed.includes(guestCount)) {
      setGuestCount(allowed[0]);
    }
  };

  // Filter 7 or 11 courses
  const baseCourses = courseCount === 7
    ? KON_DISHES.filter((d) => !['salt-beetroot', 'deep-prawn', 'sweetbreads-applewood'].includes(d.id))
    : KON_DISHES;

  // Filter by category
  const categoryFiltered = activeCategory === 'all'
    ? baseCourses
    : baseCourses.filter((d) => d.category === activeCategory);

  // Filter by dietary preference
  const filteredDishes = dietaryFilter === 'all'
    ? categoryFiltered
    : categoryFiltered.filter((d) => d.dietary.includes(dietaryFilter));

  // Pricing Calculation
  const baseMenuPrice = courseCount === 7 ? 110 : 165;
  const winePairingPrice = pairingActive ? (courseCount === 7 ? 55 : 80) : 0;
  const perPersonTotal = baseMenuPrice + winePairingPrice;
  const grandTotalEstimate = perPersonTotal * guestCount;

  const handleConfirmSimulation = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = 'KON-' + Math.floor(1000 + Math.random() * 9000);
    setSimulationCode(randomCode);
    setSimulationConfirmed(true);
  };

  return (
    <div className="min-h-screen min-h-svh bg-[#0C0B0A] text-[#F4F1EA] pt-16 sm:pt-20 pb-16 sm:pb-20 font-swiss">
      {/* 1. RESTAURANT EXPEDIENT HEADER: Swiss 0.5px Continuous Folio Bar */}
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

          {/* Centro: 02 / Kôn Atelier — Fuego & Raíces */}
          <div className="hidden md:flex items-center px-2 lg:px-4 font-swiss text-xs font-medium text-[#F4F1EA]/90 tracking-[0.015em] truncate">
            <span>02 / Kôn Atelier — Fuego & Raíces</span>
          </div>

          {/* Navegación Interior Simplificada */}
          <nav
            aria-label={language === 'es' ? 'Navegación de Kôn Atelier' : 'Kôn Atelier navigation'}
            className="hidden lg:flex items-center space-x-6 text-xs text-[#94A3B8] font-swiss whitespace-nowrap"
          >
            <a
              href="#kon-concept"
              onClick={(e) => scrollToSection(e, 'kon-concept')}
              className="hover:text-white transition-colors"
            >
              {language === 'es' ? 'Manifiesto' : 'Manifesto'}
            </a>
            <a
              href="#kon-menu"
              onClick={(e) => scrollToSection(e, 'kon-menu')}
              className="hover:text-white transition-colors"
            >
              {language === 'es' ? 'Menú de estación' : 'Seasonal menu'}
            </a>
            <a
              href="#kon-booking"
              onClick={(e) => scrollToSection(e, 'kon-booking')}
              className="hover:text-white transition-colors"
            >
              {language === 'es' ? 'Reserva' : 'Reservation'}
            </a>
          </nav>

          {/* Derecha: Reservar mesa (sin recortes, shrink-0 y whitespace-nowrap) */}
          <div className="flex items-stretch shrink-0">
            <a
              href="#kon-booking"
              onClick={(e) => scrollToSection(e, 'kon-booking')}
              className="inline-flex items-center px-4 sm:px-5 bg-[#8C3B2B] hover:bg-white hover:text-black text-white text-xs font-swiss font-medium tracking-wider transition-colors border-l border-white/10 whitespace-nowrap shrink-0"
            >
              <span>{language === 'es' ? 'Reservar mesa ↓' : 'Book a table ↓'}</span>
            </a>
          </div>
        </div>
      </header>

      {/* 2. CINEMATIC HERO: Editorial Gastronomy Photography & Phaidon Style Typography */}
      <section
        id="kon-hero"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 scroll-mt-24"
        aria-label="KÔN Atelier Hero"
      >
        <motion.div
          layoutId={`case-study-image-${project.slug}`}
          style={{ viewTransitionName: `case-study-image-${project.slug}` }}
          className="relative min-h-[68svh] sm:min-h-[76svh] w-full rounded-none overflow-hidden border border-white/10 bg-[#0a0907] flex flex-col justify-between p-6 sm:p-12 lg:p-16"
        >
          <Image
            src={project.coverImage || '/images/kon-hero.webp'}
            alt="KÔN Atelier - Avant-garde seasonal gastronomy dish with hearth fire glow"
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover object-center scale-[1.01]"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0907]/95 via-[#0a0907]/40 to-[#0a0907]/30" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0a0907]/80 via-transparent to-transparent" />

          {/* Top Hero Datum: Impreso directamente sin cápsulas redondeadas */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#F4F1EA]/80">
            <span className="tracking-widest uppercase">
              {language === 'es'
                ? 'COCINA DE FUEGO & BOTÁNICA ESTACIONAL'
                : 'OPEN HEARTH FIRE & SEASONAL BOTANY'}
            </span>
            <span className="tracking-wider">
              41°10′S · 71°16′W // 1.420 M · PATAGONIA
            </span>
          </div>

          {/* Bottom Hero Headline & Direct CTAs */}
          <div className="relative z-10 max-w-3xl space-y-6 pt-16 sm:pt-24">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-2"
            >
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#d49b57]">
                ATELIER CULINARIO
              </span>
              <motion.h1
                layoutId={`case-study-title-${project.slug}`}
                style={{ viewTransitionName: `case-study-title-${project.slug}` }}
                className="text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-white"
              >
                <span className="font-bold font-sans tracking-[-0.04em]">KÔN </span>
                <span className="font-serif-editorial italic font-normal text-white/95">Atelier</span>
              </motion.h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif-editorial italic text-lg sm:text-2xl text-[#F4F1EA]/90 leading-relaxed max-w-2xl font-normal"
            >
              {language === 'es'
                ? 'Cocina de estación, fermentos salvajes y fuego vivo en vajilla de autor. Una pausa contemplativa entre el bosque nativo y el rescoldo de brasas.'
                : 'Seasonal cooking, wild ferments, and open hearth fire on handcrafted stoneware. A contemplative interlude between native forest and glowing embers.'}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <a
                href="#kon-menu"
                onClick={(e) => scrollToSection(e, 'kon-menu')}
                className="inline-flex items-center space-x-2 px-6 py-3.5 bg-[#F4F1EA] hover:bg-white text-[#121110] text-xs sm:text-sm font-swiss font-medium tracking-wider rounded-none transition-colors"
              >
                <span>{language === 'es' ? 'Explorar menú de estación ↓' : 'Explore seasonal menu ↓'}</span>
              </a>

              <a
                href="#kon-booking"
                onClick={(e) => scrollToSection(e, 'kon-booking')}
                className="inline-flex items-center space-x-2 px-6 py-3.5 bg-black/40 hover:bg-white/10 border border-white/20 text-white text-xs sm:text-sm font-swiss font-medium tracking-wider rounded-none transition-colors"
              >
                <span>{language === 'es' ? 'Solicitar mesa' : 'Request table'}</span>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 3. PRESENTATION OF THE CONCEPT: Philosophy, Pillars & Architectural Stone Hall */}
      <section
        id="kon-concept"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 scroll-mt-24"
        aria-label={language === 'es' ? 'Concepto Culinario' : 'Culinary Concept'}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-[#94A3B8]">
              {language === 'es' ? '01 // MANIFIESTO CULINARIO' : '01 // CULINARY MANIFESTO'}
            </span>
            <h2 className="text-3xl sm:text-5xl font-swiss font-medium tracking-tight text-[#F4F1EA]">
              {language === 'es'
                ? 'El fuego como origen. La botánica como pulso.'
                : 'Fire as origin. Botany as cadence.'}
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed font-sans">
              {language === 'es'
                ? 'KÔN Atelier reemplaza la rigidez de las cartas gastronómicas convencionales con una propuesta viva. Cada plato dialoga con la recolección de micro-temporadas andinas: desde las primeras morchellas tras la lluvia hasta las bayas de saúco maduradas en altura.'
                : 'KÔN Atelier departs from static fine dining formulas with an alive seasonal cadence. Every course dialogues with micro-harvest cycles: from wild morels following early spring rain to high-altitude elderberries.'}
            </p>

            {/* Three Conceptual Pillars en Celdas Rectangulares de 0.5px */}
            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-none bg-[#121110] border border-white/10 flex items-start space-x-3.5">
                <Flame size={18} className="text-[#d49b57] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-mono font-semibold uppercase text-white">
                    {language === 'es' ? 'Fuego de Quebracho & Rescoldo' : 'Hardwood Embers & Resinous Smoke'}
                  </h3>
                  <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed font-sans">
                    {language === 'es'
                      ? 'Cocciones lentas sobre brasas abiertas sin gas ni artificios. Mineralidad y calor puro.'
                      : 'Slow cooking directly over open hardwood embers without gas or contrivances.'}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-none bg-[#121110] border border-white/10 flex items-start space-x-3.5">
                <Sparkles size={18} className="text-[#8C3B2B] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-mono font-semibold uppercase text-white">
                    {language === 'es' ? 'Fermentos & Cavas Vivas' : 'Wild Ferments & Living Cellar'}
                  </h3>
                  <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed font-sans">
                    {language === 'es'
                      ? 'Miso de piñón de araucaria, garums de trucha y vinagres botánicos elaborados in situ.'
                      : 'Indigenous araucaria pine-nut miso, lake trout garums, and in-house botanical vinegars.'}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-none bg-[#121110] border border-white/10 flex items-start space-x-3.5">
                <Clock size={18} className="text-[#94A3B8] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-mono font-semibold uppercase text-white">
                    {language === 'es' ? 'Dos Turnos Exclusivos' : 'Two Intimate Seatings'}
                  </h3>
                  <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed font-sans">
                    {language === 'es'
                      ? 'Máximo 18 comensales por servicio (19:30 y 21:45 hs). Silencio y atención personalizada.'
                      : 'Capped at 18 guests per service (19:30 and 21:45). Intimate dining experience.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] w-full rounded-none overflow-hidden border border-white/10 bg-[#080706]">
              <Image
                src="/images/kon-interior.webp"
                alt="KÔN Atelier interior dining hall with monolithic stone and hearth"
                fill
                sizes="(max-width: 1024px) 100vw, 700px"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-[#F4F1EA]">
                <span>SALA PRINCIPAL // BASALTO & FUEGO</span>
                <span className="text-[#94A3B8]">CAP. 18 COMENSALES</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SEASONAL MENU: Dual Tasting Switcher, Wine Pairing Toggle & Real-Time Dietary Filter — LABORATORIO TÉCNICO & PROTOTIPO FUNCIONAL */}
      <section
        id="kon-menu"
        data-lab-seal="Laboratorio Técnico & Prototipo Funcional"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 scroll-mt-24"
        aria-label={language === 'es' ? 'Laboratorio Técnico & Prototipo Funcional — Menú de Estación KÔN' : 'Technical Laboratory & Functional Prototype — KÔN Seasonal Menu'}
      >
        {/* Sello Oficial Fase 2: Laboratorio Técnico & Prototipo Funcional */}
        <div className="mb-6 p-4 sm:p-5 bg-[#121110] border border-white/10 flex flex-wrap items-center justify-between gap-3 rounded-none">
          <div className="inline-flex items-center space-x-2.5">
            <span className="w-2 h-2 bg-[#FF3B30]" aria-hidden="true" />
            <span className="font-swiss text-[11px] font-medium tracking-[0.04em] uppercase text-white">
              Laboratorio Técnico & Prototipo Funcional
            </span>
          </div>
          <span className="font-mono text-[11px] text-[#94A3B8]">
            SPEC // KON-ENGINE-02 · CONFIGURADOR GASTRONÓMICO & RESERVA
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-white/10">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#94A3B8]">
              {language === 'es' ? 'Lámina 01 — Propuesta Gastronómica' : 'Plate 01 — Culinary Proposal'}
            </span>
            <h2 className="text-3xl sm:text-5xl font-swiss font-medium tracking-tight text-white mt-1.5 text-balance">
              {language === 'es' ? 'Menú de Estación & Maridajes' : 'Seasonal Menu & Cellar Pairings'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#94A3B8] font-swiss max-w-md">
            {language === 'es'
              ? 'Dos recorridos de degustación curados. Valores ilustrativos calculados en tiempo real según la opción de maridaje seleccionada.'
              : 'Two curated tasting journeys. Illustrative rates calculated live based on natural wine pairing choices.'}
          </p>
        </div>

        {/* Barra de Controles Técnica con Bordes Rectos (0px) */}
        <div className="p-4 sm:p-5 rounded-none bg-[#121110] border border-white/10 mt-8 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Conmutador 7 vs 11 Pasos */}
            <div className="flex items-center space-x-3">
              <span className="text-xs font-swiss text-[#94A3B8]">
                {language === 'es' ? 'Recorrido:' : 'Experience:'}
              </span>
              <div className="inline-flex rounded-none bg-[#0C0B0A] p-0.5 border border-white/10">
                <button
                  type="button"
                  onClick={() => setCourseCount(7)}
                  className={`px-4 py-2 text-xs font-swiss transition-colors rounded-none cursor-pointer ${
                    courseCount === 7
                      ? 'bg-[#8C3B2B] text-white font-medium'
                      : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  7 {language === 'es' ? 'Pasos ($110 USD)' : 'Courses ($110 USD)'}
                </button>
                <button
                  type="button"
                  onClick={() => setCourseCount(11)}
                  className={`px-4 py-2 text-xs font-swiss transition-colors rounded-none cursor-pointer ${
                    courseCount === 11
                      ? 'bg-[#8C3B2B] text-white font-medium'
                      : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  11 {language === 'es' ? 'Pasos · Gran Recorrido ($165 USD)' : 'Courses · Full Journey ($165 USD)'}
                </button>
              </div>
            </div>

            {/* Toggle de Maridaje & Tarifa por Comensal */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setPairingActive(!pairingActive)}
                className={`inline-flex items-center space-x-2 px-4 py-2 border text-xs font-swiss rounded-none transition-colors cursor-pointer ${
                  pairingActive
                    ? 'bg-[#181614] border-[#8C3B2B] text-white'
                    : 'bg-[#0C0B0A] border-white/10 text-[#94A3B8]'
                }`}
              >
                <Wine size={14} className={pairingActive ? 'text-[#d49b57]' : 'text-white/40'} />
                <span>
                  {language === 'es'
                    ? pairingActive
                      ? `Maridaje incluido (+${courseCount === 7 ? '$55' : '$80'} USD)`
                      : 'Sin maridaje de vinos'
                    : pairingActive
                    ? `Pairing included (+${courseCount === 7 ? '$55' : '$80'} USD)`
                    : 'Without wine pairing'}
                </span>
              </button>

              <div className="px-4 py-2 bg-[#0C0B0A] border border-white/10 font-swiss text-xs flex items-center space-x-2 rounded-none">
                <span className="text-[#94A3B8]">{language === 'es' ? 'Total comensal:' : 'Guest rate:'}</span>
                <span className="font-bold text-white font-mono">${perPersonTotal} USD</span>
              </div>
            </div>
          </div>

          {/* Filtros Dietéticos como Línea Tipográfica Continua con barras | */}
          <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-swiss">
            {/* Categorías */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-1 sm:pb-0">
              {KON_CATEGORIES.map((cat, idx) => (
                <React.Fragment key={cat.id}>
                  {idx > 0 && <span className="text-white/20 select-none">|</span>}
                  <button
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`transition-colors whitespace-nowrap cursor-pointer ${
                      activeCategory === cat.id
                        ? 'text-white font-medium underline underline-offset-4 decoration-[#8C3B2B]'
                        : 'text-[#94A3B8] hover:text-white'
                    }`}
                  >
                    {cat.label[language]}
                  </button>
                </React.Fragment>
              ))}
            </div>

            {/* Preferencias Dietéticas en Línea */}
            <div className="flex items-center space-x-2 text-xs font-swiss text-[#94A3B8]">
              <span className="text-[11px] text-white/50">{language === 'es' ? 'Filtro:' : 'Diet:'}</span>
              <button
                type="button"
                onClick={() => setDietaryFilter('all')}
                className={`cursor-pointer transition-colors ${
                  dietaryFilter === 'all' ? 'text-white font-medium underline decoration-white/60' : 'hover:text-white'
                }`}
              >
                {language === 'es' ? 'Todos' : 'All'}
              </button>
              <span className="text-white/20">|</span>
              <button
                type="button"
                onClick={() => setDietaryFilter(dietaryFilter === 'plant-forward' ? 'all' : 'plant-forward')}
                className={`cursor-pointer transition-colors ${
                  dietaryFilter === 'plant-forward' ? 'text-white font-medium underline decoration-white/60' : 'hover:text-white'
                }`}
              >
                Plant-Forward
              </button>
              <span className="text-white/20">|</span>
              <button
                type="button"
                onClick={() => setDietaryFilter(dietaryFilter === 'pescatarian' ? 'all' : 'pescatarian')}
                className={`cursor-pointer transition-colors ${
                  dietaryFilter === 'pescatarian' ? 'text-white font-medium underline decoration-white/60' : 'hover:text-white'
                }`}
              >
                Pescatarian
              </button>
              <span className="text-white/20">|</span>
              <button
                type="button"
                onClick={() => setDietaryFilter(dietaryFilter === 'gluten-free' ? 'all' : 'gluten-free')}
                className={`cursor-pointer transition-colors ${
                  dietaryFilter === 'gluten-free' ? 'text-white font-medium underline decoration-white/60' : 'hover:text-white'
                }`}
              >
                Sin Gluten
              </button>
            </div>
          </div>
        </div>

        {/* Platos en Filas Horizontales Continuas Separadas por Filetes de 0.5px (Renumeración Continua 01..07) */}
        <div className="mt-8 border-t border-b border-white/10 divide-y divide-white/10">
          {filteredDishes.length === 0 ? (
            <div className="py-12 text-center text-xs font-swiss text-[#94A3B8]">
              {language === 'es'
                ? 'No se encontraron platos que coincidan con la combinación de filtros seleccionada.'
                : 'No dishes found matching the selected combination of filters.'}
            </div>
          ) : (
            filteredDishes.map((dish, idx) => {
              const displayNum = String(idx + 1).padStart(2, '0');
              return (
                <article
                  key={dish.id}
                  onClick={() => setInspectDish(dish)}
                  className="py-6 sm:py-7 flex flex-col md:flex-row md:items-start justify-between gap-6 group cursor-pointer hover:bg-white/[0.02] transition-colors px-2 sm:px-4"
                >
                  <div className="flex items-start space-x-5 sm:space-x-8 max-w-3xl">
                    {/* Step Number in Serif (Renumerado continuo 01..07 o 01..11) */}
                    <span className="font-serif-editorial italic text-2xl sm:text-3xl text-[#94A3B8] group-hover:text-white transition-colors shrink-0 w-8">
                      {displayNum}
                    </span>

                    <div className="space-y-2">
                      <div className="flex flex-wrap items-baseline gap-3">
                        <h3 className="text-lg sm:text-xl font-swiss font-medium text-white group-hover:text-[#d49b57] transition-colors">
                          {dish.title[language]}
                        </h3>
                        {dish.isSignature && (
                          <span className="font-swiss text-[10px] text-[#8C3B2B] border border-[#8C3B2B]/40 px-1.5 py-0.5">
                            {language === 'es' ? 'Emblemático' : 'Signature'}
                          </span>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm text-[#94A3B8] font-sans leading-relaxed max-w-2xl">
                        {dish.desc[language]}
                      </p>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-swiss text-[#94A3B8]/80 pt-1">
                        <span>{dish.provenance[language]}</span>
                        {pairingActive && (
                          <span className="text-[#d49b57]/90 flex items-center space-x-1">
                            <Wine size={12} className="shrink-0" />
                            <span>{dish.pairing[language]}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex md:flex-col items-baseline md:items-end justify-between md:justify-start shrink-0 text-right space-y-1 pl-12 md:pl-0">
                    <span className="font-mono text-sm text-white font-medium">${dish.price} USD</span>
                    <span className="text-[11px] font-swiss text-[#94A3B8] group-hover:text-white transition-colors inline-flex items-center space-x-1">
                      <span>{language === 'es' ? 'Ver bodegón' : 'Inspect plate'}</span>
                      <ChevronRight size={13} />
                    </span>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </section>

      {/* 5. SIGNATURE DISHES GALLERY: Bodegón Editorial Chiaroscuro */}
      <section
        id="kon-dishes"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 scroll-mt-24"
        aria-label={language === 'es' ? 'Platos Destacados' : 'Featured Dishes'}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-white/10">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#94A3B8]">
              {language === 'es' ? 'Lámina 02 — Bodegones de Autor' : 'Plate 02 — Still Life Studies'}
            </span>
            <h2 className="text-3xl sm:text-5xl font-swiss font-medium tracking-tight text-white mt-1.5 text-balance">
              {language === 'es' ? 'Cuatro momentos de la degustación' : 'Four movements from the tasting'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#94A3B8] font-swiss max-w-md">
            {language === 'es'
              ? 'Fotografía de bodegón a arista viva. Cada pieza expresa la conjunción de humo, acidez botánica y pesca de aguas frías.'
              : 'Still-life photography. Courses balancing hearth smoke, botanical acidity, and cold-water freshness.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-b border-l border-white/10 pt-0">
          {KON_SIGNATURE_DISHES.map((dish) => (
            <article
              key={dish.id}
              onClick={() => setInspectDish(dish)}
              className="group cursor-pointer border-r border-t border-white/10 bg-[#0C0B0A] hover:bg-[#121110] transition-colors flex flex-col justify-between rounded-none"
            >
              <div>
                <div className="relative aspect-[4/3] w-full bg-[#050403] overflow-hidden">
                  {dish.image && (
                    <Image
                      src={dish.image}
                      alt={dish.title[language]}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  )}
                  <div className="absolute top-3 left-3 px-2 py-0.5 bg-black/70 backdrop-blur-sm border border-white/10 font-mono text-[9px] text-[#94A3B8]">
                    PASO {dish.num}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="font-swiss font-medium text-base text-white group-hover:text-[#d49b57] transition-colors line-clamp-2">
                    {dish.title[language]}
                  </h3>
                  <p className="text-xs text-[#94A3B8] font-sans leading-relaxed line-clamp-2">
                    {dish.desc[language]}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between text-xs font-mono border-t border-white/5 pt-3">
                <span className="text-white">${dish.price} USD</span>
                <span className="text-[#94A3B8] group-hover:text-white transition-colors inline-flex items-center space-x-1">
                  <span>{language === 'es' ? 'Ficha' : 'Inspect'}</span>
                  <ChevronRight size={13} />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 6. RESTAURANT AMBIENCE & SPACES */}
      <section
        id="kon-ambience"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 scroll-mt-24"
        aria-label={language === 'es' ? 'Ambiente y Espacios' : 'Ambience & Spaces'}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-white/10">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#94A3B8]">
              {language === 'es' ? 'Lámina 03 — Atmósfera & Arquitectura' : 'Plate 03 — Architecture & Spaces'}
            </span>
            <h2 className="text-3xl sm:text-5xl font-swiss font-medium tracking-tight text-white mt-1.5">
              {language === 'es' ? 'Cuatro atmósferas en el atelier' : 'Four spaces inside the atelier'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#94A3B8] font-swiss max-w-md">
            {language === 'es'
              ? 'Un antiguo taller de fundición y botánica restaurado. Diseñado para acoger pocos comensales con estricta honestidad material.'
              : 'A restored metallurgical and botanical atelier. Engineered for intimate seatings with strict material honesty.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-b border-l border-white/10 pt-0">
          {KON_AMBIENCE_SPACES.map((space) => (
            <article
              key={space.id}
              className="border-r border-t border-white/10 bg-[#0C0B0A] flex flex-col justify-between rounded-none overflow-hidden"
            >
              <div>
                <div className="relative aspect-[4/3] w-full bg-[#050403] overflow-hidden">
                  <Image
                    src={space.image}
                    alt={space.title[language]}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 px-2 py-0.5 bg-black/70 backdrop-blur-sm border border-white/10 font-mono text-[9px] text-[#94A3B8]">
                    {space.num}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="text-base font-swiss font-medium text-white">
                    {space.title[language]}
                  </h3>
                  <p className="text-xs text-[#94A3B8] font-sans leading-relaxed">
                    {space.desc[language]}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-white/5 pt-3">
                <span className="text-[11px] font-swiss text-[#94A3B8] block">
                  {space.specs[language]}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 7. RESERVATION SIMULATOR: Table Request Folio */}
      <section
        id="kon-booking"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 scroll-mt-24"
        aria-label={language === 'es' ? 'Simulador de Reserva' : 'Booking Simulator'}
      >
        <div className="border border-white/10 bg-[#121110] p-6 sm:p-10 lg:p-12 rounded-none">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Form Left Side */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="font-swiss text-xs uppercase tracking-widest text-[#94A3B8]">
                  {language === 'es' ? '04 // Solicitud de mesa' : '04 // Table request'}
                </span>
                <h3 className="text-2xl sm:text-4xl font-swiss font-medium text-white mt-1 text-balance">
                  {language === 'es' ? 'Configurar experiencia en sala' : 'Configure dining experience'}
                </h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] mt-2 font-swiss">
                  {language === 'es'
                    ? 'Selecciona el espacio, turno, recorrido y comensales permitidos para emitir la comanda estimada.'
                    : 'Select space, seating turn, tasting journey, and allowed party size to simulate the intake.'}
                </p>
              </div>

              {!simulationConfirmed ? (
                <form onSubmit={handleConfirmSimulation} className="space-y-5">
                  {/* Zona de Mesa en Celdas Rectangulares (Nombres unificados) */}
                  <div className="space-y-2">
                    <label className="text-xs font-swiss text-[#94A3B8] block">
                      {language === 'es' ? '1. Espacio y zona deseada:' : '1. Seating space & zone:'}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {KON_TABLE_ZONES.map((zone) => {
                        const isSelected = selectedZone === zone.id;
                        return (
                          <button
                            key={zone.id}
                            type="button"
                            onClick={() => handleZoneChange(zone.id)}
                            className={`p-3.5 border text-left transition-colors rounded-none cursor-pointer ${
                              isSelected
                                ? 'bg-[#181614] border-[#8C3B2B] text-white'
                                : 'bg-[#0C0B0A] border-white/10 text-[#94A3B8] hover:border-white/20'
                            }`}
                          >
                            <span className="text-xs font-swiss font-medium text-white block">
                              {zone.name[language]}
                            </span>
                            <span className="text-[11px] font-swiss text-[#94A3B8] block mt-1">
                              {zone.capacity[language]}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Turno de Sala y Comensales con Validación Estricta de Capacidad */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-swiss text-[#94A3B8] block">
                        {language === 'es' ? '2. Turno de sala:' : '2. Seating turn:'}
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedTurn('early')}
                          className={`p-3 border font-swiss text-xs transition-colors rounded-none cursor-pointer ${
                            selectedTurn === 'early'
                              ? 'bg-[#8C3B2B] text-white font-medium border-[#8C3B2B]'
                              : 'bg-[#0C0B0A] border-white/10 text-[#94A3B8]'
                          }`}
                        >
                          19:30 hs
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedTurn('late')}
                          className={`p-3 border font-swiss text-xs transition-colors rounded-none cursor-pointer ${
                            selectedTurn === 'late'
                              ? 'bg-[#8C3B2B] text-white font-medium border-[#8C3B2B]'
                              : 'bg-[#0C0B0A] border-white/10 text-[#94A3B8]'
                          }`}
                        >
                          21:45 hs
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-swiss text-[#94A3B8] block">
                        {language === 'es' ? '3. Comensales:' : '3. Guests:'}
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {[1, 2, 4, 6].map((num) => {
                          const allowed = ALLOWED_GUESTS_BY_ZONE[selectedZone] || [1, 2, 4, 6];
                          const isAllowed = allowed.includes(num);
                          return (
                            <button
                              key={num}
                              type="button"
                              disabled={!isAllowed}
                              onClick={() => setGuestCount(num)}
                              className={`p-3 border font-swiss text-xs transition-colors rounded-none ${
                                !isAllowed
                                  ? 'opacity-20 cursor-not-allowed bg-[#0C0B0A] border-white/5 text-[#94A3B8]/30'
                                  : guestCount === num
                                  ? 'bg-white text-black font-semibold border-white cursor-pointer'
                                  : 'bg-[#0C0B0A] border-white/10 text-[#94A3B8] hover:border-white/30 cursor-pointer'
                              }`}
                            >
                              {num}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Fecha de Visita */}
                  <div className="space-y-2">
                    <label className="text-xs font-swiss text-[#94A3B8] block">
                      {language === 'es' ? '4. Fecha de visita:' : '4. Visit date:'}
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-3.5 py-3 bg-[#0C0B0A] border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-white rounded-none"
                    />
                  </div>

                  {/* Datos del Comensal */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-swiss text-[#94A3B8] block">
                        {language === 'es' ? 'Nombre completo:' : 'Full name:'}
                      </label>
                      <input
                        type="text"
                        required
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="Elena Vance"
                        className="w-full px-3.5 py-2.5 bg-[#0C0B0A] border border-white/10 text-xs text-white focus:outline-none focus:border-white rounded-none font-swiss"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-swiss text-[#94A3B8] block">
                        {language === 'es' ? 'Correo electrónico:' : 'Email address:'}
                      </label>
                      <input
                        type="email"
                        required
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        placeholder="elena@vance-atelier.com"
                        className="w-full px-3.5 py-2.5 bg-[#0C0B0A] border border-white/10 text-xs text-white focus:outline-none focus:border-white rounded-none font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-swiss text-[#94A3B8] block">
                      {language === 'es' ? 'Alergias o requerimientos dietéticos:' : 'Allergies & dietary notes:'}
                    </label>
                    <textarea
                      rows={2}
                      value={dietaryNotes}
                      onChange={(e) => setDietaryNotes(e.target.value)}
                      placeholder={language === 'es' ? 'Indicar preferencias botánicas o alergias...' : 'Note allergies or botanical preferences...'}
                      className="w-full px-3.5 py-2 bg-[#0C0B0A] border border-white/10 text-xs text-white focus:outline-none focus:border-white rounded-none font-swiss resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#8C3B2B] hover:bg-[#A84734] active:scale-[0.99] text-white font-swiss text-xs font-semibold tracking-wider uppercase transition-all duration-150 rounded-none cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <span>{language === 'es' ? 'Solicitar mesa en el Atelier ↗' : 'Request table at the Atelier ↗'}</span>
                  </button>
                </form>
              ) : (
                <div className="py-8 text-center space-y-4 bg-[#0C0B0A] border border-white/10 p-6 rounded-none">
                  <div className="w-12 h-12 border border-white/20 text-white flex items-center justify-center mx-auto">
                    <Check size={22} strokeWidth={2} />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-[#94A3B8] tracking-widest uppercase block">
                      COMANDA // {simulationCode}
                    </span>
                    <h4 className="text-xl font-medium font-swiss text-white mt-1">
                      {language === 'es' ? 'Solicitud registrada correctamente' : 'Table request registered'}
                    </h4>
                  </div>
                  <p className="text-xs text-[#94A3B8] max-w-sm mx-auto leading-relaxed font-swiss">
                    {language === 'es'
                      ? 'En producción, este flujo confirma en tiempo real la disponibilidad y envía los detalles de recepción.'
                      : 'In production, this interaction links with dining PMS for seat assignment and reception dispatch.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSimulationConfirmed(false)}
                    className="px-6 py-2.5 bg-[#181614] hover:bg-white/10 border border-white/15 text-xs font-swiss text-white uppercase tracking-wider rounded-none transition-colors cursor-pointer"
                  >
                    {language === 'es' ? 'Modificar datos' : 'Modify request'}
                  </button>
                </div>
              )}
            </div>

            {/* Recibo Editorial Right Side */}
            <div className="lg:col-span-5 bg-[#0C0B0A] border border-white/10 p-6 sm:p-7 flex flex-col justify-between space-y-6 rounded-none">
              <div className="space-y-4 text-xs font-swiss">
                <div className="flex justify-between items-center text-[#94A3B8] border-b border-white/10 pb-3 text-[11px]">
                  <span>{language === 'es' ? 'Desglose de comanda' : 'Order breakdown'}</span>
                  <span className="font-mono">{selectedDate} · {selectedTurn === 'early' ? '19:30 hs' : '21:45 hs'}</span>
                </div>

                <div className="space-y-2 text-[#94A3B8]">
                  <div className="flex justify-between">
                    <span>
                      {courseCount} {language === 'es' ? 'Pasos' : 'Courses'} (${baseMenuPrice} × {guestCount}p)
                    </span>
                    <span className="text-white font-mono">${baseMenuPrice * guestCount} USD</span>
                  </div>
                  {pairingActive && (
                    <div className="flex justify-between">
                      <span>
                        {language === 'es' ? 'Maridaje de vinos' : 'Wine pairing'} (${courseCount === 7 ? 55 : 80} × {guestCount}p)
                      </span>
                      <span className="text-white font-mono">+${winePairingPrice * guestCount} USD</span>
                    </div>
                  )}
                  <div className="flex justify-between text-white/50 text-[11px] pt-1.5 border-t border-white/5">
                    <span>{language === 'es' ? 'Espacio asignado' : 'Assigned zone'}:</span>
                    <span className="text-[#F4F1EA]">
                      {KON_TABLE_ZONES.find((z) => z.id === selectedZone)?.name[language]}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-baseline justify-between">
                  <div>
                    <span className="block text-[11px] text-[#94A3B8]">
                      {language === 'es' ? 'Total estimado' : 'Estimated total'}
                    </span>
                    <span className="text-[10px] text-[#94A3B8]/60 font-swiss">
                      {guestCount} {language === 'es' ? 'comensales' : 'guests'} · {language === 'es' ? 'Servicio incluido' : 'Service included'}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-serif-editorial italic text-3xl sm:text-4xl text-white font-normal tracking-tight">
                      ${grandTotalEstimate.toLocaleString('en-US')}
                    </span>
                    <span className="font-mono text-xs text-[#94A3B8] ml-1.5">USD</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 text-[11px] text-[#94A3B8] leading-relaxed font-swiss">
                {language === 'es'
                  ? 'KÔN Atelier dispone de política de cancelación de 48 hs. Rogamos puntualidad para garantizar la sincronía del servicio.'
                  : 'KÔN Atelier maintains a 48-hour cancellation policy. We kindly request punctual arrival to ensure synchronized service.'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. PRACTICAL INFORMATION & LOCATION */}
      <section
        id="kon-info"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 scroll-mt-24"
        aria-label={language === 'es' ? 'Información Práctica' : 'Practical Information'}
      >
        <div className="pb-8 border-b border-white/10">
          <span className="font-mono text-xs uppercase tracking-widest text-[#94A3B8]">
            {language === 'es' ? '05 // INFORMACIÓN PRÁCTICA' : '05 // PRACTICAL INFORMATION'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-swiss font-medium tracking-tight text-white mt-1.5">
            {language === 'es' ? 'Ubicación, accesos y horarios de sala.' : 'Location, access & dining hours.'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-b border-l border-white/10 pt-0">
          <div className="p-6 border-r border-t border-white/10 bg-[#0C0B0A] space-y-2">
            <span className="block text-[11px] font-swiss text-[#94A3B8]">
              {language === 'es' ? 'Ubicación' : 'Location'}
            </span>
            <p className="text-sm font-swiss font-medium text-white">
              Patagonia Andina · 1.420 m
            </p>
            <p className="text-xs text-[#94A3B8] font-mono">
              41°10′S · 71°16′W
            </p>
          </div>

          <div className="p-6 border-r border-t border-white/10 bg-[#0C0B0A] space-y-2">
            <span className="block text-[11px] font-swiss text-[#94A3B8]">
              {language === 'es' ? 'Servicios de Sala' : 'Services'}
            </span>
            <p className="text-sm font-swiss font-medium text-white">
              {language === 'es' ? 'Martes a Domingo' : 'Tuesday to Sunday'}
            </p>
            <p className="text-xs text-[#94A3B8] font-swiss">
              19:30 hs & 21:45 hs
            </p>
          </div>

          <div className="p-6 border-r border-t border-white/10 bg-[#0C0B0A] space-y-2">
            <span className="block text-[11px] font-swiss text-[#94A3B8]">
              {language === 'es' ? 'Filosofía de Cava' : 'Cellar Policy'}
            </span>
            <p className="text-sm font-swiss font-medium text-white">
              {language === 'es' ? 'Vinos Naturales & Terroir' : 'Natural Wines & Terroir'}
            </p>
            <p className="text-xs text-[#94A3B8]">
              {language === 'es' ? 'Baja intervención y pequeños productores' : 'Low intervention and micro-producers'}
            </p>
          </div>

          <div className="p-6 border-r border-t border-white/10 bg-[#0C0B0A] space-y-2">
            <span className="block text-[11px] font-swiss text-[#94A3B8]">
              {language === 'es' ? 'Alcance Conceptual' : 'Conceptual Scope'}
            </span>
            <p className="text-sm font-swiss font-medium text-white">
              ZYRVAE Digital Studio
            </p>
            <p className="text-xs text-[#94A3B8]">
              {language === 'es'
                ? 'Demostración de experiencia digital gastronómica de autor sin comisiones externas.'
                : 'Direct culinary experience presentation engineered for boutique restaurant brands.'}
            </p>
          </div>
        </div>
      </section>

      {/* 9. TRANSICIÓN MONOLÍTICA AL SIGUIENTE CASO DE ESTUDIO */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12"
        aria-label={language === 'es' ? 'Transición de proyecto' : 'Project transition'}
      >
        <div className="border border-white/10 bg-[#121110] p-8 sm:p-14 flex flex-col lg:flex-row lg:items-center justify-between gap-8 rounded-none">
          <div className="space-y-3 max-w-xl">
            <span className="font-mono text-xs text-[#94A3B8] uppercase tracking-widest block">
              {language === 'es' ? 'Siguiente caso de estudio' : 'Next case study'}
            </span>
            <h3 className="text-3xl sm:text-5xl font-swiss font-medium text-white tracking-tight">
              03 / Monolith Studio
            </h3>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed font-sans">
              {language === 'es'
                ? 'Visualizador paramétrico y arquitectura monumental en hormigón visto.'
                : 'Parametric spatial studio, brutalist concrete forms, and interactive lighting design.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/case-study/monolith-studio"
              className="inline-flex items-center space-x-2.5 px-7 py-4 bg-[#F4F1EA] hover:bg-white text-[#121110] text-xs font-swiss font-semibold tracking-wider uppercase transition-colors rounded-none"
            >
              <span>{language === 'es' ? 'Explorar Monolith Studio →' : 'Explore Monolith Studio →'}</span>
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

      {/* MODAL CHIAROSCURO DE INSPECCIÓN DE PLATO (Lámina Díptica 50/50 a arista viva) */}
      <AnimatePresence>
        {inspectDish && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="dish-inspect-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="bg-[#0C0B0A] border border-white/15 rounded-none max-w-4xl w-full overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2 relative"
            >
              {/* Mitad Izquierda: 100% Fotografía a Sangre */}
              <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[460px] w-full bg-[#050403] border-b md:border-b-0 md:border-r border-white/10">
                {inspectDish.image && (
                  <Image
                    src={inspectDish.image}
                    alt={inspectDish.title[language]}
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover object-center"
                  />
                )}
                <div className="absolute top-4 left-4 px-2 py-0.5 bg-black/75 backdrop-blur-sm border border-white/10 font-mono text-[9px] text-[#94A3B8]">
                  PASO {inspectDish.num}
                </div>
              </div>

              {/* Mitad Derecha: Pliego Editorial de Terroir y Maridaje */}
              <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[#121110]">
                <div className="space-y-4">
                  <div className="flex items-start justify-between border-b border-white/10 pb-3">
                    <span className="font-mono text-[10px] text-[#94A3B8] uppercase tracking-widest">
                      KÔN ATELIER · FICHA DE PLATO
                    </span>
                    <button
                      type="button"
                      onClick={() => setInspectDish(null)}
                      className="text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
                      aria-label={language === 'es' ? 'Cerrar' : 'Close'}
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    <span className="font-serif-editorial italic text-3xl text-[#d49b57]">
                      {inspectDish.num}
                    </span>
                    <h3 id="dish-inspect-title" className="text-xl sm:text-2xl font-swiss font-medium text-white">
                      {inspectDish.title[language]}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#94A3B8] font-sans leading-relaxed pt-1">
                      {inspectDish.desc[language]}
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-white/10 font-mono text-xs">
                    <div>
                      <span className="text-[10px] text-white/50 uppercase block">
                        // {language === 'es' ? 'Origen & Terroir' : 'Terroir & Sourcing'}
                      </span>
                      <span className="text-[#F4F1EA] font-medium mt-0.5 block">
                        {inspectDish.provenance[language]}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-[#d49b57] uppercase block">
                        // {language === 'es' ? 'Copa Recomendada por Sommelier' : 'Sommelier Pairing'}
                      </span>
                      <span className="text-[#F4F1EA] font-medium mt-0.5 block">
                        {inspectDish.pairing[language]}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="font-mono text-base font-bold text-white">
                    ${inspectDish.price} USD
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setInspectDish(null);
                      const bookingEl = document.getElementById('kon-booking');
                      if (bookingEl) bookingEl.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-5 py-2.5 bg-[#8C3B2B] hover:bg-[#A84734] text-white text-xs font-swiss font-semibold tracking-wider uppercase transition-colors rounded-none cursor-pointer"
                  >
                    {language === 'es' ? 'Reservar mesa ↗' : 'Request table ↗'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
