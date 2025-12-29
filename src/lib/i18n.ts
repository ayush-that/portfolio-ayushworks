import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";

i18n
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) => import(`../locales/${language}/${namespace}.json`),
    ),
  )
  .use(initReactI18next)
  .init({
    lng: "en",
    fallbackLng: "en",
    debug: process.env.NODE_ENV === "development",

    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ["path", "cookie", "htmlTag", "localStorage", "navigator", "subdomain"],
      caches: ["cookie"],
    },

    supportedLngs: ["en", "es", "fr", "de", "hi", "ja", "ko", "zh"],

    ns: ["common", "blog"],
    defaultNS: "common",
  });

export default i18n;
