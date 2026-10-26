'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import { projects } from '@/data/projects';
import { ProjectCategory } from '@/types';
import {
  ArrowUpRight,
  Sparkles,
  Layers,
  Compass,
  Check,
  ChevronDown,
} from 'lucide-react';

const DEMO_ANCHOR_BY_SLUG: Record<string, string> = {
  'aura-sanctuary': 'aura-booking',
  'kon-atelier': 'kon-menu',
  'vectra-architects': 'monolith-study',
  'soma-formulations': 'soma-catalog',
};

const CAPABILITY_HIGHLIGHTS_BY_SLUG: Record<
  string,
  { es: string[]; en: string[] }
> = {
  'aura-sanctuary': {
    es: ['Inspector de 3 suites', 'Cotizador de estadía en vivo', 'Arquitectura bilingüe'],
    en: ['3-Suite interactive inspector', 'Live stay rate estimator', 'Bilingual architecture'],
  },
  'kon-atelier': {
    es: ['Menú 7 vs. 11 pasos', 'Filtro de alérgenos en vivo', 'Simulador de reserva de mesa'],
    en: ['7 vs. 11 course switcher', 'Real-time allergen filter', 'Table reservation simulator'],
  },
  'vectra-architects': {
    es: ['Simulador solar de sombras', 'Planimetría & Axonometría 3D', 'Matriz tectónica Passivhaus'],
    en: ['Solar shadow massing', 'Section AA & 3D Axonometric', 'Passivhaus tectonic matrix'],
  },
  'soma-formulations': {
    es: ['Selector 30ml/50ml & Recarga', 'Laboratorio de activos', 'Carrito & checkout reactivo'],
    en: ['30ml/50ml & Refill selector', 'Active formulation lab', 'Reactive cart & checkout'],
  },
};

export const Portfolio: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].portfolio;
  const tCase = translations[language].caseStudy;
  const prefersReducedMotion = useReducedMotion();

  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [activeImageBySlug, setActiveImageBySlug] = useState<Record<string, number>>({});
  const [expandedSpecSlug, setExpandedSpecSlug] = useState<string | null>(null);

  const categories: { id: ProjectCategory; label: string; count: number }[] = [
    { id: 'all', label: t.filterAll, count: projects.length },
    {
      id: 'hospitality',
      label: t.filterHospitality,
      count: projects.filter((p) => p.category === 'hospitality').length,
    },
    {
      id: 'gastronomy',
      label: t.filterGastronomy,
      count: projects.filter((p) => p.category === 'gastronomy').length,
    },
    {
      id: 'architecture',
      label: t.filterArchitecture,
      count: projects.filter((p) => p.category === 'architecture').length,
    },
    {
      id: 'ecommerce',
      label: t.filterEcommerce,
      count: projects.filter((p) => p.category === 'ecommerce').length,
    },
  ];

  const filteredProjects = projects.filter((project) => {
    if (activeCategory === 'all') return true;
    return project.category === activeCategory;
  });

  const handleSelectGalleryThumb = (
    e: React.MouseEvent,
    slug: string,
    index: number
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageBySlug((prev) => ({ ...prev, [slug]: index }));
  };

  const toggleSpec = (slug: string) => {
    setExpandedSpecSlug((prev) => (prev === slug ? null : slug));
  };

  return (
    <section
      id="work"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 border-t border-zy-border-subtle"
      aria-label="Selected Work & Case Studies"
    >
      {/* Section Header */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 gap-6 border-b border-zy-border-subtle pb-8"
      >
        <div className="max-w-2xl">
          <div className="flex items-center space-x-3">
            <span className="font-mono text-xs uppercase tracking-widest text-zy-blue font-semibold">
              {t.label}
            </span>
            <span className="text-zy-border-strong font-mono text-xs">//</span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-zy-dim">
              {language === 'es' ? '04 EXPERIENCIAS INTERACTIVAS' : '04 INTERACTIVE EXPERIENCES'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-zy-fg mt-2.5">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-zy-muted font-sans mt-3 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Category Filters: Architectural refined tab bar */}
        <div
          role="tablist"
          aria-label="Filter portfolio projects"
          className="flex flex-wrap items-center gap-1.5 p-1.5 bg-zy-control border border-zy-border rounded-xl self-start lg:self-end"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center space-x-1.5 px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-zy-blue ${
                  isActive
                    ? 'bg-zy-control-active text-zy-fg font-semibold border border-zy-border shadow-sm'
                    : 'text-zy-muted hover:text-zy-fg border border-transparent'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] ${
                    isActive ? 'text-zy-blue' : 'text-zy-dim'
                  }`}
                >
                  [{cat.count}]
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Projects Grid */}
      <motion.div layout className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => {
            const isFullWidth =
              activeCategory === 'all' ? idx === 0 || idx === 3 : true;
            const globalIndex = projects.findIndex((p) => p.slug === project.slug);
            const projectNumber = `0${globalIndex + 1}`;
            const activeImgIdx = activeImageBySlug[project.slug] ?? 0;
            const currentCover =
              project.galleryImages[activeImgIdx] || project.coverImage;
            const demoAnchor = DEMO_ANCHOR_BY_SLUG[project.slug] || '';
            const demoHref = demoAnchor
              ? `/case-study/${project.slug}#${demoAnchor}`
              : `/case-study/${project.slug}`;
            const capabilities =
              CAPABILITY_HIGHLIGHTS_BY_SLUG[project.slug]?.[language] || [];
            const isSpecOpen = expandedSpecSlug === project.slug;

            return (
              <motion.article
                layout
                key={project.slug}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`${
                  isFullWidth ? 'lg:col-span-12' : 'lg:col-span-6'
                } group relative rounded-2xl bg-zy-card border border-zy-border-card hover:border-zy-border-strong transition-colors duration-200 overflow-hidden flex flex-col justify-between shadow-sm`}
              >
                <div
                  className={
                    isFullWidth
                      ? 'grid grid-cols-1 lg:grid-cols-12'
                      : 'flex flex-col flex-grow'
                  }
                >
                  {/* Visual Cover Asset Column */}
                  <div
                    className={`${
                      isFullWidth ? 'lg:col-span-7' : 'w-full'
                    } relative bg-[#07080a] overflow-hidden flex flex-col justify-between`}
                  >
                    <Link
                      href={`/case-study/${project.slug}`}
                      data-cursor="explore"
                      data-cursor-text={language === 'es' ? 'ABRIR EXPERIENCIA ↗' : 'OPEN EXPERIENCE ↗'}
                      className={`relative w-full ${
                        isFullWidth
                          ? 'aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[420px]'
                          : 'aspect-[16/10]'
                      } overflow-hidden block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-zy-blue`}
                      aria-label={`${project.title} - ${project.categoryLabel[language]}`}
                    >
                      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.025]">
                        <Image
                          src={currentCover}
                          alt={`${project.title} — ${project.categoryLabel[language]}`}
                          fill
                          className="object-cover object-center"
                          sizes={
                            isFullWidth
                              ? '(max-width: 1024px) 100vw, 65vw'
                              : '(max-width: 1024px) 100vw, 50vw'
                          }
                          priority={idx === 0}
                        />
                      </div>

                      {/* Subtle vignette overlay for high-contrast badges */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/30 opacity-85" />

                      {/* Top Badges on Image */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                        <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-[#07090c]/85 backdrop-blur-md border border-white/15 text-[10px] font-mono tracking-wider uppercase text-[#e2e8f0]">
                          <span className="w-1.5 h-1.5 rounded-full bg-zy-blue" />
                          <span>{t.conceptBadge}</span>
                        </span>

                        <span className="px-2.5 py-1 rounded-md bg-[#0c0f16]/90 backdrop-blur-md border border-white/15 text-[#cbd4e6] text-[10px] font-mono tracking-wider uppercase">
                          {projectNumber} // 04
                        </span>
                      </div>

                      {/* Bottom Image Caption & Frame Switcher Indicator */}
                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 pointer-events-none">
                        <div className="font-mono text-[10px] text-white/80 uppercase tracking-widest bg-black/55 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
                          {project.title} · {language === 'es' ? 'VISTA' : 'FRAME'} 0{activeImgIdx + 1}/0{project.galleryImages.length}
                        </div>
                      </div>
                    </Link>

                    {/* Interactive Frame Selector Strip (allows inspecting multiple project frames directly from the Home) */}
                    {project.galleryImages.length > 1 && (
                      <div
                        className="absolute bottom-4 right-4 z-10 flex items-center space-x-1.5 bg-[#07090c]/85 backdrop-blur-md p-1 rounded-lg border border-white/15"
                        role="group"
                        aria-label={
                          language === 'es'
                            ? `Vistas de ${project.title}`
                            : `${project.title} preview frames`
                        }
                      >
                        {project.galleryImages.slice(0, 3).map((imgUrl, thumbIdx) => {
                          const isSelected = activeImgIdx === thumbIdx;
                          return (
                            <button
                              key={imgUrl + thumbIdx}
                              type="button"
                              onClick={(e) =>
                                handleSelectGalleryThumb(e, project.slug, thumbIdx)
                              }
                              aria-label={`${project.title} frame ${thumbIdx + 1}`}
                              aria-pressed={isSelected}
                              className={`relative w-8 h-6 rounded overflow-hidden border transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zy-blue ${
                                isSelected
                                  ? 'border-zy-blue ring-1 ring-zy-blue scale-105'
                                  : 'border-white/20 opacity-65 hover:opacity-100'
                              }`}
                            >
                              <Image
                                src={imgUrl}
                                alt=""
                                fill
                                sizes="48px"
                                className="object-cover"
                              />
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Content Card Body */}
                  <div
                    className={`${
                      isFullWidth ? 'lg:col-span-5' : 'w-full'
                    } p-6 sm:p-8 flex flex-col justify-between flex-grow`}
                  >
                    <div className="space-y-4">
                      {/* Discipline & Year */}
                      <div className="flex items-center justify-between font-mono text-xs border-b border-zy-border-subtle pb-3">
                        <span className="text-zy-blue font-semibold">
                          {project.categoryLabel[language]}
                        </span>
                        <span className="text-zy-dim">{project.year}</span>
                      </div>

                      {/* Project Title & Tagline */}
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-sans font-bold text-zy-fg group-hover:text-zy-blue transition-colors tracking-tight">
                          <Link
                            href={`/case-study/${project.slug}`}
                            className="focus-visible:outline-none focus-visible:underline decoration-zy-blue"
                          >
                            {project.title}
                          </Link>
                        </h3>

                        <p className="mt-2.5 text-sm sm:text-base text-zy-fg-secondary font-sans leading-relaxed font-medium">
                          {project.tagline[language]}
                        </p>
                      </div>

                      {/* Strategic Context Summary */}
                      <p className="text-xs sm:text-sm text-zy-muted font-sans leading-relaxed">
                        {project.designGoal[language]}
                      </p>

                      {/* Interactive Capabilities Pills */}
                      {capabilities.length > 0 && (
                        <div className="pt-1">
                          <span className="block font-mono text-[10px] uppercase tracking-wider text-zy-dim mb-2">
                            {language === 'es'
                              ? '// CAPACIDADES DE LA DEMO EN VIVO'
                              : '// LIVE DEMO CAPABILITIES'}
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {capabilities.map((cap) => (
                              <span
                                key={cap}
                                className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-zy-surface border border-zy-border text-[11px] font-mono text-zy-fg-secondary"
                              >
                                <span className="w-1 h-1 rounded-full bg-zy-blue" />
                                <span>{cap}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Card Bottom Actions: Functional Links to Full Case Study, Interactive Simulator & Spec Toggle */}
                    <div className="mt-7 pt-5 border-t border-zy-border-card space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        {/* Primary Link: Full Live Experience */}
                        <Link
                          href={`/case-study/${project.slug}`}
                          className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-lg bg-zy-blue hover:bg-zy-blue-hover text-white text-xs font-mono font-medium tracking-wider transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zy-blue"
                        >
                          <span>{t.viewProject}</span>
                        </Link>

                        {/* Secondary Functional Link: Jump straight to Interactive Simulator */}
                        <Link
                          href={demoHref}
                          className="inline-flex items-center space-x-1.5 px-3.5 py-2.5 rounded-lg bg-zy-surface hover:bg-zy-surface-hover border border-zy-border hover:border-zy-blue/50 text-xs font-mono text-zy-fg-secondary hover:text-zy-blue transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zy-blue"
                        >
                          <Sparkles size={13} className="text-zy-blue shrink-0" />
                          <span>{t.tryDemo}</span>
                          <ArrowUpRight size={13} />
                        </Link>
                      </div>

                      {/* Expandable Architectural Case Study Summary Toggle */}
                      <div className="pt-1 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => toggleSpec(project.slug)}
                          aria-expanded={isSpecOpen}
                          aria-controls={`spec-${project.slug}`}
                          className="inline-flex items-center space-x-1.5 text-[11px] font-mono text-zy-muted hover:text-zy-fg transition-colors py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zy-blue rounded"
                        >
                          <span>
                            {isSpecOpen
                              ? language === 'es'
                                ? 'Ocultar ficha técnica del caso'
                                : 'Hide case study specifications'
                              : language === 'es'
                              ? 'Inspeccionar arquitectura y decisiones del caso'
                              : 'Inspect case study architecture & decisions'}
                          </span>
                          <ChevronDown
                            size={13}
                            className={`transition-transform duration-200 text-zy-blue ${
                              isSpecOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        <span className="font-mono text-[10px] text-zy-dim uppercase">
                          ID // {project.slug.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expandable Case Study Dossier Panel */}
                <AnimatePresence initial={false}>
                  {isSpecOpen && (
                    <motion.div
                      id={`spec-${project.slug}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden border-t border-zy-border bg-zy-bg-elevated"
                    >
                      <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                        {/* Column 1: Client Context & Visual Decisions */}
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2 font-mono text-zy-blue uppercase tracking-wider">
                            <Compass size={13} />
                            <span>{tCase.visualDecisionsTitle}</span>
                          </div>
                          <p className="text-zy-muted font-sans leading-relaxed">
                            {project.clientContext[language]}
                          </p>
                          <ul className="space-y-1.5 pt-1 text-zy-fg-secondary font-sans">
                            {project.visualDecisions.map((dec, i) => (
                              <li key={i} className="flex items-start space-x-2">
                                <span className="text-zy-blue font-mono">·</span>
                                <span>{dec[language]}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Column 2: Interactions & Features */}
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2 font-mono text-zy-blue uppercase tracking-wider">
                            <Layers size={13} />
                            <span>{tCase.interactionsTitle}</span>
                          </div>
                          <ul className="space-y-2 text-zy-fg-secondary font-sans">
                            {project.interactions.map((inter, i) => (
                              <li
                                key={i}
                                className="p-2.5 rounded-lg bg-zy-card border border-zy-border-subtle leading-relaxed"
                              >
                                {inter[language]}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Column 3: Commercial Value & Direct Action */}
                        <div className="flex flex-col justify-between space-y-4 p-4 rounded-xl bg-zy-benefits-bg border border-zy-benefits-border">
                          <div className="space-y-2.5">
                            <span className="font-mono text-[11px] text-zy-blue uppercase tracking-wider block">
                              // {tCase.benefitsTitle}
                            </span>
                            {project.potentialBenefits.map((ben, i) => (
                              <div
                                key={i}
                                className="flex items-start space-x-2 text-zy-fg-secondary font-sans leading-relaxed"
                              >
                                <Check size={14} className="text-zy-blue shrink-0 mt-0.5" />
                                <span>{ben[language]}</span>
                              </div>
                            ))}
                          </div>

                          <div className="pt-3 border-t border-zy-border flex items-center justify-between gap-2">
                            <Link
                              href={`/case-study/${project.slug}`}
                              className="font-mono text-[11px] text-zy-blue hover:underline font-semibold"
                            >
                              {t.viewProject}
                            </Link>
                            <Link
                              href="/#contact"
                              className="font-mono text-[11px] text-zy-fg hover:text-zy-blue transition-colors"
                            >
                              {tCase.ctaButton}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
