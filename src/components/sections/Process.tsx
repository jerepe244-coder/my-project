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

  const runInPhrases: Record<string, { es: string; en: string }> = {
    discovery: {
      es: 'En la primera semana:',
      en: 'On the first week:',
    },
    'art-direction': {
      es: 'En el sprint de arte:',
      en: 'In the design sprint:',
    },
    development: {
      es: 'Durante el desarrollo:',
      en: 'Through engineering:',
    },
    'testing-demos': {
      es: 'En la fase interactiva:',
      en: 'In interactive testing:',
    },
    launch: {
      es: 'Al pase a producción:',
      en: 'At production handover:',
    },
  };

  const handleStageSelect = (id: string) => {
    setActiveStageId(id);
    const el = document.getElementById(`process-stage-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'nearest' });
    }
  };

  // Falling diagonal layout on 12-column grid
  const getStageLayoutClass = (idx: number) => {
    switch (idx % 5) {
      case 0:
        return 'lg:col-span-8 lg:col-start-1';
      case 1:
        return 'lg:col-span-8 lg:col-start-5';
      case 2:
        return 'lg:col-span-8 lg:col-start-2';
      case 3:
        return 'lg:col-span-8 lg:col-start-4';
      case 4:
        return 'lg:col-span-8 lg:col-start-1';
      default:
        return 'lg:col-span-8 lg:col-start-1';
    }
  };

  return (
    <section
      id="process"
      className="py-20 sm:py-28 lg:py-36 px-5 sm:px-8 lg:px-12 max-w-[1720px] mx-auto scroll-mt-20 border-t border-zy-border-subtle"
      aria-label="Approach and Methodology — Falling Diagonal Stages"
    >
      {/* Section Header */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 sm:mb-24 gap-6 border-b border-zy-border-subtle pb-6"
      >
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-zy-blue font-semibold block mb-2">
            // {t.label}
          </span>
          <h2 className="text-4xl sm:text-6xl font-sans font-medium tracking-tight text-zy-fg">
            {language === 'es' ? 'PROCESO' : 'PROCESS'}
          </h2>
          <p className="text-sm sm:text-base text-zy-muted font-sans mt-2 max-w-xl">
            {t.subtitle}
          </p>
        </div>

        <div className="font-mono text-xs text-zy-dim uppercase tracking-wider self-start lg:self-end">
          {language === 'es'
            ? '// COLABORACIÓN DIRECTA · SIN INTERMEDIARIOS'
            : '// DIRECT COLLABORATION · ZERO MIDDLEMEN'}
        </div>
      </motion.div>

      {/* Stage Fast Switcher Bar */}
      <div
        className="mb-14 sm:mb-20 flex sm:grid sm:grid-cols-5 gap-2 p-1.5 bg-zy-surface border border-zy-border rounded-lg overflow-x-auto"
        role="navigation"
        aria-label="Process stage index"
      >
        {processStages.map((stage) => {
          const isSelected = activeStageId === stage.id;
          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => handleStageSelect(stage.id)}
              className={`p-2.5 sm:p-3 text-left transition-colors border shrink-0 sm:shrink min-w-[140px] sm:min-w-0 ${
                isSelected
                  ? 'bg-zy-card border-zy-blue/60 text-zy-fg shadow-xs'
                  : 'bg-transparent border-transparent hover:bg-zy-surface text-zy-muted hover:text-zy-fg'
              }`}
            >
              <span className={`block font-mono text-[10px] uppercase tracking-wider ${
                isSelected ? 'text-zy-blue font-semibold' : 'text-zy-dim'
              }`}>
                {t.stageLabel} {stage.number}
              </span>
              <span className="block font-sans text-xs sm:text-sm font-medium truncate mt-0.5">
                {stage.name[language]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Stages down a falling diagonal grid (Taste: how-it-works-photographs-down-a-diagonal) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 sm:gap-y-24 items-start">
        {processStages.map((stage, idx) => {
          const isSelected = activeStageId === stage.id;
          const colClass = getStageLayoutClass(idx);
          const runIn = runInPhrases[stage.id]?.[language] || '';

          return (
            <motion.div
              id={`process-stage-${stage.id}`}
              key={stage.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setActiveStageId(stage.id)}
              className={`${colClass} group scroll-mt-28`}
            >
              <div
                className={`p-6 sm:p-8 border bg-zy-card transition-colors ${
                  isSelected ? 'border-zy-border-strong' : 'border-zy-border-subtle hover:border-zy-border'
                }`}
              >
                {/* Stage Header */}
                <div className="flex items-baseline justify-between border-b border-zy-border-subtle pb-4 mb-5">
                  <div className="flex items-baseline space-x-3">
                    <span className="font-mono text-sm text-zy-blue font-semibold">
                      // {stage.number}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-sans font-medium text-zy-fg">
                      {stage.name[language]}
                    </h3>
                  </div>
                  <span className="font-mono text-[11px] text-zy-dim uppercase">
                    STAGE 0{idx + 1}/05
                  </span>
                </div>

                {/* Stage Body with bold run-in phrase */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-7 space-y-3">
                    <p className="text-base font-sans text-zy-fg leading-relaxed">
                      <strong className="text-zy-blue font-mono font-medium block text-xs uppercase tracking-wider mb-1">
                        {runIn}
                      </strong>
                      {stage.objective[language]}
                    </p>

                    <p className="text-sm text-zy-muted font-sans leading-relaxed">
                      {stage.work[language]}
                    </p>
                  </div>

                  {/* Deliverables module */}
                  <div className="md:col-span-5 bg-zy-surface p-4 border border-zy-border-subtle space-y-2.5">
                    <span className="font-mono text-xs text-zy-blue uppercase tracking-wider font-semibold block">
                      // {t.deliverablesLabel}
                    </span>
                    <ul className="space-y-1.5 text-xs text-zy-fg-secondary font-sans">
                      {stage.deliverables[language].map((deliv, i) => (
                        <li key={i} className="flex items-start space-x-2 leading-relaxed">
                          <Check size={12} className="text-zy-blue shrink-0 mt-0.5" />
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

      {/* Bottom CTA Row */}
      <div className="mt-16 pt-6 border-t border-zy-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs text-zy-dim">
        <p className="max-w-xl">
          {language === 'es'
            ? '* Cada hito y entregable se calendariza de mutuo acuerdo según la escala y complejidad del proyecto.'
            : '* Milestones and assets are scheduled based on project scale and architectural requirements.'}
        </p>

        <Link
          href="/#contact"
          className="inline-flex items-center space-x-1.5 text-zy-fg hover:text-zy-blue underline underline-offset-4 decoration-zy-blue transition-colors self-start sm:self-center"
        >
          <span>
            {language === 'es' ? 'Iniciar Etapa 01 — Discovery' : 'Begin Stage 01 — Discovery'}
          </span>
          <ArrowUpRight size={13} className="text-zy-blue" />
        </Link>
      </div>
    </section>
  );
};
