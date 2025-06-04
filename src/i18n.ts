import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    lng: "ru",
    fallbackLng: "ru",
    ns: ["translation"],
    defaultNS: "translation",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
