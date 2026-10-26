'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import { processStages } from '@/data/process';
import { Check, ArrowUpRight } from 'lucide-react';

export const Process: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].process;
  const prefersReducedMotion = useReducedMotion();
  const [activeStageId, setActiveStageId] = useState<string>(processStages[0].id);

  const handleStageSelect = (id: string) => {
    setActiveStageId(id);
    const el = document.getElementById(`process-stage-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'nearest' });
    }
  };

  return (
    <section
      id="process"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 border-t border-zy-border-subtle"
      aria-label="Approach and Methodology"
    >
      {/* Header */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-14 gap-6"
      >
        <div className="max-w-3xl">
          <div className="flex items-center space-x-3">
            <span className="font-mono text-xs uppercase tracking-widest text-zy-blue font-semibold">
              {t.label}
            </span>
            <span className="text-zy-border-strong font-mono text-xs">//</span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-zy-dim">
              {language === 'es' ? '05 FASES ESTRUCTURADAS' : '05 STRUCTURED PHASES'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-zy-fg mt-2.5">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-zy-muted font-sans mt-3.5 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <div className="font-mono text-xs text-zy-dim uppercase tracking-wider self-start lg:self-end">
          {language === 'es'
            ? '// COMUNICACIÓN DIRECTA · SIN INTERMEDIARIOS'
            : '// DIRECT COLLABORATION · ZERO MIDDLEMEN'}
        </div>
      </motion.div>

      {/* Architectural 5-Phase Overview Matrix */}
      <div
        className="mb-12 grid grid-cols-2 sm:grid-cols-5 gap-2 p-2 rounded-xl bg-zy-bg-elevated border border-zy-border-card"
        role="navigation"
        aria-label={language === 'es' ? 'Índice de etapas del proceso' : 'Process stage index'}
      >
        {processStages.map((stage) => {
          const isSelected = activeStageId === stage.id;
          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => handleStageSelect(stage.id)}
              className={`p-3 rounded-lg text-left transition-all border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zy-blue ${
                isSelected
                  ? 'bg-zy-card border-zy-blue/50 shadow-sm'
                  : 'bg-transparent border-transparent hover:bg-zy-surface/60'
              }`}
            >
              <span
                className={`block font-mono text-[10px] uppercase tracking-wider ${
                  isSelected ? 'text-zy-blue font-semibold' : 'text-zy-dim'
                }`}
              >
                {t.stageLabel} {stage.number}
              </span>
              <span className="block font-sans text-xs sm:text-sm font-semibold text-zy-fg mt-1 truncate">
                {stage.name[language]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Vertical Editorial Timeline with progressive entry */}
      <div className="relative border-l border-zy-border ml-3 sm:ml-8 pl-5 sm:pl-12 space-y-8 sm:space-y-10">
        {processStages.map((stage, idx) => {
          const isSelected = activeStageId === stage.id;

          return (
            <motion.div
              id={`process-stage-${stage.id}`}
              key={stage.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setActiveStageId(stage.id)}
              className="relative group scroll-mt-28"
            >
              {/* Timeline Marker Dot */}
              <div
                className={`absolute -left-[27px] sm:-left-[55px] top-6 w-3.5 h-3.5 rounded-full border-2 transition-colors duration-200 ${
                  isSelected
                    ? 'bg-zy-blue border-zy-blue'
                    : 'bg-zy-bg border-zy-border group-hover:border-zy-blue group-hover:bg-zy-blue'
                }`}
              />

              {/* Stage Content Card */}
              <div
                className={`bg-zy-card border rounded-xl p-6 sm:p-8 transition-all duration-200 shadow-sm ${
                  isSelected
                    ? 'border-zy-border-strong'
                    : 'border-zy-border-card hover:border-zy-border-strong'
                }`}
              >
                {/* Stage Header */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-zy-border-subtle pb-4">
                  <div className="flex items-baseline space-x-3">
                    <span className="font-mono text-xs text-zy-blue font-semibold">
                      // {stage.number}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-sans font-bold text-zy-fg">
                      {stage.name[language]}
                    </h3>
                  </div>
                  <span className="font-mono text-[11px] text-zy-dim uppercase tracking-wider">
                    {t.stageLabel} {stage.number} // 05
                  </span>
                </div>

                {/* Stage Body */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
                  {/* Objective & Work Done */}
                  <div className="md:col-span-7 space-y-4">
                    <div>
                      <h4 className="font-mono text-[11px] text-zy-dim uppercase tracking-wider mb-1">
                        {t.objectiveLabel}
                      </h4>
                      <p className="text-sm sm:text-base font-sans font-medium text-zy-fg-soft leading-relaxed">
                        {stage.objective[language]}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-mono text-[11px] text-zy-dim uppercase tracking-wider mb-1">
                        {language === 'es' ? 'Trabajo ejecutado' : 'Work performed'}
                      </h4>
                      <p className="text-xs sm:text-sm text-zy-muted font-sans leading-relaxed">
                        {stage.work[language]}
                      </p>
                    </div>
                  </div>

                  {/* Key Deliverables */}
                  <div className="md:col-span-5 bg-zy-surface-alt p-4 sm:p-5 rounded-xl border border-zy-border space-y-3">
                    <h4 className="font-mono text-xs text-zy-blue uppercase tracking-wider font-semibold">
                      // {t.deliverablesLabel}
                    </h4>
                    <ul className="space-y-2.5 text-xs text-zy-fg-secondary font-sans">
                      {stage.deliverables[language].map((deliv, i) => (
                        <li key={i} className="flex items-start space-x-2.5 leading-relaxed">
                          <Check size={14} className="text-zy-blue shrink-0 mt-0.5" />
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Note & Stage 01 Kickoff CTA */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-12 ml-3 sm:ml-8 pl-5 sm:pl-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-zy-border-subtle"
      >
        <p className="text-xs font-mono text-zy-dim max-w-2xl">
          {language === 'es'
            ? '* Los plazos de entrega y entregables específicos se acuerdan de acuerdo con la escala y complejidad técnica de cada proyecto.'
            : '* Exact delivery milestones and specific assets are scheduled according to individual project scale and engineering requirements.'}
        </p>

        <Link
          href="/#contact"
          className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-lg bg-zy-surface hover:bg-zy-surface-hover border border-zy-border hover:border-zy-blue/50 text-xs font-mono text-zy-fg hover:text-zy-blue transition-colors shrink-0 self-start sm:self-center"
        >
          <span>
            {language === 'es'
              ? 'Iniciar Etapa 01 — Discovery'
              : 'Begin Stage 01 — Discovery'}
          </span>
          <ArrowUpRight size={14} className="text-zy-blue" />
        </Link>
      </motion.div>
    </section>
  );
};
