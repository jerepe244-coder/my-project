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
      className={`inline-flex items-center rounded-full bg-zy-control border border-zy-border p-0.5 text-xs font-mono ${className}`}
    >
      <button
        type="button"
        onClick={() => setLanguage('es')}
        aria-pressed={language === 'es'}
        className={`px-2.5 py-1 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zy-blue ${
          language === 'es'
            ? 'bg-zy-control-active text-zy-fg font-semibold shadow-sm'
            : 'text-zy-muted hover:text-zy-fg'
        }`}
      >
        ES
      </button>
      <span className="text-zy-border-strong/60 select-none text-[10px]" aria-hidden="true">
        /
      </span>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
        className={`px-2.5 py-1 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zy-blue ${
          language === 'en'
            ? 'bg-zy-control-active text-zy-fg font-semibold shadow-sm'
            : 'text-zy-muted hover:text-zy-fg'
        }`}
      >
        EN
      </button>
    </div>
  );
};
