'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import { projects } from '@/data/projects';
import { ProjectCategory } from '@/types';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export const Portfolio: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].portfolio;
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');

  const categories: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: t.filterAll },
    { id: 'hospitality', label: t.filterHospitality },
    { id: 'gastronomy', label: t.filterGastronomy },
    { id: 'architecture', label: t.filterArchitecture },
  ];

  const filteredProjects = projects.filter((project) => {
    if (activeCategory === 'all') return true;
    return project.category === activeCategory;
  });

  return (
    <section
      id="work"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20"
      aria-label="Selected Work & Case Studies"
    >
      {/* Section Header with scroll reveal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6 border-b border-[#161a22] pb-8"
      >
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#0a5cff]">
            {t.label}
          </span>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-white mt-2">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-[#8b92a5] font-sans max-w-xl mt-3">
            {t.subtitle}
          </p>
        </div>

        {/* Category Filters: Architectural refined buttons */}
        <div
          role="tablist"
          aria-label="Filter portfolio projects"
          className="flex flex-wrap items-center gap-1.5 p-1 bg-[#0c0e12] border border-[#1e232d] rounded-lg self-start md:self-end"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 sm:px-3.5 py-1.5 rounded-md text-xs font-mono transition-colors duration-150 outline-none focus-visible:ring-1 focus-visible:ring-[#0a5cff] ${
                activeCategory === cat.id
                  ? 'bg-[#181f2c] text-white font-semibold border border-[#2b3547]'
                  : 'text-[#8b92a5] hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Projects Grid */}
      <motion.div layout className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <AnimatePresence>
          {filteredProjects.map((project, idx) => {
            const isFeatured = project.featured && activeCategory === 'all' && idx === 0;

            return (
              <motion.article
                layout
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`${
                  isFeatured ? 'lg:col-span-12' : 'lg:col-span-6'
                } group relative rounded-xl bg-[#0c0e12] border border-[#181d26] hover:border-[#2b3548] transition-colors duration-200 overflow-hidden flex flex-col justify-between`}
                data-cursor="explore"
                data-cursor-text={language === 'es' ? 'VER CASO ↗' : 'EXPLORE ↗'}
              >
                {/* Visual Cover Asset */}
                <Link
                  href={`/case-study/${project.slug}`}
                  className="relative w-full aspect-[16/10] overflow-hidden bg-[#07080a] block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a5cff]"
                  aria-label={`${project.title} - ${project.categoryLabel[language]}`}
                >
                  <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.02]">
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 80vw"
                      priority={isFeatured}
                    />
                  </div>

                  {/* Gradient overlay for contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e12] via-transparent to-transparent opacity-80" />

                  {/* Badges on Image */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-[#07090c]/85 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-wider uppercase text-[#cbd4e6]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0a5cff]" />
                      <span>{t.conceptBadge}</span>
                    </span>

                    {project.featured && (
                      <span className="px-2.5 py-1 rounded-md bg-[#0a5cff] text-white text-[10px] font-mono tracking-wider uppercase font-semibold">
                        {t.featuredTag}
                      </span>
                    )}
                  </div>
                </Link>

                {/* Content Card Body */}
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-center justify-between font-mono text-xs text-[#8b92a5] mb-2">
                      <span>{project.categoryLabel[language]}</span>
                      <span>{project.year}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-sans font-bold text-white group-hover:text-[#cbd4e6] transition-colors">
                      <Link
                        href={`/case-study/${project.slug}`}
                        className="focus-visible:outline-none focus-visible:underline decoration-[#0a5cff]"
                      >
                        {project.title}
                      </Link>
                    </h3>

                    <p className="mt-3 text-sm text-[#8b92a5] font-sans leading-relaxed">
                      {project.tagline[language]}
                    </p>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="mt-8 pt-5 border-t border-[#181d26] flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-xs font-mono text-[#0a5cff]">
                      <Sparkles size={13} />
                      <span>{t.tryDemo}</span>
                    </div>

                    <Link
                      href={`/case-study/${project.slug}`}
                      className="inline-flex items-center space-x-1 text-xs font-mono text-white hover:text-[#0a5cff] transition-colors group-hover:translate-x-0.5"
                    >
                      <span>{t.viewProject}</span>
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};