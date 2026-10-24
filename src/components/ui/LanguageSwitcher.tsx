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
      className={`inline-flex items-center rounded-full bg-[#12151b] border border-[#1e232d] p-0.5 text-xs font-mono ${className}`}
    >
      <button
        type="button"
        onClick={() => setLanguage('es')}
        aria-pressed={language === 'es'}
        className={`px-2.5 py-1 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0a5cff] ${
          language === 'es'
            ? 'bg-[#1b2230] text-white font-semibold shadow-sm'
            : 'text-[#8b92a5] hover:text-white'
        }`}
      >
        ES
      </button>
      <span className="text-[#2a303d] select-none text-[10px]">/</span>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
        className={`px-2.5 py-1 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0a5cff] ${
          language === 'en'
            ? 'bg-[#1b2230] text-white font-semibold shadow-sm'
            : 'text-[#8b92a5] hover:text-white'
        }`}
      >
        EN
      </button>
    </div>
  );
};
