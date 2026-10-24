'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SymbolLogo } from '@/components/ui/SymbolLogo';
import { Wordmark } from '@/components/ui/Wordmark';

export const IntroAnimation: React.FC = () => {
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    try {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const seen = sessionStorage.getItem('zyrvae_intro_seen');

      if (!seen && !reducedMotion) {
        setShowIntro(true);
        sessionStorage.setItem('zyrvae_intro_seen', 'true');

        const timer = setTimeout(() => {
          setShowIntro(false);
        }, 1600);

        const handleKeyDown = (e: KeyboardEvent) => {
          if (e.key === 'Escape') {
            setShowIntro(false);
          }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
          clearTimeout(timer);
          window.removeEventListener('keydown', handleKeyDown);
        };
      }
    } catch {
      setShowIntro(false);
    }
  }, []);

  const handleDismiss = () => {
    setShowIntro(false);
  };

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          key="intro-curtain"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleDismiss}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#060709] cursor-pointer"
          aria-live="polite"
          aria-label="Cargando ZYRVAE Digital Studio"
        >
          <div className="flex flex-col items-center space-y-6">
            <SymbolLogo size={64} animate={true} />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-center"
            >
              <Wordmark showDescriptor={true} className="items-center" />
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.9 }}
            className="absolute bottom-10 font-mono text-[10px] tracking-widest text-[#8b92a5] uppercase"
          >
            [ ESC o clic para omitir ]
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
