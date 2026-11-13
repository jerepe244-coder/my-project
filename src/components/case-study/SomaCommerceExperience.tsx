'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ProjectDetail } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { SOMA_STUDIO_META } from '@/data/commerce';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Check,
  Leaf,
  ShieldCheck,
  Sparkles,
  Truck,
} from 'lucide-react';
import { SomaBagHeaderButton } from './soma/SomaBagHeaderButton';
import { SomaCartOverlay } from './soma/SomaCartOverlay';
import { SomaCatalogSection } from './soma/SomaCatalogSection';

interface SomaCommerceExperienceProps {
  project: ProjectDetail;
}

function scrollToSection(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
  const el = document.getElementById(id);
  if (el) {
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

/* Subcomponente aislado del Cuaderno de Laboratorio para evitar re-renders del resto de la página */
const SomaLabJournalForm: React.FC<{ language: 'es' | 'en' }> = React.memo(({ language }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <div className="p-6 sm:p-10 bg-[var(--soma-surface)] border border-[var(--soma-border)] monolith-hairline space-y-6 rounded-none">
      <div className="space-y-1.5">
        <span className="text-[11px] font-medium text-[var(--soma-amber-ink)] block">
          {language === 'es' ? 'Cuaderno de laboratorio' : 'Laboratory journal'}
        </span>
        <h3 className="text-2xl font-swiss font-semibold tracking-tight text-[var(--soma-fg)]">
          {language === 'es'
            ? 'Recibí estudios de formulación y notas de cosecha'
            : 'Receive formulation digests and harvest notes'}
        </h3>
        <p className="text-xs text-[var(--soma-muted)]">
          {language === 'es'
            ? 'Simulación de despacho editorial privado sin envíos reales.'
            : 'Private editorial dispatch simulation without real mailings.'}
        </p>
      </div>

      {subscribed ? (
        <div className="p-4 border border-[var(--soma-amber)] bg-[var(--soma-bg)] flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center space-x-2.5 text-[var(--soma-fg)] font-medium">
            <Check size={14} className="text-[var(--soma-amber-ink)] shrink-0" />
            <span>
              {language === 'es'
                ? 'Registro confirmado en el cuaderno de laboratorio (Demo Zyrvae).'
                : 'Laboratory journal dispatch registered (Zyrvae Demo).'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setSubscribed(false)}
            className="text-[11px] text-[var(--soma-amber-ink)] hover:underline underline-offset-4 shrink-0"
          >
            {language === 'es' ? 'Reiniciar' : 'Reset'}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row sm:items-end gap-4">
          <div className="flex-grow space-y-1">
            <label htmlFor="soma-journal-email" className="block text-[11px] font-medium text-[var(--soma-muted)]">
              {language === 'es' ? 'Dirección de correo' : 'Email address'}
            </label>
            <input
              id="soma-journal-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="botanical@atelier.com"
              className="soma-line-input font-swiss"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-[var(--soma-btn-bg)] text-[var(--soma-btn-fg)] hover:bg-[var(--soma-amber)] hover:text-[#0A0A0C] text-xs font-swiss font-medium transition-colors whitespace-nowrap rounded-none"
          >
            {language === 'es' ? 'Suscribirme' : 'Subscribe'}
          </button>
        </form>
      )}

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-4 border-t border-[var(--soma-border)] monolith-hairline text-[11px] font-medium text-[var(--soma-dim)]">
        <span>{language === 'es' ? 'Certificación vegana' : 'Vegan certified'}</span>
        <span>·</span>
        <span>{language === 'es' ? 'Vidrio violeta Miron' : 'Miron violet glass'}</span>
        <span>·</span>
        <span>{language === 'es' ? 'Recargas 100% compostables' : '100% compostable refills'}</span>
      </div>
    </div>
  );
});
SomaLabJournalForm.displayName = 'SomaLabJournalForm';

/* Secciones estáticas/memorizadas aisladas para evitar re-renders cuando cambia el estado del Drawer o Bolsa */
const SomaStaticSectionsAfterCatalog: React.FC<{
  language: 'es' | 'en';
  projectTitle: string;
}> = React.memo(({ language, projectTitle }) => {
  return (
    <>
      {/* 5. CIENCIA BIOFOTÓNICA: EL VIDRIO MIRON */}
      <section
        id="soma-science"
        className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[var(--soma-border)] monolith-hairline scroll-mt-28"
        aria-label="Miron Glass Science"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Fotografía científica limpia en marco 0.5px (lazy + decoding async) */}
          <div className="lg:col-span-5 border border-[var(--soma-border)] monolith-hairline bg-[var(--soma-surface)] rounded-none">
            <div className="relative aspect-square overflow-hidden bg-[var(--soma-card)]">
              <Image
                src="/images/soma-vessel-miron.webp"
                alt="Miron violet biophotonic glass preserving active botanical ingredients"
                fill
                loading="lazy"
                decoding="async"
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <div className="px-4 py-3 border-t border-[var(--soma-border)] monolith-hairline flex items-center justify-between text-[11px] font-medium text-[var(--soma-muted)] tabular-nums">
              <span>{language === 'es' ? 'Vidrio violeta Miron · Patente óptica' : 'Miron Violetglas · Optical patent'}</span>
              <span className="text-[var(--soma-amber-ink)]">380–750 nm</span>
            </div>
          </div>

          {/* Explicación Biofísica */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-medium text-[var(--soma-amber-ink)] block">
                {language === 'es' ? 'Ciencia de preservación' : 'Preservation biophysics'}
              </span>
              <h2 className="text-3xl sm:text-5xl font-swiss font-semibold tracking-tight text-[var(--soma-fg)]">
                {language === 'es' ? 'La membrana biofotónica.' : 'The biophotonic membrane.'}
              </h2>
              <p className="text-base sm:text-lg text-[var(--soma-muted)] font-swiss leading-relaxed">
                {language === 'es'
                  ? 'La luz solar visible acelera la oxidación molecular de los aceites botánicos y degrada las vitaminas activas. El vidrio violeta Miron actúa como un filtro espectral selectivo que bloquea el espectro visible nocivo y admite únicamente las frecuencias violeta e infrarrojas regeneradoras.'
                  : 'Visible sunlight drastically accelerates molecular decay in natural plant oils and destabilizes bioactive vitamins. Miron violet glass acts as a selective optical filter, admitting only beneficial violet and far-infrared wavelengths.'}
              </p>
            </div>

            {/* Tabla Espectral en Retícula Continua 0.5px */}
            <div className="grid grid-cols-1 sm:grid-cols-3 border-l border-t border-[var(--soma-border)] monolith-hairline text-xs">
              <div className="p-5 bg-[var(--soma-bg)] border-r border-b border-[var(--soma-border)] monolith-hairline space-y-1.5">
                <span className="text-[var(--soma-dim)] block text-[11px] font-medium tabular-nums">
                  {language === 'es' ? 'Luz visible (400–700 nm)' : 'Visible light (400–700 nm)'}
                </span>
                <span className="text-[var(--soma-fg)] font-semibold block text-sm tabular-nums">
                  {language === 'es' ? '0% paso (Bloqueo total)' : '0% transmission'}
                </span>
                <p className="text-[var(--soma-muted)] text-[11px] leading-relaxed">
                  {language === 'es' ? 'Evita la foto-oxidación lipídica' : 'Prevents lipid photo-oxidation'}
                </p>
              </div>

              <div className="p-5 bg-[var(--soma-bg)] border-r border-b border-[var(--soma-border)] monolith-hairline space-y-1.5">
                <span className="text-[var(--soma-dim)] block text-[11px] font-medium tabular-nums">
                  {language === 'es' ? 'Espectro violeta (380–420 nm)' : 'Violet spectrum (380–420 nm)'}
                </span>
                <span className="text-[var(--soma-amber-ink)] font-semibold block text-sm tabular-nums">
                  {language === 'es' ? '25–45% transmisión' : '25–45% transmission'}
                </span>
                <p className="text-[var(--soma-muted)] text-[11px] leading-relaxed">
                  {language === 'es' ? 'Preserva la vitalidad celular' : 'Sustains vital bio-frequency'}
                </p>
              </div>

              <div className="p-5 bg-[var(--soma-bg)] border-r border-b border-[var(--soma-border)] monolith-hairline space-y-1.5">
                <span className="text-[var(--soma-dim)] block text-[11px] font-medium tabular-nums">
                  {language === 'es' ? 'Infrarrojo cercano (>750 nm)' : 'Near infrared (>750 nm)'}
                </span>
                <span className="text-[var(--soma-fg)] font-semibold block text-sm tabular-nums">
                  {language === 'es' ? '60–70% transmisión' : '60–70% transmission'}
                </span>
                <p className="text-[var(--soma-muted)] text-[11px] leading-relaxed">
                  {language === 'es' ? 'Estabilidad superior a 24 meses' : '24+ month bio-stability'}
                </p>
              </div>
            </div>

            {/* Bandera Circular de Recargas */}
            <div className="p-5 sm:p-6 bg-[var(--soma-surface)] border border-[var(--soma-border)] monolith-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-none">
              <div className="space-y-1.5">
                <div className="flex items-center space-x-2 text-[var(--soma-fg)] font-medium text-sm">
                  <Leaf size={14} className="text-[var(--soma-amber-ink)] shrink-0" />
                  <span>{language === 'es' ? 'Sistema circular de recargas' : 'Circular refill system'}</span>
                </div>
                <p className="text-xs text-[var(--soma-muted)] leading-relaxed max-w-xl">
                  {language === 'es'
                    ? 'Conservá tu frasco biofotónico de por vida. Cada sobre compostable ahorra $8 USD y reduce un 82% la huella de transporte.'
                    : 'Keep your biophotonic glass jar for life. Every compostable refill saves $8 USD and cuts freight footprint by 82%.'}
                </p>
              </div>

              <a
                href="#soma-catalog"
                onClick={(e) => scrollToSection(e, 'soma-catalog')}
                className="px-4 py-2.5 bg-[var(--soma-btn-bg)] text-[var(--soma-btn-fg)] hover:bg-[var(--soma-amber)] hover:text-[#0A0A0C] text-xs font-medium whitespace-nowrap self-start sm:self-auto transition-colors rounded-none"
              >
                {language === 'es' ? 'Ver recargas' : 'Shop refills'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SECUENCIA CUTÁNEA / RITUALES */}
      <section
        id="soma-rituals"
        className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[var(--soma-border)] monolith-hairline scroll-mt-28"
        aria-label="SOMA Rituals"
      >
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--soma-border)] monolith-hairline pb-8">
            <div className="space-y-2">
              <span className="text-xs font-medium text-[var(--soma-amber-ink)] block">
                {language === 'es' ? 'Secuencia de aplicación' : 'Cellular application ritual'}
              </span>
              <h2 className="text-3xl sm:text-5xl font-swiss font-semibold tracking-tight text-[var(--soma-fg)]">
                {language === 'es' ? 'El ritual celular diario.' : 'The daily cellular ritual.'}
              </h2>
              <p className="text-sm sm:text-base text-[var(--soma-muted)] font-swiss max-w-xl leading-relaxed">
                {language === 'es'
                  ? 'Cuatro pasos calibrados según el ritmo circadiano para optimizar la absorción osmótica de menor a mayor densidad lipídica.'
                  : 'Four steps calibrated with your circadian rhythm for progressive osmotic absorption by ascending lipid density.'}
              </p>
            </div>

            <span className="text-xs font-medium text-[var(--soma-muted)] self-start md:self-end">
              {language === 'es' ? 'Orden de menor a mayor densidad lipídica' : 'Ordered by ascending lipid density'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-l border-t border-[var(--soma-border)] monolith-hairline">
            {[
              {
                step: '01',
                time: { es: 'Día y noche', en: 'Day & night' },
                title: { es: 'Purificación & Equilibrio', en: 'Purify & Rebalance' },
                product: 'FORM-05/CLN · Emulsión Limpiadora',
                desc: {
                  es: 'Disuelve impurezas con aceite de jojoba y reishi sin retirar el manto ácido protector.',
                  en: 'Dissolves impurities with jojoba and reishi without stripping the protective mantle.',
                },
              },
              {
                step: '02',
                time: { es: 'Día y noche', en: 'Day & night' },
                title: { es: 'Saturación Hídrica', en: 'Hydric Saturation' },
                product: 'FORM-03/HYD · Bruma Biofotónica',
                desc: {
                  es: 'Aporta ácido poliglutámico y electrolitos que multiplican por 5 la absorción del suero.',
                  en: 'Delivers polyglutamic acid and electrolytes priming the skin to absorb serums.',
                },
              },
              {
                step: '03',
                time: { es: 'Noche · Reparación', en: 'Night · Repair' },
                title: { es: 'Regeneración Celular', en: 'Cellular Regeneration' },
                product: 'FORM-01/REG · Néctar Celular',
                desc: {
                  es: 'Fitopéptidos concentrados y mirra silvestre que activan la síntesis de colágeno durante el sueño.',
                  en: 'Concentrated phyto-peptides and wild myrrh accelerating nocturnal repair.',
                },
              },
              {
                step: '04',
                time: { es: 'Sellado lipídico', en: 'Lipid seal' },
                title: { es: 'Barrera Lipídica', en: 'Barrier Fortification' },
                product: 'FORM-02/LIP · Bálsamo Botánico',
                desc: {
                  es: 'Tres ceramidas biocompatibles que sellan los activos y evitan la pérdida transepidérmica de agua.',
                  en: 'Three bio-identical ceramides locking in actives and preventing moisture loss.',
                },
              },
            ].map((rit) => (
              <div
                key={rit.step}
                className="p-6 bg-[var(--soma-bg)] border-r border-b border-[var(--soma-border)] monolith-hairline flex flex-col justify-between space-y-5 rounded-none"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-medium text-[var(--soma-muted)] border-b border-[var(--soma-border)] monolith-hairline pb-2.5 tabular-nums">
                    <span className="text-[var(--soma-amber-ink)] font-semibold">
                      {language === 'es' ? `Paso ${rit.step}` : `Step ${rit.step}`}
                    </span>
                    <span>{rit.time[language]}</span>
                  </div>

                  <h3 className="font-swiss font-semibold text-lg text-[var(--soma-fg)] tracking-tight">
                    {rit.title[language]}
                  </h3>

                  <p className="text-[11px] font-medium text-[var(--soma-amber-ink)] tabular-nums">
                    {rit.product}
                  </p>

                  <p className="text-xs text-[var(--soma-muted)] leading-relaxed">{rit.desc[language]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. ATELIER, CUADERNO DE LABORATORIO & BANDA DE RETORNO A ZYRVAE */}
      <section
        id="soma-footer"
        className="pt-24 sm:pt-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-28"
        aria-label="SOMA Footer and Return Navigation"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-20">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-medium text-[var(--soma-amber-ink)] block">
              {language === 'es' ? 'Atelier & Dispensario' : 'Atelier & Dispensary'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-swiss font-semibold tracking-tight text-[var(--soma-fg)]">
              {language === 'es' ? 'La pureza botánica en tu piel.' : 'Pure botanicals on your skin.'}
            </h2>
            <p className="text-sm text-[var(--soma-muted)] font-swiss leading-relaxed">
              {SOMA_STUDIO_META.mission[language]}
            </p>

            {/* Declaración honesta en retícula limpia */}
            <div className="p-5 bg-[var(--soma-surface)] border border-[var(--soma-border)] monolith-hairline text-xs space-y-2 text-[var(--soma-muted)] rounded-none">
              <div className="flex items-center space-x-2 text-[var(--soma-fg)] font-medium">
                <ShieldCheck size={14} className="text-[var(--soma-amber-ink)] shrink-0" />
                <span>
                  {language === 'es' ? 'Declaración de proyecto conceptual' : 'Conceptual project declaration'}
                </span>
              </div>
              <p className="leading-relaxed">
                {language === 'es'
                  ? `${projectTitle} es una experiencia de comercio electrónico conceptual diseñada por Zyrvae Digital Studio. Todos los productos, formulaciones y albaranes de pago se presentan con fines demostrativos sin cobros reales.`
                  : `${projectTitle} is a conceptual e-commerce architecture crafted by Zyrvae Digital Studio. All products, formulations, and laboratory slips operate in demonstration mode with zero real charges.`}
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <SomaLabJournalForm language={language} />
          </div>
        </div>

        {/* Banda de retícula continua de retorno al portafolio general de Zyrvae */}
        <div className="border-t border-b border-[var(--soma-border)] monolith-hairline grid grid-cols-1 md:grid-cols-12 bg-[var(--soma-surface)]/40 rounded-none">
          <Link
            href="/#work"
            className="md:col-span-8 p-6 sm:p-8 border-b md:border-b-0 md:border-r border-[var(--soma-border)] monolith-hairline flex items-center justify-between gap-4 group hover:bg-[var(--soma-surface)] transition-colors rounded-none"
          >
            <div className="space-y-1">
              <span className="text-[11px] font-medium text-[var(--soma-amber-ink)] block">
                {language === 'es' ? 'Archivo general del estudio' : 'Studio main index'}
              </span>
              <span className="text-lg sm:text-2xl font-swiss font-semibold text-[var(--soma-fg)] tracking-tight block">
                {language === 'es'
                  ? '← Volver al portafolio de Zyrvae'
                  : '← Return to Zyrvae portfolio'}
              </span>
            </div>
            <ArrowRight
              size={18}
              className="text-[var(--soma-muted)] group-hover:text-[var(--soma-fg)] group-hover:translate-x-1 transition-all shrink-0"
            />
          </Link>

          <a
            href="#soma-hero"
            onClick={(e) => scrollToSection(e, 'soma-hero')}
            className="md:col-span-4 p-6 sm:p-8 flex items-center justify-between gap-4 group hover:bg-[var(--soma-surface)] transition-colors rounded-none"
          >
            <div className="space-y-1">
              <span className="text-[11px] font-medium text-[var(--soma-muted)] block tabular-nums">
                04 / Sōma Formulations
              </span>
              <span className="text-sm font-swiss font-medium text-[var(--soma-fg)] block">
                {language === 'es' ? 'Volver arriba' : 'Back to top'}
              </span>
            </div>
            <ArrowUp
              size={16}
              className="text-[var(--soma-muted)] group-hover:text-[var(--soma-fg)] group-hover:-translate-y-0.5 transition-all shrink-0"
            />
          </a>
        </div>
      </section>
    </>
  );
});
SomaStaticSectionsAfterCatalog.displayName = 'SomaStaticSectionsAfterCatalog';

export const SomaCommerceExperience: React.FC<SomaCommerceExperienceProps> = ({ project }) => {
  const { language } = useLanguage();

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    scrollToSection(e, id);
  }, []);

  return (
    <div className="soma-apothecary min-h-screen min-h-svh bg-[var(--soma-bg)] text-[var(--soma-fg)] pt-[56px] sm:pt-[60px] pb-16 sm:pb-24 font-swiss transition-colors duration-200 selection:bg-[#C87D55]/25 selection:text-[var(--soma-fg)] rounded-none">
      {/* 1. SUB-HEADER CONTINUO DE RETÍCULA (0.5px, bordes rectos 0px) */}
      <header className="sticky top-[56px] sm:top-[60px] z-30 bg-[var(--soma-header-bg)] backdrop-blur-md border-b border-[var(--soma-border)] monolith-hairline text-[var(--soma-fg)] font-swiss rounded-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0 flex items-stretch justify-between h-12 gap-2">
          {/* Izquierda: Volver a Zyrvae */}
          <div className="flex items-center shrink-0">
            <Link
              href="/#work"
              className="inline-flex items-center space-x-2 text-xs font-swiss font-medium text-[var(--soma-muted)] hover:text-[var(--soma-fg)] transition-colors pr-3 sm:pr-4 border-r border-[var(--soma-border)] monolith-hairline h-full whitespace-nowrap rounded-none"
              aria-label="Return to Zyrvae portfolio"
            >
              <ArrowLeft size={13} />
              <span>{language === 'es' ? 'Volver a Zyrvae' : 'Back to Zyrvae'}</span>
            </Link>
          </div>

          {/* Centro: 04 / Sōma Formulations — Apotecario Celular */}
          <div className="hidden md:flex items-center px-2 lg:px-4 font-swiss text-xs font-medium text-[var(--soma-fg)]/90 tracking-[0.015em] truncate tabular-nums">
            <span>04 / Sōma Formulations — Apotecario Celular</span>
          </div>

          {/* Enlaces Internos Limpios */}
          <nav
            aria-label="Store Navigation"
            className="hidden lg:flex items-center space-x-6 text-xs font-swiss font-medium text-[var(--soma-muted)] whitespace-nowrap"
          >
            <a
              href="#soma-philosophy"
              onClick={(e) => handleNavClick(e, 'soma-philosophy')}
              className="hover:text-[var(--soma-fg)] transition-colors"
            >
              {language === 'es' ? 'Manifiesto' : 'Manifesto'}
            </a>
            <a
              href="#soma-3d-showcase"
              onClick={(e) => handleNavClick(e, 'soma-3d-showcase')}
              className="hover:text-[var(--soma-fg)] transition-colors"
            >
              {language === 'es' ? 'Escaparate 3D' : '3D Showcase'}
            </a>
            <a
              href="#soma-catalog"
              onClick={(e) => handleNavClick(e, 'soma-catalog')}
              className="hover:text-[var(--soma-fg)] transition-colors"
            >
              {language === 'es' ? 'Dispensario' : 'Dispensary'}
            </a>
            <a
              href="#soma-science"
              onClick={(e) => handleNavClick(e, 'soma-science')}
              className="hover:text-[var(--soma-fg)] transition-colors"
            >
              {language === 'es' ? 'Ciencia Miron' : 'Miron Science'}
            </a>
          </nav>

          {/* Derecha: Botón recto Bolsa (n) aislado para evitar re-renders del resto de la página */}
          <div className="flex items-stretch shrink-0">
            <SomaBagHeaderButton language={language} />
          </div>
        </div>
      </header>

      <main>
        {/* 2. HERO EDITORIAL: SŌMA + Instrument Serif Itálica + Cero Pills Flotantes */}
        <section
          id="soma-hero"
          className="relative min-h-[82svh] sm:min-h-[86svh] flex flex-col justify-between overflow-hidden border-b border-[var(--soma-border)] monolith-hairline bg-[#09080D]"
          aria-label="SOMA Hero"
        >
          {/* Fotografía Hero (priority para LCP) */}
          <motion.div
            layoutId={`case-study-image-${project.slug}`}
            style={{ viewTransitionName: `case-study-image-${project.slug}` }}
            className="absolute inset-0 z-0"
          >
            <Image
              src="/images/soma-hero-editorial.webp"
              alt="SOMA Formulations - Apotecario molecular en vidrio biofotónico Miron"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09080D]/90 via-[#09080D]/55 to-[#09080D]/40" />
          </motion.div>

          {/* Cota Superior en Retícula (Sin cápsulas flotantes) */}
          <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-swiss text-[#B8B4C2] border-b border-white/15 pb-3 tabular-nums">
              <div className="flex items-center space-x-2 text-[#F3F1EC]">
                <span className="w-1.5 h-1.5 bg-[#C87D55] inline-block shrink-0" />
                <span className="text-[11px] font-medium">
                  {language === 'es'
                    ? 'Apotecario molecular · Vidrio biofotónico Miron'
                    : 'Molecular apothecary · Miron biophotonic glass'}
                </span>
              </div>
              <div className="text-[11px] font-medium text-[#B8B4C2] tabular-nums">
                {language === 'es' ? 'Cosecha 2025 · Lote N° 08 · Basilea / Patagonia' : 'Harvest 2025 · Batch No. 08 · Basel / Patagonia'}
              </div>
            </div>
          </div>

          {/* Título Monumental + Subtítulo Serif Itálica */}
          <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="max-w-4xl space-y-6">
              <motion.h1
                layoutId={`case-study-title-${project.slug}`}
                style={{ viewTransitionName: `case-study-title-${project.slug}` }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65 }}
                className="text-[#F3F1EC] leading-[1.02] tracking-tight"
              >
                <span className="block text-5xl sm:text-7xl lg:text-9xl font-display-zyrvae font-extrabold uppercase">
                  SŌMA
                </span>
                <span className="block text-2xl sm:text-4xl lg:text-5xl font-serif-editorial italic text-[#F3F1EC]/95 font-normal mt-2">
                  {language === 'es'
                    ? '«Biotecnología celular & rituales puros.»'
                    : '“Cellular biotechnology & pure rituals.”'}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.15 }}
                className="text-base sm:text-lg text-[#D5D1C8] font-swiss font-light max-w-2xl leading-relaxed"
              >
                {SOMA_STUDIO_META.mission[language]}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.25 }}
                className="pt-2 flex flex-wrap items-center gap-3 text-xs font-swiss font-medium"
              >
                <a
                  href="#soma-catalog"
                  onClick={(e) => handleNavClick(e, 'soma-catalog')}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-[#F3F1EC] text-[#0A0A0C] hover:bg-[#C87D55] transition-colors rounded-none"
                >
                  <span>{language === 'es' ? 'Explorar dispensario' : 'Explore dispensary'}</span>
                  <ArrowDown size={13} />
                </a>

                <a
                  href="#soma-science"
                  onClick={(e) => handleNavClick(e, 'soma-science')}
                  className="inline-flex items-center px-6 py-3 bg-transparent hover:bg-white/10 text-[#F3F1EC] border border-white/25 transition-colors rounded-none"
                >
                  {language === 'es' ? 'Ciencia biofotónica' : 'Biophotonic science'}
                </a>
              </motion.div>
            </div>
          </div>

          {/* Fila Inferior de Retícula del Hero */}
          <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8 border-t border-white/15">
            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-swiss text-[#B8B4C2] tabular-nums">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-medium">
                <span className="text-[#F3F1EC]">Fitopéptidos</span>
                <span className="text-white/25">/</span>
                <span>Ceramidas puras</span>
                <span className="text-white/25">/</span>
                <span>Escualano de oliva</span>
                <span className="text-white/25">/</span>
                <span>Bakuchiol 2%</span>
              </div>

              <div className="flex items-center space-x-2 text-[#F3F1EC] font-medium">
                <Truck size={13} className="text-[#C87D55] shrink-0" />
                <span>
                  {language === 'es'
                    ? 'Envío neutro en carbono sin cargo desde $120 USD'
                    : 'Free carbon-neutral delivery from $120 USD'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. MANIFIESTO BIOMOLECULAR */}
        <section
          id="soma-philosophy"
          className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[var(--soma-border)] monolith-hairline scroll-mt-28"
          aria-label="SOMA Philosophy"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 items-baseline pb-14 border-b border-[var(--soma-border)] monolith-hairline">
            <div className="lg:col-span-4 space-y-2">
              <span className="text-xs font-medium text-[var(--soma-amber-ink)] block">
                {language === 'es' ? 'Manifiesto biomolecular' : 'Biomolecular manifesto'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-swiss font-semibold tracking-tight text-[var(--soma-fg)]">
                {language === 'es'
                  ? 'Activos puros en su máxima potencia celular.'
                  : 'Pure actives at peak cellular potency.'}
              </h2>
            </div>

            <div className="lg:col-span-8 space-y-5">
              <p className="text-lg sm:text-2xl font-swiss font-light text-[var(--soma-fg)] leading-relaxed">
                {language === 'es'
                  ? '«No diluimos activos en rellenos sintéticos. Formulamos cosmética biocompatible que dialoga con los receptores celulares de la piel.»'
                  : '“We do not dilute actives with synthetic bulking agents. We engineer biocompatible formulas that communicate directly with cellular receptors.”'}
              </p>
              <p className="text-sm sm:text-base text-[var(--soma-muted)] font-swiss leading-relaxed">
                {SOMA_STUDIO_META.tagline[language]}
              </p>
            </div>
          </div>

          {/* 4 Pilares en Retícula Continua 0.5px */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-l border-t border-[var(--soma-border)] monolith-hairline mt-14">
            {SOMA_STUDIO_META.pillars.map((pillar, idx) => (
              <div
                key={pillar.code}
                className="p-6 bg-[var(--soma-bg)] border-r border-b border-[var(--soma-border)] monolith-hairline flex flex-col justify-between space-y-5 rounded-none"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-[11px] font-medium text-[var(--soma-muted)] border-b border-[var(--soma-border)] monolith-hairline pb-2.5 tabular-nums">
                    <span className="text-[var(--soma-amber-ink)]">
                      {pillar.code.replace(' // ', ' · ')}
                    </span>
                    <span>0{idx + 1}</span>
                  </div>

                  <h3 className="text-lg font-swiss font-semibold text-[var(--soma-fg)] tracking-tight">
                    {pillar.title[language]}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--soma-muted)] leading-relaxed">
                    {pillar.desc[language]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. CONTENEDOR DE ESPERA FASE 2: ESCAPARATE VOLUMÉTRICO 3D (#soma-3d-showcase) */}
        <section
          id="soma-3d-showcase"
          className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[var(--soma-border)] monolith-hairline scroll-mt-28"
          aria-label="SOMA 3D Showcase Preparation"
        >
          <div className="border border-[var(--soma-border)] monolith-hairline grid grid-cols-1 lg:grid-cols-12 bg-[var(--soma-bg)] rounded-none">
            {/* Columna Izquierda: Slot de Montaje para Visor 3D WebGL (Fase 2) */}
            <div
              id="soma-3d-canvas-slot"
              data-phase2-mount="soma-3d-bottle"
              className="lg:col-span-7 relative min-h-[380px] sm:min-h-[480px] border-b lg:border-b-0 lg:border-r border-[var(--soma-border)] monolith-hairline bg-[var(--soma-surface)] flex flex-col justify-between p-5 sm:p-8 overflow-hidden rounded-none"
            >
              {/* Retícula superior */}
              <div className="relative z-10 flex items-center justify-between text-[11px] font-medium text-[var(--soma-muted)] border-b border-[var(--soma-border)] monolith-hairline pb-3 tabular-nums">
                <div className="flex items-center space-x-2 text-[var(--soma-fg)]">
                  <span className="w-1.5 h-1.5 bg-[var(--soma-amber)] inline-block" />
                  <span>
                    {language === 'es'
                      ? 'Escaparate volumétrico · Contenedor Fase 2'
                      : 'Volumetric showcase · Phase 2 container'}
                  </span>
                </div>
                <span>Miron 30ml / 50ml</span>
              </div>

              {/* Zona Central Reservada para Canvas WebGL */}
              <div className="relative flex-grow flex items-center justify-center my-6">
                <div className="relative w-56 h-56 sm:w-72 sm:h-72 border border-[var(--soma-border)] monolith-hairline bg-[var(--soma-bg)] p-3 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/images/soma-01-glass.webp"
                    alt="Miron biophotonic vessel study ready for 3D viewer mount"
                    fill
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 640px) 224px, 288px"
                    className="object-cover opacity-90"
                  />
                  {/* Marcas de cruz técnicas en el centro óptico */}
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-[0.5px] bg-[var(--soma-amber)]" />
                  </div>
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="h-6 w-[0.5px] bg-[var(--soma-amber)]" />
                  </div>
                </div>
              </div>

              {/* Pie de calibración */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 text-[11px] font-medium text-[var(--soma-dim)] border-t border-[var(--soma-border)] monolith-hairline pt-3 tabular-nums">
                <span>
                  {language === 'es'
                    ? 'Nodo de montaje WebGL reservado (#soma-3d-canvas-slot)'
                    : 'Reserved WebGL mount point (#soma-3d-canvas-slot)'}
                </span>
                <span>Escala 1:1 · Refr. 1.52</span>
              </div>
            </div>

            {/* Columna Derecha: Especificaciones Técnicas del Envase Biofotónico */}
            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <span className="text-xs font-medium text-[var(--soma-amber-ink)] block">
                  {language === 'es' ? 'Arquitectura del frasco' : 'Vessel architecture'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-swiss font-semibold tracking-tight text-[var(--soma-fg)]">
                  {language === 'es'
                    ? 'Estudio óptico y geométrico Miron.'
                    : 'Miron optical & geometric study.'}
                </h2>
                <p className="text-sm text-[var(--soma-muted)] leading-relaxed">
                  {language === 'es'
                    ? 'Espacio estructurado en doble columna para albergar el visor interactivo 3D en la Fase 2, permitiendo inspeccionar la refracción ultravioleta del vidrio biofotónico y el mecanismo de dosificación sin contacto.'
                    : 'Double-column architectural frame structured to mount the interactive 3D shader vessel viewer in Phase 2, enabling real-time inspection of biophotonic glass refraction and airtight dosing geometry.'}
                </p>
              </div>

              {/* Tabla dimensional de precisión (tabular-nums, sin monospace) */}
              <div className="border-t border-[var(--soma-border)] monolith-hairline divide-y divide-[var(--soma-border)] text-xs tabular-nums">
                <div className="py-2.5 flex justify-between">
                  <span className="text-[var(--soma-muted)]">
                    {language === 'es' ? 'Altura total de ampolla' : 'Total vessel height'}
                  </span>
                  <span className="font-medium text-[var(--soma-fg)]">98.4 mm</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-[var(--soma-muted)]">
                    {language === 'es' ? 'Diámetro cilíndrico' : 'Cylindrical diameter'}
                  </span>
                  <span className="font-medium text-[var(--soma-fg)]">Ø 34.0 mm</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-[var(--soma-muted)]">
                    {language === 'es' ? 'Calibre de rosca farmacéutica' : 'Pharmaceutical thread gauge'}
                  </span>
                  <span className="font-medium text-[var(--soma-fg)]">DIN 18 / ISO</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-[var(--soma-muted)]">
                    {language === 'es' ? 'Espesor de pared violeta' : 'Violet wall thickness'}
                  </span>
                  <span className="font-medium text-[var(--soma-amber-ink)]">3.2 mm</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="#soma-catalog"
                  onClick={(e) => handleNavClick(e, 'soma-catalog')}
                  className="inline-flex items-center space-x-2 px-5 py-3 bg-[var(--soma-btn-bg)] text-[var(--soma-btn-fg)] hover:bg-[var(--soma-amber)] hover:text-[#0A0A0C] text-xs font-medium transition-colors rounded-none"
                >
                  <span>{language === 'es' ? 'Acceder al dispensario' : 'Enter dispensary'}</span>
                  <ArrowDown size={13} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 5. DISPENSARIO (#soma-catalog) CON SELLO DE LABORATORIO Y CELDAS FARMACÉUTICAS */}
        <section
          id="soma-catalog"
          data-lab-seal="Laboratorio Técnico & Prototipo Funcional"
          className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[var(--soma-border)] monolith-hairline scroll-mt-28"
          aria-label="SOMA Product Catalog — Laboratorio Técnico & Prototipo Funcional"
        >
          {/* Banda de sello técnico en tipografía editorial limpia */}
          <div className="mb-10 px-4 py-3 bg-[var(--soma-surface)] border border-[var(--soma-border)] monolith-hairline flex flex-wrap items-center justify-between gap-3 rounded-none">
            <div className="inline-flex items-center space-x-2.5">
              <Sparkles size={13} className="text-[var(--soma-amber-ink)] shrink-0" />
              <span className="text-[11px] font-medium text-[var(--soma-fg)]">
                {language === 'es'
                  ? 'Laboratorio Técnico & Prototipo Funcional'
                  : 'Technical Laboratory & Functional Prototype · Laboratorio Técnico & Prototipo Funcional'}
              </span>
            </div>
            <span className="text-[11px] font-medium text-[var(--soma-muted)] tabular-nums">
              {language === 'es'
                ? 'Dispensario biofotónico · Albarán reactivo'
                : 'Biophotonic dispensary · Reactive slip'}
            </span>
          </div>

          <SomaCatalogSection language={language} />
        </section>

        {/* 6. SECCIONES MEMORIZADAS POSTERIORES AL DISPENSARIO */}
        <SomaStaticSectionsAfterCatalog language={language} projectTitle={project.title} />
      </main>

      {/* 7. PORTAL AISLADO DE BOLSA (ALBARÁN DE DISPENSARIO) Y CHECKOUT DE LABORATORIO */}
      <SomaCartOverlay language={language} />
    </div>
  );
};
