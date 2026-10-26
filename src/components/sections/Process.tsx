'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import { processStages } from '@/data/process';
import { Check } from 'lucide-react';

export const Process: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].process;

  return (
    <section
      id="process"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 border-t border-zy-border-subtle"
      aria-label="Approach and Methodology"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16 sm:mb-20 max-w-3xl"
      >
        <span className="font-mono text-xs uppercase tracking-widest text-zy-blue">
          {t.label}
        </span>
        <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-zy-fg mt-2">
          {t.title}
        </h2>
        <p className="text-sm sm:text-base text-zy-muted font-sans mt-4 leading-relaxed">
          {t.subtitle}
        </p>
      </motion.div>

      {/* Vertical Editorial Timeline with progressive entry */}
      <div className="relative border-l border-zy-border ml-3 sm:ml-8 pl-5 sm:pl-12 space-y-12 sm:space-y-16">
        {processStages.map((stage, idx) => (
          <motion.div
            key={stage.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="relative group"
          >
            {/* Timeline Marker Dot */}
            <div className="absolute -left-[27px] sm:-left-[55px] top-2 w-3.5 h-3.5 rounded-full bg-zy-bg border-2 border-zy-border group-hover:border-zy-blue group-hover:bg-zy-blue transition-colors duration-200" />

            {/* Stage Content Card */}
            <div className="bg-zy-card border border-zy-border-card rounded-xl p-6 sm:p-8 hover:border-zy-border-strong transition-all duration-200 shadow-sm">
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
                <span className="font-mono text-[11px] text-zy-dim uppercase">
                  {t.stageLabel} {stage.number}
                </span>
              </div>

              {/* Stage Body */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
                {/* Objective & Work Done */}
                <div className="md:col-span-7 space-y-4">
                  <div>
                    <h4 className="font-mono text-xs text-zy-dim uppercase tracking-wider mb-1">
                      {t.objectiveLabel}
                    </h4>
                    <p className="text-sm font-sans font-medium text-zy-fg-soft">
                      {stage.objective[language]}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-mono text-xs text-zy-dim uppercase tracking-wider mb-1">
                      {language === 'es' ? 'Trabajo ejecutado' : 'Work performed'}
                    </h4>
                    <p className="text-xs sm:text-sm text-zy-muted font-sans leading-relaxed">
                      {stage.work[language]}
                    </p>
                  </div>
                </div>

                {/* Key Deliverables */}
                <div className="md:col-span-5 bg-zy-surface-alt p-4 sm:p-5 rounded-lg border border-zy-border space-y-3">
                  <h4 className="font-mono text-xs text-zy-blue uppercase tracking-wider">
                    // {t.deliverablesLabel}
                  </h4>
                  <ul className="space-y-2 text-xs text-zy-fg-secondary">
                    {stage.deliverables[language].map((deliv, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <Check size={13} className="text-zy-blue shrink-0 mt-0.5" />
                        <span>{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Note on Timelines */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-12 ml-3 sm:ml-8 pl-5 sm:pl-12 text-xs font-mono text-zy-dim"
      >
        {language === 'es'
          ? '* Los plazos de entrega y entregables específicos se acuerdan de acuerdo con la escala y complejidad técnica de cada proyecto.'
          : '* Exact delivery milestones and specific assets are scheduled according to individual project scale and engineering requirements.'}
      </motion.div>
    </section>
  );
};
