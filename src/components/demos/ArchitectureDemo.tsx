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
    <div className="rounded-none border border-white/10 bg-[#141517] text-[#F4F1EA] font-swiss">
      {/* Top Demo Bar */}
      <div className="bg-[#0C0B0A] px-5 py-3 border-b border-white/10 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center space-x-2 text-white">
          <Sparkles size={14} className="text-[#FF3B30]" />
          <span className="font-semibold uppercase tracking-wider">
            {language === 'es' ? 'DEMO INTERACTIVA' : 'INTERACTIVE DEMO'}
          </span>
          <span className="text-[#94A3B8]">| MONOLITH STUDIO</span>
        </div>
        <span className="inline-flex items-center px-2 py-0.5 rounded-none bg-white/5 text-[#94A3B8] border border-white/10 text-[10px]">
          {language === 'es' ? 'Explorador espacial y de materiales' : 'Spatial & tectonic visualizer'}
        </span>
      </div>

      <div className="p-6 md:p-8 space-y-6">
        {/* View Switcher Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-swiss text-[#94A3B8]">
              {language === 'es' ? 'Vista técnica:' : 'Drafting view:'}
            </span>
            <div className="inline-flex rounded-none bg-[#0C0B0A] p-0.5 border border-white/10">
              <button
                type="button"
                onClick={() => setActiveView('axonometric')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-none text-xs font-swiss transition-all ${
                  activeView === 'axonometric'
                    ? 'bg-[#F4F1EA] text-[#0C0B0A] font-semibold'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                <Box size={13} />
                <span>{language === 'es' ? 'Axonometría 3D' : 'Axonometric'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveView('section')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-none text-xs font-swiss transition-all ${
                  activeView === 'section'
                    ? 'bg-[#F4F1EA] text-[#0C0B0A] font-semibold'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                <Layers size={13} />
                <span>{language === 'es' ? 'Sección AA' : 'Section AA'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveView('materials')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-none text-xs font-swiss transition-all ${
                  activeView === 'materials'
                    ? 'bg-[#F4F1EA] text-[#0C0B0A] font-semibold'
                    : 'text-[#94A3B8] hover:text-white'
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
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-none bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-swiss text-[#94A3B8] hover:text-white transition-colors"
          >
            <Download size={13} className="text-white" />
            <span>
              {downloadSuccess
                ? language === 'es' ? '✓ Ficha generada' : '✓ Spec sheet generated'
                : language === 'es' ? 'Descargar ficha demo (PDF)' : 'Download demo specs (PDF)'}
            </span>
          </button>
        </div>

        {/* View Dynamic Canvas */}
        <div className="bg-[#0C0B0A] rounded-none border border-white/10 p-6 relative min-h-[320px] flex items-center justify-center">
          {activeView === 'axonometric' && (
            <div className="w-full flex flex-col items-center space-y-4">
              <div className="w-full max-w-lg aspect-video rounded-none overflow-hidden border border-white/10 bg-[#141517] p-4 flex flex-col justify-between">
                <div className="flex justify-between text-[11px] font-mono text-[#94A3B8]">
                  <span>AXIS: X: 30° / Y: 15°</span>
                  <span className="text-white">DATUM +112.4M</span>
                </div>
                {/* SVG Mini Graphic */}
                <svg viewBox="0 0 300 160" className="w-full h-32 fill-none">
                  <polygon points="150,20 230,60 150,100 70,60" stroke="#FFFFFF" strokeWidth="1.5" />
                  <polygon points="70,60 150,100 150,150 70,110" stroke="#71717A" strokeWidth="1.5" fill="#1C1D21" />
                  <polygon points="230,60 150,100 150,150 230,110" stroke="#52525B" strokeWidth="1.5" fill="#27272A" />
                  <line x1="70" y1="60" x2="70" y2="110" stroke="#FFFFFF" strokeWidth="1.5" />
                  <line x1="150" y1="20" x2="150" y2="100" stroke="#71717A" strokeDasharray="3,3" />
                </svg>
                <div className="text-center font-swiss text-[10px] text-[#94A3B8]">
                  {language === 'es' ? 'Volumetría exterior del Monolito Cívico' : 'Civic Monolith volumetric massing study'}
                </div>
              </div>
            </div>
          )}

          {activeView === 'section' && (
            <div className="w-full space-y-4">
              <div className="flex justify-between items-center text-xs font-swiss text-[#94A3B8]">
                <span>{language === 'es' ? 'Corte transversal Este-Oeste' : 'East-West transverse section'}</span>
                <span className="text-white font-mono">ESCALA 1:100</span>
              </div>
              <div className="p-4 bg-[#141517] rounded-none border border-white/10 font-swiss text-xs space-y-2 text-[#F4F1EA]">
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="font-mono text-[#94A3B8]">NIVEL 04 (+14.40M)</span>
                  <span className="text-[#94A3B8]">{language === 'es' ? 'Atrio cenital y mirador acústico' : 'Zenith atrium & acoustic observatory'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="font-mono text-[#94A3B8]">NIVEL 03 (+10.80M)</span>
                  <span className="text-[#94A3B8]">{language === 'es' ? 'Salas de investigación y mediateca' : 'Research archives & reading rooms'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="font-mono text-[#94A3B8]">NIVEL 02 (+7.20M)</span>
                  <span className="text-[#94A3B8]">{language === 'es' ? 'Galería de exhibición continua' : 'Continuous exhibition hall'}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-mono text-[#94A3B8]">NIVEL 01 (±0.00M)</span>
                  <span className="text-[#94A3B8]">{language === 'es' ? 'Pórtico cívico y plaza cubierta' : 'Civic colonnade & covered plaza'}</span>
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
                    className={`px-3 py-1.5 rounded-none text-xs font-mono transition-all ${
                      activeMaterial === mat
                        ? 'bg-[#F4F1EA] text-[#0C0B0A] font-semibold'
                        : 'bg-[#141517] border border-white/10 text-[#94A3B8] hover:text-white'
                    }`}
                  >
                    {materials[mat].code}
                  </button>
                ))}
              </div>

              <div className="p-4 bg-[#141517] rounded-none border border-white/10 space-y-3">
                <div className="flex items-baseline justify-between border-b border-white/10 pb-2">
                  <h6 className="font-swiss font-bold text-white text-base">
                    {materials[activeMaterial].name[language]}
                  </h6>
                  <span className="font-mono text-xs text-[#94A3B8]">
                    {materials[activeMaterial].code}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-swiss">
                  <div className="p-2 bg-[#0C0B0A] rounded-none border border-white/5">
                    <span className="text-[#94A3B8] block text-[10px]">{language === 'es' ? 'Densidad:' : 'Density:'}</span>
                    <span className="text-white font-mono">{materials[activeMaterial].properties.density}</span>
                  </div>
                  <div className="p-2 bg-[#0C0B0A] rounded-none border border-white/5">
                    <span className="text-[#94A3B8] block text-[10px]">{language === 'es' ? 'Comportamiento acústico:' : 'Acoustics:'}</span>
                    <span className="text-white font-mono">{materials[activeMaterial].properties.acoustic}</span>
                  </div>
                  <div className="p-2 bg-[#0C0B0A] rounded-none border border-white/5 sm:col-span-2">
                    <span className="text-[#94A3B8] block text-[10px]">{language === 'es' ? 'Tratamiento superficial:' : 'Surface finish:'}</span>
                    <span className="text-white">{materials[activeMaterial].properties.finish[language]}</span>
                  </div>
                  <div className="p-2 bg-[#0C0B0A] rounded-none border border-white/5 sm:col-span-2">
                    <span className="text-[#94A3B8] block text-[10px]">{language === 'es' ? 'Criterio sostenible:' : 'Sustainability:'}</span>
                    <span className="text-[#EAEAE6]">{materials[activeMaterial].properties.sustainability[language]}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
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
