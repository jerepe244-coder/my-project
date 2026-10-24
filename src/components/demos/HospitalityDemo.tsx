'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Calendar, Users, Check, Sparkles, X, Info } from 'lucide-react';

export const HospitalityDemo: React.FC = () => {
  const { language } = useLanguage();
  const [selectedSuite, setSelectedSuite] = useState(0);
  const [showDrawer, setShowDrawer] = useState(false);
  const [nights, setNights] = useState(3);
  const [guests, setGuests] = useState(2);
  const [demoSubmitted, setDemoSubmitted] = useState(false);

  const suites = [
    {
      id: 'panoramic',
      name: { es: 'Refugio Panorámico', en: 'Panoramic Shelter' },
      area: '84 m²',
      view: { es: 'Horizonte alpino y glaciar', en: 'Alpine horizon & glacier' },
      baseRate: 480,
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
      view: { es: 'Canopia de alerces nativos', en: 'Native larch canopy' },
      baseRate: 390,
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
      view: { es: 'Macizo rocoso y valle sur', en: 'Rock massif & southern valley' },
      baseRate: 620,
      amenities: [
        { es: 'Dos niveles con estudio privado', en: 'Bi-level with private studio' },
        { es: 'Sauna finlandés de cedro propio', en: 'Dedicated cedar Finnish sauna' },
        { es: 'Acceso directo a senderos privados', en: 'Direct access to secluded trails' },
        { es: 'Servicio de sommelier en suite', en: 'Private sommelier service' },
      ],
    },
  ];

  const current = suites[selectedSuite];
  const totalPrice = current.baseRate * nights;

  const handleBookingSim = (e: React.FormEvent) => {
    e.preventDefault();
    setDemoSubmitted(true);
  };

  return (
    <div className="rounded-2xl border border-[#1e232d] bg-[#0d0f14] overflow-hidden text-white font-sans">
      {/* Demo Header Bar with clear disclaimer */}
      <div className="bg-[#12161f] px-5 py-3 border-b border-[#1e232d] flex items-center justify-between text-xs font-mono">
        <div className="flex items-center space-x-2 text-[#0a5cff]">
          <Sparkles size={14} />
          <span className="font-semibold uppercase tracking-wider">
            {language === 'es' ? 'DEMO INTERACTIVA' : 'INTERACTIVE DEMO'}
          </span>
          <span className="text-[#515768]">| AURA SANCTUARY</span>
        </div>
        <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#1f2633] text-[#8b92a5] text-[10px]">
          {language === 'es' ? 'Simulación conceptual sin cobros' : 'Conceptual simulation only'}
        </span>
      </div>

      <div className="p-6 md:p-8">
        {/* Suite Selector Tabs */}
        <div className="flex flex-wrap gap-2 pb-6 border-b border-[#1a1f29]">
          {suites.map((suite, idx) => (
            <button
              key={suite.id}
              type="button"
              onClick={() => {
                setSelectedSuite(idx);
                setDemoSubmitted(false);
              }}
              className={`px-4 py-2 rounded-lg text-xs font-mono transition-all ${
                selectedSuite === idx
                  ? 'bg-[#0a5cff] text-white font-semibold shadow-[0_0_15px_rgba(10,92,255,0.4)]'
                  : 'bg-[#151922] text-[#8b92a5] hover:text-white hover:bg-[#1a202c]'
              }`}
            >
              {suite.name[language]}
            </button>
          ))}
        </div>

        {/* Selected Suite Detailed Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-baseline space-x-3">
                <h4 className="text-2xl font-bold font-sans text-white">
                  {current.name[language]}
                </h4>
                <span className="font-mono text-xs text-[#0a5cff] border border-[#0a5cff]/30 px-2 py-0.5 rounded">
                  {current.area}
                </span>
              </div>
              <p className="text-xs text-[#8b92a5] font-mono mt-1">
                {language === 'es' ? 'Orientación:' : 'View:'} {current.view[language]}
              </p>
            </div>

            {/* Amenity checklist */}
            <div className="space-y-2.5">
              <p className="text-xs font-mono uppercase tracking-wider text-[#515768]">
                // {language === 'es' ? 'Comodidades de la suite' : 'Curated amenities'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#cbd4e6]">
                {current.amenities.map((item, i) => (
                  <div key={i} className="flex items-center space-x-2 bg-[#12151d] p-2.5 rounded-lg border border-[#1a1f29]">
                    <Check size={14} className="text-[#0a5cff] shrink-0" />
                    <span>{item[language]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing & Reservation Simulator Column */}
          <div className="bg-[#12161f] p-5 rounded-xl border border-[#1e232d] flex flex-col justify-between space-y-5">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#515768]">
                {language === 'es' ? 'Tarifa base estimada' : 'Estimated base rate'}
              </span>
              <div className="flex items-baseline space-x-1 mt-1">
                <span className="text-3xl font-bold text-white font-sans">${current.baseRate}</span>
                <span className="text-xs text-[#8b92a5] font-mono">/ {language === 'es' ? 'noche' : 'night'}</span>
              </div>

              <div className="mt-4 pt-4 border-t border-[#1a1f29] space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-1.5 text-[#8b92a5]">
                    <Calendar size={13} />
                    <span>{language === 'es' ? 'Noches:' : 'Nights:'}</span>
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => setNights(Math.max(1, nights - 1))}
                      className="w-6 h-6 rounded bg-[#1c222e] text-white flex items-center justify-center font-mono hover:bg-[#252c3c]"
                    >
                      -
                    </button>
                    <span className="font-mono text-white font-semibold">{nights}</span>
                    <button
                      type="button"
                      onClick={() => setNights(nights + 1)}
                      className="w-6 h-6 rounded bg-[#1c222e] text-white flex items-center justify-center font-mono hover:bg-[#252c3c]"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-1.5 text-[#8b92a5]">
                    <Users size={13} />
                    <span>{language === 'es' ? 'Huéspedes:' : 'Guests:'}</span>
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="w-6 h-6 rounded bg-[#1c222e] text-white flex items-center justify-center font-mono hover:bg-[#252c3c]"
                    >
                      -
                    </button>
                    <span className="font-mono text-white font-semibold">{guests}</span>
                    <button
                      type="button"
                      onClick={() => setGuests(Math.min(4, guests + 1))}
                      className="w-6 h-6 rounded bg-[#1c222e] text-white flex items-center justify-center font-mono hover:bg-[#252c3c]"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1a1f29]">
              <div className="flex justify-between items-baseline mb-3">
                <span className="text-xs text-[#8b92a5]">{language === 'es' ? 'Total estimado:' : 'Estimated total:'}</span>
                <span className="text-xl font-bold text-white font-sans">${totalPrice} USD</span>
              </div>

              <button
                type="button"
                onClick={() => setShowDrawer(true)}
                className="w-full py-2.5 rounded-lg bg-[#0a5cff] hover:bg-[#2672ff] text-white text-xs font-medium font-sans transition-all shadow-[0_0_15px_rgba(10,92,255,0.3)]"
              >
                {language === 'es' ? 'Probar solicitud de reserva ↗' : 'Test reservation request ↗'}
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
          <div className="bg-[#10131a] border border-[#252c3b] rounded-2xl max-w-md w-full p-6 text-white relative shadow-2xl">
            <button
              type="button"
              onClick={() => setShowDrawer(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-[#8b92a5] hover:text-white hover:bg-[#1a202c]"
            >
              <X size={16} />
            </button>

            <div className="flex items-center space-x-2 text-[#0a5cff] text-xs font-mono mb-2">
              <Info size={14} />
              <span>{language === 'es' ? 'SIMULADOR DE DEMOSTRACIÓN' : 'DEMO SIMULATOR'}</span>
            </div>

            {!demoSubmitted ? (
              <form onSubmit={handleBookingSim} className="space-y-4">
                <h3 className="text-xl font-bold font-sans">
                  {language === 'es' ? 'Solicitar estadía en' : 'Inquire stay at'} {current.name[language]}
                </h3>

                <div className="p-3 bg-[#151922] rounded-lg border border-[#1e2430] text-xs font-mono space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[#8b92a5]">{language === 'es' ? 'Duración:' : 'Length:'}</span>
                    <span>{nights} {language === 'es' ? 'noches' : 'nights'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8b92a5]">{language === 'es' ? 'Huéspedes:' : 'Guests:'}</span>
                    <span>{guests}</span>
                  </div>
                  <div className="flex justify-between text-[#0a5cff] font-semibold pt-1 border-t border-[#202735]">
                    <span>{language === 'es' ? 'Presupuesto base:' : 'Base budget:'}</span>
                    <span>${totalPrice} USD</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-[#cbd4e6]">
                    {language === 'es' ? 'Nombre simulado:' : 'Mock guest name:'}
                  </label>
                  <input
                    type="text"
                    required
                    defaultValue="Alex Mercer"
                    className="w-full px-3 py-2 bg-[#0a0c10] border border-[#1e2430] rounded-lg text-xs text-white focus:outline-none focus:border-[#0a5cff]"
                  />
                </div>

                <p className="text-[11px] text-[#8b92a5] leading-relaxed">
                  {language === 'es'
                    ? 'Esta es una simulación visual creada por ZYRVAE para demostrar flujos de reserva boutique. No se realizará ningún cobro ni reserva real.'
                    : 'This is a visual concept simulation built by ZYRVAE to showcase boutique reservation flows. No real reservation or payment will occur.'}
                </p>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-[#0a5cff] hover:bg-[#2672ff] text-white text-xs font-medium font-sans transition-all"
                >
                  {language === 'es' ? 'Completar simulación de consulta' : 'Complete inquiry simulation'}
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#0a5cff]/20 text-[#0a5cff] flex items-center justify-center mx-auto border border-[#0a5cff]/40">
                  <Check size={24} />
                </div>
                <h3 className="text-lg font-bold font-sans">
                  {language === 'es' ? 'Simulación completada con éxito' : 'Simulation completed successfully'}
                </h3>
                <p className="text-xs text-[#8b92a5] leading-relaxed">
                  {language === 'es'
                    ? 'En un entorno de producción, esta acción generaría una reserva en tu PMS hotelero o despacharía un brief prioritario a tu conserjería.'
                    : 'In production, this interaction hooks directly into your hotel PMS or dispatches a priority concierge notification.'}
                </p>
                <button
                  type="button"
                  onClick={() => setShowDrawer(false)}
                  className="px-4 py-2 rounded-lg bg-[#1a202c] hover:bg-[#242c3c] text-xs font-mono text-white"
                >
                  {language === 'es' ? 'Cerrar demostración' : 'Close demo'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
