'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

declare global {
  interface Window {
    __zyrvaeLenis?: Lenis | null;
  }
}

/**
 * Inertial cinematic smooth scroll controller powered by Lenis.
 * Provides heavy, tactile scroll physics on desktop while respecting
 * prefers-reduced-motion and modal scroll-locks (data-lenis-prevent).
 */
export const SmoothScroll: React.FC = () => {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
      autoRaf: false,
    });

    lenisRef.current = lenis;
    window.__zyrvaeLenis = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };
    rafId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      window.__zyrvaeLenis = null;
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (typeof window !== 'undefined' && !window.location.hash) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return null;
};
