"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Locale = "en" | "ko";

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en"); // 기본값 영어
  const [isInitialized, setIsInitialized] = useState(false);

  // 쿠키에서 언어 설정 읽기
  useEffect(() => {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
      return null;
    };

    const savedLocale = getCookie("locale");
    if (savedLocale === "ko" || savedLocale === "en") {
      setLocaleState(savedLocale);
    }
    setIsInitialized(true);
  }, []);

  // 쿠키에 언어 설정 저장
  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000`; // 1년
  };

  // 초기화 전에는 기본값만 렌더링
  if (!isInitialized) {
    return null;
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
