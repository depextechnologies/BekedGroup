'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import fr from '../../messages/fr.json';
import en from '../../messages/en.json';

export type Locale = 'fr' | 'en';

type Messages = typeof fr;

const messagesMap: Record<Locale, Messages> = { fr, en };

interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (path: string) => string;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

function getByPath(obj: any, path: string): any {
  return path.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), obj);
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('fr');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = (typeof window !== 'undefined' && localStorage.getItem('baked_locale')) as Locale | null;
    if (stored && (stored === 'fr' || stored === 'en')) {
      setLocaleState(stored);
    }
    setMounted(true);
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    if (typeof window !== 'undefined') {
      localStorage.setItem('baked_locale', l);
      document.documentElement.lang = l;
    }
  };

  useEffect(() => {
    if (mounted && typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale, mounted]);

  const t = (path: string): string => {
    const val = getByPath(messagesMap[locale], path);
    if (typeof val === 'string') return val;
    return path;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
