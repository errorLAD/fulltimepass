export type Language = "hi" | "en";

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isIndia: boolean;
  isDetecting: boolean;
  t: (key: string, fallback?: string) => string;
}
