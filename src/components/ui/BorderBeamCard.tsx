'use client';

import React, { useEffect, useRef } from 'react';

interface BorderBeamOverlayProps {
  /** Radius in pixels of the cursor-following border spotlight */
  size?: number;
  /** Whether to also render a subtle 3D surface radial sheen */
  showSurfaceGlow?: boolean;
  className?: string;
}

/**
 * Awwwards-level reactive 1px border beam & surface spotlight that tracks
 * cursor coordinates directly on the DOM node (zero React re-renders, GPU composited).
 */
export const BorderBeamOverlay: React.FC<BorderBeamOverlayProps> = ({
  size = 420,
  showSurfaceGlow = true,
  className = '',
}) => {
  const borderRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const borderEl = borderRef.current;
    const glowEl = glowRef.current;
    const parent = borderEl?.parentElement;
    if (!borderEl || !parent) return;

    const finePointer =
      typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;
    if (!finePointer) return;

    let rafId = 0;

    const handlePointerMove = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = parent.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        borderEl.style.opacity = '1';
        borderEl.style.background = `radial-gradient(${size}px circle at ${x}px ${y}px, rgba(10, 92, 255, 0.9), rgba(120, 175, 255, 0.38) 38%, transparent 72%)`;

        if (glowEl && showSurfaceGlow) {
          glowEl.style.opacity = '1';
          glowEl.style.background = `radial-gradient(${Math.round(
            size * 1.25
          )}px circle at ${x}px ${y}px, rgba(10, 92, 255, 0.065), transparent 68%)`;
        }
      });
    };

    const handlePointerLeave = () => {
      if (rafId) cancelAnimationFrame(rafId);
      borderEl.style.opacity = '0';
      if (glowEl) {
        glowEl.style.opacity = '0';
      }
    };

    parent.addEventListener('mousemove', handlePointerMove, { passive: true });
    parent.addEventListener('mouseleave', handlePointerLeave, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      parent.removeEventListener('mousemove', handlePointerMove);
      parent.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, [size, showSurfaceGlow]);

  return (
    <>
      {/* 1px Reactive Border Beam Mask */}
      <div
        ref={borderRef}
        aria-hidden="true"
        data-border-beam="true"
        style={{
          padding: '1px',
          WebkitMask:
            'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
        className={`pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-300 ease-out ${className}`}
      />
      {/* Subtle 3D Surface Spotlight */}
      {showSurfaceGlow && (
        <div
          ref={glowRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-0 transition-opacity duration-300 ease-out"
        />
      )}
    </>
  );
};
