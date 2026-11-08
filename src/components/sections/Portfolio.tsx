'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import { projects } from '@/data/projects';
import { ProjectCategory } from '@/types';
import { Magnetic } from '@/components/ui/Magnetic';
import { HospitalityDemo, AURA_SUITES } from '@/components/demos/HospitalityDemo';
import { GastronomyDemo } from '@/components/demos/GastronomyDemo';
import { ArchitectureDemo } from '@/components/demos/ArchitectureDemo';
import { EcommerceDemo } from '@/components/demos/EcommerceDemo';
import {
  ArrowUpRight,
  Sparkles,
  Layers,
  Compass,
  Check,
  ChevronDown,
  Sun,
  Wine,
  ShoppingBag,
  Calendar,
  X,
  Plus,
  Minus,
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
  const [activeDemoModalSlug, setActiveDemoModalSlug] = useState<string | null>(null);

  // Interactive Micro-Widget States for Home Live Previews
  // 01. AURA Sanctuary Micro-Estimator
  const [auraSuiteIdx, setAuraSuiteIdx] = useState<number>(0);
  const [auraNights, setAuraNights] = useState<number>(3);

  // 02. KÔN Atelier Micro-Configurator
  const [konCourses, setKonCourses] = useState<7 | 11>(7);
  const [konPairing, setKonPairing] = useState<boolean>(true);

  // 03. MONOLITH Studio Solar Massing Micro-Controller
  const [solarAngle, setSolarAngle] = useState<number>(62);
  const [solarPreset, setSolarPreset] = useState<'dawn' | 'zenith' | 'dusk'>('zenith');

  // 04. SŌMA Formulations Variant Micro-Selector
  const [somaSize, setSomaSize] = useState<'30ml' | '50ml'>('30ml');
  const [somaVessel, setSomaVessel] = useState<'glass' | 'refill'>('glass');

  // Lock body scroll and handle Escape when In-Situ Demo Modal is open
  useEffect(() => {
    if (!activeDemoModalSlug) {
      document.body.style.overflow = '';
      return;
    }
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDemoModalSlug(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeDemoModalSlug]);

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

  const handleSolarPreset = (preset: 'dawn' | 'zenith' | 'dusk') => {
    setSolarPreset(preset);
    if (preset === 'dawn') {
      setSolarAngle(22);
      setActiveImageBySlug((prev) => ({ ...prev, 'vectra-architects': 0 }));
    } else if (preset === 'zenith') {
      setSolarAngle(68);
      setActiveImageBySlug((prev) => ({ ...prev, 'vectra-architects': 1 }));
    } else {
      setSolarAngle(31);
      setActiveImageBySlug((prev) => ({ ...prev, 'vectra-architects': 2 }));
    }
  };

  const renderEmbeddedMicroWidget = (slug: string) => {
    if (slug === 'aura-sanctuary') {
      const currentSuite = AURA_SUITES[auraSuiteIdx] || AURA_SUITES[0];
      const estimatedTotal = currentSuite.baseRate * auraNights;

      return (
        <div
          data-ui="true"
          className="p-4 bg-zy-surface/90 border border-neutral-800/80 dark:border-neutral-800 space-y-3"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="inline-flex items-center space-x-2">
              <span className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-sm bg-emerald-500/15 border border-emerald-600/40 dark:border-emerald-500/40 text-[10px] font-mono font-semibold text-emerald-800 dark:text-emerald-300 tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse" />
                <span>[LIVE DEMO]</span>
              </span>
              <span className="font-mono text-[11px] text-zy-muted uppercase tracking-wider">
                {language === 'es' ? 'Cotizador de Estadía' : 'Live Stay Estimator'}
              </span>
            </div>
            <span className="font-mono text-sm font-semibold text-zy-fg">
              ${estimatedTotal.toLocaleString()} USD
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {AURA_SUITES.map((suite, i) => {
              const selected = auraSuiteIdx === i;
              return (
                <button
                  key={suite.id}
                  type="button"
                  onClick={() => {
                    setAuraSuiteIdx(i);
                    setActiveImageBySlug((prev) => ({ ...prev, 'aura-sanctuary': i }));
                  }}
                  className={`min-h-[44px] px-2.5 py-1.5 text-left border transition-all font-mono text-[11px] ${
                    selected
                      ? 'bg-zy-card border-zy-blue text-zy-fg font-semibold'
                      : 'bg-zy-bg/60 border-zy-border text-zy-muted hover:text-zy-fg'
                  }`}
                >
                  <span className="block truncate">{suite.name[language]}</span>
                  <span className="block text-[10px] text-zy-blue">${suite.baseRate}/n</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-1 text-xs font-mono">
            <span className="text-zy-muted flex items-center space-x-1.5">
              <Calendar size={12} className="text-zy-blue" />
              <span>
                {auraNights} {language === 'es' ? (auraNights === 1 ? 'noche' : 'noches') : auraNights === 1 ? 'night' : 'nights'} · {currentSuite.area}
              </span>
            </span>
            <div className="inline-flex items-center space-x-1">
              <button
                type="button"
                aria-label={language === 'es' ? 'Reducir noches' : 'Decrease nights'}
                onClick={() => setAuraNights((n) => Math.max(1, n - 1))}
                className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center bg-zy-card border border-zy-border hover:border-zy-blue text-zy-fg transition-colors active:scale-[0.96]"
              >
                <Minus size={13} />
              </button>
              <button
                type="button"
                aria-label={language === 'es' ? 'Aumentar noches' : 'Increase nights'}
                onClick={() => setAuraNights((n) => Math.min(10, n + 1))}
                className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center bg-zy-card border border-zy-border hover:border-zy-blue text-zy-fg transition-colors active:scale-[0.96]"
              >
                <Plus size={13} />
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (slug === 'kon-atelier') {
      const baseMenu = konCourses === 7 ? 110 : 165;
      const pairingCost = konPairing ? (konCourses === 7 ? 55 : 80) : 0;
      const totalPerGuest = baseMenu + pairingCost;

      return (
        <div
          data-ui="true"
          className="p-4 bg-zy-surface/90 border border-neutral-800/80 dark:border-neutral-800 space-y-3"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="inline-flex items-center space-x-2">
              <span className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-sm bg-emerald-500/15 border border-emerald-600/40 dark:border-emerald-500/40 text-[10px] font-mono font-semibold text-emerald-800 dark:text-emerald-300 tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse" />
                <span>[LIVE DEMO]</span>
              </span>
              <span className="font-mono text-[11px] text-zy-muted uppercase tracking-wider">
                {language === 'es' ? 'Simulador de Degustación' : 'Tasting Configurator'}
              </span>
            </div>
            <span className="font-mono text-sm font-semibold text-zy-fg">
              ${totalPerGuest} USD / {language === 'es' ? 'comensal' : 'guest'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 font-mono text-xs">
            <button
              type="button"
              onClick={() => {
                setKonCourses(7);
                setActiveImageBySlug((prev) => ({ ...prev, 'kon-atelier': 0 }));
              }}
              className={`min-h-[44px] px-3 py-2 border text-left transition-all ${
                konCourses === 7
                  ? 'bg-zy-card border-zy-blue text-zy-fg font-semibold'
                  : 'bg-zy-bg/60 border-zy-border text-zy-muted hover:text-zy-fg'
              }`}
            >
              <span className="block">7 {language === 'es' ? 'Pasos' : 'Courses'}</span>
              <span className="block text-[10px] text-zy-blue">$110 USD</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setKonCourses(11);
                setActiveImageBySlug((prev) => ({ ...prev, 'kon-atelier': 2 }));
              }}
              className={`min-h-[44px] px-3 py-2 border text-left transition-all ${
                konCourses === 11
                  ? 'bg-zy-card border-zy-blue text-zy-fg font-semibold'
                  : 'bg-zy-bg/60 border-zy-border text-zy-muted hover:text-zy-fg'
              }`}
            >
              <span className="block">11 {language === 'es' ? 'Pasos' : 'Courses'}</span>
              <span className="block text-[10px] text-zy-blue">$165 USD</span>
            </button>

            <button
              type="button"
              aria-pressed={konPairing}
              onClick={() => setKonPairing((p) => !p)}
              className={`min-h-[44px] px-3 py-2 border text-left transition-all flex items-center justify-between ${
                konPairing
                  ? 'bg-zy-card border-zy-blue text-zy-fg font-semibold'
                  : 'bg-zy-bg/60 border-zy-border text-zy-muted hover:text-zy-fg'
              }`}
            >
              <div>
                <span className="block">{language === 'es' ? 'Maridaje' : 'Wine Pairing'}</span>
                <span className="block text-[10px] text-zy-blue">
                  +${konCourses === 7 ? 55 : 80} USD
                </span>
              </div>
              <Wine size={14} className={konPairing ? 'text-zy-blue' : 'text-zy-muted'} />
            </button>
          </div>
        </div>
      );
    }

    if (slug === 'vectra-architects') {
      const shadowOffset = Math.round(((90 - solarAngle) / 90) * 42);
      const luxReading = Math.round(280 + solarAngle * 11.5);

      return (
        <div
          data-ui="true"
          className="p-4 bg-zy-surface/90 border border-neutral-800/80 dark:border-neutral-800 space-y-3"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="inline-flex items-center space-x-2">
              <span className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-sm bg-zy-blue/15 border border-zy-blue/40 text-[10px] font-mono font-semibold text-zy-blue tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-zy-blue animate-pulse" />
                <span>[LIVE DEMO]</span>
              </span>
              <span className="font-mono text-[11px] text-zy-muted uppercase tracking-wider">
                {language === 'es' ? 'Control Solar & Masa' : 'Solar Massing Control'}
              </span>
            </div>
            <span className="font-mono text-xs font-semibold text-zy-fg inline-flex items-center space-x-1.5">
              <Sun size={13} className="text-zy-blue" />
              <span>{solarAngle}° ALT · {luxReading} LUX</span>
            </span>
          </div>

          {/* Interactive Solar Massing Diagram + Preset Triggers */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            <div className="sm:col-span-5 h-12 bg-zy-bg border border-zy-border px-3 flex items-center justify-between relative overflow-hidden">
              <span className="font-mono text-[10px] text-zy-muted uppercase z-10">
                AZIMUTH // {110 + solarAngle}°
              </span>
              <div className="relative flex items-end h-8 w-16">
                <div className="w-5 h-6 bg-zy-fg/90 z-10" />
                <div
                  style={{ width: `${Math.max(8, shadowOffset)}px` }}
                  className="h-2.5 bg-zy-blue/45 transition-all duration-300 ease-out"
                />
              </div>
            </div>

            <div className="sm:col-span-7 grid grid-cols-3 gap-1.5 font-mono text-[11px]">
              {(
                [
                  { id: 'dawn', label: '08:00 · 22°' },
                  { id: 'zenith', label: '13:00 · 68°' },
                  { id: 'dusk', label: '18:30 · 31°' },
                ] as const
              ).map((p) => {
                const isSelected = solarPreset === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleSolarPreset(p.id)}
                    className={`min-h-[44px] px-2 py-1.5 border text-center transition-all ${
                      isSelected
                        ? 'bg-zy-card border-zy-blue text-zy-fg font-semibold'
                        : 'bg-zy-bg/60 border-zy-border text-zy-muted hover:text-zy-fg'
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    // 04. SŌMA Formulations
    const somaPrice =
      78 + (somaSize === '50ml' ? 26 : 0) + (somaVessel === 'refill' ? -8 : 0);

    return (
      <div
        data-ui="true"
        className="p-4 bg-zy-surface/90 border border-neutral-800/80 dark:border-neutral-800 space-y-3"
      >
        <div className="flex items-center justify-between gap-2">
          <div className="inline-flex items-center space-x-2">
            <span className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-sm bg-emerald-500/15 border border-emerald-600/40 dark:border-emerald-500/40 text-[10px] font-mono font-semibold text-emerald-800 dark:text-emerald-300 tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse" />
              <span>[LIVE DEMO]</span>
            </span>
            <span className="font-mono text-[11px] text-zy-muted uppercase tracking-wider">
              {language === 'es' ? 'Selector Biofotónico' : 'Biophotonic Selector'}
            </span>
          </div>
          <span className="font-mono text-sm font-semibold text-zy-fg inline-flex items-center space-x-1.5">
            <ShoppingBag size={13} className="text-zy-blue" />
            <span>${somaPrice} USD</span>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 font-mono text-[11px]">
          <button
            type="button"
            onClick={() => {
              setSomaSize('30ml');
              setActiveImageBySlug((prev) => ({ ...prev, 'soma-formulations': 0 }));
            }}
            className={`min-h-[44px] px-2.5 py-1.5 border transition-all ${
              somaSize === '30ml'
                ? 'bg-zy-card border-zy-blue text-zy-fg font-semibold'
                : 'bg-zy-bg/60 border-zy-border text-zy-muted hover:text-zy-fg'
            }`}
          >
            30ml · Base
          </button>
          <button
            type="button"
            onClick={() => {
              setSomaSize('50ml');
              setActiveImageBySlug((prev) => ({ ...prev, 'soma-formulations': 1 }));
            }}
            className={`min-h-[44px] px-2.5 py-1.5 border transition-all ${
              somaSize === '50ml'
                ? 'bg-zy-card border-zy-blue text-zy-fg font-semibold'
                : 'bg-zy-bg/60 border-zy-border text-zy-muted hover:text-zy-fg'
            }`}
          >
            50ml · +$26
          </button>
          <button
            type="button"
            onClick={() => {
              setSomaVessel('glass');
              setActiveImageBySlug((prev) => ({ ...prev, 'soma-formulations': 1 }));
            }}
            className={`min-h-[44px] px-2.5 py-1.5 border transition-all ${
              somaVessel === 'glass'
                ? 'bg-zy-card border-zy-blue text-zy-fg font-semibold'
                : 'bg-zy-bg/60 border-zy-border text-zy-muted hover:text-zy-fg'
            }`}
          >
            {language === 'es' ? 'Vidrio Miron' : 'Miron Glass'}
          </button>
          <button
            type="button"
            onClick={() => {
              setSomaVessel('refill');
              setActiveImageBySlug((prev) => ({ ...prev, 'soma-formulations': 2 }));
            }}
            className={`min-h-[44px] px-2.5 py-1.5 border transition-all ${
              somaVessel === 'refill'
                ? 'bg-zy-card border-zy-blue text-zy-fg font-semibold'
                : 'bg-zy-bg/60 border-zy-border text-zy-muted hover:text-zy-fg'
            }`}
          >
            Refill · -$8
          </button>
        </div>
      </div>
    );
  };

  const activeModalProject = projects.find((p) => p.slug === activeDemoModalSlug) || null;

  return (
    <section
      id="work"
      className="py-20 sm:py-28 lg:py-36 px-5 sm:px-8 lg:px-12 max-w-[1720px] mx-auto scroll-mt-20 border-t border-neutral-800/80 dark:border-neutral-800"
      aria-label="Selected Work & Case Studies — 12-Column Modular Architectural Grid"
    >
      {/* Editorial Section Header + Ergonomic 44x44px Category Filter Bar */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 gap-6 border-b border-zy-border dark:border-neutral-800 pb-6"
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

        {/* Minimalist Filter Bar with >= 44x44px Touch Targets */}
        <div
          role="tablist"
          aria-label="Filter portfolio projects"
          className="flex flex-wrap items-center gap-1.5 p-1.5 bg-zy-surface border border-zy-border dark:border-neutral-800 rounded-lg self-start lg:self-end"
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
                className={`min-h-[44px] min-w-[44px] inline-flex items-center space-x-2 px-4 py-2 rounded-md text-xs font-mono transition-all active:scale-[0.97] ${
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

      {/* Homogeneous 12-Column Modular Grid with Ultrafine 1px Separators (border-neutral-800) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 border-t border-l border-zy-border dark:border-neutral-800">
        {filteredProjects.map((project) => {
          const globalIndex = projects.findIndex((p) => p.slug === project.slug);
          const projectNumber = `0${globalIndex + 1}`;
          const galleryFrames = project.galleryImages.slice(0, 3);
          const activeImgIdx = Math.min(
            activeImageBySlug[project.slug] ?? 0,
            galleryFrames.length - 1
          );
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
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 border-r border-b border-zy-border dark:border-neutral-800 bg-zy-card/30 hover:bg-zy-card/60 transition-colors p-5 sm:p-8 flex flex-col justify-between group"
            >
              <div>
                {/* 1. Card Top Metadata Bar: Uniform Number, Formal Title, Discipline & Year */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-zy-border-subtle dark:border-neutral-800 text-xs font-mono uppercase tracking-wider">
                  <div className="flex items-center space-x-2.5">
                    <span className="text-zy-blue font-semibold">{projectNumber} //</span>
                    <h3 className="text-zy-fg font-semibold tracking-widest text-sm">
                      {project.title}
                    </h3>
                    <span className="text-zy-border-strong">·</span>
                    <span className="text-zy-muted">{project.categoryLabel[language]}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-zy-muted font-mono text-[11px]">
                      ID // {project.idCode}
                    </span>
                    <span className="text-zy-border-strong">/</span>
                    <span className="text-zy-muted font-mono text-[11px]">{project.year}</span>
                  </div>
                </div>

                {/* 2. Uniform 16:10 Media Frame with Smooth Cubic-Bezier Crossfade & 44x44px View Controls */}
                <div className="relative mt-4 bg-[#07080a] border border-zy-border dark:border-neutral-800 overflow-hidden">
                  <Link
                    href={`/case-study/${project.slug}`}
                    data-cursor="true"
                    data-cursor-text={language === 'es' ? 'VER CASO' : 'EXPLORE'}
                    className="relative w-full aspect-[16/10] overflow-hidden block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zy-blue"
                    aria-label={`${project.title} — ${project.categoryLabel[language]}`}
                  >
                    {galleryFrames.map((frameUrl, frameIdx) => {
                      const isCurrent = frameIdx === activeImgIdx;
                      return (
                        <Image
                          key={frameUrl + frameIdx}
                          src={frameUrl}
                          alt={`${project.title} — ${language === 'es' ? 'Vista' : 'View'} 0${frameIdx + 1}`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          priority={globalIndex < 2 && frameIdx === 0}
                          style={{
                            transitionProperty: 'opacity, transform, filter',
                            transitionDuration: '520ms',
                            transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
                          }}
                          className={`object-cover object-center ${
                            isCurrent
                              ? 'opacity-100 scale-100 blur-0 z-[2] group-hover:scale-[1.02]'
                              : 'opacity-0 scale-[1.04] blur-[2px] z-[1] pointer-events-none'
                          }`}
                        />
                      );
                    })}

                    {/* Subtle neutral scrim for badge legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25 z-[3] pointer-events-none" />

                    {/* Top-Left Concept Badge + Live Status */}
                    <div className="absolute top-3 left-3 z-[4] flex items-center space-x-2 pointer-events-none">
                      <span className="px-2.5 py-1 rounded-sm bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-mono tracking-wider uppercase text-white">
                        {t.conceptBadge}
                      </span>
                    </div>

                    {/* Bottom-Left Frame Counter */}
                    <div className="absolute bottom-3 left-3 z-[4] pointer-events-none">
                      <span className="font-mono text-[11px] text-white/95 uppercase tracking-widest bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-sm border border-white/15">
                        {language === 'es' ? 'VISTA' : 'FRAME'} 0{activeImgIdx + 1}/0{galleryFrames.length}
                      </span>
                    </div>
                  </Link>

                  {/* Ergonomic >= 44x44px Frame Switcher Controls */}
                  {galleryFrames.length > 1 && (
                    <div
                      className="absolute bottom-3 right-3 z-[5] flex items-center space-x-1.5 bg-black/85 backdrop-blur-md p-1 border border-white/20"
                      role="group"
                      aria-label={`${project.title} frames`}
                    >
                      {galleryFrames.map((imgUrl, thumbIdx) => {
                        const isSelected = activeImgIdx === thumbIdx;
                        return (
                          <button
                            key={imgUrl + thumbIdx}
                            type="button"
                            onClick={(e) => handleSelectGalleryThumb(e, project.slug, thumbIdx)}
                            aria-label={`${project.title} ${language === 'es' ? 'vista' : 'frame'} 0${thumbIdx + 1}`}
                            aria-pressed={isSelected}
                            className={`relative min-w-[44px] min-h-[44px] w-12 h-11 overflow-hidden border transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.95] ${
                              isSelected
                                ? 'border-zy-blue ring-1 ring-zy-blue opacity-100'
                                : 'border-white/25 opacity-65 hover:opacity-100'
                            }`}
                          >
                            <Image src={imgUrl} alt="" fill sizes="48px" className="object-cover" />
                            <span
                              className={`absolute inset-0 flex items-center justify-center font-mono text-[10px] font-bold ${
                                isSelected
                                  ? 'bg-zy-blue/45 text-white'
                                  : 'bg-black/45 text-white/90'
                              }`}
                            >
                              0{thumbIdx + 1}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* 3. Embedded Interactive [LIVE DEMO] Micro-Widget inside the Home Card */}
                <div className="mt-4">
                  {renderEmbeddedMicroWidget(project.slug)}
                </div>

                {/* 4. Project Tagline, Editorial Description & Capability Pills */}
                <div className="pt-5 space-y-3">
                  <p className="text-base sm:text-lg lg:text-xl font-sans text-zy-fg font-medium leading-snug">
                    {project.tagline[language]}
                  </p>

                  <p className="text-sm text-zy-muted font-sans leading-relaxed">
                    {project.designGoal[language]}
                  </p>

                  {capabilities.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {capabilities.map((cap) => (
                        <span
                          key={cap}
                          className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-sm bg-zy-surface border border-zy-border text-[11px] font-mono text-zy-fg-secondary"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-zy-blue" />
                          <span>{cap}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* 5. Clear Action Hierarchy: Primary In-Situ Interactive Simulator CTA + Subordinate Case Study Link */}
              <div className="pt-5 mt-6 border-t border-zy-border-subtle dark:border-neutral-800 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Primary Highlighted CTA: Opens Live Interactive Simulator Modal In-Situ */}
                    <Magnetic>
                      <button
                        type="button"
                        onClick={() => setActiveDemoModalSlug(project.slug)}
                        className="group/btn min-h-[44px] px-4 py-2.5 rounded-lg bg-zy-blue hover:bg-zy-blue-hover active:scale-[0.97] text-white inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-wider font-semibold transition-all cursor-pointer"
                      >
                        <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                        <span>{t.tryDemo}</span>
                        <Sparkles size={13} className="transition-transform duration-200 group-hover/btn:rotate-12" />
                      </button>
                    </Magnetic>

                    {/* Subordinate Secondary Link: Full Editorial Case Study Monograph */}
                    <Link
                      href={`/case-study/${project.slug}`}
                      className="group/link min-h-[44px] px-3 py-2 inline-flex items-center space-x-1.5 text-xs font-mono uppercase tracking-wider text-zy-muted hover:text-zy-fg transition-colors"
                    >
                      <span>{t.viewProject}</span>
                      <ArrowUpRight
                        size={13}
                        className="text-zy-blue transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                      />
                    </Link>
                  </div>

                  {/* Expandable Case Study Specification Dossier Toggle (>= 44px height) */}
                  <button
                    type="button"
                    onClick={() => toggleSpec(project.slug)}
                    aria-expanded={isSpecOpen}
                    aria-controls={`spec-${project.slug}`}
                    className="min-h-[44px] px-2.5 py-2 inline-flex items-center space-x-1.5 text-xs font-mono text-zy-muted hover:text-zy-fg transition-colors"
                  >
                    <span>
                      {isSpecOpen
                        ? language === 'es'
                          ? 'Cerrar ficha'
                          : 'Close specs'
                        : language === 'es'
                        ? 'Ficha técnica'
                        : 'Specifications'}
                    </span>
                    <ChevronDown
                      size={13}
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
                      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                      className="overflow-hidden border border-zy-border dark:border-neutral-800 bg-zy-card mt-3 p-5"
                    >
                      <div className="grid grid-cols-1 gap-5 text-xs">
                        {/* Visual Decisions */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between font-mono text-zy-blue uppercase tracking-wider">
                            <span className="inline-flex items-center space-x-2">
                              <Compass size={13} />
                              <span>{tCase.visualDecisionsTitle}</span>
                            </span>
                            <span className="text-zy-muted">ID // {project.idCode}</span>
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

                        {/* Interactions */}
                        <div className="space-y-2 pt-3 border-t border-zy-border-subtle dark:border-neutral-800">
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

                        {/* Commercial Benefits & Direct Links */}
                        <div className="space-y-3 bg-zy-benefits-bg border border-zy-benefits-border p-4">
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

                          <div className="pt-3 border-t border-zy-border flex flex-wrap items-center justify-between gap-2">
                            <Link
                              href={demoHref}
                              className="group/spec inline-flex items-center space-x-1 font-mono text-[11px] text-zy-blue hover:underline font-semibold"
                            >
                              <span>{t.viewProject}</span>
                              <ArrowUpRight
                                size={12}
                                className="transition-transform duration-200 group-hover/spec:translate-x-0.5 group-hover/spec:-translate-y-0.5"
                              />
                            </Link>
                            <Link
                              href="/#contact"
                              className="inline-flex items-center space-x-1 font-mono text-[11px] text-zy-muted hover:text-zy-fg"
                            >
                              <span>{tCase.ctaButton}</span>
                              <ArrowUpRight size={12} className="text-zy-blue" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* IN-SITU INTERACTIVE DEMO SIMULATOR MODAL (Zero Page Reload Friction) */}
      <AnimatePresence>
        {activeModalProject && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${activeModalProject.title} — ${t.tryDemo}`}
            style={{ backgroundColor: 'var(--zy-modal-backdrop)' }}
            onClick={() => setActiveDemoModalSlug(null)}
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md p-3 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl max-h-[92svh] overflow-y-auto bg-zy-bg border border-zy-border dark:border-neutral-800 rounded-2xl shadow-2xl"
            >
              {/* Sticky Modal Header Bar */}
              <div className="sticky top-0 z-20 px-5 sm:px-6 py-4 bg-zy-bg/95 backdrop-blur-md border-b border-zy-border dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-sm bg-emerald-500/15 border border-emerald-600/40 dark:border-emerald-500/40 text-[10px] font-mono font-semibold text-emerald-800 dark:text-emerald-300 tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse" />
                    <span>[LIVE DEMO IN-SITU]</span>
                  </span>
                  <div>
                    <h3 className="text-sm sm:text-base font-sans font-semibold text-zy-fg">
                      {activeModalProject.title}
                    </h3>
                    <span className="font-mono text-[10px] text-zy-muted uppercase tracking-wider block">
                      ID // {activeModalProject.idCode} · {activeModalProject.categoryLabel[language]}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5">
                  <Link
                    href={`/case-study/${activeModalProject.slug}#${
                      DEMO_ANCHOR_BY_SLUG[activeModalProject.slug] || ''
                    }`}
                    onClick={() => setActiveDemoModalSlug(null)}
                    className="group min-h-[40px] px-3.5 py-2 rounded-lg bg-zy-surface hover:bg-zy-card border border-zy-border text-xs font-mono text-zy-fg-secondary hover:text-zy-fg inline-flex items-center space-x-1.5 transition-colors"
                  >
                    <span>{t.viewProject}</span>
                    <ArrowUpRight
                      size={13}
                      className="text-zy-blue transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>

                  <button
                    type="button"
                    onClick={() => setActiveDemoModalSlug(null)}
                    aria-label={language === 'es' ? 'Cerrar simulador' : 'Close simulator'}
                    className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-lg bg-zy-control hover:bg-zy-control-hover border border-zy-border text-zy-fg transition-colors active:scale-[0.96]"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Embedded Full Simulator Experience */}
              <div className="p-4 sm:p-6">
                {activeModalProject.demoType === 'hospitality' && (
                  <HospitalityDemo selectedSuiteIndex={auraSuiteIdx} onSelectSuite={setAuraSuiteIdx} />
                )}
                {activeModalProject.demoType === 'gastronomy' && <GastronomyDemo />}
                {activeModalProject.demoType === 'architecture' && <ArchitectureDemo />}
                {activeModalProject.demoType === 'ecommerce' && <EcommerceDemo />}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
