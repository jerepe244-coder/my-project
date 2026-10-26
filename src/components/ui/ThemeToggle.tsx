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
      className={`inline-flex items-center rounded-full bg-zy-control border border-zy-border p-0.5 text-xs font-mono ${className}`}
    >
      <button
        type="button"
        onClick={() => setTheme('dark')}
        aria-pressed={theme === 'dark'}
        aria-label={t.switchToDark}
        title={t.dark}
        suppressHydrationWarning
        className={`inline-flex items-center space-x-1.5 px-2 py-1 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zy-blue ${
          theme === 'dark'
            ? 'bg-zy-control-active text-zy-fg font-semibold shadow-sm'
            : 'text-zy-muted hover:text-zy-fg'
        }`}
      >
        <Moon
          size={12}
          aria-hidden="true"
          className={theme === 'dark' ? 'text-zy-blue' : 'text-current'}
        />
        <span className={showLabels ? 'inline text-[11px]' : 'sr-only xl:not-sr-only xl:inline text-[11px]'}>
          {t.dark}
        </span>
      </button>

      <span className="text-zy-border-strong/60 select-none text-[10px] px-0.5" aria-hidden="true">
        /
      </span>

      <button
        type="button"
        onClick={() => setTheme('light')}
        aria-pressed={theme === 'light'}
        aria-label={t.switchToLight}
        title={t.light}
        suppressHydrationWarning
        className={`inline-flex items-center space-x-1.5 px-2 py-1 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zy-blue ${
          theme === 'light'
            ? 'bg-zy-control-active text-zy-fg font-semibold shadow-sm'
            : 'text-zy-muted hover:text-zy-fg'
        }`}
      >
        <Sun
          size={12}
          aria-hidden="true"
          className={theme === 'light' ? 'text-zy-blue' : 'text-current'}
        />
        <span className={showLabels ? 'inline text-[11px]' : 'sr-only xl:not-sr-only xl:inline text-[11px]'}>
          {t.light}
        </span>
      </button>
    </div>
  );
};
