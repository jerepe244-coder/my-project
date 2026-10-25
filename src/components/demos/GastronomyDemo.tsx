'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Sparkles, Wine, Check, Info } from 'lucide-react';

export const GastronomyDemo: React.FC = () => {
  const { language } = useLanguage();
  const [courseCount, setCourseCount] = useState<7 | 11>(7);
  const [pairingActive, setPairingActive] = useState(true);
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'pescatarian' | 'plant-forward'>('all');
  const [bookingSimOpen, setBookingSimOpen] = useState(false);
  const [bookedSuccess, setBookedSuccess] = useState(false);

  const menuCourses = [
    {
      num: '01',
      title: { es: 'Infusión de Agujas de Alerce y Consomé Frío', en: 'Larch Needle Infusion & Chilled Consommé' },
      notes: { es: 'Baya de enebro silvestre, gotas de aceite de higuera.', en: 'Wild juniper berry, fig leaf oil droplets.' },
      pairing: { es: 'Sidra de manzana salvaje del Valle de Uco 2022', en: 'Wild Fermented Apple Cider 2022' },
      dietary: ['pescatarian', 'plant-forward'],
    },
    {
      num: '02',
      title: { es: 'Trucha Ahumada en Frío y Ovas Curadas', en: 'Cold-Smoked Lake Trout & Cured Roe' },
      notes: { es: 'Alga marina patagónica, gelée de dashi de hongos secos.', en: 'Patagonian coastal kelp, dried mushroom dashi.' },
      pairing: { es: 'Savagnin Ouillé 2021 (Crianza biológica)', en: 'Savagnin Ouillé 2021 (Biological aging)' },
      dietary: ['pescatarian'],
    },
    {
      num: '03',
      title: { es: 'Topinambur Asado en Resina y Mantequilla Tostada', en: 'Resin-Roasted Sunchoke & Brown Butter' },
      notes: { es: 'Crumble de trigo sarraceno y emulsión de levadura silvestre.', en: 'Buckwheat crumble and wild yeast emulsion.' },
      pairing: { es: 'Torrontés de Maceración Pelicular 2023 (Cafayate)', en: 'Skin-Contact Torrontés 2023 (High Altitude)' },
      dietary: ['pescatarian', 'plant-forward'],
    },
    {
      num: '04',
      title: { es: 'Hongos Morchella al Fuego de Quebracho', en: 'Quebracho-Fired Morel Mushrooms' },
      notes: { es: 'Jugo concentrado de raíces asadas, brotes de ajo negro.', en: 'Concentrated roasted root glaze, black garlic shoots.' },
      pairing: { es: 'Pinot Noir de Parcela No Filtrado 2020', en: 'Single-Parcel Unfiltered Pinot Noir 2020' },
      dietary: ['pescatarian', 'plant-forward'],
    },
    {
      num: '05',
      title: { es: 'Cordero en Dos Cocciones con Cenizas de Romero', en: 'Two-Way Lamb with Rosemary Ashes' },
      notes: { es: 'Puré de chirivía ahumada y reducción de bayas de sauco.', en: 'Smoked parsnip purée and elderberry reduction.' },
      pairing: { es: 'Cabernet Franc de Suelo Calcáreo 2018', en: 'Limestone Terroir Cabernet Franc 2018' },
      dietary: [],
    },
    {
      num: '06',
      title: { es: 'Nieve de Saúco y Sorbet de Verbena Limonera', en: 'Elderflower Snow & Lemon Verbena Sorbet' },
      notes: { es: 'Cristales de miel de bosque y polen nativo recolectado a mano.', en: 'Forest honey crystals and hand-harvested pollen.' },
      pairing: { es: 'Kombucha de Té Oolong y Miel de Pradera', en: 'Oolong & Meadow Honey Raw Kombucha' },
      dietary: ['pescatarian', 'plant-forward'],
    },
    {
      num: '07',
      title: { es: 'Cacao Salvaje, Malta Tostada y Sal Marina de Cabo Blanco', en: 'Wild Cacao, Roasted Malt & Cabo Blanco Sea Salt' },
      notes: { es: 'Helado de leche de oveja ahumada y aceite de oliva virgen.', en: 'Smoked sheep milk gelato and green olive oil.' },
      pairing: { es: 'Vino de Licor de Cosecha Tardía 2016', en: 'Late Harvest Fortified Botrytis 2016' },
      dietary: ['pescatarian', 'plant-forward'],
    },
  ];

  const visibleCourses = courseCount === 7 ? menuCourses : [...menuCourses, ...menuCourses.slice(0, 4)];

  return (
    <div className="rounded-2xl border border-[#26211a] bg-[#0c0b08] overflow-hidden text-white font-sans">
      {/* Top Demo Bar */}
      <div className="bg-[#14120e] px-5 py-3 border-b border-[#26211a] flex items-center justify-between text-xs font-mono">
        <div className="flex items-center space-x-2 text-[#0a5cff]">
          <Sparkles size={14} />
          <span className="font-semibold uppercase tracking-wider">
            {language === 'es' ? 'DEMO INTERACTIVA' : 'INTERACTIVE DEMO'}
          </span>
          <span className="text-[#695f51]">| KÔN ATELIER</span>
        </div>
        <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#1e1b14] text-[#a39682] text-[10px]">
          {language === 'es' ? 'Menú vivo con maridaje dinámico' : 'Live menu with pairing toggle'}
        </span>
      </div>

      <div className="p-6 md:p-8 space-y-6">
        {/* Controls Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1c1913]">
          {/* 7 vs 11 Steps Switcher */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono text-[#8c7e6b] uppercase">
              {language === 'es' ? 'Recorrido:' : 'Experience:'}
            </span>
            <div className="inline-flex rounded-lg bg-[#14120e] p-1 border border-[#26211a]">
              <button
                type="button"
                onClick={() => setCourseCount(7)}
                className={`px-3 py-1 rounded text-xs font-mono transition-all ${
                  courseCount === 7
                    ? 'bg-[#0a5cff] text-white font-semibold'
                    : 'text-[#8c7e6b] hover:text-white'
                }`}
              >
                7 {language === 'es' ? 'Pasos' : 'Courses'}
              </button>
              <button
                type="button"
                onClick={() => setCourseCount(11)}
                className={`px-3 py-1 rounded text-xs font-mono transition-all ${
                  courseCount === 11
                    ? 'bg-[#0a5cff] text-white font-semibold'
                    : 'text-[#8c7e6b] hover:text-white'
                }`}
              >
                11 {language === 'es' ? 'Pasos (Gran Recorrido)' : 'Courses (Full Journey)'}
              </button>
            </div>
          </div>

          {/* Wine Pairing Toggle */}
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => setPairingActive(!pairingActive)}
              className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all ${
                pairingActive
                  ? 'bg-[#1b1710] border-[#0a5cff] text-white'
                  : 'bg-[#14120e] border-[#26211a] text-[#695f51]'
              }`}
            >
              <Wine size={14} className={pairingActive ? 'text-[#0a5cff]' : 'text-[#695f51]'} />
              <span>
                {language === 'es'
                  ? pairingActive ? 'Maridaje incluido' : 'Sin maridaje'
                  : pairingActive ? 'Pairing shown' : 'Pairing hidden'}
              </span>
            </button>

            {/* Dietary Toggle */}
            <div className="flex items-center space-x-1 bg-[#14120e] p-0.5 rounded-lg border border-[#26211a] text-xs font-mono">
              <button
                type="button"
                onClick={() => setDietaryFilter('all')}
                className={`px-2 py-1 rounded text-[11px] transition-colors ${
                  dietaryFilter === 'all'
                    ? 'bg-[#221c13] text-white font-medium'
                    : 'text-[#8b92a5] hover:text-white'
                }`}
              >
                {language === 'es' ? 'Todo' : 'All'}
              </button>
              <button
                type="button"
                onClick={() => setDietaryFilter(dietaryFilter === 'plant-forward' ? 'all' : 'plant-forward')}
                className={`px-2 py-1 rounded text-[11px] transition-colors ${
                  dietaryFilter === 'plant-forward'
                    ? 'bg-[#221c13] text-[#0a5cff] font-medium'
                    : 'text-[#8b92a5] hover:text-white'
                }`}
              >
                Plant-Forward
              </button>
            </div>

            {/* Quick Demo Table Action */}
            <button
              type="button"
              onClick={() => setBookingSimOpen(true)}
              className="px-3.5 py-1.5 rounded-lg bg-[#0a5cff] hover:bg-[#2672ff] text-white text-xs font-mono tracking-wider transition-all shadow-[0_0_12px_rgba(10,92,255,0.3)]"
            >
              {language === 'es' ? 'Simular Mesa ↗' : 'Simulate Table ↗'}
            </button>
          </div>
        </div>

        {/* Live Course List */}
        <div className="space-y-4">
          {visibleCourses.map((item, index) => {
            const isFaded =
              dietaryFilter === 'plant-forward' && !item.dietary.includes('plant-forward');

            return (
              <div
                key={index}
                className={`p-4 rounded-xl border border-[#1f1b14] bg-[#100e0a] hover:border-[#2f271c] transition-all flex flex-col md:flex-row md:items-start justify-between gap-4 ${
                  isFaded ? 'opacity-30' : 'opacity-100'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <span className="font-mono text-xs text-[#0a5cff] pt-0.5">
                    0{index + 1}
                  </span>
                  <div>
                    <h5 className="text-base font-semibold text-[#f0ebe3] font-sans">
                      {item.title[language]}
                    </h5>
                    <p className="text-xs text-[#8c8071] mt-0.5">
                      {item.notes[language]}
                    </p>
                  </div>
                </div>

                {pairingActive && (
                  <div className="md:text-right shrink-0 max-w-xs pl-8 md:pl-0 pt-1 md:pt-0 border-t md:border-t-0 border-[#1c1913]">
                    <span className="text-[10px] font-mono uppercase text-[#0a5cff] tracking-wider block">
                      // {language === 'es' ? 'Armonía sugerida' : 'Wine pairing'}
                    </span>
                    <span className="text-xs text-[#cbd4e6] font-mono">
                      {item.pairing[language]}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Demo Booking Modal */}
      {bookingSimOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
        >
          <div className="bg-[#14120e] border border-[#2d251a] rounded-2xl max-w-md w-full p-6 text-white space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-[#26211a]">
              <div className="flex items-center space-x-2 text-[#0a5cff] text-xs font-mono">
                <Info size={14} />
                <span>{language === 'es' ? 'DEMO DE RESERVA DE MESA' : 'TABLE BOOKING DEMO'}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setBookingSimOpen(false);
                  setBookedSuccess(false);
                }}
                className="text-[#8c7e6b] hover:text-white text-xs font-mono"
              >
                [ {language === 'es' ? 'CERRAR' : 'CLOSE'} ]
              </button>
            </div>

            {!bookedSuccess ? (
              <div className="space-y-4 text-xs">
                <h4 className="text-lg font-bold font-sans">
                  {language === 'es' ? 'Turno en KÔN Atelier (Simulación)' : 'Table request at KÔN Atelier (Simulation)'}
                </h4>

                <div className="space-y-2">
                  <label className="text-[#8c8071] block font-mono">
                    {language === 'es' ? 'Experiencia:' : 'Experience:'}
                  </label>
                  <div className="p-2.5 bg-[#0b0a08] rounded border border-[#26211a] font-mono text-white">
                    {courseCount} {language === 'es' ? 'Pasos con maridaje de autor' : 'Courses with artisanal pairing'}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[#8c8071] block font-mono">
                    {language === 'es' ? 'Zona deseada:' : 'Preferred seating:'}
                  </label>
                  <select className="w-full p-2 bg-[#0b0a08] border border-[#26211a] rounded text-white font-mono focus:border-[#0a5cff] outline-none">
                    <option>{language === 'es' ? 'The Open Hearth (Barra frente al fuego)' : 'The Open Hearth (Fire counter)'}</option>
                    <option>{language === 'es' ? 'The Greenhouse Alcove (Jardín botánico)' : 'The Greenhouse Alcove (Garden banquette)'}</option>
                    <option>{language === 'es' ? 'Private Vault (Cava privada)' : 'Private Vault (Wine cellar)'}</option>
                  </select>
                </div>

                <p className="text-[11px] text-[#695f51]">
                  {language === 'es'
                    ? 'Demostración de flujo para restaurantes de alta cocina sin depender de widgets externos rígidos.'
                    : 'Showcase flow for fine dining establishments free from rigid third-party iframe widgets.'}
                </p>

                <button
                  type="button"
                  onClick={() => setBookedSuccess(true)}
                  className="w-full py-2.5 rounded-lg bg-[#0a5cff] hover:bg-[#2672ff] text-white font-mono font-medium transition-all"
                >
                  {language === 'es' ? 'Confirmar simulación de mesa ↗' : 'Confirm table simulation ↗'}
                </button>
              </div>
            ) : (
              <div className="text-center py-6 space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#0a5cff]/20 text-[#0a5cff] flex items-center justify-center mx-auto">
                  <Check size={20} />
                </div>
                <h4 className="text-base font-bold text-white font-sans">
                  {language === 'es' ? 'Solicitud simulada correctamente' : 'Inquiry simulated successfully'}
                </h4>
                <p className="text-xs text-[#8c8071]">
                  {language === 'es'
                    ? 'Esta acción simula la reserva instantánea y la sincronización con el sistema de sala del restaurante.'
                    : 'Demonstrates immediate guest intake and front-of-house table coordination.'}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setBookingSimOpen(false);
                    setBookedSuccess(false);
                  }}
                  className="px-4 py-1.5 rounded bg-[#1f1b14] hover:bg-[#2a241c] text-xs font-mono text-white"
                >
                  {language === 'es' ? 'Finalizar prueba' : 'Finish test'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
