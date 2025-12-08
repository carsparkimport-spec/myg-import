'use client';

import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import frLocal from './locales/fr.json';
import enLocal from './locales/en.json';

type Locale = 'fr' | 'en';
type Primitive = string | number | boolean | null | undefined;
type Dictionary = { [key: string]: Primitive | Dictionary };

interface I18nContextValue {
  locale: Locale;
  t: (key: string) => string;
  tObject: (key: string) => Dictionary | Primitive;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

const LOCAL_DICTIONARIES: Record<Locale, Dictionary> = { fr: frLocal, en: enLocal };

function getByPath(dict: Dictionary, path: string): Primitive | Dictionary {
  const parts = path.split('.');
  let node: Primitive | Dictionary = dict;
  for (const part of parts) {
    if (node && typeof node === 'object' && part in node) {
      node = (node as Dictionary)[part];
    } else {
      return path;
    }
  }
  return node;
}

export function I18nProvider({ children, initialLocale = 'fr' }: { children: React.ReactNode; initialLocale?: Locale }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [dictionaries, setDictionaries] = useState<Record<Locale, Dictionary>>(LOCAL_DICTIONARIES);

  const fetchTranslations = useCallback(async (lang: Locale) => {
    try {
      const response = await fetch(`/api/translations?locale=${lang}`);
      if (response.ok) {
        const data = await response.json();
        setDictionaries(prev => ({ ...prev, [lang]: data }));
      }
    } catch (error) {
      console.error(`Failed to fetch ${lang} translations from GitHub:`, error);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang');
    if (urlLang === 'en' || urlLang === 'fr') {
      setLocaleState(urlLang);
      document.cookie = `locale=${urlLang}; path=/; max-age=31536000`;
    } else {
      const cookieMatch = document.cookie.match(/(?:^|; )locale=(en|fr)/);
      if (cookieMatch) {
        setLocaleState(cookieMatch[1] as Locale);
      }
    }
  }, []);

  useEffect(() => {
    fetchTranslations(locale);
  }, [locale, fetchTranslations]);

  const dict = useMemo(() => dictionaries[locale], [locale, dictionaries]);

  const value = useMemo<I18nContextValue>(() => ({
    locale,
    setLocale: (l: Locale) => {
      setLocaleState(l);
      document.cookie = `locale=${l}; path=/; max-age=31536000`;
    },
    t: (key: string) => String(getByPath(dict, key)),
    tObject: (key: string) => getByPath(dict, key),
  }), [locale, dict]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}


