'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowUpRight, MoveHorizontal, Sparkles } from 'lucide-react';

export const CustomCursor: React.FC = () => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [cursorMode, setCursorMode] = useState<'explore' | 'demo' | 'drag'>('explore');

  const springConfig = { damping: 26, stiffness: 360, mass: 0.45 };
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
        const modeAttr = target.getAttribute('data-cursor-mode') as
          | 'explore'
          | 'demo'
          | 'drag'
          | null;

        const resolvedText =
          customText || (language === 'es' ? 'EXPLORAR' : 'EXPLORE');
        setCursorText(resolvedText);

        if (modeAttr) {
          setCursorMode(modeAttr);
        } else if (/ARRASTRAR|DRAG/i.test(resolvedText)) {
          setCursorMode('drag');
        } else if (/DEMO/i.test(resolvedText)) {
          setCursorMode('demo');
        } else {
          setCursorMode('explore');
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
          className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center rounded-none"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.94, opacity: 0, transition: { duration: 0.14, ease: 'easeOut' } }}
          transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="px-3 py-1.5 rounded-none bg-[#FF3B30] text-white text-[11px] font-mono-tech uppercase tracking-[0.08em] font-medium border border-white/30 select-none whitespace-nowrap inline-flex items-center space-x-1.5">
            {cursorMode === 'demo' && (
              <span className="w-1.5 h-1.5 rounded-none bg-white animate-pulse" />
            )}
            <span>{cursorText}</span>
            {cursorMode === 'drag' ? (
              <MoveHorizontal size={12} />
            ) : cursorMode === 'demo' ? (
              <Sparkles size={11} />
            ) : (
              <ArrowUpRight size={12} />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
