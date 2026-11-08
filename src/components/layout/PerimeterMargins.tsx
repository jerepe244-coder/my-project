'use client';

import React from 'react';

/**
 * Márgenes perimetrales de imprenta (40 px a cada lado de la pantalla):
 * - Izquierda: BUENOS AIRES (rotado a 90°)
 * - Derecha: © 2026 y coordenadas (rotado a 90°)
 * Aristas vivas absolutas (border-radius: 0px) y líneas divisorias de 0.5px/1px
 * en #D8D6CE (modo claro) y #1E2024 (modo oscuro).
 */
export const PerimeterMargins: React.FC = () => {
  return (
    <>
      {/* Left 40px Print Perimeter Strip */}
      <aside
        aria-label="Left print margin — Buenos Aires"
        className="fixed top-0 bottom-0 left-0 z-40 w-[28px] sm:w-[40px] bg-zy-bg border-r border-zy-grid-line flex flex-col items-center justify-between py-8 select-none pointer-events-none rounded-none"
      >
        <span
          className="font-mono-tech text-[10px] sm:text-[11px] uppercase tracking-[0.08em] font-medium text-zy-muted whitespace-nowrap"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          ZYRVAE // MONOLITH GRID [01]
        </span>

        <span
          className="font-mono-tech text-[11px] sm:text-[12px] uppercase tracking-[0.08em] font-medium text-zy-fg whitespace-nowrap"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          BUENOS AIRES
        </span>

        <span
          className="font-mono-tech text-[10px] sm:text-[11px] uppercase tracking-[0.08em] font-medium text-zy-muted whitespace-nowrap"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          PHASE 01 — SWISS BRUTALISM
        </span>
      </aside>

      {/* Right 40px Print Perimeter Strip */}
      <aside
        aria-label="Right print margin — Copyright 2026 and coordinates"
        className="fixed top-0 bottom-0 right-0 z-40 w-[28px] sm:w-[40px] bg-zy-bg border-l border-zy-grid-line flex flex-col items-center justify-between py-8 select-none pointer-events-none rounded-none"
      >
        <span
          className="font-mono-tech text-[10px] sm:text-[11px] uppercase tracking-[0.08em] font-medium text-zy-muted whitespace-nowrap"
          style={{ writingMode: 'vertical-rl' }}
        >
          34°36′13″S 58°22′54″W
        </span>

        <span
          className="font-mono-tech text-[11px] sm:text-[12px] uppercase tracking-[0.08em] font-medium text-zy-fg whitespace-nowrap"
          style={{ writingMode: 'vertical-rl' }}
        >
          © 2026 · 34°36′S 58°22′W
        </span>

        <span
          className="font-mono-tech text-[10px] sm:text-[11px] uppercase tracking-[0.08em] font-medium text-zy-muted whitespace-nowrap"
          style={{ writingMode: 'vertical-rl' }}
        >
          ARG // UTC-03:00
        </span>
      </aside>
    </>
  );
};
