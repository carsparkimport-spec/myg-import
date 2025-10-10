'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import fr from './locales/fr.json';
import en from './locales/en.json';

type Locale = 'fr' | 'en';
type Dictionary = Record<string, any>;

interface I18nContextValue {
  locale: Locale;
  t: (key: string) => string;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

const ALL_DICTIONARIES: Record<Locale, Dictionary> = { fr, en };

function getByPath(dict: Dictionary, path: string): string {
  return path.split('.').reduce<any>((acc, part) => (acc && acc[part] != null ? acc[part] : undefined), dict) ?? path;
}

export function I18nProvider({ children, initialLocale = 'fr' }: { children: React.ReactNode; initialLocale?: Locale }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  // Allow ?lang=en override and persist to cookie
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang');
    if (urlLang === 'en' || urlLang === 'fr') {
      setLocaleState(urlLang);
      document.cookie = `locale=${urlLang}; path=/; max-age=31536000`;
    } else {
      // fallback to cookie
      const cookieMatch = document.cookie.match(/(?:^|; )locale=(en|fr)/);
      if (cookieMatch) {
        setLocaleState(cookieMatch[1] as Locale);
      }
    }
  }, []);

  const dict = useMemo(() => ALL_DICTIONARIES[locale], [locale]);

  const value = useMemo<I18nContextValue>(() => ({
    locale,
    setLocale: (l: Locale) => {
      setLocaleState(l);
      document.cookie = `locale=${l}; path=/; max-age=31536000`;
    },
    t: (key: string) => String(getByPath(dict, key)),
  }), [locale, dict]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}


