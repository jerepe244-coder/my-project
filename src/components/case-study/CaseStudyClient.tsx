'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ProjectDetail } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import { HospitalityDemo } from '@/components/demos/HospitalityDemo';
import { GastronomyDemo } from '@/components/demos/GastronomyDemo';
import { ArchitectureDemo } from '@/components/demos/ArchitectureDemo';
import { EcommerceDemo } from '@/components/demos/EcommerceDemo';
import { ArrowLeft, ArrowUpRight, Sparkles, Check, Compass, Layers, Zap } from 'lucide-react';

interface CaseStudyClientProps {
  project: ProjectDetail;
}

export const CaseStudyClient: React.FC<CaseStudyClientProps> = ({ project }) => {
  const { language } = useLanguage();
  const t = translations[language].caseStudy;
  const isAura = project.slug === 'aura-sanctuary';

  const auraGalleryCaptions = [
    {
      index: '01 // SPA & MATERIALITY',
      title: {
        es: 'Termas minerales de basalto y cedro natural',
        en: 'Basalt mineral thermal bath & natural cedar',
      },
    },
    {
      index: '02 // SENSORY RITUAL',
      title: {
        es: 'Gastronomía botánica de estación en suite',
        en: 'Seasonal botanical gastronomy in suite',
      },
    },
  ];

  const renderDemo = () => {
    switch (project.demoType) {
      case 'hospitality':
        return <HospitalityDemo />;
      case 'gastronomy':
        return <GastronomyDemo />;
      case 'architecture':
        return <ArchitectureDemo />;
      case 'ecommerce':
        return <EcommerceDemo />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-zy-bg text-zy-fg pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Back Link */}
        <div>
          <Link
            href="/#work"
            className="inline-flex items-center space-x-2 text-xs font-mono text-zy-muted hover:text-zy-fg transition-colors p-1"
          >
            <ArrowLeft size={14} />
            <span>{t.back}</span>
          </Link>
        </div>

        {/* Case Study Header & Honest Concept Notice */}
        <header className={isAura ? 'space-y-7' : 'space-y-6'}>
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-zy-surface border border-zy-border text-xs font-mono text-zy-fg-secondary">
            <span className="w-1.5 h-1.5 rounded-full bg-zy-blue" />
            <span>{t.conceptNotice}</span>
          </div>

          <h1
            className={
              isAura
                ? 'text-4xl sm:text-6xl lg:text-[4rem] font-sans font-bold tracking-[-0.03em] leading-[1.06] text-zy-fg'
                : 'text-4xl sm:text-6xl font-sans font-bold tracking-tight text-zy-fg'
            }
          >
            {project.title}
          </h1>

          <p
            className={
              isAura
                ? 'text-lg sm:text-2xl text-zy-fg-secondary font-sans leading-relaxed max-w-3xl font-normal'
                : 'text-lg sm:text-2xl text-zy-fg-secondary font-sans leading-relaxed'
            }
          >
            {project.tagline[language]}
          </p>

          {/* Metadata Grid */}
          <div className="pt-6 border-t border-zy-border-subtle grid grid-cols-2 sm:grid-cols-4 gap-6 font-mono text-xs">
            <div>
              <span className={`${isAura ? 'text-zy-muted' : 'text-zy-dim'} block uppercase`}>// {t.clientLabel}</span>
              <span className="text-zy-fg mt-1.5 block font-medium">ZYRVAE Lab</span>
            </div>
            <div>
              <span className={`${isAura ? 'text-zy-muted' : 'text-zy-dim'} block uppercase`}>// {t.categoryLabel}</span>
              <span className="text-zy-fg mt-1.5 block font-medium">{project.categoryLabel[language]}</span>
            </div>
            <div>
              <span className={`${isAura ? 'text-zy-muted' : 'text-zy-dim'} block uppercase`}>// {t.yearLabel}</span>
              <span className="text-zy-fg mt-1.5 block font-medium">{project.year}</span>
            </div>
            <div>
              <span className={`${isAura ? 'text-zy-muted' : 'text-zy-dim'} block uppercase`}>// STATUS</span>
              <span className="text-zy-blue mt-1.5 block font-semibold">CONCEPT</span>
            </div>
          </div>
        </header>

        {/* Primary Visual Cover Asset */}
        <figure className="space-y-3">
          <div
            className={
              isAura
                ? 'relative aspect-[4/3] sm:aspect-[16/10] w-full rounded-2xl overflow-hidden border border-zy-border bg-[#0c0d10] shadow-2xl'
                : 'relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-zy-border bg-[#0c0d10] shadow-xl'
            }
          >
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className={
                isAura
                  ? 'object-cover object-center transition-transform duration-700 ease-out hover:scale-[1.015]'
                  : 'object-cover'
              }
              priority
            />
            {isAura && (
              <>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#060709]/80 via-[#060709]/15 to-transparent" />
                <div className="pointer-events-none absolute bottom-0 inset-x-0 p-5 sm:p-8 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#cbd4e6]/90 block">
                      // {language === 'es' ? 'ARQUITECTURA DE ALTA MONTAÑA · PATAGONIA ANDINA' : 'HIGH-ALTITUDE ARCHITECTURE · ANDEAN PATAGONIA'}
                    </span>
                    <p className="text-xs sm:text-sm text-white/90 font-sans max-w-xl">
                      {language === 'es'
                        ? 'Pabellón principal en voladizo de basalto oscuro y cedro carbonizado sobre el valle glaciar.'
                        : 'Main cantilevered pavilion crafted from dark basalt and charred cedar overlooking the glacial valley.'}
                    </p>
                  </div>
                  <span className="self-start sm:self-auto px-2.5 py-1 rounded-md bg-[#0a0c10]/80 backdrop-blur-md border border-white/10 font-mono text-[10px] text-[#cbd4e6] tracking-wider uppercase">
                    41°08&apos;S · 71°18&apos;W // 1,640 M
                  </span>
                </div>
              </>
            )}
          </div>
        </figure>

        {/* Section 01: Client Context & Design Goal */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 border-t border-zy-border-subtle">
          <div className="md:col-span-4">
            <h2 className="font-mono text-xs text-zy-blue uppercase tracking-wider">
              {t.objectiveTitle}
            </h2>
          </div>
          <div
            className={
              isAura
                ? 'md:col-span-8 space-y-6 text-sm sm:text-base text-zy-muted font-sans leading-relaxed max-w-2xl'
                : 'md:col-span-8 space-y-6 text-sm sm:text-base text-zy-muted font-sans leading-relaxed'
            }
          >
            <p className={isAura ? 'text-zy-fg font-medium text-base sm:text-lg leading-relaxed' : 'text-zy-fg font-medium'}>
              {project.designGoal[language]}
            </p>
            <p>{project.clientContext[language]}</p>
          </div>
        </section>

        {/* Section 02: Visual & Typographic Decisions */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 border-t border-zy-border-subtle">
          <div className="md:col-span-4">
            <h2 className="font-mono text-xs text-zy-blue uppercase tracking-wider">
              {t.visualDecisionsTitle}
            </h2>
          </div>
          <div className="md:col-span-8 space-y-4">
            {project.visualDecisions.map((decision, i) => (
              <div key={i} className="p-4 rounded-xl bg-zy-card-alt border border-zy-border-card flex items-start space-x-3">
                <Compass size={16} className="text-zy-blue shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-zy-fg-secondary font-sans leading-relaxed">
                  {decision[language]}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Detail Images Carousel / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {project.galleryImages.slice(1).map((img, i) => {
            const caption = isAura ? auraGalleryCaptions[i] : null;
            return (
              <figure key={i} className="group space-y-3">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-zy-border bg-[#0b0d10] shadow-lg">
                  <Image
                    src={img}
                    alt={caption ? caption.title[language] : `${project.title} detail ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className={
                      isAura
                        ? 'object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]'
                        : 'object-cover'
                    }
                  />
                  {isAura && (
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#060709]/65 via-transparent to-transparent" />
                  )}
                </div>
                {caption && (
                  <figcaption className="flex items-baseline justify-between gap-4 px-1 pt-0.5">
                    <span className="font-mono text-[10px] tracking-widest uppercase text-zy-muted">
                      {caption.index}
                    </span>
                    <span className="text-xs text-zy-fg-secondary font-sans text-right">
                      {caption.title[language]}
                    </span>
                  </figcaption>
                )}
              </figure>
            );
          })}
        </div>

        {/* Section 03 & 04: Interactions & Engineered Features */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 border-t border-zy-border-subtle">
          <div className="md:col-span-4 space-y-6">
            <div>
              <h2 className="font-mono text-xs text-zy-blue uppercase tracking-wider">
                {t.interactionsTitle}
              </h2>
            </div>
            <div>
              <h2 className="font-mono text-xs text-zy-blue uppercase tracking-wider">
                {t.featuresTitle}
              </h2>
            </div>
          </div>
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-3">
              <span className="font-mono text-xs text-zy-dim uppercase block">
                // {language === 'es' ? 'Flujos & Microinteracción' : 'Interactions'}
              </span>
              {project.interactions.map((int, i) => (
                <div key={i} className="p-3.5 bg-zy-card-alt border border-zy-border-card rounded-xl text-xs text-zy-fg-secondary flex items-start space-x-2">
                  <Layers size={14} className="text-zy-blue shrink-0 mt-0.5" />
                  <span>{int[language]}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <span className="font-mono text-xs text-zy-dim uppercase block">
                // {language === 'es' ? 'Capacidades Técnicas' : 'Capabilities'}
              </span>
              {project.features.map((feat, i) => (
                <div key={i} className="p-3.5 bg-zy-card-alt border border-zy-border-card rounded-xl text-xs text-zy-fg-secondary flex items-start space-x-2">
                  <Zap size={14} className="text-zy-blue shrink-0 mt-0.5" />
                  <span>{feat[language]}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 05: Hypothetical Potential Commercial Benefits */}
        <section className="p-6 sm:p-8 rounded-2xl bg-zy-benefits-bg border border-zy-benefits-border space-y-4">
          <div className="flex items-center space-x-2 text-xs font-mono text-zy-blue">
            <Sparkles size={14} />
            <h2 className="uppercase tracking-wider">{t.benefitsTitle}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {project.potentialBenefits.map((benefit, i) => (
              <div key={i} className="flex items-start space-x-3 text-xs sm:text-sm text-zy-fg-secondary font-sans">
                <Check size={16} className="text-zy-blue shrink-0 mt-0.5" />
                <p>{benefit[language]}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 06: LIVE INTERACTIVE FUNCTIONAL DEMO */}
        <section className="space-y-4 pt-8 border-t border-zy-border-subtle">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h2 className="font-mono text-xs text-zy-blue uppercase tracking-wider">
              {t.demoTitle}
            </h2>
            <span className="font-mono text-[11px] text-zy-dim">
              {t.demoNotice}
            </span>
          </div>

          {/* Render corresponding interactive demo */}
          {renderDemo()}
        </section>

        {/* CTA to start a similar project */}
        <div className="pt-16 pb-8 border-t border-zy-border-subtle flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-sans font-bold text-zy-fg">
              {t.ctaTitle}
            </h3>
            <p className="text-xs sm:text-sm text-zy-muted">
              {language === 'es'
                ? 'Diseñemos una solución personalizada con la misma precisión para tu marca.'
                : 'Let us engineer a custom solution with the same precision for your brand.'}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/#contact"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-zy-blue hover:bg-zy-blue-hover text-white text-xs font-medium tracking-wide shadow-[0_0_20px_rgba(10,92,255,0.4)] transition-all"
            >
              <span>{t.ctaButton}</span>
              <ArrowUpRight size={14} />
            </Link>

            <Link
              href="/#work"
              className="px-5 py-3 rounded-full bg-zy-surface hover:bg-zy-surface-hover border border-zy-border text-xs font-mono text-zy-fg-secondary hover:text-zy-fg transition-colors"
            >
              {t.back}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
