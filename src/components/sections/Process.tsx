'use client';

import React from 'react';
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
      className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 border-t border-[#161a22]"
      aria-label="Approach and Methodology"
    >
      {/* Header */}
      <div className="mb-20 max-w-3xl">
        <span className="font-mono text-xs uppercase tracking-widest text-[#0a5cff]">
          {t.label}
        </span>
        <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-white mt-2">
          {t.title}
        </h2>
        <p className="text-sm sm:text-base text-[#8b92a5] font-sans mt-4 leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* Vertical Editorial Timeline */}
      <div className="relative border-l border-[#1e232d] ml-4 sm:ml-8 pl-6 sm:pl-12 space-y-16">
        {processStages.map((stage) => (
          <div key={stage.id} className="relative group">
            {/* Timeline Marker Dot */}
            <div className="absolute -left-[31px] sm:-left-[55px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#101216] border-2 border-[#1e232d] group-hover:border-[#0a5cff] group-hover:bg-[#0a5cff] transition-all" />

            {/* Stage Content */}
            <div className="bg-[#0e1014] border border-[#1a1f29] rounded-2xl p-6 sm:p-8 hover:border-[#2b3547] transition-all">
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
                <div className="md:col-span-5 bg-[#12151d] p-4 sm:p-5 rounded-xl border border-[#1d2330] space-y-3">
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
          </div>
        ))}
      </div>

      {/* Note on Timelines */}
      <div className="mt-12 ml-4 sm:ml-8 pl-6 sm:pl-12 text-xs font-mono text-[#515768]">
        {language === 'es'
          ? '* Los plazos de entrega y entregables específicos se acuerdan de acuerdo con la escala y complejidad técnica de cada proyecto.'
          : '* Exact delivery milestones and specific assets are scheduled according to individual project scale and engineering requirements.'}
      </div>
    </section>
  );
};
