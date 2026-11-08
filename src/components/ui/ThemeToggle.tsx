'use client';

import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

interface ThemeToggleProps {
  className?: string;
  showLabels?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  showLabels = false,
}) => {
  const { theme, setTheme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language].theme;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      setTheme(theme === 'dark' ? 'light' : 'dark');
    }
  };

  return (
    <div
      role="group"
      aria-label={t.label}
      onKeyDown={handleKeyDown}
      className={`inline-flex items-center rounded-none bg-transparent p-0 font-editorial-micro text-[10px] font-medium tracking-[0.015em] normal-case ${className}`}
    >
      <button
        type="button"
        onClick={() => setTheme('light')}
        aria-pressed={theme === 'light'}
        aria-label={t.switchToLight}
        title={t.light}
        suppressHydrationWarning
        className={`inline-flex items-center space-x-1 px-1.5 py-1 rounded-none bg-transparent transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF3B30] ${
          theme === 'light'
            ? 'text-zy-fg font-semibold'
            : 'text-zy-muted/75 hover:text-zy-fg'
        }`}
      >
        <Sun
          size={11}
          strokeWidth={theme === 'light' ? 2.1 : 1.5}
          aria-hidden="true"
        />
        <span className={showLabels ? 'inline text-[10px]' : 'sr-only'}>
          {t.light}
        </span>
      </button>

      <span
        aria-hidden="true"
        className="w-[0.5px] h-2.5 bg-zy-grid-line mx-0.5 select-none"
      />

      <button
        type="button"
        onClick={() => setTheme('dark')}
        aria-pressed={theme === 'dark'}
        aria-label={t.switchToDark}
        title={t.dark}
        suppressHydrationWarning
        className={`inline-flex items-center space-x-1 px-1.5 py-1 rounded-none bg-transparent transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF3B30] ${
          theme === 'dark'
            ? 'text-zy-fg font-semibold'
            : 'text-zy-muted/75 hover:text-zy-fg'
        }`}
      >
        <Moon
          size={11}
          strokeWidth={theme === 'dark' ? 2.1 : 1.5}
          aria-hidden="true"
        />
        <span className={showLabels ? 'inline text-[10px]' : 'sr-only'}>
          {t.dark}
        </span>
      </button>
    </div>
  );
};
