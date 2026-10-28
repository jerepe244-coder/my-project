'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { KON_DISHES, KON_TABLE_ZONES, DishItem } from '@/data/gastronomy';
import { Sparkles, Wine, Check, Info } from 'lucide-react';

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

  return (
    <div className="rounded-2xl border border-zy-warm-border bg-zy-warm-bg overflow-hidden text-zy-warm-fg font-sans shadow-sm">
      {/* Top Demo Bar */}
      <div className="bg-zy-warm-bar px-5 py-3 border-b border-zy-warm-border flex items-center justify-between text-xs font-mono">
        <div className="flex items-center space-x-2 text-zy-blue">
          <Sparkles size={14} />
          <span className="font-semibold uppercase tracking-wider">
            {language === 'es' ? 'DEMO INTERACTIVA' : 'INTERACTIVE DEMO'}
          </span>
          <span className="text-zy-warm-dim">| KÔN ATELIER</span>
        </div>
        <span className="inline-flex items-center px-2 py-0.5 rounded bg-zy-warm-badge text-zy-warm-muted text-[10px]">
          {language === 'es' ? 'Menú vivo con maridaje dinámico' : 'Live menu with pairing toggle'}
        </span>
      </div>

      <div className="p-6 md:p-8 space-y-6">
        {/* Controls Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zy-warm-border-subtle">
          {/* 7 vs 11 Steps Switcher */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono text-zy-warm-muted uppercase">
              {language === 'es' ? 'Recorrido:' : 'Experience:'}
            </span>
            <div className="inline-flex rounded-lg bg-zy-warm-bar p-1 border border-zy-warm-border">
              <button
                type="button"
                onClick={() => setCourseCount(7)}
                className={`px-3 py-1 rounded text-xs font-mono transition-all ${
                  courseCount === 7
                    ? 'bg-zy-blue text-white font-semibold'
                    : 'text-zy-warm-muted hover:text-zy-warm-fg'
                }`}
              >
                7 {language === 'es' ? 'Pasos ($110 USD)' : 'Courses ($110 USD)'}
              </button>
              <button
                type="button"
                onClick={() => setCourseCount(11)}
                className={`px-3 py-1 rounded text-xs font-mono transition-all ${
                  courseCount === 11
                    ? 'bg-zy-blue text-white font-semibold'
                    : 'text-zy-warm-muted hover:text-zy-warm-fg'
                }`}
              >
                11 {language === 'es' ? 'Pasos · Gran Recorrido ($165 USD)' : 'Courses · Full Journey ($165 USD)'}
              </button>
            </div>
          </div>

          {/* Wine Pairing Toggle */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setPairingActive(!pairingActive)}
              className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all ${
                pairingActive
                  ? 'bg-zy-warm-active border-zy-blue text-zy-warm-fg'
                  : 'bg-zy-warm-bar border-zy-warm-border text-zy-warm-dim'
              }`}
            >
              <Wine size={14} className={pairingActive ? 'text-zy-blue' : 'text-zy-warm-dim'} />
              <span>
                {language === 'es'
                  ? pairingActive
                    ? `Maridaje incluido (+${courseCount === 7 ? '$55' : '$80'})`
                    : 'Sin maridaje'
                  : pairingActive
                  ? `Pairing shown (+${courseCount === 7 ? '$55' : '$80'})`
                  : 'Pairing hidden'}
              </span>
            </button>

            {/* Dietary Toggle */}
            <div className="flex items-center space-x-1 bg-zy-warm-bar p-0.5 rounded-lg border border-zy-warm-border text-xs font-mono">
              <button
                type="button"
                onClick={() => setDietaryFilter('all')}
                className={`px-2 py-1 rounded text-[11px] transition-colors ${
                  dietaryFilter === 'all'
                    ? 'bg-zy-warm-active text-zy-warm-fg font-medium shadow-sm'
                    : 'text-zy-warm-muted hover:text-zy-warm-fg'
                }`}
              >
                {language === 'es' ? 'Todo' : 'All'}
              </button>
              <button
                type="button"
                onClick={() => setDietaryFilter(dietaryFilter === 'plant-forward' ? 'all' : 'plant-forward')}
                className={`px-2 py-1 rounded text-[11px] transition-colors ${
                  dietaryFilter === 'plant-forward'
                    ? 'bg-zy-warm-active text-zy-blue font-medium shadow-sm'
                    : 'text-zy-warm-muted hover:text-zy-warm-fg'
                }`}
              >
                Plant-Forward
              </button>
              <button
                type="button"
                onClick={() => setDietaryFilter(dietaryFilter === 'pescatarian' ? 'all' : 'pescatarian')}
                className={`px-2 py-1 rounded text-[11px] transition-colors ${
                  dietaryFilter === 'pescatarian'
                    ? 'bg-zy-warm-active text-zy-blue font-medium shadow-sm'
                    : 'text-zy-warm-muted hover:text-zy-warm-fg'
                }`}
              >
                Pescatarian
              </button>
            </div>

            {/* Quick Demo Table Action */}
            <button
              type="button"
              onClick={() => setBookingSimOpen(true)}
              className="px-3.5 py-1.5 rounded-lg bg-zy-blue hover:bg-zy-blue-hover text-white text-xs font-mono tracking-wider transition-all shadow-[0_0_12px_rgba(10,92,255,0.3)]"
            >
              {language === 'es' ? 'Simular Mesa ↗' : 'Simulate Table ↗'}
            </button>
          </div>
        </div>

        {/* Live Course List */}
        <div className="space-y-4">
          {visibleCourses.map((item, index) => {
            const isFaded =
              dietaryFilter !== 'all' && !item.dietary.includes(dietaryFilter);

            return (
              <div
                key={item.id}
                className={`p-4 rounded-xl border border-zy-warm-border bg-zy-warm-card hover:border-zy-warm-border-hover transition-all flex flex-col md:flex-row md:items-start justify-between gap-4 ${
                  isFaded ? 'opacity-30' : 'opacity-100'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <span className="font-mono text-xs text-zy-blue pt-0.5 font-bold">
                    {item.num || `0${index + 1}`}
                  </span>
                  <div>
                    <h4 className="text-base font-semibold text-zy-warm-fg font-sans">
                      {item.title[language]}
                    </h4>
                    <p className="text-xs text-zy-warm-muted mt-0.5">
                      {item.desc[language]}
                    </p>
                    <span className="text-[10px] font-mono text-zy-warm-dim block mt-1">
                      {item.provenance[language]}
                    </span>
                  </div>
                </div>

                {pairingActive && (
                  <div className="md:text-right shrink-0 max-w-xs pl-8 md:pl-0 pt-1 md:pt-0 border-t md:border-t-0 border-zy-warm-border-subtle">
                    <span className="text-[10px] font-mono uppercase text-[#945610] dark:text-[#d49b57] tracking-wider block">
                      // {language === 'es' ? 'Armonía sugerida' : 'Wine pairing'}
                    </span>
                    <span className="text-xs text-zy-warm-fg font-mono">
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
          style={{ backgroundColor: 'var(--zy-modal-backdrop)' }}
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4"
        >
          <div className="bg-zy-warm-bar border border-zy-warm-border rounded-2xl max-w-md w-full p-6 text-zy-warm-fg space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-zy-warm-border">
              <div className="flex items-center space-x-2 text-zy-blue text-xs font-mono">
                <Info size={14} />
                <span>{language === 'es' ? 'DEMO DE RESERVA DE MESA' : 'TABLE BOOKING DEMO'}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setBookingSimOpen(false);
                  setBookedSuccess(false);
                }}
                className="text-zy-warm-muted hover:text-zy-warm-fg text-xs font-mono"
              >
                [ {language === 'es' ? 'CERRAR' : 'CLOSE'} ]
              </button>
            </div>

            {!bookedSuccess ? (
              <div className="space-y-4 text-xs">
                <h4 className="text-lg font-bold font-sans text-zy-warm-fg">
                  {language === 'es' ? 'Turno en KÔN Atelier (Simulación)' : 'Table request at KÔN Atelier (Simulation)'}
                </h4>

                <div className="space-y-2">
                  <label className="text-zy-warm-muted block font-mono">
                    {language === 'es' ? 'Experiencia:' : 'Experience:'}
                  </label>
                  <div className="p-2.5 bg-zy-warm-card rounded-lg border border-zy-warm-border font-mono text-zy-warm-fg">
                    {courseCount} {language === 'es' ? 'Pasos con maridaje de autor' : 'Courses with artisanal pairing'}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-zy-warm-muted block font-mono">
                    {language === 'es' ? 'Zona deseada:' : 'Preferred seating:'}
                  </label>
                  <select
                    value={selectedZone}
                    onChange={(e) => setSelectedZone(e.target.value)}
                    className="w-full p-2.5 bg-zy-warm-card border border-zy-warm-border rounded-lg text-zy-warm-fg font-mono focus:border-zy-blue outline-none"
                  >
                    {KON_TABLE_ZONES.map((z) => (
                      <option key={z.id} value={z.id}>
                        {z.name[language]}
                      </option>
                    ))}
                  </select>
                </div>

                <p className="text-[11px] text-zy-warm-dim leading-relaxed">
                  {language === 'es'
                    ? 'Demostración de flujo para restaurantes de alta cocina sin depender de widgets externos rígidos.'
                    : 'Showcase flow for fine dining establishments free from rigid third-party iframe widgets.'}
                </p>

                <button
                  type="button"
                  onClick={() => setBookedSuccess(true)}
                  className="w-full py-2.5 rounded-lg bg-zy-blue hover:bg-zy-blue-hover text-white font-mono font-medium transition-all"
                >
                  {language === 'es' ? 'Confirmar simulación de mesa ↗' : 'Confirm table simulation ↗'}
                </button>
              </div>
            ) : (
              <div className="text-center py-6 space-y-3">
                <div className="w-10 h-10 rounded-full bg-zy-blue/20 text-zy-blue flex items-center justify-center mx-auto">
                  <Check size={20} />
                </div>
                <h4 className="text-base font-bold text-zy-warm-fg font-sans">
                  {language === 'es' ? 'Solicitud simulada correctamente' : 'Inquiry simulated successfully'}
                </h4>
                <p className="text-xs text-zy-warm-muted">
                  {language === 'es'
                    ? 'Esta acción simula la reserva instantánea y la coordinación del servicio de sala para el restaurante.'
                    : 'Demonstrates immediate guest intake and front-of-house table coordination.'}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setBookingSimOpen(false);
                    setBookedSuccess(false);
                  }}
                  className="px-4 py-1.5 rounded-lg bg-zy-warm-badge hover:bg-zy-warm-border text-xs font-mono text-zy-warm-fg transition-colors"
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
