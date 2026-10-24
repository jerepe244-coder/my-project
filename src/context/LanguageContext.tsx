'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Language } from '@/types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isLoaded: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('es');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('zyrvae_lang');
      if (saved === 'es' || saved === 'en') {
        setLanguageState(saved);
      } else {
        // Initial detection from browser language
        const browserLang = navigator.language.toLowerCase();
        if (browserLang.startsWith('en')) {
          setLanguageState('en');
        } else {
          setLanguageState('es');
        }
      }
    } catch {
      // Fallback to es
      setLanguageState('es');
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('zyrvae_lang', lang);
      document.documentElement.lang = lang;
    } catch {
      // Storage unavailable
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, isLoaded }}>
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
