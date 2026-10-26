'use client';

import React, { createContext, useContext, useEffect, useSyncExternalStore } from 'react';
import { Theme } from '@/types';

export const THEME_STORAGE_KEY = 'zyrvae_theme';
const THEME_CHANGE_EVENT = 'zyrvae-theme-change';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

let memoryTheme: Theme | null = null;

function resolveClientTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') {
      memoryTheme = saved;
      return saved;
    }
    if (memoryTheme === 'light' || memoryTheme === 'dark') {
      return memoryTheme;
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
  } catch {
    if (memoryTheme) return memoryTheme;
  }
  return 'dark';
}

function applyThemeToDocument(theme: Theme) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(theme);
  root.setAttribute('data-theme', theme);
  root.style.colorScheme = theme;
}

function subscribeToTheme(onStoreChange: () => void): () => void {
  if (typeof window === 'undefined') return () => {};

  const handleCustomChange = () => onStoreChange();

  const handleStorage = (e: StorageEvent) => {
    if (e.key === THEME_STORAGE_KEY) {
      if (e.newValue === 'light' || e.newValue === 'dark') {
        memoryTheme = e.newValue;
      } else {
        memoryTheme = null;
      }
      const next = resolveClientTheme();
      applyThemeToDocument(next);
      onStoreChange();
    }
  };

  const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
  const handleMediaChange = (e: MediaQueryListEvent) => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved !== 'light' && saved !== 'dark') {
        memoryTheme = null;
        const next: Theme = e.matches ? 'light' : 'dark';
        applyThemeToDocument(next);
        onStoreChange();
      }
    } catch {
      // Ignore storage access errors
    }
  };

  window.addEventListener(THEME_CHANGE_EVENT, handleCustomChange);
  window.addEventListener('storage', handleStorage);
  mediaQuery.addEventListener('change', handleMediaChange);

  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, handleCustomChange);
    window.removeEventListener('storage', handleStorage);
    mediaQuery.removeEventListener('change', handleMediaChange);
  };
}

function getServerSnapshot(): Theme {
  return 'dark';
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribeToTheme, resolveClientTheme, getServerSnapshot);

  useEffect(() => {
    applyThemeToDocument(theme);
  }, [theme]);

  const setTheme = (nextTheme: Theme) => {
    memoryTheme = nextTheme;
    applyThemeToDocument(nextTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // Storage unavailable
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
