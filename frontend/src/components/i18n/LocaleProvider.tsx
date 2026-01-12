"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import type { Locale } from "@/lib/i18n";
import { normalizeLocale } from "@/lib/i18n";

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
};

const LocaleContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "alfab_locale";

export function LocaleProvider({
  children,
  defaultLocale = "en",
}: {
  children: React.ReactNode;
  defaultLocale?: Locale;
}) {
  const [locale, setLocale] = useState<Locale>(() => {
    try {
      const storedRaw = localStorage.getItem(STORAGE_KEY);
      if (storedRaw) return normalizeLocale(storedRaw);
    } catch {
      // ignore
    }

    try {
      return normalizeLocale(navigator.language);
    } catch {
      return defaultLocale;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      // ignore
    }
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale }), [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within <LocaleProvider>");
  }
  return ctx;
}
