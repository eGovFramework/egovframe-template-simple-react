import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import koCommon from "./ko/common.json";
import enCommon from "./en/common.json";
import koSchedule from "./ko/schedule.json";
import enSchedule from "./en/schedule.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "ko",
    debug: process.env.NODE_ENV === "development",

    interpolation: {
      escapeValue: false,
    },

    resources: {
      ko: {
        common: koCommon,
        schedule: koSchedule,
      },
      en: {
        common: enCommon,
        schedule: enSchedule,
      },
    },

    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },

    ns: ["common", "schedule"],
    defaultNS: "common",
  });

export default i18n;
