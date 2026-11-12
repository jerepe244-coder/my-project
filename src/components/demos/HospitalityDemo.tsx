'use client';

import React, { useState, useId } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, Shield, ArrowUpRight, Compass, Layers, Sliders } from 'lucide-react';

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
    elevation: '1,680 m · Sector Norte',
    azimuth: '42° N (Exposición Glaciar)',
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
    elevation: '1,540 m · Dosel de Alerces',
    azimuth: '128° SE (Canopia Nativa)',
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
    elevation: '1,790 m · Filo Sur',
    azimuth: '194° S (Macizo Rocoso Austral)',
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
  const preservationLevy = Math.round(accommodationTotal * 0.05); // 5% fondo de preservación alpina
  const grandTotal = accommodationTotal + conciergeTotal + preservationLevy;

  return (
    <div className="relative border border-zy-border bg-zy-card text-zy-fg font-swiss rounded-none overflow-hidden select-none">
      {/* Cruces de Registro Arquitectónico en los 4 Vértices (Monolith Grid) */}
      <span className="absolute top-1 left-2 font-mono text-[9px] text-[#94A3B8] z-20 pointer-events-none">+</span>
      <span className="absolute top-1 right-2 font-mono text-[9px] text-[#94A3B8] z-20 pointer-events-none">+</span>
      <span className="absolute bottom-1 left-2 font-mono text-[9px] text-[#94A3B8] z-20 pointer-events-none">+</span>
      <span className="absolute bottom-1 right-2 font-mono text-[9px] text-[#94A3B8] z-20 pointer-events-none">+</span>

      {/* 1. Franja Superior de Telemetría Técnica */}
      <div className="px-4 py-2.5 bg-zy-surface border-b border-zy-border flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono tracking-wider text-[#94A3B8]">
        <div className="flex items-center space-x-2">
          <span className="w-1.5 h-1.5 bg-[#FF3B30] inline-block animate-pulse" />
          <span className="text-zy-fg font-semibold uppercase">
            Aura Sanctuary · {language === 'es' ? 'Terminal de Reserva' : 'Booking Terminal'}
          </span>
          <span className="hidden sm:inline text-zy-muted">/</span>
          <span className="hidden sm:inline">[REF // AS-01]</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="hidden md:inline">{current.elevation}</span>
          <span className="hidden md:inline">VIENTO: 14 KM/H · -2°C</span>
          <span className="text-[#FF3B30] font-medium uppercase tracking-widest">
            ● {language === 'es' ? 'EN LÍNEA' : 'ONLINE'}
          </span>
        </div>
      </div>

      {/* 2. Retícula Monolítica Principal (60% Ficha Técnica | 40% Consola) */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* COLUMNA IZQUIERDA: Lámina Arquitectónica y Especificaciones (lg:col-span-7) */}
        <div className="lg:col-span-7 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-zy-border bg-zy-bg">
          {/* Selector de Suite en Celdas a 90° con Motion FLIP */}
          <div className="grid grid-cols-3 border-b border-zy-border bg-zy-surface">
            {AURA_SUITES.map((suite, idx) => {
              const isCurrent = selectedSuite === idx;
              return (
                <button
                  key={suite.id}
                  type="button"
                  onClick={() => handleSuiteChange(idx)}
                  className={`relative p-3 sm:p-4 text-left border-r last:border-r-0 border-zy-border transition-colors duration-150 ${
                    isCurrent ? 'bg-zy-card text-zy-fg' : 'text-zy-muted hover:text-zy-fg hover:bg-zy-card/50'
                  }`}
                >
                  {isCurrent && (
                    <motion.div
                      layoutId={`aura-active-bar-${activeSuiteId}`}
                      className="absolute top-0 left-0 right-0 h-[2px] bg-[#FF3B30]"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span className="block font-mono text-[10px] text-[#94A3B8] mb-1">
                    0{idx + 1} //
                  </span>
                  <span className="block text-xs font-medium tracking-tight truncate">
                    {suite.name[language as 'es' | 'en']}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Fotografía Arquitectónica a Sangre */}
          <div className="relative aspect-[16/10] w-full bg-[#08090B] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Sellos de Cota Arquitectónica Superpuestos */}
                <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-sm border border-white/10 font-mono text-[9px] text-[#94A3B8]">
                  COTA {current.elevation.split('·')[0]}
                </div>
                <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-sm border border-white/10 font-mono text-[9px] text-[#FF3B30] font-semibold">
                  {current.area}
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                  <div>
                    <span className="block font-mono text-[9px] text-[#94A3B8] tracking-widest uppercase">
                      {current.view[language as 'es' | 'en']}
                    </span>
                    <h3 className="text-base sm:text-lg font-medium tracking-tight">
                      {current.name[language as 'es' | 'en']}
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-[#EDEDED] font-semibold">
                    ${current.baseRate} USD <span className="text-[10px] text-[#94A3B8] font-normal">/ {language === 'es' ? 'noche' : 'night'}</span>
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Tabla Suiza de Especificaciones Arquitectónicas */}
          <div className="border-t border-zy-border bg-zy-card p-4 sm:p-5">
            <span className="block font-mono text-[9px] uppercase tracking-widest text-[#94A3B8] mb-3">
              [ {language === 'es' ? 'FICHA TÉCNICA DEL PABELLÓN' : 'PAVILION ARCHITECTURAL DATUM'} ]
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="border-b sm:border-b-0 sm:border-r border-zy-border pb-2 sm:pb-0 sm:pr-3">
                <span className="block text-[10px] text-zy-muted uppercase font-mono">{language === 'es' ? 'Orientación Solar' : 'Solar Azimuth'}</span>
                <span className="font-mono text-[11px] text-zy-fg">{current.azimuth ?? '42° N'}</span>
              </div>
              <div>
                <span className="block text-[10px] text-zy-muted uppercase font-mono">{language === 'es' ? 'Confort Térmico' : 'Thermal Enclosure'}</span>
                <span className="font-mono text-[11px] text-zy-fg">{current.thermal ?? 'R-40 Basalto'}</span>
              </div>
            </div>

            <p className="mt-3 text-xs text-zy-muted leading-relaxed font-sans border-t border-zy-border/60 pt-3">
              {current.summary[language as 'es' | 'en']}
            </p>

            <div className="mt-3 flex flex-wrap gap-2 pt-2">
              {current.amenities.map((amenity, i) => (
                <span
                  key={i}
                  className="inline-flex items-center px-2 py-1 bg-zy-surface border border-zy-border text-[10px] font-mono text-zy-fg-secondary"
                >
                  <span className="text-[#FF3B30] mr-1.5">▪</span>
                  {amenity[language as 'es' | 'en']}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: Consola de Reserva y Liquidación (lg:col-span-5) */}
        <div className="lg:col-span-5 p-5 sm:p-6 bg-zy-card flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            {/* Encabezado de la Consola */}
            <div className="border-b border-zy-border pb-3 flex items-center justify-between">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#94A3B8] block">
                  {language === 'es' ? 'CONSOLA DE CONCIERGE' : 'CONCIERGE DESK'}
                </span>
                <h4 className="text-sm font-semibold tracking-tight text-zy-fg mt-0.5">
                  {language === 'es' ? 'Configurar Estancia' : 'Configure Stay'}
                </h4>
              </div>
              <span className="font-mono text-[10px] text-[#94A3B8]">
                ID // AS-2026
              </span>
            </div>

            {/* Parámetros: Noches y Huéspedes con botones milimétricos */}
            <div className="grid grid-cols-2 gap-3">
              <div className="border border-zy-border p-3 bg-zy-surface">
                <span className="block text-[10px] font-mono uppercase text-[#94A3B8] mb-2">
                  {language === 'es' ? 'Duración (Noches)' : 'Duration (Nights)'}
                </span>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xl font-bold text-zy-fg">
                    {nights} <span className="text-xs text-zy-muted font-normal">{language === 'es' ? 'n' : 'n'}</span>
                  </span>
                  <div className="flex space-x-1">
                    <button
                      type="button"
                      onClick={() => setNights((n) => Math.max(1, n - 1))}
                      disabled={nights <= 1}
                      className="w-7 h-7 bg-zy-card border border-zy-border hover:bg-[#FF3B30] hover:text-white disabled:opacity-30 disabled:hover:bg-zy-card disabled:hover:text-zy-fg font-mono text-sm transition-colors duration-150 flex items-center justify-center"
                    >
                      -
                    </button>
                    <button
                      type="button"
                      onClick={() => setNights((n) => Math.min(14, n + 1))}
                      disabled={nights >= 14}
                      className="w-7 h-7 bg-zy-card border border-zy-border hover:bg-[#FF3B30] hover:text-white disabled:opacity-30 font-mono text-sm transition-colors duration-150 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="border border-zy-border p-3 bg-zy-surface">
                <span className="block text-[10px] font-mono uppercase text-[#94A3B8] mb-2">
                  {language === 'es' ? 'Huéspedes' : 'Guests'}
                </span>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xl font-bold text-zy-fg">
                    {guests} <span className="text-xs text-zy-muted font-normal">/ {current.capacity}</span>
                  </span>
                  <div className="flex space-x-1">
                    <button
                      type="button"
                      onClick={() => setGuests((g) => Math.max(1, g - 1))}
                      disabled={guests <= 1}
                      className="w-7 h-7 bg-zy-card border border-zy-border hover:bg-[#FF3B30] hover:text-white disabled:opacity-30 disabled:hover:bg-zy-card disabled:hover:text-zy-fg font-mono text-sm transition-colors duration-150 flex items-center justify-center"
                    >
                      -
                    </button>
                    <button
                      type="button"
                      onClick={() => setGuests((g) => Math.min(current.capacity, g + 1))}
                      disabled={guests >= current.capacity}
                      className="w-7 h-7 bg-zy-card border border-zy-border hover:bg-[#FF3B30] hover:text-white disabled:opacity-30 font-mono text-sm transition-colors duration-150 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Servicios Curados de Concierge (Toggles a 90°) */}
            <div className="space-y-2">
              <span className="block font-mono text-[9px] uppercase tracking-widest text-[#94A3B8]">
                [ {language === 'es' ? 'SERVICIOS ADICIONALES DE MONTAÑA' : 'BESPOKE MOUNTAIN CONCIERGE'} ]
              </span>

              {/* Extra 1: Desayuno */}
              <button
                type="button"
                onClick={() => setExtras((prev) => ({ ...prev, breakfast: !prev.breakfast }))}
                className={`w-full p-2.5 text-left border flex items-center justify-between transition-colors duration-150 ${
                  extras.breakfast
                    ? 'border-[#FF3B30] bg-[#FF3B30]/5 text-zy-fg'
                    : 'border-zy-border bg-zy-surface hover:border-zy-border-hover text-zy-muted'
                }`}
              >
                <div className="flex items-center space-x-2.5 text-xs">
                  <div
                    className={`w-3.5 h-3.5 border flex items-center justify-center transition-colors ${
                      extras.breakfast ? 'border-[#FF3B30] bg-[#FF3B30] text-white' : 'border-zy-border bg-zy-card'
                    }`}
                  >
                    {extras.breakfast && <Check size={10} strokeWidth={3} />}
                  </div>
                  <span className="font-medium text-zy-fg">
                    {language === 'es' ? 'Desayuno botánico alpino en suite' : 'Alpine botanical in-suite breakfast'}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-zy-fg-secondary">
                  +${EXTRA_RATES.breakfastPerNight}/n
                </span>
              </button>

              {/* Extra 2: Termas Privadas */}
              <button
                type="button"
                onClick={() => setExtras((prev) => ({ ...prev, spa: !prev.spa }))}
                className={`w-full p-2.5 text-left border flex items-center justify-between transition-colors duration-150 ${
                  extras.spa
                    ? 'border-[#FF3B30] bg-[#FF3B30]/5 text-zy-fg'
                    : 'border-zy-border bg-zy-surface hover:border-zy-border-hover text-zy-muted'
                }`}
              >
                <div className="flex items-center space-x-2.5 text-xs">
                  <div
                    className={`w-3.5 h-3.5 border flex items-center justify-center transition-colors ${
                      extras.spa ? 'border-[#FF3B30] bg-[#FF3B30] text-white' : 'border-zy-border bg-zy-card'
                    }`}
                  >
                    {extras.spa && <Check size={10} strokeWidth={3} />}
                  </div>
                  <span className="font-medium text-zy-fg">
                    {language === 'es' ? 'Pase nocturno privado a termas' : 'Private night thermal bath access'}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-zy-fg-secondary">
                  +${EXTRA_RATES.spaPerGuestStay}
                </span>
              </button>

              {/* Extra 3: Helicóptero */}
              <button
                type="button"
                onClick={() => setExtras((prev) => ({ ...prev, heli: !prev.heli }))}
                className={`w-full p-2.5 text-left border flex items-center justify-between transition-colors duration-150 ${
                  extras.heli
                    ? 'border-[#FF3B30] bg-[#FF3B30]/5 text-zy-fg'
                    : 'border-zy-border bg-zy-surface hover:border-zy-border-hover text-zy-muted'
                }`}
              >
                <div className="flex items-center space-x-2.5 text-xs">
                  <div
                    className={`w-3.5 h-3.5 border flex items-center justify-center transition-colors ${
                      extras.heli ? 'border-[#FF3B30] bg-[#FF3B30] text-white' : 'border-zy-border bg-zy-card'
                    }`}
                  >
                    {extras.heli && <Check size={10} strokeWidth={3} />}
                  </div>
                  <span className="font-medium text-zy-fg">
                    {language === 'es' ? 'Ascenso en helicóptero alpino' : 'Alpine helicopter valley transfer'}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-zy-fg-secondary">
                  +${EXTRA_RATES.heliTransferFlat}
                </span>
              </button>
            </div>
          </div>

          {/* Pliego de Liquidación / Recibo Criptográfico */}
          <div className="border border-zy-border bg-zy-surface p-4 space-y-3 font-mono text-[11px]">
            <div className="flex justify-between items-center text-[#94A3B8] border-b border-zy-border pb-2 text-[10px]">
              <span>[ORDEN // AS-{nights}N-{guests}P]</span>
              <span>VALUTAZIONE FISCALE</span>
            </div>

            <div className="space-y-1.5 text-zy-muted">
              <div className="flex justify-between">
                <span>{current.name[language as 'es' | 'en']} ({nights}n × ${current.baseRate})</span>
                <span className="text-zy-fg">${accommodationTotal} USD</span>
              </div>
              {extras.breakfast && (
                <div className="flex justify-between">
                  <span>{language === 'es' ? 'Desayuno botánico' : 'Botanical breakfast'} ({nights}n × {guests}p)</span>
                  <span className="text-zy-fg">+${breakfastTotal} USD</span>
                </div>
              )}
              {extras.spa && (
                <div className="flex justify-between">
                  <span>{language === 'es' ? 'Termas nocturnas' : 'Thermal bath pass'} ({guests}p)</span>
                  <span className="text-zy-fg">+${spaTotal} USD</span>
                </div>
              )}
              {extras.heli && (
                <div className="flex justify-between">
                  <span>{language === 'es' ? 'Helicóptero privado' : 'Helicopter transfer'}</span>
                  <span className="text-zy-fg">+${heliTotal} USD</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>{language === 'es' ? 'Fondo preservación glaciar (5%)' : 'Glacier preservation levy (5%)'}</span>
                <span className="text-zy-fg">+${preservationLevy} USD</span>
              </div>
            </div>

            {/* Total Monumental con Instrument Serif */}
            <div className="pt-3 border-t border-zy-border flex items-baseline justify-between">
              <div>
                <span className="block font-mono text-[9px] uppercase tracking-wider text-[#94A3B8]">
                  {language === 'es' ? 'TARIFA FINAL LIQUIDADA' : 'FINAL SETTLED RATE'}
                </span>
                <span className="text-[10px] text-zy-muted font-mono">{language === 'es' ? 'Impuestos incluidos' : 'Taxes included'}</span>
              </div>
              <div className="text-right">
                <span className="font-serif-editorial italic text-3xl sm:text-4xl text-zy-fg font-bold tracking-tight">
                  ${grandTotal.toLocaleString('en-US')}
                </span>
                <span className="font-mono text-[10px] text-[#94A3B8] ml-1">USD</span>
              </div>
            </div>
          </div>

          {/* Botón de Acción Maestro (Security Vermilion) */}
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="w-full py-4 bg-[#FF3B30] hover:bg-[#FF4A1C] active:scale-[0.99] text-white font-swiss text-xs font-semibold tracking-[0.08em] uppercase transition-all duration-150 flex items-center justify-center space-x-2 rounded-none cursor-pointer"
          >
            <span>{language === 'es' ? 'SOLICITAR PROTOCOLO DE RESERVA' : 'DISPATCH RESERVATION ORDER'}</span>
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>

      {/* MODAL EDITORIAL: Protocolo de Confirmación Criptográfica */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg bg-zy-card border border-zy-border p-6 sm:p-8 rounded-none shadow-2xl space-y-6"
            >
              {/* Cruces de esquina */}
              <span className="absolute top-2 left-2 font-mono text-[9px] text-[#94A3B8]">+</span>
              <span className="absolute top-2 right-2 font-mono text-[9px] text-[#94A3B8]">+</span>
              <span className="absolute bottom-2 left-2 font-mono text-[9px] text-[#94A3B8]">+</span>
              <span className="absolute bottom-2 right-2 font-mono text-[9px] text-[#94A3B8]">+</span>

              <div className="flex items-start justify-between border-b border-zy-border pb-4">
                <div>
                  <span className="font-mono text-[9px] text-[#FF3B30] uppercase tracking-widest block font-bold">
                    [ PROTOCOLO AURA // REF-2026 ]
                  </span>
                  <h3 className="text-lg font-bold font-swiss text-zy-fg mt-1">
                    {language === 'es' ? 'Despacho de Reserva Arquitectónica' : 'Architectural Reservation Dispatch'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="w-8 h-8 border border-zy-border flex items-center justify-center text-zy-muted hover:text-zy-fg hover:bg-zy-surface transition-colors"
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
                  className="space-y-4"
                >
                  <div className="p-3 bg-zy-surface border border-zy-border font-mono text-xs space-y-1">
                    <div className="flex justify-between text-zy-muted">
                      <span>{language === 'es' ? 'Suite Asignada:' : 'Assigned Suite:'}</span>
                      <span className="text-zy-fg font-semibold">{current.name[language as 'es' | 'en']}</span>
                    </div>
                    <div className="flex justify-between text-zy-muted">
                      <span>{language === 'es' ? 'Estancia:' : 'Duration:'}</span>
                      <span className="text-zy-fg">{nights} {language === 'es' ? 'noches' : 'nights'} · {guests} {language === 'es' ? 'huéspedes' : 'guests'}</span>
                    </div>
                    <div className="flex justify-between text-zy-muted pt-1 border-t border-zy-border">
                      <span className="text-[#FF3B30] font-semibold">{language === 'es' ? 'Liquidación Total:' : 'Total Amount:'}</span>
                      <span className="text-zy-fg font-bold">${grandTotal.toLocaleString('en-US')} USD</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block font-mono text-[10px] text-[#94A3B8] uppercase">
                      {language === 'es' ? 'Nombre Completo del Huésped' : 'Guest Full Name'}
                    </label>
                    <input
                      type="text"
                      required
                      defaultValue="Alexandre von Mercer"
                      className="w-full px-3 py-2.5 bg-zy-surface border border-zy-border text-xs text-zy-fg focus:outline-none focus:border-[#FF3B30] rounded-none font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-mono text-[10px] text-[#94A3B8] uppercase">
                      {language === 'es' ? 'Correo de Contacto Privado' : 'Private Concierge Email'}
                    </label>
                    <input
                      type="email"
                      required
                      defaultValue="mercer@mercer-holdings.ch"
                      className="w-full px-3 py-2.5 bg-zy-surface border border-zy-border text-xs text-zy-fg focus:outline-none focus:border-[#FF3B30] rounded-none font-mono"
                    />
                  </div>

                  <p className="text-[10px] text-zy-muted leading-relaxed font-sans pt-1">
                    {language === 'es'
                      ? 'Prototipo interactivo desarrollado por ZYRVAE para exhibición de experiencia de usuario boutique. No se realiza ningún cobro real.'
                      : 'Interactive functional prototype crafted by ZYRVAE for boutique client presentation. No financial charges incurred.'}
                  </p>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#FF3B30] hover:bg-[#FF4A1C] active:scale-[0.99] text-white font-swiss text-xs font-semibold tracking-wider uppercase transition-all duration-150 rounded-none cursor-pointer"
                  >
                    {language === 'es' ? 'CONFIRMAR Y EMITIR COMPROBANTE // ↗' : 'CONFIRM & DISPATCH MANIFESTO // ↗'}
                  </button>
                </form>
              ) : (
                <div className="py-6 text-center space-y-4">
                  <div className="w-12 h-12 border-2 border-[#FF3B30] text-[#FF3B30] flex items-center justify-center mx-auto">
                    <Check size={24} strokeWidth={2.5} />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-[#94A3B8] tracking-widest uppercase block">
                      SELLO // ORDEN AS-8841-B CONFIRMADA
                    </span>
                    <h4 className="text-base font-bold font-swiss text-zy-fg mt-1">
                      {language === 'es' ? 'Protocolo de Reserva Emitido con Éxito' : 'Reservation Protocol Dispatched'}
                    </h4>
                  </div>
                  <p className="text-xs text-zy-muted max-w-sm mx-auto leading-relaxed">
                    {language === 'es'
                      ? 'En entorno de producción, este evento conecta directamente con el PMS del hotel o notifica al mayordomo en suite con los requerimientos técnicos.'
                      : 'In production, this event connects to the property management system and triggers biometric key provisioning.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-6 py-2.5 bg-zy-surface hover:bg-zy-card border border-zy-border text-xs font-mono text-zy-fg uppercase tracking-wider rounded-none transition-colors"
                  >
                    {language === 'es' ? 'CERRAR VENTANA' : 'CLOSE MANIFESTO'}
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
