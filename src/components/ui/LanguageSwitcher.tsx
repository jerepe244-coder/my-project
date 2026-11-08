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
      className={`inline-flex items-center rounded-none bg-zy-control border border-zy-grid-line p-0 text-[11px] font-mono-tech uppercase tracking-[0.08em] ${className}`}
    >
      <button
        type="button"
        onClick={() => setLanguage('es')}
        aria-pressed={language === 'es'}
        className={`px-2 py-1 rounded-none transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF3B30] ${
          language === 'es'
            ? 'bg-zy-fg text-zy-bg font-medium'
            : 'text-zy-muted hover:text-zy-fg'
        }`}
      >
        ES
      </button>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
        className={`px-2 py-1 rounded-none border-l border-zy-grid-line transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF3B30] ${
          language === 'en'
            ? 'bg-zy-fg text-zy-bg font-medium'
            : 'text-zy-muted hover:text-zy-fg'
        }`}
      >
        EN
      </button>
    </div>
  );
};
