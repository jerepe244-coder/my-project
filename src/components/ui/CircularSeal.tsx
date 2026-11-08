'use client';

import React from 'react';

interface CircularSealProps {
  size?: number;
  className?: string;
}

/**
 * Módulo de Firma: Sello tipográfico circular de 70 px de diámetro
 * con texto perimetral (ZYRVAE · BS.AS. · ARG) y una Z monolítica en el centro.
 */
export const CircularSeal: React.FC<CircularSealProps> = ({
  size = 70,
  className = '',
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none shrink-0 rounded-none ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
      aria-label="ZYRVAE · BS.AS. · ARG — Monolithic Seal"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 70 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[70px] h-[70px] block text-zy-fg group"
      >
        <defs>
          <path
            id="zyrvae-seal-perimeter"
            d="M 35, 35 m -26.5, 0 a 26.5,26.5 0 1,1 53,0 a 26.5,26.5 0 1,1 -53,0"
          />
        </defs>

        {/* Outer lithographic stamp ring */}
        <circle
          cx="35"
          cy="35"
          r="34"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeOpacity="0.85"
        />

        {/* Inner core enclosure ring */}
        <circle
          cx="35"
          cy="35"
          r="18.5"
          stroke="currentColor"
          strokeWidth="0.6"
          strokeOpacity="0.55"
        />

        {/* Subtle cardinal registration ticks */}
        <line x1="35" y1="1" x2="35" y2="4" stroke="currentColor" strokeWidth="0.6" />
        <line x1="35" y1="66" x2="35" y2="69" stroke="currentColor" strokeWidth="0.6" />
        <line x1="1" y1="35" x2="4" y2="35" stroke="currentColor" strokeWidth="0.6" />
        <line x1="66" y1="35" x2="69" y2="35" stroke="currentColor" strokeWidth="0.6" />

        {/* Perimeter Technical Micro-Typography: ZYRVAE · BS.AS. · ARG */}
        <g className="origin-center transition-transform duration-700 ease-out group-hover:rotate-45">
          <text
            fill="currentColor"
            className="font-editorial-micro"
            style={{
              fontSize: '5.55px',
              fontWeight: 500,
              letterSpacing: '0.12em',
            }}
          >
            <textPath href="#zyrvae-seal-perimeter" startOffset="0%">
              ZYRVAE · BS.AS. · ARG · ZYRVAE · BS.AS. · ARG ·
            </textPath>
          </text>
        </g>

        {/* Monolithic Central Z */}
        <path
          d="M26.5 26.5H43.5V29.8L31.6 40.2H43.5V43.5H26.5V40.2L38.4 29.8H26.5V26.5Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
};
