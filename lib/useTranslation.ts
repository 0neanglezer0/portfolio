import { useLocale } from "./LocaleContext";
import { en } from "@/locales/en";
import { ko } from "@/locales/ko";

const translations = {
  en,
  ko,
};

export function useTranslation() {
  const { locale } = useLocale();
  return translations[locale];
}
