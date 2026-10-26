'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { Calendar, Users, Check, Compass, X, Info } from 'lucide-react';

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
}[] = [
  {
    id: 'panoramic',
    name: { es: 'Refugio Panorámico', en: 'Panoramic Shelter' },
    area: '84 m²',
    elevation: '1,680 m · Sector Norte',
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
  const [internalShowDrawer, setInternalShowDrawer] = useState(false);
  const [nights, setNights] = useState(3);
  const [guests, setGuests] = useState(2);
  const [extras, setExtras] = useState<{ breakfast: boolean; spa: boolean }>({
    breakfast: false,
    spa: false,
  });
  const [demoSubmitted, setDemoSubmitted] = useState(false);

  const selectedSuite = selectedSuiteIndex !== undefined ? selectedSuiteIndex : internalSuite;
  const showDrawer = showModal !== undefined ? showModal : internalShowDrawer;

  const setShowDrawer = (open: boolean) => {
    setInternalShowDrawer(open);
    onShowModalChange?.(open);
  };

  const handleSuiteChange = (idx: number) => {
    const nextSuite = AURA_SUITES[idx] ?? AURA_SUITES[0];
    const nextMax = nextSuite.capacity ?? 4;
    setInternalSuite(idx);
    onSelectSuite?.(idx);
    setGuests((prev) => Math.min(Math.max(prev, 1), nextMax));
    setDemoSubmitted(false);
  };

  const EXTRA_RATES = {
    breakfastPerAdultNight: 35,
    spaPerAdultStay: 85,
  };

  const current = AURA_SUITES[selectedSuite] ?? AURA_SUITES[0];
  const minAdults = 1;
  const maxAdults = current.capacity ?? 4;
  const activeAdults = Math.min(Math.max(guests, minAdults), maxAdults);

  const suiteSubtotal = current.baseRate * nights;
  const breakfastSubtotal = extras.breakfast
    ? EXTRA_RATES.breakfastPerAdultNight * activeAdults * nights
    : 0;
  const spaSubtotal = extras.spa ? EXTRA_RATES.spaPerAdultStay * activeAdults : 0;
  const extrasSubtotal = breakfastSubtotal + spaSubtotal;
  const totalPrice = suiteSubtotal + extrasSubtotal;

  const toggleExtra = (key: 'breakfast' | 'spa') => {
    setExtras((prev) => ({ ...prev, [key]: !prev[key] }));
    setDemoSubmitted(false);
  };

  const selectedExtrasLabels = [
    extras.breakfast ? (language === 'es' ? 'Desayuno' : 'Breakfast') : null,
    extras.spa ? 'Spa' : null,
  ].filter(Boolean) as string[];

  const adultsLabel =
    language === 'es'
      ? `${activeAdults} ${activeAdults === 1 ? 'adulto' : 'adultos'}`
      : `${activeAdults} ${activeAdults === 1 ? 'adult' : 'adults'}`;

  const nightsLabel =
    language === 'es'
      ? `${nights} ${nights === 1 ? 'noche' : 'noches'}`
      : `${nights} ${nights === 1 ? 'night' : 'nights'}`;

  const handleBookingSim = (e: React.FormEvent) => {
    e.preventDefault();
    setDemoSubmitted(true);
  };

  return (
    <div className="rounded-2xl border border-zy-border bg-zy-card overflow-hidden text-zy-fg font-sans shadow-sm">
      {/* Subtle Concierge Header Bar */}
      <div className="bg-zy-surface px-5 sm:px-7 py-3.5 border-b border-zy-border flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
        <div className="flex items-center space-x-2 text-zy-fg">
          <Compass size={14} className="text-zy-blue" />
          <span className="font-semibold uppercase tracking-wider">
            {language === 'es' ? 'RESERVA PRIVADA · AURA SANCTUARY' : 'PRIVATE STAY · AURA SANCTUARY'}
          </span>
        </div>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-zy-control text-zy-muted text-[10px] border border-zy-border-subtle">
          {language === 'es' ? 'Estadía conceptual · Sin cobros reales' : 'Conceptual stay · No real charges'}
        </span>
      </div>

      <div className="p-5 sm:p-8">
        {/* Suite Selector Tabs */}
        <div
          role="tablist"
          aria-label={language === 'es' ? 'Seleccionar suite' : 'Select suite'}
          className="flex flex-wrap gap-2 pb-6 border-b border-zy-border-subtle"
        >
          {AURA_SUITES.map((suite, idx) => (
            <button
              key={suite.id}
              type="button"
              role="tab"
              aria-selected={selectedSuite === idx}
              onClick={() => handleSuiteChange(idx)}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono transition-all flex items-center space-x-2 ${
                selectedSuite === idx
                  ? 'bg-zy-blue text-white font-semibold shadow-[0_0_15px_rgba(10,92,255,0.35)]'
                  : 'bg-zy-surface text-zy-muted hover:text-zy-fg hover:bg-zy-surface-hover border border-zy-border-subtle'
              }`}
            >
              <span>{suite.name[language]}</span>
              <span className={selectedSuite === idx ? 'text-white/80' : 'text-zy-dim'}>
                · ${suite.baseRate}
              </span>
            </button>
          ))}
        </div>

        {/* Selected Suite Detailed Inspector & Booking Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-start">
          <div className="lg:col-span-7 space-y-6">
            {/* Suite Photographic Showcase */}
            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-zy-border bg-[#090b0f] shadow-lg">
              <Image
                key={current.image}
                src={current.image}
                alt={current.name[language]}
                fill
                sizes="(max-width: 1024px) 100vw, 640px"
                className="object-cover object-center transition-all duration-500"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090b0f]/85 via-[#090b0f]/20 to-transparent" />
              <div className="pointer-events-none absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                <span className="px-2.5 py-1 rounded-md bg-[#0a0c10]/80 backdrop-blur-md border border-white/10 font-mono text-[10px] text-[#cbd4e6] tracking-wider uppercase">
                  {current.elevation}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-zy-blue/25 backdrop-blur-md border border-zy-blue/50 font-mono text-[10px] text-white font-semibold">
                  {current.area}
                </span>
              </div>
              <div className="pointer-events-none absolute bottom-3.5 left-4 right-4 flex items-end justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#9ba3b8] block">
                    {language === 'es' ? 'Orientación panorámica' : 'Panoramic orientation'}
                  </span>
                  <p className="text-xs sm:text-sm font-medium text-white font-sans">
                    {current.view[language]}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div className="flex items-baseline gap-3">
                  <h4 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-zy-fg">
                    {current.name[language]}
                  </h4>
                  <span className="font-mono text-xs text-zy-blue border border-zy-blue/30 px-2 py-0.5 rounded">
                    {current.area}
                  </span>
                </div>
                <span className="font-mono text-xs text-zy-muted">
                  {language === 'es' ? `Hasta ${maxAdults} adultos` : `Up to ${maxAdults} adults`}
                </span>
              </div>
              <p className="text-sm text-zy-muted font-sans leading-relaxed">
                {current.summary[language]}
              </p>
            </div>

            {/* Amenity checklist */}
            <div className="space-y-3">
              <p className="text-xs font-mono uppercase tracking-wider text-zy-dim">
                {language === 'es' ? 'Incluye en la suite' : 'Included in suite'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-zy-fg-secondary">
                {current.amenities.map((item, i) => (
                  <div key={i} className="flex items-center space-x-2.5 bg-zy-surface p-3 rounded-lg border border-zy-border-card">
                    <Check size={14} className="text-zy-blue shrink-0" />
                    <span>{item[language]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing & Reservation Configurator Column */}
          <div className="lg:col-span-5 bg-zy-surface p-5 sm:p-6 rounded-xl border border-zy-border flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zy-dim block">
                    {language === 'es' ? 'Tarifa por noche' : 'Nightly rate'}
                  </span>
                  <div className="flex items-baseline space-x-1 mt-1">
                    <span className="text-3xl font-bold text-zy-fg font-sans">${current.baseRate}</span>
                    <span className="text-xs text-zy-muted font-mono">USD / {language === 'es' ? 'noche' : 'night'}</span>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-zy-blue bg-zy-accent-soft px-2.5 py-1 rounded-md border border-zy-blue/20">
                  {current.area}
                </span>
              </div>

              <div className="mt-5 pt-4 border-t border-zy-border-card space-y-3.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-2 text-zy-fg-secondary font-medium">
                    <Calendar size={14} className="text-zy-blue" />
                    <span>{language === 'es' ? 'Noches de estadía' : 'Stay duration'}</span>
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      disabled={nights <= 1}
                      aria-label={language === 'es' ? 'Disminuir noches' : 'Decrease nights'}
                      onClick={() => {
                        setNights((prev) => Math.max(1, prev - 1));
                        setDemoSubmitted(false);
                      }}
                      className="w-7 h-7 rounded-lg bg-zy-control border border-zy-border text-zy-fg flex items-center justify-center font-mono hover:bg-zy-control-hover disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      -
                    </button>
                    <span className="font-mono text-zy-fg font-semibold w-5 text-center">{nights}</span>
                    <button
                      type="button"
                      aria-label={language === 'es' ? 'Aumentar noches' : 'Increase nights'}
                      onClick={() => {
                        setNights((prev) => prev + 1);
                        setDemoSubmitted(false);
                      }}
                      className="w-7 h-7 rounded-lg bg-zy-control border border-zy-border text-zy-fg flex items-center justify-center font-mono hover:bg-zy-control-hover"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-2 text-zy-fg-secondary font-medium">
                    <Users size={14} className="text-zy-blue" />
                    <span>
                      {language === 'es' ? 'Huéspedes adultos' : 'Adult guests'}{' '}
                      <span className="text-[10px] font-mono text-zy-dim font-normal">
                        ({language === 'es' ? `máx. ${maxAdults}` : `max. ${maxAdults}`})
                      </span>
                    </span>
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      disabled={activeAdults <= minAdults}
                      aria-label={language === 'es' ? 'Disminuir adultos' : 'Decrease adults'}
                      onClick={() => {
                        setGuests((prev) => Math.max(minAdults, prev - 1));
                        setDemoSubmitted(false);
                      }}
                      className="w-7 h-7 rounded-lg bg-zy-control border border-zy-border text-zy-fg flex items-center justify-center font-mono hover:bg-zy-control-hover disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      -
                    </button>
                    <span className="font-mono text-zy-fg font-semibold w-5 text-center">{activeAdults}</span>
                    <button
                      type="button"
                      disabled={activeAdults >= maxAdults}
                      aria-label={language === 'es' ? 'Aumentar adultos' : 'Increase adults'}
                      onClick={() => {
                        setGuests((prev) => Math.min(maxAdults, prev + 1));
                        setDemoSubmitted(false);
                      }}
                      className="w-7 h-7 rounded-lg bg-zy-control border border-zy-border text-zy-fg flex items-center justify-center font-mono hover:bg-zy-control-hover disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Optional Experiences Selector */}
              <div className="mt-4 pt-4 border-t border-zy-border-card space-y-2.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zy-dim block">
                  {language === 'es' ? 'Experiencias adicionales' : 'Curated add-ons'}
                </span>

                <button
                  type="button"
                  aria-pressed={extras.breakfast}
                  onClick={() => toggleExtra('breakfast')}
                  className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between gap-2 text-xs ${
                    extras.breakfast
                      ? 'bg-zy-accent-soft border-zy-blue text-zy-fg'
                      : 'bg-zy-card border-zy-border-card text-zy-muted hover:border-zy-border-strong hover:text-zy-fg'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <span
                      className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 ${
                        extras.breakfast
                          ? 'bg-zy-blue border-zy-blue text-white'
                          : 'border-zy-border-strong bg-zy-surface'
                      }`}
                    >
                      {extras.breakfast && <Check size={11} />}
                    </span>
                    <div className="truncate">
                      <span className="font-medium block truncate">
                        {language === 'es' ? 'Desayuno botánico' : 'Botanical breakfast'}
                      </span>
                      <span className="text-[10px] font-mono text-zy-muted block">
                        ${EXTRA_RATES.breakfastPerAdultNight}{' '}
                        {language === 'es' ? '/ adulto · noche' : '/ adult · night'}
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-[11px] text-zy-fg-secondary shrink-0">
                    +${EXTRA_RATES.breakfastPerAdultNight * activeAdults * nights}
                  </span>
                </button>

                <button
                  type="button"
                  aria-pressed={extras.spa}
                  onClick={() => toggleExtra('spa')}
                  className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between gap-2 text-xs ${
                    extras.spa
                      ? 'bg-zy-accent-soft border-zy-blue text-zy-fg'
                      : 'bg-zy-card border-zy-border-card text-zy-muted hover:border-zy-border-strong hover:text-zy-fg'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <span
                      className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 ${
                        extras.spa
                          ? 'bg-zy-blue border-zy-blue text-white'
                          : 'border-zy-border-strong bg-zy-surface'
                      }`}
                    >
                      {extras.spa && <Check size={11} />}
                    </span>
                    <div className="truncate">
                      <span className="font-medium block truncate">
                        {language === 'es' ? 'Circuito de Spa termal' : 'Thermal Spa circuit'}
                      </span>
                      <span className="text-[10px] font-mono text-zy-muted block">
                        ${EXTRA_RATES.spaPerAdultStay}{' '}
                        {language === 'es' ? '/ adulto · estadía' : '/ adult · stay'}
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-[11px] text-zy-fg-secondary shrink-0">
                    +${EXTRA_RATES.spaPerAdultStay * activeAdults}
                  </span>
                </button>
              </div>
            </div>

            {/* Dynamic Summary & Breakdown */}
            <div className="pt-4 border-t border-zy-border-card space-y-3.5">
              <div className="p-3.5 rounded-xl bg-zy-card border border-zy-border-card text-[11px] font-mono space-y-1.5">
                <div className="flex justify-between gap-2">
                  <span className="text-zy-muted">{language === 'es' ? 'Suite:' : 'Suite:'}</span>
                  <span className="text-zy-fg font-semibold text-right">{current.name[language]}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-zy-muted">{language === 'es' ? 'Huéspedes:' : 'Guests:'}</span>
                  <span className="text-zy-fg text-right">
                    {adultsLabel} · {nightsLabel}
                  </span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-zy-muted">{language === 'es' ? 'Extras:' : 'Extras:'}</span>
                  <span className="text-zy-fg-secondary text-right">
                    {selectedExtrasLabels.length > 0
                      ? selectedExtrasLabels.join(', ')
                      : language === 'es'
                        ? 'Ninguno'
                        : 'None'}
                  </span>
                </div>

                <div className="pt-1.5 mt-1.5 border-t border-zy-border-subtle space-y-1">
                  <div className="flex justify-between text-zy-muted">
                    <span>
                      {language === 'es' ? 'Suite' : 'Suite'} (${current.baseRate} × {nights}n)
                    </span>
                    <span className="text-zy-fg-secondary">${suiteSubtotal} USD</span>
                  </div>
                  {extras.breakfast && (
                    <div className="flex justify-between text-zy-muted">
                      <span>
                        {language === 'es' ? 'Desayuno' : 'Breakfast'} (${EXTRA_RATES.breakfastPerAdultNight} × {activeAdults} × {nights}n)
                      </span>
                      <span className="text-zy-fg-secondary">+${breakfastSubtotal} USD</span>
                    </div>
                  )}
                  {extras.spa && (
                    <div className="flex justify-between text-zy-muted">
                      <span>
                        {language === 'es' ? 'Spa termal' : 'Thermal spa'} (${EXTRA_RATES.spaPerAdultStay} × {activeAdults})
                      </span>
                      <span className="text-zy-fg-secondary">+${spaSubtotal} USD</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-baseline px-0.5">
                <span className="text-xs text-zy-muted">{language === 'es' ? 'Total estimado:' : 'Estimated total:'}</span>
                <span className="text-xl font-bold text-zy-fg font-sans">${totalPrice} USD</span>
              </div>

              <button
                type="button"
                onClick={() => setShowDrawer(true)}
                className="w-full py-3 rounded-xl bg-zy-blue hover:bg-zy-blue-hover text-white text-xs font-medium font-sans transition-all shadow-[0_0_15px_rgba(10,92,255,0.3)]"
              >
                {language === 'es' ? 'Solicitar reserva de estadía ↗' : 'Request stay reservation ↗'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Modal Drawer for Mock Reservation */}
      {showDrawer && (
        <div
          role="dialog"
          aria-modal="true"
          style={{ backgroundColor: 'var(--zy-modal-backdrop)' }}
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4"
        >
          <div className="bg-zy-card border border-zy-border rounded-2xl max-w-md w-full p-6 text-zy-fg relative shadow-2xl">
            <button
              type="button"
              onClick={() => setShowDrawer(false)}
              aria-label={language === 'es' ? 'Cerrar modal' : 'Close modal'}
              className="absolute top-4 right-4 p-1.5 rounded-full text-zy-muted hover:text-zy-fg hover:bg-zy-control"
            >
              <X size={16} />
            </button>

            <div className="flex items-center space-x-2 text-zy-blue text-xs font-mono mb-2">
              <Info size={14} />
              <span>{language === 'es' ? 'CONSERJERÍA AURA · DEMO CONCEPTUAL' : 'AURA CONCIERGE · CONCEPT DEMO'}</span>
            </div>

            {!demoSubmitted ? (
              <form onSubmit={handleBookingSim} className="space-y-4">
                <h3 className="text-xl font-bold font-sans text-zy-fg">
                  {language === 'es' ? 'Solicitar estadía en' : 'Inquire stay at'} {current.name[language]}
                </h3>

                <div className="p-3 bg-zy-surface rounded-lg border border-zy-border text-xs font-mono space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-zy-muted">{language === 'es' ? 'Suite:' : 'Suite:'}</span>
                    <span className="text-zy-fg font-semibold">{current.name[language]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zy-muted">{language === 'es' ? 'Duración:' : 'Length:'}</span>
                    <span className="text-zy-fg">{nightsLabel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zy-muted">{language === 'es' ? 'Huéspedes:' : 'Guests:'}</span>
                    <span className="text-zy-fg">{adultsLabel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zy-muted">{language === 'es' ? 'Extras:' : 'Extras:'}</span>
                    <span className="text-zy-fg">
                      {selectedExtrasLabels.length > 0
                        ? selectedExtrasLabels.join(', ')
                        : language === 'es'
                          ? 'Ninguno'
                          : 'None'}
                    </span>
                  </div>
                  <div className="pt-1.5 border-t border-zy-border space-y-1 text-[11px]">
                    <div className="flex justify-between text-zy-muted">
                      <span>
                        {language === 'es' ? 'Alojamiento' : 'Stay'} (${current.baseRate} × {nights}n)
                      </span>
                      <span className="text-zy-fg-secondary">${suiteSubtotal} USD</span>
                    </div>
                    {extras.breakfast && (
                      <div className="flex justify-between text-zy-muted">
                        <span>
                          {language === 'es' ? 'Desayuno' : 'Breakfast'} (${EXTRA_RATES.breakfastPerAdultNight} × {activeAdults} × {nights}n)
                        </span>
                        <span className="text-zy-fg-secondary">+${breakfastSubtotal} USD</span>
                      </div>
                    )}
                    {extras.spa && (
                      <div className="flex justify-between text-zy-muted">
                        <span>
                          {language === 'es' ? 'Spa termal' : 'Thermal spa'} (${EXTRA_RATES.spaPerAdultStay} × {activeAdults})
                        </span>
                        <span className="text-zy-fg-secondary">+${spaSubtotal} USD</span>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between text-zy-blue font-semibold pt-1.5 border-t border-zy-border">
                    <span>{language === 'es' ? 'Total estimado:' : 'Estimated total:'}</span>
                    <span>${totalPrice} USD</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-zy-fg-secondary">
                    {language === 'es' ? 'Nombre del huésped (simulado):' : 'Guest name (simulated):'}
                  </label>
                  <input
                    type="text"
                    required
                    defaultValue="Alex Mercer"
                    className="w-full px-3 py-2 bg-zy-surface border border-zy-border rounded-lg text-xs text-zy-fg focus:outline-none focus:border-zy-blue"
                  />
                </div>

                <p className="text-[11px] text-zy-muted leading-relaxed">
                  {language === 'es'
                    ? 'Esta es una simulación visual creada por ZYRVAE para demostrar flujos de reserva boutique. No se realizará ningún cobro ni reserva real.'
                    : 'This is a visual concept simulation built by ZYRVAE to showcase boutique reservation flows. No real reservation or payment will occur.'}
                </p>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-zy-blue hover:bg-zy-blue-hover text-white text-xs font-medium font-sans transition-all"
                >
                  {language === 'es' ? 'Confirmar solicitud demostrativa' : 'Confirm demonstration inquiry'}
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-zy-blue/20 text-zy-blue flex items-center justify-center mx-auto border border-zy-blue/40">
                  <Check size={24} />
                </div>
                <h3 className="text-lg font-bold font-sans text-zy-fg">
                  {language === 'es' ? 'Solicitud registrada (Simulación)' : 'Inquiry registered (Simulation)'}
                </h3>
                <p className="text-xs text-zy-muted leading-relaxed">
                  {language === 'es'
                    ? 'En un entorno de producción, esta acción conectaría directamente con el motor de reservas del hotel o enviaría el pedido a conserjería.'
                    : 'In production, this interaction connects directly to the property PMS or dispatches a priority concierge request.'}
                </p>
                <button
                  type="button"
                  onClick={() => setShowDrawer(false)}
                  className="px-4 py-2 rounded-lg bg-zy-control hover:bg-zy-control-hover border border-zy-border text-xs font-mono text-zy-fg"
                >
                  {language === 'es' ? 'Volver a AURA Sanctuary' : 'Return to AURA Sanctuary'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
