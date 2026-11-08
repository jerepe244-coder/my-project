'use client';

import React from 'react';

/**
 * Fixed Editorial SVG Noise Overlay (2.5% opacity in dark mode, 2.2% in light mode).
 * Gives dark graphite (#0A0A0C) and architectural light (#F8F9FA) surfaces a tactile
 * brushed-aluminum / cotton-paper grain, eliminating flat digital color.
 */
export const NoiseOverlay: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      data-noise-overlay="true"
      className="zy-noise-overlay pointer-events-none fixed inset-0 z-35 select-none"
    />
  );
};
