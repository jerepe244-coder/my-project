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
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 border-t border-[#161a22]"
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
        <span className="font-mono text-xs uppercase tracking-widest text-[#0a5cff]">
          {t.label}
        </span>
        <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-white mt-2">
          {t.title}
        </h2>
        <p className="text-sm sm:text-base text-[#8b92a5] font-sans mt-4 leading-relaxed">
          {t.subtitle}
        </p>
      </motion.div>

      {/* Vertical Editorial Timeline with progressive entry */}
      <div className="relative border-l border-[#1e232d] ml-3 sm:ml-8 pl-5 sm:pl-12 space-y-12 sm:space-y-16">
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
            <div className="absolute -left-[27px] sm:-left-[55px] top-2 w-3.5 h-3.5 rounded-full bg-[#0a0c10] border-2 border-[#1e232d] group-hover:border-[#0a5cff] group-hover:bg-[#0a5cff] transition-colors duration-200" />

            {/* Stage Content Card */}
            <div className="bg-[#0c0e12] border border-[#181d26] rounded-xl p-6 sm:p-8 hover:border-[#2b3547] transition-all duration-200">
              {/* Stage Header */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#161a22] pb-4">
                <div className="flex items-baseline space-x-3">
                  <span className="font-mono text-xs text-[#0a5cff] font-semibold">
                    // {stage.number}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-sans font-bold text-white">
                    {stage.name[language]}
                  </h3>
                </div>
                <span className="font-mono text-[11px] text-[#515768] uppercase">
                  {t.stageLabel} {stage.number}
                </span>
              </div>

              {/* Stage Body */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
                {/* Objective & Work Done */}
                <div className="md:col-span-7 space-y-4">
                  <div>
                    <h4 className="font-mono text-xs text-[#515768] uppercase tracking-wider mb-1">
                      {t.objectiveLabel}
                    </h4>
                    <p className="text-sm font-sans font-medium text-[#f4f5f8]">
                      {stage.objective[language]}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-mono text-xs text-[#515768] uppercase tracking-wider mb-1">
                      {language === 'es' ? 'Trabajo ejecutado' : 'Work performed'}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#8b92a5] font-sans leading-relaxed">
                      {stage.work[language]}
                    </p>
                  </div>
                </div>

                {/* Key Deliverables */}
                <div className="md:col-span-5 bg-[#0e1117] p-4 sm:p-5 rounded-lg border border-[#1c222e] space-y-3">
                  <h4 className="font-mono text-xs text-[#0a5cff] uppercase tracking-wider">
                    // {t.deliverablesLabel}
                  </h4>
                  <ul className="space-y-2 text-xs text-[#cbd4e6]">
                    {stage.deliverables[language].map((deliv, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <Check size={13} className="text-[#0a5cff] shrink-0 mt-0.5" />
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
        className="mt-12 ml-3 sm:ml-8 pl-5 sm:pl-12 text-xs font-mono text-[#515768]"
      >
        {language === 'es'
          ? '* Los plazos de entrega y entregables específicos se acuerdan de acuerdo con la escala y complejidad técnica de cada proyecto.'
          : '* Exact delivery milestones and specific assets are scheduled according to individual project scale and engineering requirements.'}
      </motion.div>
    </section>
  );
};