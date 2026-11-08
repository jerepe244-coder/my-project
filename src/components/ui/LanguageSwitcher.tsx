'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface LanguageSwitcherProps {
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '' }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Language selection"
      className={`inline-flex items-center rounded-none bg-transparent p-0 font-editorial-micro text-[10px] font-medium tracking-[0.015em] normal-case ${className}`}
    >
      <button
        type="button"
        onClick={() => setLanguage('es')}
        aria-pressed={language === 'es'}
        className={`px-1 py-0.5 rounded-none bg-transparent transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF3B30] ${
          language === 'es'
            ? 'text-zy-fg font-semibold underline decoration-[#FF3B30] decoration-[1px] underline-offset-[3px]'
            : 'text-zy-muted/75 hover:text-zy-fg'
        }`}
      >
        Es
      </button>
      <span
        aria-hidden="true"
        className="text-[10px] text-[#94A3B8] px-0.5 select-none"
      >
        /
      </span>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
        className={`px-1 py-0.5 rounded-none bg-transparent transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF3B30] ${
          language === 'en'
            ? 'text-zy-fg font-semibold underline decoration-[#FF3B30] decoration-[1px] underline-offset-[3px]'
            : 'text-zy-muted/75 hover:text-zy-fg'
        }`}
      >
        En
      </button>
    </div>
  );
};
