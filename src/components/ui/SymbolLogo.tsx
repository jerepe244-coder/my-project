'use client';

import React from 'react';
import { motion } from 'motion/react';

interface SymbolLogoProps {
  className?: string;
  size?: number;
  animate?: boolean;
}

export const SymbolLogo: React.FC<SymbolLogoProps> = ({
  className = '',
  size = 32,
  animate = false,
}) => {
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
        {/* Background dark subtle plate */}
        <rect
          x="2"
          y="2"
          width="44"
          height="44"
          rx="10"
          fill="#101216"
          stroke="#1e232d"
          strokeWidth="1.5"
        />

        {/* Outer assembly guidelines */}
        <motion.line
          x1="10"
          y1="14"
          x2="38"
          y2="14"
          stroke="#f4f5f8"
          strokeWidth="2.75"
          strokeLinecap="round"
          initial={animate ? { pathLength: 0 } : false}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Diagonal dynamic axis */}
        <motion.line
          x1="38"
          y1="14"
          x2="10"
          y2="34"
          stroke="#f4f5f8"
          strokeWidth="2.75"
          strokeLinecap="round"
          initial={animate ? { pathLength: 0 } : false}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Base horizontal terminal */}
        <motion.line
          x1="10"
          y1="34"
          x2="38"
          y2="34"
          stroke="#f4f5f8"
          strokeWidth="2.75"
          strokeLinecap="round"
          initial={animate ? { pathLength: 0 } : false}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Electric blue precision anchor */}
        <motion.line
          x1="10"
          y1="14"
          x2="10"
          y2="22"
          stroke="#0a5cff"
          strokeWidth="2.75"
          strokeLinecap="round"
          initial={animate ? { scaleY: 0 } : false}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.4, delay: 0.45 }}
        />

        {/* Subtle geometric vertex dot */}
        <motion.circle
          cx="28"
          cy="24"
          r="2.5"
          fill="#0a5cff"
          initial={animate ? { scale: 0, opacity: 0 } : false}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.55 }}
        />
      </svg>
    </div>
  );
};
