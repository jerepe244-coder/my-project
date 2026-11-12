'use client';

import React, { useState, useId } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, ArrowUpRight } from 'lucide-react';

export interface HospitalityDemoProps {
  selectedSuiteIndex?: number;
  onSelectSuite?: (index: number) => void;
  showModal?: boolean;
  onShowModalChange?: (open: boolean) => void;
}

export const AURA_SUITES: {
  id: string;
  name: { es: string; en: string };
  area: string;
  elevation: string;
  image: string;
  view: { es: string; en: string };
  summary: { es: string; en: string };
  baseRate: number;
  capacity: number;
  amenities: { es: string; en: string }[];
  azimuth?: string;
  thermal?: string;
}[] = [
  {
    id: 'panoramic',
    name: { es: 'Refugio Panorámico', en: 'Panoramic Shelter' },
    area: '84 m²',
    elevation: '1.680 m · Sector Norte',
    azimuth: '42° N · Exposición Glaciar',
    thermal: 'Fachada Basáltica Ventilada R-40',
    image: '/images/aura-suite-panoramic.webp',
    view: { es: 'Horizonte alpino y glaciar', en: 'Alpine horizon & glacier' },
    summary: {
      es: 'Pabellón en voladizo sobre el valle glaciar con tina de basalto exterior y hogar de piedra volcánica.',
      en: 'Cantilevered pavilion over the glacial valley with heated outdoor basalt tub and volcanic stone fireplace.',
    },
    baseRate: 480,
    capacity: 4,
    amenities: [
      { es: 'Terraza voladiza privada', en: 'Cantilevered private terrace' },
      { es: 'Tina de basalto exterior termorregulada', en: 'Heated outdoor basalt tub' },
      { es: 'Hogar a leña de piedra volcánica', en: 'Volcanic stone wood fireplace' },
      { es: 'Desayuno botánico en suite', en: 'In-suite botanical breakfast' },
    ],
  },
  {
    id: 'forest',
    name: { es: 'Suite del Bosque', en: 'Forest Suite' },
    area: '68 m²',
    elevation: '1.540 m · Dosel de Alerces',
    azimuth: '128° SE · Canopia Nativa',
    thermal: 'Triple Acristalamiento Térmico Acústico',
    image: '/images/aura-suite-forest.webp',
    view: { es: 'Canopia de alerces nativos', en: 'Native larch canopy' },
    summary: {
      es: 'Refugio inmerso en el bosque nativo con ventanales de suelo a techo, vapor de pino y cava privada.',
      en: 'Sanctuary immersed in native larch trees with floor-to-ceiling glass, pine steam shower, and wine cellar.',
    },
    baseRate: 390,
    capacity: 4,
    amenities: [
      { es: 'Pared acristalada de suelo a techo', en: 'Floor-to-ceiling glass wall' },
      { es: 'Ducha de vapor con esencias de pino', en: 'Pine-infused herbal steam shower' },
      { es: 'Rincón de lectura y telescopio', en: 'Reading alcove & star telescope' },
      { es: 'Cava privada con vinos de altura', en: 'Private high-altitude wine cellar' },
    ],
  },
  {
    id: 'monolith',
    name: { es: 'Cabaña Monolito', en: 'Monolith Cabin' },
    area: '110 m²',
    elevation: '1.790 m · Filo Sur',
    azimuth: '194° S · Macizo Austral',
    thermal: 'Hormigón Estructural Pigmentado 35cm',
    image: '/images/aura-suite-monolith.webp',
    view: { es: 'Macizo rocoso y valle sur', en: 'Rock massif & southern valley' },
    summary: {
      es: 'Residencia de dos niveles en el filo rocoso austral con sauna finlandés de cedro y senderos privados.',
      en: 'Bi-level residence on the southern rock ridge with dedicated cedar Finnish sauna and private trails.',
    },
    baseRate: 620,
    capacity: 4,
    amenities: [
      { es: 'Dos niveles con estudio privado', en: 'Bi-level with private studio' },
      { es: 'Sauna finlandés de cedro propio', en: 'Dedicated cedar Finnish sauna' },
      { es: 'Acceso directo a senderos privados', en: 'Direct access to secluded trails' },
      { es: 'Servicio de sommelier en suite', en: 'Private sommelier service' },
    ],
  },
];

export const HospitalityDemo: React.FC<HospitalityDemoProps> = ({
  selectedSuiteIndex,
  onSelectSuite,
  showModal,
  onShowModalChange,
}) => {
  const { language } = useLanguage();
  const [internalSuite, setInternalSuite] = useState(0);
  const [internalShowModal, setInternalShowModal] = useState(false);
  const [nights, setNights] = useState(3);
  const [guests, setGuests] = useState(2);
  const [extras, setExtras] = useState<{ breakfast: boolean; spa: boolean; heli: boolean }>({
    breakfast: true,
    spa: false,
    heli: false,
  });
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const activeSuiteId = useId();

  const selectedSuite = selectedSuiteIndex !== undefined ? selectedSuiteIndex : internalSuite;
  const isModalOpen = showModal !== undefined ? showModal : internalShowModal;

  const setModalOpen = (open: boolean) => {
    setInternalShowModal(open);
    onShowModalChange?.(open);
    if (!open) {
      setTimeout(() => setDemoSubmitted(false), 300);
    }
  };

  const handleSuiteChange = (idx: number) => {
    const nextSuite = AURA_SUITES[idx] ?? AURA_SUITES[0];
    const nextMax = nextSuite.capacity ?? 4;
    setInternalSuite(idx);
    onSelectSuite?.(idx);
    setGuests((prev) => Math.min(Math.max(prev, 1), nextMax));
  };

  const EXTRA_RATES = {
    breakfastPerNight: 45,
    spaPerGuestStay: 160,
    heliTransferFlat: 850,
  };

  const current = AURA_SUITES[selectedSuite] ?? AURA_SUITES[0];
  const accommodationTotal = current.baseRate * nights;
  const breakfastTotal = extras.breakfast ? EXTRA_RATES.breakfastPerNight * guests * nights : 0;
  const spaTotal = extras.spa ? EXTRA_RATES.spaPerGuestStay * guests : 0;
  const heliTotal = extras.heli ? EXTRA_RATES.heliTransferFlat : 0;
  const conciergeTotal = breakfastTotal + spaTotal + heliTotal;
  const preservationLevy = Math.round(accommodationTotal * 0.05); // 5% preservación del valle
  const grandTotal = accommodationTotal + conciergeTotal + preservationLevy;

  return (
    <div className="relative border border-zy-border bg-[#0B130E] text-white font-swiss rounded-none overflow-hidden select-none">
      {/* Cruces de Registro Arquitectónico en los 4 Vértices (Monolith Grid) */}
      <span className="absolute top-1.5 left-2 font-mono text-[9px] text-[#94A3B8]/60 z-20 pointer-events-none">+</span>
      <span className="absolute top-1.5 right-2 font-mono text-[9px] text-[#94A3B8]/60 z-20 pointer-events-none">+</span>
      <span className="absolute bottom-1.5 left-2 font-mono text-[9px] text-[#94A3B8]/60 z-20 pointer-events-none">+</span>
      <span className="absolute bottom-1.5 right-2 font-mono text-[9px] text-[#94A3B8]/60 z-20 pointer-events-none">+</span>

      {/* 1. Franja Superior Editorial de Expediente */}
      <div className="px-5 py-3 bg-[#0E1712] border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-swiss text-[#94A3B8]">
        <div className="flex items-center space-x-3">
          <span className="text-white font-medium">
            {language === 'es' ? 'Aura Sanctuary · Pliego de Reserva' : 'Aura Sanctuary · Reservation Folio'}
          </span>
          <span className="text-white/20">|</span>
          <span className="font-mono text-[11px] text-[#94A3B8]">
            {language === 'es' ? 'Patagonia Andina' : 'Andean Patagonia'}
          </span>
        </div>
        <div className="flex items-center space-x-4 font-mono text-[11px]">
          <span className="hidden sm:inline">{current.elevation}</span>
          <span className="text-white/20 hidden sm:inline">·</span>
          <span className="text-[#94A3B8]">
            {language === 'es' ? 'Sector Glaciar' : 'Glacial Valley'}
          </span>
        </div>
      </div>

      {/* 2. Retícula Monolítica Principal (60% Ficha Técnica | 40% Consola) */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* COLUMNA IZQUIERDA: Selección de Refugio y Ficha de Arquitectura (lg:col-span-7) */}
        <div className="lg:col-span-7 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 bg-[#09100C]">
          {/* Selector de Suite: Barra Continua Limpia de 3 Columnas sin prefijos robóticos */}
          <div className="grid grid-cols-3 border-b border-white/10 bg-[#0E1712]">
            {AURA_SUITES.map((suite, idx) => {
              const isCurrent = selectedSuite === idx;
              return (
                <button
                  key={suite.id}
                  type="button"
                  onClick={() => handleSuiteChange(idx)}
                  className={`relative p-3.5 sm:p-4 text-left border-r last:border-r-0 border-white/10 transition-colors duration-150 ${
                    isCurrent ? 'bg-[#09100C] text-white' : 'text-[#94A3B8] hover:text-white hover:bg-white/[0.02]'
                  }`}
                >
                  {isCurrent && (
                    <motion.div
                      layoutId={`aura-clean-bar-${activeSuiteId}`}
                      className="absolute top-0 left-0 right-0 h-[2px] bg-white"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span className="block text-xs sm:text-sm font-medium tracking-tight truncate">
                    {suite.name[language as 'es' | 'en']}
                  </span>
                  <span className="block font-mono text-[10px] text-[#94A3B8] mt-0.5">
                    ${suite.baseRate} USD / {language === 'es' ? 'noche' : 'night'}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Fotografía de Arquitectura 100% LIMPIA (sin textos que tapen el basalto y madera) */}
          <div className="relative aspect-[16/10] w-full bg-[#050907] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full h-full"
              >
                <Image
                  src={current.image}
                  alt={current.name[language as 'es' | 'en']}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Tabla Técnica de 0.5px: Cotas y Especificaciones Debajo de la Foto */}
          <div className="border-t border-white/10 bg-[#0B130E] p-5 sm:p-6 space-y-4">
            <div className="flex items-baseline justify-between border-b border-white/10 pb-3">
              <div>
                <span className="block text-[11px] font-mono text-[#94A3B8] uppercase tracking-wider">
                  {language === 'es' ? 'Selección de refugio' : 'Shelter selection'}
                </span>
                <h3 className="text-lg font-medium text-white tracking-tight mt-0.5">
                  {current.name[language as 'es' | 'en']}
                </h3>
              </div>
              <div className="text-right">
                <span className="font-mono text-sm font-semibold text-white">{current.area}</span>
                <span className="block font-mono text-[10px] text-[#94A3B8]">{current.azimuth}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-swiss">
              <div>
                <span className="block text-[10px] text-[#94A3B8] uppercase font-mono mb-0.5">
                  {language === 'es' ? 'Materialidad y estructura' : 'Structure & materials'}
                </span>
                <span className="text-white/90 text-[11px]">{current.thermal}</span>
              </div>
              <div>
                <span className="block text-[10px] text-[#94A3B8] uppercase font-mono mb-0.5">
                  {language === 'es' ? 'Horizonte visual' : 'Visual horizon'}
                </span>
                <span className="text-white/90 text-[11px]">{current.view[language as 'es' | 'en']}</span>
              </div>
            </div>

            <p className="text-xs text-white/70 leading-relaxed font-sans border-t border-white/5 pt-3">
              {current.summary[language as 'es' | 'en']}
            </p>

            <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-1 text-[11px] text-[#94A3B8]">
              {current.amenities.map((amenity, i) => (
                <span key={i} className="inline-flex items-center space-x-1.5">
                  <span className="text-white/30">—</span>
                  <span className="text-white/80">{amenity[language as 'es' | 'en']}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: Planificación de Estadía y Desglose (lg:col-span-5) */}
        <div className="lg:col-span-5 p-6 sm:p-7 bg-[#0B130E] flex flex-col justify-between space-y-7">
          <div className="space-y-6">
            {/* Encabezado Sereno */}
            <div className="border-b border-white/10 pb-3 flex items-baseline justify-between">
              <div>
                <span className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider block">
                  {language === 'es' ? 'Planificación de estadía' : 'Stay planning'}
                </span>
                <h4 className="text-base font-medium tracking-tight text-white mt-0.5">
                  {language === 'es' ? 'Parámetros del huésped' : 'Guest parameters'}
                </h4>
              </div>
              <span className="font-mono text-[11px] text-[#94A3B8]">
                {language === 'es' ? 'Capacidad máx.' : 'Max cap.'} {current.capacity}
              </span>
            </div>

            {/* Selector de Noches y Huéspedes con botones milimétricos y relleno sobrio */}
            <div className="grid grid-cols-2 gap-3">
              <div className="border border-white/10 p-3 bg-[#0E1712]">
                <span className="block text-[10px] font-mono uppercase text-[#94A3B8] mb-1.5">
                  {language === 'es' ? 'Duración (Noches)' : 'Duration (Nights)'}
                </span>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xl font-bold text-white">
                    {nights} <span className="text-xs text-[#94A3B8] font-normal">{language === 'es' ? 'n' : 'n'}</span>
                  </span>
                  <div className="flex space-x-1">
                    <button
                      type="button"
                      onClick={() => setNights((n) => Math.max(1, n - 1))}
                      disabled={nights <= 1}
                      className="w-7 h-7 bg-[#09100C] border border-white/10 hover:bg-[#1E2B22] text-white disabled:opacity-25 font-mono text-xs transition-colors flex items-center justify-center cursor-pointer"
                    >
                      -
                    </button>
                    <button
                      type="button"
                      onClick={() => setNights((n) => Math.min(14, n + 1))}
                      disabled={nights >= 14}
                      className="w-7 h-7 bg-[#09100C] border border-white/10 hover:bg-[#1E2B22] text-white disabled:opacity-25 font-mono text-xs transition-colors flex items-center justify-center cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="border border-white/10 p-3 bg-[#0E1712]">
                <span className="block text-[10px] font-mono uppercase text-[#94A3B8] mb-1.5">
                  {language === 'es' ? 'Huéspedes' : 'Guests'}
                </span>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xl font-bold text-white">
                    {guests} <span className="text-xs text-[#94A3B8] font-normal">/ {current.capacity}</span>
                  </span>
                  <div className="flex space-x-1">
                    <button
                      type="button"
                      onClick={() => setGuests((g) => Math.max(1, g - 1))}
                      disabled={guests <= 1}
                      className="w-7 h-7 bg-[#09100C] border border-white/10 hover:bg-[#1E2B22] text-white disabled:opacity-25 font-mono text-xs transition-colors flex items-center justify-center cursor-pointer"
                    >
                      -
                    </button>
                    <button
                      type="button"
                      onClick={() => setGuests((g) => Math.min(current.capacity, g + 1))}
                      disabled={guests >= current.capacity}
                      className="w-7 h-7 bg-[#09100C] border border-white/10 hover:bg-[#1E2B22] text-white disabled:opacity-25 font-mono text-xs transition-colors flex items-center justify-center cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Experiencias de Montaña (Checkboxes con relleno sobrio en verde musgo/negro) */}
            <div className="space-y-2">
              <span className="block font-mono text-[10px] uppercase tracking-wider text-[#94A3B8]">
                {language === 'es' ? 'Experiencias adicionales en estancia' : 'Additional stay experiences'}
              </span>

              {/* Extra 1: Desayuno */}
              <button
                type="button"
                onClick={() => setExtras((prev) => ({ ...prev, breakfast: !prev.breakfast }))}
                className={`w-full p-3 text-left border flex items-center justify-between transition-colors duration-150 ${
                  extras.breakfast
                    ? 'border-[#1E2B22] bg-[#1E2B22]/60 text-white'
                    : 'border-white/10 bg-[#0E1712] hover:border-white/20 text-[#94A3B8]'
                }`}
              >
                <div className="flex items-center space-x-3 text-xs">
                  <div
                    className={`w-4 h-4 border flex items-center justify-center transition-colors ${
                      extras.breakfast ? 'border-white/80 bg-white text-black' : 'border-white/20 bg-[#09100C]'
                    }`}
                  >
                    {extras.breakfast && <Check size={11} strokeWidth={3} />}
                  </div>
                  <span className="font-medium text-white">
                    {language === 'es' ? 'Desayuno botánico andino en suite' : 'Alpine botanical in-suite breakfast'}
                  </span>
                </div>
                <span className="font-mono text-[11px] text-[#94A3B8]">
                  +${EXTRA_RATES.breakfastPerNight}/n
                </span>
              </button>

              {/* Extra 2: Termas */}
              <button
                type="button"
                onClick={() => setExtras((prev) => ({ ...prev, spa: !prev.spa }))}
                className={`w-full p-3 text-left border flex items-center justify-between transition-colors duration-150 ${
                  extras.spa
                    ? 'border-[#1E2B22] bg-[#1E2B22]/60 text-white'
                    : 'border-white/10 bg-[#0E1712] hover:border-white/20 text-[#94A3B8]'
                }`}
              >
                <div className="flex items-center space-x-3 text-xs">
                  <div
                    className={`w-4 h-4 border flex items-center justify-center transition-colors ${
                      extras.spa ? 'border-white/80 bg-white text-black' : 'border-white/20 bg-[#09100C]'
                    }`}
                  >
                    {extras.spa && <Check size={11} strokeWidth={3} />}
                  </div>
                  <span className="font-medium text-white">
                    {language === 'es' ? 'Acceso nocturno privado a termas' : 'Private night thermal bath access'}
                  </span>
                </div>
                <span className="font-mono text-[11px] text-[#94A3B8]">
                  +${EXTRA_RATES.spaPerGuestStay}
                </span>
              </button>

              {/* Extra 3: Helicóptero */}
              <button
                type="button"
                onClick={() => setExtras((prev) => ({ ...prev, heli: !prev.heli }))}
                className={`w-full p-3 text-left border flex items-center justify-between transition-colors duration-150 ${
                  extras.heli
                    ? 'border-[#1E2B22] bg-[#1E2B22]/60 text-white'
                    : 'border-white/10 bg-[#0E1712] hover:border-white/20 text-[#94A3B8]'
                }`}
              >
                <div className="flex items-center space-x-3 text-xs">
                  <div
                    className={`w-4 h-4 border flex items-center justify-center transition-colors ${
                      extras.heli ? 'border-white/80 bg-white text-black' : 'border-white/20 bg-[#09100C]'
                    }`}
                  >
                    {extras.heli && <Check size={11} strokeWidth={3} />}
                  </div>
                  <span className="font-medium text-white">
                    {language === 'es' ? 'Traslado privado en helicóptero alpino' : 'Alpine helicopter valley transfer'}
                  </span>
                </div>
                <span className="font-mono text-[11px] text-[#94A3B8]">
                  +${EXTRA_RATES.heliTransferFlat}
                </span>
              </button>
            </div>
          </div>

          {/* Pliego de Liquidación / Recibo Editorial con amplio aire visual */}
          <div className="border border-white/10 bg-[#0E1712] p-5 space-y-4 font-mono text-xs">
            <div className="flex justify-between items-center text-[#94A3B8] border-b border-white/10 pb-2.5 text-[11px]">
              <span>{language === 'es' ? 'Desglose de estadía' : 'Stay breakdown'}</span>
              <span>{nights} {language === 'es' ? 'noches' : 'nights'} · {guests} {language === 'es' ? 'huéspedes' : 'guests'}</span>
            </div>

            <div className="space-y-2 text-[#94A3B8]">
              <div className="flex justify-between">
                <span>{current.name[language as 'es' | 'en']} (${current.baseRate} × {nights}n)</span>
                <span className="text-white">${accommodationTotal} USD</span>
              </div>
              {extras.breakfast && (
                <div className="flex justify-between">
                  <span>{language === 'es' ? 'Desayuno botánico' : 'Botanical breakfast'}</span>
                  <span className="text-white">+${breakfastTotal} USD</span>
                </div>
              )}
              {extras.spa && (
                <div className="flex justify-between">
                  <span>{language === 'es' ? 'Termas privadas' : 'Thermal baths'}</span>
                  <span className="text-white">+${spaTotal} USD</span>
                </div>
              )}
              {extras.heli && (
                <div className="flex justify-between">
                  <span>{language === 'es' ? 'Helicóptero alpino' : 'Helicopter transfer'}</span>
                  <span className="text-white">+${heliTotal} USD</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>{language === 'es' ? 'Preservación glaciar (5%)' : 'Glacier preservation (5%)'}</span>
                <span className="text-white">+${preservationLevy} USD</span>
              </div>
            </div>

            {/* Total Monumental con Instrument Serif y amplio espacio negativo */}
            <div className="pt-4 border-t border-white/10 flex items-baseline justify-between">
              <div>
                <span className="block font-mono text-[10px] uppercase tracking-wider text-[#94A3B8]">
                  {language === 'es' ? 'Total estimado' : 'Estimated total'}
                </span>
                <span className="text-[10px] text-[#94A3B8]/60 font-mono">
                  {language === 'es' ? 'Tasas e impuestos incluidos' : 'Taxes and fees included'}
                </span>
              </div>
              <div className="text-right">
                <span className="font-serif-editorial italic text-3xl sm:text-4xl text-white font-normal tracking-tight">
                  ${grandTotal.toLocaleString('en-US')}
                </span>
                <span className="font-mono text-xs text-[#94A3B8] ml-1.5">USD</span>
              </div>
            </div>
          </div>

          {/* Botón Maestro en Bermellón Reservado para la Acción Final */}
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="w-full py-4 bg-[#FF3B30] hover:bg-[#FF4A1C] active:scale-[0.99] text-white font-swiss text-xs font-semibold tracking-[0.08em] uppercase transition-all duration-150 flex items-center justify-center space-x-2 rounded-none cursor-pointer"
          >
            <span>{language === 'es' ? 'Solicitar reserva ↗' : 'Request reservation ↗'}</span>
          </button>
        </div>
      </div>

      {/* MODAL EDITORIAL: Protocolo de Confirmación */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 14 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg bg-[#0B130E] border border-white/15 p-6 sm:p-8 rounded-none shadow-2xl space-y-6"
            >
              <span className="absolute top-2 left-2 font-mono text-[9px] text-[#94A3B8]/50">+</span>
              <span className="absolute top-2 right-2 font-mono text-[9px] text-[#94A3B8]/50">+</span>
              <span className="absolute bottom-2 left-2 font-mono text-[9px] text-[#94A3B8]/50">+</span>
              <span className="absolute bottom-2 right-2 font-mono text-[9px] text-[#94A3B8]/50">+</span>

              <div className="flex items-start justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="font-mono text-[10px] text-[#94A3B8] uppercase tracking-widest block">
                    Aura Sanctuary · Patagonia
                  </span>
                  <h3 className="text-xl font-medium font-swiss text-white mt-1">
                    {language === 'es' ? 'Solicitud de estadía' : 'Reservation inquiry'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="w-8 h-8 border border-white/10 flex items-center justify-center text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {!demoSubmitted ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setDemoSubmitted(true);
                  }}
                  className="space-y-4 font-swiss"
                >
                  <div className="p-3.5 bg-[#0E1712] border border-white/10 font-mono text-xs space-y-1.5">
                    <div className="flex justify-between text-[#94A3B8]">
                      <span>{language === 'es' ? 'Refugio:' : 'Shelter:'}</span>
                      <span className="text-white font-medium">{current.name[language as 'es' | 'en']}</span>
                    </div>
                    <div className="flex justify-between text-[#94A3B8]">
                      <span>{language === 'es' ? 'Estadía:' : 'Stay:'}</span>
                      <span className="text-white">{nights} {language === 'es' ? 'noches' : 'nights'} · {guests} {language === 'es' ? 'huéspedes' : 'guests'}</span>
                    </div>
                    <div className="flex justify-between text-[#94A3B8] pt-1.5 border-t border-white/10">
                      <span>{language === 'es' ? 'Total estimado:' : 'Total estimated:'}</span>
                      <span className="text-white font-bold">${grandTotal.toLocaleString('en-US')} USD</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block font-mono text-[10px] text-[#94A3B8] uppercase">
                      {language === 'es' ? 'Nombre del huésped' : 'Guest name'}
                    </label>
                    <input
                      type="text"
                      required
                      defaultValue="Alexandre Mercer"
                      className="w-full px-3 py-2.5 bg-[#0E1712] border border-white/10 text-xs text-white focus:outline-none focus:border-white rounded-none font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-mono text-[10px] text-[#94A3B8] uppercase">
                      {language === 'es' ? 'Correo electrónico' : 'Email address'}
                    </label>
                    <input
                      type="email"
                      required
                      defaultValue="mercer@studio-alpino.com"
                      className="w-full px-3 py-2.5 bg-[#0E1712] border border-white/10 text-xs text-white focus:outline-none focus:border-white rounded-none font-mono"
                    />
                  </div>

                  <p className="text-[11px] text-[#94A3B8] leading-relaxed pt-1">
                    {language === 'es'
                      ? 'Demostración interactiva construida por ZYRVAE. No se realiza ningún cargo financiero ni reserva real.'
                      : 'Interactive demonstration built by ZYRVAE. No financial charges or real bookings will occur.'}
                  </p>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#FF3B30] hover:bg-[#FF4A1C] active:scale-[0.99] text-white font-swiss text-xs font-semibold tracking-wider uppercase transition-all duration-150 rounded-none cursor-pointer"
                  >
                    {language === 'es' ? 'Confirmar solicitud de reserva ↗' : 'Confirm reservation inquiry ↗'}
                  </button>
                </form>
              ) : (
                <div className="py-6 text-center space-y-4">
                  <div className="w-12 h-12 border border-white/20 text-white flex items-center justify-center mx-auto">
                    <Check size={22} strokeWidth={2} />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-[#94A3B8] tracking-widest uppercase block">
                      AURA SANCTUARY · PATAGONIA
                    </span>
                    <h4 className="text-lg font-medium font-swiss text-white mt-1">
                      {language === 'es' ? 'Solicitud registrada correctamente' : 'Inquiry registered successfully'}
                    </h4>
                  </div>
                  <p className="text-xs text-[#94A3B8] max-w-sm mx-auto leading-relaxed">
                    {language === 'es'
                      ? 'En un entorno de producción, este flujo conecta directamente con el motor de reservas del hotel o envía la comanda al concierge.'
                      : 'In production, this interaction connects directly to the property PMS or dispatches a priority concierge request.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-6 py-2.5 bg-[#0E1712] hover:bg-white/10 border border-white/15 text-xs font-mono text-white uppercase tracking-wider rounded-none transition-colors cursor-pointer"
                  >
                    {language === 'es' ? 'Volver al refugio' : 'Return to sanctuary'}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
