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
  Maximize2,
} from 'lucide-react';

interface KonRestaurantExperienceProps {
  project: ProjectDetail;
}

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
  const [selectedDate, setSelectedDate] = useState<string>('2025-11-14');
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

  // Filter Dishes
  const filteredDishes = KON_DISHES.filter((dish) => {
    // If 7 courses mode, filter out non-7 courses (dishes 02, 04, 08 are in the 11 courses tasting)
    if (courseCount === 7 && ['salt-beetroot', 'deep-prawn', 'sweetbreads-applewood'].includes(dish.id)) {
      return false;
    }
    // Category filter
    if (activeCategory !== 'all' && dish.category !== activeCategory) {
      return false;
    }
    // Dietary filter
    if (dietaryFilter !== 'all' && !dish.dietary.includes(dietaryFilter)) {
      return false;
    }
    return true;
  });

  // Calculate pricing
  const baseTastingPrice = courseCount === 7 ? 110 : 165;
  const pairingPrice = pairingActive ? (courseCount === 7 ? 55 : 80) : 0;
  const perPersonTotal = baseTastingPrice + pairingPrice;
  const estimatedTotal = perPersonTotal * guestCount;

  const handleConfirmSimulation = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = `KON-SIM-${Math.floor(1000 + Math.random() * 9000)}`;
    setSimulationCode(randomCode);
    setSimulationConfirmed(true);
  };

  const resetSimulation = () => {
    setSimulationConfirmed(false);
    setSimulationCode('');
  };

  return (
    <div className="min-h-screen min-h-svh bg-zy-warm-bg text-zy-warm-fg transition-colors">
      {/* 1. RESTAURANT HEADER: KÔN Identity, In-Page Navigation & Demonstration CTA */}
      <header
        role="banner"
        className="sticky top-16 z-30 bg-zy-warm-bg/90 backdrop-blur-md border-b border-zy-warm-border transition-colors"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
          {/* Studio Back Link + Restaurant Wordmark */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            <Link
              href="/#work"
              className="inline-flex items-center space-x-1.5 text-xs font-mono text-zy-warm-muted hover:text-zy-warm-fg transition-colors pr-3.5 border-r border-zy-warm-border"
            >
              <ArrowLeft size={13} />
              <span>ZYRVAE</span>
            </Link>

            <a
              href="#kon-hero"
              onClick={(e) => scrollToSection(e, 'kon-hero')}
              className="flex items-baseline space-x-2 group"
            >
              <span className="font-sans font-bold tracking-[0.25em] text-base sm:text-lg text-zy-warm-fg uppercase">
                KÔN
              </span>
              <span className="font-mono text-[10px] tracking-[0.2em] text-zy-warm-muted uppercase hidden sm:inline">
                Atelier Culinario · Fuego & Raíces
              </span>
            </a>
          </div>

          {/* In-Page Navigation Links */}
          <nav
            aria-label={language === 'es' ? 'Navegación del restaurante KÔN' : 'KÔN restaurant navigation'}
            className="flex items-center space-x-4 sm:space-x-6 text-xs font-mono text-zy-warm-muted overflow-x-auto py-1"
          >
            <a
              href="#kon-concept"
              onClick={(e) => scrollToSection(e, 'kon-concept')}
              className="hover:text-zy-warm-fg transition-colors whitespace-nowrap"
            >
              {language === 'es' ? 'Concepto' : 'Concept'}
            </a>
            <a
              href="#kon-menu"
              onClick={(e) => scrollToSection(e, 'kon-menu')}
              className="hover:text-zy-warm-fg transition-colors whitespace-nowrap"
            >
              {language === 'es' ? 'Menú' : 'Menu'}
            </a>
            <a
              href="#kon-dishes"
              onClick={(e) => scrollToSection(e, 'kon-dishes')}
              className="hover:text-zy-warm-fg transition-colors whitespace-nowrap"
            >
              {language === 'es' ? 'Platos' : 'Dishes'}
            </a>
            <a
              href="#kon-ambience"
              onClick={(e) => scrollToSection(e, 'kon-ambience')}
              className="hover:text-zy-warm-fg transition-colors whitespace-nowrap"
            >
              {language === 'es' ? 'Ambiente' : 'Spaces'}
            </a>
            <a
              href="#kon-booking"
              onClick={(e) => scrollToSection(e, 'kon-booking')}
              className="hover:text-zy-warm-fg transition-colors whitespace-nowrap"
            >
              {language === 'es' ? 'Reserva (Demo)' : 'Booking (Demo)'}
            </a>
            <a
              href="#kon-info"
              onClick={(e) => scrollToSection(e, 'kon-info')}
              className="hover:text-zy-warm-fg transition-colors whitespace-nowrap"
            >
              {language === 'es' ? 'Información' : 'Info'}
            </a>
          </nav>

          {/* Badge & Quick CTA */}
          <div className="flex items-center space-x-2.5">
            <span className="hidden lg:inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-zy-warm-bar border border-zy-warm-border text-[10px] font-mono text-zy-warm-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-[#945610] dark:bg-[#d49b57]" />
              <span>{language === 'es' ? 'Proyecto conceptual' : 'Concept project'}</span>
            </span>

            <a
              href="#kon-booking"
              onClick={(e) => scrollToSection(e, 'kon-booking')}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-zy-blue hover:bg-zy-blue-hover text-white text-xs font-mono tracking-wider transition-colors shadow-sm"
            >
              <span>{language === 'es' ? 'Solicitar mesa' : 'Request table'}</span>
            </a>
          </div>
        </div>
      </header>

      {/* 2. CINEMATIC HERO: Editorial Gastronomy Photography & Brief Provocative Title */}
      <section
        id="kon-hero"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 scroll-mt-24"
        aria-label="KÔN Atelier Hero"
      >
        <div className="relative min-h-[64svh] sm:min-h-[74svh] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-zy-warm-border bg-[#0a0907] flex flex-col justify-between p-6 sm:p-12 lg:p-16">
          <Image
            src={project.coverImage || '/images/kon-hero.webp'}
            alt="KÔN Atelier - Avant-garde seasonal gastronomy dish with hearth fire glow"
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover object-center scale-[1.01]"
          />

          {/* Layered moody chiaroscuro gradients so typography is razor-sharp */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0907]/95 via-[#0a0907]/40 to-[#0a0907]/30" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0a0907]/80 via-transparent to-transparent" />

          {/* Top Hero Coordinates & Metadata Pill */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#12100d]/85 backdrop-blur-md border border-white/15 font-mono text-[10px] sm:text-xs text-[#f0ebe3] uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d49b57]" />
              <span>
                {language === 'es'
                  ? 'COCINA DE FUEGO & BOTÁNICA ESTACIONAL'
                  : 'OPEN HEARTH FIRE & SEASONAL BOTANY'}
              </span>
            </span>

            <span className="px-3 py-1 rounded-full bg-[#12100d]/85 backdrop-blur-md border border-white/15 font-mono text-[10px] text-[#d6ccc2] tracking-wider uppercase">
              41°10&apos;S · 71°16&apos;W // 1,420 M · PATAGONIA
            </span>
          </div>

          {/* Bottom Hero Headline & Direct CTAs */}
          <div className="relative z-10 max-w-3xl space-y-5 pt-20">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3"
            >
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#d49b57]">
                ATELIER CULINARIO
              </span>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-bold tracking-[-0.03em] leading-[1.02] text-white text-balance">
                {project.title}
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-xl text-[#f0ebe3] font-sans leading-relaxed max-w-2xl"
            >
              {language === 'es'
                ? 'Cocina de estación, fermentos salvajes y fuego vivo en vajilla de autor. Una pausa contemplativa entre el bosque nativo y el rescoldo de brasas.'
                : 'Seasonal cooking, wild ferments, and open hearth fire on handcrafted stoneware. A contemplative interlude between native forest and glowing embers.'}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <a
                href="#kon-menu"
                onClick={(e) => scrollToSection(e, 'kon-menu')}
                className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-zy-blue hover:bg-zy-blue-hover text-white text-xs sm:text-sm font-mono tracking-wider transition-all shadow-[0_0_24px_rgba(10,92,255,0.4)]"
              >
                <span>{language === 'es' ? 'Explorar menú de estación' : 'Explore seasonal menu'}</span>
                <ArrowDown size={14} />
              </a>

              <a
                href="#kon-booking"
                onClick={(e) => scrollToSection(e, 'kon-booking')}
                className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-mono tracking-wider transition-all"
              >
                <span>{language === 'es' ? 'Simular reserva de mesa' : 'Simulate table request'}</span>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. PRESENTATION OF THE CONCEPT: Philosophy, Pillars & Architectural Stone Hall */}
      <section
        id="kon-concept"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 scroll-mt-24"
        aria-label={language === 'es' ? 'Concepto Culinario' : 'Culinary Concept'}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-zy-blue">
              {language === 'es' ? '01 // MANIFIESTO CULINARIO' : '01 // CULINARY MANIFESTO'}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold tracking-tight text-zy-warm-fg">
              {language === 'es'
                ? 'El fuego como origen. La botánica como pulso.'
                : 'Fire as origin. Botany as cadence.'}
            </h2>
            <p className="text-sm sm:text-base text-zy-warm-muted leading-relaxed font-sans">
              {language === 'es'
                ? 'KÔN Atelier reemplaza la rigidez de las cartas gastronómicas convencionales con una propuesta viva. Cada plato dialoga con la recolección de micro-temporadas andinas: desde las primeras morchellas tras la lluvia hasta las bayas de saúco maduradas en altura.'
                : 'KÔN Atelier departs from static fine dining formulas with an alive seasonal cadence. Every course dialogues with micro-harvest cycles: from wild morels following early spring rain to high-altitude elderberries.'}
            </p>

            {/* Three Conceptual Pillars */}
            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-xl bg-zy-warm-card border border-zy-warm-border flex items-start space-x-3.5">
                <Flame size={18} className="text-[#945610] dark:text-[#d49b57] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-mono font-semibold uppercase text-zy-warm-fg">
                    {language === 'es' ? 'Fuego de Quebracho & Rescoldo' : 'Hardwood Embers & Resinous Smoke'}
                  </h3>
                  <p className="text-xs text-zy-warm-muted mt-1 leading-relaxed">
                    {language === 'es'
                      ? 'Cocciones lentas sobre brasas abiertas sin gas ni artificios. Mineralidad y calor puro.'
                      : 'Slow cooking directly over open hardwood embers without gas or contrivances.'}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zy-warm-card border border-zy-warm-border flex items-start space-x-3.5">
                <Sparkles size={18} className="text-zy-blue shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-mono font-semibold uppercase text-zy-warm-fg">
                    {language === 'es' ? 'Recolección Silvestre de Altura' : 'High-Altitude Wild Foraging'}
                  </h3>
                  <p className="text-xs text-zy-warm-muted mt-1 leading-relaxed">
                    {language === 'es'
                      ? 'Brotes de alerce, enebro patagónico, hongos de pino y miel de bosque recolectada a mano.'
                      : 'Larch pine shoots, native juniper, pine mushrooms, and raw forest wildflower honey.'}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zy-warm-card border border-zy-warm-border flex items-start space-x-3.5">
                <Wine size={18} className="text-[#945610] dark:text-[#d49b57] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-mono font-semibold uppercase text-zy-warm-fg">
                    {language === 'es' ? 'Fermentos Vivos & Cava Biológica' : 'Wild Ferments & Living Cellar'}
                  </h3>
                  <p className="text-xs text-zy-warm-muted mt-1 leading-relaxed">
                    {language === 'es'
                      ? 'Ánforas de barro cocido, sidras naturales de valle y vinagres botánicos elaborados in-house.'
                      : 'Clay amphora aging, spontaneous cider fermentations, and botanical in-house vinegars.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Editorial Image */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/11] rounded-2xl overflow-hidden border border-zy-warm-border bg-[#0a0907] shadow-xl group">
              <Image
                src="/images/kon-interior.webp"
                alt="KÔN Atelier - Dining Room Interior with volcanic basalt walls, candlelit tables and hearth fire"
                fill
                sizes="(max-width: 1024px) 100vw, 700px"
                className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0907]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-[#e8e2d8]">
                <span className="px-2.5 py-1 rounded bg-[#0f0e0b]/80 backdrop-blur-md border border-white/10">
                  {language === 'es' ? 'EL SALÓN DE BASALTO & ROBLE' : 'THE BASALT & CHARRED OAK HALL'}
                </span>
                <span className="px-2.5 py-1 rounded bg-[#0f0e0b]/80 backdrop-blur-md border border-white/10">
                  {language === 'es' ? 'ACÚSTICA CONTENIDA · LUZ TENUE' : 'QUIET ACOUSTICS · CANDLELIGHT'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SEASONAL MENU: Dual Tasting Switcher, Wine Pairing Toggle & Real-Time Dietary Filter */}
      <section
        id="kon-menu"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 scroll-mt-24"
        aria-label={language === 'es' ? 'Menú de Estación' : 'Seasonal Menu'}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-zy-warm-border">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-zy-blue">
              {language === 'es' ? '02 // PROPUESTA GASTRONÓMICA' : '02 // CULINARY PROPOSAL'}
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-sans font-bold tracking-tight text-zy-warm-fg mt-2 text-balance">
              {language === 'es' ? 'Menú de Estación & Maridajes' : 'Seasonal Menu & Cellar Pairings'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zy-warm-muted font-sans max-w-md">
            {language === 'es'
              ? 'Dos recorridos de degustación curados. Precios ilustrativos calculados en tiempo real según la opción de maridaje de vinos naturales seleccionada.'
              : 'Two curated tasting journeys. Illustrative rates calculated live based on natural wine pairing choices.'}
          </p>
        </div>

        {/* Interactive Controls Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-zy-warm-bar border border-zy-warm-border mt-8 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* 7 vs 11 Courses Journey Switcher */}
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono text-zy-warm-muted uppercase">
                {language === 'es' ? 'Recorrido:' : 'Experience:'}
              </span>
              <div className="inline-flex rounded-xl bg-zy-warm-card p-1 border border-zy-warm-border">
                <button
                  type="button"
                  onClick={() => setCourseCount(7)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    courseCount === 7
                      ? 'bg-zy-blue text-white font-semibold shadow-sm'
                      : 'text-zy-warm-muted hover:text-zy-warm-fg'
                  }`}
                >
                  7 {language === 'es' ? 'Pasos ($110 USD)' : 'Courses ($110 USD)'}
                </button>
                <button
                  type="button"
                  onClick={() => setCourseCount(11)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    courseCount === 11
                      ? 'bg-zy-blue text-white font-semibold shadow-sm'
                      : 'text-zy-warm-muted hover:text-zy-warm-fg'
                  }`}
                >
                  11 {language === 'es' ? 'Pasos · Gran Recorrido ($165 USD)' : 'Courses · Full Journey ($165 USD)'}
                </button>
              </div>
            </div>

            {/* Wine Pairing Toggle & Live Price Pill */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setPairingActive(!pairingActive)}
                className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl border text-xs font-mono transition-all ${
                  pairingActive
                    ? 'bg-zy-warm-active border-zy-blue text-zy-warm-fg shadow-sm'
                    : 'bg-zy-warm-card border-zy-warm-border text-zy-warm-muted'
                }`}
              >
                <Wine size={14} className={pairingActive ? 'text-zy-blue' : 'text-zy-warm-dim'} />
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

              <div className="px-3.5 py-1.5 rounded-xl bg-zy-warm-card border border-zy-warm-border font-mono text-xs flex items-center space-x-1.5">
                <span className="text-zy-warm-muted">{language === 'es' ? 'Estimado:' : 'Rate:'}</span>
                <span className="font-bold text-zy-warm-fg">${perPersonTotal} USD</span>
                <span className="text-[10px] text-zy-warm-dim">/ {language === 'es' ? 'comensal' : 'guest'}</span>
              </div>
            </div>
          </div>

          {/* Category & Dietary Filters */}
          <div className="pt-3 border-t border-zy-warm-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Category Filter Pills */}
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
              {KON_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono whitespace-nowrap transition-colors ${
                    activeCategory === cat.id
                      ? 'bg-zy-warm-active text-zy-blue font-semibold border border-zy-warm-border'
                      : 'text-zy-warm-muted hover:text-zy-warm-fg'
                  }`}
                >
                  {cat.label[language]}
                </button>
              ))}
            </div>

            {/* Dietary Preference Filter */}
            <div className="flex items-center space-x-1.5 text-[11px] font-mono shrink-0">
              <span className="text-zy-warm-muted uppercase hidden md:inline">
                {language === 'es' ? 'Filtro:' : 'Dietary:'}
              </span>
              <button
                type="button"
                onClick={() => setDietaryFilter('all')}
                className={`px-2 py-0.5 rounded transition-colors ${
                  dietaryFilter === 'all'
                    ? 'bg-zy-blue text-white'
                    : 'text-zy-warm-muted hover:text-zy-warm-fg'
                }`}
              >
                {language === 'es' ? 'Todos' : 'All'}
              </button>
              <button
                type="button"
                onClick={() => setDietaryFilter(dietaryFilter === 'plant-forward' ? 'all' : 'plant-forward')}
                className={`px-2 py-0.5 rounded transition-colors ${
                  dietaryFilter === 'plant-forward'
                    ? 'bg-zy-blue text-white'
                    : 'text-zy-warm-muted hover:text-zy-warm-fg'
                }`}
              >
                Plant-Forward
              </button>
              <button
                type="button"
                onClick={() => setDietaryFilter(dietaryFilter === 'pescatarian' ? 'all' : 'pescatarian')}
                className={`px-2 py-0.5 rounded transition-colors ${
                  dietaryFilter === 'pescatarian'
                    ? 'bg-zy-blue text-white'
                    : 'text-zy-warm-muted hover:text-zy-warm-fg'
                }`}
              >
                Pescatarian
              </button>
              <button
                type="button"
                onClick={() => setDietaryFilter(dietaryFilter === 'gluten-free' ? 'all' : 'gluten-free')}
                className={`px-2 py-0.5 rounded transition-colors ${
                  dietaryFilter === 'gluten-free'
                    ? 'bg-zy-blue text-white'
                    : 'text-zy-warm-muted hover:text-zy-warm-fg'
                }`}
              >
                Sin Gluten
              </button>
            </div>
          </div>
        </div>

        {/* Dish List */}
        <div className="mt-8 space-y-4">
          {filteredDishes.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-zy-warm-card border border-zy-warm-border text-xs font-mono text-zy-warm-muted">
              {language === 'es'
                ? 'No se encontraron platos que coincidan con la combinación de filtros seleccionada.'
                : 'No dishes found matching the selected combination of filters.'}
            </div>
          ) : (
            filteredDishes.map((dish) => (
              <article
                key={dish.id}
                className="p-5 sm:p-6 rounded-2xl bg-zy-warm-card border border-zy-warm-border hover:border-zy-warm-border-hover transition-all flex flex-col md:flex-row md:items-start justify-between gap-5 shadow-sm group"
              >
                <div className="flex items-start space-x-4 sm:space-x-5 max-w-2xl">
                  {/* Step Number */}
                  <span className="font-mono text-xs sm:text-sm text-zy-blue font-bold pt-0.5">
                    {dish.num}
                  </span>

                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base sm:text-lg font-sans font-bold text-zy-warm-fg group-hover:text-zy-blue transition-colors">
                        {dish.title[language]}
                      </h3>
                      {dish.isSignature && (
                        <span className="px-2 py-0.5 rounded bg-[#945610]/15 dark:bg-[#d49b57]/20 text-[#945610] dark:text-[#d49b57] text-[10px] font-mono font-medium uppercase">
                          {language === 'es' ? 'Plato Insignia' : 'Signature'}
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-zy-warm-muted leading-relaxed font-sans">
                      {dish.desc[language]}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] font-mono text-zy-warm-dim">
                      <span className="inline-flex items-center space-x-1">
                        <MapPin size={11} className="text-zy-warm-muted" />
                        <span>{dish.provenance[language]}</span>
                      </span>

                      {dish.dietary.map((d) => (
                        <span key={d} className="px-1.5 py-0.5 rounded bg-zy-warm-badge text-zy-warm-muted text-[10px] uppercase">
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side: Wine Pairing & Price / Inspection Trigger */}
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-zy-warm-border-subtle">
                  <div className="text-right">
                    <span className="font-mono text-sm sm:text-base font-bold text-zy-warm-fg">
                      ${dish.price} USD
                    </span>
                    <span className="text-[10px] font-mono text-zy-warm-dim block uppercase">
                      // {language === 'es' ? 'A la carta' : 'À la carte'}
                    </span>
                  </div>

                  {pairingActive && (
                    <div className="md:text-right max-w-xs pl-4 md:pl-0">
                      <span className="text-[10px] font-mono uppercase text-[#945610] dark:text-[#d49b57] tracking-wider block">
                        // {language === 'es' ? 'Armonía sugerida' : 'Wine harmony'}
                      </span>
                      <span className="text-xs text-zy-warm-fg font-mono leading-tight block">
                        {dish.pairing[language]}
                      </span>
                    </div>
                  )}

                  {dish.image && (
                    <button
                      type="button"
                      onClick={() => setInspectDish(dish)}
                      className="inline-flex items-center space-x-1 text-[11px] font-mono text-zy-blue hover:underline pt-1"
                    >
                      <Maximize2 size={12} />
                      <span>{language === 'es' ? 'Ver fotografía ↗' : 'View photo ↗'}</span>
                    </button>
                  )}
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      {/* 5. SIGNATURE DISHES GALLERY: High-Resolution Plated Courses */}
      <section
        id="kon-dishes"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 scroll-mt-24"
        aria-label={language === 'es' ? 'Platos Destacados' : 'Featured Dishes'}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-zy-warm-border">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#945610] dark:text-[#d49b57]">
              {language === 'es' ? '03 // CREACIONES EMBLEMÁTICAS' : '03 // SIGNATURE DISHES'}
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-sans font-bold tracking-tight text-zy-warm-fg mt-2 text-balance">
              {language === 'es' ? 'Cuatro momentos de la degustación' : 'Four movements from the tasting'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zy-warm-muted font-sans max-w-md">
            {language === 'es'
              ? 'Composiciones capturadas en vajilla cerámica artesanal. Cada plato expresa la conjunción de humo, acidez botánica y productos de agua fría.'
              : 'Courses plated on artisan ceramic stoneware. Each dish balances hearth smoke, botanical acidity, and cold-water freshness.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10">
          {KON_SIGNATURE_DISHES.map((dish) => (
            <article
              key={dish.id}
              onClick={() => setInspectDish(dish)}
              className="group cursor-pointer rounded-2xl bg-zy-warm-card border border-zy-warm-border hover:border-zy-warm-border-hover overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-sm"
            >
              <div>
                {/* Dish Photograph */}
                <div className="relative aspect-[4/3] w-full bg-[#090806] overflow-hidden">
                  {dish.image && (
                    <Image
                      src={dish.image}
                      alt={dish.title[language]}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090806]/80 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-0.5 rounded bg-[#0f0e0b]/80 backdrop-blur-md border border-white/10 font-mono text-[10px] text-white">
                      PASO {dish.num}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="font-sans font-bold text-base text-zy-warm-fg group-hover:text-zy-blue transition-colors line-clamp-2">
                    {dish.title[language]}
                  </h3>
                  <p className="text-xs text-zy-warm-muted font-sans leading-relaxed line-clamp-3">
                    {dish.desc[language]}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 border-t border-zy-warm-border-subtle flex items-center justify-between text-xs font-mono">
                <span className="text-[#945610] dark:text-[#d49b57] font-semibold">${dish.price} USD</span>
                <span className="inline-flex items-center space-x-1 text-zy-blue group-hover:underline">
                  <span>{language === 'es' ? 'Ficha técnica' : 'Inspect'}</span>
                  <ChevronRight size={13} />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 6. RESTAURANT AMBIENCE & SPACES: The Hearth, The Stone Hall, The Living Cellar, The Botanical Pantry */}
      <section
        id="kon-ambience"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 scroll-mt-24"
        aria-label={language === 'es' ? 'Ambiente y Espacios' : 'Ambience & Spaces'}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-zy-warm-border">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-zy-blue">
              {language === 'es' ? '04 // AMBIENTE & ARQUITECTURA' : '04 // AMBIENCE & ARCHITECTURE'}
            </span>
            <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-zy-warm-fg mt-2">
              {language === 'es' ? 'Cuatro atmósferas en el atelier' : 'Four spaces inside the atelier'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zy-warm-muted font-sans max-w-md">
            {language === 'es'
              ? 'Un antiguo taller de fundición y botánica restaurado. Diseñado para acoger pocos comensales por turno con una presencia material sobria.'
              : 'A restored metallurgical and botanical atelier. Engineered for intimate seatings with strict material honesty.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10">
          {KON_AMBIENCE_SPACES.map((space) => (
            <article
              key={space.id}
              className="rounded-2xl bg-zy-warm-card border border-zy-warm-border overflow-hidden shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] w-full bg-[#0a0907] overflow-hidden group">
                  <Image
                    src={space.image}
                    alt={space.title[language]}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0907]/75 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded bg-[#0f0e0b]/80 backdrop-blur-md border border-white/10 font-mono text-[10px] text-[#e8e2d8]">
                      ESPACIO {space.num}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-2">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-xl font-sans font-bold text-zy-warm-fg">
                      {space.title[language]}
                    </h3>
                  </div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#945610] dark:text-[#d49b57] block">
                    {space.subtitle[language]}
                  </span>
                  <p className="text-xs sm:text-sm text-zy-warm-muted font-sans leading-relaxed pt-1">
                    {space.desc[language]}
                  </p>
                </div>
              </div>

              <div className="px-6 py-3.5 bg-zy-warm-bar border-t border-zy-warm-border text-[11px] font-mono text-zy-warm-dim flex items-center justify-between">
                <span>{space.specs[language]}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 7. DEMONSTRATION TABLE BOOKING SIMULATOR */}
      <section
        id="kon-booking"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 scroll-mt-24"
        aria-label={language === 'es' ? 'Simulador de Reserva' : 'Booking Simulator'}
      >
        <div className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-zy-warm-card border border-zy-warm-border shadow-xl">
          {/* Honest Concept Notice Bar */}
          <div className="p-4 rounded-xl bg-zy-warm-bar border border-zy-warm-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
            <div className="flex items-center space-x-2.5 text-zy-blue text-xs font-mono">
              <ShieldCheck size={16} />
              <span className="font-semibold uppercase tracking-wider">
                {language === 'es' ? 'SIMULADOR DE RESERVA DE DEMOSTRACIÓN' : 'DEMOSTRATION BOOKING SIMULATOR'}
              </span>
            </div>
            <span className="font-mono text-[11px] text-zy-warm-dim">
              {language === 'es'
                ? 'Flujo demostrativo · No se confirmará una reserva real'
                : 'Demonstration flow · No real reservation will be confirmed'}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Form Left Side */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#945610] dark:text-[#d49b57]">
                  {language === 'es' ? '05 // SOLICITUD DE MESA' : '05 // TABLE REQUEST'}
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-bold text-zy-warm-fg mt-1 text-balance">
                  {language === 'es' ? 'Configurá tu experiencia en mesa' : 'Customize your table experience'}
                </h3>
                <p className="text-xs sm:text-sm text-zy-warm-muted mt-2">
                  {language === 'es'
                    ? 'Elegí el espacio, turno, menú y maridaje para calcular la estimación del servicio de sala.'
                    : 'Select space, seating turn, tasting journey, and wine pairing to simulate the intake.'}
                </p>
              </div>

              {!simulationConfirmed ? (
                <form onSubmit={handleConfirmSimulation} className="space-y-5">
                  {/* Seating Zone Radio Cards */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase text-zy-warm-muted block">
                      {language === 'es' ? '1. Espacio y zona deseada:' : '1. Seating space & zone:'}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {KON_TABLE_ZONES.map((zone) => {
                        const isSelected = selectedZone === zone.id;
                        return (
                          <button
                            key={zone.id}
                            type="button"
                            onClick={() => setSelectedZone(zone.id)}
                            className={`p-3 rounded-xl border text-left transition-all ${
                              isSelected
                                ? 'bg-zy-warm-active border-zy-blue ring-1 ring-zy-blue/40'
                                : 'bg-zy-warm-bar border-zy-warm-border hover:border-zy-warm-border-hover'
                            }`}
                          >
                            <span className="text-xs font-sans font-bold text-zy-warm-fg block">
                              {zone.name[language]}
                            </span>
                            <span className="text-[10px] font-mono text-zy-warm-muted block mt-1">
                              {zone.capacity[language]}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Seating Turn & Guest Count */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase text-zy-warm-muted block">
                        {language === 'es' ? '2. Turno de sala:' : '2. Seating turn:'}
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedTurn('early')}
                          className={`p-2.5 rounded-lg border font-mono text-xs transition-all ${
                            selectedTurn === 'early'
                              ? 'bg-zy-blue text-white font-semibold'
                              : 'bg-zy-warm-bar border-zy-warm-border text-zy-warm-muted'
                          }`}
                        >
                          19:30 hs
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedTurn('late')}
                          className={`p-2.5 rounded-lg border font-mono text-xs transition-all ${
                            selectedTurn === 'late'
                              ? 'bg-zy-blue text-white font-semibold'
                              : 'bg-zy-warm-bar border-zy-warm-border text-zy-warm-muted'
                          }`}
                        >
                          21:45 hs
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase text-zy-warm-muted block">
                        {language === 'es' ? '3. Comensales:' : '3. Guests:'}
                      </label>
                      <div className="flex items-center space-x-1.5 bg-zy-warm-bar p-1 rounded-lg border border-zy-warm-border font-mono text-xs">
                        {[1, 2, 3, 4, 5, 6].map((count) => (
                          <button
                            key={count}
                            type="button"
                            onClick={() => setGuestCount(count)}
                            className={`flex-1 py-1.5 rounded transition-colors ${
                              guestCount === count
                                ? 'bg-zy-warm-active text-zy-blue font-bold shadow-sm'
                                : 'text-zy-warm-muted hover:text-zy-warm-fg'
                            }`}
                          >
                            {count}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Date & Contact Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase text-zy-warm-muted block">
                        {language === 'es' ? '4. Fecha (Simulación):' : '4. Date (Demo):'}
                      </label>
                      <select
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full p-2.5 rounded-lg bg-zy-warm-bar border border-zy-warm-border font-mono text-xs text-zy-warm-fg focus:border-zy-blue outline-none"
                      >
                        <option value="2025-11-14">
                          {language === 'es' ? 'Viernes 14 Noviembre (Demo)' : 'Friday Nov 14 (Demo)'}
                        </option>
                        <option value="2025-11-15">
                          {language === 'es' ? 'Sábado 15 Noviembre (Demo)' : 'Saturday Nov 15 (Demo)'}
                        </option>
                        <option value="2025-11-20">
                          {language === 'es' ? 'Jueves 20 Noviembre (Demo)' : 'Thursday Nov 20 (Demo)'}
                        </option>
                        <option value="2025-11-21">
                          {language === 'es' ? 'Viernes 21 Noviembre (Demo)' : 'Friday Nov 21 (Demo)'}
                        </option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase text-zy-warm-muted block">
                        {language === 'es' ? '5. Nombre de contacto:' : '5. Guest name:'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={language === 'es' ? 'Ej. Mateo Rossi' : 'e.g. Mateo Rossi'}
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="w-full p-2.5 rounded-lg bg-zy-warm-bar border border-zy-warm-border font-mono text-xs text-zy-warm-fg placeholder:text-zy-warm-dim focus:border-zy-blue outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase text-zy-warm-muted block">
                      {language === 'es' ? '6. Email de confirmación demostrativa:' : '6. Contact email for demo confirmation:'}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder={language === 'es' ? 'nombre@empresa.com' : 'name@company.com'}
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full p-2.5 rounded-lg bg-zy-warm-bar border border-zy-warm-border font-mono text-xs text-zy-warm-fg placeholder:text-zy-warm-dim focus:border-zy-blue outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase text-zy-warm-muted block">
                      {language === 'es' ? '7. Notas dietarias o restricciones (opcional):' : '7. Dietary notes & allergies (optional):'}
                    </label>
                    <input
                      type="text"
                      placeholder={
                        language === 'es'
                          ? 'Ej. 1 menú pescetariano, alérgica a frutos secos'
                          : 'e.g. 1 pescatarian guest, nut allergy'
                      }
                      value={dietaryNotes}
                      onChange={(e) => setDietaryNotes(e.target.value)}
                      className="w-full p-2.5 rounded-lg bg-zy-warm-bar border border-zy-warm-border font-mono text-xs text-zy-warm-fg placeholder:text-zy-warm-dim focus:border-zy-blue outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-zy-blue hover:bg-zy-blue-hover text-white text-xs sm:text-sm font-mono tracking-wider transition-all shadow-[0_0_20px_rgba(10,92,255,0.4)]"
                  >
                    {language === 'es' ? 'Confirmar simulación de mesa ↗' : 'Confirm table simulation ↗'}
                  </button>
                </form>
              ) : (
                /* Simulation Result Voucher */
                <div className="p-6 rounded-2xl bg-zy-warm-bar border border-zy-blue/40 space-y-5 animate-in fade-in duration-300">
                  <div className="flex items-center space-x-3 text-zy-blue">
                    <div className="w-9 h-9 rounded-full bg-zy-blue/20 flex items-center justify-center">
                      <Check size={18} />
                    </div>
                    <div>
                      <h4 className="text-base font-bold font-sans text-zy-warm-fg">
                        {language === 'es' ? 'Solicitud simulada con éxito' : 'Inquiry simulated successfully'}
                      </h4>
                      <span className="font-mono text-xs text-zy-blue">{simulationCode}</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-zy-warm-card border border-zy-warm-border space-y-2 font-mono text-xs">
                    <div className="flex justify-between text-zy-warm-muted">
                      <span>{language === 'es' ? 'Comensal:' : 'Guest:'}</span>
                      <span className="text-zy-warm-fg font-semibold">{guestName || 'Mateo Rossi'}</span>
                    </div>
                    <div className="flex justify-between text-zy-warm-muted">
                      <span>{language === 'es' ? 'Espacio:' : 'Seating:'}</span>
                      <span className="text-zy-warm-fg">
                        {KON_TABLE_ZONES.find((z) => z.id === selectedZone)?.name[language]}
                      </span>
                    </div>
                    <div className="flex justify-between text-zy-warm-muted">
                      <span>{language === 'es' ? 'Turno & Fecha:' : 'Turn & Date:'}</span>
                      <span className="text-zy-warm-fg">
                        {selectedTurn === 'early' ? '19:30 hs' : '21:45 hs'} · {selectedDate}
                      </span>
                    </div>
                    <div className="flex justify-between text-zy-warm-muted">
                      <span>{language === 'es' ? 'Recorrido:' : 'Menu:'}</span>
                      <span className="text-zy-warm-fg">
                        {courseCount} {language === 'es' ? 'Pasos' : 'Courses'}{' '}
                        {pairingActive
                          ? language === 'es'
                            ? '(Con maridaje)'
                            : '(With pairing)'
                          : language === 'es'
                          ? '(Sin maridaje)'
                          : '(No pairing)'}
                      </span>
                    </div>
                    <div className="flex justify-between text-zy-warm-muted pt-2 border-t border-zy-warm-border-subtle">
                      <span>{language === 'es' ? 'Estimado total:' : 'Estimated total:'}</span>
                      <span className="text-zy-blue font-bold text-sm">${estimatedTotal} USD</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg bg-zy-warm-card border border-zy-warm-border text-[11px] font-sans text-zy-warm-muted leading-relaxed">
                    <p>
                      {language === 'es'
                        ? 'Aviso honesto: Esta es una herramienta interactiva creada por ZYRVAE Digital Studio. No representa una reserva comercial real ni se ha realizado cobro alguno.'
                        : 'Honest notice: This is an interactive simulation built by ZYRVAE Digital Studio. No real booking was processed and no payment was charged.'}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={resetSimulation}
                    className="px-4 py-2 rounded-lg bg-zy-warm-card hover:bg-zy-warm-badge border border-zy-warm-border text-xs font-mono text-zy-warm-fg transition-colors"
                  >
                    {language === 'es' ? '← Realizar otra simulación' : '← Run another simulation'}
                  </button>
                </div>
              )}
            </div>

            {/* Breakdown Right Side Panel */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-2xl bg-zy-warm-bar border border-zy-warm-border space-y-4">
                <span className="font-mono text-xs uppercase tracking-wider text-zy-blue block">
                  // {language === 'es' ? 'DESGLOSE DE SALA' : 'ESTIMATE BREAKDOWN'}
                </span>

                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between items-center text-zy-warm-muted">
                    <span>
                      {courseCount} {language === 'es' ? 'Pasos degustación' : 'Courses tasting'} ({guestCount}x)
                    </span>
                    <span className="text-zy-warm-fg font-medium">${baseTastingPrice * guestCount} USD</span>
                  </div>

                  <div className="flex justify-between items-center text-zy-warm-muted">
                    <span>
                      {language === 'es' ? 'Maridaje vinos naturales' : 'Natural wine pairing'} ({guestCount}x)
                    </span>
                    <span className="text-zy-warm-fg font-medium">
                      {pairingActive ? `$${pairingPrice * guestCount} USD` : '$0 USD'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-zy-warm-muted">
                    <span>{language === 'es' ? 'Servicio de agua de deshielo & pan' : 'Glacial water & artisan bread'}</span>
                    <span className="text-zy-warm-fg font-medium">
                      {language === 'es' ? 'Cortesía' : 'Complimentary'}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-zy-warm-border flex justify-between items-center text-sm font-bold">
                    <span className="text-zy-warm-fg">{language === 'es' ? 'Total estimado:' : 'Estimated total:'}</span>
                    <span className="text-zy-blue text-base">${estimatedTotal} USD</span>
                  </div>
                </div>

                <div className="pt-2 text-[11px] font-sans text-zy-warm-dim leading-relaxed border-t border-zy-warm-border-subtle">
                  {language === 'es'
                    ? 'La asignación de mesa en The Open Hearth se realiza por estricto orden de solicitud. Turnos de 2 horas y 15 minutos.'
                    : 'Counter seating at The Open Hearth is prioritized by inquiry timestamp. Seating duration is 2 hours 15 minutes.'}
                </div>
              </div>

              {/* Culinary Atelier Image Card */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-zy-warm-border bg-[#0a0907] shadow-md">
                <Image
                  src="/images/kon-hearth-fire.webp"
                  alt="KÔN Atelier open hearth fire cooking"
                  fill
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-cover object-center"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0907]/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-[10px] font-mono text-[#d6ccc2]">
                  {language === 'es'
                    ? 'COCINA A LA VISTA · BRASAS VIVAS'
                    : 'LIVE OPEN HEARTH · QUEBRACHO COALS'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. RESTAURANT INFORMATION & CONCEPTUAL SCOPE */}
      <section
        id="kon-info"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 scroll-mt-24"
        aria-label={language === 'es' ? 'Información y Ubicación' : 'Information & Location'}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-zy-warm-card border border-zy-warm-border space-y-2">
            <div className="flex items-center space-x-2 text-xs font-mono text-zy-blue uppercase">
              <MapPin size={14} />
              <span>{language === 'es' ? 'Ubicación & Entorno' : 'Location & Setting'}</span>
            </div>
            <p className="text-sm font-sans font-semibold text-zy-warm-fg">
              Valle Andino Patagónico · 1,420 m
            </p>
            <p className="text-xs text-zy-warm-muted font-mono">
              41°10&apos;S · 71°16&apos;W
            </p>
            <p className="text-xs text-zy-warm-muted leading-relaxed">
              {language === 'es'
                ? 'Emplazamiento conceptual entre bosque nativo y arroyo de montaña.'
                : 'Conceptual site set between native larch forest and cold alpine creek.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zy-warm-card border border-zy-warm-border space-y-2">
            <div className="flex items-center space-x-2 text-xs font-mono text-zy-blue uppercase">
              <Clock size={14} />
              <span>{language === 'es' ? 'Turnos & Servicio' : 'Hours & Service'}</span>
            </div>
            <p className="text-sm font-sans font-semibold text-zy-warm-fg">
              {language === 'es' ? 'Miércoles a Domingo' : 'Wednesday to Sunday'}
            </p>
            <p className="text-xs text-zy-warm-muted font-mono">
              19:30 hs & 21:45 hs
            </p>
            <p className="text-xs text-zy-warm-muted leading-relaxed">
              {language === 'es'
                ? 'Dos turnos por noche. Se solicita máxima puntualidad para el inicio sincronizado de la degustación.'
                : 'Two seatings per evening. Prompt arrival requested for synchronized course service.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zy-warm-card border border-zy-warm-border space-y-2">
            <div className="flex items-center space-x-2 text-xs font-mono text-zy-blue uppercase">
              <Wine size={14} />
              <span>{language === 'es' ? 'Cava & Filosofía' : 'Cellar & Ethos'}</span>
            </div>
            <p className="text-sm font-sans font-semibold text-zy-warm-fg">
              {language === 'es' ? '180+ Vinos Naturales' : '180+ Natural Wines'}
            </p>
            <p className="text-xs text-zy-warm-muted font-mono">
              {language === 'es' ? 'Mínima intervención' : 'Low-intervention'}
            </p>
            <p className="text-xs text-zy-warm-muted leading-relaxed">
              {language === 'es'
                ? 'Viticultura biodinámica, sidras salvajes en ánfora y fermentos botánicos de la casa.'
                : 'Biodynamic viticulture, clay amphora wild ciders, and botanical in-house ferments.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zy-warm-bar border border-zy-warm-border space-y-2">
            <div className="flex items-center space-x-2 text-xs font-mono text-zy-blue uppercase">
              <ShieldCheck size={14} />
              <span>{language === 'es' ? 'Alcance Conceptual' : 'Conceptual Scope'}</span>
            </div>
            <p className="text-sm font-sans font-semibold text-zy-warm-fg">
              ZYRVAE Digital Studio
            </p>
            <p className="text-xs text-zy-warm-muted leading-relaxed">
              {language === 'es'
                ? 'Proyecto conceptual desarrollado para demostrar la potencia visual y comercial de una web gastronómica sin comisiones externas.'
                : 'Concept project engineered to demonstrate the visual authority and direct booking conversion of custom restaurant websites.'}
            </p>
          </div>
        </div>
      </section>

      {/* 9. CLOSING & COHERENT RESTAURANT FOOTER */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16"
        aria-label={language === 'es' ? 'Cierre del restaurante' : 'Restaurant closing'}
      >
        <div className="p-8 sm:p-12 rounded-3xl bg-zy-warm-card border border-zy-warm-border flex flex-col lg:flex-row lg:items-center justify-between gap-8 shadow-sm">
          <div className="space-y-2 max-w-xl">
            <span className="font-mono text-xs text-[#945610] dark:text-[#d49b57] uppercase tracking-widest">
              KÔN ATELIER // GASTRONOMÍA & FUEGO
            </span>
            <h3 className="text-2xl sm:text-4xl font-sans font-bold text-zy-warm-fg">
              {language === 'es'
                ? '¿Listo para experimentar el atelier?'
                : 'Ready to experience the atelier?'}
            </h3>
            <p className="text-xs sm:text-sm text-zy-warm-muted leading-relaxed font-sans">
              {language === 'es'
                ? 'Probá la simulación de reserva de mesa o contactá a ZYRVAE para diseñar una plataforma web distintiva para tu propuesta gastronómica.'
                : 'Try the table reservation simulation or reach out to ZYRVAE to engineer a bespoke digital platform for your culinary brand.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#kon-booking"
              onClick={(e) => scrollToSection(e, 'kon-booking')}
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-zy-blue hover:bg-zy-blue-hover text-white text-xs font-mono tracking-wider transition-all shadow-[0_0_20px_rgba(10,92,255,0.35)]"
            >
              <span>
                {language === 'es' ? 'Simular mesa (Demo) ↗' : 'Simulate table (Demo) ↗'}
              </span>
            </a>

            <Link
              href="/#contact"
              className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-xl bg-zy-warm-bar hover:bg-zy-warm-active border border-zy-warm-border text-xs font-mono text-zy-warm-fg transition-colors"
            >
              <span>{language === 'es' ? 'Iniciar proyecto ZYRVAE ↗' : 'Start project with ZYRVAE ↗'}</span>
              <ArrowUpRight size={14} className="text-zy-blue" />
            </Link>

            <Link
              href="/#work"
              className="inline-flex items-center space-x-1.5 px-4 py-3.5 rounded-xl text-xs font-mono text-zy-warm-muted hover:text-zy-warm-fg transition-colors"
            >
              <span>{language === 'es' ? 'Volver al portfolio' : 'Back to portfolio'}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* DISH INSPECTION MODAL */}
      <AnimatePresence>
        {inspectDish && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="dish-inspect-title"
            style={{ backgroundColor: 'var(--zy-modal-backdrop)' }}
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-zy-warm-card border border-zy-warm-border rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl"
            >
              {/* Dish Modal Image */}
              <div className="relative aspect-[16/10] w-full bg-[#090806]">
                {inspectDish.image && (
                  <Image
                    src={inspectDish.image}
                    alt={inspectDish.title[language]}
                    fill
                    sizes="(max-width: 768px) 100vw, 700px"
                    className="object-cover object-center"
                  />
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090806]/80 via-transparent to-transparent" />
                <button
                  type="button"
                  onClick={() => setInspectDish(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-[#0a0907]/80 backdrop-blur-md border border-white/20 text-white hover:bg-[#0a0907] transition-colors"
                  aria-label={language === 'es' ? 'Cerrar ficha' : 'Close dish details'}
                >
                  <X size={16} />
                </button>
                <div className="absolute bottom-3 left-4">
                  <span className="px-2.5 py-1 rounded bg-[#0f0e0b]/80 backdrop-blur-md border border-white/10 font-mono text-[10px] text-white">
                    PASO {inspectDish.num}
                  </span>
                </div>
              </div>

              {/* Dish Modal Info */}
              <div className="p-6 space-y-4">
                <div className="space-y-1">
                  <h3 id="dish-inspect-title" className="text-xl sm:text-2xl font-sans font-bold text-zy-warm-fg">
                    {inspectDish.title[language]}
                  </h3>
                  <p className="text-xs sm:text-sm text-zy-warm-muted font-sans leading-relaxed">
                    {inspectDish.desc[language]}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-zy-warm-border font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-zy-warm-muted uppercase block">
                      // {language === 'es' ? 'Origen & Terroir' : 'Terroir & Sourcing'}
                    </span>
                    <span className="text-zy-warm-fg font-medium mt-0.5 block">
                      {inspectDish.provenance[language]}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-[#945610] dark:text-[#d49b57] uppercase block">
                      // {language === 'es' ? 'Maridaje de Sommelier' : 'Sommelier Pairing'}
                    </span>
                    <span className="text-zy-warm-fg font-medium mt-0.5 block">
                      {inspectDish.pairing[language]}
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="font-mono text-base font-bold text-zy-warm-fg">
                    ${inspectDish.price} USD
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setInspectDish(null);
                      const bookingEl = document.getElementById('kon-booking');
                      if (bookingEl) bookingEl.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-4 py-2 rounded-xl bg-zy-blue hover:bg-zy-blue-hover text-white text-xs font-mono tracking-wider transition-colors"
                  >
                    {language === 'es' ? 'Simular reserva de mesa ↗' : 'Simulate table request ↗'}
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
