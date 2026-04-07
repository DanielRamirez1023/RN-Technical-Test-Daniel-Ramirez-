import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import en from "./locales/en.json";
import es from "./locales/es.json";

const SUPPORTED_LANGUAGES = ["en", "es"] as const;

function resolveInitialLanguage(): (typeof SUPPORTED_LANGUAGES)[number] {
  const deviceCode = Localization.getLocales()[0]?.languageCode ?? "en";
  return SUPPORTED_LANGUAGES.includes(deviceCode as (typeof SUPPORTED_LANGUAGES)[number])
    ? (deviceCode as (typeof SUPPORTED_LANGUAGES)[number])
    : "en";
}

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
  },
  lng: resolveInitialLanguage(),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: "v4",
  react: {
    useSuspense: false,
  },
});

export default i18n;
