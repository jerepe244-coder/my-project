'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useSpring, useMotionTemplate, useReducedMotion } from 'motion/react';

interface ObsidianSculptureProps {
  className?: string;
}

/**
 * Escultura central de obsidiana y cristal (FIG. 01):
 * Reemplaza el octaedro procedural básico (<canvas>) por un activo visual
 * pre-renderizado de alta definición en WebP transparente 2K (/images/obsidian-crystal-2k.webp)
 * con iluminación HDRI de estudio fotográfico. Muestra la convivencia entre
 * cristal óptico traslúcido (IOR 2.42) y roca volcánica negra brillante con fractura concoidea,
 * contenida estrictamente dentro de su celda con sombra de contacto limpia y efecto
 * de inclinación (tilt/parallax) con física de resorte al mover el ratón.
 */
export const ObsidianSculpture: React.FC<ObsidianSculptureProps> = ({
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const springConfig = { stiffness: 110, damping: 16, mass: 0.7 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);
  const shiftX = useSpring(0, springConfig);
  const shiftY = useSpring(0, springConfig);
  const shadowShiftX = useSpring(0, springConfig);

  const transformStyle = useMotionTemplate`perspective(900px) translate3d(${shiftX}px, ${shiftY}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  const shadowTransform = useMotionTemplate`translate3d(${shadowShiftX}px, 0px, 0px)`;

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width * 0.5;
      const centerY = rect.top + rect.height * 0.5;

      const normX = Math.max(-1, Math.min(1, (e.clientX - centerX) / (window.innerWidth * 0.45)));
      const normY = Math.max(-1, Math.min(1, (e.clientY - centerY) / (window.innerHeight * 0.45)));

      rotateY.set(normX * 6.5);
      rotateX.set(-normY * 5.0);
      shiftX.set(normX * 5.0);
      shiftY.set(normY * 3.0);
      shadowShiftX.set(-normX * 4.5);
    };

    const handleMouseLeave = () => {
      rotateX.set(0);
      rotateY.set(0);
      shiftX.set(0);
      shiftY.set(0);
      shadowShiftX.set(0);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [prefersReducedMotion, rotateX, rotateY, shiftX, shiftY, shadowShiftX]);

  return (
    <div
      ref={containerRef}
      data-hero-sculpture="optical-center"
      aria-label="Fig. 01 — High-definition 2K pre-rendered volcanic obsidian and optical crystal sculpture"
      className={`relative w-full max-w-[230px] sm:max-w-[275px] lg:max-w-[310px] flex flex-col items-center justify-center select-none rounded-none ${className}`}
    >
      {/* Pre-rendered 2K Transparent WebP Studio Sculpture with Spring Tilt / Parallax */}
      <motion.div
        style={prefersReducedMotion ? undefined : { transform: transformStyle }}
        className="relative z-10 w-[195px] h-[195px] sm:w-[235px] sm:h-[235px] lg:w-[268px] lg:h-[268px] flex items-center justify-center will-change-transform"
      >
        <Image
          src="/images/obsidian-crystal-2k.webp"
          alt="Fig. 01 — Escultura monolítica de roca volcánica de obsidiana negra brillante y cristal óptico traslúcido facetado"
          width={2048}
          height={2048}
          priority
          sizes="(max-width: 640px) 195px, (max-width: 1024px) 235px, 268px"
          className="w-full h-full object-contain pointer-events-none select-none drop-shadow-[0_18px_28px_rgba(10,10,12,0.22)]"
        />
      </motion.div>

      {/* Clean Studio Contact Shadow + Subtle Optical Caustic Line */}
      <motion.div
        aria-hidden="true"
        style={prefersReducedMotion ? undefined : { transform: shadowTransform }}
        className="relative z-0 -mt-3 w-[150px] sm:w-[176px] h-[9px] flex flex-col items-center justify-center pointer-events-none"
      >
        {/* Core tight contact shadow beneath obsidian & crystal base */}
        <div
          style={{
            background:
              'radial-gradient(50% 50% at 50% 50%, rgba(10, 10, 12, 0.46) 0%, rgba(10, 10, 12, 0.18) 58%, rgba(10, 10, 12, 0) 100%)',
          }}
          className="w-full h-[7px] dark:opacity-85"
        />
        {/* Crisp optical caustic refraction line cast by the right crystal half */}
        <div
          style={{
            background:
              'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.72) 45%, rgba(210,225,245,0.55) 78%, rgba(255,255,255,0) 100%)',
          }}
          className="w-[74px] h-[1px] -mt-[4px] ml-8 opacity-85 dark:opacity-50"
        />
      </motion.div>
    </div>
  );
};
