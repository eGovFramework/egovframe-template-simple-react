import { useTranslation as useI18nTranslation } from "react-i18next";
import { useCallback } from "react";

export const useTranslation = (namespace = "common") => {
  const { t, i18n } = useI18nTranslation(namespace);

  const changeLanguage = useCallback(
    (lng) => {
      i18n.changeLanguage(lng);
      localStorage.setItem("i18nextLng", lng);
    },
    [i18n]
  );

  const formatDate = useCallback(
    (date, options = {}) => {
      const locale = i18n.language === "ko" ? "ko-KR" : "en-US";
      return new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
        ...options,
      }).format(new Date(date));
    },
    [i18n.language]
  );

  const formatTime = useCallback(
    (date, options = {}) => {
      const locale = i18n.language === "ko" ? "ko-KR" : "en-US";
      return new Intl.DateTimeFormat(locale, {
        hour: "2-digit",
        minute: "2-digit",
        ...options,
      }).format(new Date(date));
    },
    [i18n.language]
  );

  const formatDateTime = useCallback(
    (date, options = {}) => {
      const locale = i18n.language === "ko" ? "ko-KR" : "en-US";
      return new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        ...options,
      }).format(new Date(date));
    },
    [i18n.language]
  );

  return {
    t,
    changeLanguage,
    formatDate,
    formatTime,
    formatDateTime,
    currentLanguage: i18n.language,
  };
};
