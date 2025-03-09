
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "es" | "de" | "fr" | "it" | "pt" | "ar" | "zh" | "tr";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Try to get the saved language from localStorage, or default to "en"
    const savedLanguage = localStorage.getItem("apuntea_language");
    return (savedLanguage as Language) || "en";
  });

  // Save language to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("apuntea_language", language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
