'use client';

import React, { createContext, useContext, useEffect, useSyncExternalStore } from 'react';
import { Language } from '@/types';

const LANG_STORAGE_KEY = 'zyrvae_lang';
const LANG_CHANGE_EVENT = 'zyrvae-lang-change';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isLoaded: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

let memoryLang: Language | null = null;
let isClientHydrated = false;

function resolveClientLanguage(): Language {
  if (typeof window === 'undefined' || !isClientHydrated) return 'es';
  try {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    if (saved === 'es' || saved === 'en') {
      memoryLang = saved;
      return saved;
    }
    if (memoryLang === 'es' || memoryLang === 'en') {
      return memoryLang;
    }
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('en')) {
      return 'en';
    }
  } catch {
    if (memoryLang) return memoryLang;
  }
  return 'es';
}

function subscribeToLanguage(onStoreChange: () => void): () => void {
  if (typeof window === 'undefined') return () => {};

  let rafId: number | null = null;
  if (!isClientHydrated) {
    rafId = window.requestAnimationFrame(() => {
      isClientHydrated = true;
      onStoreChange();
    });
  }

  const handleCustomChange = () => onStoreChange();
  const handleStorage = (e: StorageEvent) => {
    if (e.key === LANG_STORAGE_KEY) {
      if (e.newValue === 'es' || e.newValue === 'en') {
        memoryLang = e.newValue;
      } else {
        memoryLang = null;
      }
      onStoreChange();
    }
  };

  window.addEventListener(LANG_CHANGE_EVENT, handleCustomChange);
  window.addEventListener('storage', handleStorage);

  return () => {
    if (rafId !== null) window.cancelAnimationFrame(rafId);
    window.removeEventListener(LANG_CHANGE_EVENT, handleCustomChange);
    window.removeEventListener('storage', handleStorage);
  };
}

function getServerLanguageSnapshot(): Language {
  return 'es';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore(
    subscribeToLanguage,
    resolveClientLanguage,
    getServerLanguageSnapshot
  );

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    memoryLang = lang;
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    } catch {
      // Storage unavailable
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event(LANG_CHANGE_EVENT));
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, isLoaded: true }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
