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

  // Asymmetrical placements corresponding to Taste blueprint "Loose scatter with pauses"
  // Repeat rhythm on 12-column grid:
  // 0: cols 1–7 (left hug, 16:10 / 3:2)
  // 1: cols 7–12 (right hug, 4:5 / 3:2, overlapping height)
  // 2: cols 2–9 (inset 16:9)
  // 3: cols 5–12 (right hug 16:10)
  const getScatterColClass = (index: number) => {
    switch (index % 4) {
      case 0:
        return 'lg:col-span-8 lg:col-start-1';
      case 1:
        return 'lg:col-span-6 lg:col-start-7';
      case 2:
        return 'lg:col-span-8 lg:col-start-2';
      case 3:
        return 'lg:col-span-8 lg:col-start-5';
      default:
        return 'lg:col-span-12';
    }
  };

  const getScatterAspectClass = (index: number) => {
    switch (index % 4) {
      case 0:
        return 'aspect-[16/10] sm:aspect-[3/2]';
      case 1:
        return 'aspect-[4/5] sm:aspect-[3/2] lg:aspect-[4/5]';
      case 2:
        return 'aspect-[16/9] sm:aspect-[16/9]';
      case 3:
        return 'aspect-[16/10] sm:aspect-[16/10]';
      default:
        return 'aspect-[16/10]';
    }
  };

  return (
    <section
      id="work"
      className="py-20 sm:py-28 lg:py-36 px-5 sm:px-8 lg:px-12 max-w-[1720px] mx-auto scroll-mt-20 border-t border-zy-border-subtle"
      aria-label="Selected Work & Case Studies — Loose Scatter with Pauses"
    >
      {/* Editorial Section Header: One Word Title + Category Filters */}
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
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-medium tracking-tight text-zy-fg">
            {language === 'es' ? 'PROYECTOS' : 'WORK'}
          </h2>
          <p className="text-sm sm:text-base text-zy-muted font-sans mt-2 max-w-xl">
            {t.subtitle}
          </p>
        </div>

        {/* Minimalist Filter Bar */}
        <div
          role="tablist"
          aria-label="Filter portfolio projects"
          className="flex flex-wrap items-center gap-1.5 p-1 bg-zy-surface border border-zy-border rounded-lg self-start lg:self-end"
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
                className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
                  isActive
                    ? 'bg-zy-card text-zy-fg font-semibold border border-zy-border-strong shadow-xs'
                    : 'text-zy-muted hover:text-zy-fg border border-transparent'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] ${isActive ? 'text-zy-blue' : 'text-zy-dim'}`}>
                  [{cat.count}]
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Loose Scatter Canvas with Generous Pauses */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-24 sm:gap-y-36 lg:gap-y-44 gap-x-8 items-start relative">
        {filteredProjects.map((project, idx) => {
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

          const colClass = getScatterColClass(globalIndex);
          const aspectClass = getScatterAspectClass(globalIndex);

          return (
            <React.Fragment key={project.slug}>
              {/* Optional Editorial Remark 1 inserted between project 0 and 1 */}
              {globalIndex === 1 && activeCategory === 'all' && (
                <div className="hidden lg:block lg:col-span-5 lg:col-start-1 my-auto self-center pl-4 pr-12 select-none">
                  <span className="font-mono text-xs text-zy-blue uppercase tracking-widest block mb-3">
                    // PHILOSOPHY &amp; CRAFT
                  </span>
                  <p className="text-xl sm:text-2xl font-sans text-zy-fg font-normal leading-snug">
                    {language === 'es'
                      ? 'Cada proyecto se concibe como un sistema digital vivo: dirección de arte editorial, ingeniería frontend y criterio comercial de fundador a fundador.'
                      : 'Each project is built as a living digital system: editorial art direction, modern frontend engineering, and direct founder-to-founder clarity.'}
                  </p>
                </div>
              )}

              {/* Optional Editorial Remark 2 inserted between project 2 and 3 */}
              {globalIndex === 3 && activeCategory === 'all' && (
                <div className="hidden lg:block lg:col-span-4 lg:col-start-1 my-auto self-center pl-4 pr-8 select-none">
                  <span className="font-mono text-xs text-zy-blue uppercase tracking-widest block mb-3">
                    // ENGINEERING RIGOR
                  </span>
                  <p className="text-lg sm:text-xl font-sans text-zy-muted font-normal leading-relaxed">
                    {language === 'es'
                      ? 'Sin plantillas prefabricadas. Cero concesiones en tipografía, fluidez táctil y rendimiento en producción.'
                      : 'Zero off-the-shelf templates. Zero compromises on typography, responsive tactile polish, and real production performance.'}
                  </p>
                </div>
              )}

              {/* Project Article */}
              <motion.article
                layout
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`${colClass} group flex flex-col`}
              >
                {/* 1. Above Image Top-Left: Project Name & Discipline in Soft Ink at 13px */}
                <div className="flex items-center justify-between pb-3 text-xs font-mono text-zy-dim uppercase tracking-wider">
                  <div className="flex items-center space-x-2.5">
                    <span className="text-zy-blue font-semibold">{projectNumber} //</span>
                    <span className="text-zy-fg-secondary font-medium tracking-widest">
                      {project.title}
                    </span>
                    <span className="text-zy-border-strong">·</span>
                    <span className="text-zy-muted">{project.categoryLabel[language]}</span>
                  </div>
                  <span className="text-zy-dim font-mono text-[11px]">{project.year}</span>
                </div>

                {/* 2. Photograph Frame: Square corners, high-res webp, frame switcher strip */}
                <div className="relative bg-[#07080a] border border-zy-border-subtle group-hover:border-zy-border-strong transition-colors duration-300 overflow-hidden">
                  <Link
                    href={`/case-study/${project.slug}`}
                    className={`relative w-full ${aspectClass} overflow-hidden block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zy-blue`}
                    aria-label={`${project.title} — ${project.categoryLabel[language]}`}
                  >
                    <Image
                      src={currentCover}
                      alt={`${project.title} — ${project.categoryLabel[language]}`}
                      fill
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                      sizes="(max-width: 1024px) 100vw, 70vw"
                      priority={globalIndex === 0}
                    />

                    {/* Subtle architectural vignette overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-80" />

                    {/* Frame indicator badge */}
                    <div className="absolute top-3 left-3 flex items-center space-x-2 pointer-events-none">
                      <span className="px-2 py-0.5 rounded-sm bg-black/75 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-wider uppercase text-white/90">
                        {t.conceptBadge}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 pointer-events-none">
                      <span className="font-mono text-[10px] text-white/80 uppercase tracking-widest bg-black/65 backdrop-blur-md px-2 py-0.5 rounded-sm border border-white/10">
                        {language === 'es' ? 'VISTA' : 'FRAME'} 0{activeImgIdx + 1}/0{project.galleryImages.length}
                      </span>
                    </div>
                  </Link>

                  {/* Frame preview thumbnails */}
                  {project.galleryImages.length > 1 && (
                    <div
                      className="absolute bottom-3 right-3 z-10 flex items-center space-x-1.5 bg-black/80 backdrop-blur-md p-1 border border-white/15"
                      role="group"
                      aria-label={`${project.title} frames`}
                    >
                      {project.galleryImages.slice(0, 3).map((imgUrl, thumbIdx) => {
                        const isSelected = activeImgIdx === thumbIdx;
                        return (
                          <button
                            key={imgUrl + thumbIdx}
                            type="button"
                            onClick={(e) => handleSelectGalleryThumb(e, project.slug, thumbIdx)}
                            aria-label={`${project.title} frame ${thumbIdx + 1}`}
                            aria-pressed={isSelected}
                            className={`relative w-8 h-6 overflow-hidden border transition-all ${
                              isSelected
                                ? 'border-zy-blue ring-1 ring-zy-blue'
                                : 'border-white/20 opacity-60 hover:opacity-100'
                            }`}
                          >
                            <Image src={imgUrl} alt="" fill sizes="48px" className="object-cover" />
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* 3. Beneath Image Bottom-Left: One-line Description in Full Ink + Actions */}
                <div className="pt-4 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <p className="text-base sm:text-lg lg:text-xl font-sans text-zy-fg font-medium leading-snug">
                      {project.tagline[language]}
                    </p>
                    <span className="text-xs font-mono text-zy-dim uppercase shrink-0">
                      ID // {project.slug}
                    </span>
                  </div>

                  <p className="text-sm text-zy-muted font-sans leading-relaxed max-w-2xl">
                    {project.designGoal[language]}
                  </p>

                  {/* Live capability pills */}
                  {capabilities.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {capabilities.map((cap) => (
                        <span
                          key={cap}
                          className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-sm bg-zy-surface border border-zy-border text-[11px] font-mono text-zy-fg-secondary"
                        >
                          <span className="w-1 h-1 rounded-full bg-zy-blue" />
                          <span>{cap}</span>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action row with functional links to case study, interactive simulator anchor & spec inspector */}
                  <div className="pt-3 border-t border-zy-border-subtle flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center space-x-4">
                      {/* Case Study Full Experience Link */}
                      <Link
                        href={`/case-study/${project.slug}`}
                        className="inline-flex items-center space-x-1.5 text-xs font-mono uppercase tracking-wider text-zy-fg hover:text-zy-blue underline underline-offset-4 decoration-zy-blue transition-colors font-medium"
                      >
                        <span>{t.viewProject}</span>
                        <ArrowUpRight size={13} className="text-zy-blue" />
                      </Link>

                      {/* Interactive Simulator Direct Anchor Link */}
                      <Link
                        href={demoHref}
                        className="inline-flex items-center space-x-1 text-xs font-mono uppercase tracking-wider text-zy-muted hover:text-zy-blue transition-colors"
                      >
                        <Sparkles size={12} className="text-zy-blue" />
                        <span>{t.tryDemo}</span>
                      </Link>
                    </div>

                    {/* Expandable Case Study Specification Dossier Toggle */}
                    <button
                      type="button"
                      onClick={() => toggleSpec(project.slug)}
                      aria-expanded={isSpecOpen}
                      aria-controls={`spec-${project.slug}`}
                      className="inline-flex items-center space-x-1.5 text-xs font-mono text-zy-dim hover:text-zy-fg transition-colors"
                    >
                      <span>
                        {isSpecOpen
                          ? language === 'es'
                            ? 'Cerrar ficha'
                            : 'Close specs'
                          : language === 'es'
                          ? 'Inspeccionar ficha técnica'
                          : 'Inspect specifications'}
                      </span>
                      <ChevronDown
                        size={12}
                        className={`text-zy-blue transition-transform duration-200 ${
                          isSpecOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Expandable Technical Dossier */}
                  <AnimatePresence initial={false}>
                    {isSpecOpen && (
                      <motion.div
                        id={`spec-${project.slug}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden border border-zy-border-subtle bg-zy-card mt-3 p-5 sm:p-6"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                          {/* Col 1: Visual Decisions */}
                          <div className="space-y-2.5">
                            <div className="flex items-center space-x-2 font-mono text-zy-blue uppercase tracking-wider">
                              <Compass size={13} />
                              <span>{tCase.visualDecisionsTitle}</span>
                            </div>
                            <p className="text-zy-muted font-sans leading-relaxed">
                              {project.clientContext[language]}
                            </p>
                            <ul className="space-y-1 pt-1 text-zy-fg-secondary font-sans">
                              {project.visualDecisions.map((dec, i) => (
                                <li key={i} className="flex items-start space-x-2">
                                  <span className="text-zy-blue font-mono">·</span>
                                  <span>{dec[language]}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Col 2: Interactions */}
                          <div className="space-y-2.5">
                            <div className="flex items-center space-x-2 font-mono text-zy-blue uppercase tracking-wider">
                              <Layers size={13} />
                              <span>{tCase.interactionsTitle}</span>
                            </div>
                            <ul className="space-y-2 text-zy-fg-secondary font-sans">
                              {project.interactions.map((inter, i) => (
                                <li
                                  key={i}
                                  className="p-2.5 bg-zy-surface border border-zy-border-subtle leading-relaxed"
                                >
                                  {inter[language]}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Col 3: Potential Commercial Benefits */}
                          <div className="space-y-2.5 bg-zy-benefits-bg border border-zy-benefits-border p-4 flex flex-col justify-between">
                            <div className="space-y-2">
                              <span className="font-mono text-[11px] text-zy-blue uppercase tracking-wider block">
                                // {tCase.benefitsTitle}
                              </span>
                              {project.potentialBenefits.map((ben, i) => (
                                <div key={i} className="flex items-start space-x-2 text-zy-fg-secondary">
                                  <Check size={13} className="text-zy-blue shrink-0 mt-0.5" />
                                  <span>{ben[language]}</span>
                                </div>
                              ))}
                            </div>

                            <div className="pt-3 border-t border-zy-border flex items-center justify-between">
                              <Link
                                href={`/case-study/${project.slug}`}
                                className="font-mono text-[11px] text-zy-blue hover:underline font-semibold"
                              >
                                {t.viewProject} ↗
                              </Link>
                              <Link
                                href="/#contact"
                                className="font-mono text-[11px] text-zy-muted hover:text-zy-fg"
                              >
                                {tCase.ctaButton}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.article>
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
};
