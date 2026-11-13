'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ArrowDown, Check, Plus, RotateCw } from 'lucide-react';
import { SOMA_PRODUCTS } from '@/data/commerce';
import { addSomaCartItem } from './somaCartStore';
import type { SomaViewerMode } from './SomaProductViewer3D';

const SomaProductViewer3D = dynamic(
  () => import('./SomaProductViewer3D').then((mod) => mod.SomaProductViewer3D),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[var(--soma-surface)] text-[var(--soma-muted)] text-xs font-swiss tabular-nums">
        <div className="w-5 h-5 border border-[var(--soma-border)] border-t-[var(--soma-amber)] animate-spin mb-2 rounded-none" />
        <span>Calibrando cámara óptica...</span>
      </div>
    ),
  }
);

interface ModeSpec {
  id: SomaViewerMode;
  buttonLabel: { es: string; en: string };
  materialLabel: { es: string; en: string };
  transmission: { es: string; en: string };
  refraction: string;
  vesselIndex: 0 | 1;
}

const MODE_SPECS: ModeSpec[] = [
  {
    id: 'miron',
    buttonLabel: {
      es: '01 / Vidrio Biofotónico Miron',
      en: '01 / Miron Biophotonic Glass',
    },
    materialLabel: {
      es: 'Vidrio violeta biofotónico (n = 1.52)',
      en: 'Miron biophotonic violet glass (n = 1.52)',
    },
    transmission: {
      es: 'UVA / Violeta 45% · Espectro visible 0%',
      en: 'UV-A / Violet 45% · Visible spectrum 0%',
    },
    refraction: 'IOR 1.52 · Estudio',
    vesselIndex: 0,
  },
  {
    id: 'uv',
    buttonLabel: {
      es: '02 / Inspección Espectral UV',
      en: '02 / UV Spectral Inspection',
    },
    materialLabel: {
      es: 'Vidrio biofotónico · Haz ultravioleta rasante',
      en: 'Biophotonic glass · Raking UV beam',
    },
    transmission: {
      es: '380–420 nm selectivo · Núcleo ámbar activo',
      en: 'Selective 380–420 nm · Active amber serum',
    },
    refraction: 'λ 395 nm · Núcleo',
    vesselIndex: 0,
  },
  {
    id: 'refill',
    buttonLabel: {
      es: '03 / Cápsula Eco-Refill',
      en: '03 / Eco-Refill Capsule',
    },
    materialLabel: {
      es: 'Aluminio mineral reciclado cepillado',
      en: 'Brushed recycled mineral aluminum',
    },
    transmission: {
      es: 'Opacidad total · 0% fotodegradación térmica',
      en: 'Full opacity · 0% thermal photodegradation',
    },
    refraction: 'Alu 99.4% · Reciclado',
    vesselIndex: 1,
  },
];

interface Soma3DShowcaseProps {
  language: 'es' | 'en';
}

export const Soma3DShowcase: React.FC<Soma3DShowcaseProps> = React.memo(({ language }) => {
  const [mode, setMode] = useState<SomaViewerMode>('miron');
  const [hasIntersected, setHasIntersected] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const slotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = slotRef.current;
    if (!el || hasIntersected) return;

    if (typeof IntersectionObserver === 'undefined') {
      setHasIntersected(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setHasIntersected(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.05, rootMargin: '120px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasIntersected]);

  const activeSpec = useMemo(
    () => MODE_SPECS.find((item) => item.id === mode) ?? MODE_SPECS[0],
    [mode]
  );

  const heroProduct = SOMA_PRODUCTS[0];
  const selectedVessel = heroProduct.vessels[activeSpec.vesselIndex] ?? heroProduct.vessels[0];
  const unitPrice = heroProduct.basePrice + selectedVessel.delta;

  const handleDirectBagAdd = () => {
    const notice =
      language === 'es'
        ? `Añadido: SŌMA · 01 (${selectedVessel.name.es})`
        : `Added: SŌMA · 01 (${selectedVessel.name.en})`;
    addSomaCartItem(heroProduct, '30ml', selectedVessel, 1, notice);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1600);
  };

  const handleCatalogJump = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = document.getElementById('soma-catalog');
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="border border-[var(--soma-border)] monolith-hairline grid grid-cols-1 lg:grid-cols-12 bg-[var(--soma-bg)] rounded-none">
      {/* Columna Izquierda: Visor 3D Interactivo + Conmutador de 3 Estados */}
      <div
        ref={slotRef}
        id="soma-3d-canvas-slot"
        data-viewer-mode={mode}
        className="lg:col-span-7 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[var(--soma-border)] monolith-hairline bg-[var(--soma-surface)] rounded-none"
      >
        {/* Barra superior de telemetría de cámara */}
        <div className="px-5 sm:px-7 py-3.5 flex items-center justify-between text-[11px] font-medium text-[var(--soma-muted)] border-b border-[var(--soma-border)] monolith-hairline tabular-nums">
          <div className="flex items-center space-x-2 text-[var(--soma-fg)]">
            <span className="w-1.5 h-1.5 bg-[var(--soma-amber)] inline-block shrink-0" />
            <span>
              {language === 'es'
                ? 'Escaparate volumétrico · Visor 360°'
                : 'Volumetric showcase · 360° viewer'}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-[var(--soma-muted)]">
            <RotateCw size={12} className="text-[var(--soma-amber-ink)] shrink-0" />
            <span>
              {language === 'es' ? 'Arrastrar para rotar' : 'Drag to rotate'}
            </span>
          </div>
        </div>

        {/* Lienzo 3D WebGL (carga diferida al entrar en pantalla) */}
        <div className="relative h-[380px] sm:h-[460px] w-full overflow-hidden">
          {/* Halo espectral UV difuminado a 0% en CSS sin bordes geométricos */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
              mode === 'uv' ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background:
                'radial-gradient(circle at 50% 48%, rgba(124, 58, 237, 0.28) 0%, rgba(124, 58, 237, 0.1) 36%, rgba(124, 58, 237, 0) 70%)',
            }}
          />

          {hasIntersected ? (
            <SomaProductViewer3D mode={mode} language={language} />
          ) : (
            <div className="relative w-full h-full flex items-center justify-center p-8">
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 border border-[var(--soma-border)] monolith-hairline bg-[var(--soma-bg)] overflow-hidden">
                <Image
                  src="/images/soma-01-glass.webp"
                  alt="SOMA 01 Cellular Serum Miron biophotonic apothecary bottle"
                  fill
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 640px) 224px, 256px"
                  className="object-cover opacity-90"
                />
              </div>
            </div>
          )}

          {/* Pie técnico superpuesto mínimo */}
          <div className="pointer-events-none absolute bottom-3 left-5 right-5 flex items-center justify-between text-[11px] font-medium text-[var(--soma-dim)] tabular-nums">
            <span>SŌMA · 01 — Cellular Serum 30ml</span>
            <span>{activeSpec.refraction}</span>
          </div>
        </div>

        {/* Conmutador de 3 estados de materia y luz en retícula 0px */}
        <div
          role="group"
          aria-label={language === 'es' ? 'Estados de materia y luz' : 'Matter and lighting states'}
          className="grid grid-cols-1 sm:grid-cols-3 border-t border-[var(--soma-border)] monolith-hairline divide-y sm:divide-y-0 sm:divide-x divide-[var(--soma-border)] rounded-none"
        >
          {MODE_SPECS.map((spec) => {
            const isActive = mode === spec.id;
            return (
              <button
                key={spec.id}
                type="button"
                onClick={() => setMode(spec.id)}
                aria-pressed={isActive}
                className={`px-4 py-3.5 text-left text-[11px] font-swiss font-medium transition-colors rounded-none tabular-nums ${
                  isActive
                    ? 'bg-[var(--soma-btn-bg)] text-[var(--soma-btn-fg)]'
                    : 'bg-[var(--soma-bg)] text-[var(--soma-muted)] hover:text-[var(--soma-fg)] hover:bg-[var(--soma-surface-2)]'
                }`}
              >
                {spec.buttonLabel[language]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Columna Derecha: Telemetría Óptica Sincronizada + Botón Directo a Bolsa */}
      <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-8 rounded-none">
        <div className="space-y-4">
          <span className="text-xs font-medium text-[var(--soma-amber-ink)] block">
            {language === 'es'
              ? 'Telemetría óptica y geometría del envase'
              : 'Optical telemetry & vessel geometry'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-swiss font-semibold tracking-tight text-[var(--soma-fg)]">
            {language === 'es'
              ? 'Frasco apotecario Sōma 01.'
              : 'Sōma 01 apothecary vessel.'}
          </h2>
          <p className="text-sm text-[var(--soma-muted)] leading-relaxed">
            {language === 'es'
              ? 'Inspección volumétrica en tiempo real de hombros cilíndricos, cuello roscado DIN 18, pipeta interior con gota en suspensión y respuesta óptica según el material del envase.'
              : 'Real-time volumetric inspection of cylindrical shoulders, DIN 18 threaded neck, interior pipette with suspended amber drop, and optical behavior across vessel materials.'}
          </p>
        </div>

        {/* Tabla dimensional y espectral sincronizada (tabular-nums, sin monospace) */}
        <div className="border-t border-[var(--soma-border)] monolith-hairline divide-y divide-[var(--soma-border)] text-xs tabular-nums">
          <div className="py-3 flex items-baseline justify-between gap-4">
            <span className="text-[var(--soma-muted)] shrink-0">
              {language === 'es' ? 'Material del envase' : 'Vessel material'}
            </span>
            <span className="font-medium text-[var(--soma-fg)] text-right">
              {activeSpec.materialLabel[language]}
            </span>
          </div>

          <div className="py-3 flex items-baseline justify-between gap-4">
            <span className="text-[var(--soma-muted)] shrink-0">
              {language === 'es' ? 'Transmisión espectral' : 'Spectral transmission'}
            </span>
            <span className="font-medium text-[var(--soma-amber-ink)] text-right">
              {activeSpec.transmission[language]}
            </span>
          </div>

          <div className="py-3 flex items-baseline justify-between gap-4">
            <span className="text-[var(--soma-muted)] shrink-0">
              {language === 'es' ? 'Volumen nominal' : 'Nominal volume'}
            </span>
            <span className="font-medium text-[var(--soma-fg)] text-right">
              30 ml / 1.0 fl. oz.
            </span>
          </div>

          <div className="py-3 flex items-baseline justify-between gap-4">
            <span className="text-[var(--soma-muted)] shrink-0">
              {language === 'es' ? 'Cierre y pipeta' : 'Closure & pipette'}
            </span>
            <span className="font-medium text-[var(--soma-fg)] text-right">
              DIN 18 · Ø 34.0 × 98.4 mm
            </span>
          </div>

          <div className="py-3 flex items-baseline justify-between gap-4">
            <span className="text-[var(--soma-muted)] shrink-0">
              {language === 'es' ? 'Envase en albarán' : 'Selected vessel'}
            </span>
            <span className="font-medium text-[var(--soma-fg)] text-right">
              {selectedVessel.name[language]} · ${unitPrice} USD
            </span>
          </div>
        </div>

        {/* Acciones rectas de 0px */}
        <div className="pt-2 space-y-3">
          <button
            type="button"
            onClick={handleDirectBagAdd}
            className="w-full px-5 py-3.5 bg-[var(--soma-btn-bg)] text-[var(--soma-btn-fg)] hover:bg-[var(--soma-amber)] hover:text-[#0A0A0C] text-xs font-medium flex items-center justify-between transition-colors rounded-none tabular-nums"
          >
            <span>
              {justAdded
                ? language === 'es'
                  ? 'Formulación añadida a la bolsa'
                  : 'Formulation added to bag'
                : language === 'es'
                ? 'Añadir formulación a la bolsa +'
                : 'Add formulation to bag +'}
            </span>
            <span className="inline-flex items-center space-x-2">
              <span>${unitPrice} USD</span>
              {justAdded ? <Check size={14} /> : <Plus size={14} />}
            </span>
          </button>

          <a
            href="#soma-catalog"
            onClick={handleCatalogJump}
            className="w-full px-5 py-3 bg-transparent hover:bg-[var(--soma-surface)] text-[var(--soma-fg)] border border-[var(--soma-border)] monolith-hairline text-xs font-medium flex items-center justify-between transition-colors rounded-none"
          >
            <span>
              {language === 'es'
                ? 'Explorar las 4 formulaciones del dispensario'
                : 'Explore all 4 dispensary formulations'}
            </span>
            <ArrowDown size={13} />
          </a>
        </div>
      </div>
    </div>
  );
});

Soma3DShowcase.displayName = 'Soma3DShowcase';
