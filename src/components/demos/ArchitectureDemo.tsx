'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Sparkles, Layers, Box, Compass, Download } from 'lucide-react';

export const ArchitectureDemo: React.FC = () => {
  const { language } = useLanguage();
  const [activeView, setActiveView] = useState<'axonometric' | 'section' | 'materials'>('axonometric');
  const [activeMaterial, setActiveMaterial] = useState<'concrete' | 'steel' | 'glass'>('concrete');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const materials = {
    concrete: {
      code: 'CON-C50/60',
      name: { es: 'Hormigón Visto con Textura de Tabla', en: 'Board-Formed Architectural Concrete' },
      properties: {
        density: '2,400 kg/m³',
        finish: { es: 'Encofrado de alerce rugoso con hidrorrepelente mate', en: 'Rough larch timber formwork with matte repellent' },
        acoustic: 'NRC 0.15 (Reflexión difusa controlada)',
        sustainability: { es: '40% clínker sustituido por escoria granulada', en: '40% clinker replaced with granulated slag' },
      },
    },
    steel: {
      code: 'STL-S355-OX',
      name: { es: 'Acero Estructural con Pátina Negra', en: 'Blackened Weathered Structural Steel' },
      properties: {
        density: '7,850 kg/m³',
        finish: { es: 'Oxidación controlada con sellado en cera de abejas', en: 'Controlled oxidation with natural beeswax sealing' },
        acoustic: 'NRC 0.05',
        sustainability: { es: '100% acero reciclado en horno de arco eléctrico', en: '100% EAF recycled steel content' },
      },
    },
    glass: {
      code: 'GLS-TRIP-LOWE',
      name: { es: 'Vidrio Laminado Acústico Triple', en: 'Low-Iron Triple Acoustic Laminated Glass' },
      properties: {
        density: '2,500 kg/m³',
        finish: { es: 'Capa antirreflectante de alta transmisión lumínica (92%)', en: 'Anti-reflective multi-coating, 92% light transmission' },
        acoustic: 'Rw 48 dB (Aislamiento acústico de alto espectro)',
        sustainability: { es: 'Valor U = 0.6 W/(m²K) estándar Passivhaus', en: 'U-value = 0.6 W/(m²K) Passivhaus certified' },
      },
    },
  };

  const handleDownloadDemo = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="rounded-2xl border border-zy-border bg-zy-card overflow-hidden text-zy-fg font-sans shadow-sm">
      {/* Top Demo Bar */}
      <div className="bg-zy-surface px-5 py-3 border-b border-zy-border flex items-center justify-between text-xs font-mono">
        <div className="flex items-center space-x-2 text-zy-blue">
          <Sparkles size={14} />
          <span className="font-semibold uppercase tracking-wider">
            {language === 'es' ? 'DEMO INTERACTIVA' : 'INTERACTIVE DEMO'}
          </span>
          <span className="text-zy-dim">| VECTRA ARCHITECTS</span>
        </div>
        <span className="inline-flex items-center px-2 py-0.5 rounded bg-zy-control text-zy-muted border border-zy-border-subtle text-[10px]">
          {language === 'es' ? 'Explorador espacial y de materiales' : 'Spatial & tectonic visualizer'}
        </span>
      </div>

      <div className="p-6 md:p-8 space-y-6">
        {/* View Switcher Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-zy-border-subtle">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono text-zy-dim uppercase">
              {language === 'es' ? 'Vista técnica:' : 'Drafting view:'}
            </span>
            <div className="inline-flex rounded-lg bg-zy-surface p-1 border border-zy-border">
              <button
                type="button"
                onClick={() => setActiveView('axonometric')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-mono transition-all ${
                  activeView === 'axonometric'
                    ? 'bg-zy-blue text-white font-semibold'
                    : 'text-zy-muted hover:text-zy-fg'
                }`}
              >
                <Box size={13} />
                <span>{language === 'es' ? 'Axonometría 3D' : 'Axonometric'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveView('section')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-mono transition-all ${
                  activeView === 'section'
                    ? 'bg-zy-blue text-white font-semibold'
                    : 'text-zy-muted hover:text-zy-fg'
                }`}
              >
                <Layers size={13} />
                <span>{language === 'es' ? 'Sección AA' : 'Section AA'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveView('materials')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-mono transition-all ${
                  activeView === 'materials'
                    ? 'bg-zy-blue text-white font-semibold'
                    : 'text-zy-muted hover:text-zy-fg'
                }`}
              >
                <Compass size={13} />
                <span>{language === 'es' ? 'Matriz Tectónica' : 'Material Matrix'}</span>
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDownloadDemo}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-zy-control hover:bg-zy-control-hover border border-zy-border text-xs font-mono text-zy-fg-secondary hover:text-zy-fg transition-colors"
          >
            <Download size={13} className="text-zy-blue" />
            <span>
              {downloadSuccess
                ? language === 'es' ? '✓ Ficha generada' : '✓ Spec sheet generated'
                : language === 'es' ? 'Descargar ficha demo (PDF)' : 'Download demo specs (PDF)'}
            </span>
          </button>
        </div>

        {/* View Dynamic Canvas */}
        <div className="bg-zy-surface rounded-xl border border-zy-border p-6 relative min-h-[320px] flex items-center justify-center">
          {activeView === 'axonometric' && (
            <div className="w-full flex flex-col items-center space-y-4">
              <div className="w-full max-w-lg aspect-video rounded-lg overflow-hidden border border-zy-border bg-zy-card p-4 flex flex-col justify-between shadow-sm">
                <div className="flex justify-between text-[11px] font-mono text-zy-dim">
                  <span>AXIS: X: 30° / Y: 15°</span>
                  <span className="text-zy-blue">DATUM +112.4M</span>
                </div>
                {/* SVG Mini Graphic */}
                <svg viewBox="0 0 300 160" className="w-full h-32 fill-none">
                  <polygon points="150,20 230,60 150,100 70,60" stroke="var(--zy-blue)" strokeWidth="1.5" />
                  <polygon points="70,60 150,100 150,150 70,110" stroke="var(--zy-border-strong)" strokeWidth="1.5" fill="var(--zy-surface)" />
                  <polygon points="230,60 150,100 150,150 230,110" stroke="var(--zy-border)" strokeWidth="1.5" fill="var(--zy-card-alt)" />
                  <line x1="70" y1="60" x2="70" y2="110" stroke="var(--zy-blue)" strokeWidth="1.5" />
                  <line x1="150" y1="20" x2="150" y2="100" stroke="var(--zy-dim)" strokeDasharray="3,3" />
                </svg>
                <div className="text-center font-mono text-[10px] text-zy-muted">
                  {language === 'es' ? 'Volumetría exterior del Monolito Cívico' : 'Civic Monolith volumetric massing study'}
                </div>
              </div>
            </div>
          )}

          {activeView === 'section' && (
            <div className="w-full space-y-4">
              <div className="flex justify-between items-center text-xs font-mono text-zy-muted">
                <span>{language === 'es' ? 'CORTE TRANSVERSAL ESTE-OESTE' : 'EAST-WEST TRANSVERSE SECTION'}</span>
                <span className="text-zy-blue">ESCALA 1:100</span>
              </div>
              <div className="p-4 bg-zy-card rounded border border-zy-border font-mono text-xs space-y-2 text-zy-fg-secondary">
                <div className="flex justify-between py-1 border-b border-zy-border-subtle">
                  <span>NIVEL 04 (+14.40M)</span>
                  <span className="text-zy-muted">{language === 'es' ? 'Atrio cenital y mirador acústico' : 'Zenith atrium & acoustic observatory'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zy-border-subtle">
                  <span>NIVEL 03 (+10.80M)</span>
                  <span className="text-zy-muted">{language === 'es' ? 'Salas de investigación y mediateca' : 'Research archives & reading rooms'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zy-border-subtle">
                  <span>NIVEL 02 (+7.20M)</span>
                  <span className="text-zy-muted">{language === 'es' ? 'Galería de exhibición continua' : 'Continuous exhibition hall'}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>NIVEL 01 (±0.00M)</span>
                  <span className="text-zy-muted">{language === 'es' ? 'Pórtico cívico y plaza cubierta' : 'Civic colonnade & covered plaza'}</span>
                </div>
              </div>
            </div>
          )}

          {activeView === 'materials' && (
            <div className="w-full space-y-4">
              <div className="flex space-x-2">
                {(['concrete', 'steel', 'glass'] as const).map((mat) => (
                  <button
                    key={mat}
                    type="button"
                    onClick={() => setActiveMaterial(mat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      activeMaterial === mat
                        ? 'bg-zy-blue text-white font-semibold'
                        : 'bg-zy-card border border-zy-border text-zy-muted hover:text-zy-fg'
                    }`}
                  >
                    {materials[mat].code}
                  </button>
                ))}
              </div>

              <div className="p-4 bg-zy-card rounded-xl border border-zy-border space-y-3">
                <div className="flex items-baseline justify-between border-b border-zy-border-subtle pb-2">
                  <h6 className="font-sans font-bold text-zy-fg text-base">
                    {materials[activeMaterial].name[language]}
                  </h6>
                  <span className="font-mono text-xs text-zy-blue">
                    {materials[activeMaterial].code}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-2 bg-zy-surface rounded">
                    <span className="text-zy-dim block">{language === 'es' ? 'Densidad:' : 'Density:'}</span>
                    <span className="text-zy-fg">{materials[activeMaterial].properties.density}</span>
                  </div>
                  <div className="p-2 bg-zy-surface rounded">
                    <span className="text-zy-dim block">{language === 'es' ? 'Comportamiento acústico:' : 'Acoustics:'}</span>
                    <span className="text-zy-fg">{materials[activeMaterial].properties.acoustic}</span>
                  </div>
                  <div className="p-2 bg-zy-surface rounded sm:col-span-2">
                    <span className="text-zy-dim block">{language === 'es' ? 'Tratamiento superficial:' : 'Surface finish:'}</span>
                    <span className="text-zy-fg">{materials[activeMaterial].properties.finish[language]}</span>
                  </div>
                  <div className="p-2 bg-zy-surface rounded sm:col-span-2">
                    <span className="text-zy-dim block">{language === 'es' ? 'Criterio sostenible:' : 'Sustainability:'}</span>
                    <span className="text-zy-blue">{materials[activeMaterial].properties.sustainability[language]}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
