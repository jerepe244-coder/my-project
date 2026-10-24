'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import { services } from '@/data/services';
import { ArrowUpRight } from 'lucide-react';

export const Services: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].services;
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  return (
    <section
      id="services"
      className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 border-t border-[#161a22]"
      aria-label="Capabilities & Services"
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

      {/* Editorial Numbered Index (Not a generic card grid!) */}
      <div className="divide-y divide-[#1e232d] border-t border-b border-[#1e232d]">
        {services.map((service) => {
          const isHovered = hoveredService === service.id;

          return (
            <div
              key={service.id}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
              className={`py-10 transition-colors duration-300 group ${
                isHovered ? 'bg-[#0f1217]/50' : 'bg-transparent'
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start px-2 sm:px-4">
                {/* Number */}
                <div className="md:col-span-2 font-mono text-sm sm:text-base text-[#515768] group-hover:text-[#0a5cff] transition-colors">
                  // {service.number}
                </div>

                {/* Title */}
                <div className="md:col-span-4">
                  <h3 className="text-2xl sm:text-3xl font-sans font-bold text-white group-hover:translate-x-1 transition-transform">
                    {service.title[language]}
                  </h3>
                </div>

                {/* Description & Tags */}
                <div className="md:col-span-5 space-y-4">
                  <p className="text-sm text-[#8b92a5] leading-relaxed font-sans">
                    {service.description[language]}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {service.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="font-mono text-[11px] text-[#cbd4e6] bg-[#12161f] border border-[#1e2430] px-2.5 py-1 rounded"
                      >
                        {tag[language]}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Link Arrow */}
                <div className="md:col-span-1 flex justify-end">
                  <Link
                    href="/#contact"
                    className="p-2.5 rounded-full bg-[#12151b] border border-[#1e232d] text-[#8b92a5] group-hover:text-white group-hover:bg-[#0a5cff] group-hover:border-[#0a5cff] transition-all shadow-sm"
                    aria-label={`Inquire about ${service.title[language]}`}
                  >
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Summary Bar */}
      <div className="mt-12 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#515768] gap-4">
        <span>// SCOPE DEFINED BEFORE IMPLEMENTATION</span>
        <Link
          href="/#contact"
          className="inline-flex items-center space-x-1.5 text-[#0a5cff] hover:text-[#2672ff] font-semibold"
        >
          <span>{t.cta}</span>
        </Link>
      </div>
    </section>
  );
};
