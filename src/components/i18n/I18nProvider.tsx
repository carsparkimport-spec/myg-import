"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import frMessages from "./messages/fr"; // Preload default locale messages to avoid flashing keys

type Locale = "fr" | "en";

type Messages = Record<string, string>;

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

const STORAGE_KEY = "myg_locale";

// Lazy import messages to keep bundle lean
async function loadMessages(locale: Locale): Promise<Messages> {
  switch (locale) {
    case "en":
      return (await import("./messages/en"))?.default;
    case "fr":
    default:
      return (await import("./messages/fr"))?.default;
  }
}

export function I18nProvider({ children, defaultLocale = "fr" as Locale }: { children: React.ReactNode; defaultLocale?: Locale }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  // Hydrate immediately with FR messages to prevent rendering raw keys on first paint
  const [messages, setMessages] = useState<Messages>(defaultLocale === "fr" ? frMessages : {});

  useEffect(() => {
    const stored = typeof window !== "undefined" ? (localStorage.getItem(STORAGE_KEY) as Locale | null) : null;
    if (stored === "en" || stored === "fr") {
      setLocaleState(stored);
    } else if (stored === ("lb" as unknown as Locale)) {
      // Fallback to French if old value was Luxembourgish
      setLocaleState("fr");
      try { localStorage.setItem(STORAGE_KEY, "fr"); } catch {}
    }
  }, []);

  useEffect(() => {
    if (locale === "fr") {
      setMessages(frMessages);
      return;
    }
    loadMessages(locale).then(setMessages).catch(() => setMessages({}));
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, next);
      try {
        // Update <html lang> for accessibility/SEO
        document.documentElement.setAttribute("lang", next);
      } catch {}
    }
  }, []);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>) => {
      const fallbackFr = frMessages as unknown as Messages;
      const template = (messages[key] ?? fallbackFr[key] ?? key) as string;
      if (!params) return template;
      return Object.keys(params).reduce((acc, k) => {
        const value = String(params[k] as unknown as string);
        return acc.replaceAll(`{${k}}`, value);
      }, template);
    },
    [messages]
  );

  const value = useMemo<I18nContextValue>(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}


