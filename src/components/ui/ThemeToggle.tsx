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
      className={`inline-flex items-center rounded-none bg-zy-control border border-zy-grid-line p-0 text-[11px] font-mono-tech uppercase tracking-[0.08em] ${className}`}
    >
      <button
        type="button"
        onClick={() => setTheme('light')}
        aria-pressed={theme === 'light'}
        aria-label={t.switchToLight}
        title={t.light}
        suppressHydrationWarning
        className={`inline-flex items-center space-x-1 px-2 py-1 rounded-none transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF3B30] ${
          theme === 'light'
            ? 'bg-zy-fg text-zy-bg font-medium'
            : 'text-zy-muted hover:text-zy-fg'
        }`}
      >
        <Sun size={11} aria-hidden="true" />
        <span className={showLabels ? 'inline text-[10px]' : 'sr-only'}>
          {t.light}
        </span>
      </button>

      <button
        type="button"
        onClick={() => setTheme('dark')}
        aria-pressed={theme === 'dark'}
        aria-label={t.switchToDark}
        title={t.dark}
        suppressHydrationWarning
        className={`inline-flex items-center space-x-1 px-2 py-1 rounded-none border-l border-zy-grid-line transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF3B30] ${
          theme === 'dark'
            ? 'bg-zy-fg text-zy-bg font-medium'
            : 'text-zy-muted hover:text-zy-fg'
        }`}
      >
        <Moon size={11} aria-hidden="true" />
        <span className={showLabels ? 'inline text-[10px]' : 'sr-only'}>
          {t.dark}
        </span>
      </button>
    </div>
  );
};
