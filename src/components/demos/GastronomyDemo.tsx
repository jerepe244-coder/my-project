'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { KON_DISHES, KON_TABLE_ZONES, DishItem } from '@/data/gastronomy';
import { Wine, Check, ChevronRight } from 'lucide-react';

export const GastronomyDemo: React.FC = () => {
  const { language } = useLanguage();
  const [courseCount, setCourseCount] = useState<7 | 11>(7);
  const [pairingActive, setPairingActive] = useState(true);
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'pescatarian' | 'plant-forward'>('all');
  const [bookingSimOpen, setBookingSimOpen] = useState(false);
  const [bookedSuccess, setBookedSuccess] = useState(false);
  const [selectedZone, setSelectedZone] = useState<string>('hearth');

  // Filter 7 or 11 courses
  const visibleCourses: DishItem[] = courseCount === 7
    ? KON_DISHES.filter((d) => !['salt-beetroot', 'deep-prawn', 'sweetbreads-applewood'].includes(d.id))
    : KON_DISHES;

  const filtered = dietaryFilter === 'all'
    ? visibleCourses
    : visibleCourses.filter((d) => d.dietary.includes(dietaryFilter));

  const basePrice = courseCount === 7 ? 110 : 165;
  const winePrice = pairingActive ? (courseCount === 7 ? 55 : 80) : 0;
  const perPerson = basePrice + winePrice;

  return (
    <div className="rounded-none border border-white/10 bg-[#0C0B0A] overflow-hidden text-[#F4F1EA] font-swiss">
      {/* Top Demo Bar */}
      <div className="bg-[#121110] px-5 py-3 border-b border-white/10 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center space-x-2 text-white">
          <span className="w-1.5 h-1.5 bg-[#8C3B2B] inline-block" />
          <span className="font-semibold uppercase tracking-wider">
            KÔN ATELIER · {language === 'es' ? 'DEMOSTRACIÓN INTERACTIVA' : 'INTERACTIVE DEMO'}
          </span>
        </div>
        <span className="text-[#94A3B8] text-[11px] font-mono">
          {language === 'es' ? 'Menú vivo con maridaje dinámico' : 'Live menu with pairing toggle'}
        </span>
      </div>

      <div className="p-6 md:p-8 space-y-6">
        {/* Controls Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
          {/* 7 vs 11 Steps Switcher */}
          <div className="flex items-center space-x-3">
            <span className="text-xs font-mono text-[#94A3B8] uppercase">
              {language === 'es' ? 'Recorrido:' : 'Experience:'}
            </span>
            <div className="inline-flex rounded-none bg-[#050403] p-0.5 border border-white/10">
              <button
                type="button"
                onClick={() => setCourseCount(7)}
                className={`px-3.5 py-1.5 rounded-none text-xs font-mono transition-colors cursor-pointer ${
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
                className={`px-3.5 py-1.5 rounded-none text-xs font-mono transition-colors cursor-pointer ${
                  courseCount === 11
                    ? 'bg-[#8C3B2B] text-white font-medium'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                11 {language === 'es' ? 'Pasos ($165 USD)' : 'Courses ($165 USD)'}
              </button>
            </div>
          </div>

          {/* Wine Pairing Toggle */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setPairingActive(!pairingActive)}
              className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-none border text-xs font-mono transition-colors cursor-pointer ${
                pairingActive
                  ? 'bg-[#181614] border-[#8C3B2B] text-white'
                  : 'bg-[#050403] border-white/10 text-[#94A3B8]'
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

            <div className="px-3.5 py-1.5 rounded-none bg-[#050403] border border-white/10 font-mono text-xs flex items-center space-x-1.5">
              <span className="text-[#94A3B8]">{language === 'es' ? 'Total comensal:' : 'Guest rate:'}</span>
              <span className="font-bold text-white">${perPerson} USD</span>
            </div>
          </div>
        </div>

        {/* Dietary Filters as Text Line */}
        <div className="flex items-center space-x-2 text-xs font-mono text-[#94A3B8]">
          <span className="uppercase text-[10px] text-white/50">{language === 'es' ? 'Filtro:' : 'Filter:'}</span>
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
        </div>

        {/* Dish List in Continuous Horizontal Rows */}
        <div className="border-t border-b border-white/10 divide-y divide-white/10">
          {filtered.slice(0, 6).map((dish) => (
            <div key={dish.id} className="py-4 flex items-baseline justify-between gap-4">
              <div className="flex items-baseline space-x-4 max-w-xl">
                <span className="font-serif-editorial italic text-lg text-[#94A3B8] w-6 shrink-0">{dish.num}</span>
                <div>
                  <h4 className="text-sm font-medium text-white">{dish.title[language]}</h4>
                  <p className="text-xs text-[#94A3B8] font-sans mt-0.5">{dish.provenance[language]}</p>
                </div>
              </div>
              <span className="font-mono text-xs text-white shrink-0">${dish.price} USD</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
