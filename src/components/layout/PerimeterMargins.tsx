'use client';

import React from 'react';

/**
 * Márgenes perimetrales de imprenta (40 px a cada lado de la pantalla):
 * - Izquierda: Buenos Aires (rotado a 90°) + cotas de registro (#94A3B8)
 * - Derecha: © 2026 y coordenadas (rotado a 90°) + cotas de registro (#94A3B8)
 * Grotesca suiza neutra en caja mixta (Sentence case), 10px, font-medium (500), tracking 0.015em.
 */
export const PerimeterMargins: React.FC = () => {
  return (
    <>
      {/* Left 40px Print Perimeter Strip */}
      <aside
        aria-label="Left print margin — BUENOS AIRES"
        className="fixed top-0 bottom-0 left-0 z-40 w-[28px] sm:w-[40px] bg-zy-bg border-r border-zy-grid-line monolith-hairline flex flex-col items-center justify-between py-7 select-none pointer-events-none rounded-none"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="font-cota text-[9px] text-[#94A3B8]">00.1</span>
          <span
            className="font-editorial-micro text-[10px] font-medium tracking-[0.015em] normal-case text-zy-muted whitespace-nowrap"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            Zyrvae · Monolith Grid [02]
          </span>
        </div>

        <div className="flex flex-col items-center gap-3">
          <svg
            aria-hidden="true"
            viewBox="0 0 9 9"
            className="w-[7px] h-[7px] text-[#94A3B8]"
          >
            <path d="M4.5 0V9M0 4.5H9" stroke="currentColor" strokeWidth="0.75" />
          </svg>
          <span
            data-label="BUENOS AIRES"
            className="font-editorial-micro text-[10px] font-medium tracking-[0.015em] normal-case text-zy-fg whitespace-nowrap"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            Buenos Aires, Argentina
          </span>
          <span className="font-cota text-[9px] text-[#94A3B8]">34.68°</span>
        </div>

        <div className="flex flex-col items-center gap-3">
          <span
            className="font-editorial-micro text-[10px] font-medium tracking-[0.015em] normal-case text-zy-muted whitespace-nowrap"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            Phase 02 — Editorial Sheet
          </span>
          <span className="font-cota text-[9px] text-[#94A3B8]">01.198</span>
        </div>
      </aside>

      {/* Right 40px Print Perimeter Strip */}
      <aside
        aria-label="Right print margin — Copyright 2026 and coordinates"
        className="fixed top-0 bottom-0 right-0 z-40 w-[28px] sm:w-[40px] bg-zy-bg border-l border-zy-grid-line monolith-hairline flex flex-col items-center justify-between py-7 select-none pointer-events-none rounded-none"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="font-cota text-[9px] text-[#94A3B8]">58.38°</span>
          <span
            className="font-editorial-micro text-[10px] font-medium tracking-[0.015em] normal-case text-zy-muted whitespace-nowrap"
            style={{ writingMode: 'vertical-rl' }}
          >
            Lat. 34°36′13″S · Long. 58°22′54″W
          </span>
        </div>

        <div className="flex flex-col items-center gap-3">
          <svg
            aria-hidden="true"
            viewBox="0 0 9 9"
            className="w-[7px] h-[7px] text-[#94A3B8]"
          >
            <path d="M4.5 0V9M0 4.5H9" stroke="currentColor" strokeWidth="0.75" />
          </svg>
          <span
            className="font-editorial-micro text-[10px] font-medium tracking-[0.015em] normal-case text-zy-fg whitespace-nowrap"
            style={{ writingMode: 'vertical-rl' }}
          >
            © 2026 · 34°36′S 58°22′W
          </span>
          <span className="font-cota text-[9px] text-[#94A3B8]">02.410</span>
        </div>

        <div className="flex flex-col items-center gap-3">
          <span
            className="font-editorial-micro text-[10px] font-medium tracking-[0.015em] normal-case text-zy-muted whitespace-nowrap"
            style={{ writingMode: 'vertical-rl' }}
          >
            Buenos Aires · UTC-03:00
          </span>
          <span className="font-cota text-[9px] text-[#94A3B8]">01.0</span>
        </div>
      </aside>
    </>
  );
};
