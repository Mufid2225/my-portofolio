"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import { translations, type Language } from "@/lib/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (typeof translations)["id"];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "portfolio_lang";
const LANG_CHANGE_EVENT = "portfolio_lang_change";

function subscribeLanguage(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(LANG_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(LANG_CHANGE_EVENT, callback);
  };
}

function getLanguageSnapshot(): Language {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "id" || saved === "en") return saved;
  } catch {
    // localStorage might be unavailable in private browsing
  }
  return "id";
}

function getServerLanguageSnapshot(): Language {
  return "id";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore(
    subscribeLanguage,
    getLanguageSnapshot,
    getServerLanguageSnapshot,
  );

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore storage error
    }
    window.dispatchEvent(new Event(LANG_CHANGE_EVENT));
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === "id" ? "en" : "id");
  }, [language, setLanguage]);

  const t = useMemo(() => translations[language], [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t,
    }),
    [language, setLanguage, toggleLanguage, t],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
