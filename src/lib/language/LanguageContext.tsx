"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { Language, LanguageContextType } from "./types";
import {
  getInitialLanguage,
  persistLanguage,
  detectCountryFallback,
} from "./detection";
import { UI_TRANSLATIONS } from "./translations";

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({
  children,
  defaultLang,
}: {
  children: React.ReactNode;
  defaultLang?: Language;
}) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const init = getInitialLanguage();
      return init.language;
    }
    return defaultLang || "hi";
  });

  const [hasManualPreference, setHasManualPreference] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return getInitialLanguage().hasManualPreference;
    }
    return false;
  });

  const [isIndia, setIsIndia] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return getInitialLanguage().language === "hi";
    }
    return true;
  });

  const [isDetecting, setIsDetecting] = useState<boolean>(false);

  // Synchronize on mount and run non-blocking fallback detection if needed
  useEffect(() => {
    const init = getInitialLanguage();
    setLanguageState(init.language);
    setHasManualPreference(init.hasManualPreference);
    setIsIndia(init.language === "hi");

    // If user has not explicitly set a manual preference, run non-blocking fallback IP detection
    if (!init.hasManualPreference) {
      setIsDetecting(true);
      detectCountryFallback()
        .then((geo) => {
          setIsIndia(geo.isIndia);
          // Only update language if the user hasn't manually switched in the meantime
          setHasManualPreference((prevManual) => {
            if (!prevManual) {
              const targetLang: Language = geo.isIndia ? "hi" : "en";
              setLanguageState(targetLang);
              // Save cookie for SSR continuity without overriding user's right to change
              document.cookie = `ftp_lang=${targetLang}; path=/; max-age=86400; SameSite=Lax`;
            }
            return prevManual;
          });
        })
        .catch(() => {
          // Graceful fallback to English if detection fails
        })
        .finally(() => {
          setIsDetecting(false);
        });
    }
  }, []);

  const setLanguage = useCallback((newLang: Language) => {
    setLanguageState(newLang);
    setHasManualPreference(true);
    setIsIndia(newLang === "hi");
    persistLanguage(newLang);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => {
      const next: Language = prev === "hi" ? "en" : "hi";
      setHasManualPreference(true);
      setIsIndia(next === "hi");
      persistLanguage(next);
      return next;
    });
  }, []);

  const t = useCallback(
    (key: string, fallback?: string): string => {
      const langDict = UI_TRANSLATIONS[language];
      if (langDict && langDict[key]) {
        return langDict[key];
      }
      const fallbackDict = UI_TRANSLATIONS.en;
      if (fallbackDict && fallbackDict[key]) {
        return fallbackDict[key];
      }
      return fallback || key;
    },
    [language]
  );

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      isIndia,
      isDetecting,
      t,
    }),
    [language, setLanguage, toggleLanguage, isIndia, isDetecting, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
