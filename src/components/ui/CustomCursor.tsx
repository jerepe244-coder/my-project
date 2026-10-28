'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';

export const CustomCursor: React.FC = () => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState('');

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!finePointer || reducedMotion) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = (e.target as HTMLElement)?.closest('[data-cursor]');
      if (target) {
        setIsVisible(true);
        const customText = target.getAttribute('data-cursor-text');
        if (customText) {
          setCursorText(customText);
        } else {
          setCursorText(language === 'es' ? 'VER CASO ↗' : 'EXPLORE ↗');
        }
      } else {
        setIsVisible(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, language]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          aria-hidden="true"
          className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0, transition: { duration: 0.15, ease: 'easeOut' } }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
        >
          <div className="px-3 py-1 rounded-full bg-zy-blue text-white text-[11px] font-mono tracking-wider font-semibold border border-white/20 select-none whitespace-nowrap shadow-md">
            {cursorText}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
