'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface SymbolLogoProps {
  className?: string;
  size?: number;
  animate?: boolean;
  showPlate?: boolean;
  showBlueprint?: boolean;
}

export const SymbolLogo: React.FC<SymbolLogoProps> = ({
  className = '',
  size = 32,
  animate = false,
  showPlate = true,
  showBlueprint = false,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = animate && !prefersReducedMotion;

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 48 48"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {/* Background architectural plate (optional) */}
        {showPlate && (
          <rect
            x="2"
            y="2"
            width="44"
            height="44"
            rx="8"
            fill="var(--zy-logo-plate)"
            stroke="var(--zy-border)"
            strokeWidth="1.25"
          />
        )}

        {/* Blueprint construction hairlines (when rendered as architectural specimen) */}
        {showBlueprint && (
          <g className="opacity-65">
            {/* Outer architectural frame */}
            <rect
              x="3"
              y="3"
              width="42"
              height="42"
              rx="6"
              stroke="var(--zy-border)"
              strokeWidth="0.6"
            />
            {/* Horizontal & vertical datum axes */}
            <line
              x1="3"
              y1="14"
              x2="45"
              y2="14"
              stroke="var(--zy-border-strong)"
              strokeWidth="0.5"
              strokeDasharray="1.5 1.5"
            />
            <line
              x1="3"
              y1="34"
              x2="45"
              y2="34"
              stroke="var(--zy-border-strong)"
              strokeWidth="0.5"
              strokeDasharray="1.5 1.5"
            />
            <line
              x1="11"
              y1="3"
              x2="11"
              y2="45"
              stroke="var(--zy-border-strong)"
              strokeWidth="0.5"
              strokeDasharray="1.5 1.5"
            />
            <line
              x1="37"
              y1="3"
              x2="37"
              y2="45"
              stroke="var(--zy-border-strong)"
              strokeWidth="0.5"
              strokeDasharray="1.5 1.5"
            />
            {/* Datum crosshair at (28, 24) */}
            <line
              x1="28"
              y1="6"
              x2="28"
              y2="42"
              stroke="var(--zy-blue)"
              strokeOpacity="0.3"
              strokeWidth="0.5"
              strokeDasharray="1 1.5"
            />
            <line
              x1="6"
              y1="24"
              x2="42"
              y2="24"
              stroke="var(--zy-blue)"
              strokeOpacity="0.3"
              strokeWidth="0.5"
              strokeDasharray="1 1.5"
            />
            {/* Precision ring around datum coordinate */}
            <circle
              cx="28"
              cy="24"
              r="5.5"
              stroke="var(--zy-blue)"
              strokeOpacity="0.45"
              strokeWidth="0.65"
            />
            {/* Vertex registration squares */}
            <rect x="35.75" y="12.75" width="2.5" height="2.5" stroke="var(--zy-muted)" strokeWidth="0.6" />
            <rect x="9.75" y="32.75" width="2.5" height="2.5" stroke="var(--zy-muted)" strokeWidth="0.6" />
          </g>
        )}

        {/* Top horizontal line */}
        <motion.line
          x1="11"
          y1="14"
          x2="37"
          y2="14"
          stroke="var(--zy-fg)"
          strokeWidth="2.6"
          strokeLinecap="square"
          initial={shouldAnimate ? { pathLength: 0 } : false}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Diagonal dynamic axis */}
        <motion.line
          x1="37"
          y1="14"
          x2="11"
          y2="34"
          stroke="var(--zy-fg)"
          strokeWidth="2.6"
          strokeLinecap="square"
          initial={shouldAnimate ? { pathLength: 0 } : false}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Base horizontal line */}
        <motion.line
          x1="11"
          y1="34"
          x2="37"
          y2="34"
          stroke="var(--zy-fg)"
          strokeWidth="2.6"
          strokeLinecap="square"
          initial={shouldAnimate ? { pathLength: 0 } : false}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.55, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Electric blue precision vertical anchor */}
        <motion.line
          x1="11"
          y1="14"
          x2="11"
          y2="21.5"
          stroke="var(--zy-blue)"
          strokeWidth="2.6"
          strokeLinecap="square"
          initial={shouldAnimate ? { pathLength: 0 } : false}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.38, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Geometric datum coordinate dot */}
        <motion.circle
          cx="28"
          cy="24"
          r="2.4"
          fill="var(--zy-blue)"
          initial={shouldAnimate ? { scale: 0, opacity: 0 } : false}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.28, delay: 0.42 }}
        />
      </svg>
    </div>
  );
};
